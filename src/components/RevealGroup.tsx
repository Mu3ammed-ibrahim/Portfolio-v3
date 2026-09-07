"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

type RevealGroupProps = { children: ReactNode; className?: string };

/** Client boundary that animates `[data-reveal]` children rendered on the server. */
export function RevealGroup({ children, className }: RevealGroupProps) {
  const scope = useReveal<HTMLDivElement>();
  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
