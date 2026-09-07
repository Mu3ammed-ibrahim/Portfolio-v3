import { CtaLink } from "@/components/Cta";
import { HeroMotion } from "@/features/hero/components/HeroMotion";
import { HeroVisual } from "@/features/hero/components/HeroVisual";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type HeroProps = { t: Dictionary };

export function Hero({ t }: HeroProps) {
  return (
    <HeroMotion className="wrap relative z-[1] grid min-h-[calc(100dvh-64px)] grid-cols-1 pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]">
      <div className="relative z-[2] flex flex-col justify-center pt-10 pb-12 lg:pb-20">
        <p data-hero-kicker className="meta mb-9 flex items-center gap-2.5 text-ink-muted">
          <span aria-hidden className="size-2 flex-none rounded-full bg-brand" />
          {t.hero.kicker}
        </p>
        <h1 className="disp mb-9 text-[clamp(64px,9.4vw,150px)] leading-[.88] rtl:text-[clamp(44px,5.4vw,88px)]">
          {t.hero.lines.map((line) => (
            // Each line is its own clip box so the intro can slide the words up out of it.
            <span
              key={line}
              className="block overflow-hidden pb-[.08em] -mb-[.08em] rtl:pb-[.22em] rtl:-mb-[.22em]"
            >
              <span data-hero-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p
          data-hero-rise
          className="meta mb-11 max-w-[420px] text-[13px] leading-[1.7] tracking-[.08em] text-ink"
        >
          {t.hero.copy[0]}
          <br />
          {t.hero.copy[1]}
        </p>
        <div data-hero-rise>
          <CtaLink href="#work" label={t.hero.cta} arrow={t.arrows.forward} />
        </div>
      </div>
      <HeroVisual portraitAlt={t.hero.portraitAlt} disciplines={t.hero.disciplines} />
    </HeroMotion>
  );
}
