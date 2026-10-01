"use client";

import { useRef, type ReactNode } from "react";
import { useStackMarquee } from "@/features/stack/hooks/use-stack-marquee";

type StackMarqueeProps = { children: ReactNode };

/**
 * Client boundary for the looping stack row. The items arrive as `children` so their icon paths stay
 * server-rendered and never reach the client bundle.
 *
 * The outer div is the viewport: it clips, fades, and carries the shared `[data-reveal]` entrance.
 * The inner list is the track the hook moves, which is why the two are separate elements — the
 * reveal already tweens `y` on the revealed node, so a marquee writing to it would be a second tween
 * fighting for the same transform.
 */
export function StackMarquee({ children }: StackMarqueeProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useStackMarquee(viewport, track);

  return (
    // overflow-clip rather than overflow-hidden: a hidden box can still be scrolled by focus.
    // min-w-0 is load-bearing at lg, where this is a flex item whose track is far wider than the
    // column: overflow-clip establishes no scroll container, so min-width:auto would otherwise let
    // the viewport grow to the track's width and shove the heading out of the row.
    <div
      ref={viewport}
      data-reveal="0.1"
      className="min-w-0 flex-1 data-marquee:overflow-clip data-marquee:marquee-fade"
    >
      {/* Brand names read left-to-right in both languages */}
      <ul
        ref={track}
        dir="ltr"
        className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-between data-marquee:flex data-marquee:w-max data-marquee:flex-nowrap data-marquee:gap-0"
      >
        {children}
      </ul>
    </div>
  );
}
