import { RevealGroup } from "@/components/RevealGroup";
import { StatCounter } from "@/features/stats/components/StatCounter";
import { stats } from "@/features/stats/lib/stats";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type StatsSectionProps = { t: Dictionary };

export function StatsSection({ t }: StatsSectionProps) {
  return (
    <section className="relative z-[1] border-t border-divider">
      <RevealGroup className="wrap grid grid-cols-2 items-center gap-x-6 gap-y-10 py-12 lg:grid-cols-4 lg:gap-0">
        {stats.map((stat, index) => (
          <div
            key={stat.suffix + stat.target}
            data-reveal={index * 0.1}
            className="border-divider lg:me-6 lg:border-e lg:pe-6"
          >
            <StatCounter target={stat.target} suffix={stat.suffix} />
            <p className="meta mt-3.5 text-[10px] leading-[1.7] text-ink-muted">
              {t.stats.labels[index][0]}
              <br />
              {t.stats.labels[index][1]}
            </p>
          </div>
        ))}
      </RevealGroup>
    </section>
  );
}
