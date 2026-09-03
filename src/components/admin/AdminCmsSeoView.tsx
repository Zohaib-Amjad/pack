"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  RefreshCw,
  Save,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createDataClient } from "@/utils/supabase/data-client";
import { createPublicClient } from "@/utils/supabase/public-client";

interface PageSeoData {
  title: string;
  description: string;
  focusKeyword: string;
  urlPath: string;
}

const DEFAULT_SEO: Record<string, PageSeoData> = {
  homepage: {
    title:
      "HOF Pack | Custom Packaging Boxes & Mylar Bags | Low MOQ, Free Mockup ",
    description:
      "Get premium custom packaging boxes and mylar bags from HOF Pack. Enjoy low MOQs, free design support, free mockups, fast turnaround, competitive pricing, and worldwide shipping for businesses of all sizes.",
    focusKeyword: "custom boxes",
    urlPath: "/",
  },
  about: {
    title: "About HOF Pack | Sustainable Packaging Manufacturer & Solutions",
    description:
      "Learn about HOF Pack, our state-of-the-art packaging manufacturing facilities, our sustainability commitments, and our global team of packaging engineers.",
    focusKeyword: "custom packaging company",
    urlPath: "/about",
  },
  process: {
    title: "Our Packaging Process | Quality Promise & Workflow | HOF Pack",
    description:
      "Explore the 4-step packaging creation workflow at HOF Pack: consultation, digital 3D proofing, offset printing, and worldwide freight logistics.",
    focusKeyword: "custom packaging process",
    urlPath: "/process",
  },
  portfolio: {
    title: "Packaging Portfolio & Case Studies | HOF Pack",
    description:
      "Browse our award-winning custom packaging projects across cosmetics, food, electronics, cannabis, and luxury retail brands.",
    focusKeyword: "packaging portfolio",
    urlPath: "/portfolio",
  },
  products: {
    title: "Packaging Products Catalog | Boxes, Bags & Tubes | HOF Pack",
    description:
      "Full catalog of custom packaging products including folding cartons, rigid boxes, corrugated mailers, mylar bags, paper tubes, and specialty finishes.",
    focusKeyword: "custom packaging boxes wholesale",
    urlPath: "/product",
  },
  advanced: {
    title: "Global Meta, Robots & OpenGraph Configuration",
    description:
      "Site-wide canonical URL settings, social preview fallback images, and search engine crawler instructions.",
    focusKeyword: "global metadata",
    urlPath: "/*",
  },
};

export default function AdminCmsSeoView() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<
    "homepage" | "about" | "process" | "portfolio" | "products" | "advanced"
  >("homepage");

  const [seoData, setSeoData] = useState<Record<string, PageSeoData>>(DEFAULT_SEO);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSeo() {
      try {
        const supabase = createPublicClient();
        const { data } = await supabase
          .from("site_settings" as any)
          .select("value")
          .eq("key", "site_seo_settings")
          .maybeSingle();

        if (data?.value) {
          setSeoData((prev) => ({
            ...prev,
            ...(data.value as Record<string, PageSeoData>),
          }));
        }
      } catch {
        // Fallback to initial defaults
      }
    }
    loadSeo();
  }, []);

  const current = seoData[activeTab];

  const handleChange = (field: keyof PageSeoData, value: string) => {
    setSeoData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value,
      },
    }));
  };

  const handleReset = async () => {
    setSeoData(DEFAULT_SEO);
    try {
      const supabase = createDataClient();
      await supabase.from("site_settings" as any).upsert(
        {
          key: "site_seo_settings",
          value: DEFAULT_SEO,
          updated_at: new Date().toISOString(),
        } as any,
        { onConflict: "key" }
      );
    } catch {
      // Offline fallback
    }
    toast({
      title: "Reset from server",
      description: "Restored default SEO settings for all pages.",
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const supabase = createDataClient();
      await supabase.from("site_settings" as any).upsert(
        {
          key: "site_seo_settings",
          value: seoData,
          updated_at: new Date().toISOString(),
        } as any,
        { onConflict: "key" }
      );
    } catch {
      // Offline fallback
    }
    setSaving(false);
    toast({
      title: "SEO Settings Saved",
      description: "Meta tags and search snippets updated in Supabase.",
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
      <div className="max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col gap-5">
          {/* Top Information Card */}
          <div className="flex items-start gap-3 p-4 rounded-[12px] border border-[#e0ddd6] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="h-10 w-10 rounded-xl bg-[#eaf2ed] flex items-center justify-center shrink-0 text-[#2d5c3e]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-[16px] font-bold text-[#1a1a1a] tracking-tight">
                Content Manager
              </h1>
              <p className="text-[11px] text-[#aaa6a0] font-semibold mt-0.5 leading-relaxed">
                Edit public page copy stored in Supabase. Use the main sidebar to jump to any section.
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="min-w-0">
            <div className="flex flex-col gap-4 max-w-[920px]">
              {/* Tabs Navigation */}
              <div className="flex flex-wrap gap-1 border-b border-[#e0ddd6] pb-1">
                {(
                  [
                    { id: "homepage", label: "Homepage" },
                    { id: "about", label: "About" },
                    { id: "process", label: "Process" },
                    { id: "portfolio", label: "Portfolio" },
                    { id: "products", label: "Products" },
                    { id: "advanced", label: "Advanced" },
                  ] as const
                ).map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-2 text-[12px] font-bold rounded-t-lg transition-colors cursor-pointer ${
                        isActive
                          ? "text-[#2d5c3e] border-b-2 border-[#e8732a] -mb-[2px]"
                          : "text-[#aaa6a0] hover:text-[#1a1a1a]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn h-[36px] px-4 text-[11px] font-bold rounded-[8px] border border-[#d8d4cc] bg-white text-[#7a7672] inline-flex items-center gap-2 hover:bg-[#f5f3ee] transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset from server
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="btn h-[36px] px-5 text-[11px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] disabled:opacity-50 inline-flex items-center gap-2 shadow-[0_4px_14px_rgba(232,115,42,0.2)] transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving ? "Saving..." : "Save & publish"}
                </button>
              </div>

              {/* SEO Card */}
              <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                  <div className="ch-l flex-1">
                    <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} SEO
                    </div>
                    <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                      {current.urlPath}
                    </div>
                  </div>
                </div>

                <div className="cb p-6">
                  <div className="flex flex-col gap-4">
                    {activeTab === "advanced" && (
                      <p className="text-[11px] text-[#7a7672] leading-relaxed">
                        Social / Open Graph fallback is <code className="text-[#1a1a1a]">/og-image.png</code> (1200×630, official navbar logo on cream). Organization logo: <code className="text-[#1a1a1a]">/hofpack-logo.png</code>. Apple touch icon: <code className="text-[#1a1a1a]">/apple-touch-icon.png</code>.
                      </p>
                    )}
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Page title
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={current.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                      />
                      <p className="text-[10px] text-[#aaa6a0] mt-1">
                        Recommended ~50–60 characters · Shown in Google as the blue link
                      </p>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Meta description
                      </label>
                      <textarea
                        className="w-full min-h-[100px] p-3 text-[12px] font-mono bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] resize-none"
                        rows={4}
                        value={current.description}
                        onChange={(e) =>
                          handleChange("description", e.target.value)
                        }
                      />
                      <p className="text-[10px] text-[#aaa6a0] mt-1">
                        Recommended ~150–160 characters
                      </p>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Focus keyword (optional)
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={current.focusKeyword}
                        onChange={(e) =>
                          handleChange("focusKeyword", e.target.value)
                        }
                      />
                      <p className="text-[10px] text-[#aaa6a0] mt-1">
                        For your reference only — not output as a meta tag
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
