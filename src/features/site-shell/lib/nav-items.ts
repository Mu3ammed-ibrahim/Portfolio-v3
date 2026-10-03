import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { SectionId } from "@/lib/site";

export type NavItem = { id: SectionId; label: string };

export function getNavItems(t: Dictionary): NavItem[] {
  return [
    { id: "about", label: t.nav.about },
    { id: "services", label: t.nav.services },
    { id: "stack", label: t.nav.stack },
    { id: "work", label: t.nav.work },
    { id: "contact", label: t.nav.contact },
  ];
}
