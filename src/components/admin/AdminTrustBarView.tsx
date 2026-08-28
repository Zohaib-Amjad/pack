"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FileText,
  RefreshCw,
  Save,
  Plus,
  Trash2,
  Check,
  ZoomIn,
  Upload,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCmsHomeSection } from "@/hooks/useCmsHomeSection";

interface BrandItem {
  id: string;
  name: string;
  logoUrl?: string;
  active: boolean;
}

const INITIAL_BRANDS: BrandItem[] = [
  {
    id: "b-1",
    name: "ShopMax",
    logoUrl: "/images/brand/ecd0a299-c933-483c-8dae-143ef4f0e161.png",
    active: true,
  },
  {
    id: "b-2",
    name: "NatureCo",
    logoUrl: "/images/brand/3bd7a2a2-3d40-49f1-8e82-989a4dff53cc.png",
    active: true,
  },
  {
    id: "b-3",
    name: "TechStart",
    logoUrl: "/images/brand/b341f936-f848-42cd-af1a-f831636cf01f.png",
    active: true,
  },
  {
    id: "b-4",
    name: "LuxeLife",
    logoUrl: "/images/brand/b0b85fe9-b81e-4fad-8cad-2b71c4729bdb.png",
    active: true,
  },
  {
    id: "b-5",
    name: "GreenBox",
    logoUrl: "/images/brand/0a990bf6-8e5d-45f2-95fa-731cf04a372d.png",
    active: true,
  },
  {
    id: "b-6",
    name: "PackWell",
    logoUrl: "/images/brand/d3857c33-8009-408d-a1e6-419253e4b7e2.png",
    active: true,
  },
  {
    id: "b-7",
    name: "EcoCrate",
    logoUrl: "/images/brand/dfbeb843-6fbb-448f-9f14-216c4cefe79c.png",
    active: true,
  },
  {
    id: "b-8",
    name: "Gilead",
    logoUrl: "/images/brand/5e8d59d6-1d11-46c8-999f-241cd91f9255.png",
    active: true,
  },
  {
    id: "b-9",
    name: "Cheerios",
    logoUrl: "/images/brand/9054bf8b-322c-4550-a2d1-903dc24941f5.png",
    active: true,
  },
  {
    id: "b-10",
    name: "Woosh",
    logoUrl: "/images/brand/b234ce64-2b35-4fdc-af62-ef6d50c0956b.png",
    active: true,
  },
  {
    id: "b-11",
    name: "Rare Beauty",
    logoUrl: "/images/brand/5ca043b3-ab32-4348-9cfa-48f5505bd720.png",
    active: true,
  },
  {
    id: "b-12",
    name: "Subtl",
    logoUrl: "/images/brand/028d5bd8-177b-4f7a-8612-6f643f9dc05d.png",
    active: true,
  },
];

export default function AdminTrustBarView() {
  const { toast } = useToast();
  const { local, setLocal, save, saving, refetch } = useCmsHomeSection("trustBar");

  const [trustedPrefix, setTrustedPrefix] = useState("Trusted by");
  const [brandsCount, setBrandsCount] = useState("1,000+");
  const [trustedSuffix, setTrustedSuffix] = useState("brands");
  const [ratingLine, setRatingLine] = useState("3.9 on Google");
  const [usaBadge, setUsaBadge] = useState("USA Registered");
  const [brands, setBrands] = useState<BrandItem[]>(INITIAL_BRANDS);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (local) {
      setTrustedPrefix(local.trustedPrefix ?? "Trusted by");
      setBrandsCount(local.brandsCount ?? "1,000+");
      setTrustedSuffix(local.trustedSuffix ?? "brands");
      setRatingLine(local.ratingText ?? "3.9 on Google");
      setUsaBadge(local.usaBadge ?? "USA Registered");
      if (local.brandMarqueeItems && Array.isArray(local.brandMarqueeItems) && local.brandMarqueeItems.length > 0) {
        setBrands(
          local.brandMarqueeItems.map((it, idx) => ({
            id: it.id || `b-${idx}`,
            name: it.text ?? "",
            logoUrl: it.logoUrl ?? "",
            active: it.active !== false,
          }))
        );
      }
    }
  }, [local]);

  const handleToggleBrandActive = (id: string) => {
    setBrands((prev) =>
      prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
    );
  };

  const handleUpdateBrandName = (id: string, name: string) => {
    setBrands((prev) =>
      prev.map((b) => (b.id === id ? { ...b, name } : b))
    );
  };

  const handleUpdateBrandLogo = (id: string, logoUrl: string) => {
    setBrands((prev) =>
      prev.map((b) => (b.id === id ? { ...b, logoUrl } : b))
    );
  };

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          handleUpdateBrandLogo(id, result);
          toast({
            title: "Logo Loaded",
            description: `Loaded ${file.name} (${Math.round(file.size / 1024)} KB)`,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBrand = () => {
    const newB: BrandItem = {
      id: `b-${Date.now()}`,
      name: "",
      logoUrl: "",
      active: true,
    };
    setBrands((prev) => [...prev, newB]);
  };

  const handleRemoveBrand = (id: string) => {
    setBrands((prev) => prev.filter((b) => b.id !== id));
  };

  const handleReset = () => {
    if (refetch) {
      refetch();
    } else {
      setTrustedPrefix("Trusted by");
      setBrandsCount("1,000+");
      setTrustedSuffix("brands");
      setRatingLine("3.9 on Google");
      setUsaBadge("USA Registered");
      setBrands(INITIAL_BRANDS);
    }
    toast({
      title: "Reset from server",
      description: "Restored latest trust bar settings from Supabase.",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTrustBar = {
      trustedPrefix,
      brandsCount,
      trustedSuffix,
      ratingText: ratingLine,
      usaBadge,
      brandMarqueeItems: brands.map((b) => ({
        id: b.id,
        text: b.name,
        logoUrl: b.logoUrl,
        active: b.active,
      })),
    };

    if (setLocal) {
      setLocal(updatedTrustBar);
    }

    if (save) {
      await save(updatedTrustBar);
    }

    setIsSaved(true);
    toast({
      title: "Trust Bar Saved",
      description: "Updated social proof statistics and brand marquee logos in Supabase.",
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  const getFileName = (url?: string) => {
    if (!url) return "No logo chosen";
    const parts = url.split("/");
    const last = parts[parts.length - 1] || "image.png";
    return last.length > 32 ? `${last.substring(0, 30)}...` : last;
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

              {/* Card 1: Trust bar */}
              <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                  <div className="ch-l flex-1">
                    <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                      Trust bar
                    </div>
                    <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                      Social proof strip below hero
                    </div>
                  </div>
                </div>

                <div className="cb p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Trusted prefix
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={trustedPrefix}
                        onChange={(e) => setTrustedPrefix(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Brands count (bold)
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={brandsCount}
                        onChange={(e) => setBrandsCount(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Trusted suffix
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={trustedSuffix}
                        onChange={(e) => setTrustedSuffix(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Rating line
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={ratingLine}
                        onChange={(e) => setRatingLine(e.target.value)}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        USA badge
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={usaBadge}
                        onChange={(e) => setUsaBadge(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Brand marquee */}
              <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                  <div className="ch-l flex-1">
                    <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                      Brand marquee
                    </div>
                    <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                      Scrolling names — inactive rows stay saved but are hidden on the site
                    </div>
                  </div>
                </div>

                <div className="cb p-0">
                  <div className="flex flex-col gap-0 border-b border-[#e0ddd6] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[11px] font-semibold leading-relaxed text-[#7a7672]">
                      Only <span className="text-[#1a1a1a] font-bold">Active</span> names appear in the lower marquee strip.
                    </p>
                    <button
                      type="button"
                      onClick={handleAddBrand}
                      className="mt-2 inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#e0ddd6] bg-white px-3 py-2 text-[11px] font-bold text-[#1a1a1a] shadow-sm transition-colors hover:border-[#2d5c3e]/25 hover:bg-[#f5f3ee] sm:mt-0 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add brand name
                    </button>
                  </div>

                  <div className="divide-y divide-[#e0ddd6]">
                    {brands.map((brand, index) => (
                      <div key={brand.id} className="flex flex-col gap-3 px-4 py-4 hover:bg-[#faf8f5]/50 transition-colors">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#aaa6a0]">
                            Brand {index + 1}
                          </span>
                          <div className="flex shrink-0 flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${brand.active
                                  ? "bg-[#edf7f1] text-[#2d5c3e] border border-[#b8dfc8]"
                                  : "bg-[#f0ede6] text-[#7a7672] border border-[#e0ddd6]"
                                }`}
                            >
                              {brand.active ? "Visible" : "Hidden"}
                            </span>
                            <label
                              onClick={() => handleToggleBrandActive(brand.id)}
                              className="inline-flex cursor-pointer select-none items-center gap-2 rounded-md border border-[#e0ddd6] bg-[#f5f3ee]/50 px-2.5 py-1 text-[11px] font-bold text-[#1a1a1a]"
                            >
                              <div
                                className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                                  brand.active
                                    ? "bg-[#2d5c3e] border-[#2d5c3e] text-white"
                                    : "bg-white border-[#d8d4cc]"
                                }`}
                              >
                                {brand.active && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </div>
                              Active
                            </label>
                            <button
                              type="button"
                              onClick={() => handleRemoveBrand(brand.id)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#e0ddd6] bg-white text-[#7a7672] transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                              title="Remove brand"
                              aria-label="Remove brand"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1.5 block">
                              Brand name{" "}
                              <span className="font-normal text-[#aaa6a0]">
                                (shown when no logo)
                              </span>
                            </label>
                            <input
                              className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                              placeholder="e.g. GlowCo"
                              value={brand.name}
                              onChange={(e) => handleUpdateBrandName(brand.id, e.target.value)}
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1.5 block">
                              Logo image{" "}
                              <span className="font-normal text-[#aaa6a0]">
                                (optional — replaces text)
                              </span>
                            </label>
                            <div className="rounded-[12px] border border-[#e0ddd6] overflow-hidden bg-[#f5f3ee]/30">
                              <div className="space-y-3">
                                {brand.logoUrl ? (
                                  <div className="border-2 border-dashed border-[#e0ddd6] rounded-[12px] bg-[#f5f3ee]/50 hover:bg-[#f5f3ee] transition-all overflow-hidden">
                                    <div className="flex items-center gap-4 p-4">
                                      <button
                                        type="button"
                                        onClick={() => setPreviewImage(brand.logoUrl || null)}
                                        className="relative h-[68px] w-[90px] shrink-0 rounded-[8px] overflow-hidden border border-[#e0ddd6] shadow-sm group/thumb cursor-zoom-in bg-white p-2"
                                      >
                                        <Image
                                          alt="Preview"
                                          src={brand.logoUrl}
                                          fill
                                          sizes="90px"
                                          className="object-contain p-1"
                                          unoptimized={brand.logoUrl.startsWith("data:") || brand.logoUrl.startsWith("blob:")}
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                                          <ZoomIn className="h-4 w-4 text-white" />
                                        </div>
                                      </button>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-[11px] font-bold text-[#2d5c3e] truncate leading-tight">
                                          {getFileName(brand.logoUrl)}
                                        </p>
                                        <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                                          Image uploaded
                                        </p>
                                        <div className="flex items-center gap-2 mt-2.5 relative">
                                          <label className="h-[28px] px-3 text-[10px] font-bold rounded-[6px] border border-[#e0ddd6] text-[#7a7672] hover:bg-white cursor-pointer flex items-center gap-1.5 transition-all relative overflow-hidden">
                                            <Upload className="h-3 w-3" />
                                            Replace
                                            <input
                                              accept="image/*"
                                              className="absolute inset-0 opacity-0 cursor-pointer"
                                              type="file"
                                              onChange={(e) => handleFileUpload(brand.id, e)}
                                            />
                                          </label>
                                          <button
                                            type="button"
                                            onClick={() => handleUpdateBrandLogo(brand.id, "")}
                                            className="h-[28px] px-3 text-[10px] font-bold rounded-[6px] text-red-500 hover:bg-red-50 border border-red-100 flex items-center gap-1.5 transition-all cursor-pointer"
                                          >
                                            <X className="h-3 w-3" />
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                      <div className="h-8 w-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                                        <Check className="h-4 w-4 text-green-500" />
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="p-3">
                                    <label className="h-[36px] px-4 text-[11px] font-bold rounded-[6px] border border-[#e0ddd6] bg-white text-[#7a7672] hover:bg-[#faf8f5] cursor-pointer flex items-center gap-2 transition-all relative overflow-hidden w-fit">
                                      <Upload className="h-3.5 w-3.5" />
                                      Upload brand logo
                                      <input
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        type="file"
                                        onChange={(e) => handleFileUpload(brand.id, e)}
                                      />
                                    </label>
                                  </div>
                                )}
                                <div className="space-y-1.5 p-3">
                                  <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1">
                                    Manual URL
                                  </label>
                                  <input
                                    className="w-full h-[36px] px-[12px] text-[12px] bg-[#f5f3ee] border border-[#e0ddd6] rounded-[6px] focus:outline-none focus:border-[#e8732a]/40 transition-all text-[#1a1a1a] placeholder:text-[#aaa6a0]/50"
                                    placeholder="Or paste an image URL..."
                                    value={brand.logoUrl || ""}
                                    onChange={(e) => handleUpdateBrandLogo(brand.id, e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Zoom Modal Preview */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#e0ddd6] p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[13px] font-bold text-[#1a1a1a]">Logo Preview</span>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-1 rounded-lg hover:bg-[#f5f3ee] text-[#7a7672]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-[#f5f3ee] p-6 rounded-xl flex items-center justify-center min-h-[160px]">
              <img
                src={previewImage}
                alt="Logo"
                className="max-h-24 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
