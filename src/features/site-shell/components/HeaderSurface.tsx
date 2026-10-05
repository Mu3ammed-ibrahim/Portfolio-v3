"use client";

import { useState, type ReactNode } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onIdle } from "@/lib/idle";

type HeaderSurfaceProps = { children: ReactNode };

// Roughly where the header stops sitting on the hero's dark top edge.
const SOLID_AFTER = 24;

/**
 * The header floats on the hero photo, then takes a solid backdrop once content scrolls under it.
 * The trigger only toggles when the threshold is crossed, so React re-renders just at that moment.
 */
export function HeaderSurface({ children }: HeaderSurfaceProps) {
  const [solid, setSolid] = useState(false);

  // Built in an idle slot to keep ScrollTrigger out of hydration's layout effect. Safe for a reload
  // that restores scroll: a trigger's first refresh seeds its progress at 0 and then updates, so one
  // created past its start still reports isActive. Deliberately not gated on MOTION_OK — the solid
  // backdrop keeps nav text legible over scrolled content, which reduced motion still needs.
  useGSAP((context) =>
    onIdle(() =>
      context.add(() => {
        ScrollTrigger.create({ start: SOLID_AFTER, end: "max", onToggle: (self) => setSolid(self.isActive) });
      }),
    ),
  );

  return (
    <header
      data-solid={solid}
      className="sticky top-0 z-20 bg-linear-to-b from-ground/80 to-transparent transition-[background-color,backdrop-filter] duration-300 data-[solid=true]:bg-ground/85 data-[solid=true]:bg-none data-[solid=true]:backdrop-blur-[10px]"
    >
      {children}
    </header>
  );
}
