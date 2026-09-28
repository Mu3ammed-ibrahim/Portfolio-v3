import { useRef } from "react";
import { EASE_OUT, MOTION_OK, REVEAL_START, gsap, useGSAP } from "@/lib/gsap";

/**
 * Scroll reveal for every `[data-reveal]` descendant of the returned scope.
 * The attribute value is an optional delay in seconds, so siblings can stagger.
 * Nothing is hidden in CSS: with JS off or reduced motion on, content is simply visible.
 */
export function useReveal<T extends HTMLElement>() {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      // matchMedia reverts these tweens (restoring visibility) if the user turns reduced motion on.
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]", scope.current).forEach((item) => {
          gsap.from(item, {
            opacity: 0,
            y: 28,
            duration: 0.9,
            ease: EASE_OUT,
            delay: Number(item.dataset.reveal) || 0,
            scrollTrigger: { trigger: item, start: REVEAL_START, once: true },
          });
        });
      });
    },
    { scope },
  );

  return scope;
}
