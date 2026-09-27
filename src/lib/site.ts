export const site = {
  name: "MO Studio",
  owner: "Mohammed Almutassim Gallab",
  email: "www.tota.11@gmail.com",
  github: "https://github.com/Mu3ammed-ibrahim",
  githubLabel: "github.com/Mu3ammed-ibrahim",
  linkedin: "https://www.linkedin.com/in/mohammed-almutassim-gallab-39a11098/",
} as const;

export const sectionIds = ["about", "services", "stack", "work", "contact"] as const;

export type SectionId = (typeof sectionIds)[number];
