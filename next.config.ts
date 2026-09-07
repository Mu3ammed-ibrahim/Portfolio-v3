import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the user's home folder otherwise makes Turbopack guess the wrong root.
  turbopack: { root: __dirname },
  // Lets app/global-not-found.tsx serve 404s; the locale layout under [locale] cannot compose one.
  experimental: { globalNotFound: true },
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
