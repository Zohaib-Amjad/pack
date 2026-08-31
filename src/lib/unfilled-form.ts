export type UnfilledFormFields = {
  firstName?: string;
  lastName?: string;
  name?: string;
  phone?: string;
  email?: string;
};

export type UnfilledFormPayload = {
  sessionId: string;
  formName: string;
  categorySlug?: string;
  productInterest?: string;
  fields: UnfilledFormFields;
  pageUrl?: string;
};

function trim(value?: string) {
  return (value || "").trim();
}

/** True when at least one tracked contact field has content. */
export function hasUnfilledCaptureData(fields: UnfilledFormFields): boolean {
  return Boolean(
    trim(fields.firstName) ||
      trim(fields.lastName) ||
      trim(fields.name) ||
      trim(fields.phone) ||
      trim(fields.email),
  );
}

export function buildUnfilledDisplayName(fields: UnfilledFormFields): string {
  const combined = [trim(fields.firstName), trim(fields.lastName)].filter(Boolean).join(" ");
  return combined || trim(fields.name) || "Unfilled Form";
}

export function buildUnfilledMessage(fields: UnfilledFormFields, formName: string): string {
  const filled: string[] = [];
  if (trim(fields.firstName)) filled.push("first name");
  if (trim(fields.lastName)) filled.push("last name");
  if (trim(fields.name) && !trim(fields.firstName) && !trim(fields.lastName)) {
    filled.push("name");
  }
  if (trim(fields.phone)) filled.push("phone");
  if (trim(fields.email)) filled.push("email");

  return [
    "Unfilled form capture (user paused or left without submitting).",
    `Form: ${formName}`,
    `Fields captured: ${filled.length ? filled.join(", ") : "none"}`,
  ].join("\n");
}

export function getGlobalSessionId(): string {
  if (typeof window === "undefined") return "server-session";
  const win = window as any;
  if (!win.__hofpack_session_id) {
    try {
      const stored = sessionStorage.getItem("hofpack_unfilled_session_id");
      if (stored) {
        win.__hofpack_session_id = stored;
      } else {
        const fresh = `sess-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        sessionStorage.setItem("hofpack_unfilled_session_id", fresh);
        win.__hofpack_session_id = fresh;
      }
    } catch {
      win.__hofpack_session_id = `sess-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    }
  }
  return win.__hofpack_session_id;
}

/**
 * Persist unfilled lead directly to Supabase via server API (service role).
 * No browser storage of form field values.
 */
export async function sendUnfilledFormCapture(
  payload: UnfilledFormPayload,
  opts?: { keepalive?: boolean; beacon?: boolean },
): Promise<boolean> {
  if (!hasUnfilledCaptureData(payload.fields)) return false;

  const unifiedSessionId = getGlobalSessionId();
  const body = JSON.stringify({
    ...payload,
    sessionId: unifiedSessionId,
    pageUrl: payload.pageUrl || (typeof window !== "undefined" ? window.location.href : undefined),
  });

  const leaving = Boolean(opts?.beacon);

  try {
    // Tab close / navigation: one sendBeacon OR one keepalive fetch — never both
    // (dual fire races two INSERTs before upsert lookup sees the row).
    if (leaving && typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      try {
        const blob = new Blob([body], { type: "application/json" });
        if (navigator.sendBeacon("/api/unfilled-form", blob)) return true;
      } catch {
        // fall through to fetch
      }
    }

    const res = await fetch("/api/unfilled-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: Boolean(opts?.keepalive || leaving),
    });
    if (!res.ok && typeof window !== "undefined") {
      console.warn("[unfilled-form] save failed", res.status, await res.text().catch(() => ""));
    }
    return res.ok;
  } catch (err) {
    if (typeof window !== "undefined" && !leaving) {
      console.warn("[unfilled-form] save error", err);
    }
    return false;
  }
}
