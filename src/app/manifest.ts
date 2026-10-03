import type { MetadataRoute } from "next";
import { brandHex } from "@/lib/brand/brand-hex";
import { defaultLocale } from "@/lib/i18n/config";
import { en } from "@/lib/i18n/dictionaries/en";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: en.meta.description,
    start_url: `/${defaultLocale}`,
    display: "standalone",
    background_color: brandHex.ground,
    theme_color: brandHex.ground,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
