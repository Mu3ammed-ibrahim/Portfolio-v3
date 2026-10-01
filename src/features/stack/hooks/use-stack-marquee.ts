import type { RefObject } from "react";
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

// Seconds for one copy of the row to travel past. Item widths are intrinsic (13px text, a size-5
// icon, a fixed trailing pad), so this is the same px/sec at every breakpoint and never needs
// re-measuring on resize.
const CYCLE = 28;
// Resting timeScale. Scroll pushes the row away from this; it always eases back.
const BASE = 1;
// Ceiling and floor for the scroll-driven speed. A ScrollTrigger refresh can report a huge
// one-frame velocity, so the mapped value is clamped rather than trusted.
const MAX_SCALE = 10;
const MIN_SCALE = -6;
// Scroll px/sec that buys one extra unit of timeScale: a brisk ~1200px/s flick lands near 5x.
const VELOCITY_STEP = 300;
// How long the row takes to reach a new speed.
const RAMP = 0.4;
// Quiet time after the last scroll event before the row eases home. ScrollTrigger's onUpdate simply
// stops firing when scrolling stops, so without a timer the row would hold its last speed forever.
const SETTLE = 0.3;
// A repeat:-1 tween's playhead has a hard *finite* floor: gsap stores _tDur as 1e10, and totalTime()
// refuses to re-activate a tween running backwards once totalTime hits 0. Seeding the playhead this
// many cycles in gives a negative timeScale somewhere to go. Because the tween repeats, totalTime
// `duration * REVERSE_ROOM` is progress 0 of iteration 100 — the pixel-identical frame.
const REVERSE_ROOM = 100;

/**
 * Loops a row of stack items horizontally, with its speed tied to scroll velocity: a slow constant
 * drift at rest, faster scrolling down, briefly reversed scrolling up, easing back to the drift once
 * scrolling stops.
 *
 * The track holds three copies of the list, so one third of its width is exactly one copy and the
 * seam is invisible. Both elements are flagged [data-marquee], which is what switches the fallback
 * grid into a single nowrap row; the flag is set inside the reduced-motion gate, so with JS off or
 * reduced motion on the plain grid is simply what remains.
 */
export function useStackMarquee(
  viewport: RefObject<HTMLDivElement | null>,
  track: RefObject<HTMLUListElement | null>,
) {
  useGSAP(() => {
    const box = viewport.current;
    const row = track.current;
    if (!box || !row) return;

    const media = gsap.matchMedia();

    media.add(MOTION_OK, () => {
      // Set before the tween is built, so the row is already one nowrap line when GSAP measures it.
      box.dataset.marquee = "";
      row.dataset.marquee = "";

      // Start from a clean transform. GSAP snapshots the element's inline style when the tween
      // initialises and restores exactly that snapshot on revert, so entering this arm dirty means
      // leaving it dirty: switch reduced motion on mid-page and the fallback grid comes back shifted
      // a whole copy off-screen. This arm can genuinely be entered twice — StrictMode's second pass
      // in dev, or reduced motion toggled off and on — so the baseline has to be explicit. A plain
      // assignment is the right tool here; a gsap.set would be a tween, and reverting the arm would
      // dutifully undo it and put the stale transform back.
      row.style.transform = "";

      // Travel exactly one of the three copies. Measured, deliberately not expressed as
      // `xPercent: -100/3`: a percentage is the tidier way to say "one third of the track", but GSAP
      // cannot recover a percentage from a rendered matrix. Any cache invalidation — a ScrollTrigger
      // refresh when the section enters, a resize — makes it re-read `translate(-33.3333%)` and bank
      // the whole offset as `x`, after which xPercent animates on top of a static x: the row travels
      // two copies a cycle and comes up short of filling the viewport. An `x` tween survives the same
      // re-read, because `x` is the property it already owns. Same reason usePinnedTrack measures.
      // getBoundingClientRect, not offsetWidth: offsetWidth rounds to whole pixels, which would
      // leave the wrap a fraction of a pixel out of register with the copy behind it.
      const copyWidth = () => row.getBoundingClientRect().width / 3;

      // fromTo, not to: the start is stated rather than read off the element. This arm can be
      // entered more than once (reduced motion toggled off and on, StrictMode's second pass in dev),
      // and a `to` tween would inherit whatever x the previous pass left behind and travel the
      // difference instead of a full copy. Stating it also keeps the arm free of a `gsap.set`, whose
      // own revert would put that stale transform back when the arm unmatches.
      const loop = gsap.fromTo(row, { x: 0 }, {
        x: () => -copyWidth(),
        duration: CYCLE,
        ease: "none",
        repeat: -1,
        // Re-measure the copy width at each wrap. The width is read when the tween initialises, and
        // at that point a web font may still be swapping in — 27 items each a fraction wider later
        // adds up, and the loop would keep travelling the stale distance, landing out of register
        // with the copy behind it. A repeat boundary is the one moment re-measuring is free, because
        // x is returning to 0 anyway.
        repeatRefresh: true,
        // onToggle below starts it. A loop created playing would run offscreen on a page loaded
        // above this section, because onToggle only fires on a change.
        paused: true,
        // Only reached if a long upward scroll drains the seeded room; lands on the same frame.
        onReverseComplete: () => loop.totalTime(loop.rawTime() + loop.duration() * REVERSE_ROOM),
      });
      loop.totalTime(loop.duration() * REVERSE_ROOM);

      // timeScale is a method rather than a property, so quickTo drives a plain object and each
      // update forwards the value on. quickTo keeps one reusable tween instead of allocating a new
      // one per scroll event.
      const drive = { scale: BASE };
      const setScale = gsap.quickTo(drive, "scale", {
        duration: RAMP,
        ease: "none",
        onUpdate: () => loop.timeScale(drive.scale),
      });

      const settle = gsap.delayedCall(SETTLE, () => setScale(BASE)).pause();
      const clampScale = gsap.utils.clamp(MIN_SCALE, MAX_SCALE);

      const trigger = ScrollTrigger.create({
        trigger: box,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          setScale(clampScale(BASE + self.getVelocity() / VELOCITY_STEP));
          settle.restart(true);
        },
        onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
      });

      // matchMedia reverts the tweens and the ScrollTrigger, but not these flags.
      return () => {
        trigger.kill();
        settle.kill();
        // quickTo builds its tween lazily, on the first scroll — by which time this arm's context has
        // closed, so the context never adopted it and reverting the arm does not stop it. Left running
        // it keeps calling loop.timeScale(), and GSAP re-adds the reverted loop to the ticker, which
        // re-applies a transform after everything below has already cleaned up. Kill the driver
        // before the loop, so nothing can resurrect it.
        gsap.killTweensOf(drive);
        loop.kill();
        delete box.dataset.marquee;
        delete row.dataset.marquee;
        // Reverting restores the transform the element carried when the tween initialised, not a
        // clean one, so turning reduced motion on mid-page would hand the grid back shifted a whole
        // copy off-screen. Clear it here in plain DOM: an assignment has no revert of its own, where
        // a gsap.set would be undone the moment this arm is reverted.
        row.style.transform = "";
      };
    });

    // StrictMode double-invokes effects in dev; without this the second pass stacks a second loop.
    // kill(true) to *revert*: a bare kill() stops the tween but leaves its inline transform behind
    // (gsap-core MatchMedia.kill forwards the flag, and Context.kill only reverts when it is set).
    // The next pass would then read that stale matrix, bank all of it as `x` (CSSPlugin can only
    // split a raw matrix back into x/xPercent by guessing), and animate xPercent on top of it — so
    // the row would travel two copies per cycle and come up a copy short of filling the viewport.
    return () => media.kill(true);
  });
}
