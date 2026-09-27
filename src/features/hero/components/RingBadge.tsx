import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

type RingBadgeProps = { text: string; href: string };

/** Rotating availability ring from the reference; the centre is the link target. */
export function RingBadge({ text, href }: RingBadgeProps) {
  return (
    <a
      href={href}
      aria-label={text.split("/")[0].trim()}
      className="group/ring grid size-[132px] place-items-center"
    >
      <svg viewBox="0 0 140 140" className="col-start-1 row-start-1 size-full motion-safe:animate-rotate-20" aria-hidden>
        <defs>
          <path id="ring-path" d="M70,70 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0" />
        </defs>
        {/* Under an inherited RTL direction the text anchors at the path's end and runs off it. */}
        <text direction="ltr" className="fill-ink text-[10.5px] font-bold uppercase">
          {/* textLength spreads any locale's string evenly around the full 2πr circle */}
          <textPath href="#ring-path" textLength={351} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="col-start-1 row-start-1 grid size-12 place-items-center border border-ink/40 text-ink transition-colors duration-300 group-hover/ring:border-brand group-hover/ring:bg-brand group-hover/ring:text-ground">
        <ArrowUpRightIcon aria-hidden weight="bold" className="size-5 rtl:-scale-x-100" />
      </span>
    </a>
  );
}
