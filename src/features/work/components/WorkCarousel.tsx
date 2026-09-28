"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useRef, type ReactNode } from "react";

type WorkCarouselProps = {
  header: ReactNode;
  action: ReactNode;
  labels: { prev: string; next: string };
  children: ReactNode;
};

const buttonClass =
  "grid size-12 place-items-center border border-ink/35 text-ink transition-colors duration-300 hover:border-brand hover:text-brand active:scale-[0.98]";

/**
 * Native scroll-snap track, so touch, trackpad and keyboard scrolling all work without JS.
 * The buttons only step it by one card.
 */
export function WorkCarousel({ header, action, labels, children }: WorkCarouselProps) {
  const track = useRef<HTMLUListElement>(null);

  // "Forward" follows reading order: in RTL the track scrolls toward negative scrollLeft.
  const step = (forward: boolean) => {
    const element = track.current;
    const card = element?.firstElementChild;
    if (!element || !card) return;
    const rtl = getComputedStyle(element).direction === "rtl";
    const distance = card.getBoundingClientRect().width + 24;
    element.scrollBy({ left: (forward !== rtl ? 1 : -1) * distance, behavior: "smooth" });
  };

  return (
    <>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        {header}
        <div className="flex items-center gap-3">
          {action}
          <button type="button" aria-label={labels.prev} onClick={() => step(false)} className={buttonClass}>
            <CaretLeftIcon aria-hidden weight="bold" className="size-4 rtl:-scale-x-100" />
          </button>
          <button type="button" aria-label={labels.next} onClick={() => step(true)} className={buttonClass}>
            <CaretRightIcon aria-hidden weight="bold" className="size-4 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
      {/* Revealed as one block: per-card reveals would leave off-screen cards blank until they slid in,
          because the observer counts the track's horizontal clipping as out of view. */}
      <ul
        ref={track}
        data-reveal="0.1"
        // Horizontal swipes on the track stay native so scroll-snap keeps working under Lenis.
        data-lenis-prevent-horizontal
        className="grid snap-x snap-mandatory auto-cols-[85%] grid-flow-col gap-6 overflow-x-auto overscroll-x-contain pb-6 [scrollbar-color:var(--brand)_transparent] [scrollbar-width:thin] sm:auto-cols-[calc((100%-24px)/2)] lg:auto-cols-[calc((100%-48px)/3)]"
      >
        {children}
      </ul>
    </>
  );
}
