"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

type HeroBackgroundProps = { alt: string };

/**
 * Full-bleed portrait behind the hero copy. It settles from a slight zoom on load and drifts
 * slower than the page as the hero scrolls away, which gives the cut edge some depth.
 */
export function HeroBackground({ alt }: HeroBackgroundProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], ["0%", "12%"]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Reduced motion is handled in CSS, not by branching the render, so SSR and client markup match. */}
      <motion.div
        className="absolute inset-0 motion-reduce:transform-none!"
        style={{ y }}
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {/* The subject sits on the image's right; mirroring under RTL keeps him clear of the Arabic copy. */}
        <Image
          src="/heroImg.png"
          alt={alt}
          fill
          preload
          sizes="100vw"
          className="object-cover object-[72%_center] rtl:-scale-x-100 lg:object-center"
        />
      </motion.div>
      {/* Scrims: from the reading edge on desktop, from the bottom on narrow screens */}
      <div className="absolute inset-0 bg-linear-to-t from-ground via-ground/70 to-ground/10 lg:bg-linear-to-r lg:from-ground lg:via-ground/60 lg:to-transparent rtl:lg:bg-linear-to-l" />
    </div>
  );
}
