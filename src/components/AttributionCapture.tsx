"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttributionFromUrl } from "@/lib/attribution";

/**
 * Mounted once, sitewide (see app/layout.tsx). Captures gclid/UTM params
 * from the URL into a first-party cookie so they're available at form
 * submit time regardless of which page the visitor lands on, or how many
 * pages they browse before converting.
 */
export default function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttributionFromUrl();
  }, [pathname]);

  return null;
}