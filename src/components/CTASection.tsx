"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}

const CTASection = ({
  title = "Let's build something great together.",
  subtitle = "Get your custom packaging quote today — free design support included.",
  buttonLabel = "Get a Quote",
}: CTASectionProps) => {
  const { open } = useQuoteModal();

  return (
    <section className="border-t-[3px] border-accent bg-[#2d5c3e] text-white">
      <div className="mx-auto max-w-[1100px] px-4 py-10 text-center sm:px-10">
        <h2 className="font-display text-[24px] font-semibold text-white sm:text-[28px]">
          {title}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-[13px] text-white/65 sm:text-sm">
          {subtitle}
        </p>
        <Button
          type="button"
          onClick={() => open()}
          className="mt-4 rounded-md bg-accent px-7 py-[11px] text-[12px] font-medium uppercase tracking-[0.12em] text-white hover:bg-[#c45a18]"
        >
          {buttonLabel}
          <ArrowRight size={16} />
        </Button>
      </div>
    </section>
  );
};

export default CTASection;