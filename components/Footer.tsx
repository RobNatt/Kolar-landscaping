import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { FacebookLink } from "./FacebookLink";
import { ConsentSettingsButton } from "./Consent";

export function Footer() {
  return (
    <footer className="on-dark border-t border-chalk/12 bg-evergreen-900 text-evergreen-100">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-[0.95rem]">
            Lawn care, landscaping, tree work and snow removal, run by {site.owner} out of Fenton, Michigan.
          </p>
        </div>

        <div className="lg:col-span-3">
          <p className="label-caps text-chalk">Call</p>
          <a href={`tel:${site.phone.tel}`} className="mt-1 inline-flex min-h-11 items-center text-xl font-bold text-chalk tabular-nums underline-offset-4 hover:underline" data-ph="phone">
            {site.phone.display}
          </a>
          <p className="label-caps mt-6 text-chalk">Hours</p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[0.95rem]" data-ph="hours">
            {site.hours.map((h) => (
              <div key={h.days} className="contents">
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-3">
          <p className="label-caps text-chalk">Service area</p>
          <p className="mt-2 text-[0.95rem]" data-ph="service-area">
            {site.serviceArea.join(" · ")}, MI
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <p className="label-caps text-chalk">Pages</p>
          <ul className="mt-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-flex min-h-11 items-center hover:text-chalk hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <FacebookLink variant="text" />
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-x flex flex-col gap-1 border-t border-chalk/10 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.address.locality}, {site.address.region}
        </p>
        <ConsentSettingsButton />
      </div>
    </footer>
  );
}
