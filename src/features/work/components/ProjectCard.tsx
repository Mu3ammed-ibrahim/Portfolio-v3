import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { nameLines, type Project } from "@/features/work/lib/projects";
import type { Locale } from "@/lib/i18n/config";

type ProjectCardProps = {
  project: Project;
  kind: string;
  repoLabel: string;
  locale: Locale;
};

/**
 * The card has two destinations, so it cannot be one <a> around everything. The name is the live
 * link and stretches over the whole card via ::after; the repo link is lifted above that overlay.
 */
export function ProjectCard({ project, kind, repoLabel, locale }: ProjectCardProps) {
  const [primary, secondary] = nameLines(project.name, locale);

  return (
    <article
      className="group/card relative flex h-full flex-col border border-divider bg-surface text-ink transition-colors duration-500 ease-out-expo hover:border-brand/60 focus-within:border-brand"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={project.image}
          alt={primary.text}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 80vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 max-sm:in-data-pinned:gap-3 max-sm:in-data-pinned:p-4">
        <p className="meta text-[10px] text-brand">{kind}</p>
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
              <p
                className="disp mt-1.5 text-[15px] leading-none text-ink-muted"
                lang={secondary.lang}
              >
                <bdi>{secondary.text}</bdi>
              </p>
            ) : null}
          </div>
          {project.liveHref ? (
            <span
              aria-hidden
              className="grid size-10 flex-none place-items-center border border-brand text-brand transition-colors duration-300 group-hover/card:bg-brand group-hover/card:text-ground"
            >
              <ArrowUpRightIcon weight="bold" className="size-4 rtl:-scale-x-100" />
            </span>
          ) : null}
        </div>

        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="meta border border-divider px-2 py-[5px] text-[9.5px] text-ink-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        {project.repoHref ? (
          <a
            href={project.repoHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`${repoLabel}: ${primary.text}`}
            className="meta relative z-10 w-fit border-b border-divider pb-1 text-[9.5px] text-ink-muted transition-colors duration-300 hover:border-brand hover:text-brand"
          >
            {repoLabel}
          </a>
        ) : null}
      </div>
    </article>
  );
}
