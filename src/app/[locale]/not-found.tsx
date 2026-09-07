import Link from "next/link";
import { defaultLocale } from "@/lib/i18n/config";

export default function NotFound() {
  return (
    <main className="wrap flex min-h-dvh flex-col justify-center gap-8 py-24">
      <p className="meta text-ink-muted">404</p>
      <h1 className="disp text-[clamp(56px,9vw,140px)]">
        Page
        <br />
        not <span className="text-brand">found.</span>
      </h1>
      <Link href={`/${defaultLocale}`} className="meta w-fit border-b border-ink pb-1 hover:text-brand">
        Back to the portfolio
      </Link>
    </main>
  );
}
