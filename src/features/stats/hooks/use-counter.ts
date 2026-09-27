import { animate, inView, type AnimationPlaybackControls } from "motion";
import { useReducedMotion } from "motion/react";
import { useEffect, type RefObject } from "react";
import { EASE_OUT, IN_VIEW_MARGIN } from "@/lib/motion";

/**
 * Counts the element's text from 0 to `target` once it scrolls into view; shows the target when motion is off.
 * Writes textContent directly so a 60fps count never re-renders React.
 */
export function useCounter(ref: RefObject<HTMLElement | null>, target: number) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduceMotion) return;

    let controls: AnimationPlaybackControls | undefined;
    element.textContent = "0";
    const stop = inView(
      element,
      () => {
        controls = animate(0, target, {
          duration: 1.6,
          ease: EASE_OUT,
          onUpdate: (value) => {
            element.textContent = String(Math.round(value));
          },
        });
      },
      { margin: IN_VIEW_MARGIN },
    );

    return () => {
      stop();
      controls?.stop();
      element.textContent = String(target);
    };
  }, [ref, target, reduceMotion]);
}
