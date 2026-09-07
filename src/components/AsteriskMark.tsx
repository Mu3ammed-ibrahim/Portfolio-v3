type AsteriskMarkProps = { className?: string; strokeWidth?: number };

/** The eight-spoke asterisk used as the studio's rotating mark. */
export function AsteriskMark({ className, strokeWidth = 2 }: AsteriskMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}
