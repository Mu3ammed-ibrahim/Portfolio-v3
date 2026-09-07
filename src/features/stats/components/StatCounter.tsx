"use client";

import { useRef } from "react";
import { useCounter } from "@/features/stats/hooks/use-counter";

type StatCounterProps = { target: number; suffix: string };

export function StatCounter({ target, suffix }: StatCounterProps) {
  const value = useRef<HTMLSpanElement>(null);
  useCounter(value, target);

  return (
    <p dir="ltr" className="disp font-latin text-[56px] leading-none tabular-nums text-start sm:text-[64px]">
      <span ref={value}>{target}</span>
      <span className="text-brand">{suffix}</span>
    </p>
  );
}
