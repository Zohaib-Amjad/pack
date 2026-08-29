"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  FileText,
  RefreshCw,
  Save,
  Plus,
  Trash2,
  Check,
  Search,
} from "lucide-react";
import { getAllProducts } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { useCmsHomeSection } from "@/hooks/useCmsHomeSection";

export default function AdminMoreProductsView() {
  const { toast } = useToast();
  const { local, setLocal, save, saving, refetch } = useCmsHomeSection("moreProducts");
  const allCatalogProducts = useMemo(() => getAllProducts(), []);

  const [showSection, setShowSection] = useState(true);
  const [maxProducts, setMaxProducts] = useState(12);
  const [sectionTitle, setSectionTitle] = useState("More Products");
  const [sectionDesc, setSectionDesc] = useState("");
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (local) {
      setShowSection(local.enabled !== false);
      setMaxProducts(local.limit ?? 12);
      setSectionTitle(local.title ?? "More Products");
      setSectionDesc(local.description ?? "");
      if (Array.isArray(local.selectedProductIds)) {
        setSelectedList(local.selectedProductIds);
      }
    }
  }, [local]);

  const handleAddProduct = (name: string) => {
    if (!selectedList.includes(name)) {
      setSelectedList((prev) => [...prev, name]);
    }
  };

  const handleRemoveProduct = (name: string) => {
    setSelectedList((prev) => prev.filter((n) => n !== name));
  };

  const handleReset = () => {
    if (refetch) {
      refetch();
    } else {
      setShowSection(true);
      setMaxProducts(12);
      setSectionTitle("More Products");
      setSectionDesc("");
      setSelectedList([]);
      setSearchQuery("");
    }
    toast({
      title: "Reset from server",
      description: "Restored latest more products settings from Supabase.",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      enabled: showSection,
      limit: Number(maxProducts) || 12,
      title: sectionTitle,
      description: sectionDesc,
      selectedProductIds: selectedList,
    };

    if (setLocal) {
      setLocal(updated);
    }

    if (save) {
      await save(updated);
    }

    setIsSaved(true);
    toast({
      title: "More Products Saved",
      description: "Updated more products slider configuration in Supabase.",
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  const filteredCatalog = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allCatalogProducts;
    return allCatalogProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q))
    );
  }, [allCatalogProducts, searchQuery]);

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
            <form onSubmit={handleSave} className="flex max-w-[920px] flex-col gap-5">
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

              {/* Card 1: More Products Settings */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 bg-white">
                  <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                    More products
                  </h2>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                    CAROUSEL SECTION SHOWN NEAR THE BOTTOM OF THE HOMEPAGE
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Row 1: Show Section + Max Products */}
                  <div className="grid sm:grid-cols-2 gap-4">
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
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Max products to show (1-24)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={24}
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={maxProducts}
                        onChange={(e) => setMaxProducts(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  {/* Row 2: Section Title + Selected Count */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Section title
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={sectionTitle}
                        onChange={(e) => setSectionTitle(e.target.value)}
                        placeholder="More Products"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Selected products count
                      </label>
                      <input
                        disabled
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-[#faf8f5] border border-[#e0ddd6] rounded-lg text-[#7a7672] font-semibold cursor-not-allowed"
                        value={selectedList.length}
                      />
                    </div>
                  </div>

                  {/* Row 3: Section Description */}
                  <div>
                    <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                      Section description (optional)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3.5 py-2 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] resize-none"
                      value={sectionDesc}
                      onChange={(e) => setSectionDesc(e.target.value)}
                      placeholder="Add an optional subtitle for this carousel..."
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Selected Order */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 bg-white">
                  <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                    Selected order
                  </h2>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                    THESE PRODUCTS APPEAR IN THIS EXACT ORDER IN THE SLIDER
                  </p>
                </div>

                <div className="divide-y divide-[#e0ddd6]/80 bg-white">
                  {selectedList.length === 0 ? (
                    <div className="p-8 text-center text-[13px] text-[#aaa6a0] font-medium">
                      No selected products yet.
                    </div>
                  ) : (
                    selectedList.map((name, index) => (
                      <div
                        key={name}
                        className="px-5 py-3.5 flex items-center justify-between hover:bg-[#faf8f5] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#f5f3ee] text-[#7a7672] text-[11px] font-bold flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-[13px] font-bold text-[#1a1a1a]">
                            {name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(name)}
                          className="p-1.5 text-[#aaa6a0] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Card 3: Add Products */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 bg-white">
                  <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                    Add products
                  </h2>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                    SEARCH AND ADD PRODUCTS TO THE SLIDER
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
                  {filteredCatalog.map((p) => {
                    const isSelected = selectedList.includes(p.name);
                    return (
                      <div
                        key={(p as any).id || p.slug || p.name}
                        className="px-5 py-3.5 flex items-center justify-between hover:bg-[#faf8f5] transition-colors"
                      >
                        <span className="text-[13px] font-semibold text-[#1a1a1a]">
                          {p.name}
                        </span>
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#edf7f1] text-[#2d5c3e] border border-[#b8dfc8]">
                            <Check className="w-3.5 h-3.5" />
                            Added
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAddProduct(p.name)}
                            className="inline-flex items-center gap-1 h-[32px] px-3 text-[11px] font-bold rounded-lg border border-[#e0ddd6] bg-white text-[#1a1a1a] hover:bg-[#faf8f5] transition-colors shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#e8732a]" />
                            Add
                          </button>
                        )}
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
