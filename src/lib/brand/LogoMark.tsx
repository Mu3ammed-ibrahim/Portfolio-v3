import { logoFade, logoShapes, logoViewBoxAttr } from "@/lib/brand/logo-geometry";

// The gradient is referenced by id, so each copy on a page needs its own.
type LogoMarkProps = { className?: string; gradientId?: string };

// vector-effect doesn't inherit, so each shape carries it: the outline stays 2 screen px at any size.
const part = { "data-logo-part": "", vectorEffect: "non-scaling-stroke" } as const;

/**
 * The MO mark as live vector paths: the header and footer logo, and the intro draws its outline
 * stroke by stroke. Every shape is a data-logo-part; its stroke starts invisible, so the static mark
 * renders as solid fills.
 */
export function LogoMark({ className, gradientId = "logo-mark-fade" }: LogoMarkProps) {
  return (
    <svg viewBox={logoViewBoxAttr} className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient
          id={gradientId}
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
        <polygon {...part} fill={`url(#${gradientId})`} stroke={`url(#${gradientId})`} points={logoShapes.bar} />
      </g>
    </svg>
  );
}
