"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { isQuoteModalHref } from "@/lib/cms-cta";
import type { CmsHomeHero } from "@/types/cms";

type HeroSectionActionsProps = {
  primaryCta: CmsHomeHero["primaryCta"];
  secondaryCta: CmsHomeHero["secondaryCta"];
};

export default function HeroSectionActions({ primaryCta, secondaryCta }: HeroSectionActionsProps) {
  const { open } = useQuoteModal();
  const primaryHref = primaryCta?.href?.trim() || "#quote";
  const secondaryHref = secondaryCta?.href?.trim() || "/catalog";
  const primaryIsQuote = isQuoteModalHref(primaryHref);
  const primaryLabel = primaryCta?.label?.trim() || "Get Your FREE Quote";
  const secondaryLabel = secondaryCta?.label?.trim() || "View All Products";

  return (
    <div className="flex flex-row items-center gap-2 sm:gap-3">
      {primaryIsQuote ? (
        <button
          type="button"
          onClick={() => open()}
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 font-sans font-semibold text-white bg-accent hover:bg-[var(--ds-orange-hover)] rounded-[6px] px-3.5 py-2.5 sm:px-5 sm:py-3 text-[11.5px] sm:text-[12.5px] tracking-wide transition-colors cursor-pointer border-0 shadow-sm whitespace-nowrap"
        >
          <span>{primaryLabel}</span>
          <ArrowRight className="hidden sm:inline-block w-4 h-4 shrink-0" />
        </button>
      ) : (
        <Link
          href={primaryHref}
          prefetch={false}
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 font-sans font-semibold text-white bg-accent hover:bg-[var(--ds-orange-hover)] rounded-[6px] px-3.5 py-2.5 sm:px-5 sm:py-3 text-[11.5px] sm:text-[12.5px] tracking-wide transition-colors shadow-sm whitespace-nowrap"
        >
          <span>{primaryLabel}</span>
          <ArrowRight className="hidden sm:inline-block w-4 h-4 shrink-0" />
        </Link>
      )}

      <Link
        href={secondaryHref}
        prefetch={false}
        className="inline-flex items-center justify-center gap-1.5 sm:gap-2 font-sans font-semibold text-white bg-[#1f5a38] hover:bg-[#174d30] rounded-[6px] px-3.5 py-2.5 sm:px-5 sm:py-3 text-[11.5px] sm:text-[12.5px] tracking-wide border border-[#2e6d47] hover:border-[#388556] transition-colors shadow-sm whitespace-nowrap"
      >
        <span>{secondaryLabel}</span>
        <ArrowRight className="hidden sm:inline-block w-4 h-4 shrink-0" />
      </Link>
    </div>
  );
}