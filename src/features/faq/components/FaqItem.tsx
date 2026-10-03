"use client";

import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { ScrollTrigger } from "@/lib/gsap";

type FaqItemProps = { index: number; question: string; answer: string };

// Opening an answer pushes Contact down, and ScrollTrigger doesn't notice on its own: without the
// refresh, Contact's reveals fire hundreds of pixels early. No height animation, so one refresh
// after the toggle measures the final layout.
const remeasure = () => ScrollTrigger.refresh();

// Native <details>: keyboard, screen readers and find-in-page work without extra code.
export function FaqItem({ index, question, answer }: FaqItemProps) {
  return (
    <details data-reveal={index * 0.06} onToggle={remeasure} className="group/faq border-b border-divider">
      <summary className="flex cursor-pointer list-none items-center gap-5 py-6 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden
          className="disp font-latin w-9 shrink-0 text-[30px] text-transparent [-webkit-text-stroke:1px_var(--divider)]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="disp text-[22px] leading-[1.05] transition-colors duration-300 group-hover/faq:text-brand rtl:text-lg rtl:leading-snug">
          {question}
        </h3>
        <PlusIcon
          aria-hidden
          className="ms-auto size-6 shrink-0 text-brand transition-transform duration-500 ease-out-expo group-open/faq:rotate-45"
        />
      </summary>
      <p className="max-w-[60ch] ps-14 pe-10 pb-7 text-[14.5px] leading-[1.75] text-ink-muted">{answer}</p>
    </details>
  );
}
