import Image from "next/image";
import { RevealGroup } from "@/components/RevealGroup";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type AboutSectionProps = { t: Dictionary };

export function AboutSection({ t }: AboutSectionProps) {
  const [lineA, lineB, lineC] = t.about.heading;

  return (
    <section id="about" className="relative z-[1] border-t border-divider">
      <RevealGroup className="wrap py-14 lg:py-[72px]">
        <h2 className="rail" data-reveal>
          {t.about.rail}
        </h2>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_.9fr_.9fr] lg:gap-12">
          <p
            data-reveal
            className="disp text-[clamp(40px,4.6vw,72px)] leading-[.92] rtl:text-[clamp(34px,4vw,64px)]"
          >
            {lineA}
            <br />
            {lineB}
            <br />
            {lineC} <span className="text-brand">{t.about.highlight}</span>
          </p>
          <div data-reveal="0.1">
            <p className="mb-4 text-[15px] leading-[1.75] text-ink">{t.about.p1}</p>
            <p className="text-[15px] leading-[1.75] text-ink-muted">{t.about.p2}</p>
          </div>
          <div data-reveal="0.2" className="grid h-[260px] grid-cols-[14px_1fr]">
            <div className="bg-brand" />
            <div className="relative bg-surface grayscale contrast-110">
              <Image
                src="/about-photo.webp"
                alt={t.about.photoAlt}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </RevealGroup>
    </section>
  );
}
