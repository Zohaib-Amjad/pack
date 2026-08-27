"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck, Sparkles, Truck, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/data/seed-data";

interface CTABannerProps {
  onOpenQuote?: () => void;
}

export function CTABanner({ onOpenQuote }: CTABannerProps) {
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-br from-[#1e3d2b] via-[#2d5c3e] to-[#1e3d2b] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
        {/* Background decorative patterns */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-80 h-80 bg-[#e8732a]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-200 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#e8732a]" />
              <span>Flat 20% Off Your First Order</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Let&apos;s Make Something <span className="text-[#e8732a]">Great Together</span>
            </h2>

            <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed">
              Tell us about your packaging project. From free 3D digital mockups to custom production and free doorstep delivery, we handle everything start to finish.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-emerald-700/50">
              <div className="flex items-center gap-2 text-xs text-emerald-200">
                <Truck className="w-4 h-4 text-[#e8732a]" />
                <span>Free USA Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-200">
                <Clock className="w-4 h-4 text-[#e8732a]" />
                <span>8-12 Day Turnaround</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-200 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-[#e8732a]" />
                <span>Price Match Guarantee</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <button
              onClick={handleQuoteClick}
              className="flex-1 bg-[#e8732a] hover:bg-[#c45a18] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group text-base text-center"
            >
              <span>Get Your FREE Quote</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\D/g, "")}`}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-full border border-white/20 transition-all flex items-center justify-center gap-2 text-sm text-center backdrop-blur-sm"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Call {SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}