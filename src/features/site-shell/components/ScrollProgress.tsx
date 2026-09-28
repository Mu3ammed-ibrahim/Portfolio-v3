"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  // Scrubbed straight to scroll position; Lenis already smooths the scroll itself, so no spring is needed.
  useGSAP(() => {
    gsap.to(bar.current, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } });
  });

  return (
    <div
      ref={bar}
      aria-hidden
      className="fixed inset-x-0 top-0 z-30 h-0.5 origin-left bg-brand transform-[scaleX(0)] rtl:origin-right"
    />
  );
}
