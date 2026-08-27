"use client";

import { DEFAULT_CMS_HOME } from "@/data/cms-defaults";


import {
  Leaf,
  Recycle,
  TreePine,
  Heart,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCmsHome } from "@/hooks/useCms";
import type { CmsHomeSustainabilityPoint } from "@/types/cms";

const ICON_MAP: Record<CmsHomeSustainabilityPoint["icon"], LucideIcon> = {
  leaf: Leaf,
  heart: Heart,
  recycle: Recycle,
  tree: TreePine,
};

const SustainabilitySection = () => {
  const { data } = useCmsHome();
  const cms = data || DEFAULT_CMS_HOME;
  const s = cms.sustainability;
  const points = s.points.filter((p) => p.active);

  return (
    <section className="section-padding bg-background">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="ds-eyebrow text-accent">{s.sectionLabel}</span>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground mt-2">
              {s.titleLead} <span className="text-accent">{s.titleAccent}</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed font-sans whitespace-pre-line">
              {s.body}
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {points.map((item) => {
                const Icon = ICON_MAP[item.icon] ?? Leaf;
                return (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 rounded-lg border border-border bg-card"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground font-sans mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button variant="cta" className="mt-6" asChild>
              <Link href={s.ctaHref} className="inline-flex items-center gap-2">
                {s.ctaLabel}
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          <div className="bg-hero rounded-2xl p-10 text-center">
            <Leaf
              size={80}
              className="text-primary-foreground/30 mx-auto mb-4"
            />
            <h3 className="font-display text-2xl text-primary-foreground font-bold">
              {s.panelTitle}
            </h3>
            <p className="text-primary-foreground/70 font-sans mt-2">
              {s.panelSubtitle}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {s.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-accent">
                    {stat.value}
                  </p>
                  <p className="text-xs text-primary-foreground/60 font-sans">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;