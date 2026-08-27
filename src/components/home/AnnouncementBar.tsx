"use client";

import React from "react";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";

export function AnnouncementBar() {
  const { openQuoteModal } = useQuoteModal();
  const bannerText = "Flat 20% Off on Your First Order • Free Shipping on All Orders • Fastest Turnaround: 8 to 10 Days Delivery • Low MOQ Starting at 100 Units";
  const repeatedText = `${bannerText} • ${bannerText} • ${bannerText} • ${bannerText}`;

  return (
    <aside
      aria-label="Announcement"
      className="bg-[#1e3d2b] text-white py-2 px-4 text-[11.5px] font-medium border-b border-[#2d5c3e]/40 overflow-hidden cursor-pointer hover:bg-[#234732] transition-colors"
      onClick={() => openQuoteModal()}
    >
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="flex w-max animate-marquee space-x-6 items-center whitespace-nowrap">
          <span className="text-emerald-100/90 font-medium">
            {repeatedText}
          </span>
        </div>
      </div>
    </aside>
  );
}