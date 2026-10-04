import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the user's home folder otherwise makes Turbopack guess the wrong root.
  turbopack: { root: __dirname },
  // Lets app/global-not-found.tsx serve 404s; the locale layout under [locale] cannot compose one.
  experimental: { globalNotFound: true },
  images: {
    // AVIF first, webp for everything that can't take it. Costs ~50% more encode time on the first
    // request per variant, which the long TTL below then amortises.
    formats: ["image/avif", "image/webp"],
    // 31 days, up from the 4-hour default. Everything we optimise is an immutable asset, so the
    // default made the first visitor after every lull pay for a re-transform. The catch: files in
    // public/ carry no content hash, so the optimiser keys on the path — replace an image under a
    // new filename rather than overwriting one in place, or it serves the stale copy for a month.
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
      // Pages link the SVG icon, but some crawlers and older clients still request /favicon.ico blind.
      { source: "/favicon.ico", destination: "/icon.svg", permanent: true },
    ];
  },
};

export default nextConfig;
