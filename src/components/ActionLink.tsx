import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  /** Drops the trailing arrow, e.g. for the compact nav button. */
  bare?: boolean;
};

// Labels on the brand fill use the ground colour: white on #ec3013 is 4.2:1, ground is 4.6:1.
const variants = {
  solid: "border-brand bg-brand text-ground hover:bg-transparent hover:text-brand",
  outline: "border-ink/35 text-ink hover:border-brand hover:text-brand",
};

export function ActionLink({ href, children, variant = "solid", external, bare }: ActionLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "group/action meta inline-flex h-12 items-center gap-3 border px-6 text-[11px] font-bold whitespace-nowrap transition-[background-color,color,border-color,scale] duration-300 active:scale-[0.98]",
        variants[variant],
      )}
    >
      {children}
      {bare ? null : (
        <ArrowUpRightIcon
          aria-hidden
          weight="bold"
          className="size-4 transition-transform duration-300 group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/action:-translate-x-0.5"
        />
      )}
    </a>
  );
}
