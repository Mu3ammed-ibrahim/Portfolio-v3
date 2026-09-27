import {
  CalendarIcon,
  ClockIcon,
  RocketLaunchIcon,
  StackIcon,
} from "@phosphor-icons/react/dist/ssr";
import { RevealGroup } from "@/components/RevealGroup";
import { SectionBand } from "@/components/SectionBand";
import { SectionHeading } from "@/components/SectionHeading";
import { StatCounter } from "@/features/stats/components/StatCounter";
import { stats } from "@/features/stats/lib/stats";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type StatsSectionProps = { t: Dictionary };

// Paired with lib/stats.ts and the dictionary labels by position.
const icons = [CalendarIcon, RocketLaunchIcon, StackIcon, ClockIcon];

/** Sits in the reference's testimonial slot: heading on one side, proof cards on the other. */
export function StatsSection({ t }: StatsSectionProps) {
  return (
    <SectionBand>
      <RevealGroup className="wrap grid grid-cols-1 gap-10 py-20 lg:grid-cols-[.7fr_2fr] lg:items-center lg:gap-14 lg:py-24">
        <SectionHeading>{t.stats.heading}</SectionHeading>
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = icons[index % icons.length];
            return (
              <li
                key={stat.suffix + stat.target}
                data-reveal={index * 0.08}
                className="flex flex-col gap-5 border border-divider bg-ground/60 p-6"
              >
                <Icon aria-hidden className="size-6 text-brand" />
                <StatCounter target={stat.target} suffix={stat.suffix} />
                <p className="meta text-[10px] leading-[1.7] text-ink-muted">
                  {t.stats.labels[index][0]}
                  <br />
                  {t.stats.labels[index][1]}
                </p>
              </li>
            );
          })}
        </ul>
      </RevealGroup>
    </SectionBand>
  );
}
