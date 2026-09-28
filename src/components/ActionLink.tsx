import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  size?: "md" | "sm";
  external?: boolean;
  /** Runs the hero's red light around the border (see `beam-edge` in globals.css). */
  beam?: boolean;
};

// Labels on the brand fill use the ground colour: white on #ec3013 is 4.2:1, ground is 4.6:1.
const variants = {
  solid: "border-brand bg-brand text-ground hover:bg-transparent hover:text-brand",
  outline: "border-ink/35 text-ink hover:border-brand hover:text-brand",
};

// `sm` fits inside the 64px header bar.
const sizes = { md: "h-12 px-6", sm: "h-10 px-5" };

export function ActionLink({
  href,
  children,
  variant = "solid",
  size = "md",
  external,
  beam,
}: ActionLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "group/action meta inline-flex items-center gap-3 border text-[11px] font-bold whitespace-nowrap transition-[background-color,color,border-color,scale] duration-300 active:scale-[0.98]",
        variants[variant],
        sizes[size],
        beam && "beam-edge",
      )}
    >
      {children}
      <ArrowUpRightIcon
        aria-hidden
        weight="bold"
        className="size-4 transition-transform duration-300 group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/action:-translate-x-0.5"
      />
    </a>
  );
}
