/**
 * Fallback step labels — used only if the CRM omits the `steps` array.
 * The authoritative list is now returned by the CRM API.
 */
export const TRACKING_STEPS = [
  "Received",
  "In Review",
  "In Production",
  "Out for Delivery",
  "Delivered",
] as const;

export interface TrackingStatus {
  found: boolean;
  /** 0 = closed/unavailable, 1..5 = the active step index */
  step: number;
  /** Human-readable label for the current step, e.g. "In Production" */
  label: string | null;
  /** Ordered list of all step labels returned by the CRM */
  steps: string[];
  updatedAt: string | null;
}

/** Public base path for the tracking page. */
export const TRACK_PATH = "/track";
