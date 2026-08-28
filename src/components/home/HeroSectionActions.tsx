"use client";

import Link from "next/link";
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
    <div className="flex flex-row items-center justify-start gap-3">
      {primaryIsQuote ? (
        <button
          type="button"
          onClick={() => open()}
          className="inline-flex items-center justify-center font-sans font-semibold text-white bg-accent hover:bg-[var(--ds-orange-hover)] rounded-[5px] transition-colors cursor-pointer border-0 flex-none text-center"
          style={{ fontSize: 11, padding: "12px 18px", letterSpacing: "0.02em" }}
        >
          {primaryLabel}
        </button>
      ) : (
        <Link
          href={primaryHref}
          prefetch={false}
          className="inline-flex items-center justify-center font-sans font-semibold text-white bg-accent hover:bg-[var(--ds-orange-hover)] rounded-[5px] transition-colors flex-none text-center"
          style={{ fontSize: 11, padding: "12px 18px", letterSpacing: "0.02em" }}
        >
          {primaryLabel}
        </Link>
      )}
      <Link
        href={secondaryHref}
        prefetch={false}
        className="inline-flex items-center justify-center font-sans font-bold text-white bg-[#1f5a38] hover:bg-[#174d30] rounded-[5px] transition-colors border border-[#1f5a38] flex-none text-center"
        style={{ fontSize: 11, padding: "11px 16px", letterSpacing: "0.02em" }}
      >
        {secondaryLabel}
      </Link>
    </div>
  );
}