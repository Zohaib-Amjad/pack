"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import HofPackLogo from "@/components/HofPackLogo";

const SALES_PHONE = "+18884294881";
const SALES_PHONE_DISPLAY = "+1 (888) 429 4881";

const utilityItems = [
  "Earth-Friendly Packaging",
  "Low MOQ",
  "Free Design Support",
  "Worldwide Shipping",
];

const policyLinks = [
  { label: "Privacy Policy", href: "/custom-privacy-policy" },
  { label: "Terms of Service", href: "/custom-terms" },
  { label: "Refund Policy", href: "/custom-refund-policy" },
  { label: "Shipping Policy", href: "/custom-shipping-policy" },
];

const pageLinks = [
  { label: "Custom Packaging", href: "/custompackaging" },
  { label: "Our Products", href: "/our-products" },
  { label: "Get a Quote", href: "/custom-quote" },
  { label: "Learn More", href: "/learn-more" },
  { label: "Exclusive Offer", href: "/exclusive-offer" },
  { label: "Custom Packaging", href: "/custom-packaging-solutions" },
  { label: "Contact Us", href: "/contactus-s" },
];

interface CustomPackingShellProps {
  children: ReactNode;
  onGetQuoteClick?: () => void;
}

export default function CustomPackingShell({
  children,
  onGetQuoteClick,
}: CustomPackingShellProps) {
  return (
    <div
      className="min-h-screen bg-[#f6f7f7]"
      style={{
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <header className="border-b border-[#d9ddd9] bg-white">
        <div className="hidden h-6 items-center justify-center gap-5 bg-[#1f5a38] px-4 text-[10px] text-white/85 lg:flex">
          {utilityItems.map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[#f19a48]" />
              {item}
            </span>
          ))}
        </div>

        <div className="mx-auto flex h-[66px] w-full max-w-[1280px] items-center justify-between px-[16px] sm:px-[32px]">
          <Link href="/custompackaging" className="block">
            <HofPackLogo variant="light" className="h-auto w-[90px] sm:w-[110px]" />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${SALES_PHONE}`}
              aria-label={`Call ${SALES_PHONE_DISPLAY}`}
              className="hidden h-10 items-center gap-1.5 rounded-md border border-[#d9ddd9] px-4 text-[13px] font-medium leading-none text-[#2e2e2e] transition-colors hover:border-[#b8bdb9] lg:inline-flex"
            >
              <Phone size={14} />
              Talk to Our Team
            </a>
            {onGetQuoteClick ? (
              <button
                type="button"
                onClick={onGetQuoteClick}
                className="inline-flex h-10 items-center rounded-[8px] bg-[#ee7a1b] px-4 text-[12px] font-semibold leading-none text-white transition-colors hover:bg-[#d46710] sm:px-5"
              >
                Get a Quote
              </button>
            ) : (
              <Link
                href="/custompackaging#quote-form"
                className="inline-flex h-10 items-center rounded-[8px] bg-[#ee7a1b] px-4 text-[12px] font-semibold leading-none text-white transition-colors hover:bg-[#d46710] sm:px-5"
              >
                Get a Quote
              </Link>
            )}
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-[#e4e4e4] bg-white">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-4 py-5 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 text-[14px] text-[#4f5956]">
              <Link href="/custompackaging" className="block">
                <HofPackLogo variant="light" className="h-auto w-[60px]" />
              </Link>
              <span>Custom packaging for growing brands</span>
            </div>
            <p className="text-[14px] text-[#4f5956]">
              © 2026 Hof Pack. All rights reserved.
            </p>
          </div>

          {/* Page links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#ececec] pt-3 text-[12px] text-[#5e6664]">
            {pageLinks.map((link) => (
              <Link key={link.href} href={link.href} className="font-medium transition-colors hover:text-[#1f5a38]">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Policy links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#ececec] pt-3 text-[12px] text-[#5e6664]">
            {policyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-[#1f5a38]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}