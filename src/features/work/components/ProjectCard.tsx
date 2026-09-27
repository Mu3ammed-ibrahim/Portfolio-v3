import Image from "next/image";
import { nameLines, type Project } from "@/features/work/lib/projects";
import type { Locale } from "@/lib/i18n/config";

type ProjectCardProps = {
  project: Project;
  kind: string;
  repoLabel: string;
  arrow: string;
  locale: Locale;
  delay: number;
};

/**
 * The card has two destinations, so it cannot be one <a> around everything. The name is the live
 * link and stretches over the whole card via ::after; the repo link is lifted above that overlay.
 */
export function ProjectCard({
  project,
  kind,
  repoLabel,
  arrow,
  locale,
  delay,
}: ProjectCardProps) {
  const [primary, secondary] = nameLines(project.name, locale);

  return (
    <article data-reveal={delay} className="group/card relative flex flex-col gap-4 text-ink">
      <div className="relative aspect-[4/5] overflow-hidden border border-divider bg-surface transition-colors duration-500 ease-out-expo group-hover/card:border-brand group-focus-within/card:border-brand">
        <Image
          src={project.image}
          alt={primary.text}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex items-start justify-between gap-3.5">
        <div>
          {/* lang drives the display treatment; bdi orders mixed runs without flipping alignment. */}
          <h3 className="disp text-2xl leading-none" lang={primary.lang}>
            {project.liveHref ? (
              <a
                href={project.liveHref}
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-300 after:absolute after:inset-0 group-hover/card:text-brand"
              >
                <bdi>{primary.text}</bdi>
              </a>
            ) : (
              <bdi>{primary.text}</bdi>
            )}
          </h3>
          {secondary ? (
            <p className="disp mt-1.5 text-[15px] leading-none text-ink-muted" lang={secondary.lang}>
              <bdi>{secondary.text}</bdi>
            </p>
          ) : null}
          <p className="meta mt-2 text-[10.5px] text-ink-muted">{kind}</p>
        </div>
        {project.liveHref ? (
          <span
            aria-hidden
            className="grid size-9 flex-none place-items-center border border-brand bg-brand text-base text-white transition-all duration-300 group-hover/card:bg-transparent group-hover/card:text-brand"
          >
            {arrow}
          </span>
        ) : null}
      </div>

      <ul className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li key={tag} className="meta border border-divider px-2 py-[5px] text-[9.5px] text-ink-muted">
            {tag}
          </li>
        ))}
      </ul>

      {project.repoHref ? (
        <a
          href={project.repoHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`${repoLabel} — ${primary.text}`}
          className="meta relative z-10 w-fit border-b border-divider pb-1 text-[9.5px] text-ink-muted transition-colors duration-300 hover:border-brand hover:text-brand"
        >
          {repoLabel}
        </a>
      ) : null}
    </article>
  );
}
