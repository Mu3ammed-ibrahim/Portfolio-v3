import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CtaBodyProps = { label: ReactNode; arrow: string; lineClassName?: string };

const ctaClass = "group/cta meta inline-flex items-center gap-4 text-[11px] text-ink";

function CtaBody({ label, arrow, lineClassName }: CtaBodyProps) {
  return (
    <>
      <span>{label}</span>
      <span
        aria-hidden
        className={cn(
          "h-px w-[120px] bg-ink transition-[width] duration-400 ease-out-expo group-hover/cta:w-[160px]",
          lineClassName,
        )}
      />
      <span
        aria-hidden
        className="grid h-7 w-11 place-items-center border border-brand bg-brand text-lg text-white transition-all duration-300 group-hover/cta:bg-transparent group-hover/cta:text-brand"
      >
        {arrow}
      </span>
    </>
  );
}

type CtaLinkProps = CtaBodyProps & { href: string; className?: string };

/** In-page anchor CTA; the CSS scroll-behavior on <html> glides hash links. */
export function CtaLink({ href, className, ...body }: CtaLinkProps) {
  return (
    <a href={href} className={cn(ctaClass, className)}>
      <CtaBody {...body} />
    </a>
  );
}

type CtaButtonProps = CtaBodyProps & Omit<ComponentProps<"button">, "children">;

export function CtaButton({ className, label, arrow, lineClassName, ...props }: CtaButtonProps) {
  return (
    <button
      className={cn(ctaClass, "cursor-pointer disabled:cursor-wait disabled:opacity-70", className)}
      {...props}
    >
      <CtaBody label={label} arrow={arrow} lineClassName={lineClassName} />
    </button>
  );
}
