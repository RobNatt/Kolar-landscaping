import type { ReactNode } from "react";
import { site, type ServiceId } from "@/lib/site";
import { QuoteButton } from "./Quote";
import { Photo, type PhotoKind } from "./Photo";

/**
 * Interior-page hero: H1 sits in the left 7 columns, the supporting copy drops
 * into the right 5 columns at the H1's baseline. Then a full-width photo strip.
 * Deliberately off-centre.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  service,
  photo,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  service?: ServiceId;
  photo: { kind: PhotoKind; file: string; shot: string };
}) {
  return (
    <section className="pt-12 md:pt-16" aria-labelledby="page-title">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="page-title" className="display mt-5 text-evergreen-900">
            {title}
          </h1>
        </div>
        <div className="lg:col-span-5 lg:pb-2">
          <p className="lead">{lead}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <QuoteButton service={service} />
            <a href={`tel:${site.phone.tel}`} className="btn btn-secondary">
              Call <span data-ph="phone" className="tabular-nums">{site.phone.display}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1440px] md:mt-16 md:px-8">
        <Photo {...photo} ratio="" sizes="100vw" className="aspect-[4/3] w-full md:aspect-[21/9]" />
      </div>
    </section>
  );
}
