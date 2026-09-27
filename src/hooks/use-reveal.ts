import { animate, inView } from "motion";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { EASE_OUT, IN_VIEW_MARGIN } from "@/lib/motion";

/**
 * Scroll reveal for every `[data-reveal]` descendant of the returned scope.
 * The attribute value is an optional delay in seconds, so siblings can stagger.
 * Nothing is hidden in CSS: with JS off or reduced motion on, content is simply visible.
 */
export function useReveal<T extends HTMLElement>() {
  const scope = useRef<T>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const items = scope.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reduceMotion || !items?.length) return;

    const stops = Array.from(items, (item) => {
      animate(item, { opacity: 0, y: 28 }, { duration: 0 });
      return inView(
        item,
        () => {
          animate(
            item,
            { opacity: 1, y: 0 },
            { duration: 0.9, ease: EASE_OUT, delay: Number(item.dataset.reveal) || 0 },
          );
        },
        { margin: IN_VIEW_MARGIN },
      );
    });

    return () => stops.forEach((stop) => stop());
  }, [reduceMotion]);

  return scope;
}
