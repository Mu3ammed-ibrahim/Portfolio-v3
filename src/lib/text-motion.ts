import { EASE_OUT, REVEAL_START, SplitText, gsap } from "@/lib/gsap";

// Splitting Arabic into characters wraps each letter in its own span, which breaks the joining
// between letters. Arabic headings therefore rise word by word; Latin ones letter by letter.
const isArabic = (element: HTMLElement) => element.closest("[lang]")?.getAttribute("lang") === "ar";

/**
 * Heading rise from a per-line clip mask. `autoSplit` re-splits once the swap fonts land (line breaks
 * move), and returning the tween from `onSplit` lets SplitText carry its progress across re-splits.
 * The masks get their glyph headroom from the `.split-line-mask` rule in globals.css.
 */
export function splitReveal(element: HTMLElement) {
  const arabic = isArabic(element);

  SplitText.create(element, {
    type: arabic ? "words,lines" : "chars,words,lines",
    mask: "lines",
    linesClass: "split-line",
    autoSplit: true,
    onSplit: (split) =>
      gsap.from(arabic ? split.words : split.chars, {
        yPercent: 110,
        duration: 0.9,
        ease: EASE_OUT,
        stagger: arabic ? 0.06 : 0.02,
        scrollTrigger: { trigger: element, start: REVEAL_START, once: true },
      }),
  });
}

/** Words brighten from muted to full as the heading scrolls through the middle of the viewport. */
export function scrubWords(element: HTMLElement) {
  SplitText.create(element, {
    type: "words",
    autoSplit: true,
    onSplit: (split) =>
      gsap.fromTo(
        split.words,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: element, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      ),
  });
}
