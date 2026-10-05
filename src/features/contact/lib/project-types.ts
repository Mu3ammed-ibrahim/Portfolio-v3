// Slugs are the submitted values and must never be localised — the dictionary holds the
// visible labels, keyed by these slugs. The order here drives the chip order in both locales.
//
// Why a tuple here instead of an array in the dictionary: `en` is not `as const`, so every
// dictionary array widens to `string[]` and TypeScript never checks its length — `ar.ts`
// could ship three labels against six English ones and still compile. A keyed record is
// checked per key, so order lives here and the translated labels live there. Same split as
// projects.ts vs work.projects.
export const projectTypes = [
  "website",
  "web-app",
  "ui-ux",
  "dashboard",
  "business-system",
  "other",
] as const;

export type ProjectType = (typeof projectTypes)[number];

// For the notification email only. Deliberately separate from the dictionary: the Server
// Action has no locale, and these strings are email metadata rather than UI copy.
export const projectTypeEmailLabels: Record<ProjectType, string> = {
  website: "Website",
  "web-app": "Web app",
  "ui-ux": "UI / UX design",
  dashboard: "Dashboard",
  "business-system": "CMS / CRM",
  other: "Something else",
};
