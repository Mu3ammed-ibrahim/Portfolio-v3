"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState, type ReactNode } from "react";

type HeaderSurfaceProps = { children: ReactNode };

// Roughly where the header stops sitting on the hero's dark top edge.
const SOLID_AFTER = 24;

/**
 * The header floats on the hero photo, then takes a solid backdrop once content scrolls under it.
 * State only flips at the threshold; React skips re-rendering when the boolean is unchanged.
 */
export function HeaderSurface({ children }: HeaderSurfaceProps) {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, "change", (value) => setSolid(value > SOLID_AFTER));

  return (
    <header
      data-solid={solid}
      className="sticky top-0 z-20 bg-linear-to-b from-ground/80 to-transparent transition-[background-color,backdrop-filter] duration-300 data-[solid=true]:bg-ground/85 data-[solid=true]:bg-none data-[solid=true]:backdrop-blur-[10px]"
    >
      {children}
    </header>
  );
}
