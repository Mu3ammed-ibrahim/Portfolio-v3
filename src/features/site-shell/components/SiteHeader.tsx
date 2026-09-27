import Image from "next/image";
import { ActionLink } from "@/components/ActionLink";
import { HeaderSurface } from "@/features/site-shell/components/HeaderSurface";
import { LangToggle } from "@/features/site-shell/components/LangToggle";
import { MobileNav } from "@/features/site-shell/components/MobileNav";
import { NavLinks } from "@/features/site-shell/components/NavLinks";
import { ScrollProgress } from "@/features/site-shell/components/ScrollProgress";
import { getNavItems } from "@/features/site-shell/lib/nav-items";
import { dirOf, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type SiteHeaderProps = { t: Dictionary; locale: Locale };

export function SiteHeader({ t, locale }: SiteHeaderProps) {
  const items = getNavItems(t);

  return (
    <>
      <ScrollProgress />
      <HeaderSurface>
        <nav className="wrap flex h-16 items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-2.5" aria-label={t.nav.home}>
            <Image src="/logo.png" alt="" width={51} height={34} preload className="h-[34px] w-auto" />
            <span className="disp text-lg tracking-[.06em]" aria-hidden>
              M<span className="text-brand">·</span>O
            </span>
          </a>
          <div className="flex items-center gap-4 md:gap-[26px]">
            <NavLinks items={items} className="hidden md:flex" />
            <LangToggle locale={locale} switchLabel={t.nav.switchLang} />
            <div className="hidden lg:block">
              <ActionLink href="#contact" size="sm">
                {t.nav.cta}
              </ActionLink>
            </div>
            <MobileNav
              items={items}
              dir={dirOf(locale)}
              labels={{ open: t.nav.menu, title: t.nav.menuTitle }}
            />
          </div>
        </nav>
      </HeaderSurface>
    </>
  );
}
