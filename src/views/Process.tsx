"use client";

import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import {
  FileText,
  Palette,
  PackageCheck,
  Truck,
  Clock,
  Shield,
  Globe,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { Button } from "@/components/ui/button";
import { useCmsProcess } from "@/hooks/useCms";

import processDesign from "@/assets/process-design.jpg";
import processPrototype from "@/assets/process-prototype.jpg";
import processProduction from "@/assets/process-production.jpg";
import processDelivery from "@/assets/process-delivery.jpg";
import type { CmsProcess, CmsProcessStat, CmsProcessStep } from "@/types/cms";
import type { StaticImageData } from "next/image";
import { DEFAULT_CMS_PROCESS } from "@/data/cms-defaults";

const FALLBACK_STEP_IMAGES: StaticImageData[] = [
  processDesign,
  processPrototype,
  processProduction,
  processDelivery,
];

const STAT_ICONS: Record<CmsProcessStat["icon"], LucideIcon> = {
  clock: Clock,
  sparkles: Sparkles,
  shield: Shield,
  globe: Globe,
};

const STEP_ICONS: Record<CmsProcessStep["icon"], LucideIcon> = {
  file: FileText,
  palette: Palette,
  package: PackageCheck,
  truck: Truck,
};

type ProcessProps = {
  cms?: CmsProcess;
};

const Process = ({ cms: initialCms }: ProcessProps = {}) => {
  const { open } = useQuoteModal();
  const { data } = useCmsProcess();
  const cms = data || initialCms || DEFAULT_CMS_PROCESS;
  const h = cms.hero;

  const rawSteps = Array.isArray(cms.steps) ? cms.steps : [];
  const steps = rawSteps.map((step, i) => ({
    ...step,
    icon: (step.icon && STEP_ICONS[step.icon]) ? STEP_ICONS[step.icon] : FileText,
    image: step.imageUrl?.trim() ? step.imageUrl.trim() : FALLBACK_STEP_IMAGES[i % FALLBACK_STEP_IMAGES.length],
  }));

  return (
    <Layout>
      {/* 1. Hero & Intro Section */}
      <section className="bg-hero section-padding pb-12">
        <div className="container-max text-center">
          {h.sectionLabel && (
            <p className="ds-eyebrow text-accent mb-3">
              {h.sectionLabel}
            </p>
          )}
          {(h.titleLead || h.titleAccent) && (
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {h.titleLead} {h.titleAccent && <span className="text-accent">{h.titleAccent}</span>}
            </h1>
          )}
          {h.description && (
            <p className="mt-4 text-white/80 max-w-2xl mx-auto text-lg font-sans leading-relaxed">
              {h.description}
            </p>
          )}
          {h.ctaLabel && (
            <Button variant="cta" size="lg" className="mt-8" onClick={() => open()}>
              {h.ctaLabel}
            </Button>
          )}
        </div>
      </section>

      {/* 2. Stats Section */}
      {(() => {
        const statsList = Array.isArray(cms.stats)
          ? cms.stats.filter((s) => s.value?.trim() || s.label?.trim())
          : [];
        if (statsList.length === 0) return null;

        return (
          <section className="relative -mt-8 z-20 px-4">
            <div className="container-max max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.08)] border border-[#e0ddd6] p-6 md:p-8">
                {statsList.map((stat, i) => {
                  const Icon = (stat.icon && STAT_ICONS[stat.icon]) ? STAT_ICONS[stat.icon] : Clock;
                  return (
                    <div key={`${stat.label}-${i}`} className="text-center flex flex-col items-center justify-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#eaf2ed] text-[#2d5c3e] mb-3">
                        <Icon size={20} className="text-[#2d5c3e]" />
                      </div>
                      <p className="font-display text-2xl sm:text-3xl font-bold text-[#1a1a1a]">{stat.value}</p>
                      <p className="text-sm font-semibold text-[#7a7672] font-sans mt-1">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}

      {/* 3. Steps Section */}
      <section className="section-padding bg-background">
        <div className="container-max max-w-6xl">
          <div className="space-y-24 lg:space-y-32">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              const StepIcon = step.icon;
              return (
                <div
                  key={`${step.title}-${i}`}
                  className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${!isEven ? "lg:flex-row-reverse" : ""
                    }`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className="relative group">
                      <div className="overflow-hidden rounded-2xl border border-[#e0ddd6] shadow-lg aspect-video lg:aspect-[4/3] relative bg-[#f5f3ee]">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div
                        className={`absolute -top-5 ${isEven ? "-right-5" : "-left-5"} w-16 h-16 rounded-2xl bg-[#e8732a] text-white flex items-center justify-center shadow-lg z-10`}
                      >
                        <span className="font-display text-2xl font-bold text-white">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      {step.highlight && (
                        <div
                          className={`absolute bottom-4 ${isEven ? "left-4" : "right-4"} bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 border border-[#e0ddd6] shadow-md z-10`}
                        >
                          <span className="text-sm font-semibold text-[#2d5c3e] font-sans">{step.highlight}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className={`${isEven ? "lg:pl-4" : "lg:pr-4"}`}>
                      <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#eaf2ed] text-[#2d5c3e] flex items-center justify-center">
                          <StepIcon size={20} className="text-[#2d5c3e]" />
                        </div>
                        <span className="text-sm font-bold text-[#e8732a] font-sans uppercase tracking-wider">
                          Step {i + 1}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a1a]">
                        {step.title}
                      </h2>
                      <p className="mt-4 text-[#5a5652] leading-relaxed font-sans text-base lg:text-lg">
                        {step.desc}
                      </p>
                      {Array.isArray(step.details) && step.details.length > 0 && (
                        <ul className="mt-6 space-y-3">
                          {step.details.map((d, j) => (
                            <li key={j} className="flex items-center gap-3 text-sm text-[#1a1a1a] font-sans">
                              <span className="w-6 h-6 rounded-full bg-[#eaf2ed] flex items-center justify-center shrink-0">
                                <span className="w-2 h-2 rounded-full bg-[#2d5c3e]" />
                              </span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Promise Section */}
      {(() => {
        const promiseCards = Array.isArray(cms.promise?.cards)
          ? cms.promise.cards.filter((c) => c.title?.trim() || c.desc?.trim())
          : [];
        const hasHeader = Boolean(
          cms.promise?.sectionLabel ||
          cms.promise?.titleLead ||
          cms.promise?.titleAccent ||
          cms.promise?.description
        );
        if (!hasHeader && promiseCards.length === 0) return null;

        return (
          <section className="section-padding bg-[#faf8f5] border-t border-[#e0ddd6]">
            <div className="container-max max-w-4xl text-center mx-auto">
              {hasHeader && (
                <div>
                  {cms.promise?.sectionLabel && (
                    <p className="ds-eyebrow text-accent mb-2">
                      {cms.promise.sectionLabel}
                    </p>
                  )}
                  {(cms.promise?.titleLead || cms.promise?.titleAccent) && (
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a1a1a]">
                      {cms.promise.titleLead} {cms.promise.titleAccent && <span className="text-accent">{cms.promise.titleAccent}</span>}
                    </h2>
                  )}
                  {cms.promise?.description && (
                    <p className="mt-4 text-[#5a5652] max-w-2xl mx-auto font-sans text-lg leading-relaxed">
                      {cms.promise.description}
                    </p>
                  )}
                </div>
              )}
              {promiseCards.length > 0 && (
                <div className="mt-10 grid sm:grid-cols-3 gap-6">
                  {promiseCards.map((item, i) => (
                    <div key={`${item.title}-${i}`} className="bg-white rounded-2xl border border-[#e0ddd6] p-6 text-left shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="w-9 h-9 rounded-xl bg-[#eaf2ed] text-[#2d5c3e] flex items-center justify-center mb-4">
                        <Shield size={18} className="text-[#2d5c3e]" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-[#1a1a1a]">{item.title}</h3>
                      <p className="mt-2 text-sm text-[#5a5652] font-sans leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })()}

      <CTASection />
    </Layout>
  );
};

export default Process;