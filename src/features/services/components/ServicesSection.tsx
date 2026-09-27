import {
  BrowsersIcon,
  ChartBarIcon,
  DatabaseIcon,
  PenNibIcon,
  TreeStructureIcon,
} from "@phosphor-icons/react/dist/ssr";
import { RevealGroup } from "@/components/RevealGroup";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/features/services/components/ServiceCard";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type ServicesSectionProps = { t: Dictionary };

// Paired with the dictionary's service items by position.
const icons = [PenNibIcon, BrowsersIcon, DatabaseIcon, ChartBarIcon, TreeStructureIcon];

// Five cards as a 2 + 3 rhythm on desktop instead of five thin equal columns.
const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export function ServicesSection({ t }: ServicesSectionProps) {
  return (
    <section id="services" className="relative z-[1]">
      <RevealGroup className="wrap pt-[calc(var(--cut)+56px)] pb-24">
        <div className="mb-12">
          <SectionHeading>{t.services.heading}</SectionHeading>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {t.services.items.map((item, index) => (
            <div key={item.title} className={spans[index]}>
              <ServiceCard
                index={index}
                title={item.title}
                body={item.body}
                icon={icons[index % icons.length]}
              />
            </div>
          ))}
        </div>
      </RevealGroup>
    </section>
  );
}
