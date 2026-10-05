import type { RefObject } from "react";
import { EASE_OUT, MOTION_OK, REVEAL_START, gsap, useGSAP } from "@/lib/gsap";
import { onIdle } from "@/lib/idle";

/**
 * Counts the element's text from 0 to `target` once it scrolls into view; shows the target when motion is off.
 * Writes textContent directly so a 60fps count never re-renders React.
 */
export function useCounter(ref: RefObject<HTMLElement | null>, target: number) {
  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      gsap.matchMedia().add(MOTION_OK, (context) => {
        const count = { value: 0 };
        // Zeroed straight away even though the tween waits: the server renders the final number, so
        // resetting it from an idle slot could flash the target first.
        element.textContent = "0";

        // Four of these mount at once, each resolving its trigger against layout. Building them in
        // an idle slot keeps that out of the hydration commit, and the stats sit well below the fold
        // so nothing is visible before the slot runs. context.add files the tween under this
        // context, so it still reverts if reduced motion turns on.
        const cancelIdle = onIdle(() =>
          context.add(() => {
            gsap.to(count, {
              value: target,
              duration: 1.6,
              ease: EASE_OUT,
              scrollTrigger: { trigger: element, start: REVEAL_START, once: true },
              onUpdate: () => {
                element.textContent = String(Math.round(count.value));
              },
            });
          }),
        );

        return () => {
          cancelIdle();
          element.textContent = String(target);
        };
      });
    },
    { dependencies: [target], revertOnUpdate: true },
  );
}
