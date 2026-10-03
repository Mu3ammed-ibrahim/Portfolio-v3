import { gsap, type ScrollTrigger } from "@/lib/gsap";

/**
 * Pinned, the track no longer scrolls: vertical page scroll is what slides it sideways. A thumb
 * swiped across the posters would otherwise do nothing, so map the horizontal part of the gesture
 * onto page scroll by hand. `window.scrollTo`, not `lenis.scrollTo`: Lenis isn't driving touch
 * (syncTouch is off), and a programmatic glide racing the native scroller stutters.
 */
export function dragToScroll(
  element: HTMLElement,
  /** -1 in LTR, +1 in RTL: the same sign the pin tween uses to decide which way x travels. */
  sign: number,
  pin: () => ScrollTrigger | null,
) {
  let x = 0;
  let y = 0;
  // Decided once per gesture and never revisited, mirroring the browser's own touch-action lock: a
  // thumb that drifts sideways mid-flick must not start driving a scroll the browser already owns.
  let axis: "x" | "y" | null = null;

  const onStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) return;
    x = touch.clientX;
    y = touch.clientY;
    axis = null;
  };

  const onMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    const trigger = pin();
    if (!touch || !trigger) return;

    if (!axis) {
      const dx = Math.abs(touch.clientX - x);
      const dy = Math.abs(touch.clientY - y);
      // Under the slop threshold the gesture hasn't committed; wait rather than guess at it.
      if (Math.max(dx, dy) < 8) return;
      axis = dx > dy ? "x" : "y";
    }

    const delta = x - touch.clientX;
    x = touch.clientX;
    y = touch.clientY;
    // Clamped to the pin, so a long fling can't throw the reader out of the section sideways.
    if (axis === "x") {
      window.scrollTo({ top: gsap.utils.clamp(trigger.start, trigger.end, window.scrollY - sign * delta) });
    }
  };

  // Passive: `touch-action: pan-y pinch-zoom` on the pinned track does the preventing declaratively.
  element.addEventListener("touchstart", onStart, { passive: true });
  element.addEventListener("touchmove", onMove, { passive: true });
  return () => {
    element.removeEventListener("touchstart", onStart);
    element.removeEventListener("touchmove", onMove);
  };
}
