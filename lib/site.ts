// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG: every business fact lives here.
//
// ⚠️  PLACEHOLDERS: anything tagged `PLACEHOLDER` must be confirmed with Tyler
//     before launch. While SHOW_PLACEHOLDER_MARKERS is true, every placeholder on
//     the page gets a dashed orange outline so nothing ships by accident.
//     Set it to false only after every PLACEHOLDER below is replaced.
// ─────────────────────────────────────────────────────────────────────────────

export const SHOW_PLACEHOLDER_MARKERS = true;

export const site = {
  name: "Kolar Creek Lawn Care & Landscaping",
  shortName: "Kolar Creek",
  owner: "Tyler Kolar",

  // PLACEHOLDER: real domain (used for canonical URLs, sitemap and schema)
  url: "https://www.kolarcreeklawncare.com",

  // PLACEHOLDER: Tyler's real number. 555-01xx is a reserved fictional range.
  phone: { display: "(810) 555-0147", tel: "+18105550147" },

  // Service-area business: city/ZIP only, no street address shown.
  address: { locality: "Fenton", region: "MI", postalCode: "48430", country: "US" },

  // PLACEHOLDER: confirm the towns Tyler actually serves
  serviceArea: [
    "Fenton",
    "Linden",
    "Holly",
    "Grand Blanc",
    "Hartland",
    "Tyrone Township",
    "Argentine Township",
  ],

  // PLACEHOLDER: confirm hours (display + schema must match)
  hours: [
    { days: "Mon – Fri", time: "7:00 am – 6:00 pm" },
    { days: "Saturday", time: "8:00 am – 2:00 pm" },
    { days: "Sunday", time: "Closed" },
  ],
  hoursSchema: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
    { dayOfWeek: ["Saturday"], opens: "08:00", closes: "14:00" },
  ],

  // PLACEHOLDER: Tyler's real Facebook page URL
  facebook: "https://www.facebook.com/kolarcreeklawncare",

  // Real fact from Tyler: 20+ jobs a month
  jobsPerMonth: "20+",
} as const;

/**
 * Analytics: nothing loads until the visitor clicks "Accept" in the consent banner.
 * PLACEHOLDER: set NEXT_PUBLIC_GA_ID (e.g. G-ABC123XYZ) in the host's environment
 * variables. With no ID set, the banner still records the choice but loads nothing.
 */
export const analyticsId = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const nav = [
  { href: "/", label: "Home" },
  { href: "/lawn-care", label: "Lawn Care" },
  { href: "/landscaping", label: "Landscaping" },
  { href: "/seasonal", label: "Seasonal & About" },
] as const;

/** Options for the quote form's "service needed" select, and the schema offer catalog. */
export const services = [
  { id: "lawn", name: "Lawn mowing & lawn care", page: "/lawn-care" },
  { id: "landscaping", name: "Landscaping (beds, mulch, planting)", page: "/landscaping" },
  { id: "trees", name: "Tree clipping or removal", page: "/landscaping" },
  { id: "fall", name: "Fall cleanup", page: "/seasonal" },
  { id: "spring", name: "Spring cleanup", page: "/seasonal" },
  { id: "snow", name: "Snow removal", page: "/seasonal" },
  { id: "other", name: "Not sure yet / something else", page: "/" },
] as const;

export type ServiceId = (typeof services)[number]["id"];

export const bestTimes = [
  "Morning (before noon)",
  "Afternoon (noon – 5 pm)",
  "Evening (after 5 pm)",
  "Anytime",
] as const;
