/** `#quote` or empty href opens the quote modal instead of navigating. */
export function isQuoteModalHref(href: string | undefined | null): boolean {
  if (!href) return true;
  const t = href.trim().toLowerCase();
  return t === "#quote" || t === "#" || t === "quote";
}
