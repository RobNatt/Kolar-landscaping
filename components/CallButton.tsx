import { Phone } from "lucide-react";
import { site } from "@/lib/site";

/** Tap-to-call (§5.2). Always in the header, never folded into the menu. */
export function CallButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={`tel:${site.phone.tel}`}
      aria-label={`Call ${site.shortName} at ${site.phone.display}`}
      className={`btn btn-call ${className}`}
    >
      <Phone aria-hidden size={18} strokeWidth={2.5} />
      <span className="sm:hidden">Call</span>
      <span className="hidden tabular-nums sm:inline" data-ph="phone">
        {site.phone.display}
      </span>
    </a>
  );
}
