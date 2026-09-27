import { RevealGroup } from "@/components/RevealGroup";
import { SectionBand } from "@/components/SectionBand";
import { SectionHeading } from "@/components/SectionHeading";
import { AboutPoints } from "@/features/about/components/AboutPoints";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type AboutSectionProps = { t: Dictionary };

export function AboutSection({ t }: AboutSectionProps) {
  return (
    <SectionBand id="about" wedge="start">
      <div aria-hidden className="dots pointer-events-none absolute top-[18%] start-[2%] hidden h-28 w-40 lg:block" />
      <RevealGroup className="wrap grid grid-cols-1 gap-10 py-20 lg:grid-cols-[1.05fr_1fr_.8fr] lg:items-center lg:gap-14 lg:py-24">
        <SectionHeading size="md">
          {t.about.heading} <span className="text-brand">{t.about.highlight}</span>
        </SectionHeading>
        <div data-reveal="0.1" className="lg:border-s lg:border-divider lg:ps-10">
          <p className="mb-4 text-[15px] leading-[1.75] text-ink">{t.about.p1}</p>
          <p className="text-[15px] leading-[1.75] text-ink-muted">{t.about.p2}</p>
        </div>
        <AboutPoints points={t.about.points} />
      </RevealGroup>
    </SectionBand>
  );
}
