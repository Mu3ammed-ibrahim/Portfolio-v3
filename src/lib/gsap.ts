import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once; every client module imports gsap from here so plugins are always attached.
gsap.registerPlugin(useGSAP, ScrollTrigger);

export const EASE = "cubic-bezier(0.2, 0.7, 0.2, 1)";
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, useGSAP, ScrollTrigger };
