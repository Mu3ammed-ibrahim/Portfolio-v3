import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { SectionId } from "@/lib/site";

export type NavItem = { id: SectionId; label: string };

export function getNavItems(t: Dictionary): NavItem[] {
  return [
    { id: "work", label: t.nav.work },
    { id: "services", label: t.nav.services },
    { id: "about", label: t.nav.about },
    { id: "stack", label: t.nav.stack },
    { id: "contact", label: t.nav.contact },
  ];
}
