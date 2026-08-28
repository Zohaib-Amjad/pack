"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  RefreshCw,
  Save,
  Check,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useCmsLibrarySection } from "@/hooks/useCmsLibrarySection";
import { DEFAULT_CMS_LIBRARY } from "@/data/cms-defaults";
import { useToast } from "@/hooks/use-toast";

export default function AdminLibraryHeroView() {
  const { local, setLocal, save, saving, refetch, ready } =
    useCmsLibrarySection("hero");
  const { toast } = useToast();

  const [titleLead, setTitleLead] = useState(
    DEFAULT_CMS_LIBRARY.hero.titleLead
  );
  const [titleAccent, setTitleAccent] = useState(
    DEFAULT_CMS_LIBRARY.hero.titleAccent
  );
  const [subtitle, setSubtitle] = useState(
    DEFAULT_CMS_LIBRARY.hero.subtitle
  );
  const [heroImageUrl, setHeroImageUrl] = useState(
    DEFAULT_CMS_LIBRARY.hero.heroImageUrl || ""
  );
  const [heroImageAlt, setHeroImageAlt] = useState(
    DEFAULT_CMS_LIBRARY.hero.heroImageAlt || "HOF Pack Library"
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (local) {
      setTitleLead(local.titleLead || DEFAULT_CMS_LIBRARY.hero.titleLead);
      setTitleAccent(
        local.titleAccent || DEFAULT_CMS_LIBRARY.hero.titleAccent
      );
      setSubtitle(local.subtitle || DEFAULT_CMS_LIBRARY.hero.subtitle);
      setHeroImageUrl(local.heroImageUrl || "");
      setHeroImageAlt(
        local.heroImageAlt || DEFAULT_CMS_LIBRARY.hero.heroImageAlt || "HOF Pack Library"
      );
    }
  }, [local]);

  const handleSave = async () => {
    const updated = {
      titleLead,
      titleAccent,
      subtitle,
      heroImageUrl,
      heroImageAlt,
    };

    setLocal(updated);
    if (save) {
      await save(updated);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
    toast({
      title: "Published!",
      description: "Library hero section updated successfully.",
    });
  };

  const handleReset = async () => {
    await refetch();
    toast({
      title: "Reset",
      description: "Reloaded current configuration from server.",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setHeroImageUrl(fakeUrl);
      toast({
        title: "Image Selected",
        description: `${file.name} ready for hero banner.`,
      });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
      <div className="max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col gap-5">
          {/* Content Manager Banner */}
          <div className="flex items-start gap-3 p-4 rounded-[12px] border border-[#e0ddd6] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="h-10 w-10 rounded-xl bg-[#eaf2ed] flex items-center justify-center shrink-0 text-[#2d5c3e]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-[16px] font-bold text-[#1a1a1a] tracking-tight">
                Content Manager
              </h1>
              <p className="text-[11px] text-[#aaa6a0] font-semibold mt-0.5 leading-relaxed">
                Edit public page copy stored in Supabase. Use the main sidebar
                to jump to any section.
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex flex-col gap-4 max-w-[920px]">
              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn h-[36px] px-4 text-[11px] font-bold rounded-[8px] border border-[#d8d4cc] bg-white text-[#7a7672] hover:bg-[#f5f3ee] inline-flex items-center gap-2 transition-all cursor-pointer"
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
                  {saveSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      {saving ? "Saving..." : "Save & publish"}
                    </>
                  )}
                </button>
              </div>

              {/* Form Card */}
              <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                  <div className="ch-l flex-1">
                    <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                      Library Hero
                    </div>
                    <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                      Top banner on the Library page
                    </div>
                  </div>
                </div>

                <div className="cb p-6">
                  <div className="flex flex-col gap-4">
                    {/* Title Lead & Accent */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                          Title — lead (black text)
                        </label>
                        <input
                          className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                          value={titleLead}
                          onChange={(e) => setTitleLead(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                          Title — accent (orange text)
                        </label>
                        <input
                          className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                          value={titleAccent}
                          onChange={(e) => setTitleAccent(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Subtitle */}
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Subtitle
                      </label>
                      <textarea
                        className="w-full min-h-[100px] p-3 text-[12px] font-mono bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        rows={3}
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                      />
                    </div>

                    {/* Hero Image */}
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Hero image (leave empty to use default)
                      </label>
                      <div className="space-y-3">
                        <div className="border-2 border-dashed border-[#e0ddd6] rounded-[12px] bg-[#f5f3ee]/50 hover:bg-[#f5f3ee] transition-all overflow-hidden relative">
                          {heroImageUrl ? (
                            <div className="relative aspect-[16/9] w-full max-h-[220px]">
                              <Image
                                src={heroImageUrl}
                                alt="Hero preview"
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="relative flex flex-col items-center justify-center min-h-[140px] p-6">
                              <div className="flex flex-col items-center gap-3 w-full">
                                <div className="h-12 w-12 rounded-xl bg-[#2d5c3e]/10 text-[#2d5c3e] flex items-center justify-center">
                                  <Upload className="h-6 w-6" />
                                </div>
                                <div className="text-center w-full px-2">
                                  <p className="text-[12px] font-bold text-[#1a1a1a]">
                                    Upload Artwork (Cloudinary)
                                  </p>
                                  <p className="text-[10px] text-[#aaa6a0] font-medium">
                                    PNG, JPG or WebP up to 5MB
                                  </p>
                                </div>
                              </div>
                              <input
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                type="file"
                                onChange={handleImageUpload}
                              />
                            </div>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1">
                            Manual URL
                          </label>
                          <input
                            className="w-full h-[36px] px-[12px] text-[12px] bg-[#f5f3ee] border border-[#e0ddd6] rounded-[6px] focus:outline-none focus:border-[#e8732a]/40 transition-all outline-none text-[#1a1a1a] placeholder:text-[#aaa6a0]/50"
                            placeholder="Or paste an image URL..."
                            value={heroImageUrl}
                            onChange={(e) => setHeroImageUrl(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Hero Image Alt Text */}
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Hero image alt text
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
