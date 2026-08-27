"use client";

import { DEFAULT_CMS_HOME } from "@/data/cms-defaults";


import {
  ArrowRight,
  Palette,
  Box,
  Printer,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { useCmsHome } from "@/hooks/useCms";
import type { CmsHomePackagingItem } from "@/types/cms";

const ICONS: Record<CmsHomePackagingItem["icon"], LucideIcon> = {
  box: Box,
  palette: Palette,
  printer: Printer,
  sparkles: Sparkles,
};

const PackagingShowcase = () => {
  const { open } = useQuoteModal();
  const { data } = useCmsHome();
  const cms = data || DEFAULT_CMS_HOME;
  const p = cms.packagingShowcase;
  const items = p.items.filter((item) => item.active);

  return (
    <section className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center mb-12">
          <p className="ds-eyebrow text-accent mb-2">{p.sectionLabel}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            {p.title}
          </h2>
          <p className="mt-3 text-muted-foreground font-sans max-w-2xl mx-auto">
            {p.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const Icon = ICONS[item.icon] ?? Box;
            return (
              <div
                key={item.id}
                className="group relative p-6 rounded-2xl border border-border bg-card hover:border-accent/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon size={24} className="text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-[13px] text-muted-foreground font-sans leading-[1.78]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button variant="cta" size="lg" onClick={() => open()}>
            {p.ctaLabel} <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PackagingShowcase;