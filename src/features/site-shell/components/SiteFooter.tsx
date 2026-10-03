import {
  ArrowUpIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { LangToggle } from "@/features/site-shell/components/LangToggle";
import { getNavItems } from "@/features/site-shell/lib/nav-items";
import { LogoMark } from "@/lib/brand/LogoMark";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { site } from "@/lib/site";

type SiteFooterProps = { t: Dictionary; locale: Locale };

const connect = [
  { href: `mailto:${site.email}`, label: site.email, Icon: EnvelopeSimpleIcon, external: false },
  { href: site.github, label: "GitHub", Icon: GithubLogoIcon, external: true },
  { href: site.linkedin, label: "LinkedIn", Icon: LinkedinLogoIcon, external: true },
];

const linkClass = "text-[14px] text-ink-muted transition-colors hover:text-brand";

export function SiteFooter({ t, locale }: SiteFooterProps) {
  return (
    <footer className="relative z-[1] border-t border-divider bg-ground">
      <div className="wrap grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
        <div>
          <a href="#top" aria-label={t.nav.home} className="mb-5 flex w-fit items-center gap-2.5">
            <LogoMark gradientId="footer-logo-fade" className="h-[27px] w-[51px]" />
            <span className="disp text-lg tracking-[.06em]" aria-hidden>
              M<span className="text-brand">·</span>O
            </span>
          </a>
          <p className="max-w-[300px] text-[14px] leading-[1.7] text-ink-muted">{t.footer.blurb}</p>
        </div>

        <FooterColumn title={t.footer.navTitle}>
          <nav aria-label={t.footer.navTitle}>
            <ul className="flex flex-col gap-3">
              {getNavItems(t).map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </FooterColumn>

        <FooterColumn title={t.footer.connectTitle}>
          <ul className="flex flex-col gap-3">
            {connect.map(({ href, label, Icon, external }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className={`${linkClass} inline-flex items-center gap-2.5`}
                >
                  <Icon aria-hidden className="size-4 flex-none text-brand" />
                  <span dir="ltr">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title={t.footer.langTitle}>
          <LangToggle locale={locale} switchLabel={t.nav.switchLang} />
        </FooterColumn>
      </div>

      <div className="border-t border-divider">
        <div className="wrap meta flex flex-wrap items-center justify-between gap-4 py-5 text-[10px] text-ink-muted">
          <span>{t.footer.copyright}</span>
          <a
            href="#top"
            className="group/top flex items-center gap-2.5 transition-colors hover:text-brand"
          >
            {t.footer.backTop}
            {/* Ground on brand: white would only reach 4.2:1 */}
            <span aria-hidden className="grid size-7 place-items-center bg-brand text-ground">
              <ArrowUpIcon
                weight="bold"
                className="size-3.5 transition-transform duration-300 group-hover/top:-translate-y-0.5"
              />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = { title: string; children: ReactNode };

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <h2 className="meta mb-5 text-ink">{title}</h2>
      {children}
    </div>
  );
}
