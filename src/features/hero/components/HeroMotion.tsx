"use client";

import { useRef, type ReactNode } from "react";
import { useHeroIntro } from "@/features/hero/hooks/use-hero-intro";
import { useHeroParallax } from "@/features/hero/hooks/use-hero-parallax";

type HeroMotionProps = { children: ReactNode; className?: string };

/** Client boundary for the hero: owns the entrance timeline and the cursor parallax. */
export function HeroMotion({ children, className }: HeroMotionProps) {
  const scope = useRef<HTMLElement>(null);
  useHeroIntro(scope);
  const { onMove, onLeave } = useHeroParallax(scope);

  return (
    <section id="top" ref={scope} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </section>
  );
}
