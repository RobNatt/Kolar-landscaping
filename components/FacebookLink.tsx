import { site } from "@/lib/site";

/** Facebook "f" mark. Lucide dropped brand icons, so this one is inline. */
function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.68c0-.85.24-1.43 1.46-1.43h1.56V4.62c-.27-.04-1.2-.12-2.27-.12-2.25 0-3.79 1.37-3.79 3.89v2.17H7.92v2.94h2.54V21h3.04Z" />
    </svg>
  );
}

/** For the icon variant, pass the display class (e.g. "hidden md:inline-flex") via className;
 *  the component sets no display of its own so it can't override `hidden`. */
export function FacebookLink({ variant = "icon", className = "inline-flex" }: { variant?: "icon" | "text"; className?: string }) {
  const common = {
    href: site.facebook,
    target: "_blank",
    rel: "noopener noreferrer",
    "data-ph": "facebook",
  } as const;

  if (variant === "icon") {
    return (
      <a
        {...common}
        aria-label="Kolar Creek on Facebook (opens in a new tab)"
        className={`h-12 w-12 items-center justify-center rounded-[2px] text-chalk hover:bg-evergreen-700 ${className}`}
      >
        <FacebookIcon size={22} />
      </a>
    );
  }

  return (
    <a {...common} className={`flex min-h-11 items-center gap-2 hover:text-chalk hover:underline ${className}`}>
      <FacebookIcon size={18} />
      Facebook
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
