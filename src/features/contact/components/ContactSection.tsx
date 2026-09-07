import { RevealGroup } from "@/components/RevealGroup";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { ContactLinks } from "@/features/contact/components/ContactLinks";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type ContactSectionProps = { t: Dictionary };

export function ContactSection({ t }: ContactSectionProps) {
  const [lineA, lineB] = t.contact.heading;

  return (
    <section id="contact" className="relative z-[1] overflow-hidden border-t border-divider">
      <RevealGroup className="wrap relative py-14 lg:pt-[72px] lg:pb-[88px]">
        <h2 className="rail" data-reveal>
          {t.contact.rail}
        </h2>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_.9fr_.9fr]">
          <p
            data-reveal
            className="disp text-[clamp(44px,5.2vw,84px)] leading-[.92] rtl:text-[clamp(34px,4vw,64px)]"
          >
            {lineA}
            <br />
            {lineB}
            <br />
            <span className="text-brand">{t.contact.highlight}</span>
          </p>
          <div data-reveal="0.1">
            <ContactForm t={t.contact} arrow={t.arrows.forward} />
          </div>
          <ContactLinks location={t.contact.location} />
        </div>
      </RevealGroup>
    </section>
  );
}
