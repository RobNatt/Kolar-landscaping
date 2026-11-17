import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteProvider } from "@/components/Quote";
import { RevealObserver } from "@/components/RevealObserver";
import { ConsentBanner } from "@/components/Consent";
import { SHOW_PLACEHOLDER_MARKERS, analyticsId, site } from "@/lib/site";

// One variable font, width + weight axes: condensed headings, normal-width body (§3.1)
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.shortName}` },
  openGraph: { siteName: site.name, locale: "en_US", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0f2a1f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        {/* Hide section headers for the reveal only once JS is confirmed running */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('reveal-ready')" }} />
      </head>
      <body className={`relative antialiased ${SHOW_PLACEHOLDER_MARKERS ? "ph-on" : ""}`}>
        <div id="top-sentinel" aria-hidden className="pointer-events-none absolute left-0 top-6 h-px w-px" />
        <QuoteProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </QuoteProvider>
        <RevealObserver />
        <ConsentBanner analyticsId={analyticsId} />
      </body>
    </html>
  );
}
