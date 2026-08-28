"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Package,
  X,
  Link2,
  Upload,
  LayoutTemplate,
  ChevronDown,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { categories, getAllProducts } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

export default function AdminProductNewView() {
  const router = useRouter();
  const { toast } = useToast();
  const allExistingProducts = getAllProducts();

  // Core fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [section, setSection] = useState<"industry" | "material" | "style">("industry");
  const [isVisible, setIsVisible] = useState(true);
  const [isTrending, setIsTrending] = useState(false);
  const [showInFooter, setShowInFooter] = useState(false);
  const [relatedSearch, setRelatedSearch] = useState("");
  const [selectedRelated, setSelectedRelated] = useState<string[]>([]);
  const [simpleDescription, setSimpleDescription] = useState("");

  // SEO
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [allowIndexing, setAllowIndexing] = useState(true);

  // Schema
  const [schemaImage, setSchemaImage] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [ratingCount, setRatingCount] = useState("");

  // Specs
  const [boxStyle, setBoxStyle] = useState("");
  const [quantity, setQuantity] = useState("Starting from 100 Units");
  const [stockInfo, setStockInfo] = useState(
    "10pt to 28pt Kraft, Corrugated, Rigid, Cardstock"
  );
  const [printingOptions, setPrintingOptions] = useState(
    "CMYK, PMS, No Printing, Offset High Fidelity"
  );
  const [finishingOptions, setFinishingOptions] = useState(
    "Gloss, Matte, Aqua Coating, Foil Stamping, Spot UV"
  );

  // Content accordions
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    contentBlocks: true,
    articleBody: true,
  });

  const [contentBlocks, setContentBlocks] = useState<
    { title: string; desc: string; image: string }[]
  >([]);
  const [articleBlocks, setArticleBlocks] = useState<
    { type: string; content: string }[]
  >([]);

  // Gallery
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
    );
  };

  const handleAddContentBlock = () => {
    setContentBlocks((prev) => [
      ...prev,
      { title: "", desc: "", image: "" },
    ]);
  };

  const handleAddArticleBlock = (type: string) => {
    setArticleBlocks((prev) => [
      ...prev,
      { type, content: type === "Divider" ? "---" : "" },
    ]);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        variant: "destructive",
        title: "Product name required",
        description: "Please enter a product name.",
      });
      return;
    }

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Product Created",
        description: `"${name}" has been published to the catalog.`,
      });
      router.push("/admin/products");
    }, 800);
  };

  const filteredRelated = allExistingProducts.filter((p) =>
    p.name.toLowerCase().includes(relatedSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0">
      {/* Subtabs Bar */}
      <div className="ptabs bg-white/70 backdrop-blur-sm border-b border-[#e0ddd6]/60 flex px-5 sm:px-6 shrink-0 overflow-x-auto gap-4 [scrollbar-width:thin]">
        <Link
          href="/admin/products"
          className="ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-[#2d5c3e]"
        >
          Product Catalog
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
        </Link>
        <Link
          href="/admin/products"
          className="ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-[#aaa6a0] hover:text-[#1a1a1a]"
        >
          Import / Export
        </Link>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-6">
            {/* Header with Title */}
            <div className="flex items-center gap-4">
              <Link
                href="/admin/products"
                className="h-9 w-9 rounded-lg border border-[#e0ddd6] bg-white flex items-center justify-center text-[#7a7672] hover:bg-[#f5f3ee] transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-[20px] font-bold text-[#1a1a1a]">
                  Add New Product
                </h1>
                <p className="text-[12px] text-[#aaa6a0] font-medium uppercase tracking-wider">
                  Expand your catalog with a new product
                </p>
              </div>
            </div>

            {/* Main Form Card Container */}
            <div className="w-full bg-white/90 backdrop-blur-md rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#e0ddd6]/80 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-700">
              <div className="p-[24px_32px] border-b border-[#e0ddd6]/60 flex items-center justify-between shrink-0 bg-gradient-to-r from-[#f5f3ee]/50 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-[#2d5c3e] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(45,92,62,0.2)] animate-in slide-in-from-left-4 duration-500">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-bold text-[#1a1a1a] tracking-tight">
                      Add New Product
                    </h2>
                    <p className="text-[11px] text-[#aaa6a0] font-semibold uppercase tracking-widest leading-none mt-1">
                      Catalog Management
                    </p>
                  </div>
                </div>

                <Link
                  href="/admin/products"
                  className="p-2.5 hover:bg-[#f5f3ee] rounded-xl transition-all text-[#aaa6a0] hover:text-[#1a1a1a] hover:rotate-90 duration-300"
                >
                  <X className="h-5 w-5" />
                </Link>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-10">
                {/* 1. Core Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#e8732a]/30 to-transparent" />
                    <span className="text-[11px] font-bold text-[#e8732a] uppercase tracking-[0.2em]">
                      Core Information
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#e8732a]/30 to-transparent" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        Product Name
                      </label>
                      <input
                        required
                        className="w-full h-11 px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a] focus:ring-3 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#A8A29E] hover:border-[#e8732a]/40"
                        placeholder="e.g., Luxury Donut Boxes"
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-0 block">
                          Slug (URL)
                        </label>
                        <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 border bg-[#2d5c3e]/10 text-[#2d5c3e] border-[#2d5c3e]/20 select-none">
                          <div className="w-1 h-1 rounded-full bg-[#2d5c3e] animate-pulse" />
                          Synced
                          <Link2 className="w-3 h-3" />
                        </span>
                      </div>
                      <input
                        required
                        className="w-full h-11 px-4 text-[12px] font-mono bg-[#2d5c3e]/5 border border-[#2d5c3e]/20 rounded-xl focus:outline-none focus:border-[#e8732a] text-[#2d5c3e]/70 placeholder:text-[#A8A29E]"
                        placeholder="luxury-donut-boxes"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full h-11 px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a] focus:ring-3 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] cursor-pointer"
                      >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                          <option key={c.slug} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        Section
                      </label>
                      <select
                        value={section}
                        onChange={(e) =>
                          setSection(e.target.value as "industry" | "material" | "style")
                        }
                        className="w-full h-11 px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a] focus:ring-3 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] cursor-pointer"
                      >
                        <option value="industry">Industry</option>
                        <option value="material">Material</option>
                        <option value="style">Style</option>
                      </select>
                    </div>
                  </div>

                  {/* Visibility Checkboxes */}
                  <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                    <input
                      className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                      type="checkbox"
                      checked={isVisible}
                      onChange={(e) => setIsVisible(e.target.checked)}
                    />
                    <div>
                      <span className="text-[12px] font-bold text-[#1a1a1a]">
                        Visible on site
                      </span>
                      <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                        Uncheck to hide this product from the storefront and search; direct URLs will show as not found.
                      </p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#fff8f5]/60 px-4 py-3">
                    <input
                      className="h-4 w-4 accent-[#e8732a] cursor-pointer"
                      type="checkbox"
                      checked={isTrending}
                      onChange={(e) => setIsTrending(e.target.checked)}
                    />
                    <div>
                      <span className="text-[12px] font-bold text-[#1a1a1a]">
                        Show in Trending Now
                      </span>
                      <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                        Feature this product in the &ldquo;Trending Now&rdquo; section on the homepage. Up to 6 products are shown.
                      </p>
                    </div>
                    <span className="ml-auto shrink-0 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-[#fff0e8] text-[#e8732a] border border-[#f5c8a8]">
                      Homepage
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                    <input
                      className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                      type="checkbox"
                      checked={showInFooter}
                      onChange={(e) => setShowInFooter(e.target.checked)}
                    />
                    <div>
                      <span className="text-[12px] font-bold text-[#1a1a1a]">
                        Show in Footer
                      </span>
                      <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                        Display this product in the Products column of the site footer. Up to 8 products are shown.
                      </p>
                    </div>
                    <span className="ml-auto shrink-0 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-[#edf7f1] text-[#2d5c3e] border border-[#b8dfc8]">
                      Footer
                    </span>
                  </label>

                  {/* Related Products Picker */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                      Related Products
                    </label>
                    <div className="rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/20 p-3">
                      <input
                        className="w-full h-11 px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a] focus:ring-3 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#A8A29E]"
                        placeholder="Search products…"
                        value={relatedSearch}
                        onChange={(e) => setRelatedSearch(e.target.value)}
                      />
                      <div className="mt-3 max-h-[260px] overflow-auto pr-1">
                        <div className="grid gap-2">
                          {filteredRelated.slice(0, 30).map((p) => {
                            const isChecked = selectedRelated.includes(p.slug);
                            return (
                              <label
                                key={p.slug}
                                className="flex cursor-pointer items-center gap-3 rounded-[10px] bg-white/70 border border-[#e0ddd6] px-3 py-2 hover:bg-white transition-colors"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      setSelectedRelated((prev) =>
                                        prev.filter((s) => s !== p.slug)
                                      );
                                    } else {
                                      setSelectedRelated((prev) => [
                                        ...prev,
                                        p.slug,
                                      ]);
                                    }
                                  }}
                                  className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                                />
                                <span className="text-[12px] font-bold text-[#1a1a1a]">
                                  {p.name}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary / Hero Description */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                      Simple Description (Summary for Hero Section)
                    </label>
                    <textarea
                      className="w-full px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a] focus:ring-3 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#A8A29E] min-h-[100px] py-3 resize-none"
                      placeholder="A short summary of the product for the hero section..."
                      value={simpleDescription}
                      onChange={(e) => setSimpleDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* 2. SEO Settings */}
                <div className="space-y-6 pt-4 border-t border-[#e0ddd6]/60">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#e8732a]/30 to-transparent" />
                    <span className="text-[11px] font-bold text-[#e8732a] uppercase tracking-[0.2em]">
                      SEO Settings
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#e8732a]/30 to-transparent" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        Meta Title
                      </label>
                      <input
                        className="w-full h-11 px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a] focus:ring-3 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#A8A29E]"
                        placeholder="e.g., Luxury Donut Boxes | Premium Custom Packaging | HofPack"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                      />
                      <p className="text-[10px] text-[#aaa6a0] mt-1">
                        Recommended ~50-60 characters. Leave empty to use product name.
                      </p>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        Meta Description
                      </label>
                      <textarea
                        className="w-full px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a] focus:ring-3 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#A8A29E] h-24 py-3 resize-none"
                        placeholder="Brief description for search engines..."
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                      />
                      <p className="text-[10px] text-[#aaa6a0] mt-1">
                        Recommended ~150-160 characters.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        Meta Keywords
                      </label>
                      <input
                        className="w-full h-11 px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a] focus:ring-3 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#A8A29E]"
                        placeholder="donut boxes, custom packaging, bakery boxes"
                        value={metaKeywords}
                        onChange={(e) => setMetaKeywords(e.target.value)}
                      />
                      <p className="text-[10px] text-[#aaa6a0] mt-1">
                        Comma-separated keywords (optional).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#e0ddd6]">
                    <div>
                      <p className="text-[12px] font-semibold text-[#1a1a1a]">
                        Allow search engine indexing
                      </p>
                      <p className="text-[10.5px] text-[#aaa6a0] mt-0.5">
                        Page will appear in Google search results
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAllowIndexing(!allowIndexing)}
                      className={`relative w-10 h-6 rounded-full transition-colors shrink-0 cursor-pointer ${
                        allowIndexing ? "bg-[#2d5c3e]" : "bg-[#d8d4cc]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                          allowIndexing ? "left-5" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* 3. Schema / Rich Results */}
                <div className="space-y-6 pt-4 border-t border-[#e0ddd6]/60">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#e8732a]/30 to-transparent" />
                    <span className="text-[11px] font-bold text-[#e8732a] uppercase tracking-[0.2em]">
                      Schema / Rich Results
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#e8732a]/30 to-transparent" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        Schema Image{" "}
                        <span className="normal-case text-[#aaa6a0] font-normal">
                          (overrides gallery for Google Rich Results)
                        </span>
                      </label>
                      <div className="rounded-[16px] border border-[#e0ddd6] overflow-hidden bg-[#f5f3ee]/30 p-4">
                        <div className="border-2 border-dashed border-[#e0ddd6] rounded-[12px] bg-white p-4 flex flex-col items-center justify-center relative">
                          <Upload className="w-6 h-6 text-[#2d5c3e] mb-2" />
                          <p className="text-[12px] font-bold text-[#1a1a1a]">
                            Upload Artwork (Cloudinary)
                          </p>
                          <p className="text-[10px] text-[#aaa6a0]">
                            PNG, JPG or WebP up to 5MB
                          </p>
                        </div>
                        <input
                          className="w-full h-9 mt-3 px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-md focus:outline-none"
                          placeholder="Or paste an image URL..."
                          value={schemaImage}
                          onChange={(e) => setSchemaImage(e.target.value)}
                        />
                      </div>
                      <p className="text-[10px] text-[#aaa6a0] mt-1">
                        Recommended 1200×630px. Falls back to gallery images if empty.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        SKU / MPN
                      </label>
                      <input
                        className="w-full h-11 px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a]"
                        placeholder="e.g., HP-RB-001"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        Price (USD)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="w-full h-11 px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a]"
                        placeholder="e.g., 49.99"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        Aggregate Rating Value
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        className="w-full h-11 px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a]"
                        placeholder="e.g., 4.8"
                        value={ratingValue}
                        onChange={(e) => setRatingValue(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        Rating Count
                      </label>
                      <input
                        type="number"
                        className="w-full h-11 px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a]"
                        placeholder="e.g., 127"
                        value={ratingCount}
                        onChange={(e) => setRatingCount(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Specifications */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#2d5c3e]/20 to-transparent" />
                    <span className="text-[11px] font-bold text-[#2d5c3e]/70 uppercase tracking-[0.2em]">
                      Specifications
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#2d5c3e]/20 to-transparent" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 p-6 bg-[#f5f3ee]/30 rounded-[20px] border border-[#e0ddd6]/50">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        Box Style
                      </label>
                      <input
                        className="w-full h-11 px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a]"
                        placeholder="e.g., Donut Boxes"
                        value={boxStyle}
                        onChange={(e) => setBoxStyle(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        Quantity
                      </label>
                      <input
                        className="w-full h-11 px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a]"
                        placeholder="Starting from 100 Units"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        Stock Info
                      </label>
                      <input
                        className="w-full h-11 px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a]"
                        value={stockInfo}
                        onChange={(e) => setStockInfo(e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        Printing Options
                      </label>
                      <input
                        className="w-full h-11 px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a]"
                        value={printingOptions}
                        onChange={(e) => setPrintingOptions(e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider mb-2 block">
                        Finishing Options
                      </label>
                      <input
                        className="w-full h-11 px-4 text-[13px] bg-[#FAFAF9] border border-[#E8E4DF] rounded-xl focus:outline-none focus:border-[#e8732a]"
                        value={finishingOptions}
                        onChange={(e) => setFinishingOptions(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Page Content (Expandable Sections) */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#e8732a]/30 to-transparent" />
                    <span className="text-[11px] font-bold text-[#e8732a] uppercase tracking-[0.2em]">
                      Page Content
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#e8732a]/30 to-transparent" />
                  </div>
                  <p className="text-[11px] text-[#aaa6a0] -mt-4">
                    Build the dynamic content sections rendered below the hero on the product page. All fields are optional.
                  </p>

                  {/* Content Blocks Accordion */}
                  <div className="rounded-[16px] border border-[#e0ddd6] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("contentBlocks")}
                      className="w-full flex items-center justify-between px-5 py-3.5 bg-[#f5f3ee]/60 hover:bg-[#f5f3ee] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 text-[12px] font-bold text-[#2d5c3e]">
                        <LayoutTemplate className="w-4 h-4" />
                        Content Blocks (image + text pairs)
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#aaa6a0] transition-transform duration-200 ${
                          openAccordions.contentBlocks ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openAccordions.contentBlocks && (
                      <div className="p-5 space-y-4 border-t border-[#e0ddd6]">
                        {contentBlocks.map((block, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-[#f5f3ee]/50 border border-[#e0ddd6] relative space-y-3"
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setContentBlocks((prev) =>
                                  prev.filter((_, i) => i !== idx)
                                )
                              }
                              className="absolute top-3 right-3 text-[#aaa6a0] hover:text-red-500 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <input
                              className="w-full h-10 px-3 text-[13px] bg-white border border-[#e0ddd6] rounded-lg"
                              placeholder="Block Title..."
                              value={block.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                setContentBlocks((prev) =>
                                  prev.map((b, i) =>
                                    i === idx ? { ...b, title: val } : b
                                  )
                                );
                              }}
                            />
                            <textarea
                              className="w-full p-3 text-[13px] bg-white border border-[#e0ddd6] rounded-lg"
                              rows={2}
                              placeholder="Block Description..."
                              value={block.desc}
                              onChange={(e) => {
                                const val = e.target.value;
                                setContentBlocks((prev) =>
                                  prev.map((b, i) =>
                                    i === idx ? { ...b, desc: val } : b
                                  )
                                );
                              }}
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={handleAddContentBlock}
                          className="flex items-center gap-2 text-[12px] font-bold text-[#e8732a] hover:text-[#c45a18] transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" /> Add Content Block
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Article Body Accordion */}
                  <div className="rounded-[16px] border border-[#e0ddd6] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("articleBody")}
                      className="w-full flex items-center justify-between px-5 py-3.5 bg-[#f5f3ee]/60 hover:bg-[#f5f3ee] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 text-[12px] font-bold text-[#2d5c3e]">
                        <LayoutTemplate className="w-4 h-4" />
                        Article Body (headings, paragraphs, dividers)
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#aaa6a0] transition-transform duration-200 ${
                          openAccordions.articleBody ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openAccordions.articleBody && (
                      <div className="p-5 space-y-4 border-t border-[#e0ddd6]">
                        <div className="flex flex-wrap gap-2">
                          {["H1", "H2", "H3", "H4", "H5", "H6", "P", "Divider"].map(
                            (tag) => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => handleAddArticleBlock(tag)}
                                className="flex items-center gap-1.5 text-[11px] font-bold text-[#e8732a] hover:text-[#c45a18] border border-[#e8732a]/30 hover:border-[#e8732a] rounded-full px-3 py-1 transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" /> {tag}
                              </button>
                            )
                          )}
                        </div>
                        <p className="text-[10px] text-[#aaa6a0]">
                          Add a <strong>Divider</strong> to split content into &ldquo;above fold&rdquo; and &ldquo;Read More&rdquo; sections.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 6. Product Gallery */}
                <div className="space-y-6">
                  <div className="text-[11px] font-bold text-[#e8732a] uppercase tracking-[0.2em] flex items-center gap-2">
                    <div className="h-[2px] w-6 bg-[#e8732a] rounded-full" />
                    Product Gallery
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div className="relative group rounded-[16px] overflow-hidden border border-[#e0ddd6] aspect-square bg-[#f5f3ee] shadow-sm flex flex-col items-center justify-center p-4 text-center">
                      <Upload className="w-6 h-6 text-[#2d5c3e] mb-1" />
                      <p className="text-[11px] font-bold text-[#1a1a1a]">
                        Upload Artwork
                      </p>
                      <p className="text-[9px] text-[#aaa6a0]">Up to 5MB</p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        toast({
                          title: "Upload Artwork",
                          description: "Select file from local storage or cloud.",
                        })
                      }
                      className="aspect-square rounded-[16px] border-dashed border-2 border-[#e0ddd6] hover:bg-[#f5f3ee] hover:border-[#e8732a] text-[#aaa6a0] hover:text-[#e8732a] font-bold text-[11px] flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group shadow-sm hover:shadow-inner"
                    >
                      <div className="h-10 w-10 rounded-full bg-[#f5f3ee] flex items-center justify-center group-hover:bg-[#e8732a]/10 transition-colors">
                        <Plus className="h-5 w-5" />
                      </div>
                      <span>Add Image</span>
                    </button>
                  </div>
                </div>

                {/* Submit Toolbar */}
                <div className="pt-8 border-t border-[#e0ddd6]/60 flex items-center justify-end gap-4">
                  <Link
                    href="/admin/products"
                    className="h-11 px-6 text-[13px] font-bold text-[#7a7672] hover:text-[#1a1a1a] hover:bg-[#f5f3ee] rounded-xl transition-all inline-flex items-center"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={saving}
                    className="h-12 px-10 bg-gradient-to-r from-[#e8732a] to-[#d4621f] hover:from-[#c45a18] hover:to-[#e8732a] text-white font-bold text-[13px] rounded-xl transition-all flex items-center gap-3 shadow-lg shadow-[#e8732a]/20 hover:shadow-xl hover:shadow-[#e8732a]/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    {saving ? "Creating..." : "Create Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
