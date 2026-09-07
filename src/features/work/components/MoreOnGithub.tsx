import { AsteriskMark } from "@/components/AsteriskMark";
import { site } from "@/lib/site";

type MoreOnGithubProps = { lines: string[] };

export function MoreOnGithub({ lines }: MoreOnGithubProps) {
  return (
    <a
      href={site.github}
      target="_blank"
      rel="noreferrer"
      data-reveal
      className="mt-10 flex w-fit flex-col items-start gap-3.5 text-ink"
    >
      <span
        aria-hidden
        className="grid size-[52px] animate-rotate-18 place-items-center rounded-full bg-brand text-white"
      >
        <AsteriskMark className="size-[22px]" />
      </span>
      <span className="meta text-[10px] leading-[1.7] text-ink-muted">
        {lines[0]}
        <br />
        {lines[1]}
      </span>
    </a>
  );
}
