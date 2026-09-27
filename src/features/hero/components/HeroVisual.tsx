import Image from "next/image";

type HeroVisualProps = { portraitAlt: string; disciplines: string[] };

export function HeroVisual({ portraitAlt, disciplines }: HeroVisualProps) {
  return (
    <div className="relative lg:h-full">
      <div className="relative min-h-[420px] sm:min-h-[560px] lg:h-full">
        <div
          data-hero-circle
          aria-hidden
          className="absolute top-[6%] -end-[6%] aspect-square w-[min(60vw,470px)] rounded-full bg-brand lg:w-[min(34vw,470px)]"
        />
        <div data-hero-photo className="absolute top-0  h-[60px] w-[58%] overflow-hidden">
          <Image
            src="/hero-portrait.webp"
            alt={portraitAlt}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="object-cover "
          />
        </div>
        <div aria-hidden className="absolute top-[10%] end-0 hidden h-[44%] w-px bg-divider lg:block">
          <span className="absolute top-[58%] -start-[3px] size-[7px] rounded-full bg-ink" />
        </div>
      </div>
      {/* Sits beside the portrait on desktop; drops under it as a row on smaller screens */}
      <ul className="meta mt-5 flex flex-wrap justify-end gap-x-5 gap-y-1 text-end leading-[1.9] text-ink lg:absolute lg:end-0 lg:bottom-20 lg:mt-0 lg:block">
        {disciplines.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
