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
    <section id="work" className="relative z-[1] overflow-hidden">
      {/* Brand wedge bleeding off the reading end, as in the reference */}
      <div
        aria-hidden
        className="pointer-events-none absolute end-0 bottom-[12%] -z-10 hidden size-[clamp(160px,18vw,300px)] wedge-end bg-brand lg:block"
      />
      <RevealGroup className="wrap pt-[calc(var(--cut)+56px)] pb-[calc(var(--cut)+48px)]">
        <WorkCarousel
          header={<SectionHeading eyebrow={t.work.rail}>{t.work.heading}</SectionHeading>}
          action={
            <ActionLink href={site.github} variant="outline" external>
              {t.work.viewAll}
            </ActionLink>
          }
          labels={{ prev: t.work.prev, next: t.work.next }}
        >
          {projects.map((project) => (
            <li key={project.slug} className="snap-start">
              <ProjectCard
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
