"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { onIdle } from "@/lib/idle";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  // Scrubbed straight to scroll position; Lenis already smooths the scroll itself, so no spring is
  // needed. Built in an idle slot so ScrollTrigger's own setup lands after first paint rather than
  // inside hydration's layout effect. Deliberately not gated on MOTION_OK: this reports position
  // rather than animating, so it has to keep filling under reduced motion.
  useGSAP((context) =>
    onIdle(() =>
      context.add(() => {
        gsap.to(bar.current, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } });
      }),
    ),
  );

  return (
    <div
      ref={bar}
      aria-hidden
      className="fixed inset-x-0 top-0 z-30 h-0.5 origin-left bg-brand transform-[scaleX(0)] rtl:origin-right"
    />
  );
}
