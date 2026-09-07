import { RevealGroup } from "@/components/RevealGroup";
import { ServiceCard } from "@/features/services/components/ServiceCard";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type ServicesSectionProps = { t: Dictionary };

export function ServicesSection({ t }: ServicesSectionProps) {
  return (
    <section id="services" className="relative z-[1] border-t border-divider">
      <RevealGroup className="wrap pt-14 pb-16">
        <h2 className="rail" data-reveal>
          {t.services.rail}
        </h2>
        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-0">
          {t.services.items.map((item, index) => (
            <ServiceCard key={item.title} index={index} title={item.title} body={item.body} />
          ))}
        </div>
      </RevealGroup>
    </section>
  );
}
