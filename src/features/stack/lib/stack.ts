import {
  siExpress,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siRedux,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

export type StackItem = { name: string; icon: SimpleIcon };

// Named imports keep the bundle to these nine paths rather than the whole icon set.
export const stack: StackItem[] = [
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "TypeScript", icon: siTypescript },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Express", icon: siExpress },
  { name: "Prisma", icon: siPrisma },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "Redux Toolkit", icon: siRedux },
  { name: "Tailwind", icon: siTailwindcss },
];
