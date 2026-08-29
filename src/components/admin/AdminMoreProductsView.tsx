"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  FileText,
  RefreshCw,
  Save,
  Plus,
  Trash2,
  Check,
  Search,
  Layers,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { getAllProducts } from "@/data/products";
import { fetchAllProducts, type CustomProductRecord } from "@/lib/product-service";
import { useToast } from "@/hooks/use-toast";
import { useCmsHomeSection } from "@/hooks/useCmsHomeSection";

export default function AdminMoreProductsView() {
  const { toast } = useToast();
  const { local, setLocal, save, saving, refetch } = useCmsHomeSection("moreProducts");
  
  const [allCatalogProducts, setAllCatalogProducts] = useState<CustomProductRecord[]>(() => {
    return getAllProducts().map((p) => ({
      ...p,
      id: `prod-${p.slug}`,
      image: (p as any).image || "/images/products/custom-cake-boxes.jpg",
    }));
  });

  const [showSection, setShowSection] = useState(true);
  const [maxProducts, setMaxProducts] = useState(24);
  const [sectionTitle, setSectionTitle] = useState("More Products");
  const [sectionDesc, setSectionDesc] = useState("");
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [isSaved, setIsSaved] = useState(false);

  // Load all products asynchronously from product-service
  useEffect(() => {
    async function loadAll() {
      try {
        const fullList = await fetchAllProducts();
        if (fullList && fullList.length > 0) {
          setAllCatalogProducts(fullList);
        }
      } catch (err) {
        console.error("Error loading products:", err);
      }
    }
    loadAll();
  }, []);

  useEffect(() => {
    if (local) {
      setShowSection(local.enabled !== false);
      setMaxProducts(local.limit ?? 24);
      setSectionTitle(local.title ?? "More Products");
      setSectionDesc(local.description ?? "");
      if (Array.isArray(local.selectedProductIds)) {
        setSelectedList(local.selectedProductIds);
      }
    }
  }, [local]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    allCatalogProducts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["all", ...Array.from(set).sort()];
  }, [allCatalogProducts]);

  const handleAddProduct = (name: string) => {
    if (!selectedList.includes(name)) {
      setSelectedList((prev) => [...prev, name]);
    }
  };

  const handleRemoveProduct = (name: string) => {
    setSelectedList((prev) => prev.filter((n) => n !== name));
  };

  const moveUp = (index: number) => {
    if (index <= 0) return;
    setSelectedList((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const moveDown = (index: number) => {
    if (index >= selectedList.length - 1) return;
    setSelectedList((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleReset = () => {
    if (refetch) {
      refetch();
    } else {
      setShowSection(true);
      setMaxProducts(24);
      setSectionTitle("More Products");
      setSectionDesc("");
      setSelectedList([]);
      setSearchQuery("");
      setSelectedCategoryFilter("all");
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
      limit: Number(maxProducts) || 24,
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

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("storage"));
    }

    setIsSaved(true);
    toast({
      title: "More Products Saved",
      description: `Saved ${selectedList.length} products to the homepage carousel.`,
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  const filteredCatalog = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allCatalogProducts.filter((p) => {
      const matchesCat =
        selectedCategoryFilter === "all" ||
        p.category?.toLowerCase() === selectedCategoryFilter.toLowerCase();
      
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [allCatalogProducts, searchQuery, selectedCategoryFilter]);

  const getProductMeta = (name: string) => {
    const q = name.toLowerCase().trim();
    return allCatalogProducts.find(
      (p) =>
        p.name.toLowerCase().trim() === q ||
        p.slug.toLowerCase().trim() === q ||
        p.name.toLowerCase().includes(q)
    );
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
                More Products Slider Manager
              </h1>
              <p className="text-[11px] text-[#aaa6a0] font-semibold mt-0.5 leading-relaxed">
                Choose and order products to display in the bottom carousel on the Homepage.
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
                    Section Settings
                  </h2>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                    DISPLAY PREFERENCES &amp; LIMITS
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
                        Max products in slider (1-40)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={40}
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
                        Selected Products Count
                      </label>
                      <div className="w-full min-h-[40px] px-3.5 flex items-center bg-[#faf8f5] border border-[#e0ddd6] rounded-lg text-[13px] font-semibold text-[#2d5c3e]">
                        {selectedList.length} product{selectedList.length === 1 ? "" : "s"} chosen
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                      Section description (optional)
                    </label>
                    <textarea
                      rows={2}
                      className="w-full p-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] resize-y"
                      value={sectionDesc}
                      onChange={(e) => setSectionDesc(e.target.value)}
                      placeholder="Optional subtitle for the More Products carousel..."
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Selected Products List with Reordering (Up/Down) */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 bg-white flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                      Selected Products ({selectedList.length})
                    </h2>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                      USE UP/DOWN ARROWS TO REORDER PRODUCTS IN THE CAROUSEL
                    </p>
                  </div>
                  {selectedList.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedList([])}
                      className="text-[11px] font-bold text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="divide-y divide-[#e0ddd6]/80 max-h-[380px] overflow-y-auto">
                  {selectedList.length === 0 ? (
                    <div className="p-8 text-center text-[#7a7672]">
                      <p className="text-[13px]">No custom products selected yet. Select products from the full catalog below.</p>
                    </div>
                  ) : (
                    selectedList.map((name, index) => {
                      const meta = getProductMeta(name);
                      const img = meta?.image || (meta?.images && meta.images[0]) || "/images/products/custom-cake-boxes.jpg";
                      return (
                        <div
                          key={name}
                          className="px-5 py-3 flex items-center justify-between hover:bg-[#faf8f5] transition-colors"
                        >
                          <div className="flex items-center gap-3.5 min-w-0 pr-3">
                            <span className="w-6 h-6 rounded-full bg-[#f0ede6] text-[#2d5c3e] text-[11px] font-bold inline-flex items-center justify-center shrink-0">
                              {index + 1}
                            </span>
                            <div className="w-10 h-10 rounded-lg bg-[#f0ede6] overflow-hidden relative shrink-0 border border-[#e0ddd6]">
                              {img ? (
                                <Image
                                  src={img}
                                  alt={name}
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#aaa6a0]">
                                  <Layers className="w-4 h-4" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[13px] font-bold text-[#1a1a1a] truncate">
                                {name}
                              </p>
                              <p className="text-[11px] text-[#7a7672] truncate">
                                {meta?.category || "Custom Box"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {/* Up Button */}
                            <button
                              type="button"
                              onClick={() => moveUp(index)}
                              disabled={index === 0}
                              className="p-1.5 rounded-lg border border-[#e0ddd6] bg-white text-[#7a7672] hover:bg-[#faf8f5] hover:text-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              title="Move Up"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>

                            {/* Down Button */}
                            <button
                              type="button"
                              onClick={() => moveDown(index)}
                              disabled={index === selectedList.length - 1}
                              className="p-1.5 rounded-lg border border-[#e0ddd6] bg-white text-[#7a7672] hover:bg-[#faf8f5] hover:text-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              title="Move Down"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>

                            {/* Remove Button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveProduct(name)}
                              className="p-1.5 text-[#aaa6a0] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
                              title="Remove from slider"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Card 3: All Available Products Catalog */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                        All Available Products ({allCatalogProducts.length} Total)
                      </h2>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                        SEARCH AND ADD PRODUCTS FROM ANY CATEGORY
                      </p>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#edf7f1] text-[#2d5c3e] border border-[#b8dfc8]">
                      {filteredCatalog.length} shown
                    </span>
                  </div>
                </div>

                {/* Search & Category Filter Controls */}
                <div className="p-5 border-b border-[#e0ddd6]/80 bg-[#faf8f5] space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa6a0]" />
                    <input
                      type="text"
                      className="w-full h-[40px] pl-10 pr-4 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                      placeholder="Search products by name, slug, or category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:thin]">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategoryFilter(cat)}
                        className={`px-3 py-1 text-[11px] font-bold rounded-full transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                          selectedCategoryFilter === cat
                            ? "bg-[#2d5c3e] text-white"
                            : "bg-white text-[#7a7672] border border-[#e0ddd6] hover:bg-white/80"
                        }`}
                      >
                        {cat === "all" ? "All Categories" : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Products List */}
                <div className="divide-y divide-[#e0ddd6]/80 max-h-[420px] overflow-y-auto">
                  {filteredCatalog.length === 0 ? (
                    <div className="p-8 text-center text-[#7a7672]">
                      <p className="text-[13px]">No products match your search/filter.</p>
                    </div>
                  ) : (
                    filteredCatalog.map((p) => {
                      const isSelected = selectedList.includes(p.name);
                      const img = p.image || (p.images && p.images[0]) || "/images/products/custom-cake-boxes.jpg";
                      return (
                        <div
                          key={(p as any).id || p.slug || p.name}
                          className="px-5 py-3 flex items-center justify-between hover:bg-[#faf8f5] transition-colors"
                        >
                          <div className="flex items-center gap-3.5 min-w-0 pr-4">
                            <div className="w-10 h-10 rounded-lg bg-[#f0ede6] overflow-hidden relative shrink-0 border border-[#e0ddd6]">
                              {img ? (
                                <Image
                                  src={img}
                                  alt={p.name}
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#aaa6a0]">
                                  <Layers className="w-4 h-4" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[13px] font-bold text-[#1a1a1a] truncate">
                                {p.name}
                              </p>
                              <p className="text-[11px] text-[#7a7672] truncate">
                                {p.category || "Custom Box"} • /{p.slug}
                              </p>
                            </div>
                          </div>

                          {isSelected ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#edf7f1] text-[#2d5c3e] border border-[#b8dfc8] shrink-0">
                              <Check className="w-3.5 h-3.5" />
                              Added
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleAddProduct(p.name)}
                              className="inline-flex items-center gap-1 h-[32px] px-3.5 text-[11px] font-bold rounded-lg border border-[#e0ddd6] bg-white text-[#1a1a1a] hover:bg-[#faf8f5] hover:border-[#2d5c3e] transition-colors shadow-sm shrink-0 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5 text-[#e8732a]" />
                              Add
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
