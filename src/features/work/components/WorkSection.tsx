import { RevealGroup } from "@/components/RevealGroup";
import { MoreOnGithub } from "@/features/work/components/MoreOnGithub";
import { ProjectCard } from "@/features/work/components/ProjectCard";
import { projects } from "@/features/work/lib/projects";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type WorkSectionProps = { t: Dictionary };

export function WorkSection({ t }: WorkSectionProps) {
  return (
    <section id="work" className="relative z-[1] border-t border-divider">
      <RevealGroup className="wrap pt-14 pb-16">
        <h2 className="rail" data-reveal>
          {t.work.rail}
        </h2>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              name={t.work.projects[index].name}
              kind={t.work.projects[index].kind}
              num={`0${index + 1}`}
              arrow={t.arrows.diag}
              delay={index * 0.08}
            />
          ))}
        </div>
        <MoreOnGithub lines={t.work.more} />
      </RevealGroup>
    </section>
  );
}
