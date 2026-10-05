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
    faq: "FAQ",
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
  faq: {
    rail: "FAQ",
    heading: "Before we start",
    items: [
      {
        q: "How do we get started?",
        a: "Tell me about your project by WhatsApp or email in the contact section below. I reply within 24 hours, and we set up a short call to talk through your goals, your users, and the scope.",
      },
      {
        q: "How much does a project cost?",
        a: "It depends on the scope: how many screens, features, and integrations you need. After our call you get a written proposal with a fixed price before any work starts, so there are no surprises.",
      },
      {
        q: "How long does it take?",
        a: "That depends on the scope too. A landing website moves much faster than a custom dashboard or CRM. The proposal includes a timeline with clear milestones, and you see progress the whole way.",
      },
      {
        q: "Why one developer instead of an agency?",
        a: "Design, frontend, backend, and database all come from the same person, so nothing gets lost between hand-offs. That means fewer meetings and faster launches.",
      },
      {
        q: "Can you build in Arabic and English?",
        a: "Yes. I build bilingual websites with a proper right-to-left layout and Arabic typography, just like this one.",
      },
      {
        q: "Do you work with clients outside Jeddah?",
        a: "Yes. I'm based in Jeddah and work remotely with clients wherever they are.",
      },
      {
        q: "Will it work well on phones?",
        a: "Every project is built mobile-first, optimised for speed, and secure by default, with each user getting only the access they need.",
      },
      {
        q: "What happens after launch?",
        a: "I build products to grow with you, and I'm available for new features, updates, and fixes after handoff. Code ownership and the handover are spelled out in the proposal.",
      },
      {
        q: "Can you improve my existing website or system?",
        a: "Yes. I can redesign it, add new features, or rebuild the parts that are holding you back.",
      },
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
    // No longer says "tell me what you're building": the message field is optional now.
    intro: "I'm currently open to new projects and collaborations. I reply within 24 hours.",
    fields: {
      name: "Your name",
      email: "Email address",
      projectType: "What do you need?",
      message: "Anything else? (optional)",
    },
    // Keyed by slug, not ordered: the chip order lives in contact/lib/project-types.ts, because
    // a positional array here would widen to string[] and never be length-checked against ar.ts.
    projectTypes: {
      website: "Website",
      "web-app": "Web app",
      "ui-ux": "UI / UX design",
      dashboard: "Dashboard",
      "business-system": "CMS / CRM",
      other: "Something else",
    },
    submit: "Send inquiry",
    sending: "Sending…",
    sent: ["Message", "received."],
    sendAnother: "Send another",
    thanks: "Thanks {name}. I reply within 24 hours.",
    thanksFallback: "there",
    errors: {
      name: "Please enter your name.",
      email: "Enter a valid email address.",
      projectType: "Please choose what you need.",
      // A guard, not a UX path: the only way to see this is pasting over 2000 characters.
      // t.errors is indexed by keyof Inquiry, so every schema field needs a key here.
      message: "Please keep this under 2000 characters.",
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
