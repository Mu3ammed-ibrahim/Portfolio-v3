import { logoFade, logoShapes, logoViewBoxAttr } from "@/lib/brand/logo-geometry";

type LogoMarkProps = { className?: string };

// vector-effect doesn't inherit, so each shape carries it: the outline stays 2 screen px at any size.
const part = { "data-logo-part": "", vectorEffect: "non-scaling-stroke" } as const;

/**
 * The MO mark as live vector paths, so the intro can draw the outline stroke by stroke. Every shape
 * is a data-logo-part; its stroke starts invisible, so the static mark renders as solid fills.
 */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg viewBox={logoViewBoxAttr} className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient
          id="logo-mark-fade"
          gradientUnits="userSpaceOnUse"
          x1={logoFade.x1}
          y1={logoFade.y1}
          x2={logoFade.x2}
          y2={logoFade.y2}
        >
          <stop offset="0" className="[stop-color:var(--ink)]" />
          <stop offset={logoFade.brandAt} className="[stop-color:var(--brand)]" />
        </linearGradient>
      </defs>
      <g strokeWidth="2" strokeLinejoin="miter" strokeOpacity="0">
        <polygon {...part} className="fill-ink stroke-ink" points={logoShapes.m} />
        <polygon {...part} className="fill-ink stroke-ink" points={logoShapes.s} />
        <polygon {...part} className="fill-brand stroke-brand" points={logoShapes.wedge} />
        <polygon {...part} fill="url(#logo-mark-fade)" stroke="url(#logo-mark-fade)" points={logoShapes.bar} />
      </g>
    </svg>
  );
}
