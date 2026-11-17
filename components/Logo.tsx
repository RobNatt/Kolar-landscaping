/**
 * PLACEHOLDER LOGO: a type-only wordmark until Tyler's logo file arrives.
 * Swap the contents for <Image src="/logo.svg" ... /> and keep the same sizing.
 */
export function Logo({ condensed = false }: { condensed?: boolean }) {
  return (
    <span
      data-ph="logo"
      title="Placeholder logo"
      className={`flex origin-left flex-col leading-none transition-transform duration-200 ease-(--ease-firm) ${
        condensed ? "scale-[0.82]" : ""
      }`}
    >
      <span className="text-[1.4rem] font-extrabold uppercase tracking-[0.01em] [font-stretch:62%] min-[400px]:text-[1.6rem] md:text-[2rem]">
        Kolar Creek
      </span>
      <span className="mt-0.5 text-[0.56rem] font-bold uppercase tracking-[0.1em] text-evergreen-100 [font-stretch:75%] min-[400px]:text-[0.62rem] min-[400px]:tracking-[0.16em] md:text-[0.7rem]">
        Lawn Care <span className="text-safety">&</span> Landscaping
      </span>
    </span>
  );
}
