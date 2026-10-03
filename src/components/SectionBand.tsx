import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionBandProps = {
  id?: string;
  /** Which corner carries the brand wedge; omit for none. */
  wedge?: "start" | "end";
  children: ReactNode;
};

/**
 * A raised band with diagonal top and bottom edges. The tinted layer overhangs the section by
 * --cut on both ends and is clipped there, so the slope bleeds into the neighbours while the
 * content box itself is never clipped.
 */
export function SectionBand({ id, wedge, children }: SectionBandProps) {
  return (
    <section id={id} className="relative z-[1]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-(--cut) -bottom-(--cut) -z-10 cut-both overflow-hidden bg-lift"
      >
        {wedge ? (
          <span
            className={cn(
              "absolute bottom-0 size-[clamp(120px,16vw,260px)] bg-brand",
              wedge === "start" ? "start-0 wedge-start" : "end-0 wedge-end",
            )}
          />
        ) : null}
      </div>
      {children}
    </section>
  );
}
