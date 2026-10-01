import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Small brand label above the title; used sparingly, not on every section. */
  eyebrow?: string;
  /** "md" for long headings that share a row with other columns. */
  size?: "lg" | "md";
  /** "split" rises letter by letter on entry; "scrub" brightens word by word with scroll. */
  motion?: "split" | "scrub";
  children: ReactNode;
};

// Two segments composed with max(): the shallow one carries the phone range up to the point
// where the original vw term overtakes it, so every width from that crossover up renders
// exactly as before. Without it the vw term sits under its own floor below ~800px and the
// "fluid" type is a fixed size on every phone.
const sizes = {
  lg: "text-[clamp(34px,max(calc(29px+1.36vw),5vw),72px)] rtl:text-[clamp(27px,max(calc(23px+1.04vw),3.8vw),56px)]",
  md: "text-[clamp(30px,max(calc(26.5px+0.94vw),3.6vw),54px)] rtl:text-[clamp(23px,max(calc(20px+0.78vw),2.8vw),42px)]",
};

/** Condensed display title closed by the brand-coloured full stop from the reference. */
export function SectionHeading({ eyebrow, size = "lg", motion = "split", children }: SectionHeadingProps) {
  return (
    <div>
      {eyebrow ? (
        <p data-reveal className="meta mb-4 flex items-center gap-3 text-brand">
          {eyebrow}
          <span aria-hidden className="font-latin tracking-[.3em]">
            {"//////"}
          </span>
        </p>
      ) : null}
      <h2
        data-split={motion === "split" ? "" : undefined}
        data-scrub={motion === "scrub" ? "" : undefined}
        className={`disp ${sizes[size]}`}
      >
        {children}
        <span className="text-brand">.</span>
      </h2>
    </div>
  );
}
