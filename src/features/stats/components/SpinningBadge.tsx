import { AsteriskMark } from "@/components/AsteriskMark";

const RING_TEXT = "Design · Build · Ship · MO Studio · ";

export function SpinningBadge() {
  return (
    <div data-reveal className="relative hidden size-[140px] place-items-center justify-self-end lg:grid">
      <svg viewBox="0 0 140 140" className="absolute inset-0 animate-rotate-20" aria-hidden>
        <defs>
          <path id="badge-ring" d="M70,70 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0" />
        </defs>
        <text className="font-latin fill-ink text-[11.5px] font-bold tracking-[.24em] uppercase">
          <textPath href="#badge-ring">{RING_TEXT}</textPath>
        </text>
      </svg>
      <AsteriskMark className="size-[26px] text-brand" strokeWidth={2.2} />
    </div>
  );
}
