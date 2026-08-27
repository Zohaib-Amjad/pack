import LegalPage from "@/components/LegalPage";
import Link from "next/link";

export default function PrivacyView() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="Your privacy matters to us. This policy explains what data we collect, how we use it, and your rights."
      lastUpdated="January 1, 2026"
      sections={[
        {
          heading: "Information We Collect",
          content: (
            <>
              <p>
                We collect information you provide directly, including your name, email address, phone number, and shipping address when you request a quote, place an order, or contact us.
              </p>
              <p>
                We also automatically collect certain technical data when you visit our website, such as your IP address, browser type, pages visited, and time spent on pages, through cookies and similar technologies.
              </p>
            </>
          ),
        },
        {
          heading: "How We Use Your Information",
          content: (
            <>
              <p>We use the information we collect to:</p>
              <ul className="list-none space-y-1.5 mt-1">
                {[
                  "Process and fulfill your orders",
                  "Communicate with you about your orders and inquiries",
                  "Send you quotes, invoices, and order updates",
                  "Improve our website and services",
                  "Send marketing communications (with your consent)",
                  "Comply with legal obligations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg className="shrink-0 mt-1" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l2.5 2.5L10 3" stroke="#e8732a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          ),
        },
        {
          heading: "Cookies",
          content: (
            <>
              <p>
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.
              </p>
              <p>
                Essential cookies are required for the website to function. Analytics and marketing cookies are optional and only set with your consent.
              </p>
            </>
          ),
        },
        {
          heading: "Data Sharing",
          content: (
            <p>
              No mobile information will be shared with third parties/affiliates for
              marketing/promotional purposes. All other categories exclude text messaging
              originator opt-in data and consent; this information will not be shared with
              any third parties.
            </p>
          ),
        },
        {
          heading: "Data Retention",
          content: (
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Order records are typically retained for 7 years for accounting purposes.
            </p>
          ),
        },
        {
          heading: "Your Rights",
          content: (
            <>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-none space-y-1.5 mt-1">
                {[
                  "Access the personal data we hold about you",
                  "Request correction of inaccurate data",
                  "Request deletion of your data",
                  "Opt out of marketing communications at any time",
                  "Lodge a complaint with your local data protection authority",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg className="shrink-0 mt-1" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l2.5 2.5L10 3" stroke="#e8732a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-2">
                To exercise any of these rights, please contact us at{" "}
                <Link href="mailto:info@hofpack.com" className="text-accent hover:text-[var(--ds-orange-hover)] underline underline-offset-2 transition-colors">
                  info@hofpack.com
                </Link>.
              </p>
            </>
          ),
        },
        {
          heading: "Security",
          content: (
            <p>
              We implement industry-standard security measures to protect your personal information, including SSL encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          ),
        },
        {
          heading: "Changes to This Policy",
          content: (
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date. We encourage you to review this policy periodically.
            </p>
          ),
        },
        {
          heading: "Contact Us",
          content: (
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us at{" "}
              <Link href="mailto:info@hofpack.com" className="text-accent hover:text-[var(--ds-orange-hover)] underline underline-offset-2 transition-colors">
                info@hofpack.com
              </Link>{" "}
              or visit our{" "}
              <Link href="/contact" className="text-accent hover:text-[var(--ds-orange-hover)] underline underline-offset-2 transition-colors">
                contact page
              </Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
