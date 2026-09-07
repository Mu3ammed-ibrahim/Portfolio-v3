import { useRef } from "react";
import { EASE, MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

/**
 * Scroll reveal for every `[data-reveal]` descendant of the returned scope.
 * The attribute value is an optional delay in seconds, so siblings can stagger.
 * Nothing is hidden in CSS: with JS off or reduced motion on, content is simply visible.
 */
export function useReveal<T extends HTMLElement>() {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      const items = scope.current?.querySelectorAll<HTMLElement>("[data-reveal]");
      if (!items?.length) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        items.forEach((item) => {
          gsap.from(item, {
            y: 28,
            autoAlpha: 0,
            duration: 0.9,
            ease: EASE,
            delay: Number(item.dataset.reveal) || 0,
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          });
        });
      });
    },
    { scope },
  );

  return scope;
}
