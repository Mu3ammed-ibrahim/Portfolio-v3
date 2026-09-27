import { RevealGroup } from "@/components/RevealGroup";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { ContactInfo } from "@/features/contact/components/ContactInfo";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type ContactSectionProps = { t: Dictionary };

export function ContactSection({ t }: ContactSectionProps) {
  const [lineA, lineB] = t.contact.heading;

  return (
    <section id="contact" className="relative z-[1] overflow-hidden">
      <RevealGroup className="wrap grid grid-cols-1 gap-12 lg:grid-cols-[.95fr_1.1fr_.8fr] lg:gap-14 lg:py-24">
        {/* On mobile the column itself is the brand block; on desktop a slanted panel bleeds to the screen edge. */}
        <div className="relative -mx-6 flex flex-col justify-center bg-brand px-6 py-14 md:-mx-12 md:px-12 lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0">
          <div
            aria-hidden
            className="absolute -inset-y-24 -start-[100vw] end-0 hidden slant-end bg-brand lg:block"
          />
          {/* Ground on brand is 4.6:1; ink is only large-text safe, so the small label uses ground. */}
          <p data-reveal className="meta relative mb-5 flex items-center gap-3 text-ground">
            {t.contact.rail}
            <span aria-hidden className="font-latin tracking-[.3em]">
              {"//////"}
            </span>
          </p>
          <h2
            data-reveal
            className="disp relative text-[clamp(44px,4.6vw,76px)] text-ink rtl:text-[clamp(34px,3.6vw,58px)]"
          >
            {lineA}
            <br />
            {lineB}
          </h2>
        </div>
        <div data-reveal="0.1" className="lg:ps-6">
          <ContactForm t={t.contact} arrow={t.arrows.forward} />
        </div>
        <div className="pb-16 lg:pb-0">
          <ContactInfo t={t.contact} />
        </div>
      </RevealGroup>
    </section>
  );
}
