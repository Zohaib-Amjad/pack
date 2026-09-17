"use client";

import React, { useState, useRef, useMemo } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  Bell,
  Sparkles,
  Play,
  Pause,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Palette,
  Eye,
  Factory,
  Truck,
} from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { useCmsHome } from "@/hooks/useCms";
import type { CmsHome } from "@/types/cms";

import processDesign from "@/assets/process-design.jpg";
import processPrototype from "@/assets/process-prototype.jpg";
import processProduction from "@/assets/process-production.jpg";
import processDelivery from "@/assets/process-delivery.jpg";

const PROCESS_IMAGES: StaticImageData[] = [
  processDesign,
  processPrototype,
  processProduction,
  processDelivery,
];

interface StepData {
  num: string;
  step: string;
  name: string;
  desc: string;
  tag: string;
  img: StaticImageData | string;
  icon: React.ElementType;
}

const DEFAULT_STEPS: StepData[] = [
  {
    num: "01",
    step: "Step 01",
    name: "Design & Consultation",
    desc: "Share your packaging concept or artwork. We create custom dieline templates for free.",
    tag: "Free 1-on-1 Consultation",
    img: PROCESS_IMAGES[0],
    icon: Palette,
  },
  {
    num: "02",
    step: "Step 02",
    name: "3D Digital Proof",
    desc: "Inspect your artwork in photorealistic 360° 3D before printing. Unlimited free revisions.",
    tag: "Free 3D Mock-up",
    img: PROCESS_IMAGES[1],
    icon: Eye,
  },
  {
    num: "03",
    step: "Step 03",
    name: "Precision Production",
    desc: "High-definition presses, custom die-cutting, specialty finishes, and 100% quality inspection.",
    tag: "100% QC Inspected",
    img: PROCESS_IMAGES[2],
    icon: Factory,
  },
  {
    num: "04",
    step: "Step 04",
    name: "Doorstep Delivery",
    desc: "Carefully packed and shipped directly to your door, warehouse, or fulfillment center.",
    tag: "Free Ground Shipping USA",
    img: PROCESS_IMAGES[3],
    icon: Truck,
  },
];

type HowItWorksProps = {
  cms?: CmsHome;
};

export default function HowItWorks({ cms }: HowItWorksProps) {
  const { open } = useQuoteModal();
  const { data } = useCmsHome();
  const how = data?.howItWorks || cms?.howItWorks;

  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStepTab, setActiveStepTab] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const titleLead = how?.titleLead || "From Idea to";
  const titleAccent = how?.titleAccent || "Your Door";
  const liveSubtitle = "Four simple steps — from your initial brief to custom packaging on shelves.";
  const subtitle =
    how?.subtitle && how.subtitle !== "Four steps. No confusion. No hidden fees."
      ? how.subtitle
      : liveSubtitle;
  const ctaLabel = how?.ctaLabel || "Talk to a Designer";

  const steps: StepData[] = useMemo(() => {
    if (how?.steps && Array.isArray(how.steps) && how.steps.length > 0) {
      const activeCms = how.steps.filter((s) => s.active !== false);
      if (activeCms.length > 0) {
        return activeCms.map((s, idx) => {
          const fallback = DEFAULT_STEPS[idx % DEFAULT_STEPS.length];
          return {
            num: String(idx + 1).padStart(2, "0"),
            step: `Step ${String(idx + 1).padStart(2, "0")}`,
            name: s.title || fallback.name,
            desc: s.desc || fallback.desc,
            tag: s.details?.[0] || fallback.tag,
            img: s.imageUrl?.trim() ? s.imageUrl.trim() : fallback.img,
            icon: fallback.icon,
          };
        });
      }
    }
    return DEFAULT_STEPS;
  }, [how?.steps]);

  const loopCards = useMemo(() => [...steps, ...steps, ...steps], [steps]);

  const handleManualScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const shift = 320;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -shift : shift,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#f5f3ee] py-12 sm:py-16 border-b border-[#e0ddd6] overflow-hidden relative select-none">
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 z-10">
        {/* Header section with live badge and controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#2d5c3e] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#2d5c3e] animate-pulse" />
              <span>Production Pipeline</span>
            </div>

            <h2 className="font-display text-[#1a1a1a] text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight">
              {titleLead} <span className="text-[#e8732a]">{titleAccent}</span>
            </h2>

            {subtitle && (
              <p className="font-sans text-[#7a7672] text-xs sm:text-sm mt-1.5 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Controls: Play/Pause and Nav buttons */}
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
                onClick={() => handleManualScroll("left")}
                aria-label="Previous step"
                className="w-7 h-7 rounded flex items-center justify-center text-[#7a7672] hover:text-[#1a1a1a] hover:bg-[#f5f3ee] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleManualScroll("right")}
                aria-label="Next step"
                className="w-7 h-7 rounded flex items-center justify-center text-[#7a7672] hover:text-[#1a1a1a] hover:bg-[#f5f3ee] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Step Quick-Jump Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-5 scrollbar-none">
          {steps.map((step, idx) => {
            const isCurrent = activeStepTab === idx;
            const Icon = step.icon;
            return (
              <button
                key={step.step}
                type="button"
                onClick={() => {
                  setActiveStepTab(idx);
                  if (scrollContainerRef.current) {
                    const targetScroll = idx * 300;
                    scrollContainerRef.current.scrollTo({
                      left: targetScroll,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-[#1a1a1a] text-white shadow-xs"
                    : "bg-white/80 hover:bg-white text-[#5a5652] hover:text-[#1a1a1a] border border-[#e0ddd6]"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[9.5px] font-bold ${
                    isCurrent ? "bg-[#e8732a] text-white" : "bg-[#f5f3ee] text-[#7a7672]"
                  }`}
                >
                  {idx + 1}
                </span>
                <Icon className="w-3 h-3 opacity-80" />
                <span>{step.name}</span>
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
            className="flex items-stretch gap-4 sm:gap-5 flex-shrink-0 animate-marquee-process"
            style={{
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          >
            {loopCards.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={`${step.step}-${idx}`}
                  className="flex items-center gap-4 sm:gap-5 flex-shrink-0"
                >
                  {/* Step Card */}
                  <div className="w-[260px] sm:w-[280px] bg-white rounded-xl border border-[#e0ddd6] shadow-xs hover:shadow-md hover:border-[#e8732a]/40 transition-all duration-200 flex flex-col overflow-hidden group/card flex-shrink-0">
                    {/* Image Header */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#ece9e2]">
                      <Image
                        src={step.img}
                        alt={step.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                        sizes="280px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                      {/* Step Badge */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-[#1a1a1a]/80 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full border border-white/10 text-[10px] font-bold">
                        <span className="text-[#e8732a]">{step.num}</span>
                        <span className="uppercase tracking-wider text-white/90">{step.step}</span>
                      </div>

                      {/* Icon */}
                      <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-lg bg-white/90 backdrop-blur-md flex items-center justify-center text-[#2d5c3e] shadow-xs">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        <h3 className="font-display font-bold text-[#1a1a1a] text-[15px] sm:text-[16px] group-hover/card:text-[#e8732a] transition-colors mb-1.5">
                          {step.name}
                        </h3>

                        <p className="font-sans text-[#5a5652] text-xs leading-relaxed line-clamp-2 mb-3">
                          {step.desc}
                        </p>
                      </div>

                      {/* Tag */}
                      <div className="pt-2 border-t border-[#f0eee9]">
                        <span className="inline-flex items-center gap-1 font-sans font-semibold text-[#2d5c3e] text-[10.5px] bg-[#edf7f1] border border-[#b8dfc8] px-2.5 py-0.5 rounded-full">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{step.tag}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="hidden sm:flex items-center justify-center text-[#7a7672]/50">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 mt-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl px-5 py-4 bg-[#2d5c3e] text-white shadow-sm">
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold">
              Need help with your packaging design?
            </h3>
            <p className="font-sans text-white/75 text-xs mt-0.5">
              Our in-house design team works with you one-on-one — no templates, zero setup charges.
            </p>
          </div>

          <button
            type="button"
            onClick={() => open()}
            className="inline-flex items-center justify-center gap-1.5 font-sans font-bold text-white bg-[#e8732a] hover:bg-[#c45a18] transition-colors px-4 py-2 rounded-lg text-xs tracking-wide uppercase cursor-pointer flex-shrink-0 w-full sm:w-auto"
          >
            <Bell className="w-3.5 h-3.5 shrink-0" />
            <span>{ctaLabel}</span>
          </button>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        @keyframes marqueeProcess {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee-process {
          display: flex;
          width: max-content;
          animation: marqueeProcess 36s linear infinite;
        }
        .animate-marquee-process:hover {
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
