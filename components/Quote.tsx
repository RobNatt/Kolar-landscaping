"use client";

import { createContext, useCallback, useContext, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Phone, X, Check } from "lucide-react";
import { bestTimes, services, site, type ServiceId } from "@/lib/site";

type QuoteCtx = { open: (service?: ServiceId) => void };
const Ctx = createContext<QuoteCtx>({ open: () => {} });

type Status = "idle" | "sending" | "sent" | "error";

/** Holds the single quote dialog for the whole site. Any QuoteButton opens it. */
export function QuoteProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [service, setService] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [formKey, setFormKey] = useState(0);
  const [bestTime, setBestTime] = useState("");

  const open = useCallback((preset?: ServiceId) => {
    setStatus((s) => {
      if (s === "sent") setFormKey((k) => k + 1); // fresh form after a successful send
      return s === "sent" || s === "error" ? "idle" : s;
    });
    setService(preset ? services.find((s) => s.id === preset)?.name ?? "" : "");
    dialogRef.current?.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setBestTime(String(data.bestTime ?? ""));
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Ctx.Provider value={{ open }}>
      {children}

      <dialog
        ref={dialogRef}
        className="quote"
        aria-labelledby="quote-title"
        onClick={(e) => e.target === dialogRef.current && close()}
      >
        <div className="relative">
          <div className="flex items-start justify-between gap-4 bg-evergreen-900 px-5 py-4 text-chalk on-dark sm:px-7">
            <div>
              <p className="eyebrow">Free quote · No obligation</p>
              <h2 id="quote-title" className="h3 mt-2">
                {status === "sent" ? "Got it. You're on Tyler's list." : "Get a free quote"}
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="-mr-2 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] hover:bg-evergreen-700"
            >
              <X aria-hidden size={22} strokeWidth={2.5} />
            </button>
          </div>

          {status === "sent" ? (
            <div className="px-5 py-6 sm:px-7">
              <p className="flex items-start gap-3 text-lg">
                <Check aria-hidden className="mt-1 shrink-0 text-evergreen-500" strokeWidth={3} />
                <span>
                  Tyler will call you back
                  {bestTime && bestTime !== "Anytime" ? ` in the ${bestTime.split(" ")[0].toLowerCase()}` : ""} to set up a
                  time to come look at the property.
                </span>
              </p>
              <p className="mt-4 text-ink-muted">
                Need us sooner? Call{" "}
                <a href={`tel:${site.phone.tel}`} className="font-semibold text-evergreen-700 underline" data-ph="phone">
                  {site.phone.display}
                </a>
                .
              </p>
              <button type="button" onClick={close} className="btn btn-secondary mt-6">
                Done
              </button>
            </div>
          ) : (
            <form key={formKey} onSubmit={onSubmit} className="grid gap-4 px-5 py-6 sm:px-7">
              <p className="text-ink-muted">Five quick fields. We&apos;ll call to set up a time to look at the yard.</p>

              <div className="field">
                <label htmlFor="q-name">Name</label>
                <input id="q-name" name="name" autoComplete="name" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="field">
                  <label htmlFor="q-phone">Phone</label>
                  <input id="q-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={10} />
                </div>
                <div className="field">
                  <label htmlFor="q-location">Address or ZIP</label>
                  <input id="q-location" name="location" autoComplete="street-address" required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="q-service">Service needed</label>
                <select id="q-service" name="service" required value={service} onChange={(e) => setService(e.target.value)}>
                  <option value="" disabled>
                    Choose one
                  </option>
                  {services.map((s) => (
                    <option key={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="q-time">Best time to reach you</label>
                <select id="q-time" name="bestTime" required defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  {bestTimes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Honeypot for bots. Humans never see or fill this. */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="q-company">Company</label>
                <input id="q-company" name="company" tabIndex={-1} autoComplete="off" />
              </div>

              {status === "error" && (
                <p role="alert" className="border-l-[3px] border-safety-700 bg-chalk px-3 py-2 text-ink">
                  That didn&apos;t go through. Try again, or call{" "}
                  <a href={`tel:${site.phone.tel}`} className="font-semibold underline">
                    {site.phone.display}
                  </a>
                  .
                </p>
              )}

              <button type="submit" className="btn btn-primary mt-1 w-full" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Get a free quote"}
              </button>
              <p className="flex items-center gap-2 text-sm text-stone-600">
                <Phone aria-hidden size={16} />
                Rather talk? Call{" "}
                <a href={`tel:${site.phone.tel}`} className="font-semibold text-evergreen-700 underline" data-ph="phone">
                  {site.phone.display}
                </a>
              </p>
            </form>
          )}
        </div>
      </dialog>
    </Ctx.Provider>
  );
}

export function QuoteButton({
  service,
  variant = "primary",
  className = "",
  children = "Get a free quote",
}: {
  service?: ServiceId;
  variant?: "primary" | "secondary" | "ondark";
  className?: string;
  children?: ReactNode;
}) {
  const { open } = useContext(Ctx);
  return (
    <button type="button" onClick={() => open(service)} className={`btn btn-${variant} ${className}`}>
      {children}
    </button>
  );
}
