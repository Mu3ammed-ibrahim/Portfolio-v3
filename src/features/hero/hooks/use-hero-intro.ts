import type { RefObject } from "react";
import { EASE, MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

/** One orchestrated entrance: headline lines rise out of their clip, then kicker, copy and CTA follow. */
export function useHeroIntro(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ defaults: { ease: EASE, duration: 0.9 } })
          .from("[data-hero-kicker]", { y: 24, autoAlpha: 0, duration: 0.8 }, 0)
          .from("[data-hero-line]", { yPercent: 110, skewY: 3, autoAlpha: 0, stagger: 0.12 }, 0.1)
          .from("[data-hero-rise]", { y: 24, autoAlpha: 0, stagger: 0.2 }, 0.5);
      });
    },
    { scope },
  );
}
