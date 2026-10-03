import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

/** Slugs are the contract with the dictionary: an entry with no `kind` fails typecheck. */
export type ProjectSlug = keyof Dictionary["work"]["projects"];

/**
 * Brand names are proper nouns, so they live here rather than in the dictionaries — a project is
 * called what it is called on both locales. The union requires at least one script; writing the
 * absent side as `?: undefined` rather than `?: string` makes it a discriminant TypeScript can
 * narrow on, which is what lets `nameLines` promise a non-empty result without a cast.
 */
export type ProjectName =
  | { latin: string; arabic?: string }
  | { latin?: undefined; arabic: string };

export type Project = {
  slug: ProjectSlug;
  image: string;
  tags: string[];
  name: ProjectName;
  /** Both optional: a project with neither renders as presentation rather than a dead link. */
  liveHref?: string;
  repoHref?: string;
};

/** One line of the name lockup, tagged with the script it is written in. */
export type NameLine = { text: string; lang: Locale };

/**
 * The reader's own script leads and the other sits beneath it; a project named in only one script
 * gets one line. Checking `latin === undefined` narrows the union to the Arabic-only member, so the
 * "at least one name" guarantee survives into the return type without a cast.
 */
export function nameLines(name: ProjectName, locale: Locale): [NameLine, ...NameLine[]] {
  if (name.latin === undefined) return [{ text: name.arabic, lang: "ar" }];
  const latin: NameLine = { text: name.latin, lang: "en" };

  if (name.arabic === undefined) return [latin];
  const arabic: NameLine = { text: name.arabic, lang: "ar" };

  return locale === "ar" ? [arabic, latin] : [latin, arabic];
}

export const projects: Project[] = [
  {
    slug: "drphoto",
    image: "/work/drphoto.png",
    tags: ["Next.js", "Tailwind", "Bilingual"],
    name: { latin: "Dr.Photo" },
    liveHref: "https://www.dr-photograph.com/",
  },
  {
    slug: "dhil-alsharq",
    image: "/work/dhil-alsharq.png",
    tags: ["React", "Motion", "RTL"],
    name: { arabic: "ظل الشرق" },
    liveHref: "https://shalal-sharq-dine.base44.app/",
  },
  {
    slug: "riwaq",
    image: "/work/riwaq.png",
    tags: ["Next.js", "Tailwind", "Motion"],
    name: { latin: "Riwaq" },
    liveHref: "https://cafe-landing-page-psi-roan.vercel.app/",
  },
  {
    slug: "nabd-alibtikar",
    image: "/work/nabd-alibtikar.png",
    tags: ["Next.js", "Tailwind", "Bilingual"],
    name: { arabic: "نبض الابتكار" },
    liveHref: "https://www.nbdco.sa/ar",
  },
  {
    slug: "trackify",
    image: "/work/trackify.png",
    tags: ["React", "Recharts", "Node"],
    name: { latin: "Trackify" },
    repoHref: "https://github.com/Mu3ammed-ibrahim/Trackify",
  },
  {
    slug: "kobonvip",
    image: "/work/kobonvip.png",
    tags: ["Next.js", "Tailwind", "RTL"],
    name: { latin: "Kobon VIP", arabic: "كوبون VIP" },
    liveHref: "https://www.kobonvip.com/",
  },
];
