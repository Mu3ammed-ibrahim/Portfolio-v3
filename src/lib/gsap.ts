import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Registered once here; consumers import gsap from this module so registration has always run.
gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase, SplitText, DrawSVGPlugin);

// Mobile browsers fire resize when the address bar retracts. A refresh there would re-measure the
// pinned Work track mid-pan, and that track is sized in svh, which the retraction doesn't change.
// This silences ScrollTrigger's own refresh only: gsap.matchMedia keeps evaluating its queries live
// regardless, which is why the phone gate in use-pinned-track carries no height term.
ScrollTrigger.config({ ignoreMobileResize: true });

// Same curve as the --ease-out-expo CSS token, so JS and CSS motion share one feel.
export const EASE_OUT = "out-expo";
CustomEase.create(EASE_OUT, "M0,0 C0.2,0.7 0.2,1 1,1");

// Fires a little before the element's top reaches the viewport bottom.
export const REVEAL_START = "top 88%";

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOTION_REDUCE = "(prefers-reduced-motion: reduce)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
