import CustomLegalPage from "@/components/CustomLegalPage";

export default function CustomRefundPolicyView() {
  return (
    <CustomLegalPage
      eyebrow="Legal"
      title="Return & Refund Policy"
      subtitle="We value your satisfaction and peace of mind. Please read our policy carefully before placing an order."
      lastUpdated="January 1, 2026"
      sections={[
        {
          heading: "We Value Your Satisfaction & Peace of Mind",
          content: (
            <p>
              At HOF Pack, we make every package feel personal and special. We are
              committed to high-quality custom-made packaging boxes and bags for our
              customers. Every brand is different and unique, thus every package
              should also look unique in its own way. Our policy for returns and
              refunds has been listed below to ensure you have a transparent
              experience with HOF Pack.
            </p>
          ),
        },
        {
          heading: "All Orders Are Final",
          content: (
            <>
              <p>
                Whether you ordered via website, call, CTA, or chat with our
                customer support team, every order is considered final. Every order
                is custom-designed and custom-made, and hence, every confirmed order
                cannot be changed after it goes into production.
              </p>
              <p className="font-semibold text-[#1a1a1a]">
                All sales are final. We do not offer refunds or credits.
              </p>
              <p>
                Exception cases exist only where we have made a confirmed error from
                our side. In that case, we will re-print it for you.
              </p>
            </>
          ),
        },
        {
          heading: "Order Cancellations",
          content: (
            <>
              <p>
                Orders must not be cancelled. However, cancellation may be possible
                at only a few stages of production, subject to cancellation charges:
              </p>
              <ul className="mt-2 list-none space-y-3">
                {[
                  {
                    stage: "Before Design Rework",
                    detail:
                      "Orders can be canceled before entering the design rework stage. A $15 fee + 5% of the total order amount will be charged to cover processing and initial design costs.",
                  },
                  {
                    stage: "During Design Rework",
                    detail:
                      "If canceled during this stage, a minimum of 20% of the total order amount will be deducted as a design fee.",
                  },
                  {
                    stage: "After Sent to Production (Press)",
                    detail:
                      "Cancellation is not guaranteed. If approved, at least 50% of the total order amount will be deducted to cover production costs.",
                  },
                  {
                    stage: "After Shipping",
                    detail: "Orders cannot be canceled once shipped.",
                  },
                ].map((item) => (
                  <li key={item.stage} className="flex items-start gap-2">
                    <svg
                      className="mt-1 shrink-0"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6l2.5 2.5L10 3"
                        stroke="#e8732a"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>
                      <strong className="text-[#1a1a1a]">{item.stage}:</strong>{" "}
                      {item.detail}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-semibold text-[#1a1a1a]">
                Important: HOF Pack does not provide ANY refunds for any design,
                services, or orders that have been successfully placed.
              </p>
            </>
          ),
        },
        {
          heading: "Damaged or Lost Items",
          content: (
            <>
              <p>
                If your order has a valid defect from our side, or if it is damaged
                or has missing items, you must notify HOF Pack within{" "}
                <strong>2–3 business days</strong>. After 3 days, we do not accept
                any claim.
              </p>
              <p>
                For a re-print, you must return almost all of the received items at
                your own expense. Our team will not accept any returns without
                written authorization from HOF Pack — contact our team before
                returning anything.
              </p>
              <p>
                Customers may inspect all packages for visible signs of damage or
                missing items before accepting delivery. We are not responsible for
                damage caused by the courier. If you find any damage or missing
                items from our side, notify both HOF Pack and the delivery courier
                immediately.
              </p>
            </>
          ),
        },
        {
          heading: "Refund Policy",
          content: (
            <p>
              HOF Pack is not responsible for any sort of refunds. All custom
              orders are produced specifically for each customer and cannot be
              resold or returned.
            </p>
          ),
        },
        {
          heading: "Printing Standards & Final Approval",
          content: (
            <>
              <p>
                Customers must approve all designs and final artworks before they go
                to the press or production team. HOF Pack is not liable for any
                errors that occur after approval, including:
              </p>
              <ul className="mt-1 list-none space-y-1.5">
                {[
                  "Incorrect spelling of your brand or text",
                  "Wrong grammar or punctuation mistakes",
                  "Wrong graphics orientation or placement",
                  "Incorrect font usage",
                  "Irregular die cuts, slits, or incorrect/missing folds",
                  "Inaccurate finished product size",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg
                      className="mt-1 shrink-0"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6l2.5 2.5L10 3"
                        stroke="#e8732a"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-2">
                We ensure all Pantone color reproduction is within 90% of the final
                proof you approved. If you need a 100% match, you must order a
                hardcopy proof. We are not liable for ink density on screen proofs.
              </p>
            </>
          ),
        },
        {
          heading: "Contact Us",
          content: (
            <p>
              If you have any queries or need to start a claim, please contact our
              customer service team at{" "}
              <a
                href="mailto:info@hofpack.com"
                className="text-[#ee7a1b] underline underline-offset-2 transition-colors hover:text-[#d46710]"
              >
                info@hofpack.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:+18884294881"
                className="text-[#ee7a1b] underline underline-offset-2 transition-colors hover:text-[#d46710]"
              >
                +1 (888) 429-4881
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
