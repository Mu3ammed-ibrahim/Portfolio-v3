"use client";

import { useRef, type ReactNode } from "react";
import { EASE_OUT, MOTION_OK, gsap, useGSAP } from "@/lib/gsap";
import { INTRO_ID, whenIntroDone } from "@/lib/intro-gate";

type HeroIntroProps = { children: ReactNode; className?: string };

/**
 * Plays the hero entrance as the intro overlay wipes away. The hero ships visible in the server
 * HTML so the headline counts as painted at first paint (LCP ignores the overlay covering it); the
 * hidden start state is only applied while the overlay hides it, so it never flashes. Without an
 * intro (repeat visit, reduced motion, or the overlay's slow-load fallback) the hero simply stays put.
 */
export function HeroIntro({ children, className }: HeroIntroProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // The hero beams in globals.css wait for this mark.
      const markReady = () => scope.current?.setAttribute("data-hero-ready", "");
      if (document.getElementById(INTRO_ID)?.dataset.intro !== "play") {
        markReady();
        return;
      }

      const items = gsap.utils.toArray<HTMLElement>("[data-hero]", scope.current);
      const at = (index: number) => 0.15 + index * 0.1;
      // Headline lines slide up out of their own clip box; everything else rises and fades.
      const hidden = (item: HTMLElement) => (item.dataset.hero === "line" ? { yPercent: 110 } : { opacity: 0, y: 24 });

      // The intro only plays with motion allowed. If that preference flips mid-intro, matchMedia
      // reverts these sets and the hero is left visible.
      gsap.matchMedia().add(MOTION_OK, (context) => {
        items.forEach((item) => gsap.set(item, hidden(item)));
        // context.add files the late tweens under this context, so they revert with it.
        const play = () => {
          const timeline = gsap.timeline({ onComplete: markReady });
          items.forEach((item, index) => {
            const duration = item.dataset.hero === "line" ? 0.9 : 0.8;
            timeline.to(item, { yPercent: 0, opacity: 1, y: 0, duration, ease: EASE_OUT }, at(index));
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
    <div data-hero={kind} className={className}>
      {children}
    </div>
  );
}
