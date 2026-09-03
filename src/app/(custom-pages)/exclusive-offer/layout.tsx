import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "20% Off Your First Order | HOF Pack Custom Packaging | HofPack" },
  description:
    "Claim 20% off your first custom packaging order with HOF Pack. Premium quality, low minimums, fast turnaround. Limited time offer for new customers.",
};

export default function ExclusiveOfferLayout({ children }: { children: ReactNode }) {
  return children;
}
