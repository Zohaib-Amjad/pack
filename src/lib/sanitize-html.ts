type SanitizeConfig = {
  ADD_ATTR?: string[];
  [key: string]: unknown;
};

/**
 * SSR-safe HTML sanitize.
 * Avoids top-level isomorphic-dompurify/jsdom import — Next webpack bundling
 * breaks jsdom's path to browser/default-stylesheet.css on Windows.
 */
function stripUnsafeForSsr(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

export function sanitizeHtml(html: string, config?: SanitizeConfig): string {
  if (typeof window === "undefined") {
    return stripUnsafeForSsr(html);
  }

  // Lazy require: browser path uses real DOM, no jsdom needed.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const DOMPurify = require("isomorphic-dompurify") as {
    sanitize: (dirty: string, cfg?: SanitizeConfig) => string;
  };
  return DOMPurify.sanitize(html, config);
}
