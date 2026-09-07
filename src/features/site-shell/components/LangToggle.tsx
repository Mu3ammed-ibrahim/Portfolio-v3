"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { locales, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type LangToggleProps = { locale: Locale; switchLabel: string };

const labels: Record<Locale, string> = { en: "EN", ar: "ع" };

export function LangToggle({ locale, switchLabel }: LangToggleProps) {
  const router = useRouter();

  // Keep the reader on the same section when the language flips.
  const switchTo = (code: Locale) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (code === locale) return;
    router.push(`/${code}${window.location.hash}`, { scroll: false });
  };

  return (
    <div className="flex border border-divider" role="group" aria-label={switchLabel}>
      {locales.map((code) => {
        const isOn = code === locale;
        return (
          <Link
            key={code}
            href={`/${code}`}
            hrefLang={code}
            lang={code}
            aria-current={isOn ? "true" : undefined}
            onClick={switchTo(code)}
            className={cn(
              "px-2.5 py-1.5 text-[11px] leading-none font-bold tracking-[.1em] text-ink-muted transition-colors duration-250 hover:text-ink",
              code === "ar" && "font-arabic",
              isOn && "bg-brand text-white hover:text-white",
            )}
          >
            {labels[code]}
          </Link>
        );
      })}
    </div>
  );
}
