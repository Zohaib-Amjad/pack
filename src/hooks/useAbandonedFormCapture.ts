"use client";

import { useCallback, useEffect, useRef, type FocusEvent, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import {
  hasUnfilledCaptureData,
  sendUnfilledFormCapture,
  type UnfilledFormFields,
} from "@/lib/unfilled-form";

/** In-memory only — one stable ID per form for this page load. */
const pageSessionIds = new Map<string, string>();
const pageLoadId =
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `page${Date.now()}${Math.random().toString(36).slice(2, 8)}`;

/** Map input name/id → unfilled field key */
const FIELD_MAP: Record<string, keyof UnfilledFormFields> = {
  firstName: "firstName",
  first_name: "firstName",
  lastName: "lastName",
  last_name: "lastName",
  name: "name",
  fullName: "name",
  full_name: "name",
  email: "email",
  phone: "phone",
  contact: "phone",
  telephone: "phone",
  tel: "phone",
};

function getPageSessionId(formName: string): string {
  const safeFormName = (formName || "form").replace(/[^a-zA-Z0-9_-]/g, "-");
  const existing = pageSessionIds.get(safeFormName);
  if (existing) return existing;
  const id = `${pageLoadId}-${pageSessionIds.size}`;
  pageSessionIds.set(safeFormName, id);
  return id;
}

function fieldsFingerprint(fields: UnfilledFormFields) {
  return JSON.stringify({
    firstName: (fields.firstName || "").trim(),
    lastName: (fields.lastName || "").trim(),
    name: (fields.name || "").trim(),
    phone: (fields.phone || "").trim(),
    email: (fields.email || "").trim(),
  });
}

type Options = {
  formName: string;
  /** Stop capturing after a successful full submit */
  enabled?: boolean;
  categorySlug?: string;
  productInterest?: string;
  /** Debounce before POST to Supabase (blur always flushes immediately). */
  debounceMs?: number;
  /**
   * Optional controlled-field snapshot. When provided, any change auto-schedules
   * a save after debounceMs (most reliable for page forms).
   */
  fields?: UnfilledFormFields;
};

type TrackArgs = UnfilledFormFields;
type FlushOptions = { beacon?: boolean; keepalive?: boolean };

/**
 * Abandoned / unfilled lead capture — writes straight to Supabase via /api/unfilled-form.
 * No localStorage / sessionStorage for form fields.
 */
export function useAbandonedFormCapture({
  formName,
  enabled = true,
  categorySlug,
  productInterest,
  debounceMs = 800,
  fields: watchedFields,
}: Options) {
  const pathname = usePathname();
  const metaRef = useRef({ formName, enabled, categorySlug, productInterest, debounceMs });
  useEffect(() => {
    metaRef.current = { formName, enabled, categorySlug, productInterest, debounceMs };
  }, [formName, enabled, categorySlug, productInterest, debounceMs]);

  const fieldsRef = useRef<UnfilledFormFields>({});
  const lastSentRef = useRef("");
  const timerRef = useRef<number | null>(null);
  const prevPathRef = useRef(pathname);
  const inFlightRef = useRef(false);
  const pendingFlushRef = useRef(false);
  const flushRef = useRef<(opts?: FlushOptions) => boolean>(() => false);

  const clearTimer = () => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const flush = useCallback((opts?: FlushOptions) => {
    const meta = metaRef.current;
    const fields = fieldsRef.current;
    if (!meta.enabled || !hasUnfilledCaptureData(fields)) return false;

    const fingerprint = fieldsFingerprint(fields);
    if (fingerprint === lastSentRef.current) return false;
    if (inFlightRef.current && !opts?.beacon) {
      pendingFlushRef.current = true;
      return false;
    }

    const sessionId = getPageSessionId(meta.formName);
    if (!sessionId) return false;

    lastSentRef.current = fingerprint;
    inFlightRef.current = true;
    void sendUnfilledFormCapture(
      {
        sessionId,
        formName: meta.formName,
        categorySlug: meta.categorySlug,
        productInterest: meta.productInterest,
        fields,
      },
      opts,
    ).then((ok) => {
      inFlightRef.current = false;
      if (!ok) lastSentRef.current = "";
      const hasNewerFields = fieldsFingerprint(fieldsRef.current) !== lastSentRef.current;
      if (pendingFlushRef.current || hasNewerFields) {
        pendingFlushRef.current = false;
        window.setTimeout(() => flushRef.current({ keepalive: true }), 0);
      }
    });
    return true;
  }, []);
  flushRef.current = flush;

  const scheduleFlush = useCallback(() => {
    const meta = metaRef.current;
    if (!meta.enabled || !hasUnfilledCaptureData(fieldsRef.current)) {
      clearTimer();
      return;
    }
    clearTimer();
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      flush({ keepalive: true });
    }, meta.debounceMs);
  }, [flush]);

  const track = useCallback(
    (next: TrackArgs) => {
      fieldsRef.current = {
        firstName: next.firstName !== undefined ? next.firstName : fieldsRef.current.firstName,
        lastName: next.lastName !== undefined ? next.lastName : fieldsRef.current.lastName,
        name: next.name !== undefined ? next.name : fieldsRef.current.name,
        phone: next.phone !== undefined ? next.phone : fieldsRef.current.phone,
        email: next.email !== undefined ? next.email : fieldsRef.current.email,
      };
      scheduleFlush();
    },
    [scheduleFlush],
  );

  const flushNow = useCallback(() => {
    clearTimer();
    flush({ keepalive: true });
  }, [flush]);

  // Declarative field watching — page forms (QuoteRequestForm) rely on this.
  useEffect(() => {
    if (!watchedFields) return;
    fieldsRef.current = {
      firstName: watchedFields.firstName ?? "",
      lastName: watchedFields.lastName ?? "",
      name: watchedFields.name ?? "",
      phone: watchedFields.phone ?? "",
      email: watchedFields.email ?? "",
    };
    if (!enabled) {
      clearTimer();
      return;
    }
    scheduleFlush();
  }, [
    watchedFields?.firstName,
    watchedFields?.lastName,
    watchedFields?.name,
    watchedFields?.phone,
    watchedFields?.email,
    enabled,
    scheduleFlush,
  ]);

  const onFormInput = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      const el = e.target;
      if (!(el instanceof HTMLInputElement) && !(el instanceof HTMLTextAreaElement)) return;
      const key =
        FIELD_MAP[el.name] ||
        FIELD_MAP[el.id] ||
        FIELD_MAP[el.getAttribute("data-unfilled") || ""];
      if (!key) return;
      track({ [key]: el.value });
    },
    [track],
  );

  const onFormBlurCapture = useCallback(
    (e: FocusEvent<HTMLFormElement>) => {
      const el = e.target;
      if (!(el instanceof HTMLInputElement) && !(el instanceof HTMLTextAreaElement)) return;
      const key =
        FIELD_MAP[el.name] ||
        FIELD_MAP[el.id] ||
        FIELD_MAP[el.getAttribute("data-unfilled") || ""];
      if (!key) return;
      track({ [key]: el.value });
      flushNow();
    },
    [track, flushNow],
  );

  useEffect(() => {
    if (!enabled) clearTimer();
  }, [enabled]);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      clearTimer();
      flush({ keepalive: true, beacon: true });
      prevPathRef.current = pathname;
    }
  }, [pathname, flush]);

  useEffect(() => {
    return () => {
      clearTimer();
      flush({ keepalive: true, beacon: true });
    };
  }, [flush]);

  useEffect(() => {
    const onHide = () => {
      clearTimer();
      flush({ beacon: true, keepalive: true });
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") onHide();
    };
    window.addEventListener("pagehide", onHide);
    window.addEventListener("beforeunload", onHide);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("beforeunload", onHide);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [flush]);

  return { track, flushNow, onFormInput, onFormBlurCapture };
}