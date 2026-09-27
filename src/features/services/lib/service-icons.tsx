import { cn } from "@/lib/utils";

const ICONS = [
  <g key="design">
    <circle cx="20" cy="20" r="14" />
    <path d="M20 6v28M6 20h28M10 10l20 20M30 10L10 30" />
  </g>,
  <g key="web">
    <rect x="6" y="8" width="28" height="24" />
    <path d="M6 14h28M12 20h10M12 25h16" />
  </g>,
  <path key="api" d="M14 10 6 20l8 10M26 10l8 10-8 10M22 8 18 32" />,
  <g key="dashboard">
    <rect x="6" y="6" width="12" height="12" />
    <rect x="22" y="6" width="12" height="12" />
    <rect x="6" y="22" width="12" height="12" />
    <rect x="22" y="22" width="12" height="12" />
  </g>,
  <g key="systems">
  <path d="M20 6L34 13.5L20 21L6 13.5Z" />
  <path d="M6 20L20 27.5L34 20" />
  <path d="M6 26.5L20 34L34 26.5" />
</g>,
];

type ServiceIconProps = { index: number; className?: string };

export function ServiceIcon({ index, className }: ServiceIconProps) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden
      className={cn("origin-center text-brand", className)}
    >
      {ICONS[index]}
    </svg>
  );
}
