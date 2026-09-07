"use server";

import { inquirySchema, type Inquiry, type InquiryField } from "@/features/contact/lib/inquiry-schema";
import type { InquiryState } from "@/features/contact/types";

const field = (formData: FormData, key: InquiryField) => String(formData.get(key) ?? "").trim();

export async function sendInquiry(previous: InquiryState, formData: FormData): Promise<InquiryState> {
  const attempt = previous.attempt + 1;
  const values: Inquiry = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    message: field(formData, "message"),
  };

  const parsed = inquirySchema.safeParse(values);
  if (!parsed.success) {
    const invalid = [...new Set(parsed.error.issues.map((issue) => issue.path[0] as InquiryField))];
    return { status: "error", reason: "validation", invalid, values, attempt };
  }

  try {
    await deliverInquiry(parsed.data);
  } catch (error) {
    console.error("[inquiry] delivery failed", error);
    return { status: "error", reason: "delivery", invalid: [], values, attempt };
  }

  return { status: "sent", name: parsed.data.name, attempt };
}

// Delivery seam: replace the body with an email or database call without touching the form.
async function deliverInquiry(inquiry: Inquiry) {
  console.info("[inquiry] received", inquiry);
}
