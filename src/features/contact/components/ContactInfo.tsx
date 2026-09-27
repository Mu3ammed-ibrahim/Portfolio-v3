import { ClockIcon, EnvelopeSimpleIcon, MapPinIcon } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { site } from "@/lib/site";

type ContactInfoProps = { t: Dictionary["contact"] };

export function ContactInfo({ t }: ContactInfoProps) {
  const rows = [
    {
      Icon: EnvelopeSimpleIcon,
      label: t.info.email,
      value: (
        <a href={`mailto:${site.email}`} dir="ltr" className="transition-colors hover:text-brand">
          {site.email}
        </a>
      ),
    },
    { Icon: MapPinIcon, label: t.info.location, value: t.location },
    { Icon: ClockIcon, label: t.info.response, value: t.info.responseValue },
  ];

  return (
    <ul data-reveal="0.2" className="flex flex-col gap-7">
      {rows.map(({ Icon, label, value }) => (
        <li key={label} className="flex items-start gap-4">
          <Icon aria-hidden className="mt-0.5 size-6 flex-none text-brand" />
          <div>
            <p className="meta mb-1.5 text-[10px] text-ink-muted">{label}</p>
            <p className="text-[14px] text-ink">{value}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
