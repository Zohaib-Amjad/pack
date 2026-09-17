"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  X,
  ExternalLink,
  ShieldCheck,
  Eye,
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
    summary: "Multi-spectrum reflective foil that shifts into a brilliant rainbow sheen under ambient light.",
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
    summary: "Ultra-radiant metallic gold pressed into paperboard for classic prestige and brand authority.",
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
    summary: "Modern mirror-chrome foil providing sharp, high-contrast reflections on light and dark stock.",
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
    summary: "Targeted high-gloss varnish creating sleek tactile contrast against matte packaging.",
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
    summary: "Precision matched dies press graphics outward for an elevated, three-dimensional physical touchpoint.",
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
    summary: "Clean architectural impression pressed deep into paperboard for an understated luxury look.",
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
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedFinish, setSelectedFinish] = useState<FinishItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredFinishes = useMemo(() => {
    if (activeCategory === "All Finishes") return FINISHES;
    return FINISHES.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  const loopFinishes = useMemo(() => {
    return [...filteredFinishes, ...filteredFinishes, ...filteredFinishes];
  }, [filteredFinishes]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const distance = 320;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedFinish) {
        setSelectedFinish(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedFinish]);

  return (
    <section
      className="border-t border-[#e0ddd6] bg-[#f5f3ee] py-12 sm:py-16 relative overflow-hidden select-none"
      aria-labelledby="premium-finishes-heading"
    >
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 z-10">
        {/* Clean Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#e8732a] mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Packaging Embellishments</span>
            </div>

            <h2
              id="premium-finishes-heading"
              className="font-display text-[#1a1a1a] text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight"
            >
              Elevate Your Packaging With <span className="text-[#e8732a]">Premium Finishes</span>
            </h2>

            <p className="font-sans text-[#7a7672] text-xs sm:text-sm mt-1.5 max-w-xl">
              Specialty finishing techniques that maximize tactile appeal, light reflection, and shelf presence.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2.5 self-start md:self-end">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#e0ddd6] text-xs font-semibold text-[#1a1a1a] hover:bg-[#faf8f5] transition-all cursor-pointer shadow-xs"
              title={isPlaying ? "Pause sliding" : "Resume sliding"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-[#e8732a] fill-[#e8732a]" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#2d5c3e] fill-[#2d5c3e]" />
                  <span>Play</span>
                </>
              )}
            </button>

            <div className="inline-flex items-center gap-1 bg-white p-1 rounded-lg border border-[#e0ddd6] shadow-xs">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                aria-label="Previous finish"
                className="w-7 h-7 rounded flex items-center justify-center text-[#7a7672] hover:text-[#1a1a1a] hover:bg-[#f5f3ee] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                aria-label="Next finish"
                className="w-7 h-7 rounded flex items-center justify-center text-[#7a7672] hover:text-[#1a1a1a] hover:bg-[#f5f3ee] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Minimalist Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-5 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1a1a1a] text-white shadow-xs"
                    : "bg-white/80 hover:bg-white text-[#5a5652] hover:text-[#1a1a1a] border border-[#e0ddd6]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTINUOUS SLIDING TRACK */}
      <div className="relative w-full overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#f5f3ee] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#f5f3ee] to-transparent z-20 pointer-events-none" />

        <div
          ref={scrollContainerRef}
          className="flex items-stretch overflow-x-auto scrollbar-none py-3 px-4 sm:px-8 cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: "smooth" }}
        >
          <div
            className="flex items-stretch gap-4 sm:gap-5 flex-shrink-0 animate-marquee-finishes"
            style={{
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          >
            {loopFinishes.map((finish, idx) => (
              <article
                key={`${finish.id}-${idx}`}
                onClick={() => setSelectedFinish(finish)}
                className="w-[260px] sm:w-[280px] bg-white rounded-xl border border-[#e0ddd6] shadow-xs hover:shadow-md hover:border-[#e8732a]/40 transition-all duration-200 flex flex-col overflow-hidden group/card cursor-pointer flex-shrink-0"
              >
                {/* Visual Header */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#ece9e2]">
                  <Image
                    src={finish.src}
                    alt={finish.name}
                    fill
                    sizes="280px"
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-[#1a1a1a]/80 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-white/10">
                    {finish.badge}
                  </div>

                  {/* Tactile hint at bottom of image */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white/90 text-[10.5px] font-medium truncate">
                    {finish.tactileFeel}
                  </div>
                </div>

                {/* Clean, Readable Body */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="font-display font-bold text-[#1a1a1a] text-[15px] sm:text-[16px] group-hover/card:text-[#e8732a] transition-colors mb-1.5">
                      {finish.name}
                    </h3>

                    <p className="font-sans text-[#5a5652] text-xs leading-relaxed line-clamp-2 mb-3">
                      {finish.summary}
                    </p>
                  </div>

                  {/* Footer with Clickable CTA */}
                  <div className="pt-2.5 border-t border-[#f0eee9] flex items-center justify-between text-[11.5px] font-semibold">
                    <span className="text-[#7a7672] text-[11px] truncate max-w-[150px]">
                      {finish.bestFor.split(",")[0]}
                    </span>
                    <span className="text-[#e8732a] group-hover/card:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                      <span>Inspect</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Clean Bottom Mini Bar */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 mt-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-xl px-5 py-3.5 border border-[#e0ddd6] shadow-2xs">
          <p className="font-sans text-xs text-[#5a5652] text-center sm:text-left">
            <strong className="text-[#1a1a1a] font-semibold">Combined Finishes:</strong> We combine Foil Stamping + Spot UV + Embossing on the same run.
          </p>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => open()}
              className="font-sans font-bold text-white bg-[#e8732a] hover:bg-[#c45a18] transition-colors px-3.5 py-1.5 rounded-lg text-xs tracking-wide uppercase cursor-pointer"
            >
              Get Finish Quote
            </button>
            <Link
              href="/library"
              className="font-sans font-semibold text-[#1a1a1a] hover:text-[#e8732a] text-xs inline-flex items-center gap-1 transition-colors"
            >
              <span>View Library</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* CLEAN FINISH DETAIL MODAL */}
      {selectedFinish && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="finish-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setSelectedFinish(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#e0ddd6] overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full bg-[#1a1a1a] overflow-hidden">
              <Image
                src={selectedFinish.src}
                alt={selectedFinish.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 512px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

              <button
                type="button"
                onClick={() => setSelectedFinish(null)}
                aria-label="Close modal"
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#e8732a] bg-black/60 px-2 py-0.5 rounded">
                  {selectedFinish.badge}
                </span>
                <h3 id="finish-modal-title" className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedFinish.name}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              <div>
                <h4 className="font-sans font-bold uppercase text-[#7a7672] text-[10px] tracking-wider mb-1">
                  Overview
                </h4>
                <p className="font-sans text-[#1a1a1a] text-xs sm:text-sm leading-relaxed">
                  {selectedFinish.deepDesc}
                </p>
              </div>

              <div className="bg-[#faf8f5] rounded-xl p-3.5 border border-[#e0ddd6]">
                <h4 className="font-sans font-bold uppercase text-[#e8732a] text-[10px] tracking-wider mb-1">
                  Best For
                </h4>
                <p className="font-sans text-[#1a1a1a] text-xs leading-relaxed font-medium">
                  {selectedFinish.bestFor}
                </p>
              </div>

              <div>
                <h4 className="font-sans font-bold uppercase text-[#7a7672] text-[10px] tracking-wider mb-2">
                  Key Advantages
                </h4>
                <div className="space-y-1.5">
                  {selectedFinish.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-[#2d5c3e]">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#faf8f5] border-t border-[#e0ddd6] flex items-center justify-between gap-3">
              <Link
                href="/library"
                onClick={() => setSelectedFinish(null)}
                className="text-xs font-semibold text-[#5a5652] hover:text-[#1a1a1a]"
              >
                Materials Library →
              </Link>

              <button
                type="button"
                onClick={() => {
                  const finishName = selectedFinish.name;
                  setSelectedFinish(null);
                  open({ product: `Finish: ${finishName}` });
                }}
                className="font-sans font-bold text-white bg-[#e8732a] hover:bg-[#c45a18] px-4 py-2 rounded-lg text-xs uppercase tracking-wide cursor-pointer transition-colors"
              >
                Request Quote With This Finish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Marquee Animation CSS */}
      <style jsx>{`
        @keyframes marqueeFinishes {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee-finishes {
          display: flex;
          width: max-content;
          animation: marqueeFinishes 38s linear infinite;
        }
        .animate-marquee-finishes:hover {
          animation-play-state: paused;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
