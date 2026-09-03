import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Custom Packaging | HofPack | HofPack" },
  description:
    "Custom packaging for growing brands. Explore premium packaging styles and request a free custom quote.",
};

export default function CustomPackagingLayout({ children }: { children: ReactNode }) {
  return children;
}
