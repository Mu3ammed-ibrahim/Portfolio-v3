import { useRef } from "react";
import { EASE_OUT, MOTION_OK, REVEAL_START, gsap, useGSAP } from "@/lib/gsap";
import { onIdle } from "@/lib/idle";
import { scrubWords, splitReveal } from "@/lib/text-motion";

/**
 * Scroll reveals for descendants of the returned scope:
 * - `[data-reveal]` fades up; the value is an optional delay in seconds, so siblings can stagger.
 * - `[data-split]` headings rise letter by letter (word by word in Arabic) from a line mask.
 * - `[data-scrub]` headings brighten word by word, tied to scroll position.
 * - `[data-scroll-transform]` adds a subtle, scrubbed depth movement without affecting layout.
 * Nothing is hidden in CSS: with JS off or reduced motion on, content is simply visible.
 */
export function useReveal<T extends HTMLElement>() {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      // matchMedia reverts these tweens and splits (restoring the markup) if reduced motion turns on.
      gsap.matchMedia().add(MOTION_OK, (context) => {
        // Built in hydration, every section's splits and ScrollTrigger measurements land in one long
        // task. Waiting for the swap fonts lets SplitText measure final line breaks once instead of
        // re-splitting, and each section then builds in its own idle slot. context.add files the
        // late tweens and splits under this context, so they still revert with it.
        let cancelIdle = () => {};
        let cancelled = false;
        void document.fonts.ready.then(() => {
          if (cancelled) return;
          cancelIdle = onIdle(() =>
            context.add(() => {
              if (scope.current) buildReveals(scope.current);
            }),
          );
        });
        return () => {
          cancelled = true;
          cancelIdle();
        };
      });
    },
    { scope },
  );

  return scope;
}

function buildReveals(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>("[data-scroll-transform]", root).forEach((item) => {
    const y = Number(item.dataset.scrollY);
    const scale = Number(item.dataset.scrollScale);
    const yAmount = Number.isFinite(y) ? y : 0;
    const startingScale = Number.isFinite(scale) ? scale : 1;

    if (yAmount === 0 && startingScale === 1) return;

    gsap.fromTo(
      item,
      { y: yAmount, scale: startingScale },
      {
        y: -yAmount,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>("[data-reveal]", root).forEach((item) => {
    gsap.from(item, {
      opacity: 0,
      y: 28,
      duration: 0.9,
      ease: EASE_OUT,
      delay: Number(item.dataset.reveal) || 0,
      scrollTrigger: { trigger: item, start: REVEAL_START, once: true },
    });
  });
  gsap.utils.toArray<HTMLElement>("[data-split]", root).forEach(splitReveal);
  gsap.utils.toArray<HTMLElement>("[data-scrub]", root).forEach(scrubWords);
}
