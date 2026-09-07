import Image from "next/image";
import type { Project } from "@/features/work/lib/projects";

type ProjectCardProps = {
  project: Project;
  name: string;
  kind: string;
  num: string;
  arrow: string;
  delay: number;
};

export function ProjectCard({ project, name, kind, num, arrow, delay }: ProjectCardProps) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      data-reveal={delay}
      className="group/card flex flex-col gap-4 text-ink"
    >
      <div className="relative aspect-[4/5] overflow-hidden border border-divider bg-surface transition-[transform,border-color] duration-500 ease-out-expo group-hover/card:-translate-y-1.5 group-hover/card:border-brand">
        <Image
          src={project.image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-800 ease-out-expo group-hover/card:scale-[1.04]"
        />
      </div>
      <div className="flex items-start justify-between gap-3.5">
        <div className="flex items-start gap-3.5">
          <span className="disp font-latin text-[22px] leading-none font-stretch-[70%] text-ink-muted">
            {num}
          </span>
          <div>
            <h3 className="disp text-2xl leading-none">{name}</h3>
            <p className="meta mt-1.5 text-[10.5px] text-ink-muted">{kind}</p>
          </div>
        </div>
        <span
          aria-hidden
          className="grid size-9 flex-none place-items-center border border-ink text-base transition-all duration-300 group-hover/card:border-brand group-hover/card:bg-brand"
        >
          {arrow}
        </span>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li key={tag} className="meta border border-divider px-2 py-[5px] text-[9.5px] text-ink-muted">
            {tag}
          </li>
        ))}
      </ul>
    </a>
  );
}
