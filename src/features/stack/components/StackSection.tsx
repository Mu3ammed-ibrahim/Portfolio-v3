import { RevealGroup } from "@/components/RevealGroup";
import { SectionBand } from "@/components/SectionBand";
import { StackMarquee } from "@/features/stack/components/StackMarquee";
import { stack } from "@/features/stack/lib/stack";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type StackSectionProps = { t: Dictionary };

// Three copies of the list, not two: translating the track by one copy leaves (N-1) copies to cover
// the viewport, so two copies would need a single copy to be wider than the screen — it measures
// 970px against a column that reaches 1360px, which would open a visible gap. The extras are decorative
// repeats, so they are aria-hidden, and they stay display:none until the marquee is live so the
// fallback grid shows nine items rather than 27.
const COPIES = [0, 1, 2];

export function StackSection({ t }: StackSectionProps) {
  return (
    <SectionBand id="stack">
      <RevealGroup className="wrap flex flex-col gap-8 py-18 lg:flex-row lg:items-center lg:gap-14 lg:py-14">
        <h2 data-split className="disp flex-none text-[clamp(30px,2.4vw,36px)] rtl:text-[clamp(26px,2vw,30px)]">
          {t.stack.heading}
          <span className="text-brand">.</span>
        </h2>
        <StackMarquee>
          {COPIES.map((copy) =>
            stack.map(({ name, icon }) => (
              <li
                key={`${name}-${copy}`}
                // `|| undefined` so the real copy has no attribute at all: React renders aria-* props
                // literally, and `aria-hidden={false}` would emit aria-hidden="false".
                aria-hidden={copy > 0 || undefined}
                // The marquee spaces items with a trailing pad instead of the grid's gap: with a gap
                // the track would be 27 items + 26 gaps while one copy is 9 items + 9 gaps, so a
                // third of the track would not be exactly one copy and the seam would drift ~8px a
                // cycle. 27 x (item + pad) divides exactly.
                className={`${copy > 0 ? "hidden in-data-marquee:flex" : "flex"} items-center gap-2.5 text-[13px] font-semibold text-ink-muted transition-colors duration-300 hover:text-ink in-data-marquee:shrink-0 in-data-marquee:pe-6`}
              >
                <svg viewBox="0 0 24 24" aria-hidden className="size-5 flex-none fill-current">
                  <path d={icon.path} />
                </svg>
                {name}
              </li>
            )),
          )}
        </StackMarquee>
      </RevealGroup>
    </SectionBand>
  );
}
