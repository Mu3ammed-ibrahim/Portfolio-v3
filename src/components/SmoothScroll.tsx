"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type SmoothScrollProps = { children: ReactNode };

/**
 * Lenis and ScrollTrigger share GSAP's clock so scroll-driven tweens never trail the scroll.
 * Lives inside the provider because the wrapper creates its instance in an effect and publishes
 * it through context; reading a ref from the parent would run before it exists.
 */
function LenisClock() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);
    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis root options={{ autoRaf: false, anchors: true }}>
      <LenisClock />
      {children}
    </ReactLenis>
  );
}
