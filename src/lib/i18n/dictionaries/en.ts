// English is the source of truth for the dictionary shape; ar.ts must satisfy it.
// No functions here: dictionaries cross the Server → Client boundary as props.
export const en = {
  meta: {
    title: "MO Studio — Mohammed Almutassim, full-stack developer",
    description:
      "Design, frontend, backend and database from one developer in Jeddah. Web apps, APIs and dashboards shipped end to end.",
  },
  nav: {
    work: "Work",
    services: "Services",
    about: "About",
    stack: "Stack",
    contact: "Contact",
    openBadge: "Open to projects",
    home: "MO Studio — back to top",
    menu: "Open menu",
    menuTitle: "Navigation",
    switchLang: "Switch to Arabic",
  },
  hero: {
    kicker: "Full-stack Developer · Jeddah",
    lines: ["I design", "& build", "products."],
    copy: ["Design. Frontend. Backend. Database.", "One developer. Zero hand-offs."],
    cta: "View my work",
    disciplines: ["UI / UX", "Web apps", "APIs", "Dashboards"],
    portraitAlt: "Mohammed Almutassim",
  },
  work: {
    rail: "My work",
    more: ["More projects", "on GitHub"],
    projects: [
      { name: "Dr.Photo", kind: "Medical visual brand website" },
      { name: "ظل الشرق", kind: "Restaurant website" },
      { name: "Riwaq", kind: "Café website" },
      { name: "Eshop", kind: "E-commerce website" },
      { name: "نبض الابتكار", kind: "Innovation experience website" },
      { name: "Trackify", kind: "Finance tracker app" },
    ],
  },
  services: {
    rail: "What I do",
    items: [
      {
        title: "UI / UX design",
        body: "Screens and flows designed before code — wireframes, layout and a visual system.",
      },
      {
        title: "Web applications",
        body: "React / Next.js apps with routing, state, auth and analytics wired end to end.",
      },
      {
        title: "APIs & backends",
        body: "Typed REST APIs on Node and Express with Prisma and JWT authentication.",
      },
      {
        title: "Dashboards & admin",
        body: "Data-dense CRUD tools, charts and role-based access your team runs on.",
      },
      {
        title: "Database design",
        body: "PostgreSQL schemas and migrations planned for the product you will have in two years.",
      },
    ],
  },
  stats: {
    labels: [
      ["Years building", "for the web"],
      ["Products &", "features shipped"],
      ["Frontend + backend", "ownership"],
      ["Response time", "on inquiries"],
    ],
  },
  about: {
    rail: "My approach",
    heading: ["Good code", "is clear thinking", "made"],
    highlight: "visible.",
    p1: "I'm Mohammed Almutassim Gallab. Through MO Studio I take your idea all the way to a live product — the screens your customers use, the logic behind them, and the database that keeps everything safe.",
    p2: "One person on both sides means nothing gets lost between designer and developer: fewer meetings, faster launches, and a product that keeps growing after handover.",
    photoAlt: "Mohammed Almutassim at work",
  },
  stack: {
    rail: "Stack",
  },
  contact: {
    rail: "Let's connect",
    heading: ["Have a project", "in mind?"],
    highlight: "Let's talk.",
    intro:
      "I'm currently open to new projects and collaborations. Tell me what you're building and I'll reply within 24 hours.",
    fields: { name: "Your name", email: "Email address", message: "About the project" },
    submit: "Send inquiry",
    sending: "Sending…",
    sent: ["Message", "received."],
    sendAnother: "Send another",
    thanks: "Thanks {name} — I reply within 24 hours.",
    thanksFallback: "there",
    errors: {
      name: "Please enter your name.",
      email: "Enter a valid email address.",
      message: "A few words about the project (10+ characters).",
      generic: "The message could not be sent. Please try again.",
    },
    location: "Jeddah, Saudi Arabia · GMT+3",
  },
  footer: {
    copyright: "© 2026 MO Studio",
    mid: "Full-stack portfolio",
    backTop: "Back to top",
  },
  arrows: { forward: "→", diag: "↗", up: "↑" },
};

export type Dictionary = typeof en;
