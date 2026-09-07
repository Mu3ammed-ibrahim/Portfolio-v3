import { ServiceIcon } from "@/features/services/lib/service-icons";

type ServiceCardProps = { index: number; title: string; body: string };

export function ServiceCard({ index, title, body }: ServiceCardProps) {
  return (
    <div
      data-reveal={index * 0.08}
      className="group/svc flex flex-col gap-[22px] border-b border-divider py-5 transition-colors duration-350 hover:bg-surface lg:me-6 lg:border-e lg:border-b-0 lg:py-2 lg:pe-6"
    >
      <ServiceIcon
        index={index}
        className="transition-transform duration-500 ease-out-expo group-hover/svc:rotate-90 group-hover/svc:scale-[1.08]"
      />
      <div>
        <h3 className="meta mb-2.5 text-xs font-bold tracking-[.1em]">{title}</h3>
        <p className="text-[12.5px] leading-[1.65] text-ink-muted">{body}</p>
      </div>
      <p className="meta font-latin mt-auto text-ink-muted">0{index + 1}</p>
    </div>
  );
}
