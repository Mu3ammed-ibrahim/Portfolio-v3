export const INTRO_ID = "intro";
export const INTRO_DONE_EVENT = "intro:done";

/**
 * Runs `callback` once the intro overlay starts leaving, or right away when there's nothing to wait
 * for. It reads the overlay's DOM state rather than React state, so mount order can't race it.
 * It only waits while the overlay is exactly "play": the hero hides itself behind a playing
 * overlay, so a gate that waited on anything less certain could leave it invisible for good.
 * Returns a cleanup that drops the listener.
 */
export function whenIntroDone(callback: () => void) {
  if (document.getElementById(INTRO_ID)?.dataset.intro !== "play") {
    callback();
    return () => {};
  }
  window.addEventListener(INTRO_DONE_EVENT, callback, { once: true });
  return () => window.removeEventListener(INTRO_DONE_EVENT, callback);
}
