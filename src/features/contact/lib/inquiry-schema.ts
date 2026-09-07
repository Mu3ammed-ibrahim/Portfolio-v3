import { z } from "zod";

// Source of truth for the inquiry shape; values are trimmed in the action before parsing.
export const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  message: z.string().min(10),
});

export type Inquiry = z.infer<typeof inquirySchema>;

export type InquiryField = keyof Inquiry;
