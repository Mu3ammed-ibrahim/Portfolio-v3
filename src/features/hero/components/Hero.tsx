import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ActionLink } from "@/components/ActionLink";
import { HeroBackground } from "@/features/hero/components/HeroBackground";
import { HeroIntro, HeroItem } from "@/features/hero/components/HeroIntro";
import { RingBadge } from "@/features/hero/components/RingBadge";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { site } from "@/lib/site";

type HeroProps = { t: Dictionary };

const socials = [
  { href: site.github, label: "GitHub", Icon: GithubLogoIcon, external: true },
  { href: site.linkedin, label: "LinkedIn", Icon: LinkedinLogoIcon, external: true },
  { href: site.instagram, label: "Instagram", Icon: InstagramLogoIcon, external: true },
  { href: `mailto:${site.email}`, label: "Email", Icon: EnvelopeSimpleIcon, external: false },
];

export function Hero({ t }: HeroProps) {
  const [plain, accent] = t.hero.lines;

  return (
    // Pulled up under the 64px sticky header so the photo runs to the top edge.
    <section
      id="top"
      className="relative isolate -mt-16 flex min-h-[100dvh] cut-bottom items-end lg:items-center"
    >
      <HeroBackground alt={t.hero.portraitAlt} />

      <div className="wrap w-full pt-32 pb-[calc(var(--cut)+56px)] lg:pb-[calc(var(--cut)+40px)]">
        <HeroIntro className="max-w-[640px]">
          <HeroItem className="meta mb-6 flex items-center gap-3 text-brand">
            {t.hero.kicker}
            <span aria-hidden className="font-latin tracking-[.3em]">
              {"//////"}
            </span>
          </HeroItem>

          <h1 className="disp mb-7 text-[clamp(44px,max(calc(36px+2.21vw),7.2vw),112px)] rtl:text-[clamp(34px,max(calc(29px+1.36vw),5vw),80px)]">
            {/* Each line is its own clip box so the intro can slide it up out of view. */}
            <span className="block overflow-hidden pb-[.08em] -mb-[.08em] rtl:pb-[.22em] rtl:-mb-[.22em]">
              <HeroItem kind="line">
                {/* data-text feeds the outlined copy the red glint sweeps across */}
                <span className="beam-text block" data-text={plain}>
                  {plain}
                </span>
              </HeroItem>
            </span>
            <span className="block overflow-hidden pb-[.08em] -mb-[.08em] rtl:pb-[.22em] rtl:-mb-[.22em]">
              <HeroItem kind="line" className="text-brand">
                <span className="beam-text block [--beam-color:var(--brand-soft)]" data-text={`${accent}.`}>
                  {accent}
                  <span className="text-ink">.</span>
                </span>
              </HeroItem>
            </span>
          </h1>

          <HeroItem className="mb-9 max-w-[440px] text-[15px] leading-[1.7] text-ink/80">
            <p>{t.hero.copy}</p>
          </HeroItem>

          <HeroItem className="mb-10 flex flex-wrap gap-3">
            <ActionLink href="#work" beam>
              {t.hero.cta}
            </ActionLink>
            <ActionLink href="#contact" variant="outline" beam>
              {t.nav.cta}
            </ActionLink>
          </HeroItem>

          <HeroItem className="flex items-center gap-5">
            <p className="meta text-[10px] text-ink-muted">{t.hero.socials}</p>
            <ul className="flex items-center gap-1">
              {socials.map(({ href, label, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="grid size-10 place-items-center text-ink transition-colors duration-300 hover:text-brand"
                  >
                    <Icon aria-hidden className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </HeroItem>
        </HeroIntro>
      </div>

      <div className="absolute end-[6%] bottom-[calc(var(--cut)+36px)] hidden lg:block">
        <RingBadge text={t.hero.badge} href="#contact" />
      </div>
    </section>
  );
}
