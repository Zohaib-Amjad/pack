"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  RefreshCw,
  Save,
  Check,
} from "lucide-react";
import { useCmsAboutSection } from "@/hooks/useCmsAboutSection";
import { DEFAULT_CMS_ABOUT } from "@/data/cms-defaults";
import { useToast } from "@/hooks/use-toast";

export default function AdminAboutHeroView() {
  const { local, setLocal, save, saving, refetch } = useCmsAboutSection("hero");
  const { toast } = useToast();

  const hero = local || DEFAULT_CMS_ABOUT.hero;

  const [sectionLabel, setSectionLabel] = useState(hero.sectionLabel);
  const [titleLead, setTitleLead] = useState(hero.titleLead);
  const [titleAccent, setTitleAccent] = useState(hero.titleAccent);
  const [description, setDescription] = useState(hero.description);
  const [ctaLabel, setCtaLabel] = useState(hero.ctaLabel);
  const [heroImageUrl, setHeroImageUrl] = useState(hero.heroImageUrl || "");
  const [heroImageAlt, setHeroImageAlt] = useState(hero.heroImageAlt || "");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (local) {
      setSectionLabel(local.sectionLabel);
      setTitleLead(local.titleLead);
      setTitleAccent(local.titleAccent);
      setDescription(local.description);
      setCtaLabel(local.ctaLabel);
      setHeroImageUrl(local.heroImageUrl || "");
      setHeroImageAlt(local.heroImageAlt || "");
    }
  }, [local]);

  const handleReset = () => {
    if (refetch) {
      refetch();
    } else {
      const fallback = DEFAULT_CMS_ABOUT.hero;
      setSectionLabel(fallback.sectionLabel);
      setTitleLead(fallback.titleLead);
      setTitleAccent(fallback.titleAccent);
      setDescription(fallback.description);
      setCtaLabel(fallback.ctaLabel);
      setHeroImageUrl(fallback.heroImageUrl || "");
      setHeroImageAlt(fallback.heroImageAlt || "");
    }
    toast({
      title: "Reset from server",
      description: "Restored latest About Hero settings from Supabase.",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      sectionLabel,
      titleLead,
      titleAccent,
      description,
      ctaLabel,
      heroImageUrl,
      heroImageAlt,
    };
    setLocal(updated);
    if (save) {
      await save(updated);
    }
    setIsSaved(true);
    toast({
      title: "Saved successfully",
      description: "About hero copy has been saved & published.",
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
      <div className="max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col gap-5">
          {/* Top Info Banner */}
          <div className="flex items-start gap-3 p-4 rounded-[12px] border border-[#e0ddd6] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="h-10 w-10 rounded-xl bg-[#eaf2ed] flex items-center justify-center shrink-0 text-[#2d5c3e]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-[16px] font-bold text-[#1a1a1a] tracking-tight">
                Content Manager
              </h1>
              <p className="text-[11px] text-[#aaa6a0] font-semibold mt-0.5 leading-relaxed">
                Edit public page copy stored in Supabase. Use the main sidebar to
                jump to any section.
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-[920px]">
              {/* Action Toolbar */}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn h-[36px] px-4 text-[11px] font-bold rounded-[8px] border border-[#d8d4cc] bg-white text-[#7a7672] hover:bg-[#faf8f5] inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset from server
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn h-[36px] px-5 text-[11px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] disabled:opacity-50 inline-flex items-center gap-2 shadow-[0_4px_14px_rgba(232,115,42,0.2)] cursor-pointer transition-colors"
                >
                  {isSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                  {isSaved ? "Saved & published" : "Save & publish"}
                </button>
              </div>

              {/* Card: Hero & intro */}
              <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                  <div className="ch-l flex-1">
                    <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                      Hero &amp; intro
                    </div>
                    <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                      /about top section
                    </div>
                  </div>
                </div>

                <div className="cb p-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Section label
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={sectionLabel}
                        onChange={(e) => setSectionLabel(e.target.value)}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                          Title lead
                        </label>
                        <input
                          className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                          value={titleLead}
                          onChange={(e) => setTitleLead(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                          Title accent
                        </label>
                        <input
                          className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                          value={titleAccent}
                          onChange={(e) => setTitleAccent(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Description
                      </label>
                      <textarea
                        className="w-full min-h-[100px] p-3 text-[12px] font-mono bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        CTA label
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={ctaLabel}
                        onChange={(e) => setCtaLabel(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Hero image URL
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={heroImageUrl}
                        onChange={(e) => setHeroImageUrl(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Hero image alt
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={heroImageAlt}
                        onChange={(e) => setHeroImageAlt(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
