"use client";

import { useActionState, useState } from "react";
import { CtaButton } from "@/components/Cta";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendInquiry } from "@/features/contact/actions/send-inquiry";
import { ContactField, fieldInputClass } from "@/features/contact/components/ContactField";
import type { InquiryField } from "@/features/contact/lib/inquiry-schema";
import { initialInquiryState } from "@/features/contact/types";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type ContactCopy = Dictionary["contact"];
type ContactFormProps = { t: ContactCopy; arrow: string };

export function ContactForm({ t, arrow }: ContactFormProps) {
  // Remounting the form is the simplest way to start a fresh action state after "Send another".
  const [round, setRound] = useState(0);
  return <InquiryForm key={round} t={t} arrow={arrow} onReset={() => setRound((r) => r + 1)} />;
}

type InquiryFormProps = ContactFormProps & { onReset: () => void };

function InquiryForm({ t, arrow, onReset }: InquiryFormProps) {
  const [state, action, pending] = useActionState(sendInquiry, initialInquiryState);

  if (state.status === "sent") {
    return (
      <div className="animate-rise">
        <p className="disp mb-3 text-4xl">
          {t.sent[0]} <span className="text-brand">{t.sent[1]}</span>
        </p>
        <p className="mb-5 text-sm leading-[1.7] text-ink-muted">
          {t.thanks.replace("{name}", state.name || t.thanksFallback)}
        </p>
        <CtaButton
          type="button"
          onClick={onReset}
          label={t.sendAnother}
          arrow={arrow}
          lineClassName="w-[60px]"
        />
      </div>
    );
  }

  const hasError = state.status === "error";
  const values = hasError ? state.values : undefined;
  const errorFor = (field: InquiryField) =>
    hasError && state.invalid.includes(field) ? t.errors[field] : undefined;

  return (
    // Keyed by attempt so fields remount with the returned values instead of mutating their defaults.
    <form key={state.attempt} action={action} noValidate>
      <p className="mb-7 text-[15px] leading-[1.75] text-ink">{t.intro}</p>
      <div className="mb-7 flex flex-col gap-3.5">
        <ContactField id="name" label={t.fields.name} error={errorFor("name")}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder={t.fields.name}
            defaultValue={values?.name}
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby="name-error"
            className={fieldInputClass}
          />
        </ContactField>
        <ContactField id="email" label={t.fields.email} error={errorFor("email")}>
          <Input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder={t.fields.email}
            defaultValue={values?.email}
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby="email-error"
            className={cn(fieldInputClass, "rtl:text-end rtl:placeholder:text-end")}
          />
        </ContactField>
        <ContactField id="message" label={t.fields.message} error={errorFor("message")}>
          <Textarea
            id="message"
            name="message"
            rows={2}
            placeholder={t.fields.message}
            defaultValue={values?.message}
            aria-invalid={Boolean(errorFor("message"))}
            aria-describedby="message-error"
            className={cn(fieldInputClass, "min-h-0 resize-y")}
          />
        </ContactField>
      </div>
      {/* Honeypot: clipped off-screen and out of the a11y tree, so only bots fill it.
          The name must stay non-semantic — Chrome autofills names it recognises (e.g.
          "company") even when hidden, which would drop a real visitor's message. */}
      <input
        type="text"
        name="hp_check"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        data-1p-ignore
        data-lpignore="true"
        className="sr-only"
      />
      {hasError && state.reason === "delivery" ? (
        <p role="alert" className="mb-4 text-[12px] text-brand-soft">
          {t.errors.generic}
        </p>
      ) : null}
      <CtaButton
        type="submit"
        disabled={pending}
        label={pending ? t.sending : t.submit}
        arrow={arrow}
        className={cn(hasError && "animate-shake")}
      />
    </form>
  );
}
