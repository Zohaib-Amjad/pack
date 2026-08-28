"use client";

import { useState, useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { Image as ImageIcon } from "lucide-react";
import { useCmsPortfolio } from "@/hooks/useCms";
import type { CmsPortfolio } from "@/types/cms";
import { DEFAULT_CMS_PORTFOLIO } from "@/data/cms-defaults";

type PortfolioProps = {
  cms?: CmsPortfolio;
};

const Portfolio = ({ cms: initialCms }: PortfolioProps = {}) => {
  const { data } = useCmsPortfolio(initialCms);
  const cms = data || initialCms || DEFAULT_CMS_PORTFOLIO;
  const filterKey = Array.isArray(cms.filterLabels) ? cms.filterLabels.join("|") : "";
  const categories = useMemo(() => {
    return Array.isArray(cms.filterLabels)
      ? cms.filterLabels.map((l) => String(l || "").trim()).filter((l) => l.length > 0)
      : [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);
  const [active, setActive] = useState(categories[0]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setActive((prev: string) => (categories.includes(prev) ? prev : categories[0]));
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
  const isAll = !active || active.toLowerCase() === "all" || active === allLabel;
  const filtered = isAll
    ? items
    : items.filter(
        (i) =>
          (i.category || "").trim().toLowerCase() === (active || "").trim().toLowerCase() ||
          i.category === active
      );

  return (
    <Layout>
      {/* 1. Hero & Header */}
      <section className="bg-hero section-padding pb-12">
        <div className="container-max text-center">
          {cms.header?.sectionLabel && (
            <p className="ds-eyebrow text-accent mb-3">
              {cms.header.sectionLabel}
            </p>
          )}
          {(cms.header?.titleLead || cms.header?.titleAccent) && (
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {cms.header.titleLead} {cms.header.titleAccent && <span className="text-accent">{cms.header.titleAccent}</span>}
            </h1>
          )}
          {cms.header?.description && (
            <p className="mt-4 text-white/80 max-w-2xl mx-auto text-lg font-sans leading-relaxed">
              {cms.header.description}
            </p>
          )}
        </div>
      </section>

      {/* 2. Filter + Grid */}
      <section className="section-padding bg-background">
        <div className="container-max">
          {/* Filter tabs */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-sans font-medium transition-all duration-300 ${
                    active === cat
                      ? "bg-accent-gradient text-accent-foreground shadow-md"
                      : "bg-white border border-[#e0ddd6] text-[#7a7672] hover:text-[#1a1a1a] hover:border-accent/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-2xl bg-muted/20 animate-pulse" />
              ))
            ) : filtered.length > 0 ? (
              filtered.map((item) => {
                const itemImage =
                  (Array.isArray(item.images) && item.images.length > 0 && item.images[0]) ||
                  (typeof item.image_url === "string" && item.image_url.trim().length > 0 && item.image_url.trim()) ||
                  (typeof item.image === "string" && item.image.trim().length > 0 && item.image.trim()) ||
                  (typeof item.featured_image === "string" && item.featured_image.trim().length > 0 && item.featured_image.trim()) ||
                  null;

                return (
                  <div
                    key={item.id}
                    className="group rounded-2xl overflow-hidden border border-[#e0ddd6] bg-white hover:shadow-2xl hover:border-accent/30 transition-all duration-500"
                  >
                    <div className="overflow-hidden relative aspect-[4/3] bg-[#f5f3ee]">
                      {itemImage ? (
                        <Image
                          src={itemImage}
                          alt={item.title || "Portfolio showcase"}
                          fill
                          unoptimized
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
                        {item.category && (
                          <span className="text-xs font-semibold text-accent uppercase tracking-wider font-sans">{item.category}</span>
                        )}
                        <h3 className="font-display text-xl font-bold text-white mt-1">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-white/80 font-sans mt-2 leading-relaxed line-clamp-2">{item.description}</p>
                        )}
                      </div>
                    </div>
                    {/* Static info */}
                    <div className="p-5 group-hover:opacity-0 transition-opacity duration-300">
                      {item.category && (
                        <span className="text-xs font-medium text-accent uppercase tracking-wider font-sans">{item.category}</span>
                      )}
                      <h3 className="font-display font-semibold text-lg text-[#1a1a1a] mt-1">{item.title}</h3>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-16 text-[#7a7672]">
                <p>No projects found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Portfolio;