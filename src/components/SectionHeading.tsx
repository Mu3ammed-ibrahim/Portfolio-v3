import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Small brand label above the title; used sparingly, not on every section. */
  eyebrow?: string;
  /** "md" for long headings that share a row with other columns. */
  size?: "lg" | "md";
  children: ReactNode;
};

const sizes = {
  lg: "text-[clamp(40px,5vw,72px)] rtl:text-[clamp(32px,3.8vw,56px)]",
  md: "text-[clamp(36px,3.6vw,54px)] rtl:text-[clamp(28px,2.8vw,42px)]",
};

/** Condensed display title closed by the brand-coloured full stop from the reference. */
export function SectionHeading({ eyebrow, size = "lg", children }: SectionHeadingProps) {
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
      <h2 className={`disp ${sizes[size]}`}>
        {children}
        <span className="text-brand">.</span>
      </h2>
    </div>
  );
}
