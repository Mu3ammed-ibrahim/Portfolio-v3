export const site = {
  name: "MO Studio",
  owner: "Mohammed Almutassim Gallab",
  email: "www.tota.11@gmail.com",
  github: "https://github.com/Mu3ammed-ibrahim",
  githubLabel: "github.com/Mu3ammed-ibrahim",
  linkedin: "https://www.linkedin.com/in/mohammed-almutassim-gallab-39a11098/",
  instagram: "https://www.instagram.com/mohammed_studio",
  // wa.me takes digits only: country code first, no "+" or spaces.
  whatsapp: "https://wa.me/966558636746",
  whatsappLabel: "+966 55 863 6746",
} as const;

export const sectionIds = ["about", "services", "stack", "work", "faq", "contact"] as const;

export type SectionId = (typeof sectionIds)[number];
