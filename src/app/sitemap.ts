import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { siteUrl } from "@/lib/site-url";

const absolute = (path: string) => new URL(path, siteUrl).toString();

// Each locale lists the other as an hreflang alternate, so search engines treat them as one page.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((locale) => [locale, absolute(`/${locale}`)]));
  return locales.map((locale) => ({
    url: absolute(`/${locale}`),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
