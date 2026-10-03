import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans_Arabic, Noto_Kufi_Arabic } from "next/font/google";
import { IntroOverlay } from "@/features/intro/components/IntroOverlay";
import { SmoothScroll } from "@/features/site-shell/components/SmoothScroll";
import { brandHex } from "@/lib/brand/brand-hex";
import { defaultLocale, dirOf, isLocale, locales, otherLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { site } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";
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

// Open Graph wants territory-style locale tags, not bare language codes.
const ogLocale: Record<Locale, string> = { en: "en_US", ar: "ar_SA" };

export const viewport: Viewport = {
  themeColor: brandHex.ground,
  colorScheme: "dark",
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale: segment } = await params;
  const locale = isLocale(segment) ? segment : defaultLocale;
  const t = getDictionary(locale);
  return {
    // Share scrapers need absolute URLs; this resolves the relative ones below and the og:image.
    metadataBase: siteUrl,
    title: t.meta.title,
    description: t.meta.description,
    applicationName: site.name,
    authors: [{ name: site.owner }],
    creator: site.owner,
    alternates: { languages: { en: "/en", ar: "/ar", "x-default": "/en" } },
    // No `images` here: the colocated opengraph-image.tsx adds og:image and its size/alt tags.
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      url: `/${locale}`,
      locale: ogLocale[locale],
      alternateLocale: ogLocale[otherLocale(locale)],
    },
    // Without the card type X falls back to the small square preview.
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
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
