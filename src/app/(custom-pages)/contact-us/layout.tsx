import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Contact Us | HOF Pack Custom Packaging | HofPack" },
  description:
    "Get in touch with HOF Pack packaging specialists. Fast response times, custom packaging expertise and dedicated support for your business.",
};

export default function ContactUsLayout({ children }: { children: ReactNode }) {
  return children;
}
