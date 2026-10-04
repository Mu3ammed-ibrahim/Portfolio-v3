import { useLenis } from "lenis/react";
import { useRef, type RefObject } from "react";
import { dragToScroll } from "@/features/work/lib/drag-to-scroll";
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

// Desktop and landscape arm. A height term is safe here: desktop chrome doesn't retract, so this
// query can't flip while someone is mid-pan. 650, not the ~795px the full panel needs, because the
// first ~145px to go off-screen is the section's empty bottom padding, and a 1080p laptop at 125%
// scaling with a bookmarks bar is only ~696px tall.
const DESKTOP_PIN = `(min-width: 1024px) and (min-height: 650px) and ${MOTION_OK}`;
// Portrait phones pin too, but this arm deliberately carries no height term. Every iPhone straddles
// some pixel threshold between its small and large viewport (SE 548/647, mini 632/715, standard
// 665/750), so a `(min-height:)` here could flip the pin off the moment the address bar retracted,
// reverting the tween under the thumb. Width and orientation are the two things browser chrome
// cannot change. Landscape keeps the native swipe carousel: a pinned sideways pan in a 360px-tall
// viewport is unusable. 639.98px rather than range syntax, to match Tailwind's `max-sm:` everywhere.
const PHONE_PIN = `(max-width: 639.98px) and (orientation: portrait) and ${MOTION_OK}`;
// Shortest small viewport that still fits the narrowest card the layout allows: 321px of chrome and
// card text, plus 1.25x the track's 252px floor width of poster, comes to 636. Measured once below
// rather than written into the query above, for the reason given there.
const PHONE_MIN_SVH = 640;
// Matches the track's gap-6.
const GAP = 24;

// window.innerHeight is the *large* viewport on iOS until the first scroll, so ask CSS for svh.
function smallViewportHeight() {
  const probe = document.createElement("div");
  probe.style.cssText = "position:fixed;top:0;width:0;height:100svh;visibility:hidden";
  document.body.append(probe);
  const height = probe.offsetHeight;
  probe.remove();
  return height;
}

/**
 * Pins the Work section and drives the track sideways with vertical scroll, on desktop and on
 * portrait phones tall enough to fit a card. The scroll distance equals the track's overflow, so
 * 1px of scroll moves the cards 1px, which is what lets the arrow buttons and keyboard focus steer
 * the page by card widths.
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

    // One pin, two gates. Returns the cleanup matchMedia runs when its arm stops matching.
    const pin = (scrub: number) => {
      // Read before writing. direction comes from <html dir> and the pinned flags cannot change it,
      // but asking for it after them would force a synchronous layout to flush the invalidation
      // those two writes just made.
      const sign = getComputedStyle(element).direction === "rtl" ? 1 : -1;
      // Set before measuring: the flags switch the track to overflow-visible and trim the padding.
      element.dataset.pinned = "";
      section.dataset.pinned = "";
      const distance = () => element.scrollWidth - element.clientWidth;

      const tween = gsap.to(element, {
        x: () => sign * distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub,
          invalidateOnRefresh: true,
        },
      });
      trigger.current = tween.scrollTrigger ?? null;
      const stopDrag = dragToScroll(element, sign, () => trigger.current);

      // matchMedia reverts the tween and pin, but not these flags.
      return () => {
        stopDrag();
        delete element.dataset.pinned;
        delete section.dataset.pinned;
        trigger.current = null;
      };
    };

    const media = gsap.matchMedia();
    // A hard flick on a phone outruns a 1s scrub: the last card would still be easing as the section
    // unpins. Half the smoothing there; full on desktop, where Lenis already smooths the input.
    media.add(DESKTOP_PIN, () => pin(1));
    // Shorter than that and there's no poster width that keeps the card's tag row on one line. Fall
    // back to the native swipe carousel rather than clip the panel: flex centring overflows both
    // ends, so a too-tall panel loses the heading as well as the bottom of the card.
    media.add(PHONE_PIN, () => (smallViewportHeight() < PHONE_MIN_SVH ? undefined : pin(0.5)));

    // StrictMode double-invokes effects in dev; without this the second pass stacks a second pin.
    return () => media.kill();
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
