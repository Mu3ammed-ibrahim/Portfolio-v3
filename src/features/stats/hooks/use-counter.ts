import type { RefObject } from "react";
import { EASE_OUT, MOTION_OK, REVEAL_START, gsap, useGSAP } from "@/lib/gsap";

/**
 * Counts the element's text from 0 to `target` once it scrolls into view; shows the target when motion is off.
 * Writes textContent directly so a 60fps count never re-renders React.
 */
export function useCounter(ref: RefObject<HTMLElement | null>, target: number) {
  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      gsap.matchMedia().add(MOTION_OK, () => {
        const count = { value: 0 };
        element.textContent = "0";
        gsap.to(count, {
          value: target,
          duration: 1.6,
          ease: EASE_OUT,
          scrollTrigger: { trigger: element, start: REVEAL_START, once: true },
          onUpdate: () => {
            element.textContent = String(Math.round(count.value));
          },
        });

        return () => {
          element.textContent = String(target);
        };
      });
    },
    { dependencies: [target] },
  );
}
