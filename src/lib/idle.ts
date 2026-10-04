/**
 * Runs `callback` once the browser is idle and returns a canceller for a slot that hasn't fired yet.
 * Used to keep ScrollTrigger setup out of hydration's layout effects, where it would block first
 * paint. Safari has no requestIdleCallback; a zero timeout still yields between callers.
 */
export function onIdle(callback: () => void) {
  if ("requestIdleCallback" in window) {
    const id = requestIdleCallback(callback, { timeout: 1000 });
    return () => cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 0);
  return () => clearTimeout(id);
}
