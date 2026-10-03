import { ImageResponse } from "next/og";
import { BrandMark } from "@/lib/brand/BrandMark";
import { brandHex } from "@/lib/brand/brand-hex";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS ignores SVG touch icons and rounds the corners itself, so this is a full-bleed square PNG.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brandHex.ground,
        }}
      >
        <BrandMark height={128} />
      </div>
    ),
    size,
  );
}
