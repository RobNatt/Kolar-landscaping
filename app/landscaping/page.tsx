import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { CtaBand } from "@/components/CtaBand";
import { BeforeAfter } from "@/components/Photo";
import { QuoteButton } from "@/components/Quote";
import { LocalBusinessSchema } from "@/components/Schema";

// Target keyword: "landscaping Fenton MI"
export const metadata: Metadata = {
  title: { absolute: "Landscaping Fenton MI | Beds, Mulch, Planting & Tree Work | Kolar Creek" },
  description:
    "Landscaping in Fenton, MI: bed cleanup and edging, mulch and stone, planting, and tree clipping and removal. Local crew, debris hauled away. Get a free quote.",
  alternates: { canonical: "/landscaping" },
};

// CONFIRM WITH TYLER: the service list and what's included in each.
const beds = [
  {
    title: "Bed cleanup & edging",
    body: "Weeds pulled, old growth cut back, and a fresh spade edge so the line between lawn and bed stays crisp all season.",
  },
  {
    title: "Mulch & stone",
    body: "Fresh mulch spread at the right depth, kept off trunks and siding. Decorative stone for beds that shouldn't need redoing every year.",
  },
  {
    title: "Planting",
    body: "Shrubs, perennials and small trees, planted at the right depth and spacing for how big they'll get.",
  },
];

const treeWork = [
  "Overgrown shrubs and trees trimmed back",
  "Limbs cleared off the roof, driveway and walks",
  "Small to mid-size trees taken down",
  "Brush and branches hauled away",
];

export default function Landscaping() {
  return (
    <>
      <LocalBusinessSchema path="/landscaping" featured={["landscaping", "trees"]} />

      <PageHero
        eyebrow="Landscaping · Fenton, MI"
        title="Landscaping in Fenton, MI. Beds, mulch, planting and trees."
        lead="The work around the lawn: beds that stay sharp, fresh mulch, new plantings, and trees clipped back or taken down."
        service="landscaping"
        photo={{
          kind: "finished-lawn",
          file: "landscaping-hero-finished.jpg",
          shot: "A finished front yard: fresh mulch, sharp bed edges, trimmed shrubs, mowed lawn (wide shot)",
        }}
      />

      {/* ── Beds, mulch, planting: ledger beside a tall photo ───────── */}
      <section className="py-16 md:py-24" aria-labelledby="beds-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHead id="beds-title" eyebrow="Beds & planting" title="Clean lines, fresh mulch, the right plants.">
              Good landscaping in Fenton isn&apos;t complicated. It&apos;s sharp edges, healthy beds, and work that still
              looks good in August.
            </SectionHead>
            <div className="mt-10 border-t-2 border-evergreen-900">
              {beds.map((b, i) => (
                <article key={b.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-stone-200 py-6">
                  <span aria-hidden className="label-caps pt-1.5 text-safety-700 tabular-nums">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="h3">{b.title}</h3>
                    <p className="mt-2 max-w-[56ch] text-ink-muted">{b.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-24">
            <BeforeAfter
              base="landscaping-bed"
              before="A tired bed: weeds, faded mulch, no edge"
              after="Same bed, same angle: weeded, re-edged, fresh mulch"
            />
          </div>
        </div>
      </section>

      {/* ── Tree work: its own dark band ───────────────────────────── */}
      <section className="on-dark bg-evergreen-900 py-16 text-chalk md:py-24" aria-labelledby="trees-title">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHead id="trees-title" eyebrow="Tree clipping & removal" title="Trees trimmed back or taken down.">
              Branches over the roof, shrubs swallowing the walk, a dead tree you&apos;ve been meaning to deal with. We
              clip it, cut it, and haul it off.
            </SectionHead>
            <ul className="mt-8 border-t border-chalk/20">
              {treeWork.map((t) => (
                <li key={t} className="flex items-center gap-3 border-b border-chalk/20 py-3">
                  <span aria-hidden className="h-2 w-2 shrink-0 bg-safety" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.95rem] text-evergreen-100">
              Big trees near power lines or the house? We&apos;ll tell you straight if the job needs a utility crew or a
              certified arborist.
            </p>
            <QuoteButton service="trees" className="mt-8">
              Get a free quote
            </QuoteButton>
          </div>
          <BeforeAfter
            base="trees"
            before="Overgrown tree hanging over a roofline or driveway"
            after="Same angle after: limbs cleared, roof and drive open, brush hauled away"
            className="text-evergreen-100 lg:col-span-6 lg:col-start-7"
          />
        </div>
      </section>

      {/* ── What to expect ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24" aria-labelledby="expect-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <SectionHead id="expect-title" eyebrow="What to expect" title="How a landscaping job goes." className="lg:col-span-4" />
          <ol className="grid gap-px bg-stone-200 sm:grid-cols-2 lg:col-span-8">
            {[
              ["Walk-through", "Tyler walks the yard with you and hears what you have in mind."],
              ["Clear price", "You get a price for the whole job before any work starts."],
              ["Set date", "We put the job on the calendar and show up that day."],
              ["Cleaned up", "Debris, clippings and brush leave with us. Nothing piled at the curb."],
            ].map(([t, d], i) => (
              <li key={t} className="bg-chalk p-6">
                <span className="label-caps text-safety-700 tabular-nums">Step {i + 1}</span>
                <h3 className="h3 mt-2">{t}</h3>
                <p className="mt-2 text-ink-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand eyebrow="Landscaping · Fenton, MI" title="Tell us what the yard needs." service="landscaping">
        Beds, mulch, planting or trees. One visit, one price, one crew.
      </CtaBand>
    </>
  );
}
