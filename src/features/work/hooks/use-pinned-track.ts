import { useLenis } from "lenis/react";
import { useRef, type RefObject } from "react";
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

// Phones and tablets keep the native swipe carousel: a pinned sideways scroll fights the thumb.
// So do screens under 700px tall, where a 4:5 poster card plus the heading can't fit on one screen.
const PIN_QUERY = `(min-width: 1024px) and (min-height: 700px) and ${MOTION_OK}`;
// Matches the track's gap-6.
const GAP = 24;

/**
 * On desktop, pins the Work section and drives the track sideways with vertical scroll. The scroll
 * distance equals the track's overflow, so 1px of scroll moves the cards 1px, which is what lets
 * the arrow buttons and keyboard focus steer the page by card widths.
 * `step` and `reveal` only act while pinned; check `pinned()` and fall back to native scrolling.
 */
export function usePinnedTrack(track: RefObject<HTMLUListElement | null>) {
  const lenis = useLenis();
  const trigger = useRef<ScrollTrigger | null>(null);
  // Where our last programmatic glide is heading. Lenis's own targetScroll tracks the glide frame
  // by frame during scrollTo, so it can't answer "where will this end up".
  const destination = useRef(0);

  useGSAP(() => {
    const element = track.current;
    const section = element?.closest("section");
    if (!element || !section) return;

    gsap.matchMedia().add(PIN_QUERY, () => {
      // Set before measuring: the flags switch the track to overflow-visible and trim the padding.
      element.dataset.pinned = "";
      section.dataset.pinned = "";
      const sign = getComputedStyle(element).direction === "rtl" ? 1 : -1;
      const distance = () => element.scrollWidth - element.clientWidth;

      const tween = gsap.to(element, {
        x: () => sign * distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      trigger.current = tween.scrollTrigger ?? null;

      // matchMedia reverts the tween and pin, but not these flags.
      return () => {
        delete element.dataset.pinned;
        delete section.dataset.pinned;
        trigger.current = null;
      };
    });
  });

  const scrollWithin = (target: number) => {
    const pin = trigger.current;
    if (!pin) return;
    const clamped = gsap.utils.clamp(pin.start, pin.end, target);
    destination.current = clamped;
    if (lenis) lenis.scrollTo(clamped);
    else window.scrollTo({ top: clamped, behavior: "smooth" });
  };

  // Mid-glide, steps from where the glide is heading rather than where it is, so quick repeat
  // clicks each move a full card instead of adding to a half-finished glide.
  const step = (forward: boolean) => {
    const card = track.current?.firstElementChild;
    if (!card) return;
    const from = lenis?.isScrolling === "smooth" ? destination.current : (lenis?.scroll ?? window.scrollY);
    scrollWithin(from + (forward ? 1 : -1) * (card.getBoundingClientRect().width + GAP));
  };

  // Tabbing to an off-screen card scrolls the page to the point where that card is in view.
  const reveal = (card: Element) => {
    const element = track.current;
    const pin = trigger.current;
    if (!element || !pin) return;
    const box = element.getBoundingClientRect();
    const rect = card.getBoundingClientRect();
    if (rect.left >= 0 && rect.right <= window.innerWidth) return;
    const rtl = getComputedStyle(element).direction === "rtl";
    const offset = rtl ? box.right - rect.right : rect.left - box.left;
    scrollWithin(pin.start + offset);
  };

  return { pinned: () => trigger.current !== null, step, reveal };
}
