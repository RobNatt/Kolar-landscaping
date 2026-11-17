import type { ReactNode } from "react";

/** Eyebrow + H2. The only thing on the site that reveals on scroll (§6.2). */
export function SectionHead({
  eyebrow,
  title,
  id,
  children,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`section-head ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="h2 mt-4">
        <span className="wipe">{title}</span>
      </h2>
      {children && <div className="lead mt-5">{children}</div>}
    </div>
  );
}
