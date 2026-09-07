"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
    });
  });

  return (
    <div
      ref={bar}
      aria-hidden
      className="fixed inset-x-0 top-0 z-30 h-0.5 origin-left scale-x-0 bg-brand rtl:origin-right"
    />
  );
}
