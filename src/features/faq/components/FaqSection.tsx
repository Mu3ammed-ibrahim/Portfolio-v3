import { RevealGroup } from "@/components/RevealGroup";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqItem } from "@/features/faq/components/FaqItem";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type FaqSectionProps = { t: Dictionary };

export function FaqSection({ t }: FaqSectionProps) {
  return (
    <section id="faq" className="relative z-[1]">
      {/* Top padding clears the Stats band's diagonal edge, like Services after About. */}
      <RevealGroup className="wrap grid grid-cols-1 gap-10 pt-[calc(var(--cut)+44px)] pb-18 lg:grid-cols-[.8fr_1.2fr] lg:gap-16 lg:pt-[calc(var(--cut)+56px)] lg:pb-24">
        {/* Sticky below the 64px header so the title stays in view beside a long list. */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading eyebrow={t.faq.rail}>{t.faq.heading}</SectionHeading>
        </div>
        <div className="border-t border-divider">
          {t.faq.items.map((item, index) => (
            <FaqItem key={item.q} index={index} question={item.q} answer={item.a} />
          ))}
        </div>
      </RevealGroup>
    </section>
  );
}
