import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Custom Packaging Solutions | HOF Pack | HofPack" },
  description:
    "Custom packaging designed to strengthen your brand. CMYK printing, foil stamping, embossing, low MOQ and fast turnaround. Get a free quote today.",
};

export default function CustomPackagingSolutionsLayout({ children }: { children: ReactNode }) {
  return children;
}
