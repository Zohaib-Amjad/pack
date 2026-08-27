import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | HOF Pack Custom Packaging",
  description:
    "Everything you need to know about how we ship your custom packaging orders across the USA.",
};

export default function CustomShippingPolicyPage() {
  return (
    <main>
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#1f5a38_45%,#2a6b45_100%)] px-4 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#ee7a1b]">
            Legal
          </p>
          <h1 className="mb-4 text-[40px] font-semibold leading-[1.05] text-white sm:text-[52px]">
            Shipping Policy
          </h1>
          <p className="mx-auto max-w-[520px] text-[14px] leading-[1.7] text-white/80">
            Everything you need to know about how we ship your custom packaging
            orders across the USA.
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-white/45">
            Last updated: January 1, 2026
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-10">
            {/* 1. Overview */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  1
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Overview
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  HOF Pack aims to meet indicated production and shipping
                  timelines, but shipping dates are estimates and not guarantees
                  unless explicitly stated. We are not liable for delays caused by
                  carriers, customs, weather, technical issues, or other
                  circumstances beyond our direct control. Customers are
                  responsible for any applicable customs duties, taxes, and for
                  providing accurate shipping information.
                </p>
              </div>
            </div>

            {/* 2. Standard Shipping Time */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  2
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Standard Shipping Time
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  Shipping time is not guaranteed by HOF Pack. Once your order is
                  dispatched, you can track it from the courier company&apos;s
                  website. Shipment and delivery dates are calculated based upon
                  estimates provided by our suppliers and recent order history.
                </p>
                <ul className="mt-2 list-none space-y-2">
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
                    We provide free shipping within the 48 contiguous states of the
                    USA.
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
                    We ship within 10 to 14 business days after final proof
                    approval.
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
                    Rush orders (within 8 business days) require prior
                    authorization from HOF Pack.
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
                    Final proof and approvals must be received by 11:00 AM EST
                    — otherwise one business day will be added to the shipping
                    timeline.
                  </li>
                </ul>
              </div>
            </div>

            {/* 3. Liability & Delays */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  3
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Liability &amp; Delays
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  We ensure to print and ship orders promptly. However, we are
                  not liable for any consequences or damages from production
                  delays, shipping delays by courier, or delivery of ordered
                  products.
                </p>
                <p>
                  HOF Pack is not liable for unexpected equipment failure,
                  malfunction, or technical problems that may cause printing or
                  shipping delays. In case of delays in the printing or shipping
                  processes, HOF Pack refunds or waives rush charges or expedite
                  fees only where applicable.
                </p>
                <p className="font-semibold text-[#1a1a1a]">
                  Orders must not be cancelled due to delays in the printing or
                  shipping processes.
                </p>
              </div>
            </div>

            {/* 4. Customs & International Shipments */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  4
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Customs &amp; International Shipments
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  All customers must agree to pay all customs duties and fees on
                  goods shipped to their respective locations. For shipments
                  delivered outside the United States, customers must clear all
                  custom duties independently.
                </p>
              </div>
            </div>

            {/* 5. Holidays */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  5
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Holidays
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  HOF Pack observes the following days as holidays. These days
                  should not be counted as business days for processing and
                  shipping:
                </p>
                <ul className="mt-2 list-none space-y-1.5">
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
                    New Year&apos;s Day (January 1st)
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
                    Martin Luther King Day
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
                    President Day
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
                    Memorial Day
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
                    Independence Day (July 4th)
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
                    Labor Day
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
                    Columbus Day
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
                    Veterans Day
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
                    Thanksgiving Day
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
                    The day after Thanksgiving Day
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
                    Christmas Eve (December 24th)
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
                    Christmas Day (December 25th)
                  </li>
                </ul>
              </div>
            </div>

            {/* 6. Contact Us */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  6
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
