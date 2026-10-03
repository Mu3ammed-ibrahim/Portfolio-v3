import { ActionLink } from "@/components/ActionLink";
import { RevealGroup } from "@/components/RevealGroup";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/features/work/components/ProjectCard";
import { WorkCarousel } from "@/features/work/components/WorkCarousel";
import { projects } from "@/features/work/lib/projects";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { site } from "@/lib/site";

type WorkSectionProps = { t: Dictionary; locale: Locale };

export function WorkSection({ t, locale }: WorkSectionProps) {
  return (
    // overflow-clip, not hidden: a hidden box can still be scrolled by focus, which would jerk the
    // pinned track. While pinned (data-pinned, set by usePinnedTrack) the panel fills the viewport,
    // centred, with only the header's height kept clear on top.
    <section
      id="work"
      className="group/work relative z-[1] overflow-clip data-pinned:flex data-pinned:min-h-svh data-pinned:items-center"
    >
      {/* Brand wedge bleeding off the reading end, as in the reference */}
      <div
        aria-hidden
        className="pointer-events-none absolute end-0 bottom-[12%] -z-10 hidden size-[clamp(160px,18vw,300px)] wedge-end bg-brand lg:block"
      />
      <RevealGroup className="wrap w-full pt-[calc(var(--cut)+56px)] pb-[calc(var(--cut)+48px)] group-data-pinned/work:pt-[76px] max-sm:group-data-pinned/work:pb-0">
        <WorkCarousel
          header={<SectionHeading eyebrow={t.work.rail}>{t.work.heading}</SectionHeading>}
          action={
            <ActionLink href={site.github} variant="outline" external>
              {t.work.viewAll}
            </ActionLink>
          }
          labels={{ prev: t.work.prev, next: t.work.next }}
        >
          {projects.map((project, index) => (
            <li key={project.slug} data-reveal={0.1 + index * 0.08} className="snap-start">
              <ProjectCard
                eager={index < 2}
                project={project}
                kind={t.work.projects[project.slug]}
                repoLabel={t.work.repo}
                locale={locale}
              />
            </li>
          ))}
        </WorkCarousel>
      </RevealGroup>
    </section>
  );
}
