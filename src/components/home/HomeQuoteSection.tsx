"use client";

import QuoteRequestForm from "@/components/QuoteRequestForm";

/** Home page quote block — shared form UI + submission pipeline. */
export default function HomeQuoteSection() {
  return (
    <QuoteRequestForm
      id="quote-form"
      variant="section"
      productInterest="General Inquiry"
      source="organic"
    />
  );
}