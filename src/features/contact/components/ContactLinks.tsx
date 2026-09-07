import { GithubGlyph, LinkedinGlyph, MailGlyph, PinGlyph } from "@/features/contact/lib/contact-icons";
import { site } from "@/lib/site";

type ContactLinksProps = { location: string };

const rowClass = "flex items-center gap-4 text-white transition-[padding] duration-300 hover:ps-3";

export function ContactLinks({ location }: ContactLinksProps) {
  return (
    <div data-reveal="0.2" className="relative min-h-[300px]">
      {/* Red half-disc bleeding past the container edge */}
      <div
        aria-hidden
        className="absolute -inset-y-4 -start-6 -end-[50vw] rounded-s-[50%] bg-brand lg:-inset-y-[140px] lg:-start-10"
      />
      <ul className="relative flex flex-col gap-7 py-10 ps-8 text-sm sm:ps-14">
        <li>
          <a href={`mailto:${site.email}`} className={rowClass}>
            <MailGlyph />
            <span dir="ltr">{site.email}</span>
          </a>
        </li>
        <li>
          <a href={site.github} target="_blank" rel="noreferrer" className={rowClass}>
            <GithubGlyph />
            <span dir="ltr">{site.githubLabel}</span>
          </a>
        </li>
        <li>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className={rowClass}>
            <LinkedinGlyph />
            <span dir="ltr">LinkedIn</span>
          </a>
        </li>
        <li className={rowClass}>
          <PinGlyph />
          <span>{location}</span>
        </li>
      </ul>
    </div>
  );
}
