import type { Metadata } from "next";
import { site } from "@/lib/site";
import { SectionHead } from "@/components/SectionHead";
import { CtaBand } from "@/components/CtaBand";
import { BeforeAfter, Photo } from "@/components/Photo";
import { QuoteButton } from "@/components/Quote";
import { LocalBusinessSchema } from "@/components/Schema";

// Target keyword: "fall cleanup Fenton MI"
export const metadata: Metadata = {
  title: { absolute: "Fall Cleanup Fenton MI | Seasonal Services & Snow Removal | Kolar Creek" },
  description:
    "Fall cleanup in Fenton, MI: leaves out, last mow, beds cut back, everything hauled away. Book spring service early, plus snow removal. Free quotes.",
  alternates: { canonical: "/seasonal" },
};

// CONFIRM WITH TYLER: what's included in each seasonal service, and snow details
// (driveways only or walks too, salting, when the crew heads out after a storm).
const fallIncludes = [
  "Leaves cleared from the lawn, beds and fence lines",
  "Final mow, cut at the right height for winter",
  "Perennials and spent plants cut back",
  "Sticks and storm debris picked up",
  "Everything hauled away, nothing left at the curb",
];

const year = [
  { season: "Spring", items: ["Spring cleanup", "First mow", "Bed edging & mulch", "Planting"] },
  { season: "Summer", items: ["Weekly mowing", "Trimming & edging", "Shrub & tree clipping"] },
  { season: "Fall", items: ["Fall cleanup", "Leaf removal", "Final mow", "Tree removal"], now: true },
  { season: "Winter", items: ["Snow removal", "Booking spring service"] },
];

export default function Seasonal() {
  return (
    <>
      <LocalBusinessSchema path="/seasonal" featured={["fall", "spring", "snow"]} />

      {/* ── Hero: fall cleanup NOW ─────────────────────────────────── */}
      <section className="on-dark bg-evergreen-900 text-chalk" aria-labelledby="page-title">
        <div className="container-x grid gap-10 pb-14 pt-10 md:pb-20 md:pt-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="label-caps inline-flex items-center gap-2 bg-safety px-3 py-1.5 text-evergreen-900">
              Now booking · Fall cleanups
            </p>
            <h1 id="page-title" className="display mt-6">
              Fall cleanup in Fenton, MI, before the snow sticks.
            </h1>
            <p className="lead mt-6">
              Leaves off the lawn and out of the beds, the last mow, plants cut back, and everything hauled away. Get it
              done now and the lawn comes out of winter healthy.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteButton service="fall" />
              <a href={`tel:${site.phone.tel}`} className="btn btn-ondark">
                Call <span data-ph="phone" className="tabular-nums">{site.phone.display}</span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-6">
            <BeforeAfter
              base="fall-cleanup"
              before="Lawn and beds buried in leaves"
              after="Same angle after the cleanup: leaves gone, final mow, beds cut back"
              ratio="4/5"
              className="text-evergreen-100"
            />
          </div>
        </div>
      </section>

      {/* ── What a fall cleanup includes + why ─────────────────────── */}
      <section className="py-16 md:py-24" aria-labelledby="fall-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead id="fall-title" eyebrow="Fall cleanup" title="What a fall cleanup covers." />
            <ul className="mt-8 border-t-2 border-evergreen-900">
              {fallIncludes.map((t) => (
                <li key={t} className="flex items-center gap-3 border-b border-stone-200 py-4">
                  <span aria-hidden className="h-2 w-2 shrink-0 bg-evergreen-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <aside className="self-start border-l-[3px] border-safety bg-surface p-6 md:p-8 lg:col-span-5 lg:col-start-8 lg:mt-24">
            <p className="label-caps text-safety-700">Why it matters</p>
            <p className="mt-3 text-lg text-evergreen-900">
              Leaves left on the lawn get packed down under snow. Come spring, that&apos;s where you find dead, matted
              patches and snow mold.
            </p>
            <p className="mt-3 text-ink-muted">
              A fall cleanup in Fenton before the first real snowfall is the easiest way to get a green lawn in April.
            </p>
          </aside>
        </div>
      </section>

      {/* ── Book spring early ──────────────────────────────────────── */}
      <section className="border-y border-stone-200 bg-surface py-16 md:py-24" aria-labelledby="spring-title">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <Photo
              kind="finished-lawn"
              file="seasonal-spring-lawn.jpg"
              shot="A customer lawn after the first spring mow: fresh green, crisp edge along the walk"
              ratio="4/3"
            />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <SectionHead id="spring-title" eyebrow="Book spring early" title="Get on the spring list now, not in April.">
              The first warm week, everyone calls at once. Book spring cleanup and weekly mowing now and you&apos;re on
              the schedule before the phones start ringing.
            </SectionHead>
            <QuoteButton service="spring" variant="secondary" className="mt-8">
              Book spring service
            </QuoteButton>
          </div>
        </div>
      </section>

      {/* ── Snow removal ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24" aria-labelledby="snow-title">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHead id="snow-title" eyebrow="Snow removal" title="When winter shows up, so do we." className="lg:col-span-7">
            Driveways and walkways cleared after the snow, so you can get out in the morning. Same crew you see all
            summer.
          </SectionHead>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-ink-muted" data-ph="snow-details">
              [PLACEHOLDER: snow details from Tyler, e.g. how many inches before we come out, driveways vs. walks,
              salting.]
            </p>
            <QuoteButton service="snow" variant="secondary" className="mt-6">
              Ask about snow removal
            </QuoteButton>
          </div>
        </div>
      </section>

      {/* ── The year at a glance: ruled calendar strip ─────────────── */}
      <section className="border-t border-stone-200 bg-surface py-16 md:py-24" aria-labelledby="year-title">
        <div className="container-x">
          <SectionHead id="year-title" eyebrow="All four seasons" title="The Kolar Creek year." className="max-w-2xl" />
          <ol className="mt-10 grid border-t-2 border-evergreen-900 sm:grid-cols-2 lg:grid-cols-4">
            {year.map((s) => (
              <li
                key={s.season}
                className={`border-b border-stone-200 py-6 sm:px-5 sm:odd:pl-0 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:first:pl-0 ${
                  s.now ? "bg-chalk lg:-mt-[2px] lg:border-t-[4px] lg:border-t-safety lg:pl-5!" : ""
                }`}
              >
                <p className="flex items-baseline justify-between gap-2">
                  <span className="h3">{s.season}</span>
                  {s.now && <span className="label-caps text-safety-700">Now</span>}
                </p>
                <ul className="mt-3 space-y-1.5 text-ink-muted">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" aria-labelledby="about-title" id="about">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Photo
              kind="truck-trailer"
              file="about-truck-trailer.jpg"
              shot="Tyler's truck and trailer loaded up for the day (Tyler in frame is optional; this works without a face)"
              ratio="4/5"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHead id="about-title" eyebrow="About Kolar Creek" title={`${site.owner}'s crew, out of Fenton.`} />
            <div className="mt-6 space-y-4 text-lg">
              <p>
                Kolar Creek Lawn Care &amp; Landscaping is run by {site.owner}. We&apos;re a local crew doing{" "}
                {site.jobsPerMonth} jobs a month around Fenton, and every one gets the same treatment: show up on the
                day we said, do the whole job, leave it clean.
              </p>
              <p className="text-ink-muted" data-ph="about-story">
                [PLACEHOLDER: two or three lines from Tyler in his own words: how he got started, why Kolar Creek, what
                he won&apos;t cut corners on.]
              </p>
            </div>
            <dl className="mt-8 grid grid-cols-2 border-t-2 border-evergreen-900">
              <div className="border-b border-stone-200 py-4 pr-4">
                <dt className="label-caps text-stone-600">Owner</dt>
                <dd className="mt-1 font-semibold text-evergreen-900">{site.owner}</dd>
              </div>
              <div className="border-b border-l border-stone-200 py-4 pl-4">
                <dt className="label-caps text-stone-600">Based in</dt>
                <dd className="mt-1 font-semibold text-evergreen-900">Fenton, MI</dd>
              </div>
              <div className="border-b border-stone-200 py-4 pr-4">
                <dt className="label-caps text-stone-600">Jobs a month</dt>
                <dd className="mt-1 font-semibold text-evergreen-900">{site.jobsPerMonth}</dd>
              </div>
              <div className="border-b border-l border-stone-200 py-4 pl-4">
                <dt className="label-caps text-stone-600">Hours</dt>
                <dd className="mt-1 text-[0.95rem] text-evergreen-900" data-ph="hours">
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <CtaBand eyebrow="Fall cleanup · Fenton, MI" title="Get your fall cleanup on the calendar." service="fall">
        Dates fill up once the leaves are down. Book now, and ask about spring while you&apos;re at it.
      </CtaBand>
    </>
  );
}
