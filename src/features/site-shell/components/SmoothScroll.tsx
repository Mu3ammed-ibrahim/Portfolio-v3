"use client";

import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { MOTION_OK, ScrollTrigger, gsap } from "@/lib/gsap";

const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(MOTION_OK);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/**
 * Page-wide smooth scroll, off under reduced motion so the browser's native scroll is used.
 * The server snapshot is `false`; that's hydration-safe because Lenis renders no DOM of its own.
 */
export function SmoothScroll() {
  const motionOk = useSyncExternalStore(subscribe, () => window.matchMedia(MOTION_OK).matches, () => false);
  return motionOk ? <LenisOnGsapTicker /> : null;
}

// One clock for everything: Lenis steps on GSAP's ticker and pushes each scroll to ScrollTrigger,
// so scrubbed and triggered animations read the same position Lenis just painted.
function LenisOnGsapTicker() {
  const lenisRef = useRef<LenisRef>(null);
  useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    // Lag smoothing would make Lenis jump after a dropped frame instead of catching up.
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  // `root` with no children renders nothing and exposes the instance to `useLenis()` anywhere.
  return <ReactLenis root autoRaf={false} options={{ anchors: true }} ref={lenisRef} />;
}
