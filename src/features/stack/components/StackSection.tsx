import { RevealGroup } from "@/components/RevealGroup";
import { SectionBand } from "@/components/SectionBand";
import { stack } from "@/features/stack/lib/stack";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type StackSectionProps = { t: Dictionary };

export function StackSection({ t }: StackSectionProps) {
  return (
    <SectionBand id="stack">
      <RevealGroup className="wrap flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:gap-14">
        <h2 data-reveal className="disp flex-none text-[28px] rtl:text-2xl">
          {t.stack.heading}
          <span className="text-brand">.</span>
        </h2>
        {/* Brand names read left-to-right in both languages */}
        <ul
          dir="ltr"
          data-reveal="0.1"
          className="grid flex-1 grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-between"
        >
          {stack.map(({ name, icon }) => (
            <li
              key={name}
              className="flex items-center gap-2.5 text-[13px] font-semibold text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" aria-hidden className="size-5 flex-none fill-current">
                <path d={icon.path} />
              </svg>
              {name}
            </li>
          ))}
        </ul>
      </RevealGroup>
    </SectionBand>
  );
}
