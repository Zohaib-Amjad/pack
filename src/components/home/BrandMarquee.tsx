import React from "react";
import { BRAND_CLIENTS } from "@/data/seed-data";
import { ShieldCheck, Star } from "lucide-react";

export function BrandMarquee() {
  const doubleBrands = [...BRAND_CLIENTS, ...BRAND_CLIENTS, ...BRAND_CLIENTS];

  return (
    <section className="py-10 bg-white border-b border-[#e0ddd6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#7a7672] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-[#2d5c3e]" />
          <span>Trusted by 1,000+ growing brands across the USA</span>
        </div>
      </div>

      {/* Infinite scrolling marquee track */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee space-x-10 items-center">
          {doubleBrands.map((brand, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-[#faf8f5] border border-[#e0ddd6] hover:border-[#2d5c3e]/40 transition-colors shadow-sm cursor-default"
            >
              <div className="w-6 h-6 rounded-lg bg-[#2d5c3e] text-white flex items-center justify-center font-black text-xs">
                {brand.name.charAt(0)}
              </div>
              <span className="text-sm font-extrabold text-[#1a1a1a] tracking-tight">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
