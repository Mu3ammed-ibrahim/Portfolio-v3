// English is the source of truth for the dictionary shape; ar.ts must satisfy it.
// No functions here: dictionaries cross the Server → Client boundary as props.
export const en = {
  meta: {
    title: "MO Studio | Mohammed Almutassim, full-stack developer",
    description:
      "Design, frontend, backend and database from one developer in Jeddah. Web apps, APIs and dashboards shipped end to end.",
  },
  nav: {
    work: "Work",
    services: "Services",
    about: "About",
    stack: "Stack",
    contact: "Contact",
    cta: "Let's talk",
    home: "MO Studio, back to top",
    menu: "Open menu",
    menuTitle: "Navigation",
    switchLang: "Switch to Arabic",
  },
  hero: {
    kicker: "Full-stack developer",
    // Second line is set in the brand colour and closed with a full stop.
    lines: ["I design & build", "products"],
    copy: "Design, frontend, backend and database from one developer. Zero hand-offs.",
    cta: "View my work",
    socials: "Find me on",
    badge: "Open to new projects / MO Studio / ",
    portraitAlt: "Mohammed Almutassim",
  },
  work: {
    rail: "Featured projects",
    heading: "My work",
    viewAll: "View all on GitHub",
    prev: "Previous projects",
    next: "Next projects",
    repo: "Source",
    // Keyed by slug, not ordered: project names live in projects.ts because they do not translate.
    projects: {
      drphoto: "Medical visual brand website",
      "dhil-alsharq": "Restaurant website",
      riwaq: "Café website",
      "nabd-alibtikar": "Innovation experience website",
      trackify: "Finance tracker app",
      kobonvip: "Coupon platform website",
    },
  },
  services: {
    heading: "What I do",
    items: [
      {
        title: "UI / UX design",
        body: "I design screens and user flows before writing code, so your product feels clear from the first release",
      },
      {
        title: "Web applications",
        body: "I build fast, well-structured apps with React and Next.js, including authentication, state management, and analytics",
      },
      {
        title: "Backend services",
        body: "I develop secure REST APIs with Node, Express, Prisma, and PostgreSQL, built for the product you'll have in two years, not just today",
      },
      {
        title: "Dashboards & admin",
        body: "I turn your data into clear admin dashboards with charts, and give each user only the access they need",
      },
      {
        title: "Business systems",
        body: "I create custom CMS and CRM systems around how you work, so you manage content and customers from one place",
      },
    ],
  },
  stats: {
    heading: "By the numbers",
    labels: [
      ["Years building", "for the web"],
      ["Products &", "features shipped"],
      ["Frontend + backend", "ownership"],
      ["Response time", "on inquiries"],
    ],
  },
  about: {
    // The highlight closes the heading in the brand colour.
    heading: "What you see on screen starts with what you",
    highlight: "don't",
    p1: "I'm Mohammed Almutassim Gallab. Through MO Studio, I take your idea to a product that actually works: the screens your customers use, the logic behind them, and the database that keeps everything safe.",
    p2: "When one person is both designer and developer, nothing gets lost between the two: fewer meetings, faster launches, and a product that keeps growing with you after handoff",
    points: ["Design before code", "One owner, no hand-offs", "Secure by default", "Built to grow with you"],
  },
  stack: {
    heading: "Stack",
  },
  contact: {
    rail: "Let's connect",
    heading: ["Have a project", "in mind?"],
    intro:
      "I'm currently open to new projects and collaborations. Tell me what you're building and I'll reply within 24 hours.",
    fields: { name: "Your name", email: "Email address", message: "About the project" },
    submit: "Send inquiry",
    sending: "Sending…",
    sent: ["Message", "received."],
    sendAnother: "Send another",
    thanks: "Thanks {name}. I reply within 24 hours.",
    thanksFallback: "there",
    errors: {
      name: "Please enter your name.",
      email: "Enter a valid email address.",
      message: "A few words about the project (10+ characters).",
      generic: "The message could not be sent. Please try again.",
    },
    location: "Jeddah, Saudi Arabia",
    info: {
      email: "Email",
      whatsapp: "WhatsApp",
      location: "Location",
      response: "Response time",
      responseValue: "Within 24 hours",
    },
  },
  footer: {
    copyright: "© 2026 MO Studio",
    blurb: "Design, frontend, backend and database from one developer in Jeddah.",
    navTitle: "Navigation",
    connectTitle: "Connect",
    langTitle: "Language",
    backTop: "Back to top",
  },
  arrows: { forward: "→" },
};

export type Dictionary = typeof en;
