import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildCustomerQuoteEmailHtml } from "@/lib/quote-email-html";

export const metadata: Metadata = {
  title: "Email preview",
  robots: { index: false, follow: false },
};

export default function EmailPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const html = buildCustomerQuoteEmailHtml({
    customerName: "Muhammad",
    customerEmail: "muhammad@example.com",
    customerPhone: "+1 (555) 010-0199",
    productInterest: "Custom mailer boxes",
    specs: "Qty 500 · 8 x 6 x 4 in · matte finish · logo on lid",
  });

  return (
    <iframe
      title="Quote email preview"
      srcDoc={html}
      style={{ width: "100%", height: "100vh", border: 0, background: "#f5f3ee" }}
    />
  );
}
