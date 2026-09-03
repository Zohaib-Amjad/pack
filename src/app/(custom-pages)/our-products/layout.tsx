import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Our Products | HOF Pack Custom Packaging | HofPack" },
  description:
    "Explore HOF Pack's full range of custom packaging – rigid boxes, mailer boxes, tuck boxes, retail packaging, eco-friendly options and more.",
};

export default function OurProductsLayout({ children }: { children: ReactNode }) {
  return children;
}
