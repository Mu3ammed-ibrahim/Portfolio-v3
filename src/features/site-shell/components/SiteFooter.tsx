import type { Dictionary } from "@/lib/i18n/get-dictionary";

type SiteFooterProps = { t: Dictionary };

export function SiteFooter({ t }: SiteFooterProps) {
  return (
    <footer className="relative z-[1] border-t border-divider bg-ground">
      <div className="wrap meta grid grid-cols-1 gap-3 py-[22px] text-[10px] text-ink-muted md:grid-cols-[1fr_auto_1fr] md:items-center">
        <span>{t.footer.copyright}</span>
        <span>{t.footer.blurb}</span>
        <a
          href="#top"
          className="flex w-fit items-center gap-2.5 text-inherit transition-colors hover:text-brand md:justify-self-end"
        >
          {t.footer.backTop}
          <span
            aria-hidden
            className="grid size-[22px] place-items-center rounded-full bg-brand text-[11px] text-white"
          >
            {t.arrows.up}
          </span>
        </a>
      </div>
    </footer>
  );
}
