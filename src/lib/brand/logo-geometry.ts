/**
 * The MO mark, traced by hand from public/logo.png. Coordinates are that image's pixels, so the
 * viewBox is its crop. The intro's LogoMark and the generated icons and share card all draw from
 * here, so the mark can only change in one place.
 */
export const logoViewBox = { x: 500, y: 60, width: 535, height: 825 } as const;

export const logoShapes = {
  m: "509,70 766,306 1026,70 1026,618 971,564 971,200 766,382 564,200 564,689 509,636",
  s: "637,332 854,536 815,580 692,464 692,557 873,727 873,773 763,875 637,757 637,677 763,801 813,755 637,586",
  wedge: "904,327 809,414 904,505",
  bar: "854,536 999,674 954,716 815,580",
} as const;

// The S's upper arm runs on into the red bar, fading from ink to brand on the way.
export const logoFade = { x1: 835, y1: 558, x2: 976, y2: 695, brandAt: 0.22 } as const;

export const logoViewBoxAttr = `${logoViewBox.x} ${logoViewBox.y} ${logoViewBox.width} ${logoViewBox.height}`;
