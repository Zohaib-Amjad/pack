"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  FileText,
  RefreshCw,
  Save,
  ZoomIn,
  Upload,
  X,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCmsHomeSection } from "@/hooks/useCmsHomeSection";

export default function AdminHeroSectionView() {
  const { toast } = useToast();
  const { local, setLocal, save, saving, refetch } = useCmsHomeSection("hero");

  const [eyebrow, setEyebrow] = useState("");
  const [headline, setHeadline] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [tagline, setTagline] = useState("");
  const [primaryCtaLabel, setPrimaryCtaLabel] = useState("");
  const [primaryCtaLink, setPrimaryCtaLink] = useState("");
  const [secondaryCtaLabel, setSecondaryCtaLabel] = useState("");
  const [secondaryCtaLink, setSecondaryCtaLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [trustPoints, setTrustPoints] = useState("");
  const [bbbTitle, setBbbTitle] = useState("");
  const [bbbSubtitle, setBbbSubtitle] = useState("");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync from Supabase CMS hook when loaded
  useEffect(() => {
    if (local) {
      setEyebrow(local.eyebrow ?? "");
      setHeadline(local.headline ?? "");
      setSubheadline(local.subheadline ?? "");
      setTagline(local.tagline ?? "");
      setPrimaryCtaLabel(local.primaryCta?.label ?? "");
      setPrimaryCtaLink(local.primaryCta?.href ?? "");
      setSecondaryCtaLabel(local.secondaryCta?.label ?? "");
      setSecondaryCtaLink(local.secondaryCta?.href ?? "");
      if (local.heroImageUrl !== undefined) {
        setImageUrl(local.heroImageUrl ?? "");
        const name = local.heroImageUrl ? local.heroImageUrl.split("/").pop() || "hero-image.jpg" : "";
        setFileName(name);
      }
      setImageAlt(local.heroImageAlt ?? "");
      if (local.trustPoints !== undefined) {
        setTrustPoints(Array.isArray(local.trustPoints) ? local.trustPoints.join("\n") : "");
      }
      setBbbTitle(local.bbbTitle ?? "");
      setBbbSubtitle(local.bbbSubtitle ?? "");
    }
  }, [local]);

  // Handle file select/replace
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImageUrl(result);
          setFileName(file.name);
          toast({
            title: "Image Selected",
            description: `Loaded ${file.name} (${Math.round(file.size / 1024)} KB)`,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast({
      title: "Image Removed",
      description: "Hero background image has been cleared. You can upload a new one or use default.",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedHero = {
      eyebrow,
      headline,
      subheadline,
      tagline,
      primaryCta: { label: primaryCtaLabel, href: primaryCtaLink },
      secondaryCta: { label: secondaryCtaLabel, href: secondaryCtaLink },
      heroImageUrl: imageUrl,
      heroImageAlt: imageAlt,
      trustPoints: trustPoints.split("\n").map((s) => s.trim()).filter(Boolean),
      bbbTitle,
      bbbSubtitle,
    };

    if (setLocal) {
      setLocal(updatedHero);
    }

    if (save) {
      await save(updatedHero);
    }

    setIsSaved(true);
    toast({
      title: "Hero Section Saved",
      description: "Hero copy and background image published to live website.",
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    if (refetch) {
      refetch();
    }
    toast({
      title: "Reset from server",
      description: "Restored latest hero settings from Supabase.",
    });
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
                  {saving ? "Saving..." : isSaved ? "Saved & published!" : "Save & publish"}
                </button>
              </div>

              {/* Main Section Card */}
              <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                {/* Card Header */}
                <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                  <div className="ch-l flex-1">
                    <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                      Hero Section
                    </div>
                    <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                      hero
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="cb p-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Eyebrow (optional)
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={eyebrow}
                        placeholder="e.g. PREMIUM CUSTOM PACKAGING"
                        onChange={(e) => setEyebrow(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Headline
                      </label>
                      <textarea
                        className="w-full min-h-[70px] p-3 text-[13px] font-semibold bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] resize-none"
                        rows={2}
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Subheadline
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={subheadline}
                        onChange={(e) => setSubheadline(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Tagline
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                          Primary CTA label
                        </label>
                        <input
                          className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                          value={primaryCtaLabel}
                          onChange={(e) => setPrimaryCtaLabel(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                          Primary CTA link (#quote = quote modal)
                        </label>
                        <input
                          className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                          value={primaryCtaLink}
                          onChange={(e) => setPrimaryCtaLink(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                          Secondary CTA label
                        </label>
                        <input
                          className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                          value={secondaryCtaLabel}
                          onChange={(e) => setSecondaryCtaLabel(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                          Secondary CTA link
                        </label>
                        <input
                          className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                          value={secondaryCtaLink}
                          onChange={(e) => setSecondaryCtaLink(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Hero Background Image Box */}
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Hero background image
                      </label>
                      <div className="rounded-[16px] border border-[#e0ddd6] overflow-hidden bg-[#f5f3ee]/30 shadow-sm">
                        <div className="space-y-3">
                          {imageUrl ? (
                            <div className="border-2 border-dashed border-[#e0ddd6] rounded-[12px] bg-[#f5f3ee]/50 hover:bg-[#f5f3ee] transition-all overflow-hidden">
                              <div className="flex items-center gap-4 p-4">
                                <button
                                  type="button"
                                  onClick={() => setPreviewModalOpen(true)}
                                  className="relative h-[68px] w-[90px] shrink-0 rounded-[8px] overflow-hidden border border-[#e0ddd6] shadow-sm group/thumb cursor-zoom-in bg-[#f5f3ee]"
                                  title="Click to zoom image"
                                >
                                  <Image
                                    alt="Hero Preview"
                                    src={imageUrl}
                                    fill
                                    sizes="90px"
                                    className="object-cover"
                                    unoptimized={imageUrl.startsWith("data:") || imageUrl.startsWith("blob:")}
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                                    <ZoomIn className="h-4 w-4 text-white" />
                                  </div>
                                </button>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[11px] font-bold text-[#2d5c3e] truncate leading-tight">
                                    {fileName || "hero-packaging.jpg"}
                                  </p>
                                  <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                                    Image uploaded
                                  </p>
                                  <div className="flex items-center gap-2 mt-2.5 relative">
                                    <label className="h-[28px] px-3 text-[10px] font-bold rounded-[6px] border border-[#e0ddd6] bg-white text-[#7a7672] hover:bg-[#f5f3ee] hover:text-[#1a1a1a] cursor-pointer flex items-center gap-1.5 transition-all relative overflow-hidden shadow-sm active:scale-95">
                                      <Upload className="h-3 w-3 text-[#e8732a]" />
                                      Replace
                                      <input
                                        ref={fileInputRef}
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        type="file"
                                        onChange={handleFileChange}
                                      />
                                    </label>
                                    <button
                                      type="button"
                                      onClick={handleRemoveImage}
                                      className="h-[28px] px-3 text-[10px] font-bold rounded-[6px] text-red-500 hover:bg-red-50 border border-red-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                                    >
                                      <X className="h-3 w-3" />
                                      Remove
                                    </button>
                                  </div>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                                  <Check className="h-4 w-4 text-green-600" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <label className="border-2 border-dashed border-[#d8d4cc] rounded-[12px] p-6 bg-[#faf8f5] hover:bg-[#f5f3ee] transition-all flex flex-col items-center justify-center text-center cursor-pointer group">
                              <div className="h-10 w-10 rounded-full bg-[#fdf0e8] text-[#e8732a] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                <Upload className="h-5 w-5" />
                              </div>
                              <span className="text-[12px] font-bold text-[#1a1a1a]">
                                Upload Hero Background Image
                              </span>
                              <span className="text-[10px] text-[#aaa6a0] mt-0.5">
                                Click or drag and drop image file here (PNG, JPG, WebP)
                              </span>
                              <input
                                ref={fileInputRef}
                                accept="image/*"
                                className="hidden"
                                type="file"
                                onChange={handleFileChange}
                              />
                            </label>
                          )}

                          <div className="space-y-1.5 p-3">
                            <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1">
                              Manual URL
                            </label>
                            <input
                              className="w-full h-[36px] px-[12px] text-[12px] bg-[#f5f3ee] border border-[#e0ddd6] rounded-[6px] focus:outline-none focus:border-[#e8732a]/40 transition-all text-[#1a1a1a] placeholder:text-[#aaa6a0]/50"
                              placeholder="Or paste an image URL..."
                              value={imageUrl}
                              onChange={(e) => {
                                setImageUrl(e.target.value);
                                setFileName(e.target.value.split("/").pop() || "custom-url");
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] text-[#aaa6a0] mt-2">
                        Recommended 1920x600px. Leave empty to use the default
                        hero image.
                      </p>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Hero image alt
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Trust Points (one per line)
                      </label>
                      <textarea
                        className="w-full min-h-[80px] p-3 text-[12px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] resize-none"
                        rows={3}
                        value={trustPoints}
                        onChange={(e) => setTrustPoints(e.target.value)}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                          BBB Title
                        </label>
                        <input
                          className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                          value={bbbTitle}
                          onChange={(e) => setBbbTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                          BBB Subtitle
                        </label>
                        <input
                          className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                          value={bbbSubtitle}
                          onChange={(e) => setBbbSubtitle(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Zoom Modal Preview */}
      {previewModalOpen && imageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#e0ddd6]">
            <div className="p-4 border-b border-[#e0ddd6] flex items-center justify-between bg-[#f5f3ee]/50">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#e8732a]" />
                <span className="text-[13px] font-bold text-[#1a1a1a]">
                  Hero Image Preview ({fileName})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white text-[#7a7672] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-[#1e3d2b] flex items-center justify-center min-h-[300px]">
              <img
                src={imageUrl}
                alt="Preview"
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
            <div className="p-3 border-t border-[#e0ddd6] bg-[#faf8f5] flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-[#e8732a] text-white text-[11px] font-bold cursor-pointer hover:bg-[#c45a18]"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
