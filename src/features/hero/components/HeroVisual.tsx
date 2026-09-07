import Image from "next/image";

type HeroVisualProps = { portraitAlt: string; disciplines: string[] };

export function HeroVisual({ portraitAlt, disciplines }: HeroVisualProps) {
  return (
    <div className="relative min-h-[440px] sm:min-h-[560px]">
      <div
        data-hero-circle
        aria-hidden
        className="absolute top-[6%] -end-[6%] aspect-square w-[min(60vw,470px)] rounded-full bg-brand lg:w-[min(34vw,470px)]"
      />
      <div data-hero-photo className="absolute top-0 start-[6%] h-full w-[78%] overflow-hidden">
        <Image
          src="/hero-portrait.webp"
          alt={portraitAlt}
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 80vw"
          className="object-cover object-[60%_center]"
        />
      </div>
      <div aria-hidden className="absolute top-[10%] end-0 h-[44%] w-px bg-divider">
        <span className="absolute top-[58%] -start-[3px] size-[7px] rounded-full bg-ink" />
      </div>
      <ul className="meta absolute end-0 bottom-20 text-end leading-[1.9] text-ink">
        {disciplines.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
