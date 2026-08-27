import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy | HOF Pack Custom Packaging",
  description:
    "We value your satisfaction and peace of mind. Please read our policy carefully before placing an order.",
};

export default function CustomRefundPolicyPage() {
  return (
    <main>
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#1f5a38_45%,#2a6b45_100%)] px-4 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#ee7a1b]">
            Legal
          </p>
          <h1 className="mb-4 text-[40px] font-semibold leading-[1.05] text-white sm:text-[52px]">
            Return &amp; Refund Policy
          </h1>
          <p className="mx-auto max-w-[520px] text-[14px] leading-[1.7] text-white/80">
            We value your satisfaction and peace of mind. Please read our policy
            carefully before placing an order.
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-white/45">
            Last updated: January 1, 2026
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-10">
            {/* 1. We Value Your Satisfaction */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  1
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  We Value Your Satisfaction &amp; Peace of Mind
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  At HOF Pack, we make every package feel personal and special. We
                  are committed to high-quality custom-made packaging boxes and
                  bags for our customers. Every brand is different and unique, thus
                  every package should also look unique in its own way. Our
                  policy for returns and refunds has been listed below to ensure
                  you have a transparent experience with HOF Pack.
                </p>
              </div>
            </div>

            {/* 2. All Orders Are Final */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  2
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  All Orders Are Final
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  Whether you ordered via website, call, CTA, or chat with our
                  customer support team, every order is considered final. Every
                  order is custom-designed and custom-made, and hence, every
                  confirmed order cannot be changed after it goes into production.
                </p>
                <p className="font-semibold text-[#1a1a1a]">
                  All sales are final. We do not offer refunds or credits.
                </p>
                <p>
                  Exception cases exist only where we have made a confirmed error
                  from our side. In that case, we will re-print it for you.
                </p>
              </div>
            </div>

            {/* 3. Order Cancellations */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  3
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Order Cancellations
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  Orders must not be cancelled. However, cancellation may be
                  possible at only a few stages of production, subject to
                  cancellation charges:
                </p>
                <ul className="mt-2 list-none space-y-3">
                  <li className="flex items-start gap-2">
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
                      <strong className="text-[#1a1a1a]">
                        Before Design Rework:
                      </strong>{" "}
                      Orders can be canceled before entering the design rework
                      stage. A $15 fee + 5% of the total order amount will be
                      charged to cover processing and initial design costs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
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
                      <strong className="text-[#1a1a1a]">
                        During Design Rework:
                      </strong>{" "}
                      If canceled during this stage, a minimum of 20% of the
                      total order amount will be deducted as a design fee.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
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
                      <strong className="text-[#1a1a1a]">
                        After Sent to Production (Press):
                      </strong>{" "}
                      Cancellation is not guaranteed. If approved, at least 50%
                      of the total order amount will be deducted to cover
                      production costs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
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
                      <strong className="text-[#1a1a1a]">
                        After Shipping:
                      </strong>{" "}
                      Orders cannot be canceled once shipped.
                    </span>
                  </li>
                </ul>
                <p className="mt-2 font-semibold text-[#1a1a1a]">
                  Important: HOF Pack does not provide ANY refunds for any
                  design, services, or orders that have been successfully placed.
                </p>
              </div>
            </div>

            {/* 4. Damaged or Lost Items */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  4
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Damaged or Lost Items
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  If your order has a valid defect from our side, or if it is
                  damaged or has missing items, you must notify HOF Pack within{" "}
                  <strong>2–3 business days</strong>. After 3 days, we do not
                  accept any claim.
                </p>
                <p>
                  For a re-print, you must return almost all of the received
                  items at your own expense. Our team will not accept any
                  returns without written authorization from HOF Pack — contact
                  our team before returning anything.
                </p>
                <p>
                  Customers may inspect all packages for visible signs of
                  damage or missing items before accepting delivery. We are not
                  responsible for damage caused by the courier. If you find any
                  damage or missing items from our side, notify both HOF Pack and
                  the delivery courier immediately.
                </p>
              </div>
            </div>

            {/* 5. Refund Policy */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  5
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Refund Policy
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  HOF Pack is not responsible for any sort of refunds. All custom
                  orders are produced specifically for each customer and cannot be
                  resold or returned.
                </p>
              </div>
            </div>

            {/* 6. Printing Standards & Final Approval */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  6
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Printing Standards &amp; Final Approval
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  Customers must approve all designs and final artworks before
                  they go to the press or production team. HOF Pack is not
                  liable for any errors that occur after approval, including:
                </p>
                <ul className="mt-1 list-none space-y-1.5">
                  <li className="flex items-start gap-2">
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
                    Incorrect spelling of your brand or text
                  </li>
                  <li className="flex items-start gap-2">
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
                    Wrong grammar or punctuation mistakes
                  </li>
                  <li className="flex items-start gap-2">
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
                    Wrong graphics orientation or placement
                  </li>
                  <li className="flex items-start gap-2">
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
                    Incorrect font usage
                  </li>
                  <li className="flex items-start gap-2">
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
                    Irregular die cuts, slits, or incorrect/missing folds
                  </li>
                  <li className="flex items-start gap-2">
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
                    Inaccurate finished product size
                  </li>
                </ul>
                <p className="mt-2">
                  We ensure all Pantone color reproduction is within 90% of the
                  final proof you approved. If you need a 100% match, you must
                  order a hardcopy proof. We are not liable for ink density on
                  screen proofs.
                </p>
              </div>
            </div>

            {/* 7. Contact Us */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  7
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Contact Us
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  If you have any queries or need to start a claim, please contact
                  our customer service team at{" "}
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
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-[#ececec] pt-8">
            <p className="text-center text-[12px] leading-[1.7] text-[#616a67]">
              Questions about this policy? Contact us at{" "}
              <a
                href="mailto:info@hofpack.com"
                className="text-[#ee7a1b] underline underline-offset-2 transition-colors hover:text-[#d46710]"
              >
                info@hofpack.com
              </a>{" "}
              or{" "}
              <a
                href="tel:+18884294881"
                className="text-[#ee7a1b] underline underline-offset-2 transition-colors hover:text-[#d46710]"
              >
                +1 (888) 429-4881
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
