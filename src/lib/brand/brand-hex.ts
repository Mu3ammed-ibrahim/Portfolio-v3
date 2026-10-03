// ImageResponse (Satori), the manifest and the viewport can't read CSS variables, so they take the
// tokens as literals. Keep these in step with --ground / --surface / --ink / --brand in globals.css.
export const brandHex = {
  ground: "#0f0e0e",
  surface: "#181616",
  ink: "#f3f2f2",
  brand: "#ec3013",
} as const;
