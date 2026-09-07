import type { RefObject } from "react";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

/** Counts the element's text from 0 to `target` once it scrolls into view; shows the target when motion is off. */
export function useCounter(ref: RefObject<HTMLElement | null>, target: number) {
  useGSAP(() => {
    const element = ref.current;
    if (!element) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const counter = { value: 0 };
      element.textContent = "0";
      gsap.to(counter, {
        value: target,
        duration: 1.6,
        ease: "power3.out",
        snap: { value: 1 },
        onUpdate: () => {
          element.textContent = String(Math.round(counter.value));
        },
        scrollTrigger: { trigger: element, start: "top 88%", once: true },
      });
      return () => {
        element.textContent = String(target);
      };
    });
  });
}
