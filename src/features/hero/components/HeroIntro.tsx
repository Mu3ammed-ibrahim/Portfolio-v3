"use client";

import { MotionConfig, motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

// Headline lines slide up out of their own clip box rather than fading.
const line: Variants = {
  hidden: { y: "110%" },
  shown: { y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

type HeroIntroProps = { children: ReactNode; className?: string };

/**
 * Plays the hero entrance once, in reading order. `initial` must not branch on the reduced-motion
 * preference: the server cannot see it, so the first render would differ and break hydration.
 * MotionConfig applies the preference after hydration instead, dropping the slides and keeping the fades.
 */
export function HeroIntro({ children, className }: HeroIntroProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div className={className} variants={container} initial="hidden" animate="shown">
        {children}
      </motion.div>
    </MotionConfig>
  );
}

type HeroItemProps = { children: ReactNode; className?: string; kind?: "rise" | "line" };

export function HeroItem({ children, className, kind = "rise" }: HeroItemProps) {
  return (
    <motion.div className={className} variants={kind === "line" ? line : rise}>
      {children}
    </motion.div>
  );
}
