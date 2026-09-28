import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans_Arabic, Noto_Kufi_Arabic } from "next/font/google";
import { IntroOverlay } from "@/features/intro/components/IntroOverlay";
import { SmoothScroll } from "@/features/site-shell/components/SmoothScroll";
import { defaultLocale, dirOf, isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import "@/app/globals.css";

// The width axis is what gives the display type its condensed cut.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-kufi",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

type LocaleParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Only the listed locales exist; anything else falls through to the global 404 without rendering.
export const dynamicParams = false;

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : defaultLocale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { languages: { en: "/en", ar: "/ar" } },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale: segment } = await params;
  // An unknown segment still renders this shell (for not-found), so fall back to English attributes.
  const locale = isLocale(segment) ? segment : defaultLocale;

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      // Lets Next suspend the CSS smooth scroll during route changes (the EN/AR toggle).
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${kufi.variable} ${plexArabic.variable}`}
    >
      <body className="min-h-dvh overflow-x-clip">
        {/* First in <body> so its parse-time script runs before any page content paints */}
        <IntroOverlay />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
