import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Get a Custom Packaging Quote | HOF Pack | HofPack" },
  description:
    "Request a free custom packaging quote from HOF Pack. Competitive pricing, custom sizing, premium materials and fast turnaround for your brand.",
};

export default function CustomQuoteLayout({ children }: { children: ReactNode }) {
  return children;
}
