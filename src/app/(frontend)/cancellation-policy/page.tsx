import React from "react";
import type { Metadata } from "next";
import CancellationPolicyView from "@/views/CancellationPolicy";

export const metadata: Metadata = {
  title: "Cancellation Policy | HOF Pack Custom Packaging",
  description: "Please read this policy carefully before placing your order. Every HOF Pack order is custom made to your specifications.",
};

export default function CancellationPolicyPage() {
  return <CancellationPolicyView />;
}
