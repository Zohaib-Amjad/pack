/**
 * Lightweight helpers for pushing events into the GTM dataLayer.
 *
 * Safe to call at any time, including before the GTM container script has
 * finished loading: `window.dataLayer` is created on demand if it doesn't
 * exist yet, and GTM drains any events already queued in the array as soon
 * as it initializes (this is how the standard GTM snippet itself works).
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

export function pushDataLayerEvent(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/**
 * Fires the sitewide lead-conversion signal.
 *
 * GTM's "Trigger - Generate Lead" handles the site's existing analytics tags.
 * The direct Google Ads event reports the separate "Submit lead form (1)"
 * action supplied by Google Ads. Call this once, only after the submission
 * has actually succeeded server-side, so failed form attempts are not counted.
 *
 * `context` carries per-category attribution (category_slug, UTM/gclid,
 * landing_page_url, etc. — see buildInquiryAttribution in lib/attribution)
 * so GTM/GA4 can segment the resulting event by product category and
 * campaign without needing a new event name per landing page.
 */
export function trackLeadSubmitted(
  formName: string,
  context: Record<string, unknown> = {},
): void {
  pushDataLayerEvent("generate_lead", {
    form_name: formName,
    form_location: typeof window !== "undefined" ? window.location.pathname : undefined,
    ...context,
  });

  if (typeof window !== "undefined" && typeof window.gtag_report_conversion === "function") {
    window.gtag_report_conversion();
  }
}
