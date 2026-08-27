import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function CustomFooter() {
  return (
    <footer className="border-t border-[#e4e4e4] bg-white">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-4 py-5 sm:px-8">
        {/* Top Brand & Copyright Row */}
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 text-[14px] text-[#4f5956]">
            <Link className="block" href="/custompackaging">
              <Image
                alt="HOF Pack"
                src="/images/brand/logo-green-orange.png"
                width={256}
                height={154}
                className="block shrink-0 h-auto w-[60px]"
              />
            </Link>
            <span>Custom packaging for growing brands</span>
          </div>
          <p className="text-[14px] text-[#4f5956]">
            © 2026 Hof Pack. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#ececec] pt-3 text-[12px] text-[#5e6664]">
          <Link
            className="font-medium transition-colors hover:text-[#1f5a38]"
            href="/custompackaging"
          >
            Custom Packaging
          </Link>
          <Link
            className="font-medium transition-colors hover:text-[#1f5a38]"
            href="/our-products"
          >
            Our Products
          </Link>
          <Link
            className="font-medium transition-colors hover:text-[#1f5a38]"
            href="/custom-quote"
          >
            Get a Quote
          </Link>
          <Link
            className="font-medium transition-colors hover:text-[#1f5a38]"
            href="/learn-more"
          >
            Learn More
          </Link>
          <Link
            className="font-medium transition-colors hover:text-[#1f5a38]"
            href="/exclusive-offer"
          >
            Exclusive Offer
          </Link>
          <Link
            className="font-medium transition-colors hover:text-[#1f5a38]"
            href="/custom-packaging-solutions"
          >
            Custom Packaging Solutions
          </Link>
          <Link
            className="font-medium transition-colors hover:text-[#1f5a38]"
            href="/contact-us"
          >
            Contact Us
          </Link>
        </div>

        {/* Legal & Policy Links */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#ececec] pt-3 text-[12px] text-[#5e6664]">
          <Link
            className="transition-colors hover:text-[#1f5a38]"
            href="/custom-privacy-policy"
          >
            Privacy Policy
          </Link>
          <Link
            className="transition-colors hover:text-[#1f5a38]"
            href="/custom-terms"
          >
            Terms of Service
          </Link>
          <Link
            className="transition-colors hover:text-[#1f5a38]"
            href="/custom-refund-policy"
          >
            Refund Policy
          </Link>
          <Link
            className="transition-colors hover:text-[#1f5a38]"
            href="/custom-shipping-policy"
          >
            Shipping Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
