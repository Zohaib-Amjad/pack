import LegalPage from "@/components/LegalPage";
import Link from "next/link";

export default function ShippingPolicyView() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Shipping Policy"
      subtitle="Everything you need to know about how we ship your custom packaging orders across the USA."
      lastUpdated="January 1, 2026"
      sections={[
        {
          heading: "Overview",
          content: (
            <p>
              HOF Pack aims to meet indicated production and shipping timelines, but shipping dates are
              estimates and not guarantees unless explicitly stated. We are not liable for delays caused
              by carriers, customs, weather, technical issues, or other circumstances beyond our direct
              control. Customers are responsible for any applicable customs duties, taxes, and for
              providing accurate shipping information.
            </p>
          ),
        },
        {
          heading: "Standard Shipping Time",
          content: (
            <>
              <p>
                Shipping time is not guaranteed by HOF Pack. Once your order is dispatched, you can track
                it from the courier company&apos;s website. Shipment and delivery dates are calculated based
                upon estimates provided by our suppliers and recent order history.
              </p>
              <ul className="list-none space-y-2 mt-2">
                {[
                  "We provide free shipping within the 48 contiguous states of the USA.",
                  "We ship within 10 to 14 business days after final proof approval.",
                  "Rush orders (within 8 business days) require prior authorization from HOF Pack.",
                  "Final proof and approvals must be received by 11:00 AM EST — otherwise one business day will be added to the shipping timeline.",
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
          heading: "Liability & Delays",
          content: (
            <>
              <p>
                We ensure to print and ship orders promptly. However, we are not liable for any
                consequences or damages from production delays, shipping delays by courier, or delivery
                of ordered products.
              </p>
              <p>
                HOF Pack is not liable for unexpected equipment failure, malfunction, or technical
                problems that may cause printing or shipping delays. In case of delays in the printing
                or shipping processes, HOF Pack refunds or waives rush charges or expedite fees only
                where applicable.
              </p>
              <p className="font-semibold text-[#1a1a1a]">
                Orders must not be cancelled due to delays in the printing or shipping processes.
              </p>
            </>
          ),
        },
        {
          heading: "Customs & International Shipments",
          content: (
            <p>
              All customers must agree to pay all customs duties and fees on goods shipped to their
              respective locations. For shipments delivered outside the United States, customers must
              clear all custom duties independently.
            </p>
          ),
        },
        {
          heading: "Holidays",
          content: (
            <>
              <p>
                HOF Pack observes the following days as holidays. These days should not be counted as
                business days for processing and shipping:
              </p>
              <ul className="list-none space-y-1.5 mt-2">
                {[
                  "New Year's Day (January 1st)",
                  "Martin Luther King Day",
                  "President Day",
                  "Memorial Day",
                  "Independence Day (July 4th)",
                  "Labor Day",
                  "Columbus Day",
                  "Veterans Day",
                  "Thanksgiving Day",
                  "The day after Thanksgiving Day",
                  "Christmas Eve (December 24th)",
                  "Christmas Day (December 25th)",
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
          heading: "Contact Us",
          content: (
            <p>
              If you have any queries or need to start a claim, please contact our customer service team at{" "}
              <Link href="mailto:info@hofpack.com" className="text-accent hover:text-[var(--ds-orange-hover)] underline underline-offset-2 transition-colors">
                info@hofpack.com
              </Link>{" "}
              or call{" "}
              <Link href="tel:+18884294881" className="text-accent hover:text-[var(--ds-orange-hover)] underline underline-offset-2 transition-colors">
                +1 (888) 429-4881
              </Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
