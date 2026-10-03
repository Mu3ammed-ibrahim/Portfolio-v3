import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BrandMark } from "@/lib/brand/BrandMark";
import { brandHex } from "@/lib/brand/brand-hex";
import { locales } from "@/lib/i18n/config";
import { en } from "@/lib/i18n/dictionaries/en";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.owner}, ${en.hero.kicker.toLowerCase()}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const fontDir = join(process.cwd(), "src/assets/fonts");

/**
 * One card for both locales. Satori orders Arabic words correctly but mis-measures their widths,
 * so Arabic lines come out unevenly spaced; the card sticks to the Latin brand copy instead.
 */
export default async function OpenGraphImage() {
  const [display, body] = await Promise.all([
    readFile(join(fontDir, "Archivo-Condensed-ExtraBold.ttf")),
    readFile(join(fontDir, "Archivo-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: brandHex.ground }}>
        <div
          style={{
            width: 420,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: brandHex.surface,
          }}
        >
          <BrandMark height={380} />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px 0 64px",
            color: brandHex.ink,
            fontFamily: "Archivo",
          }}
        >
          <div style={{ display: "flex", width: 72, height: 8, background: brandHex.brand, marginBottom: 28 }} />
          <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: 4, textTransform: "uppercase", color: brandHex.brand }}>
            {en.hero.kicker}
          </div>
          <div
            style={{
              fontFamily: "Archivo Display",
              fontSize: 168,
              fontWeight: 800,
              lineHeight: 0.9,
              textTransform: "uppercase",
              marginTop: 12,
            }}
          >
            {site.name}
          </div>
          <div style={{ fontSize: 38, fontWeight: 500, marginTop: 28 }}>{site.owner}</div>
          <div style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.35, marginTop: 14, opacity: 0.62 }}>
            {en.hero.copy}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo Display", data: display, weight: 800, style: "normal" },
        { name: "Archivo", data: body, weight: 500, style: "normal" },
      ],
    },
  );
}
