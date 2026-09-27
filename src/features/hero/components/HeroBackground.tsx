"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { getImageProps } from "next/image";

type HeroBackgroundProps = { alt: string };

// Matches Tailwind's `lg`, where the hero copy moves beside the subject instead of below him.
const DESKTOP = "(min-width: 64rem)";

/**
 * Full-bleed portrait behind the hero copy. It settles from a slight zoom on load and drifts
 * slower than the page as the hero scrolls away, which gives the cut edge some depth.
 */
export function HeroBackground({ alt }: HeroBackgroundProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], ["0%", "12%"]);

  // Art direction: a <picture> lets the browser fetch only the crop for the current viewport.
  // Eager + high priority stands in for `preload`, which would force one crop on every screen.
  const common = { alt, fill: true, sizes: "100vw", loading: "eager", fetchPriority: "high" } as const;
  const { srcSet: desktop } = getImageProps({ ...common, src: "/heroImg.png" }).props;
  const { props: mobile } = getImageProps({ ...common, src: "/hero-img-mobileVeiw.png" });

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Reduced motion is handled in CSS, not by branching the render, so SSR and client markup match. */}
      <motion.div
        className="absolute inset-x-0 -top-[30%] bottom-0 motion-reduce:transform-none! lg:top-0"
        style={{ y }}
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {/* The portrait crop leaves its top third empty, so the layer rises 30% on narrow screens to
            lift his face above the copy. On desktop the subject sits on the right; mirroring under
            RTL keeps him clear of the Arabic copy. */}
        <picture>
          <source media={DESKTOP} srcSet={desktop} />
          <img
            {...mobile}
            alt={alt}
            className="object-cover object-[60%_center] lg:object-center lg:rtl:-scale-x-100"
          />
        </picture>
      </motion.div>
      {/* Scrims: from the reading edge on desktop, from the bottom on narrow screens */}
      <div className="absolute inset-0 bg-linear-to-t from-ground via-ground/70 to-ground/10 lg:bg-linear-to-r lg:from-ground lg:via-ground/60 lg:to-transparent rtl:lg:bg-linear-to-l" />
    </div>
  );
}
