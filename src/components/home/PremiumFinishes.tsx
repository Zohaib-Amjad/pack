"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  ShieldCheck,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";

export interface FinishItem {
  id: string;
  name: string;
  category: "Metallic Foils" | "Tactile & 3D" | "Gloss & UV";
  badge: string;
  src: string;
  summary: string;
  deepDesc: string;
  bestFor: string;
  specs: string[];
  tactileFeel: string;
}

const FINISHES: FinishItem[] = [
  {
    id: "holographic-foiling",
    name: "Holographic Foiling",
    category: "Metallic Foils",
    badge: "Prismatic Light Shift",
    src: "/images/finishes/holographic-foiling.webp",
    summary:
      "Multi-spectrum reflective foil that shifts into a brilliant rainbow sheen under ambient retail lighting.",
    deepDesc:
      "Holographic foil stamping applies micro-embossed foil under heat and pressure. Under light, it produces a shifting rainbow glow that delivers unmatched shelf contrast and unboxing excitement.",
    bestFor: "Cosmetics, beauty serums, tech accessories, vape & limited retail editions.",
    specs: [
      "Vibrant rainbow prismatic reflection",
      "Heat-sealed long-lasting bond",
      "Stunning over matte black & dark tones",
    ],
    tactileFeel: "Ultra-smooth metallic gloss",
  },
  {
    id: "gold-foiling",
    name: "Gold Foil Stamping",
    category: "Metallic Foils",
    badge: "Luxury Gold",
    src: "/images/finishes/gold-foiling.webp",
    summary:
      "Ultra-radiant metallic gold pressed into paperboard for classic prestige, warmth, and brand authority.",
    deepDesc:
      "Hot gold foil stamping uses precision brass dies and thermal pressure to bond mirror-like metallic pigment directly into the packaging board, commanding top-tier retail value.",
    bestFor: "Luxury jewelry, perfumes, spirits, gourmet confections & apparel boxes.",
    specs: [
      "Mirror-like golden reflection",
      "Crisp definition on fine typography",
      "Available in yellow, warm & rose gold",
    ],
    tactileFeel: "Smooth with subtle crisp indentation",
  },
  {
    id: "silver-foiling",
    name: "Silver Foil Stamping",
    category: "Metallic Foils",
    badge: "Chrome Metallic",
    src: "/images/finishes/silver-foiling.webp",
    summary:
      "Modern mirror-chrome foil providing sharp, high-contrast reflections on light and dark paper stock.",
    deepDesc:
      "Silver foil stamping gives packaging a sleek, architectural presence. Its cool-toned mirror sheen accentuates minimalist branding and high-tech product aesthetics.",
    bestFor: "Skincare, consumer tech, modern apparel & luxury candles.",
    specs: [
      "Pristine chrome-silver mirror finish",
      "Scuff and oxidation resistant",
      "High contrast over dark & pastel stock",
    ],
    tactileFeel: "Smooth high-gloss metallic finish",
  },
  {
    id: "spot-uv",
    name: "Spot UV Gloss",
    category: "Gloss & UV",
    badge: "High-Gloss Accent",
    src: "/images/finishes/spot-uv.webp",
    summary:
      "Targeted high-gloss varnish creating sleek tactile contrast against soft-touch matte packaging.",
    deepDesc:
      "Spot UV is cured instantly with ultraviolet light over selected artwork areas. Placed over soft-touch matte lamination, the contrast between silky matte and glassy shine creates immediate tactile appeal.",
    bestFor: "Logos, pattern overlays, folding cartons & mailer box lids.",
    specs: [
      "Stark matte vs. gloss contrast",
      "Deep color saturation & shine",
      "Fingerprint & moisture resistant",
    ],
    tactileFeel: "Smooth, slightly raised glossy coating",
  },
  {
    id: "embossing",
    name: "Embossing (Raised 3D)",
    category: "Tactile & 3D",
    badge: "Raised 3D Relief",
    src: "/images/finishes/embossing.webp",
    summary:
      "Precision matched dies press graphics outward for an elevated, three-dimensional physical touchpoint.",
    deepDesc:
      "Embossing reshapes the paperboard from behind using precision matched male and female dies. It creates raised 3D contours that customers instinctively touch and remember.",
    bestFor: "Logo crests, organic skincare, specialty coffee cartons & luxury mailers.",
    specs: [
      "Multi-level sculpted physical depth",
      "100% ink-free eco-friendly finish",
      "Pairs seamlessly with metallic foil",
    ],
    tactileFeel: "Prominent raised 3D contour",
  },
  {
    id: "debossing",
    name: "Debossing (Sunken 3D)",
    category: "Tactile & 3D",
    badge: "Recessed Impression",
    src: "/images/finishes/debossing.webp",
    summary:
      "Clean architectural impression pressed deep into paperboard for an understated, tactile luxury look.",
    deepDesc:
      "Debossing creates a crisp indentation in the surface of rigid boxes or heavy paperboard, producing a subtle shadow line that feels timeless, refined, and minimalist.",
    bestFor: "Boutique retail, rigid luxury boxes, artisan goods & apparel tags.",
    specs: [
      "Architectural shadow relief",
      "Permanent tactile impression",
      "Ideal on heavy kraft & rigid board",
    ],
    tactileFeel: "Clean indented depression",
  },
];

const CATEGORIES = ["All Finishes", "Metallic Foils", "Tactile & 3D", "Gloss & UV"] as const;

export default function PremiumFinishes() {
  const { open } = useQuoteModal();
  const [activeCategory, setActiveCategory] = useState<string>("All Finishes");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedFinish, setSelectedFinish] = useState<FinishItem | null>(null);

  const filteredFinishes = useMemo(() => {
    if (activeCategory === "All Finishes") return FINISHES;
    return FINISHES.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  const handleOpenModal = useCallback((finish: FinishItem) => {
    setSelectedFinish(finish);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedFinish(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedFinish) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedFinish, handleCloseModal]);

  return (
    <section
      className="border-t border-[#e0ddd6] bg-[#faf8f5] py-14 sm:py-18 lg:py-20 relative overflow-hidden"
      aria-labelledby="premium-finishes-heading"
    >
      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.16em] uppercase text-[#e8732a] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#e8732a]" />
              <span>Packaging Embellishments</span>
            </div>

            <h2
              id="premium-finishes-heading"
              className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#1a1a1a] leading-tight"
            >
              Elevate Your Packaging With{" "}
              <span className="text-[#e8732a]">Premium Finishes</span>
            </h2>

            <p className="text-[#666] text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
              Specialty finishing techniques that maximize tactile appeal, light reflection, and shelf presence.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[#e0ddd6] shadow-xs overflow-x-auto [scrollbar-width:none]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#7a7672] ml-2 mr-1 hidden sm:block shrink-0" />
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setHoveredIndex(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#2d5c3e] text-white shadow-xs"
                      : "text-[#5a5652] hover:text-[#1a1a1a] hover:bg-[#f5f3ee]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 21st.dev Style Hover Reveal Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredFinishes.map((finish, idx) => {
            const isHovered = hoveredIndex === idx;
            const isOtherHovered = hoveredIndex !== null && !isHovered;

            return (
              <div
                key={finish.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(idx)}
                onBlur={() => setHoveredIndex(null)}
                tabIndex={0}
                onClick={() => handleOpenModal(finish)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenModal(finish);
                  }
                }}
                className={`group relative h-[380px] sm:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border outline-none focus-visible:ring-2 focus-visible:ring-[#e8732a] flex flex-col justify-end p-5 sm:p-6 ${
                  isOtherHovered
                    ? "blur-[2.5px] opacity-50 scale-[0.98] border-[#e2ded6]"
                    : isHovered
                    ? "scale-[1.02] shadow-[0_16px_36px_rgba(45,92,62,0.15)] z-20 border-[#2d5c3e]/70 ring-2 ring-[#2d5c3e]/20"
                    : "border-[#e0ddd6] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#d0ccc3]"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={finish.src}
                  alt={finish.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Gradient Overlay for optimal readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10 transition-opacity duration-300" />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[#2d5c3e]/30 via-transparent to-transparent transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
                  <span className="bg-white/95 backdrop-blur-md text-[#1a1a1a] px-2.5 py-1 rounded-full text-[9.5px] font-bold tracking-wider uppercase border border-black/5 shadow-xs">
                    {finish.category}
                  </span>

                  <span className="bg-[#e8732a] text-white px-2.5 py-1 rounded-full text-[9.5px] font-bold tracking-wide shadow-xs">
                    {finish.badge}
                  </span>
                </div>

                {/* Bottom Content & Interactive Reveal */}
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#fcd34d]">
                    <Sparkles className="w-3 h-3 text-[#fcd34d]" />
                    <span>{finish.tactileFeel}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-[#fcd34d] transition-colors">
                    {finish.name}
                  </h3>

                  <p className="text-xs sm:text-[12.5px] text-white/85 leading-relaxed line-clamp-2">
                    {finish.summary}
                  </p>

                  {/* Slide-Up Specs & Actions on Hover */}
                  <div
                    className={`pt-2 flex items-center justify-between gap-2.5 transition-all duration-300 ${
                      isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        open();
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e8732a] hover:bg-[#d6651e] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(finish);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white/25 hover:bg-white/35 backdrop-blur-md text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-[#2d5c3e] text-white border border-[#234b32] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">
                Unsure which finish fits your packaging budget & substrate?
              </p>
              <p className="text-[11px] sm:text-xs text-white/80 mt-0.5">
                Our packaging engineers provide free 3D digital mockups with foil & UV simulations.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => open()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1a1a1a] hover:bg-[#faf8f5] text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer shrink-0"
          >
            <span>Consult With a Packaging Specialist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Deep Finish Inspection Modal */}
      {selectedFinish && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="finish-modal-title"
        >
          <div
            className="relative w-full max-w-2xl bg-white border border-[#e0ddd6] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-[#1a1a1a] flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative h-56 sm:h-64 w-full bg-[#1a1a1a] overflow-hidden shrink-0">
              <Image
                src={selectedFinish.src}
                alt={selectedFinish.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="bg-[#e8732a] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {selectedFinish.category}
                </span>
                <h3
                  id="finish-modal-title"
                  className="text-2xl sm:text-3xl font-bold text-white mt-1.5"
                >
                  {selectedFinish.name}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7a7672] mb-1.5">
                  Overview & Technique
                </h4>
                <p className="text-sm text-[#4a4a4a] leading-relaxed">
                  {selectedFinish.deepDesc}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7a7672] mb-2">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedFinish.specs.map((spec) => (
                    <div
                      key={spec}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e5df] text-xs text-[#2a2a2a]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2d5c3e] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7a7672] mb-1">
                  Best Suited For
                </h4>
                <p className="text-xs sm:text-sm text-[#4a4a4a] leading-relaxed">
                  {selectedFinish.bestFor}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#e0ddd6] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-[#666]">
                  Tactile Feel: <strong className="text-[#1a1a1a]">{selectedFinish.tactileFeel}</strong>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#f5f3ee] hover:bg-[#e8e5df] text-xs font-semibold text-[#1a1a1a] transition-colors cursor-pointer border border-[#e0ddd6]"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleCloseModal();
                      open();
                    }}
                    className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-[#e8732a] hover:bg-[#d6651e] text-xs font-bold text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Get a Quote with This Finish</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
