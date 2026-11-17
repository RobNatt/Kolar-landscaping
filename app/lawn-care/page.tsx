import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { CtaBand } from "@/components/CtaBand";
import { BeforeAfter } from "@/components/Photo";
import { LocalBusinessSchema } from "@/components/Schema";

// Target keyword: "lawn mowing service Fenton"
export const metadata: Metadata = {
  title: { absolute: "Lawn Mowing Service Fenton MI | Kolar Creek Lawn Care" },
  description:
    "Weekly and every-other-week lawn mowing service in Fenton, MI. Mow, trim, edge and blow-off every visit, from a local crew that shows up. Get a free quote.",
  alternates: { canonical: "/lawn-care" },
};

// CONFIRM WITH TYLER: the checklist, add-ons and FAQ answers below describe how
// the crew works. Adjust anything that doesn't match how he actually runs jobs.
const checklist = [
  ["Mow", "Cut at the right height for the time of year, with clean, even stripes."],
  ["Trim", "String-trim around fences, beds, trees, mailboxes and the house."],
  ["Edge", "Hard edge along the driveway, sidewalk and curb, so the lines stay sharp."],
  ["Blow off", "Clippings blown off the driveway, walks, patio and street before we leave."],
];

const addOns = [
  { name: "Spring cleanup", note: "Winter debris, matted grass, first cut", href: "/seasonal" },
  { name: "Fall cleanup & leaf removal", note: "Leaves out before the snow", href: "/seasonal" },
  { name: "Bed edging & mulch", note: "Pairs with weekly mowing", href: "/landscaping" },
  { name: "Shrub & tree clipping", note: "Trimmed back off the house and walks", href: "/landscaping" },
];

const faqs = [
  {
    q: "Do I need to be home when you mow?",
    a: "No. As long as we can get into the yard (gates unlocked, dogs inside), we'll take care of it and be on our way.",
  },
  {
    q: "What happens when it rains?",
    a: "We don't mow soaked grass. It tears the lawn and leaves ruts. We move you to the next dry day and keep the rest of your schedule the same.",
  },
  {
    q: "How do I get a price?",
    a: "Request a free quote. Tyler comes out, looks at the yard, and gives you a price for your property. Every lot is different, so we don't guess over the phone.",
  },
  {
    q: "When does mowing season start and end?",
    a: "Around Fenton it usually runs from April into November, depending on the weather. Get on the list early and you're on the schedule from the first cut.",
  },
];

export default function LawnCare() {
  return (
    <>
      <LocalBusinessSchema path="/lawn-care" featured={["lawn", "spring", "fall"]} />

      <PageHero
        eyebrow="Lawn care · Fenton, MI"
        title="Lawn mowing service in Fenton, done right every visit."
        lead="Weekly or every-other-week mowing for Fenton-area homes. Same crew, same checklist, same day of the week."
        service="lawn"
        photo={{
          kind: "truck-trailer",
          file: "lawn-hero-truck-trailer.jpg",
          shot: "Tyler's truck and trailer parked at a mowing job, mower on the ramp, striped lawn beside it (wide shot)",
        }}
      />

      {/* ── Checklist: spec-sheet table ─────────────────────────────── */}
      <section className="py-16 md:py-24" aria-labelledby="visit-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <SectionHead id="visit-title" eyebrow="Every visit" title="The same four-step checklist, every time." className="lg:col-span-5">
            Our lawn mowing service in Fenton doesn&apos;t skip steps when the schedule gets busy. You get the whole
            list every visit.
          </SectionHead>
          <dl className="border-t-2 border-evergreen-900 lg:col-span-6 lg:col-start-7">
            {checklist.map(([term, desc], i) => (
              <div key={term} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-stone-200 py-5 md:grid-cols-[3rem_9rem_1fr]">
                <span aria-hidden className="label-caps pt-1 text-safety-700 tabular-nums">
                  0{i + 1}
                </span>
                <dt className="h3">{term}</dt>
                <dd className="col-start-2 mt-1 text-ink-muted md:col-start-3 md:mt-0 md:pt-1">{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Schedule: two options, compared side by side ────────────── */}
      <section className="border-y border-stone-200 bg-surface py-16 md:py-24" aria-labelledby="schedule-title">
        <div className="container-x">
          <SectionHead id="schedule-title" eyebrow="Schedule" title="Weekly or every other week." className="max-w-3xl">
            You pick the rhythm. We&apos;ll tell you honestly which one your lawn needs when we come look.
          </SectionHead>
          <div className="mt-12 grid gap-px bg-stone-200 md:grid-cols-[1.25fr_1fr]">
            <div className="bg-chalk p-6 md:p-8">
              <p className="label-caps text-safety-700">Most popular</p>
              <h3 className="h3 mt-2">Weekly</h3>
              <p className="mt-3 text-ink-muted">
                Best for most lawns from May through June, when Michigan grass grows fastest. The lawn never looks
                shaggy between visits.
              </p>
            </div>
            <div className="bg-chalk p-6 md:p-8">
              <h3 className="h3 mt-[1.55rem]">Every other week</h3>
              <p className="mt-3 text-ink-muted">
                Works for slower-growing or shaded lawns, and for late summer when growth slows down. Ask us if
                it&apos;s right for your yard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Beyond mowing: photo + linked list ─────────────────────── */}
      <section className="py-16 md:py-24" aria-labelledby="more-title">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <BeforeAfter
              base="lawn-first-cut"
              before="Overgrown lawn before the first cut of the season"
              after="Same spot, same angle: mowed, trimmed, edged and blown off"
            />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <SectionHead id="more-title" eyebrow="Add to your mowing" title="Beyond the weekly cut." />
            <ul className="mt-8 border-t-2 border-evergreen-900">
              {addOns.map((a) => (
                <li key={a.name} className="border-b border-stone-200">
                  <Link href={a.href} className="group flex min-h-16 items-center justify-between gap-4 py-4">
                    <span>
                      <span className="block text-lg font-semibold text-evergreen-900">{a.name}</span>
                      <span className="block text-[0.95rem] text-ink-muted">{a.note}</span>
                    </span>
                    <ArrowRight aria-hidden className="shrink-0 text-evergreen-700 transition-transform duration-150 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="border-t border-stone-200 bg-surface py-16 md:py-24" aria-labelledby="faq-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <SectionHead id="faq-title" eyebrow="Questions" title="Lawn mowing, answered." className="lg:col-span-4" />
          <div className="border-t-2 border-evergreen-900 lg:col-span-7 lg:col-start-6">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-stone-200">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold text-evergreen-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="text-2xl font-bold text-safety-700 transition-transform duration-150 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-5 text-ink-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand eyebrow="Lawn mowing · Fenton" title="Get a set mowing day." service="lawn">
        Tell us about the yard. Tyler will come look and get you on the schedule.
      </CtaBand>
    </>
  );
}
