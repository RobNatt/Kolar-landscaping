import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { QuoteButton } from "@/components/Quote";
import { Photo } from "@/components/Photo";
import { SectionHead } from "@/components/SectionHead";
import { CtaBand } from "@/components/CtaBand";
import { LocalBusinessSchema } from "@/components/Schema";

// Target keyword: "lawn care Fenton MI"
export const metadata: Metadata = {
  title: { absolute: "Lawn Care Fenton MI | Kolar Creek Lawn Care & Landscaping" },
  description:
    "Lawn care in Fenton, MI from a local crew that shows up: weekly mowing, landscaping, tree clipping and removal, fall cleanups and snow removal. Get a free quote.",
  alternates: { canonical: "/" },
};

const steps = [
  {
    title: "Request a quote",
    body: "Fill out the five-field form or call. It takes about a minute.",
  },
  {
    title: "We come take a look",
    body: "Tyler walks the property with you, hears what you want done, and gives you a price for your yard. The visit is free.",
  },
  {
    title: "You're on the schedule",
    body: "You get a regular day. That's the day we show up, every time.",
  },
];

export default function Home() {
  return (
    <>
      <LocalBusinessSchema path="/" featured={["lawn", "landscaping", "fall"]} />

      {/* ── Hero: dark, split, photo bleeds to the right edge ───────── */}
      <section className="on-dark relative overflow-hidden bg-evergreen-900 text-chalk" aria-labelledby="home-title">
        <div className="container-x grid gap-10 pb-14 pt-10 md:pb-20 md:pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-24">
          <div className="lg:col-span-7 lg:pr-6">
            <p className="eyebrow">Lawn care · Landscaping · Fenton, MI</p>
            <h1 id="home-title" className="display mt-5">
              Lawn care and landscaping in Fenton, from a crew that{" "}
              <span className="text-safety">shows up.</span>
            </h1>
            <p className="lead mt-6">
              Mowing, beds, tree work, fall cleanups and snow removal for homes around Fenton. {site.owner}&apos;s crew
              handles {site.jobsPerMonth} jobs a month, on the day we said we&apos;d be there.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteButton />
              <a href={`tel:${site.phone.tel}`} className="btn btn-ondark">
                Call <span data-ph="phone" className="tabular-nums">{site.phone.display}</span>
              </a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-[0.95rem] text-evergreen-100">
              <MapPin aria-hidden size={18} className="shrink-0 text-safety" />
              <span data-ph="service-area">
                Serving {site.serviceArea.slice(0, 3).join(", ")} and nearby
              </span>
            </p>
          </div>
          <div className="lg:col-span-5 lg:-mr-[max(32px,calc((100vw_-_1200px)/2_+_32px))]">
            {/* AI-generated hero (generic lawn, not a Kolar Creek job). Once Tyler has a great
                stripe shot of his own, save it over public/photos/hero-fall-lawn.jpg. */}
            <Photo
              kind="finished-lawn"
              file="hero-fall-lawn.jpg"
              shot="Freshly striped front lawn in early fall morning light, a maple turning orange behind it"
              ratio="4/5"
              sizes="(min-width: 1024px) 45vw, 100vw"
              priority
              className="max-h-[640px] w-full"
            />
          </div>
        </div>
      </section>

      {/* ── Proof strip: ruled spec plate, not cards ────────────────── */}
      <section aria-label="At a glance" className="border-b border-stone-200 bg-surface">
        <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
          {[
            [site.jobsPerMonth, "Jobs every month"],
            ["Fenton", "Owner-run, local crew"],
            ["Free", "Quotes, on site"],
            ["4 seasons", "Mowing to snow removal"],
          ].map(([value, label], i) => (
            <div
              key={label}
              className={`flex flex-col py-6 pr-4 md:py-8 ${i % 2 ? "border-l border-stone-200 pl-5" : ""} ${
                i === 2 ? "border-t border-stone-200 lg:border-l lg:border-t-0 lg:pl-5" : ""
              } ${i === 3 ? "border-t border-stone-200 lg:border-t-0" : ""}`}
            >
              <dt className="label-caps order-2 mt-1 text-stone-600">{label}</dt>
              <dd className="h3 text-[clamp(1.75rem,2vw+1rem,2.5rem)] tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Services: one feature row + a numbered ledger ───────────── */}
      <section className="py-16 md:py-24" aria-labelledby="services-title">
        <div className="container-x">
          <SectionHead id="services-title" eyebrow="Services · 01 – 03" title="One crew for the whole yard, all year." className="max-w-3xl">
            Lawn care in Fenton, MI is where most customers start. A lot of them end up handing us the beds, the trees
            and the driveway too.
          </SectionHead>

          {/* 01: feature */}
          <article className="mt-12 grid gap-8 border-t-2 border-evergreen-900 pt-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Photo
                kind="finished-lawn"
                file="home-finished-lawn.jpg"
                shot="A finished customer lawn: crisp edge along the driveway, stripes running away from the camera"
                ratio="16/10"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="h2 text-safety-700 tabular-nums">01</p>
              <h3 className="h3 mt-2">Lawn care & mowing</h3>
              <p className="mt-3 text-ink-muted">
                Weekly or every-other-week mowing with the full checklist every visit: mow, trim, edge, and blow off
                every hard surface.
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-y border-stone-200 py-4 text-[0.95rem]">
                {["Mowing", "String trimming", "Edging", "Blow-off", "Spring & fall cleanups", "Leaf removal"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span aria-hidden className="h-2 w-2 shrink-0 bg-evergreen-500" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/lawn-care" className="link-arrow mt-5">
                Lawn care & mowing <ArrowRight aria-hidden size={18} />
              </Link>
            </div>
          </article>

          {/* 02 + 03: ledger rows */}
          <div className="mt-14">
            {[
              {
                n: "02",
                title: "Landscaping & tree work",
                body: "Bed cleanup and edging, mulch and stone, planting, plus tree clipping and removal with the debris hauled away.",
                href: "/landscaping",
                link: "Landscaping & trees",
                kind: "before-after" as const,
                file: "home-bed-after.jpg",
                shot: "The 'after' of a bed job: fresh mulch, sharp spade edge, shrubs trimmed",
              },
              {
                n: "03",
                title: "Seasonal & snow",
                body: "Fall cleanups right now, spring cleanups booked ahead, and snow removal for driveways and walks once winter hits.",
                href: "/seasonal",
                link: "Seasonal services",
                kind: "truck-trailer" as const,
                file: "home-truck-trailer.jpg",
                shot: "Tyler's truck and trailer at a fall cleanup, leaf-loaded trailer or mower on the ramp",
              },
            ].map((s) => (
              <article
                key={s.n}
                className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 border-t border-stone-200 py-8 md:grid-cols-[5rem_1fr_14rem] md:items-center md:gap-x-8"
              >
                <p className="h2 text-safety-700 tabular-nums">{s.n}</p>
                <div>
                  <h3 className="h3">{s.title}</h3>
                  <p className="mt-2 max-w-[56ch] text-ink-muted">{s.body}</p>
                  <Link href={s.href} className="link-arrow mt-3">
                    {s.link} <ArrowRight aria-hidden size={18} />
                  </Link>
                </div>
                <Photo kind={s.kind} file={s.file} shot={s.shot} ratio="4/3" sizes="(min-width: 768px) 224px, 100vw" className="col-span-2 md:col-span-1" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works: sticky heading left, ruled steps right ────── */}
      <section className="border-y border-stone-200 bg-surface py-16 md:py-24" aria-labelledby="how-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHead id="how-title" eyebrow="How it works" title="Three steps. No runaround." />
              <QuoteButton className="mt-8 hidden lg:inline-flex" />
            </div>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {steps.map((step, i) => (
              <li key={step.title} className="relative grid grid-cols-[3.5rem_1fr] gap-4 pb-10 last:pb-0 md:grid-cols-[5rem_1fr]">
                {/* the connecting stripe */}
                {i < steps.length - 1 && (
                  <span aria-hidden className="absolute bottom-0 left-[1.6rem] top-14 w-[3px] bg-stone-200 md:left-[2.35rem]" />
                )}
                <span className="flex h-14 w-14 items-center justify-center bg-evergreen-900 text-2xl font-extrabold text-chalk [font-stretch:62%] md:h-20 md:w-20 md:text-4xl">
                  {i + 1}
                </span>
                <div className="pt-2 md:pt-4">
                  <h3 className="h3">{step.title}</h3>
                  <p className="mt-2 max-w-[48ch] text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <QuoteButton className="lg:hidden" />
        </div>
      </section>

      {/* ── Towns served ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" aria-labelledby="area-title">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-start">
          <SectionHead id="area-title" eyebrow="Service area" title="Fenton and the towns around it." className="lg:col-span-5">
            Based in Fenton, working the neighborhoods around it. Not sure you&apos;re in range? Ask, and we&apos;ll
            give you a straight answer.
          </SectionHead>
          <ul
            data-ph="service-area"
            className="grid grid-cols-1 border-t-2 border-evergreen-900 sm:grid-cols-2 lg:col-span-6 lg:col-start-7"
          >
            {site.serviceArea.map((town, i) => (
              <li
                key={town}
                className="flex items-baseline justify-between gap-4 border-b border-stone-200 py-4 sm:odd:pr-6 sm:even:border-l sm:even:pl-6"
              >
                <span className="h3">{town}</span>
                <span className="label-caps text-stone-600 tabular-nums">
                  {i === 0 ? "Home base" : "MI"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Get on the schedule before the season fills up.">
        Fall cleanups are booking now, and spring mowing spots go fast. Tell us what the yard needs.
      </CtaBand>
    </>
  );
}
