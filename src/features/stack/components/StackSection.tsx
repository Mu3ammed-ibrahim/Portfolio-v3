import { RevealGroup } from "@/components/RevealGroup";
import { stack } from "@/features/stack/lib/stack";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type StackSectionProps = { t: Dictionary };

export function StackSection({ t }: StackSectionProps) {
  return (
    <section id="stack" className="relative z-[1] border-t border-divider">
      <RevealGroup className="wrap py-12">
        <h2 className="rail" data-reveal>
          {t.stack.rail}
        </h2>
        {/* Technology names read left-to-right in both languages */}
        <ul dir="ltr" data-reveal className="flex flex-wrap border-t border-s border-divider">
          {stack.map((item) => (
            <li
              key={item}
              className="disp font-latin flex-auto border-e border-b border-divider px-6 py-4 text-[clamp(22px,2.4vw,34px)] font-stretch-[72%] transition-colors duration-300 hover:bg-surface hover:text-brand"
            >
              {item}
            </li>
          ))}
        </ul>
      </RevealGroup>
    </section>
  );
}
