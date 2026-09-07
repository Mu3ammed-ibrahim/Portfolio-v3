import { useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Which section currently overlaps the band between 45% and 50% of the viewport.
 * Mirrors the design's IntersectionObserver rootMargin of -45% / -50%.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useGSAP(
    () => {
      ids.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;
        ScrollTrigger.create({
          trigger: element,
          start: "top 50%",
          end: "bottom 45%",
          onToggle: (self) =>
            setActive((current) => (self.isActive ? id : current === id ? null : current)),
        });
      });
    },
    { dependencies: [ids] },
  );

  return active;
}
