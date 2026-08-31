"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Trash2,
  FileText,
  Home,
  Package,
  Layers,
  Sparkles,
  HelpCircle,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Edit3,
  Check,
  X,
  Save,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  fetchAllFaqs,
  saveFaqRecord,
  deleteFaqRecord,
  reorderFaqs,
  BASE_FAQS,
  type FAQItem,
} from "@/lib/faq-service";
import { getAllProducts } from "@/data/products";

export const SITE_PAGES = [
  { slug: "all", name: "All Pages", icon: Layers },
  { slug: "home", name: "Home Page (/)", icon: Home },
  { slug: "product-detail-pages", name: "Product Detail Pages (/product/*)", icon: Package },
  { slug: "process", name: "Process Page (/process)", icon: Sparkles },
  { slug: "about", name: "About Page (/about)", icon: FileText },
  { slug: "artwork-guidelines", name: "Artwork Guidelines (/artwork-guidelines)", icon: FileText },
  { slug: "category", name: "Category Pages (/*)", icon: HelpCircle },
];

export default function AdminFaqsView() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<
    "global" | "artwork" | "category" | "product" | "pages"
  >("global");
  const [selectedPageFilter, setSelectedPageFilter] = useState<string>("all");
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>("all");
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [faqs, setFaqs] = useState<FAQItem[]>(BASE_FAQS);
  const [loading, setLoading] = useState(true);

  // Drag and drop state
  const [draggedFaqId, setDraggedFaqId] = useState<string | null>(null);
  const [dragOverFaqId, setDragOverFaqId] = useState<string | null>(null);

  // Inline edit state
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    question: string;
    answer: string;
    category: string;
    status: "Published" | "Draft";
    page_slug?: string;
    product_slug?: string;
  }>({
    question: "",
    answer: "",
    category: "",
    status: "Published",
  });

  // All 160+ Products from catalog
  const allProducts = useMemo(() => {
    try {
      return getAllProducts();
    } catch {
      return [];
    }
  }, []);

  const filteredProductOptions = useMemo(() => {
    if (!productSearchQuery.trim()) return allProducts;
    const q = productSearchQuery.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q))
    );
  }, [allProducts, productSearchQuery]);

  const loadData = async () => {
    try {
      setLoading(true);
      const list = await fetchAllFaqs();
      setFaqs(list);
    } catch {
      setFaqs(BASE_FAQS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const handleSync = () => loadData();
    window.addEventListener("storage", handleSync);
    window.addEventListener("focus", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("focus", handleSync);
    };
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      let matchesTab = false;

      if (activeTab === "global") {
        matchesTab = true;
      } else if (activeTab === "artwork") {
        matchesTab =
          faq.tab === "artwork" ||
          faq.section === "artwork" ||
          faq.page_slug === "artwork-guidelines";
      } else if (activeTab === "category") {
        matchesTab = faq.tab === "category" || faq.section === "category";
      } else if (activeTab === "product") {
        if (selectedProductFilter === "all") {
          matchesTab =
            faq.tab === "product" ||
            faq.section === "product" ||
            faq.page_slug === "product-detail-pages" ||
            Boolean(faq.product_slug);
        } else {
          matchesTab =
            faq.product_slug === selectedProductFilter ||
            faq.page_slug === "product-detail-pages";
        }
      } else if (activeTab === "pages") {
        if (selectedPageFilter === "all") {
          matchesTab = true;
        } else if (selectedPageFilter === "home") {
          matchesTab =
            faq.page_slug === "home" ||
            faq.tab === "global" ||
            faq.section === "homepage";
        } else if (selectedPageFilter === "product-detail-pages") {
          if (selectedProductFilter === "all") {
            matchesTab =
              faq.page_slug === "product-detail-pages" ||
              faq.tab === "product" ||
              faq.section === "product" ||
              Boolean(faq.product_slug);
          } else {
            matchesTab =
              faq.product_slug === selectedProductFilter ||
              (faq.page_slug === "product-detail-pages" && !faq.product_slug);
          }
        } else if (selectedPageFilter === "process") {
          matchesTab = faq.page_slug === "process";
        } else if (selectedPageFilter === "about") {
          matchesTab = faq.page_slug === "about";
        } else if (selectedPageFilter === "artwork-guidelines") {
          matchesTab =
            faq.page_slug === "artwork-guidelines" ||
            faq.tab === "artwork" ||
            faq.section === "artwork";
        } else if (selectedPageFilter === "category") {
          matchesTab = faq.tab === "category" || faq.section === "category";
        }
      }

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        (faq.category && faq.category.toLowerCase().includes(q)) ||
        (faq.page_name && faq.page_name.toLowerCase().includes(q)) ||
        (faq.product_slug && faq.product_slug.toLowerCase().includes(q));

      return matchesTab && matchesSearch;
    });
  }, [
    faqs,
    activeTab,
    selectedPageFilter,
    selectedProductFilter,
    searchQuery,
  ]);

  // Drag and drop handlers
  const handleDragStart = (id: string) => {
    setDraggedFaqId(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (dragOverFaqId !== id) {
      setDragOverFaqId(id);
    }
  };

  const handleDrop = async (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedFaqId || draggedFaqId === targetId) {
      setDraggedFaqId(null);
      setDragOverFaqId(null);
      return;
    }

    const currentList = [...filteredFaqs];
    const sourceIndex = currentList.findIndex((f) => f.id === draggedFaqId);
    const targetIndex = currentList.findIndex((f) => f.id === targetId);

    if (sourceIndex < 0 || targetIndex < 0) {
      setDraggedFaqId(null);
      setDragOverFaqId(null);
      return;
    }

    // Reorder array
    const [movedItem] = currentList.splice(sourceIndex, 1);
    currentList.splice(targetIndex, 0, movedItem);

    // Update local state immediately
    const updatedIds = new Set(currentList.map((f) => f.id));
    const otherItems = faqs.filter((f) => !updatedIds.has(f.id));
    const newMasterList = [...currentList, ...otherItems];

    setFaqs(newMasterList);
    setDraggedFaqId(null);
    setDragOverFaqId(null);

    // Persist reorder
    await reorderFaqs(currentList);
    toast({
      title: "Order Updated",
      description: "FAQ order saved successfully.",
    });
  };

  const handleMove = async (id: string, direction: "up" | "down") => {
    const currentList = [...filteredFaqs];
    const index = currentList.findIndex((f) => f.id === id);
    if (index < 0) return;

    if (direction === "up" && index > 0) {
      const [item] = currentList.splice(index, 1);
      currentList.splice(index - 1, 0, item);
    } else if (direction === "down" && index < currentList.length - 1) {
      const [item] = currentList.splice(index, 1);
      currentList.splice(index + 1, 0, item);
    } else {
      return;
    }

    const updatedIds = new Set(currentList.map((f) => f.id));
    const otherItems = faqs.filter((f) => !updatedIds.has(f.id));
    const newMasterList = [...currentList, ...otherItems];

    setFaqs(newMasterList);
    await reorderFaqs(currentList);
    toast({
      title: "Order Updated",
      description: "FAQ reordered successfully.",
    });
  };

  const startInlineEdit = (faq: FAQItem) => {
    setEditingFaqId(faq.id);
    setEditForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "General Support",
      status: faq.status || "Published",
      page_slug: faq.page_slug || undefined,
      product_slug: faq.product_slug || undefined,
    });
  };

  const cancelInlineEdit = () => {
    setEditingFaqId(null);
  };

  const saveInlineEdit = async (id: string) => {
    if (!editForm.question.trim() || !editForm.answer.trim()) return;

    const existing = faqs.find((f) => f.id === id);
    if (!existing) return;

    const updated: FAQItem = {
      ...existing,
      question: editForm.question.trim(),
      answer: editForm.answer.trim(),
      category: editForm.category.trim(),
      status: editForm.status,
      page_slug: editForm.page_slug || existing.page_slug,
      product_slug: editForm.product_slug || existing.product_slug,
    };

    setFaqs((prev) => prev.map((f) => (f.id === id ? updated : f)));
    setEditingFaqId(null);

    await saveFaqRecord(updated);
    toast({
      title: "FAQ Saved",
      description: "Changes updated live.",
    });
  };

  const handleDelete = async (id: string, question: string) => {
    if (!confirm(`Are you sure you want to delete this FAQ?\n"${question}"`))
      return;
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    await deleteFaqRecord(id);
    toast({
      title: "FAQ Deleted",
      description: "Question removed from FAQ catalog.",
    });
  };

  const getPageBadge = (faq: FAQItem) => {
    if (faq.product_slug) {
      const prod = allProducts.find((p) => p.slug === faq.product_slug);
      return `Product: ${prod?.name || faq.product_slug}`;
    }
    if (faq.page_name) return faq.page_name;
    if (faq.page_slug === "home" || faq.tab === "global") return "Home Page";
    if (faq.page_slug === "product-detail-pages" || faq.tab === "product")
      return "Product Detail Pages";
    if (faq.page_slug === "process") return "Process Page";
    if (faq.page_slug === "about") return "About Page";
    if (faq.page_slug === "artwork-guidelines" || faq.tab === "artwork")
      return "Artwork Guidelines";
    if (faq.tab === "category") return `Category: /${faq.category_slug || "all"}`;
    return "Website Page";
  };

  const isProductSection =
    activeTab === "product" ||
    (activeTab === "pages" && selectedPageFilter === "product-detail-pages");

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0">
      {/* Subtabs Bar */}
      <div className="ptabs bg-white/70 backdrop-blur-sm border-b border-[#e0ddd6]/60 flex px-5 sm:px-6 shrink-0 overflow-x-auto gap-4 [scrollbar-width:thin]">
        <button
          type="button"
          onClick={() => setActiveTab("global")}
          className={`ptab relative px-0.5 py-2.5 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "global"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Global FAQs
          {activeTab === "global" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("artwork")}
          className={`ptab relative px-0.5 py-2.5 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "artwork"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Artwork Guidelines
          {activeTab === "artwork" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("category")}
          className={`ptab relative px-0.5 py-2.5 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "category"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          By Category
          {activeTab === "category" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("product")}
          className={`ptab relative px-0.5 py-2.5 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "product"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          By Product (160+)
          {activeTab === "product" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("pages")}
          className={`ptab relative px-0.5 py-2.5 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "pages"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          By Pages
          {activeTab === "pages" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 [scrollbar-width:thin]">
        <div className="max-w-[1200px] mx-auto space-y-5">
          {/* Top action / search bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-[400px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa6a0]" />
              <input
                type="text"
                placeholder="Search question, answer, product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-white rounded-lg border border-[#e0ddd6] text-[13px] text-[#1a1a1a] placeholder-[#aaa6a0] focus:outline-none focus:border-[#2d5c3e] focus:ring-1 focus:ring-[#2d5c3e] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[12px] font-medium text-[#7a7672] hidden sm:inline-block">
                Tip: Drag <GripVertical className="inline w-3.5 h-3.5 -mt-0.5" /> to reorder FAQs
              </span>
              <Link
                href={
                  isProductSection && selectedProductFilter !== "all"
                    ? `/admin/faqs/new?tab=product&product=${selectedProductFilter}`
                    : activeTab === "pages"
                    ? `/admin/faqs/new?tab=page&page=${selectedPageFilter !== "all" ? selectedPageFilter : "product-detail-pages"}`
                    : `/admin/faqs/new?tab=${activeTab}`
                }
                className="inline-flex items-center justify-center gap-2 bg-[#2d5c3e] text-white px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-[#234931] transition-colors shrink-0 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add FAQ
              </Link>
            </div>
          </div>

          {/* By Pages Filter Pills (Visible when By Pages tab is active) */}
          {activeTab === "pages" && (
            <div className="bg-white p-3 rounded-xl border border-[#e0ddd6] flex items-center gap-2 overflow-x-auto [scrollbar-width:thin] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a7672] px-2 shrink-0">
                Select Page:
              </span>
              {SITE_PAGES.map((p) => {
                const Icon = p.icon;
                const isSelected = selectedPageFilter === p.slug;
                return (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => {
                      setSelectedPageFilter(p.slug);
                      if (p.slug !== "product-detail-pages") {
                        setSelectedProductFilter("all");
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold inline-flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#2d5c3e] text-white shadow-sm"
                        : "bg-[#faf8f5] text-[#55524e] border border-[#e0ddd6] hover:bg-[#f0ede6] hover:text-[#1a1a1a]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {p.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* 160+ Product Detail Pages Filter (Visible in By Product or By Pages -> Product Detail Pages) */}
          {isProductSection && (
            <div className="bg-white p-4 rounded-xl border border-[#e0ddd6] shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e0ddd6] pb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#e8732a]" />
                  <h3 className="text-[13px] font-bold text-[#1a1a1a]">
                    Select Product Detail Page (160+ Total Products)
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-[#7a7672]">
                  {allProducts.length} Product Detail Pages in Catalog
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aaa6a0]" />
                  <input
                    type="text"
                    placeholder="Search from 160+ product pages (e.g. Candle, Bakery, Mylar, Soap)..."
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-[#faf8f5] rounded-lg border border-[#e0ddd6] text-[12px] text-[#1a1a1a] placeholder-[#aaa6a0] outline-none focus:border-[#2d5c3e]"
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={selectedProductFilter}
                    onChange={(e) => setSelectedProductFilter(e.target.value)}
                    className="h-8 px-3 text-[12px] font-semibold bg-[#faf8f5] border border-[#e0ddd6] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] max-w-[280px]"
                  >
                    <option value="all">📦 All Product Pages ({allProducts.length})</option>
                    {filteredProductOptions.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name} (/product/{p.slug})
                      </option>
                    ))}
                  </select>
                  {selectedProductFilter !== "all" && (
                    <button
                      type="button"
                      onClick={() => setSelectedProductFilter("all")}
                      className="text-[11px] font-bold text-[#e8732a] hover:underline px-1"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* FAQs List Card */}
          <div className="bg-white rounded-xl border border-[#e0ddd6] overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-[#e0ddd6] flex items-center justify-between bg-[#faf8f5]">
              <div className="flex items-center gap-2">
                <h2 className="text-[14px] font-bold text-[#1a1a1a] capitalize">
                  {activeTab === "global"
                    ? "Global FAQs"
                    : activeTab === "artwork"
                    ? "Artwork Guidelines FAQs"
                    : activeTab === "category"
                    ? "Category-Specific FAQs"
                    : activeTab === "product"
                    ? `Product Detail FAQs (${selectedProductFilter === "all" ? "All 160+ Products" : selectedProductFilter})`
                    : `FAQs By Pages (${selectedPageFilter === "all" ? "All Site Pages" : SITE_PAGES.find((p) => p.slug === selectedPageFilter)?.name || selectedPageFilter})`}
                </h2>
              </div>
              <span className="text-[12px] font-medium text-[#7a7672]">
                {filteredFaqs.length} {filteredFaqs.length === 1 ? "question" : "questions"}
              </span>
            </div>

            {filteredFaqs.length === 0 ? (
              <div className="p-12 text-center text-[#7a7672] space-y-2">
                <p className="text-[14px] font-semibold text-[#1a1a1a]">
                  No FAQs found for this selection.
                </p>
                <p className="text-[12px] max-w-[400px] mx-auto text-[#7a7672]">
                  {isProductSection && selectedProductFilter !== "all"
                    ? `Create dedicated FAQs specifically for /product/${selectedProductFilter}`
                    : "Add questions and answers to show on this page."}
                </p>
                <Link
                  href={
                    isProductSection && selectedProductFilter !== "all"
                      ? `/admin/faqs/new?tab=product&product=${selectedProductFilter}`
                      : `/admin/faqs/new?tab=${activeTab}`
                  }
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#2d5c3e] hover:underline pt-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add FAQ for this target
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[#e0ddd6]">
                {filteredFaqs.map((faq, index) => {
                  const isEditing = editingFaqId === faq.id;
                  const isDragged = draggedFaqId === faq.id;
                  const isDragOver = dragOverFaqId === faq.id;

                  return (
                    <div
                      key={faq.id}
                      draggable={!isEditing}
                      onDragStart={() => handleDragStart(faq.id)}
                      onDragOver={(e) => handleDragOver(e, faq.id)}
                      onDrop={(e) => handleDrop(e, faq.id)}
                      className={`p-4 sm:p-5 transition-all ${
                        isDragged ? "opacity-40 bg-[#f0ede6]" : "hover:bg-[#faf8f5]/60"
                      } ${isDragOver ? "border-t-2 border-[#2d5c3e] bg-[#edf7f1]/40" : ""}`}
                    >
                      {/* Normal View */}
                      {!isEditing ? (
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-start">
                          {/* Drag handle & Order Controls */}
                          <div className="flex items-center gap-1.5 self-start pt-0.5 shrink-0 text-[#aaa6a0]">
                            <div
                              className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-[#f0ede6] hover:text-[#1a1a1a]"
                              title="Drag up or down to reorder"
                            >
                              <GripVertical className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                              <button
                                type="button"
                                onClick={() => handleMove(faq.id, "up")}
                                disabled={index === 0}
                                className="p-0.5 text-[#aaa6a0] hover:text-[#1a1a1a] disabled:opacity-20 cursor-pointer"
                                title="Move up"
                              >
                                <ChevronUp className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMove(faq.id, "down")}
                                disabled={index === filteredFaqs.length - 1}
                                className="p-0.5 text-[#aaa6a0] hover:text-[#1a1a1a] disabled:opacity-20 cursor-pointer"
                                title="Move down"
                              >
                                <ChevronDown className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="w-5 h-5 rounded-full bg-[#f0ede6] text-[#7a7672] text-[11px] font-bold inline-flex items-center justify-center shrink-0 ml-1">
                              {index + 1}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="space-y-1.5 flex-1 min-w-0 pr-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                onClick={() => startInlineEdit(faq)}
                                className="text-[14px] font-bold text-[#1a1a1a] hover:text-[#e8732a] transition-colors cursor-pointer"
                              >
                                {faq.question}
                              </span>
                              {faq.status === "Draft" ? (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#f5f3ee] text-[#7a7672] border border-[#e0ddd6]">
                                  Draft
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#edf7f1] text-[#2d5c3e] border border-[#b8dfc8]">
                                  Live
                                </span>
                              )}
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#fdf5eb] text-[#e8732a] border border-[#f5cba7]">
                                {getPageBadge(faq)}
                              </span>
                            </div>
                            <p className="text-[13px] text-[#7a7672] line-clamp-2 leading-relaxed">
                              {faq.answer}
                            </p>
                            <div className="flex items-center gap-3 text-[11px] text-[#aaa6a0] pt-1">
                              <span>{faq.category || "General Support"}</span>
                              {faq.product_slug && (
                                <>
                                  <span>•</span>
                                  <span className="text-[#e8732a] font-medium">
                                    /product/{faq.product_slug}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                            <button
                              type="button"
                              onClick={() => startInlineEdit(faq)}
                              className="px-3 py-1.5 text-[12px] font-semibold text-[#2d5c3e] hover:bg-[#edf7f1] rounded-lg transition-colors border border-[#b8dfc8] inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              Quick Edit
                            </button>
                            <Link
                              href={`/admin/faqs/${faq.id}`}
                              className="p-1.5 text-[#7a7672] hover:text-[#1a1a1a] hover:bg-[#f0ede6] rounded-lg transition-colors"
                              title="Full Edit Page"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDelete(faq.id, faq.question)}
                              className="p-1.5 text-[#aaa6a0] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete FAQ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Inline Expanded Edit Mode */
                        <div className="bg-[#faf8f5] p-4 rounded-xl border border-[#2d5c3e] space-y-4 animate-in fade-in duration-200">
                          <div className="flex items-center justify-between border-b border-[#e0ddd6] pb-2">
                            <div className="flex items-center gap-2">
                              <Edit3 className="w-4 h-4 text-[#2d5c3e]" />
                              <span className="text-[13px] font-bold text-[#1a1a1a]">
                                Editing Question #{index + 1}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={cancelInlineEdit}
                              className="p-1 text-[#aaa6a0] hover:text-[#1a1a1a] rounded cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1">
                                Question *
                              </label>
                              <input
                                type="text"
                                value={editForm.question}
                                onChange={(e) =>
                                  setEditForm((prev) => ({
                                    ...prev,
                                    question: e.target.value,
                                  }))
                                }
                                className="w-full px-3 py-2 text-[13px] bg-white border border-[#d8d4cc] rounded-lg outline-none focus:border-[#2d5c3e]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1">
                                Answer *
                              </label>
                              <textarea
                                rows={4}
                                value={editForm.answer}
                                onChange={(e) =>
                                  setEditForm((prev) => ({
                                    ...prev,
                                    answer: e.target.value,
                                  }))
                                }
                                className="w-full p-3 text-[13px] bg-white border border-[#d8d4cc] rounded-lg outline-none focus:border-[#2d5c3e] leading-relaxed"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1">
                                  Category / Subtitle
                                </label>
                                <input
                                  type="text"
                                  value={editForm.category}
                                  onChange={(e) =>
                                    setEditForm((prev) => ({
                                      ...prev,
                                      category: e.target.value,
                                    }))
                                  }
                                  className="w-full px-3 py-1.5 text-[12px] bg-white border border-[#d8d4cc] rounded-lg outline-none focus:border-[#2d5c3e]"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1">
                                  Product Page Link (Optional)
                                </label>
                                <select
                                  value={editForm.product_slug || ""}
                                  onChange={(e) =>
                                    setEditForm((prev) => ({
                                      ...prev,
                                      product_slug: e.target.value || undefined,
                                    }))
                                  }
                                  className="w-full px-3 py-1.5 text-[12px] bg-white border border-[#d8d4cc] rounded-lg outline-none focus:border-[#2d5c3e]"
                                >
                                  <option value="">None (Global / Page Level)</option>
                                  {allProducts.map((p) => (
                                    <option key={p.slug} value={p.slug}>
                                      {p.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1">
                                  Status
                                </label>
                                <select
                                  value={editForm.status}
                                  onChange={(e) =>
                                    setEditForm((prev) => ({
                                      ...prev,
                                      status: e.target.value as any,
                                    }))
                                  }
                                  className="w-full px-3 py-1.5 text-[12px] bg-white border border-[#d8d4cc] rounded-lg outline-none focus:border-[#2d5c3e]"
                                >
                                  <option value="Published">Published (Live)</option>
                                  <option value="Draft">Draft (Hidden)</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e0ddd6]">
                            <button
                              type="button"
                              onClick={cancelInlineEdit}
                              className="px-3 py-1.5 text-[12px] font-bold text-[#7a7672] hover:bg-[#f0ede6] rounded-lg cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => saveInlineEdit(faq.id)}
                              className="px-4 py-1.5 text-[12px] font-bold bg-[#2d5c3e] text-white rounded-lg hover:bg-[#234931] cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                            >
                              <Save className="w-3.5 h-3.5" />
                              Save Changes
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
