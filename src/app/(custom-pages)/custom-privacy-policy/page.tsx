import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | HOF Pack Custom Packaging",
  description:
    "Your privacy matters to us. This policy explains what data we collect, how we use it, and your rights.",
};

export default function CustomPrivacyPolicyPage() {
  return (
    <main>
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#1f5a38_45%,#2a6b45_100%)] px-4 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#ee7a1b]">
            Legal
          </p>
          <h1 className="mb-4 text-[40px] font-semibold leading-[1.05] text-white sm:text-[52px]">
            Privacy Policy
          </h1>
          <p className="mx-auto max-w-[520px] text-[14px] leading-[1.7] text-white/80">
            Your privacy matters to us. This policy explains what data we collect,
            how we use it, and your rights.
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-white/45">
            Last updated: January 1, 2026
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-10">
            {/* 1. Information We Collect */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  1
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Information We Collect
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  We collect information you provide directly, including your name,
                  email address, phone number, and shipping address when you
                  request a quote, place an order, or contact us.
                </p>
                <p>
                  We also automatically collect certain technical data when you visit
                  our website, such as your IP address, browser type, pages
                  visited, and time spent on pages, through cookies and similar
                  technologies.
                </p>
              </div>
            </div>

            {/* 2. How We Use Your Information */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  2
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  How We Use Your Information
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>We use the information we collect to:</p>
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
                    Process and fulfill your orders
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
                    Communicate with you about your orders and inquiries
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
                    Send you quotes, invoices, and order updates
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
                    Improve our website and services
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
                    Send marketing communications (with your consent)
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
                    Comply with legal obligations
                  </li>
                </ul>
              </div>
            </div>

            {/* 3. Cookies */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  3
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Cookies
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  We use cookies to enhance your browsing experience, analyze
                  site traffic, and personalize content. You can control cookie
                  settings through your browser preferences.
                </p>
                <p>
                  Essential cookies are required for the website to function.
                  Analytics and marketing cookies are optional and only set with
                  your consent.
                </p>
              </div>
            </div>

            {/* 4. Data Sharing */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  4
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Data Sharing
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  No mobile information will be shared with third
                  parties/affiliates for marketing/promotional purposes. All
                  other categories exclude text messaging originator opt-in
                  data and consent; this information will not be shared with
                  any third parties.
                </p>
              </div>
            </div>

            {/* 5. Data Retention */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  5
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Data Retention
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  We retain your personal information for as long as necessary to
                  fulfill the purposes outlined in this policy, comply with legal
                  obligations, resolve disputes, and enforce our agreements. Order
                  records are typically retained for 7 years for accounting
                  purposes.
                </p>
              </div>
            </div>

            {/* 6. Your Rights */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  6
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Your Rights
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>Depending on your location, you may have the right to:</p>
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
                    Access the personal data we hold about you
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
                    Request correction of inaccurate data
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
                    Request deletion of your data
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
                    Opt out of marketing communications at any time
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
                    Lodge a complaint with your local data protection authority
                  </li>
                </ul>
                <p className="mt-2">
                  To exercise any of these rights, please contact us at{" "}
                  <a
                    href="mailto:info@hofpack.com"
                    className="text-[#ee7a1b] underline underline-offset-2 transition-colors hover:text-[#d46710]"
                  >
                    info@hofpack.com
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* 7. Security */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  7
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Security
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  We implement industry-standard security measures to protect your
                  personal information, including SSL encryption, secure servers,
                  and access controls. However, no method of transmission over
                  the internet is 100% secure, and we cannot guarantee absolute
                  security.
                </p>
              </div>
            </div>

            {/* 8. Changes to This Policy */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  8
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Changes to This Policy
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of significant changes by posting the new policy on
                  this page with an updated date. We encourage you to review this
                  policy periodically.
                </p>
              </div>
            </div>

            {/* 9. Contact Us */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                  9
                </span>
                <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                  Contact Us
                </h2>
              </div>
              <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                <p>
                  If you have questions or concerns about this Privacy Policy,
                  please contact us at{" "}
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
