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

    // Lenis's own `anchors` option doesn't cancel the browser's hash jump, so the page flashes to the
    // target for a frame before Lenis pulls it back to glide. Handle same-page hash links here instead.
    // On window, so React handlers (e.g. the mobile drawer's) have already had a chance to claim the click.
    const onClick = (event: MouseEvent) => {
      const lenis = lenisRef.current?.lenis;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (!lenis || !link || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      lenis.scrollTo(link.hash);
      history.pushState(null, "", link.hash);
    };
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  // `root` with no children renders nothing and exposes the instance to `useLenis()` anywhere.
  return <ReactLenis root autoRaf={false} ref={lenisRef} />;
}
