"use client";

import { useEffect, useState } from "react";

/**
 * Consent banner + analytics loader.
 *
 * - No analytics script, cookie or network request exists until the visitor
 *   clicks "Accept". The gtag script is injected only after that.
 * - "Decline" is as easy as "Accept" (same size, same row).
 * - The choice is remembered in localStorage. The footer's "Cookie settings"
 *   button reopens the banner (it fires the `kc:consent-open` event).
 * - Withdrawing consent clears Google's _ga cookies and reloads the page so
 *   the already-loaded script is gone.
 */

const KEY = "kc-consent-v1";
type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function saveChoice(c: Choice) {
  try {
    localStorage.setItem(KEY, c);
  } catch {
    /* private mode: choice lasts for this page view only */
  }
}

function loadGoogleAnalytics(id: string) {
  if (!id || document.getElementById("ga-loader")) return;
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", id, { anonymize_ip: true });
  const s = document.createElement("script");
  s.id = "ga-loader";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
      for (const d of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
      }
    }
  }
}

export function ConsentBanner({ analyticsId }: { analyticsId: string }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Choice | null>(null);

  useEffect(() => {
    const c = readChoice();
    setCurrent(c);
    if (c === "granted") loadGoogleAnalytics(analyticsId);
    else if (c === null) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener("kc:consent-open", reopen);
    return () => window.removeEventListener("kc:consent-open", reopen);
  }, [analyticsId]);

  function choose(c: Choice) {
    saveChoice(c);
    setOpen(false);
    if (c === "granted") {
      loadGoogleAnalytics(analyticsId);
    } else if (current === "granted") {
      clearAnalyticsCookies();
      location.reload();
      return;
    }
    setCurrent(c);
  }

  if (!open) return null;

  return (
    <section
      role="region"
      aria-label="Analytics consent"
      className="on-dark fixed inset-x-0 bottom-0 z-30 border-t-[3px] border-safety bg-evergreen-900 text-chalk shadow-[0_-1px_0_rgb(0_0_0/0.2)]"
    >
      <div className="container-x flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <p className="max-w-[70ch] text-[0.95rem] leading-snug text-evergreen-100">
          <strong className="text-chalk">Can we count your visit?</strong> We&apos;d like to use Google Analytics to see
          which pages help people find us. Nothing loads unless you say yes.
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2 md:flex">
          <button type="button" onClick={() => choose("denied")} className="btn btn-ondark">
            Decline
          </button>
          <button type="button" onClick={() => choose("granted")} className="btn btn-call">
            Accept
          </button>
        </div>
      </div>
    </section>
  );
}

/** Footer link that reopens the banner so visitors can change their mind. */
export function ConsentSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("kc:consent-open"))}
      className={`inline-flex min-h-11 items-center underline-offset-4 hover:text-chalk hover:underline ${className}`}
    >
      Cookie settings
    </button>
  );
}
