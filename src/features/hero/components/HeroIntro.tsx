"use client";

import { useRef, type ReactNode } from "react";
import { EASE_OUT, MOTION_OK, MOTION_REDUCE, gsap, useGSAP } from "@/lib/gsap";
import { whenIntroDone } from "@/lib/intro-gate";
import { cn } from "@/lib/utils";

type HeroIntroProps = { children: ReactNode; className?: string };

/**
 * Plays the hero entrance once, in reading order. The hidden start state ships in the server HTML
 * as classes on each HeroItem, so there's no flash before hydration and nothing branches the render
 * on the reduced-motion preference. With reduced motion the slides are dropped and the fades kept.
 */
export function HeroIntro({ children, className }: HeroIntroProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-hero]", scope.current);
      const at = (index: number) => 0.15 + index * 0.1;

      gsap.matchMedia().add({ ok: MOTION_OK, reduce: MOTION_REDUCE }, (context) => {
        const reduce = Boolean(context.conditions?.reduce);
        // Held until the intro overlay starts leaving, so the entrance plays as it wipes away rather
        // than hidden behind it. context.add files the late tweens under this context, so they revert with it.
        const play = () => {
          // Marks the scope once the entrance lands; the hero beams in globals.css wait for it.
          const timeline = gsap.timeline({
            onComplete: () => scope.current?.setAttribute("data-hero-ready", ""),
          });

          items.forEach((item, index) => {
            if (reduce) {
              gsap.set(item, { y: 0, opacity: 0 });
              timeline.to(item, { opacity: 1, duration: 0.8, ease: EASE_OUT }, at(index));
            } else if (item.dataset.hero === "line") {
              // Headline lines slide up out of their own clip box rather than fading.
              timeline.to(item, { y: 0, duration: 0.9, ease: EASE_OUT }, at(index));
            } else {
              timeline.fromTo(
                item,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.8, ease: EASE_OUT },
                at(index),
              );
            }
          });
        };
        return whenIntroDone(() => context.add(play));
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}

type HeroItemProps = { children: ReactNode; className?: string; kind?: "rise" | "line" };

export function HeroItem({ children, className, kind = "rise" }: HeroItemProps) {
  return (
    <div
      data-hero={kind}
      // `transform` rather than Tailwind's translate utility, which sets the separate
      // `translate` property and would stack with the transform GSAP writes.
      className={cn(kind === "line" ? "transform-[translateY(110%)]" : "opacity-0", className)}
    >
      {children}
    </div>
  );
}
