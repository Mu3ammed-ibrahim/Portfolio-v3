import { AsteriskMark } from "@/components/AsteriskMark";
import { site } from "@/lib/site";

type MoreOnGithubProps = { lines: string[]; delay: number };

/** Terminal cell of the work grid: two columns at lg, which squares off the last row. */
export function MoreOnGithub({ lines, delay }: MoreOnGithubProps) {
  return (
    <a
      href={site.github}
      target="_blank"
      rel="noreferrer"
      data-reveal={delay}
      className="group/more flex flex-col justify-between gap-10 border border-divider bg-surface p-7 text-ink transition-colors duration-500 ease-out-expo hover:border-brand focus-visible:border-brand sm:p-9 lg:col-span-2"
    >
      <span
        aria-hidden
        className="grid size-[52px] flex-none place-items-center rounded-full bg-brand text-white motion-safe:animate-rotate-18 lg:size-[88px]"
      >
        <AsteriskMark className="size-[22px] lg:size-[38px]" />
      </span>
      <span>
        <span className="disp block text-[clamp(30px,4.6vw,64px)] leading-[1.02]">{lines[0]}</span>
        <span className="disp block text-[clamp(30px,4.6vw,64px)] leading-[1.02] text-ink-muted transition-colors duration-500 group-hover/more:text-brand">
          {lines[1]}
        </span>
        <span className="meta mt-5 block text-[9.5px] text-ink-muted">{site.githubLabel}</span>
      </span>
    </a>
  );
}
