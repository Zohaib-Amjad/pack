/**
 * Sitewide capture + read of Google Ads / campaign attribution.
 *
 * Reads gclid + UTM params from the URL on first load and persists them to a
 * first-party cookie so they survive across page views (Next.js client-side
 * navigation, direct hits, multi-page browsing before converting). Only
 * overwrites previously-stored values when the incoming URL actually carries
 * at least one of these params, so a later organic/direct visit within the
 * cookie's lifetime does not erase the original ad click before the lead
 * converts (last-Ads-click attribution).
 */

const COOKIE_NAME = "hof_attr";
const COOKIE_MAX_AGE_DAYS = 90;

export type StoredAttribution = {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page_url?: string;
  referrer?: string;
};

const PARAM_KEYS: (keyof StoredAttribution)[] = [
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

function canUseDom() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function readCookie(name: string): string | null {
  if (!canUseDom()) return null;
  const escaped = name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, maxAgeDays: number) {
  if (!canUseDom()) return;
  const maxAge = maxAgeDays * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/** Read any currently-stored attribution (does not read the URL). */
export function getStoredAttribution(): StoredAttribution {
  const raw = readCookie(COOKIE_NAME);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * Reads gclid/UTM params from the current URL and merges them into the
 * stored attribution cookie. Safe to call on every page load (mounted
 * sitewide via <AttributionCapture /> in the root layout) — idempotent.
 */
export function captureAttributionFromUrl(): void {
  if (!canUseDom()) return;

  const params = new URLSearchParams(window.location.search);
  const incoming: Partial<StoredAttribution> = {};
  let hasAny = false;

  for (const key of PARAM_KEYS) {
    const value = params.get(key);
    if (value) {
      incoming[key] = value;
      hasAny = true;
    }
  }

  const existing = getStoredAttribution();

  // First-touch landing page + referrer: only set once per cookie lifetime.
  if (!existing.landing_page_url) {
    existing.landing_page_url = window.location.href;
    existing.referrer = document.referrer || undefined;
  }

  // Only overwrite gclid/UTM fields when this visit actually carries new
  // ones — preserves the original ad click across later direct/organic
  // visits within the cookie's lifetime instead of being wiped out.
  const next: StoredAttribution = hasAny ? { ...existing, ...incoming } : existing;

  writeCookie(COOKIE_NAME, JSON.stringify(next), COOKIE_MAX_AGE_DAYS);
}

export type InquiryAttribution = {
  landing_page_url?: string;
  form_name: string;
  category_slug?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
};

/**
 * Builds the attribution fields to spread into a `chat_inquiries` insert.
 * Call client-side, right before the insert, at every lead-capture call site.
 */
export function buildInquiryAttribution(
  formName: string,
  categorySlug?: string,
): InquiryAttribution {
  const stored = getStoredAttribution();
  return {
    landing_page_url:
      stored.landing_page_url || (canUseDom() ? window.location.href : undefined),
    form_name: formName,
    category_slug: categorySlug,
    utm_source: stored.utm_source,
    utm_medium: stored.utm_medium,
    utm_campaign: stored.utm_campaign,
    utm_content: stored.utm_content,
    utm_term: stored.utm_term,
    gclid: stored.gclid,
  };
}

/** True when the currently-stored attribution indicates a paid Ads visit. */
export function isFromPaidTraffic(): boolean {
  const stored = getStoredAttribution();
  return Boolean(stored.gclid || stored.utm_source);
}
