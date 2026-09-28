type LogoMarkProps = { className?: string };

// vector-effect doesn't inherit, so each shape carries it: the outline stays 2 screen px at any size.
const part = { "data-logo-part": "", vectorEffect: "non-scaling-stroke" } as const;

/**
 * The MO mark, traced by hand from public/logo.png (coordinates are that image's pixels, so the
 * viewBox is its crop). Vector paths let the intro draw the outline stroke by stroke. Every shape
 * is a data-logo-part; its stroke starts invisible, so the static mark renders as solid fills.
 */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg viewBox="500 60 535 825" className={className} aria-hidden focusable="false">
      <defs>
        {/* The S's upper arm runs on into the red bar, fading from white to red on the way */}
        <linearGradient id="logo-mark-fade" gradientUnits="userSpaceOnUse" x1="835" y1="558" x2="976" y2="695">
          <stop offset="0" className="[stop-color:var(--ink)]" />
          <stop offset="0.22" className="[stop-color:var(--brand)]" />
        </linearGradient>
      </defs>
      <g strokeWidth="2" strokeLinejoin="miter" strokeOpacity="0">
        <polygon
          {...part}
          className="fill-ink stroke-ink"
          points="509,70 766,306 1026,70 1026,618 971,564 971,200 766,382 564,200 564,689 509,636"
        />
        <polygon
          {...part}
          className="fill-ink stroke-ink"
          points="637,332 854,536 815,580 692,464 692,557 873,727 873,773 763,875 637,757 637,677 763,801 813,755 637,586"
        />
        <polygon {...part} className="fill-brand stroke-brand" points="904,327 809,414 904,505" />
        <polygon
          {...part}
          fill="url(#logo-mark-fade)"
          stroke="url(#logo-mark-fade)"
          points="854,536 999,674 954,716 815,580"
        />
      </g>
    </svg>
  );
}
