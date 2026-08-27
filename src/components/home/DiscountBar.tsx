"use client";

import { ArrowRight } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";

const DiscountBar = () => {
  const { open } = useQuoteModal();

  return (
    <div className="bg-[#2d5c3e] px-4 sm:px-10 py-8 sm:py-[28px]">
      <div className="mx-auto flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left gap-5" style={{ maxWidth: 1100 }}>
        <div>
          <div className="font-sans font-semibold uppercase text-white/55"
            style={{ fontSize: 11, letterSpacing: "0.18em", marginBottom: 6 }}>
            Limited time offer
          </div>
          <div className="font-display text-white" style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 700 }}>
            Flat 20% Off Your First Order
          </div>
          <div className="font-sans text-white/70" style={{ fontSize: 13, marginTop: 4 }}>
            Free design support + free 3D mock-up included. No minimum spend.
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 flex-shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => open()}
            className="inline-flex items-center justify-center gap-2 font-sans font-bold text-white rounded-[5px] transition-colors cursor-pointer border-0 hover:bg-[#c45a18] w-full sm:w-auto"
            style={{ background: "#e8732a", fontSize: 11, padding: "12px 24px", letterSpacing: "0.02em" }}
          >
            <ArrowRight size={14} strokeWidth={2.5} /> Claim My Discount
          </button>
          <div className="font-sans text-white/55 text-center text-[10px] sm:text-[11px]">
            *Free shipping all US states
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountBar;