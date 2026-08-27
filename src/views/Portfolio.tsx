"use client";

import { useState, useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { Image as ImageIcon } from "lucide-react";
import { useCmsPortfolio } from "@/hooks/useCms";

import { DEFAULT_CMS_PORTFOLIO } from "@/data/cms-defaults";

const Portfolio = () => {
  const { data } = useCmsPortfolio();
  const cms = data || DEFAULT_CMS_PORTFOLIO;
  const filterKey = cms.filterLabels.join("|");
  const categories = useMemo(() => {
    return cms.filterLabels.length > 0
      ? [...cms.filterLabels]
      : ["All", "Custom Boxes", "Rigid Boxes"];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);
  const [active, setActive] = useState(categories[0]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setActive((prev) => (categories.includes(prev) ? prev : categories[0]));
  }, [categories]);

  const fetchItems = async () => {
    setLoading(true);
    const supabase = createPublicClient();
    const { data } = await withAbortableTimeout((signal) =>
      (supabase
        .from("portfolio_items" as any)
        .select("*")
        .order("created_at", { ascending: false })
        .abortSignal(signal) as any)
    ) as any;
    
    if (data) setItems(data);
    setLoading(false);
  };

  const allLabel = categories[0] ?? "All";
  const filtered = active === allLabel ? items : items.filter((i) => i.category === active);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-slate-100 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/40" />
        </div>
        <div className="relative container-max px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="ds-eyebrow text-accent mb-3">
            {cms.header.sectionLabel}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            {cms.header.titleLead} <span className="text-accent">{cms.header.titleAccent}</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg font-sans">
            {cms.header.description}
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-padding bg-background">
        <div className="container-max">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-sans font-medium transition-all duration-300 ${
                  active === cat
                    ? "bg-accent-gradient text-accent-foreground shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [1,2,3,4,5,6].map(i => (
                <div key={i} className="aspect-[4/3] rounded-2xl bg-muted/20 animate-pulse" />
              ))
            ) : filtered.map((item, i) => (
              <div
                key={item.id}
                className={`group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-2xl hover:border-accent/30 transition-all duration-500`}
              >
                <div className="overflow-hidden relative aspect-[4/3]">
                  {item.images && item.images.length > 0 ? (
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-10">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider font-sans">{item.category}</span>
                    <h3 className="font-display text-xl font-bold text-white mt-1">{item.title}</h3>
                    <p className="text-sm text-white/80 font-sans mt-2 leading-relaxed line-clamp-2">{item.description}</p>
                  </div>
                </div>
                {/* Static info (visible without hover) */}
                <div className="p-5 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="text-xs font-medium text-accent uppercase tracking-wider font-sans">{item.category}</span>
                  <h3 className="font-display font-semibold text-lg text-foreground mt-1">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Portfolio;