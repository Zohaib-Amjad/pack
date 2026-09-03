import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Track Order | HOF Pack | HofPack" },
  description: "Track your packaging order status with HOF Pack.",
};

export default function TrackLayout({ children }: { children: ReactNode }) {
  return children;
}
