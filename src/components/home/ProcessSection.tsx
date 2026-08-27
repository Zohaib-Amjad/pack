"use client";

import React from "react";
import { PROCESS_STEPS } from "@/data/seed-data";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

interface ProcessSectionProps {
  onOpenQuote?: () => void;
}

export function ProcessSection({ onOpenQuote }: ProcessSectionProps) {
  const handleQuoteClick = () => {
    if (onOpenQuote) {
      onOpenQuote();
    } else {
      const quoteEl = document.getElementById("quote");
      if (quoteEl) {
        quoteEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#f5f3ee] to-[#faf8f5] border-b border-[#e0ddd6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-[#eaf2ed] text-[#2d5c3e] text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple 4-Step Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] tracking-tight">
            From Idea to <span className="text-[#e8732a]">Your Door</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4a4a4a] leading-relaxed">
            Four streamlined steps. Clear timelines. Unlimited revisions. No hidden freight or die fees.
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PROCESS_STEPS.map((item, idx) => (
            <div
              key={item.step}
              className="relative bg-white rounded-3xl p-7 border border-[#e0ddd6] shadow-soft hover:shadow-soft-lg transition-all duration-200 flex flex-col justify-between"
            >
              {/* Step Number */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1e3d2b] to-[#2d5c3e] text-white flex items-center justify-center font-black text-lg shadow-sm">
                    {item.step}
                  </span>
                  <span className="text-xs font-bold text-[#7a7672]">
                    Step {idx + 1} of 4
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1a1a1a]">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#7a7672] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bullet Points */}
              <ul className="mt-6 pt-4 border-t border-[#e0ddd6] space-y-2 text-xs text-[#4a4a4a]">
                {item.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2d5c3e] flex-shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={handleQuoteClick}
            className="inline-flex items-center gap-2 bg-[#e8732a] hover:bg-[#c45a18] text-white font-extrabold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base group"
          >
            <span>Start Your Packaging Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}