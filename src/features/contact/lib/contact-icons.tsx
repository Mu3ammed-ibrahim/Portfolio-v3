import type { ReactNode } from "react";

type ContactIconProps = { children: ReactNode };

function ContactIcon({ children }: ContactIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden
      className="flex-none"
    >
      {children}
    </svg>
  );
}

export function MailGlyph() {
  return (
    <ContactIcon>
      <rect x="3" y="5" width="18" height="14" />
      <path d="M3 7l9 6 9-6" />
    </ContactIcon>
  );
}

export function GithubGlyph() {
  return (
    <ContactIcon>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.4 6.4-1.6 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1S18.7.6 16 2.5a13.4 13.4 0 0 0-7 0C6.3.6 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.8c0 5.4 3.3 6.6 6.4 7A3.4 3.4 0 0 0 9 18.1V22" />
    </ContactIcon>
  );
}

export function LinkedinGlyph() {
  return (
    <ContactIcon>
      <rect x="3" y="3" width="18" height="18" />
      <path d="M8 10v7M8 7v.5M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </ContactIcon>
  );
}

export function PinGlyph() {
  return (
    <ContactIcon>
      <path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </ContactIcon>
  );
}
