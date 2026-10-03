/**
 * A script that runs while the server HTML is parsed, before first paint. On the client it renders
 * as inert text/plain: React warns about rendering real scripts, and client renders (soft
 * navigations) never execute them anyway. From Next's "preventing flash before hydration" guide.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
