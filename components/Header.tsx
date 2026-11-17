"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/site";
import { QuoteButton } from "./Quote";
import { CallButton } from "./CallButton";
import { Logo } from "./Logo";
import { FacebookLink } from "./FacebookLink";

/**
 * Motion §6.1: fixed header that condenses after 24px of scroll.
 * Mobile 64→56px, desktop 88→64px. The call button stays 48px in both states.
 * A spacer reserves the full height so content never jumps.
 */
export function Header() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setCondensed(!entry.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="btn btn-primary fixed left-3 top-3 z-50 -translate-y-24 focus-visible:translate-y-0"
      >
        Skip to content
      </a>

      <header
        data-condensed={condensed}
        className="on-dark fixed inset-x-0 top-0 z-40 border-b border-transparent bg-evergreen-900 text-chalk transition-[height,border-color] duration-200 ease-(--ease-firm) h-16 md:h-[88px] data-[condensed=true]:h-14 data-[condensed=true]:border-chalk/12 md:data-[condensed=true]:h-16"
      >
        <div className="container-x flex h-full items-center gap-2 sm:gap-3">
          <Link href="/" aria-label="Kolar Creek Lawn Care & Landscaping, home" className="flex min-h-12 shrink-0 items-center">
            <Logo condensed={condensed} />
          </Link>

          <nav aria-label="Main" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`label-caps inline-flex min-h-12 items-center px-3 text-[0.95rem] hover:text-white ${
                        active ? "text-chalk underline decoration-safety decoration-[3px] underline-offset-[10px]" : "text-evergreen-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2 lg:ml-4">
            <FacebookLink className="hidden md:inline-flex" />
            <QuoteButton className="hidden md:inline-flex" />
            <CallButton />
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-[2px] hover:bg-evergreen-700 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X aria-hidden strokeWidth={2.5} /> : <Menu aria-hidden strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="h-[calc(100dvh-100%)] overflow-y-auto overscroll-contain border-t border-chalk/12 bg-evergreen-900 lg:hidden"
          >
            <ul className="container-x py-3">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-chalk/10 last:border-0">
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="h3 flex min-h-14 items-center aria-[current=page]:text-safety"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="border-b border-chalk/10 md:hidden">
                <FacebookLink variant="text" className="min-h-14 text-lg font-semibold text-chalk" />
              </li>
              <li className="pb-2 pt-4 md:hidden">
                <QuoteButton className="w-full" />
              </li>
            </ul>
          </nav>
        )}
      </header>
      <div aria-hidden className="h-16 md:h-[88px]" />
    </>
  );
}
