import { projectTypes, type ProjectType } from "@/features/contact/lib/project-types";

type ProjectTypeFieldProps = {
  legend: string;
  labels: Record<ProjectType, string>;
  error?: string;
  // A raw FormData string replayed after a validation error, so it is not narrowed to ProjectType.
  selected?: string;
};

// Native radios rather than a styled control: the group lands in FormData with no serialization
// layer, and arrow-key navigation plus radiogroup semantics come free. sr-only (clip, not
// display:none) is what keeps each input focusable and announced while the chip beside it is
// what you see.
export function ProjectTypeField({ legend, labels, error, selected }: ProjectTypeFieldProps) {
  return (
    <fieldset aria-describedby="projectType-error">
      <legend className="meta mb-3 text-ink-muted">{legend}</legend>
      <div className="flex flex-wrap gap-1.5">
        {projectTypes.map((slug) => (
          <label key={slug} className="cursor-pointer">
            {/* required is for assistive tech only — the form is noValidate, so the real gate is
                the schema's z.enum on the server. */}
            <input
              type="radio"
              name="projectType"
              value={slug}
              required
              defaultChecked={selected === slug}
              className="peer sr-only"
            />
            {/* The focus ring is drawn here, not on the input: the input is clipped, so the
                global :focus-visible outline would be painted where nobody can see it. These
                peer-focus-visible classes are the only visible focus indicator — do not remove
                them as redundant. peer-checked:hover: re-states the checked colour at a higher
                specificity so hover cannot repaint a selected chip. */}
            <span className="meta block border border-divider px-2.5 py-[7px] text-ink-muted transition-colors duration-250 hover:text-ink peer-checked:border-brand peer-checked:bg-brand peer-checked:text-ground peer-checked:hover:text-ground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
              {labels[slug]}
            </span>
          </label>
        ))}
      </div>
      <p id="projectType-error" aria-live="polite" className="mt-1 min-h-3.5 text-[11px] text-brand-soft">
        {error}
      </p>
    </fieldset>
  );
}
