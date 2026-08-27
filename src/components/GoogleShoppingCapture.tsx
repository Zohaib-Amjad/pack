"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Placeholder kept for layout import stability.
 * Add to Cart visibility is URL-based only (see shouldShowAddToCart).
 */
export default function GoogleShoppingCapture() {
  const pathname = usePathname();

  useEffect(() => {
    // Intentionally no session sticky flag — ATC must not leak to normal pages.
  }, [pathname]);

  return null;
}