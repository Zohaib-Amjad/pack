"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

export default function CustomHeader() {
  return (
    <header className="border-b border-[#d9ddd9] bg-white sticky top-0 z-[100] w-full">
      {/* Top Banner Bar */}
      <div className="hidden h-6 items-center justify-center gap-5 bg-[#1f5a38] px-4 text-[10px] text-white/85 lg:flex">
        <span className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-[#f19a48]"></span>
          Earth-Friendly Packaging
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-[#f19a48]"></span>
          Low MOQ
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-[#f19a48]"></span>
          Free Design Support
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-[#f19a48]"></span>
          Worldwide Shipping
        </span>
      </div>

      {/* Main Header Container */}
      <div className="mx-auto flex h-[66px] w-full max-w-[1280px] items-center justify-between px-4 sm:px-8 gap-3">
        <Link className="block shrink-0" href="/custompackaging">
          <Image
            alt="HOF Pack"
            src="/images/brand/logo-green-orange.png"
            width={256}
            height={154}
            priority
            className="block shrink-0 h-auto w-[90px] sm:w-[110px]"
          />
        </Link>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="tel:+18884294881"
            aria-label="Call +1 (888) 429 4881"
            className="hidden h-10 items-center gap-1.5 rounded-md border border-[#d9ddd9] px-4 text-[13px] font-medium leading-none text-[#2e2e2e] transition-colors hover:border-[#b8bdb9] sm:inline-flex"
          >
            <Phone className="h-3.5 w-3.5 text-[#ee7a1b]" />
            Talk to Our Team
          </a>

          <Link
            href="/custom-quote"
            className="inline-flex h-10 items-center justify-center rounded-[8px] bg-[#ee7a1b] px-4 text-[12px] font-semibold leading-none text-white transition-colors hover:bg-[#d46710] sm:px-5 shrink-0"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
