"use server";

import { inquirySchema, type Inquiry, type InquiryField } from "@/features/contact/lib/inquiry-schema";
import type { InquiryState } from "@/features/contact/types";
import { site } from "@/lib/site";

// Must match the hidden input in ContactForm. Kept out of inquirySchema so Inquiry
// stays the three real fields; this is a transport concern, not part of the message.
// The name is deliberately non-semantic: Chrome classifies names like "company" as
// COMPANY_NAME and autofills them even when hidden and marked autocomplete="off",
// which would silently drop a real visitor's message. Do not rename to a real field.
const HONEYPOT = "hp_check";

const field = (formData: FormData, key: InquiryField | typeof HONEYPOT) =>
  String(formData.get(key) ?? "").trim();

export async function sendInquiry(previous: InquiryState, formData: FormData): Promise<InquiryState> {
  const attempt = previous.attempt + 1;
  const values: Inquiry = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    message: field(formData, "message"),
  };

  // A filled honeypot means a bot. Report success so it gets no signal, and send nothing.
  if (field(formData, HONEYPOT)) {
    return { status: "sent", name: values.name, attempt };
  }

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

async function deliverInquiry(inquiry: Inquiry) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // The shared resend.dev sender needs no verified domain, but it may only
      // deliver to the Resend account's own address — hence site.email as the only
      // recipient. reply_to puts the visitor behind the mail client's Reply button.
      from: `${site.name} <onboarding@resend.dev>`,
      to: site.email,
      reply_to: inquiry.email,
      subject: `Portfolio inquiry from ${inquiry.name}`,
      text: `${inquiry.name} <${inquiry.email}>\n\n${inquiry.message}`,
    }),
  });

  // Surfaces as the form's delivery error instead of a silent false success.
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
