import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Small brand label above the title; used sparingly, not on every section. */
  eyebrow?: string;
  children: ReactNode;
};

/** Condensed display title closed by the brand-coloured full stop from the reference. */
export function SectionHeading({ eyebrow, children }: SectionHeadingProps) {
  return (
    <div data-reveal>
      {eyebrow ? (
        <p className="meta mb-4 flex items-center gap-3 text-brand">
          {eyebrow}
          <span aria-hidden className="font-latin tracking-[.3em]">
            {"//////"}
          </span>
        </p>
      ) : null}
      <h2 className="disp text-[clamp(40px,5vw,72px)] rtl:text-[clamp(32px,3.8vw,56px)]">
        {children}
        <span className="text-brand">.</span>
      </h2>
    </div>
  );
}
