import type { Inquiry, InquiryField } from "@/features/contact/lib/inquiry-schema";

export type InquiryState =
  | { status: "idle"; attempt: number }
  | {
      status: "error";
      reason: "validation" | "delivery";
      invalid: InquiryField[];
      values: Inquiry;
      attempt: number;
    }
  | { status: "sent"; name: string; attempt: number };

export const initialInquiryState: InquiryState = { status: "idle", attempt: 0 };
