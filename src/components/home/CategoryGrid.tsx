"use client";

import React from "react";
import Link from "next/link";
import { Category } from "@/data/seed-data";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Box,
  Truck,
  Clock,
  Layers,
} from "lucide-react";

interface CategoryGridProps {
  categories: Category[];
  onOpenQuote?: (categoryName: string) => void;
}

export function CategoryGrid({ categories, onOpenQuote }: CategoryGridProps) {
  const displayCategories = categories.slice(0, 8);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="categories">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 bg-[#eaf2ed] text-[#2d5c3e] text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          <Box className="w-3.5 h-3.5" />
          <span>Shop By Category</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] tracking-tight">
          Find Your <span className="text-[#e8732a]">Perfect Box</span>
        </h2>

        <p className="text-base sm:text-lg text-[#4a4a4a] leading-relaxed">
          Browse our most popular custom packaging styles. Every box is engineered from sustainably sourced materials and fully customizable to fit your brand.
        </p>
      </div>

      {/* Grid of Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {displayCategories.map((cat) => (
          <div
            key={cat.id}
            className="group bg-white rounded-3xl border border-[#e0ddd6] overflow-hidden shadow-soft hover:shadow-soft-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
          >
            <div>
              {/* Card Image / Visual Header */}
              <div className="relative h-52 bg-gradient-to-br from-[#f5f3ee] to-[#ece9e2] p-6 flex flex-col justify-between overflow-hidden border-b border-[#e0ddd6]">
                {/* Top Tags */}
                <div className="flex items-center justify-between z-10">
                  {cat.badge ? (
                    <span className="bg-[#2d5c3e] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {cat.badge}
                    </span>
                  ) : (
                    <span className="bg-[#ece9e2] text-[#4a4a4a] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Custom Box
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-[#e8732a] bg-white/90 px-2.5 py-1 rounded-full shadow-sm">
                    MOQ {cat.moq}
                  </span>
                </div>

                {/* Box Graphic Representation */}
                <div className="flex items-center justify-center my-auto z-10 group-hover:scale-105 transition-transform duration-300">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="max-h-32 w-auto object-contain drop-shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#2d5c3e] border border-[#e0ddd6]">
                      <Box className="w-10 h-10" />
                    </div>
                  )}
                </div>

                {/* Turnaround Pill */}
                <div className="flex items-center justify-between text-[11px] text-[#7a7672] z-10">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3 text-[#2d5c3e]" /> {cat.turnaround}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Truck className="w-3 h-3 text-[#2d5c3e]" /> Free Shipping
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#1a1a1a] group-hover:text-[#e8732a] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#7a7672] mt-1 line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-2 text-xs text-[#4a4a4a] pt-2 border-t border-[#e0ddd6]">
                  {cat.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2d5c3e] flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Footer CTAs */}
            <div className="p-6 pt-0 space-y-2.5">
              <button
                onClick={() => {
                  if (onOpenQuote) onOpenQuote(cat.name);
                }}
                className="w-full bg-[#e8732a] hover:bg-[#c45a18] text-white text-xs font-extrabold py-3 px-4 rounded-full shadow transition-all duration-200 flex items-center justify-center gap-2 group/btn"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <Link
                href={`/${cat.slug}`}
                className="w-full text-center block text-xs font-bold text-[#4a4a4a] hover:text-[#e8732a] py-1.5 transition-colors"
              >
                Learn More & Specs →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom View All Link */}
      <div className="mt-12 text-center">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 bg-white hover:bg-[#ece9e2] text-[#1a1a1a] font-extrabold py-3.5 px-8 rounded-full border border-[#d8d4cc] shadow-sm hover:shadow transition-all text-sm"
        >
          <span>Explore All {categories.length} Packaging Styles</span>
          <ArrowRight className="w-4 h-4 text-[#e8732a]" />
        </Link>
      </div>
    </section>
  );
}