import { z } from "zod";
import { projectTypes } from "@/features/contact/lib/project-types";

// Source of truth for the inquiry shape; values are trimmed in the action before parsing.
export const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  // Server-side allowlist, built from the same tuple the chips render from: the value ends
  // up in an email subject, and anyone can edit a radio's value in devtools.
  projectType: z.enum(projectTypes),
  // Optional since the chips carry the intent — but still capped, so a giant paste cannot
  // reach the mail API. An empty string passes .max(), which keeps the type a plain string.
  message: z.string().max(2000),
});

export type Inquiry = z.infer<typeof inquirySchema>;

export type InquiryField = keyof Inquiry;

// Raw form values before parsing: everything arrives from FormData as a string, including
// projectType, which may be missing or bogus until zod checks it. Inquiry cannot describe
// that, because its projectType is narrowed to the enum.
export type InquiryDraft = Record<InquiryField, string>;
