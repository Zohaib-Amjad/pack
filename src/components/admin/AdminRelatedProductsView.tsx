"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  FileText,
  RefreshCw,
  Save,
  Check,
  Search,
} from "lucide-react";
import { getAllProducts } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { useCmsHomeSection } from "@/hooks/useCmsHomeSection";

const INITIAL_SELECTED_NAMES = [
  "3.5 Mylar Bags",
  "Bakery boxes With Window",
  "Bath Bomb Boxes",
  "Black Tube Packaging ",
  "Blank Cigarette Boxes",
  "Blunt Packaging",
  "Candle Display Boxes",
  "Candle Dust Covers",
  "Candle Gift Boxes",
];

export default function AdminRelatedProductsView() {
  const { toast } = useToast();
  const { local, setLocal, save, saving, refetch } = useCmsHomeSection("relatedProducts");
  const allCatalogProducts = useMemo(() => getAllProducts(), []);

  const [sectionLabel, setSectionLabel] = useState("Trending");
  const [showSection, setShowSection] = useState(true);
  const [autoFill, setAutoFill] = useState(true);
  const [titleLead, setTitleLead] = useState("Trending");
  const [titleAccent, setTitleAccent] = useState("Now");
  const [viewAllLabel, setViewAllLabel] = useState("See all");
  const [viewAllLink, setViewAllLink] = useState("/catalog");
  const [fallbackLimit, setFallbackLimit] = useState(6);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(INITIAL_SELECTED_NAMES);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (local) {
      setSectionLabel(local.sectionLabel ?? "Trending");
      setShowSection(local.enabled !== false);
      setAutoFill(local.autoFillWhenEmpty !== false);
      setTitleLead(local.titleLead ?? "Trending");
      setTitleAccent(local.titleAccent ?? "Now");
      setViewAllLabel(local.viewAllLabel ?? "See all");
      setViewAllLink(local.viewAllHref ?? "/catalog");
      setFallbackLimit(local.limit ?? 6);
      if (Array.isArray(local.selectedProductIds) && local.selectedProductIds.length > 0) {
        setSelectedProducts(local.selectedProductIds);
      }
    }
  }, [local]);

  const toggleProduct = (name: string) => {
    setSelectedProducts((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const handleReset = () => {
    if (refetch) {
      refetch();
    } else {
      setSectionLabel("Trending");
      setShowSection(true);
      setAutoFill(true);
      setTitleLead("Trending");
      setTitleAccent("Now");
      setViewAllLabel("See all");
      setViewAllLink("/catalog");
      setFallbackLimit(6);
      setSelectedProducts(INITIAL_SELECTED_NAMES);
      setSearchQuery("");
    }
    toast({
      title: "Reset from server",
      description: "Restored latest related products settings from Supabase.",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      enabled: showSection,
      autoFillWhenEmpty: autoFill,
      sectionLabel,
      titleLead,
      titleAccent,
      viewAllLabel,
      viewAllHref: viewAllLink,
      limit: Number(fallbackLimit) || 6,
      selectedProductIds: selectedProducts,
    };

    if (setLocal) {
      setLocal(updated);
    }

    if (save) {
      await save(updated);
    }

    setIsSaved(true);
    toast({
      title: "Related Products Saved",
      description: "Updated trending products section settings in Supabase.",
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Combine initial list with catalog products
  const productList = useMemo(() => {
    const namesSet = new Set<string>();
    const list: string[] = [];

    // Push initial checked names first
    INITIAL_SELECTED_NAMES.forEach((name) => {
      if (!namesSet.has(name)) {
        namesSet.add(name);
        list.push(name);
      }
    });

    // Push all catalog products
    allCatalogProducts.forEach((p) => {
      if (!namesSet.has(p.name)) {
        namesSet.add(p.name);
        list.push(p.name);
      }
    });

    return list;
  }, [allCatalogProducts]);

  const filteredProducts = productList.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <form onSubmit={handleSave} className="flex flex-col gap-5 max-w-[920px]">
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

              {/* Card 1: Related products Header & Options */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 bg-white">
                  <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                    Related products
                  </h2>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                    MANUAL HOMEPAGE PRODUCT SELECTION WITH OPTIONAL FALLBACK
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Row 1: Section label + Show section */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Section label
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={sectionLabel}
                        onChange={(e) => setSectionLabel(e.target.value)}
                        placeholder="Trending"
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="w-full h-[40px] px-4 rounded-lg border border-[#e0ddd6] bg-[#faf8f5] flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={showSection}
                          onChange={(e) => setShowSection(e.target.checked)}
                          className="w-4 h-4 rounded text-[#2d5c3e] focus:ring-[#2d5c3e] border-[#d8d4cc]"
                        />
                        <span className="text-[12px] font-bold text-[#1a1a1a]">
                          Show section on homepage
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Row 2: Auto-fill + Title lead */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <label className="w-full h-[40px] px-4 rounded-lg border border-[#e0ddd6] bg-[#faf8f5] flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={autoFill}
                          onChange={(e) => setAutoFill(e.target.checked)}
                          className="w-4 h-4 rounded text-[#2d5c3e] focus:ring-[#2d5c3e] border-[#d8d4cc]"
                        />
                        <span className="text-[12px] font-bold text-[#1a1a1a]">
                          Auto-fill when no products selected
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Title lead
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={titleLead}
                        onChange={(e) => setTitleLead(e.target.value)}
                        placeholder="Trending"
                      />
                    </div>
                  </div>

                  {/* Row 3: Title accent + View-all label */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Title accent
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={titleAccent}
                        onChange={(e) => setTitleAccent(e.target.value)}
                        placeholder="Now"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        View-all label
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={viewAllLabel}
                        onChange={(e) => setViewAllLabel(e.target.value)}
                        placeholder="See all"
                      />
                    </div>
                  </div>

                  {/* Row 4: View-all link + Fallback limit */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        View-all link
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={viewAllLink}
                        onChange={(e) => setViewAllLink(e.target.value)}
                        placeholder="/catalog"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Fallback limit (1-24)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={24}
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={fallbackLimit}
                        onChange={(e) => setFallbackLimit(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  {/* Selected Products Count */}
                  <div>
                    <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                      Selected products count
                    </label>
                    <input
                      disabled
                      className="w-full min-h-[40px] px-3.5 text-[13px] bg-[#faf8f5] border border-[#e0ddd6] rounded-lg text-[#7a7672] font-semibold cursor-not-allowed"
                      value={selectedProducts.length}
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Select Products List */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 bg-white">
                  <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                    Select products
                  </h2>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                    SELECTED PRODUCTS SHOW FIRST AND KEEP MANUAL ORDER
                  </p>
                </div>

                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 bg-white">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa6a0]" />
                    <input
                      type="text"
                      className="w-full h-[40px] pl-10 pr-4 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="divide-y divide-[#e0ddd6]/80 max-h-[360px] overflow-y-auto">
                  {filteredProducts.map((name) => {
                    const isChecked = selectedProducts.includes(name);
                    return (
                      <div
                        key={name}
                        onClick={() => toggleProduct(name)}
                        className="px-5 py-3.5 flex items-center justify-between hover:bg-[#faf8f5] cursor-pointer transition-colors"
                      >
                        <span className="text-[13px] font-semibold text-[#1a1a1a]">
                          {name}
                        </span>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isChecked
                              ? "bg-[#2d5c3e] border-[#2d5c3e] text-white"
                              : "bg-white border-[#d8d4cc]"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
