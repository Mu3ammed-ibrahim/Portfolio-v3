import type { Icon } from "@phosphor-icons/react";

type ServiceCardProps = { index: number; title: string; body: string; icon: Icon };

export function ServiceCard({ index, title, body, icon: Glyph }: ServiceCardProps) {
  const scrollY = [14, -11, 16, -10, 12][index % 5];

  return (
    <article
      data-reveal={index * 0.08}
      className="group/svc relative h-full min-h-[260px] overflow-hidden border border-divider bg-surface transition-colors duration-500 ease-out-expo hover:border-brand/60"
    >
      <div
        data-scroll-transform
        data-scroll-y={scrollY}
        data-scroll-scale="0.985"
        className="flex h-full min-h-[260px] flex-col p-7 will-change-transform"
      >
        <Glyph
          aria-hidden
          className="mb-auto size-9 text-brand transition-transform duration-500 ease-out-expo group-hover/svc:-translate-y-1"
        />
        <h3 className="disp mt-10 mb-3 text-[26px] leading-none rtl:text-xl">{title}</h3>
        <p className="max-w-[40ch] pe-2 pb-6 text-[13.5px] leading-[1.7] text-ink-muted sm:pe-16 sm:pb-0">{body}</p>

        {/* Outlined index and brand corner wedge from the reference card */}
        <span
          aria-hidden
          className="disp font-latin absolute end-5 bottom-3 text-[64px] text-transparent [-webkit-text-stroke:1px_var(--divider)]"
        >
          0{index + 1}
        </span>
      </div>
      <span
        aria-hidden
        className="absolute end-0 bottom-0 size-6 wedge-end bg-brand transition-[width,height] duration-500 ease-out-expo group-hover/svc:size-12"
      />
    </article>
  );
}
