import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/seed-data";
import { ArrowRight, Box, Layers, Sparkles, ShieldCheck, Truck } from "lucide-react";

interface MegaMenuProps {
  onClose: () => void;
  onOpenQuote?: () => void;
}

export function MegaMenu({ onClose, onOpenQuote }: MegaMenuProps) {
  // Group categories into 3 columns: Industry, Material, Style
  const industryCategories = CATEGORIES.slice(0, 6);
  const materialCategories = CATEGORIES.slice(6, 12);
  const styleCategories = CATEGORIES.slice(12);

  return (
    <div className="absolute top-full left-0 w-full bg-white border-b border-[#e0ddd6] shadow-2xl py-8 px-6 z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Column 1: By Industry */}
        <div className="col-span-3 border-r border-[#e0ddd6] pr-6">
          <h3 className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Box className="w-4 h-4 text-[#2d5c3e]" />
            By Industry
          </h3>
          <div className="space-y-1.5">
            {industryCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                onClick={onClose}
                className="group flex items-center justify-between py-2 px-2.5 rounded-xl hover:bg-[#f5f3ee] transition-colors"
              >
                <div className="text-xs font-semibold text-[#1a1a1a] group-hover:text-[#e8732a]">
                  {cat.name}
                </div>
                <ArrowRight className="w-3 h-3 text-[#aaa6a0] group-hover:text-[#e8732a] group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2: By Material */}
        <div className="col-span-3 border-r border-[#e0ddd6] pr-6">
          <h3 className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#2d5c3e]" />
            By Material
          </h3>
          <div className="space-y-1.5">
            {materialCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                onClick={onClose}
                className="group flex items-center justify-between py-2 px-2.5 rounded-xl hover:bg-[#f5f3ee] transition-colors"
              >
                <div className="text-xs font-semibold text-[#1a1a1a] group-hover:text-[#e8732a]">
                  {cat.name}
                </div>
                <ArrowRight className="w-3 h-3 text-[#aaa6a0] group-hover:text-[#e8732a] group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: By Style */}
        <div className="col-span-3 border-r border-[#e0ddd6] pr-6">
          <h3 className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#2d5c3e]" />
            By Style & Specialty
          </h3>
          <div className="space-y-1.5">
            {styleCategories.length > 0
              ? styleCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    onClick={onClose}
                    className="group flex items-center justify-between py-2 px-2.5 rounded-xl hover:bg-[#f5f3ee] transition-colors"
                  >
                    <div className="text-xs font-semibold text-[#1a1a1a] group-hover:text-[#e8732a]">
                      {cat.name}
                    </div>
                    <ArrowRight className="w-3 h-3 text-[#aaa6a0] group-hover:text-[#e8732a] group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))
              : industryCategories.slice(0, 3).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    onClick={onClose}
                    className="group flex items-center justify-between py-2 px-2.5 rounded-xl hover:bg-[#f5f3ee] transition-colors"
                  >
                    <div className="text-xs font-semibold text-[#1a1a1a] group-hover:text-[#e8732a]">
                      {cat.name}
                    </div>
                    <ArrowRight className="w-3 h-3 text-[#aaa6a0] group-hover:text-[#e8732a] group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
            <Link
              href="/catalog"
              onClick={onClose}
              className="block pt-2 text-xs font-bold text-[#e8732a] hover:underline"
            >
              View Full Catalog ({CATEGORIES.length}) →
            </Link>
          </div>
        </div>

        {/* Column 4: Promo Card */}
        <div className="col-span-3 flex flex-col justify-between bg-gradient-to-br from-[#1e3d2b] to-[#2d5c3e] text-white p-6 rounded-2xl">
          <div>
            <span className="inline-block bg-[#e8732a] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
              Limited Offer
            </span>
            <h4 className="text-base font-bold mb-1.5 leading-snug">
              Flat 20% Off on First Order
            </h4>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Free 3D digital mockup, zero plate fees, and 8-12 days delivery.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-emerald-700/50">
            <div className="flex items-center gap-2 text-xs text-emerald-200">
              <Truck className="w-3.5 h-3.5 text-[#e8732a]" />
              <span>Free USA Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e8732a]" />
              <span>Price Match Guarantee</span>
            </div>
            <button
              onClick={() => {
                onClose();
                if (onOpenQuote) onOpenQuote();
              }}
              className="mt-2 w-full bg-[#e8732a] hover:bg-[#c45a18] text-white text-xs font-bold py-2.5 px-4 rounded-full transition-all shadow-md ds-btn text-center"
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
