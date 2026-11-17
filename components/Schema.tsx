import { services, site, type ServiceId } from "@/lib/site";

/**
 * LocalBusiness JSON-LD, rendered on every page. Phone, hours, service area and
 * URL come from lib/site.ts, so replacing the placeholders there fixes the schema too.
 * `featured` lists the services this page is about (they go first in the catalog).
 */
export function LocalBusinessSchema({ path, featured = [] }: { path: string; featured?: ServiceId[] }) {
  const offered = services.filter((s) => s.id !== "other");
  const ordered = [...offered.filter((s) => featured.includes(s.id)), ...offered.filter((s) => !featured.includes(s.id))];

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    mainEntityOfPage: `${site.url}${path === "/" ? "" : path}`,
    telephone: site.phone.tel,
    image: `${site.url}/og.jpg`, // PLACEHOLDER: add a real crew/lawn photo at public/og.jpg
    logo: `${site.url}/logo.png`, // PLACEHOLDER: add the logo at public/logo.png
    founder: { "@type": "Person", name: site.owner },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: site.serviceArea.map((name) => ({ "@type": "Place", name: `${name}, MI` })),
    openingHoursSpecification: site.hoursSchema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Lawn care, landscaping and seasonal services",
      itemListElement: ordered.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: `${site.url}${s.page}` },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
