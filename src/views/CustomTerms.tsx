import CustomLegalPage from "@/components/CustomLegalPage";

export default function CustomTermsView() {
  return (
    <CustomLegalPage
      eyebrow="Legal"
      title="Terms of Service"
      subtitle="Please read these terms carefully before using our website or placing an order with HOF Pack."
      lastUpdated="April 7, 2026"
      sections={[
        {
          heading: "Acceptance of Terms",
          content: (
            <p>
              Kindly have a look at our brand&apos;s terms and conditions on this
              page. Read all the points carefully. By accessing, browsing, or using
              this Site, you acknowledge that you have read, understood, and agree
              to be bound by these Terms and Conditions, along with any additional
              guidelines, policies, or rules that may be posted for specific
              sections or services on the Site. HOF Pack reserves the right to
              change these Terms and Conditions at any time without prior notice.
              Kindly review these every time you access this Site.
            </p>
          ),
        },
        {
          heading: "Copyright, Trademark, and Customer Content",
          content: (
            <>
              <p>
                All content, materials, and software on this Site are protected by
                copyright and other intellectual property laws. You may not copy,
                reproduce, republish, or distribute any part of the Site&apos;s
                content without prior written permission from HOF Pack or the
                relevant rights holder. Otherwise, you will be solely responsible
                for the copyright infringement.
              </p>
              <p className="mt-4">
                Moreover, you are solely responsible for all content (including
                text, images, designs, graphics, and other materials) that you
                upload, submit, or otherwise provide to HOF Pack for inclusion in
                your packaging or printed products (&ldquo;Customer Content&rdquo;).
                You agree that:
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  You will not use any text, image, design, trademark, service
                  mark, or copyrighted work owned by a third party unless you have
                  obtained all necessary permissions and licenses.
                </li>
                <li>
                  Your content will not infringe any third party&apos;s rights,
                  including copyrights, trademarks, privacy, publicity, or other
                  proprietary rights, and will not be libelous, defamatory,
                  unlawful, or indecent.
                </li>
              </ul>
              <p className="mt-4">
                By placing an order with HOF Pack, you represent and warrant that
                you have full authority and all required permissions to use the
                Customer Content, and you authorize HOF Pack to use, reproduce,
                adapt, modify, display, and create derivative works from that
                content as needed to process and produce your order. You are
                responsible for maintaining the confidentiality of your account
                credentials and for all activity that occurs under your account.
              </p>
            </>
          ),
        },
        {
          heading: "Design Files",
          content: (
            <p>
              Unless otherwise agreed, HOF Pack may provide design files in
              low-resolution formats for on-screen viewing. High-resolution or
              source design files may be available upon request and may incur
              additional charges.
            </p>
          ),
        },
        {
          heading: "Artwork, Proofing, and Color",
          content: (
            <>
              <p>
                All artwork and images you submit must meet our technical
                requirements (for example, correct color mode as per Pantone color
                palette, and adequate resolution). HOF Pack is not responsible for
                issues such as fuzzy, distorted, or pixelated printing resulting
                from files that do not meet these specifications.
              </p>
              <p className="mt-4">
                Before production begins, you will receive final artwork proofs and
                order specifications (including, where applicable, quantities,
                production speed, and estimated delivery). You are responsible for
                carefully reviewing and approving all details, including layout,
                spelling, graphics, sizes, and folds. The approved proof is
                considered the final version that will be printed; HOF Pack is not
                liable for errors that were present in the proof and not flagged
                before approval.
              </p>
              <p className="mt-4">
                Due to the nature of printing processes, variations in color and
                density can occur. However, HOF Pack will make reasonable efforts to
                achieve close color consistency. Color-accurate hardcopy proofs may
                be available at an additional charge; without such proofs, minor
                color variation is considered acceptable and does not constitute a
                defect.
              </p>
              <p className="mt-4">
                Unless specifically requested and confirmed in writing, the paper or
                cardstock used for HOF Pack products is not food-grade. If you
                require food-grade or special-purpose materials, you must inform us
                in writing before placing your order.
              </p>
            </>
          ),
        },
        {
          heading: "Order Cancellations",
          content: (
            <p>
              Because each order is customized, all sales are generally final.
              Design fees are non-refundable once work has begun. Order cancellation
              may be possible only during certain production stages and may be
              subject to cancellation fees to cover processing and design work
              already completed. Once an order has entered advanced production or
              has shipped, it may no longer be cancellable.
            </p>
          ),
        },
        {
          heading: "Damaged Products, Refunds, and Returns",
          content: (
            <>
              <p>
                Customers should review all the products for any visible signs of
                damage, and upon finding any, they should be reported to HOF Pack
                and the courier immediately. If HOF Pack is responsible for a
                confirmed production error, our obligation is limited to reprinting
                the order. Refunds or credits are not typically issued.
              </p>
              <p className="mt-4">
                Claims for defects, damage, or missing items must be reported within
                3 business days after delivery and may require you to return most or
                all of the affected products, at your cost, for inspection and
                replacement.
              </p>
            </>
          ),
        },
        {
          heading: "Shipping",
          content: (
            <>
              <p>
                HOF Pack aims to meet indicated production and shipping timelines,
                but shipping dates are estimates and not guarantees unless explicitly
                stated. We are not liable for delays caused by carriers, customs,
                weather, technical issues, or other circumstances beyond our direct
                control.
              </p>
              <p className="mt-4">
                Customers are responsible for any applicable customs duties, taxes,
                and for providing accurate shipping information.
              </p>
            </>
          ),
        },
        {
          heading: "Limitation of Liability",
          content: (
            <p>
              The Site and its content are provided on an &ldquo;as-is&rdquo; basis,
              without warranties of any kind, express or implied. To the maximum
              extent permitted by law, HOF Pack and its partners shall not be liable
              for any indirect, incidental, special, or consequential damages
              arising out of your use of the Site or our products and services, or
              from any delays, errors, or interruptions in service.
            </p>
          ),
        },
        {
          heading: "Holidays",
          content: (
            <>
              <p>
                HOF Pack observes the following days as holidays, and they should
                not be counted as business days:
              </p>
              <ul className="mt-2 grid grid-cols-1 gap-x-8 gap-y-1 list-disc pl-5 sm:grid-cols-2">
                <li>New Year&apos;s Day (January 1st)</li>
                <li>Martin Luther King Day</li>
                <li>President Day</li>
                <li>Memorial Day</li>
                <li>Independence Day (July 4th)</li>
                <li>Labor Day</li>
                <li>Columbus Day</li>
                <li>Veterans Day</li>
                <li>Thanksgiving Day</li>
                <li>The day after Thanksgiving Day</li>
                <li>Christmas Eve (December 24th)</li>
                <li>Christmas Day (December 25th)</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Contact",
          content: (
            <p>
              For questions about these Terms of Service, please contact us at{" "}
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
