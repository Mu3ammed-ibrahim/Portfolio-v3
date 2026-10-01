"use client";

import { getImageProps } from "next/image";
import { useRef } from "react";
import { EASE_OUT, MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

type HeroBackgroundProps = { alt: string };

// Matches Tailwind's `lg`, where the hero copy moves beside the subject instead of below him.
const DESKTOP = "(min-width: 64rem)";

/**
 * Full-bleed portrait behind the hero copy. It settles from a slight zoom on load and drifts
 * slower than the page as the hero scrolls away, which gives the cut edge some depth.
 */
export function HeroBackground({ alt }: HeroBackgroundProps) {
  const scope = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const hero = scope.current?.closest<HTMLElement>("section");
    const atmosphere = scope.current?.querySelector<HTMLElement>("[data-hero-atmosphere]");

    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.to(layer.current, { scale: 1, duration: 1.8, ease: EASE_OUT });

      // The image lags behind the hero section as it leaves the viewport, creating depth without
      // tying the effect to one fixed viewport height.
      gsap.to(layer.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      if (atmosphere) {
        gsap.to(atmosphere, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
      }
    });
  }, { scope });

  // Art direction: a <picture> lets the browser fetch only the crop for the current viewport.
  // Eager + high priority stands in for `preload`, which would force one crop on every screen.
  const common = { alt, fill: true, sizes: "100vw", loading: "eager", fetchPriority: "high" } as const;
  const { srcSet: desktop } = getImageProps({ ...common, src: "/hero-bg-img.png" }).props;
  const { props: mobile } = getImageProps({ ...common, src: "/hero-bg-mobileVeiw.png" });

  return (
    <div ref={scope} className="absolute inset-0 -z-10 overflow-hidden">
      {/* The zoomed start state ships in the server HTML; reduced motion drops it in CSS, not by
          branching the render, so SSR and client markup match. */}
      <div
        ref={layer}
        className="absolute inset-x-0 -top-[30%] bottom-0 transform-[scale(1.06)] motion-reduce:transform-none lg:top-0"
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
      </div>
      <div
        aria-hidden
        data-hero-atmosphere
        className="pointer-events-none absolute -inset-[12%] bg-[radial-gradient(circle_at_72%_34%,rgba(236,48,19,0.16),transparent_34%)] opacity-80 mix-blend-screen"
      />
      {/* Scrims: from the reading edge on desktop, from the bottom on narrow screens */}
      <div className="absolute inset-0 bg-linear-to-t from-ground via-ground/70 to-ground/10 lg:bg-linear-to-r lg:from-ground lg:via-ground/60 lg:to-transparent rtl:lg:bg-linear-to-l" />
    </div>
  );
}
