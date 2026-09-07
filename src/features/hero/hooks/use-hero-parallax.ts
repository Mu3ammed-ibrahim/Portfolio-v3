import { useRef, type MouseEvent, type RefObject } from "react";
import { EASE, MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

type Setter = ReturnType<typeof gsap.quickTo>;
type Setters = { circleX: Setter; circleY: Setter; photoX: Setter; photoY: Setter };

/** Cursor-following drift for the red circle (26px) and portrait (8px); pointer devices only. */
export function useHeroParallax(scope: RefObject<HTMLElement | null>) {
  const setters = useRef<Setters | null>(null);

  useGSAP(
    () => {
      const circle = scope.current?.querySelector("[data-hero-circle]");
      const photo = scope.current?.querySelector("[data-hero-photo]");
      if (!circle || !photo) return;

      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (hover: hover)`, () => {
        setters.current = {
          circleX: gsap.quickTo(circle, "x", { duration: 0.7, ease: EASE }),
          circleY: gsap.quickTo(circle, "y", { duration: 0.7, ease: EASE }),
          photoX: gsap.quickTo(photo, "x", { duration: 0.9, ease: EASE }),
          photoY: gsap.quickTo(photo, "y", { duration: 0.9, ease: EASE }),
        };
        return () => {
          setters.current = null;
        };
      });
    },
    { scope },
  );

  const drift = (mx: number, my: number) => {
    const s = setters.current;
    if (!s) return;
    s.circleX(mx * 26);
    s.circleY(my * 26);
    s.photoX(mx * 8);
    s.photoY(my * 8);
  };

  const onMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    drift(
      (event.clientX - rect.left) / rect.width - 0.5,
      (event.clientY - rect.top) / rect.height - 0.5,
    );
  };

  const onLeave = () => drift(0, 0);

  return { onMove, onLeave };
}
