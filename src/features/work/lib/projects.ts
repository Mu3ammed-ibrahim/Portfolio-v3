import { site } from "@/lib/site";

export type Project = { slug: string; image: string; tags: string[]; href: string };

// Names and descriptions come from the dictionary by index; this holds what does not translate.
export const projects: Project[] = [
  { slug: "drphoto", image: "/work/drphoto.png", tags: ["Next.js", "Tailwind", "Bilingual"], href: site.github },
  { slug: "dhil-alsharq", image: "/work/dhil-alsharq.png", tags: ["React", "Motion", "RTL"], href: site.github },
  { slug: "riwaq", image: "/work/riwaq.png", tags: ["Next.js", "Tailwind", "Motion"], href: site.github },
  { slug: "eshop", image: "/work/eshop.png", tags: ["React", "Redux Toolkit", "Node"], href: site.github },
  { slug: "nabd-alibtikar", image: "/work/nabd-alibtikar.png", tags: ["Next.js", "Tailwind", "Bilingual"], href: site.github },
  { slug: "trackify", image: "/work/trackify.png", tags: ["React", "Recharts", "Node"], href: site.github },
  { slug: "kobonvip", image: "/work/kobonvip.png", tags: ["Next.js", "Tailwind", "RTL"], href: site.github },
];
