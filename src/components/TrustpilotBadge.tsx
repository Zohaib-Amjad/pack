"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (el: HTMLElement, force?: boolean) => void;
    };
  }
}

const TRUSTPILOT_URL = "https://www.trustpilot.com/review/hofpack.com";

/** Micro Combo — score + stars (auto-updates from Trustpilot) */
const MICRO_COMBO_TEMPLATE_ID = "5419b6ffb0d04a076446a9af";
/** Micro Star — stars only */
const MICRO_STAR_TEMPLATE_ID = "5419b732fbfb950b10de65e5";

type TrustpilotBadgeProps = {
  theme?: "dark" | "light";
  className?: string;
  /** micro-combo = score + stars; micro-star = stars only */
  variant?: "micro-combo" | "micro-star";
  /** Show “on Trustpilot” label beside the widget (product pages) */
  showLabel?: boolean;
};

/**
 * Live Trustpilot TrustBox. Score updates automatically when Trustpilot changes.
 * Requires NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID.
 */
export default function TrustpilotBadge({
  theme = "light",
  className = "",
  variant = "micro-combo",
  showLabel = false,
}: TrustpilotBadgeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const businessUnitId = process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID?.trim();
  const templateId =
    variant === "micro-star" ? MICRO_STAR_TEMPLATE_ID : MICRO_COMBO_TEMPLATE_ID;
  const boxWidth = variant === "micro-star" ? 120 : 180;
  const boxHeight = 24;

  useEffect(() => {
    if (ref.current && window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  }, [businessUnitId, theme, templateId]);

  if (!businessUnitId) return null;

  return (
    <>
      <Script
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (ref.current && window.Trustpilot) {
            window.Trustpilot.loadFromElement(ref.current, true);
          }
        }}
      />
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <div
          className="trustpilot-badge-wrap overflow-hidden"
          style={{ width: boxWidth, height: boxHeight, maxWidth: "100%" }}
        >
          <div
            ref={ref}
            className="trustpilot-widget"
            data-locale="en-US"
            data-template-id={templateId}
            data-businessunit-id={businessUnitId}
            data-style-height={`${boxHeight}px`}
            data-style-width={`${boxWidth}px`}
            data-theme={theme}
          >
            <a
              href={TRUSTPILOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[12px] text-[#5a5652] no-underline"
            >
              Trustpilot
            </a>
          </div>
        </div>
        {showLabel ? (
          <a
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[12px] font-medium text-[#5a5652] no-underline hover:text-accent"
          >
            on Trustpilot
          </a>
        ) : null}
      </div>
    </>
  );
}