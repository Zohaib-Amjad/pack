"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { sendUnfilledFormCapture, hasUnfilledCaptureData, type UnfilledFormFields } from "@/lib/unfilled-form";

// Stable session ID per browser page lifecycle
let browserSessionId = "";
function getOrCreateSessionId() {
  if (!browserSessionId) {
    browserSessionId = `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
  return browserSessionId;
}

/**
 * Normalizes input element key based on name, id, placeholder, and autocomplete
 */
function classifyField(el: HTMLInputElement | HTMLTextAreaElement): keyof UnfilledFormFields | null {
  const name = (el.name || "").toLowerCase();
  const id = (el.id || "").toLowerCase();
  const placeholder = (el.placeholder || "").toLowerCase();
  const autocomplete = (el.autocomplete || "").toLowerCase();
  const type = (el.type || "").toLowerCase();
  const dataUnfilled = (el.getAttribute("data-unfilled") || "").toLowerCase();

  if (dataUnfilled) {
    if (dataUnfilled.includes("first")) return "firstName";
    if (dataUnfilled.includes("last")) return "lastName";
    if (dataUnfilled.includes("name")) return "name";
    if (dataUnfilled.includes("email")) return "email";
    if (dataUnfilled.includes("phone") || dataUnfilled.includes("tel")) return "phone";
  }

  // 1. Email Check
  if (
    type === "email" ||
    name.includes("email") ||
    id.includes("email") ||
    autocomplete.includes("email") ||
    placeholder.includes("email") ||
    placeholder.includes("@")
  ) {
    return "email";
  }

  // 2. Phone Check
  if (
    type === "tel" ||
    name.includes("phone") ||
    name.includes("mobile") ||
    name.includes("contact") ||
    name.includes("tel") ||
    id.includes("phone") ||
    id.includes("mobile") ||
    id.includes("tel") ||
    autocomplete.includes("tel") ||
    placeholder.includes("phone") ||
    placeholder.includes("555") ||
    placeholder.includes("mobile") ||
    placeholder.includes("tel")
  ) {
    return "phone";
  }

  // 3. First / Last Name Check
  if (
    name.includes("firstname") ||
    name.includes("first_name") ||
    name === "fname" ||
    id.includes("firstname") ||
    id.includes("first_name") ||
    placeholder.includes("first name")
  ) {
    return "firstName";
  }

  if (
    name.includes("lastname") ||
    name.includes("last_name") ||
    name === "lname" ||
    id.includes("lastname") ||
    id.includes("last_name") ||
    placeholder.includes("last name")
  ) {
    return "lastName";
  }

  // 4. Full Name Check
  if (
    name.includes("name") ||
    name.includes("fullname") ||
    name.includes("full_name") ||
    id.includes("name") ||
    id.includes("fullname") ||
    autocomplete.includes("name") ||
    placeholder.includes("your name") ||
    placeholder.includes("full name") ||
    placeholder.includes("john") ||
    placeholder.includes("jane")
  ) {
    return "name";
  }

  return null;
}

/**
 * Universal Global Abandoned Form Tracker.
 * Automatically captures typing in ANY form, modal, popup, or dynamic page across the whole website.
 */
export default function GlobalAbandonedCapture() {
  const pathname = usePathname();
  const currentFieldsRef = useRef<UnfilledFormFields>({});
  const lastSavedFingerprint = useRef<string>("");
  const flushTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Extract page or product context
  const getPageContext = () => {
    let productInterest = "General Inquiry";
    if (typeof document !== "undefined") {
      const h1 = document.querySelector("h1");
      if (h1 && h1.textContent?.trim()) {
        productInterest = h1.textContent.trim().slice(0, 100);
      } else if (document.title) {
        productInterest = document.title.split("|")[0].trim().slice(0, 100);
      }
    }
    return productInterest;
  };

  const flush = (options?: { beacon?: boolean; keepalive?: boolean }) => {
    const fields = currentFieldsRef.current;
    if (!hasUnfilledCaptureData(fields)) return;

    const fingerprint = JSON.stringify(fields);
    if (fingerprint === lastSavedFingerprint.current) return;

    lastSavedFingerprint.current = fingerprint;
    const sessionId = getOrCreateSessionId();
    const productInterest = getPageContext();

    void sendUnfilledFormCapture(
      {
        sessionId,
        formName: `Page: ${pathname || "website"}`,
        productInterest,
        fields,
        pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      },
      options
    );
  };

  const scheduleFlush = (delayMs = 500) => {
    if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
    flushTimerRef.current = setTimeout(() => {
      flush({ keepalive: true });
    }, delayMs);
  };

  useEffect(() => {
    // 1. Listen for user typing in any input / textarea
    const handleInput = (e: Event) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
        return;
      }

      // Ignore search bars, admin inputs, or password fields
      if (
        target.type === "password" ||
        target.type === "search" ||
        target.name === "search" ||
        target.id === "search" ||
        target.placeholder?.toLowerCase().includes("search")
      ) {
        return;
      }

      const fieldKey = classifyField(target);
      if (fieldKey) {
        currentFieldsRef.current[fieldKey] = target.value;
        scheduleFlush(500);
      }
    };

    // 2. Listen for field blur (user moves to another input or clicks out)
    const handleBlur = (e: FocusEvent) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
        return;
      }
      const fieldKey = classifyField(target);
      if (fieldKey) {
        currentFieldsRef.current[fieldKey] = target.value;
        flush({ keepalive: true });
      }
    };

    // 3. Listen for scroll (user types then scrolls to another section)
    const handleScroll = () => {
      if (!hasUnfilledCaptureData(currentFieldsRef.current)) return;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        flush({ keepalive: true });
      }, 300);
    };

    // 4. Listen for tab switch or window minimization
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flush({ beacon: true, keepalive: true });
      }
    };

    // 5. Listen for page unload / close
    const handlePageHide = () => {
      flush({ beacon: true, keepalive: true });
    };

    window.addEventListener("input", handleInput, { capture: true, passive: true });
    window.addEventListener("change", handleInput, { capture: true, passive: true });
    window.addEventListener("blur", handleBlur, { capture: true, passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);

    return () => {
      window.removeEventListener("input", handleInput, { capture: true });
      window.removeEventListener("change", handleInput, { capture: true });
      window.removeEventListener("blur", handleBlur, { capture: true });
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
      if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [pathname]);

  // Flush whenever user navigates between Next.js routes
  useEffect(() => {
    return () => {
      flush({ beacon: true, keepalive: true });
    };
  }, [pathname]);

  return null;
}
