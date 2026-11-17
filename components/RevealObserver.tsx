"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Adds .is-in to each .section-head once it scrolls into view. Plays once. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const heads = Array.from(document.querySelectorAll<HTMLElement>(".section-head:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      heads.forEach((h) => h.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
