import React from "react";
import LegalPage from "@/components/LegalPage";
import Link from "next/link";

export default function CancellationPolicyView() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cancellation Policy"
      subtitle="Please read this policy carefully before placing your order. Every HOF Pack order is custom made to your specifications."
      lastUpdated="August 25, 2026"
      sections={[
        {
          heading: "Custom Orders",
          content: (
            <p>
              Every order at HOF Pack is custom made to your specifications. Production begins with design work and material sourcing that is unique to your project, which is why our cancellation terms are different from those of a standard retail store. Please read this policy carefully before placing your order.
            </p>
          ),
        },
        {
          heading: "All Sales Are Generally Final",
          content: (
            <p>
              Because each order is fully customized, all sales are generally final once production has begun. We are unable to resell custom packaging made to your brand and specifications, so cancellations are limited to the stages described below.
            </p>
          ),
        },
        {
          heading: "Design Fees",
          content: (
            <p>
              Design fees are non-refundable once our team has started work on your project. This includes artwork setup, dielines, proofs, and any 3D mockups prepared for your review. If you cancel after design work has begun, any amounts already paid toward design will not be refunded.
            </p>
          ),
        },
        {
          heading: "Cancellation Windows",
          content: (
            <>
              <p>
                You may be able to cancel your order during certain early production stages. Whether a cancellation is possible depends on how far your order has progressed:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  <strong>Before production begins:</strong> cancellation is usually possible and may be subject only to design fees for work already completed.
                </li>
                <li>
                  <strong>During early production:</strong> cancellation may still be possible but will be subject to a cancellation fee that covers processing, materials, and design work already performed.
                </li>
                <li>
                  <strong>Once an order has entered advanced production or has shipped:</strong> it can no longer be cancelled.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "Cancellation Fees",
          content: (
            <p>
              If your order qualifies for cancellation during an eligible stage, a cancellation fee may apply. This fee covers the processing, design, and production costs already incurred on your behalf. The exact fee depends on how much work has been completed at the time of your request and will be confirmed by your dedicated project manager. Cancellation fees may be up to 25% of the order value depending on production stage.
            </p>
          ),
        },
        {
          heading: "Refunds",
          content: (
            <p>
              Where a cancellation is approved and a refund is due, the eligible amount will be returned to your original payment method within 7 to 10 business days. Design fees and any applicable cancellation fees will be deducted from the refund.
            </p>
          ),
        },
        {
          heading: "Damaged or Defective Orders",
          content: (
            <p>
              This policy covers cancellations only. If your order arrives damaged, defective, or not matching your approved proof, please contact us within 3 business days of delivery so we can make it right. Please see our{" "}
              <Link
                className="text-accent hover:text-[var(--ds-orange-hover)] underline underline-offset-2 transition-colors"
                href="/refund-policy"
              >
                Returns and Refunds Policy
              </Link>{" "}
              for details.
            </p>
          ),
        },
        {
          heading: "How to Request a Cancellation",
          content: (
            <>
              <p>
                To request a cancellation, contact your dedicated project manager as soon as possible, or reach our team directly:
              </p>
              <ul className="list-none mt-2 space-y-1">
                <li>
                  Phone:{" "}
                  <a
                    href="tel:+18884294881"
                    className="text-accent hover:text-[var(--ds-orange-hover)] underline underline-offset-2 transition-colors"
                  >
                    +1 (888) 429-4881
                  </a>
                </li>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:info@hofpack.com"
                    className="text-accent hover:text-[var(--ds-orange-hover)] underline underline-offset-2 transition-colors"
                  >
                    info@hofpack.com
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                Cancellation requests are only effective once confirmed in writing by our team. The earlier you reach out, the more likely we are to accommodate your request.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
