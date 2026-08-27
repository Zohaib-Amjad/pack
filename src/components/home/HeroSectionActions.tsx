"use client";

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
  const primaryIsQuote = isQuoteModalHref(primaryCta.href);

  return (
    <div className="flex flex-row items-center justify-start gap-3">
      {primaryIsQuote ? (
        <button
          type="button"
          onClick={() => open()}
          className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-white bg-accent hover:bg-[var(--ds-orange-hover)] rounded-[5px] transition-colors cursor-pointer border-0 flex-none text-center"
          style={{ fontSize: 11, padding: "12px 18px", letterSpacing: "0.02em" }}
        >
          <ArrowRight size={14} strokeWidth={2.5} /> {primaryCta.label || "Get Your FREE Quote"}
        </button>
      ) : (
        <Link
          href={primaryCta.href}
          prefetch={false}
          className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-white bg-accent hover:bg-[var(--ds-orange-hover)] rounded-[5px] transition-colors flex-none text-center"
          style={{ fontSize: 11, padding: "12px 18px", letterSpacing: "0.02em" }}
        >
          <ArrowRight size={14} strokeWidth={2.5} /> {primaryCta.label || "Get Your FREE Quote"}
        </Link>
      )}
      <Link
        href={secondaryCta.href}
        prefetch={false}
        className="inline-flex items-center justify-center font-sans font-bold text-white bg-[#1f5a38] hover:bg-[#174d30] rounded-[5px] transition-colors border border-[#1f5a38] flex-none text-center"
        style={{ fontSize: 11, padding: "11px 16px", letterSpacing: "0.02em" }}
      >
        {secondaryCta.label || "View All Products"} →
      </Link>
    </div>
  );
}