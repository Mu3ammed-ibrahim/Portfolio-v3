import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

type ContactFieldProps = { id: string; label: string; error?: string; children: ReactNode };

// Underline-only inputs: the label serves assistive tech, the placeholder carries the visible cue.
export const fieldInputClass =
  "h-auto rounded-none border-0 border-b border-divider bg-transparent px-0 py-3 text-base placeholder:text-ink/35 focus-visible:border-brand focus-visible:ring-0 aria-invalid:border-brand-soft aria-invalid:ring-0 md:text-[15px]";

export function ContactField({ id, label, error, children }: ContactFieldProps) {
  return (
    <div>
      <Label htmlFor={id} className="sr-only">
        {label}
      </Label>
      {children}
      <p id={`${id}-error`} aria-live="polite" className="mt-1 min-h-3.5 text-[11px] text-brand-soft">
        {error}
      </p>
    </div>
  );
}
