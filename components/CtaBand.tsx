import type { ReactNode } from "react";
import { site, type ServiceId } from "@/lib/site";
import { QuoteButton } from "./Quote";
import { SectionHead } from "./SectionHead";

/** Closing evergreen band on every page. Left-aligned, quote + call. */
export function CtaBand({
  eyebrow = "Free quote · Fenton, MI",
  title,
  children,
  service,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  service?: ServiceId;
}) {
  return (
    <section className="on-dark bg-evergreen-900 py-16 text-chalk md:py-24" aria-labelledby="cta-title">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
        <SectionHead id="cta-title" eyebrow={eyebrow} title={title} className="lg:col-span-7">
          {children}
        </SectionHead>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <QuoteButton service={service} />
          <a href={`tel:${site.phone.tel}`} className="btn btn-ondark">
            Call <span data-ph="phone" className="tabular-nums">{site.phone.display}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
