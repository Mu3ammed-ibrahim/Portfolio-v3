import { useRef } from "react";
import { EASE_OUT, MOTION_OK, REVEAL_START, gsap, useGSAP } from "@/lib/gsap";
import { scrubWords, splitReveal } from "@/lib/text-motion";

/**
 * Scroll reveals for descendants of the returned scope:
 * - `[data-reveal]` fades up; the value is an optional delay in seconds, so siblings can stagger.
 * - `[data-split]` headings rise letter by letter (word by word in Arabic) from a line mask.
 * - `[data-scrub]` headings brighten word by word, tied to scroll position.
 * Nothing is hidden in CSS: with JS off or reduced motion on, content is simply visible.
 */
export function useReveal<T extends HTMLElement>() {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      // matchMedia reverts these tweens and splits (restoring the markup) if reduced motion turns on.
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
        gsap.utils.toArray<HTMLElement>("[data-split]", scope.current).forEach(splitReveal);
        gsap.utils.toArray<HTMLElement>("[data-scrub]", scope.current).forEach(scrubWords);
      });
    },
    { scope },
  );

  return scope;
}
