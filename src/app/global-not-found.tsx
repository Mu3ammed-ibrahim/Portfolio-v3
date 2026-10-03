import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import Link from "next/link";
import { brandHex } from "@/lib/brand/brand-hex";
import { defaultLocale } from "@/lib/i18n/config";
import { siteUrl } from "@/lib/site-url";
import "@/app/globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Page not found | MO Studio",
  description: "That page does not exist.",
};

export const viewport: Viewport = {
  themeColor: brandHex.ground,
  colorScheme: "dark",
};

// The locale layout cannot host a 404 because it sits under a dynamic segment,
// so this page carries its own document shell (Next's global-not-found convention).
export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className={archivo.variable}>
      <body className="min-h-dvh">
        <main className="wrap flex min-h-dvh flex-col justify-center gap-8 py-24">
          <p className="meta text-ink-muted">404</p>
          <h1 className="disp text-[clamp(56px,9vw,140px)]">
            Page
            <br />
            not <span className="text-brand">found.</span>
          </h1>
          <Link
            href={`/${defaultLocale}`}
            className="meta w-fit border-b border-ink pb-1 transition-colors hover:text-brand"
          >
            Back to the portfolio
          </Link>
        </main>
      </body>
    </html>
  );
}
