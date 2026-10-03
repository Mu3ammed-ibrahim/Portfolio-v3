import { brandHex } from "@/lib/brand/brand-hex";
import { logoFade, logoShapes, logoViewBox, logoViewBoxAttr } from "@/lib/brand/logo-geometry";

type BrandMarkProps = { height: number };

/** The MO mark for ImageResponse routes: the same geometry as LogoMark, painted with literal colours. */
export function BrandMark({ height }: BrandMarkProps) {
  const width = Math.round((height * logoViewBox.width) / logoViewBox.height);
  return (
    <svg width={width} height={height} viewBox={logoViewBoxAttr}>
      <defs>
        <linearGradient
          id="fade"
          gradientUnits="userSpaceOnUse"
          x1={logoFade.x1}
          y1={logoFade.y1}
          x2={logoFade.x2}
          y2={logoFade.y2}
        >
          <stop offset="0" stopColor={brandHex.ink} />
          <stop offset={logoFade.brandAt} stopColor={brandHex.brand} />
        </linearGradient>
      </defs>
      <polygon fill={brandHex.ink} points={logoShapes.m} />
      <polygon fill={brandHex.ink} points={logoShapes.s} />
      <polygon fill={brandHex.brand} points={logoShapes.wedge} />
      <polygon fill="url(#fade)" points={logoShapes.bar} />
    </svg>
  );
}
