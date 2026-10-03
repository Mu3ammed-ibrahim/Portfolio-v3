/**
 * Absolute origin used for share-image URLs, the sitemap and robots.txt. Server-only on purpose:
 * site.ts is imported by client components, and the Vercel system variable isn't exposed to them.
 *
 * 1. NEXT_PUBLIC_SITE_URL: set this once a custom domain exists, e.g. https://mostudio.dev
 * 2. VERCEL_PROJECT_PRODUCTION_URL: Vercel's production host (no protocol). It switches to the
 *    custom domain automatically once one is attached, so production previews work before step 1.
 * 3. localhost for `next dev` / `next start` on this machine.
 */
function resolveSiteUrl(): URL {
  if (process.env.NEXT_PUBLIC_SITE_URL) return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  return new URL("http://localhost:3000");
}

export const siteUrl = resolveSiteUrl();
