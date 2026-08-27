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
import type { CmsProcessStat, CmsProcessStep } from "@/types/cms";
import type { StaticImageData } from "next/image";

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

import { DEFAULT_CMS_PROCESS } from "@/data/cms-defaults";

const Process = () => {
  const { open } = useQuoteModal();
  const { data } = useCmsProcess();
  const cms = data || DEFAULT_CMS_PROCESS;
  const h = cms.hero;

  const steps = cms.steps.map((step, i) => ({
    ...step,
    icon: STEP_ICONS[step.icon] ?? FileText,
    image: step.imageUrl?.trim() ? step.imageUrl.trim() : FALLBACK_STEP_IMAGES[i % FALLBACK_STEP_IMAGES.length],
  }));

  return (
    <Layout>
      <section className="bg-hero section-padding pb-12">
        <div className="container-max text-center">
          <p className="ds-eyebrow text-accent mb-3">
            {h.sectionLabel}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground">
            {h.titleLead} <span className="text-accent">{h.titleAccent}</span>
          </h1>
          <p className="mt-4 text-primary-foreground/70 max-w-2xl mx-auto text-lg font-sans">
            {h.description}
          </p>
          <Button variant="hero" size="lg" className="mt-8" onClick={() => open()}>
            {h.ctaLabel}
          </Button>
        </div>
      </section>

      <section className="relative -mt-8 z-10 px-4">
        <div className="container-max max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8">
            {cms.stats.map((stat, i) => {
              const Icon = STAT_ICONS[stat.icon] ?? Clock;
              return (
                <div key={`${stat.label}-${i}`} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 mb-3">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-sans mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-max max-w-6xl">
          <div className="space-y-24 lg:space-y-32">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              const StepIcon = step.icon;
              return (
                <div
                  key={`${step.title}-${i}`}
                  className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className="relative group">
                      <div className="overflow-hidden rounded-2xl border border-border shadow-lg aspect-video lg:aspect-[4/3] relative">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div
                        className={`absolute -top-5 ${isEven ? "-right-5" : "-left-5"} w-16 h-16 rounded-2xl bg-accent-gradient flex items-center justify-center shadow-lg z-10`}
                      >
                        <span className="text-accent-foreground font-display text-2xl font-bold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div
                        className={`absolute bottom-4 ${isEven ? "left-4" : "right-4"} bg-card/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-border shadow-md z-10`}
                      >
                        <span className="text-sm font-semibold text-accent font-sans">{step.highlight}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className={`${isEven ? "lg:pl-4" : "lg:pr-4"}`}>
                      <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <StepIcon size={20} className="text-primary" />
                        </div>
                        <span className="text-sm font-bold text-accent font-sans uppercase tracking-wider">
                          Step {i + 1}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                        {step.title}
                      </h2>
                      <p className="mt-4 text-muted-foreground leading-relaxed font-sans text-base lg:text-lg">
                        {step.desc}
                      </p>
                      <ul className="mt-6 space-y-3">
                        {step.details.map((d, j) => (
                          <li key={j} className="flex items-center gap-3 text-sm text-foreground font-sans">
                            <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                              <span className="w-2 h-2 rounded-full bg-accent" />
                            </span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-max max-w-4xl text-center">
          <p className="ds-eyebrow text-accent mb-2">
            {cms.promise.sectionLabel}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            {cms.promise.titleLead} <span className="text-accent">{cms.promise.titleAccent}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto font-sans text-lg">
            {cms.promise.description}
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {cms.promise.cards.map((item, i) => (
              <div key={`${item.title}-${i}`} className="bg-card rounded-2xl border border-border p-6 text-left">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Shield size={16} className="text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Process;