import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Learn More | HOF Pack Custom Packaging | HofPack" },
  description:
    "Discover how HOF Pack helps brands create exceptional packaging experiences – design support, custom printing, quality assurance and fast turnaround.",
};

export default function LearnMoreLayout({ children }: { children: ReactNode }) {
  return children;
}
