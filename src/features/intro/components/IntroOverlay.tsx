"use client";

import { useRef } from "react";
import { InlineScript } from "@/features/intro/components/InlineScript";
import { LogoMark } from "@/lib/brand/LogoMark";
import { EASE_OUT, MOTION_OK, SplitText, gsap, useGSAP } from "@/lib/gsap";
import { INTRO_DONE_EVENT, INTRO_ID } from "@/lib/intro-gate";

const SEEN_KEY = "mo-intro-seen";
// Decides during HTML parsing whether this load gets the intro: first page of the tab's session,
// motion allowed. The overlay is display:none until this flags it, so with JS off, on repeat
// visits, or if storage throws, it never shows and can't trap the page. If the app still hasn't
// hydrated (marked data-live) after 5s, it drops the intro rather than keep a slow load waiting.
// A static string with no user input, so the inline HTML carries no injection risk.
const DECIDE = `try{var e=document.getElementById("${INTRO_ID}");if(e&&!sessionStorage.getItem("${SEEN_KEY}")&&matchMedia("${MOTION_OK}").matches){sessionStorage.setItem("${SEEN_KEY}","1");e.dataset.intro="play";setTimeout(function(){if(e.dataset.intro==="play"&&!("live" in e.dataset))e.dataset.intro="done"},5000)}}catch(_){}`;

// DECIDE's test for when React gets there first: Next's bundles load async and can hydrate before
// a parse-time script that's still waiting on stylesheets. Whichever runs first takes the flag.
function claimIntro(overlay: HTMLElement) {
  try {
    if (sessionStorage.getItem(SEEN_KEY) || !matchMedia(MOTION_OK).matches) return false;
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    return false;
  }
  overlay.dataset.intro = "play";
  return true;
}

// How far (in % of the viewport height) the wipe's trailing corner lags its leading one.
const SLOPE = 14;

/**
 * First-visit intro: the mark draws itself, "Welcome to MO Studio" rises, then the panel wipes
 * upward along a diagonal with a red curtain trailing it. Decorative (aria-hidden); the hero keeps
 * the real heading. Any click or key press skips to the exit. States on the overlay, all owned by
 * the DOM: none (hidden) → "play" → "leaving" (hero entrance starts, page usable) → "done".
 */
export function IntroOverlay() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const overlay = scope.current;
      if (!overlay || (overlay.dataset.intro !== "play" && !claimIntro(overlay))) return;
      overlay.dataset.live = "";

      const q = gsap.utils.selector(overlay);
      const parts = q("[data-logo-part]");
      const rtl = getComputedStyle(overlay).direction === "rtl";
      // Bottom edge at `edge` 0 covers the screen, at 1 has passed the top. The high corner sits at
      // the reading end, matching the site's cut-bottom bands.
      const clip = (edge: number) => {
        const low = (1 - edge) * (100 + SLOPE);
        const high = low - SLOPE;
        const [left, right] = rtl ? [high, low] : [low, high];
        return `polygon(0% 0%, 100% 0%, 100% ${right}%, 0% ${left}%)`;
      };
      const release = () => {
        overlay.dataset.intro = "leaving";
        window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      };

      const title = SplitText.create(q("[data-intro-title]"), { type: "chars", mask: "chars" });
      gsap.set(q("[data-intro-layer]"), { clipPath: clip(0) });
      gsap.set(parts, { strokeOpacity: 1, fillOpacity: 0 });
      // The content ships hidden so a slow hydration shows a plain panel, not the finished pose
      // that the timeline would then snap away and redraw.
      gsap.set(q("[data-intro-content]"), { opacity: 1 });

      const timeline = gsap
        .timeline({ delay: 0.2, onComplete: () => (overlay.dataset.intro = "done") })
        .from(parts, { drawSVG: 0, duration: 1.1, ease: "power2.inOut", stagger: 0.12 })
        .to(parts, { fillOpacity: 1, strokeOpacity: 0, duration: 0.6, stagger: 0.06 }, "-=0.35")
        .fromTo(
          q("svg"),
          { filter: "drop-shadow(0 0 0px rgb(236 48 19 / 0))" },
          { filter: "drop-shadow(0 0 22px rgb(236 48 19 / 0.4))", duration: 0.8 },
          "<",
        )
        .from(q("[data-intro-label]"), { opacity: 0, y: 12, duration: 0.6, ease: EASE_OUT }, "-=0.5")
        .from(title.chars, { yPercent: 110, duration: 0.8, ease: EASE_OUT, stagger: 0.04 }, "<0.1")
        .from(q("[data-intro-title]"), { letterSpacing: "0.4em", duration: 1.2, ease: EASE_OUT }, "<")
        .from(q("[data-intro-rule]"), { scaleX: 0, duration: 0.8, ease: EASE_OUT }, "<0.3")
        .addLabel("exit", "+=0.45")
        .to(q("[data-intro-content]"), { y: -60, opacity: 0, duration: 0.6, ease: "power3.in" }, "exit")
        .to(
          q("[data-intro-layer=panel]"),
          { clipPath: clip(1), duration: 1, ease: "power3.inOut", onStart: release },
          "exit",
        )
        .to(q("[data-intro-layer=curtain]"), { clipPath: clip(1), duration: 1, ease: "power3.inOut" }, "exit+=0.05");

      const skip = () => {
        if (timeline.time() < timeline.labels.exit) timeline.seek("exit");
      };
      overlay.addEventListener("pointerdown", skip);
      window.addEventListener("keydown", skip);
      return () => {
        overlay.removeEventListener("pointerdown", skip);
        window.removeEventListener("keydown", skip);
      };
    },
    { scope },
  );

  return (
    <>
      <div
        id={INTRO_ID}
        ref={scope}
        aria-hidden
        // The parse-time script adds data-intro, which the client render doesn't know about.
        suppressHydrationWarning
        // Lenis ignores wheel and touch over the overlay; the CSS lock in globals.css holds the page.
        data-lenis-prevent
        className="fixed inset-0 z-[100] hidden cursor-pointer data-[intro=leaving]:pointer-events-none data-[intro=leaving]:block data-[intro=play]:block"
      >
        <div data-intro-layer="curtain" className="absolute inset-0 bg-brand" />
        <div data-intro-layer="panel" className="absolute inset-0 grid place-items-center bg-ground">
          <div
            data-intro-content
            // English on both locales; set explicitly so the Arabic page's font and .meta rules stay out.
            lang="en"
            dir="ltr"
            className="flex flex-col items-center gap-10 px-6 text-center font-latin opacity-0"
          >
            <LogoMark className="h-[clamp(120px,24vh,220px)] w-auto" />
            <div className="flex flex-col items-center gap-4">
              <p data-intro-label className="text-xs font-semibold tracking-[.3em] text-brand uppercase">
                Welcome to
              </p>
              <p data-intro-title className="disp -me-[.12em] text-[clamp(48px,9vw,128px)] tracking-[.12em]">
                MO Studio
              </p>
              <span data-intro-rule className="h-0.5 w-16 bg-brand" />
            </div>
          </div>
        </div>
      </div>
      <InlineScript html={DECIDE} />
    </>
  );
}
