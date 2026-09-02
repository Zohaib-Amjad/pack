"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const SMS_CONSENT_STORAGE_KEY = "hof_sms_consent";

/** Persist the privacy tick across product pages, category forms, and the quote popup. */
export function useSmsConsent() {
  const [smsConsent, setSmsConsentState] = useState(false);

  useEffect(() => {
    try {
      setSmsConsentState(window.localStorage.getItem(SMS_CONSENT_STORAGE_KEY) === "1");
    } catch {
      // Private mode / blocked storage
    }
  }, []);

  const setSmsConsent = useCallback((value: boolean) => {
    setSmsConsentState(value);
    try {
      window.localStorage.setItem(SMS_CONSENT_STORAGE_KEY, value ? "1" : "0");
    } catch {
      // Private mode / blocked storage
    }
  }, []);

  return [smsConsent, setSmsConsent] as const;
}

/** Shared SMS / mobile-data consent copy used on public quote forms. */
export default function SmsConsentLabel({
  className = "font-semibold text-[#2563eb] underline underline-offset-2 hover:text-[#1d4ed8]",
}: {
  className?: string;
}) {
  return (
    <>
      No mobile information will be shared with third parties/affiliates for
      marketing/promotional purposes. All other categories exclude text messaging
      originator opt-in data and consent; this information will not be shared with
      any third parties.{" "}
      <Link
        href="/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={(e) => e.stopPropagation()}
      >
        Privacy Policy
      </Link>
    </>
  );
}

export const SMS_CONSENT_PLAIN =
  "No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.";
