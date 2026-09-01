"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  RefreshCw,
  Eye,
  EyeOff,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Phone,
  Truck,
  Briefcase,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  fetchAllFaqs,
  saveFaqRecord,
  deleteFaqRecord,
  reorderFaqs,
  BASE_FAQS,
  HOMEPAGE_FAQ_IDS,
  type FAQItem,
} from "@/lib/faq-service";
import { getAllProducts, categories as defaultCategories } from "@/data/products";

export const SITE_PAGES = [
  { slug: "all", name: "All Other Pages", icon: Layers },
  { slug: "home", name: "Home Page", icon: Home },
  { slug: "artwork-guidelines", name: "Artwork Guidelines", icon: FileText },
  { slug: "process", name: "Process Page", icon: Sparkles },
  { slug: "about", name: "About Page", icon: BookOpen },
  { slug: "contact", name: "Contact Page", icon: Phone },
  { slug: "track", name: "Track Order", icon: Truck },
  { slug: "case-studies", name: "Case Studies", icon: Briefcase },
  { slug: "company-profile", name: "Company Profile", icon: BookOpen },
  { slug: "cancellation-policy", name: "Cancellation Policy", icon: FileText },
  { slug: "refund-policy", name: "Refund Policy", icon: FileText },
  { slug: "shipping-policy", name: "Shipping Policy", icon: Truck },
  { slug: "terms", name: "Terms & Conditions", icon: FileText },
  { slug: "privacy", name: "Privacy Policy", icon: FileText },
];

const ITEMS_PER_PAGE = 25;

export default function AdminFaqsView() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<
    "all" | "category" | "product" | "pages"
  >("all");
  const [selectedPageFilter, setSelectedPageFilter] = useState<string>("all");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>("all");
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Published" | "Draft">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncingUi, setSyncingUi] = useState(false);

  const handleSyncUi = async () => {
    try {
      setSyncingUi(true);
      const res = await fetch("/api/admin/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: activeTab === "pages" && selectedPageFilter === "home" ? "/" : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("hof_faqs_sync_timestamp", Date.now().toString());
        window.dispatchEvent(new Event("storage"));
        toast({
          title: "Frontend UI Synced",
          description: "Refreshed and revalidated live frontend cache for all pages.",
        });
      } else {
        throw new Error(data.error || "Failed to revalidate");
      }
    } catch (err: any) {
      toast({
        title: "Sync UI Failed",
        description: err.message || "Failed to refresh frontend UI cache.",
        variant: "destructive",
      });
    } finally {
      setSyncingUi(false);
    }
  };

  // Modal / Drawer state for Add FAQ
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    question: "",
    answer: "",
    targetType: "global" as "global" | "category" | "product" | "artwork" | "page",
    category_id: "",
    product_slug: "",
    page_slug: "home",
    status: "Published" as "Published" | "Draft",
    categoryLabel: "",
  });

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
    category_id?: string;
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

  const allCategories = useMemo(() => {
    const catMap = new Map<string, { id?: string; name: string; slug: string; count: number }>();

    // 1. Discover all live categories directly from live FAQs
    faqs.forEach((f) => {
      if (f.category_slug || f.category_id) {
        const slug = f.category_slug || f.category_id || "";
        const name = (f.category?.replace(/^Category:\s*/, "") || slug).trim();
        if (!catMap.has(slug)) {
          catMap.set(slug, { id: f.category_id || undefined, name, slug, count: 0 });
        }
        catMap.get(slug)!.count++;
      }
    });

    // 2. Merge with static categories if any missing
    defaultCategories.forEach((dc) => {
      if (!catMap.has(dc.slug)) {
        catMap.set(dc.slug, { name: dc.name, slug: dc.slug, count: 0 });
      }
    });

    return Array.from(catMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [faqs]);

  const [categorySearchQuery, setCategorySearchQuery] = useState("");

  const filteredCategoryOptions = useMemo(() => {
    if (!categorySearchQuery.trim()) return allCategories;
    const q = categorySearchQuery.toLowerCase().trim();
    return allCategories.filter(
      (c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
    );
  }, [allCategories, categorySearchQuery]);

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

  const loadData = async (showToast = false) => {
    try {
      setLoading(true);
      const list = await fetchAllFaqs();
      setFaqs(list);
      if (showToast) {
        toast({
          title: "FAQs Synced",
          description: `Loaded ${list.length} FAQs directly from Supabase.`,
        });
      }
    } catch (err: any) {
      console.warn("Failed to load FAQs:", err);
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

  // Filter logic
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      let matchesTab = false;

      if (activeTab === "all") {
        matchesTab = true;
      } else if (activeTab === "category") {
        if (selectedCategoryFilter === "all") {
          matchesTab = Boolean(faq.category_slug || faq.category_id);
        } else {
          const cleanSelected = selectedCategoryFilter.toLowerCase().replace(/^custom-/, "");
          const faqClean = (faq.category_slug || "").toLowerCase().replace(/^custom-/, "");
          matchesTab =
            faq.category_slug === selectedCategoryFilter ||
            faq.category_id === selectedCategoryFilter ||
            (faqClean.length > 0 && faqClean === cleanSelected);
        }
      } else if (activeTab === "product") {
        if (selectedProductFilter === "all") {
          matchesTab = Boolean(faq.product_slug || faq.product_id || faq.tab === "product" || faq.section === "product");
        } else {
          const cleanSelected = selectedProductFilter.toLowerCase().replace(/^custom-/, "");
          const faqClean = (faq.product_slug || "").toLowerCase().replace(/^custom-/, "");
          matchesTab =
            faq.product_slug === selectedProductFilter ||
            faq.product_id === selectedProductFilter ||
            (faqClean.length > 0 && faqClean === cleanSelected);
        }
      } else if (activeTab === "pages") {
        if (selectedPageFilter === "all") {
          matchesTab = !faq.category_slug && !faq.category_id && !faq.product_slug && !faq.product_id;
        } else if (selectedPageFilter === "home") {
          matchesTab =
            HOMEPAGE_FAQ_IDS.has(faq.id) ||
            (faq.page_slug === "home" && !faq.category_id && !faq.product_id && faq.tab !== "artwork");
        } else if (selectedPageFilter === "artwork-guidelines") {
          matchesTab =
            (faq.page_slug === "artwork-guidelines" || faq.tab === "artwork" || faq.section === "artwork") &&
            !HOMEPAGE_FAQ_IDS.has(faq.id);
        } else {
          matchesTab = faq.page_slug === selectedPageFilter;
        }
      }

      if (statusFilter !== "all" && faq.status !== statusFilter) {
        return false;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
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
    selectedCategoryFilter,
    selectedProductFilter,
    statusFilter,
    searchQuery,
  ]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, selectedPageFilter, selectedCategoryFilter, selectedProductFilter, statusFilter, searchQuery]);

  const totalPages = Math.ceil(filteredFaqs.length / ITEMS_PER_PAGE) || 1;
  const paginatedFaqs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredFaqs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredFaqs, currentPage]);

  // Drag and drop handlers
  const handleDragStart = (id: string) => {
    setDraggedFaqId(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedFaqId !== id) {
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

    const fromIndex = filteredFaqs.findIndex((f) => f.id === draggedFaqId);
    const toIndex = filteredFaqs.findIndex((f) => f.id === targetId);

    if (fromIndex === -1 || toIndex === -1) return;

    const updated = [...filteredFaqs];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);

    setFaqs((prev) => {
      const otherFaqs = prev.filter((f) => !filteredFaqs.some((ff) => ff.id === f.id));
      return [...updated, ...otherFaqs];
    });

    setDraggedFaqId(null);
    setDragOverFaqId(null);

    await reorderFaqs(updated);
    toast({
      title: "Order Updated",
      description: "FAQ order saved to Supabase.",
    });
  };

  const handleMove = async (id: string, direction: "up" | "down") => {
    const index = filteredFaqs.findIndex((f) => f.id === id);
    if (index === -1) return;
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === filteredFaqs.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...filteredFaqs];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setFaqs((prev) => {
      const otherFaqs = prev.filter((f) => !filteredFaqs.some((ff) => ff.id === f.id));
      return [...updated, ...otherFaqs];
    });

    await reorderFaqs(updated);
    toast({
      title: "Order Updated",
      description: "FAQ order synced.",
    });
  };

  const startInlineEdit = (faq: FAQItem) => {
    setEditingFaqId(faq.id);
    setEditForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "",
      status: faq.status || "Published",
      page_slug: faq.page_slug || undefined,
      product_slug: faq.product_slug || undefined,
      category_id: faq.category_id || undefined,
    });
  };

  const cancelInlineEdit = () => {
    setEditingFaqId(null);
  };

  const saveInlineEdit = async (id: string) => {
    const existing = faqs.find((f) => f.id === id);
    if (!existing) return;

    if (!editForm.question.trim() || !editForm.answer.trim()) {
      toast({
        title: "Required Fields Missing",
        description: "Question and Answer cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    const updated: FAQItem = {
      ...existing,
      question: editForm.question.trim(),
      answer: editForm.answer.trim(),
      category: editForm.category.trim() || existing.category,
      status: editForm.status,
      page_slug: editForm.page_slug || existing.page_slug,
      product_slug: editForm.product_slug || existing.product_slug,
      category_id: editForm.category_id || existing.category_id,
    };

    setFaqs((prev) => prev.map((f) => (f.id === id ? updated : f)));
    setEditingFaqId(null);

    await saveFaqRecord(updated);
    toast({
      title: "FAQ Saved",
      description: "Changes updated live in Supabase.",
    });
  };

  const handleCreateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.question.trim() || !addForm.answer.trim()) {
      toast({
        title: "Required Fields Missing",
        description: "Please provide both a Question and an Answer.",
        variant: "destructive",
      });
      return;
    }

    let tab: FAQItem["tab"] = "global";
    let section: FAQItem["section"] = "homepage";
    let page_slug: string | null = "home";
    let page_name: string | null = "Home Page";
    let category_id: string | null = null;
    let product_slug: string | null = null;

    if (addForm.targetType === "artwork") {
      tab = "artwork";
      section = "artwork";
      page_slug = "artwork-guidelines";
      page_name = "Artwork Guidelines";
    } else if (addForm.targetType === "category") {
      tab = "category";
      section = "category";
      page_slug = addForm.category_id || "category";
      category_id = addForm.category_id;
      const cat = allCategories.find((c) => c.slug === addForm.category_id);
      page_name = cat?.name ? `Category: ${cat.name}` : "Category Page";
    } else if (addForm.targetType === "product") {
      tab = "product";
      section = "product";
      page_slug = "product-detail-pages";
      product_slug = addForm.product_slug;
      const prod = allProducts.find((p) => p.slug === addForm.product_slug);
      page_name = prod?.name ? `Product: ${prod.name}` : "Product Detail";
    } else if (addForm.targetType === "page") {
      tab = "page";
      section = "page";
      page_slug = addForm.page_slug;
      const pg = SITE_PAGES.find((p) => p.slug === addForm.page_slug);
      page_name = pg?.name || addForm.page_slug;
    }

    const newRecord: Partial<FAQItem> & { question: string; answer: string } = {
      id: crypto.randomUUID(),
      question: addForm.question.trim(),
      answer: addForm.answer.trim(),
      category: addForm.categoryLabel.trim() || page_name || "General",
      tab,
      section,
      page_slug,
      page_name,
      category_id,
      product_slug,
      status: addForm.status,
      order: 0,
    };

    const saved = await saveFaqRecord(newRecord);
    setFaqs((prev) => [saved, ...prev]);
    setIsAddModalOpen(false);
    setAddForm({
      question: "",
      answer: "",
      targetType: "global",
      category_id: "",
      product_slug: "",
      page_slug: "home",
      status: "Published",
      categoryLabel: "",
    });

    toast({
      title: "FAQ Created",
      description: `New question added to ${page_name} in Supabase.`,
    });
  };

  const handleDelete = async (id: string, question: string) => {
    if (!confirm(`Are you sure you want to delete this FAQ?\n"${question}"`))
      return;
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    await deleteFaqRecord(id);
    toast({
      title: "FAQ Deleted",
      description: "Question removed from Supabase.",
    });
  };

  const getPageBadge = (faq: FAQItem) => {
    if (faq.product_slug) {
      const prod = allProducts.find((p) => p.slug === faq.product_slug);
      return `Product: ${prod?.name || faq.product_slug}`;
    }
    if (faq.category_slug) {
      const cat = allCategories.find((c) => c.slug === faq.category_slug);
      return `Category: ${cat?.name || faq.category_slug}`;
    }
    if (faq.page_name) return faq.page_name;
    if (faq.page_slug === "home" || faq.tab === "global") return "Home Page";
    if (faq.page_slug === "artwork-guidelines" || faq.tab === "artwork") return "Artwork Guidelines";
    if (faq.page_slug === "process") return "Process Page";
    if (faq.page_slug === "about") return "About Page";
    if (faq.page_slug === "contact") return "Contact Page";
    if (faq.page_slug === "track") return "Track Order";
    if (faq.page_slug === "case-studies") return "Case Studies";
    return "Website Page";
  };

  const isProductSection = activeTab === "product";
  const isCategorySection = activeTab === "category";

  const otherPagesCount = faqs.filter(
    (f) => !f.category_slug && !f.category_id && !f.product_slug && !f.product_id
  ).length;

  const getPageFaqCount = (slug: string) => {
    if (slug === "all") {
      return otherPagesCount;
    }
    if (slug === "home") {
      return faqs.filter(
        (f) =>
          HOMEPAGE_FAQ_IDS.has(f.id) ||
          (f.page_slug === "home" && !f.category_id && !f.product_id && f.tab !== "artwork")
      ).length;
    }
    if (slug === "artwork-guidelines") {
      return faqs.filter(
        (f) =>
          (f.page_slug === "artwork-guidelines" || f.tab === "artwork" || f.section === "artwork") &&
          !HOMEPAGE_FAQ_IDS.has(f.id)
      ).length;
    }
    return faqs.filter((f) => f.page_slug === slug).length;
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0">
      {/* Subtabs Bar - Exactly 4 Tabs */}
      <div className="ptabs bg-white/70 backdrop-blur-sm border-b border-[#e0ddd6]/60 flex px-5 sm:px-6 shrink-0 overflow-x-auto gap-4 [scrollbar-width:thin]">
        <button
          type="button"
          onClick={() => {
            setActiveTab("all");
            setSelectedPageFilter("all");
          }}
          className={`ptab relative px-0.5 py-2.5 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "all" ? "text-[#2d5c3e]" : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          All FAQs ({faqs.length})
          {activeTab === "all" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("category");
            setSelectedCategoryFilter("all");
          }}
          className={`ptab relative px-0.5 py-2.5 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "category" ? "text-[#2d5c3e]" : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          By Category ({faqs.filter((f) => Boolean(f.category_slug || f.category_id)).length})
          {activeTab === "category" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("product");
            setSelectedProductFilter("all");
          }}
          className={`ptab relative px-0.5 py-2.5 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "product" ? "text-[#2d5c3e]" : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          By Product ({faqs.filter((f) => Boolean(f.product_slug || f.product_id)).length})
          {activeTab === "product" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("pages");
            setSelectedPageFilter("all");
          }}
          className={`ptab relative px-0.5 py-2.5 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "pages" ? "text-[#2d5c3e]" : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Other Site Pages ({otherPagesCount})
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
            <div className="flex flex-1 items-center gap-3 max-w-[500px]">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa6a0]" />
                <input
                  type="text"
                  placeholder="Search 950+ FAQs, questions, answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-white rounded-lg border border-[#e0ddd6] text-[13px] text-[#1a1a1a] placeholder-[#aaa6a0] focus:outline-none focus:border-[#2d5c3e] focus:ring-1 focus:ring-[#2d5c3e] transition-colors"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="h-9 px-3 text-[12px] font-semibold bg-white border border-[#e0ddd6] rounded-lg text-[#1a1a1a] outline-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="Published">Live (Published)</option>
                <option value="Draft">Drafts</option>
              </select>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => loadData(true)}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-[#e0ddd6] text-[#7a7672] hover:text-[#1a1a1a] rounded-lg text-[12px] font-semibold transition-colors cursor-pointer disabled:opacity-50"
                title="Fetch latest FAQs directly from Supabase database"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#e8732a]" : ""}`} />
                Sync Supabase
              </button>

              <button
                type="button"
                onClick={handleSyncUi}
                disabled={syncingUi}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#f4fbf6] border border-[#2d5c3e]/30 text-[#2d5c3e] hover:bg-[#e8f6ec] hover:border-[#2d5c3e] rounded-lg text-[12px] font-semibold transition-all cursor-pointer disabled:opacity-50 shadow-xs"
                title="Refresh and revalidate live Frontend UI cache"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncingUi ? "animate-spin text-[#2d5c3e]" : "text-[#2d5c3e]"}`} />
                Sync UI
              </button>

              <button
                type="button"
                onClick={() => {
                  setAddForm((prev) => ({
                    ...prev,
                    targetType:
                      activeTab === "category"
                        ? "category"
                        : activeTab === "product"
                        ? "product"
                        : activeTab === "pages" && selectedPageFilter === "artwork-guidelines"
                        ? "artwork"
                        : activeTab === "pages"
                        ? (selectedPageFilter === "home" || selectedPageFilter === "all" ? "global" : "page")
                        : "global",
                    category_id: selectedCategoryFilter !== "all" ? selectedCategoryFilter : "",
                    product_slug: selectedProductFilter !== "all" ? selectedProductFilter : "",
                    page_slug: selectedPageFilter !== "all" ? selectedPageFilter : "home",
                  }));
                  setIsAddModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#2d5c3e] text-white px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-[#234931] transition-colors shrink-0 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add FAQ
              </button>
            </div>
          </div>

          {/* By Pages Filter Pills */}
          {activeTab === "pages" && (
            <div className="bg-white p-3 rounded-xl border border-[#e0ddd6] flex items-center gap-2 overflow-x-auto [scrollbar-width:thin] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a7672] px-2 shrink-0">
                Filter by Page:
              </span>
              {SITE_PAGES.map((p) => {
                const Icon = p.icon;
                const isSelected = selectedPageFilter === p.slug;
                const count = getPageFaqCount(p.slug);
                return (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => {
                      setSelectedPageFilter(p.slug);
                      if (p.slug !== "product-detail-pages") setSelectedProductFilter("all");
                      if (p.slug !== "category") setSelectedCategoryFilter("all");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold inline-flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#2d5c3e] text-white shadow-sm"
                        : "bg-[#faf8f5] text-[#55524e] border border-[#e0ddd6] hover:bg-[#f0ede6] hover:text-[#1a1a1a]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{p.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        isSelected ? "bg-white/20 text-white" : "bg-[#e0ddd6]/60 text-[#7a7672]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Category Filter Bar */}
          {isCategorySection && (
            <div className="bg-white p-4 rounded-xl border border-[#e0ddd6] shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e0ddd6] pb-2.5">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#e8732a]" />
                  <h3 className="text-[13px] font-bold text-[#1a1a1a]">
                    Select Packaging Category (22 Live Categories • 118 FAQs)
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-[#7a7672]">
                  {allCategories.length} Categories Synced from Supabase
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aaa6a0]" />
                  <input
                    type="text"
                    placeholder="Search 22 categories (e.g. Bakery, Candle, Rigid, Mylar, Soap)..."
                    value={categorySearchQuery}
                    onChange={(e) => setCategorySearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-[#faf8f5] rounded-lg border border-[#e0ddd6] text-[12px] text-[#1a1a1a] placeholder-[#aaa6a0] outline-none focus:border-[#2d5c3e]"
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="h-8 px-3 text-[12px] font-semibold bg-[#faf8f5] border border-[#e0ddd6] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] max-w-[280px]"
                  >
                    <option value="all">📂 All 22 Categories (118 FAQs)</option>
                    {filteredCategoryOptions.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name} {c.count > 0 ? `(${c.count} FAQs)` : ""} (/{c.slug})
                      </option>
                    ))}
                  </select>
                  {selectedCategoryFilter !== "all" && (
                    <button
                      type="button"
                      onClick={() => setSelectedCategoryFilter("all")}
                      className="text-[11px] font-bold text-[#e8732a] hover:underline px-1 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Category Chips */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1 max-h-[140px] overflow-y-auto [scrollbar-width:thin]">
                <button
                  type="button"
                  onClick={() => setSelectedCategoryFilter("all")}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer inline-flex items-center gap-1 ${
                    selectedCategoryFilter === "all"
                      ? "bg-[#2d5c3e] text-white shadow-xs"
                      : "bg-[#faf8f5] text-[#55524e] border border-[#e0ddd6] hover:bg-[#f0ede6]"
                  }`}
                >
                  All (118)
                </button>
                {allCategories.map((c) => {
                  const isSelected = selectedCategoryFilter === c.slug;
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setSelectedCategoryFilter(c.slug)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-[#2d5c3e] text-white font-bold shadow-xs"
                          : "bg-[#faf8f5] text-[#55524e] border border-[#e0ddd6] hover:bg-[#f0ede6] hover:text-[#1a1a1a]"
                      }`}
                    >
                      <span>{c.name}</span>
                      <span
                        className={`text-[10px] px-1 py-0.2 rounded font-bold ${
                          isSelected ? "bg-white/20 text-white" : "bg-[#e0ddd6]/60 text-[#7a7672]"
                        }`}
                      >
                        {c.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Product Filter Bar */}
          {isProductSection && (
            <div className="bg-white p-4 rounded-xl border border-[#e0ddd6] shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e0ddd6] pb-2.5">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#e8732a]" />
                  <h3 className="text-[13px] font-bold text-[#1a1a1a]">
                    Filter by Product Detail Page (160+ Products)
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
                    placeholder="Search from 160+ products (e.g. Delta 8, Candle, Bakery, Mylar)..."
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
                      className="text-[11px] font-bold text-[#e8732a] hover:underline px-1 cursor-pointer"
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
                  {activeTab === "all"
                    ? "All Synced FAQs"
                    : activeTab === "category"
                    ? `Category FAQs ${selectedCategoryFilter !== "all" ? `(/${selectedCategoryFilter})` : ""}`
                    : activeTab === "product"
                    ? `Product Detail FAQs ${selectedProductFilter !== "all" ? `(/product/${selectedProductFilter})` : ""}`
                    : selectedPageFilter === "all"
                    ? "Other Site Pages FAQs"
                    : `FAQs for ${SITE_PAGES.find((p) => p.slug === selectedPageFilter)?.name || selectedPageFilter}`}
                </h2>
              </div>
              <span className="text-[12px] font-medium text-[#7a7672]">
                Showing {paginatedFaqs.length} of {filteredFaqs.length} FAQs
              </span>
            </div>

            {loading ? (
              <div className="p-12 text-center text-[#7a7672] flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-6 h-6 animate-spin text-[#2d5c3e]" />
                <p className="text-[13px] font-semibold">Syncing FAQs from Supabase...</p>
              </div>
            ) : filteredFaqs.length === 0 ? (
              <div className="p-12 text-center text-[#7a7672] space-y-2">
                <p className="text-[14px] font-semibold text-[#1a1a1a]">
                  No FAQs found matching your criteria.
                </p>
                <p className="text-[12px] max-w-[400px] mx-auto text-[#7a7672]">
                  Add a new question and answer to sync live to this page.
                </p>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#2d5c3e] hover:underline pt-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add FAQ for this target
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#e0ddd6]">
                {paginatedFaqs.map((faq, index) => {
                  const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
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
                                disabled={globalIndex === 0}
                                className="p-0.5 text-[#aaa6a0] hover:text-[#1a1a1a] disabled:opacity-20 cursor-pointer"
                                title="Move up"
                              >
                                <ChevronUp className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMove(faq.id, "down")}
                                disabled={globalIndex === filteredFaqs.length - 1}
                                className="p-0.5 text-[#aaa6a0] hover:text-[#1a1a1a] disabled:opacity-20 cursor-pointer"
                                title="Move down"
                              >
                                <ChevronDown className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="w-5 h-5 rounded-full bg-[#f0ede6] text-[#7a7672] text-[11px] font-bold inline-flex items-center justify-center shrink-0 ml-1">
                              {globalIndex + 1}
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
                              {faq.category_slug && (
                                <>
                                  <span>•</span>
                                  <span className="text-[#2d5c3e] font-medium">
                                    /{faq.category_slug}
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
                              Edit
                            </button>
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
                                Editing Question #{globalIndex + 1}
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
                                  Product Link (Optional)
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-[#e0ddd6] bg-[#faf8f5] flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[12px] text-[#7a7672]">
                  Page {currentPage} of {totalPages} ({filteredFaqs.length} total)
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-2 rounded-lg border border-[#e0ddd6] bg-white text-[#1a1a1a] disabled:opacity-40 hover:bg-[#f0ede6] transition-colors cursor-pointer"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {(() => {
                    const pages: number[] = [];
                    if (totalPages <= 5) {
                      for (let i = 1; i <= totalPages; i++) pages.push(i);
                    } else {
                      let start = Math.max(1, currentPage - 2);
                      let end = Math.min(totalPages, start + 4);
                      if (end - start < 4) {
                        start = Math.max(1, end - 4);
                      }
                      for (let i = start; i <= end; i++) pages.push(i);
                    }

                    return pages.map((pageNum) => (
                      <button
                        key={`faq-page-${pageNum}`}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`h-8 w-8 rounded-lg text-[12px] font-bold transition-colors cursor-pointer ${
                          currentPage === pageNum
                            ? "bg-[#2d5c3e] text-white shadow-xs"
                            : "bg-white border border-[#e0ddd6] text-[#55524e] hover:bg-[#f0ede6]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ));
                  })()}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="p-2 rounded-lg border border-[#e0ddd6] bg-white text-[#1a1a1a] disabled:opacity-40 hover:bg-[#f0ede6] transition-colors cursor-pointer"
                    title="Next Page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add New FAQ Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#e0ddd6] overflow-hidden">
            <div className="p-5 border-b border-[#e0ddd6] flex items-center justify-between bg-[#f5f3ee]/50">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#2d5c3e]" />
                <h3 className="text-[16px] font-bold text-[#1a1a1a]">
                  Add New FAQ
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white text-[#7a7672] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFaq} className="p-6 space-y-4 text-[13px]">
              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1">
                  Target Destination / Page *
                </label>
                <select
                  value={addForm.targetType}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      targetType: e.target.value as any,
                    }))
                  }
                  className="w-full px-3 py-2 text-[13px] bg-white border border-[#d8d4cc] rounded-lg outline-none focus:border-[#2d5c3e]"
                >
                  <option value="global">Home Page / Global</option>
                  <option value="category">Category Page (Specific category)</option>
                  <option value="product">Product Detail Page (Specific product)</option>
                  <option value="artwork">Artwork Guidelines Page</option>
                  <option value="page">Other Site Pages (About, Process, Contact, etc.)</option>
                </select>
              </div>

              {addForm.targetType === "category" && (
                <div>
                  <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1">
                    Select Category *
                  </label>
                  <select
                    value={addForm.category_id}
                    onChange={(e) =>
                      setAddForm((prev) => ({
                        ...prev,
                        category_id: e.target.value,
                      }))
                    }
                    required
                    className="w-full px-3 py-2 text-[13px] bg-white border border-[#d8d4cc] rounded-lg outline-none focus:border-[#2d5c3e]"
                  >
                    <option value="">Select a Category...</option>
                    {allCategories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name} (/{c.slug})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {addForm.targetType === "product" && (
                <div>
                  <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1">
                    Select Product *
                  </label>
                  <select
                    value={addForm.product_slug}
                    onChange={(e) =>
                      setAddForm((prev) => ({
                        ...prev,
                        product_slug: e.target.value,
                      }))
                    }
                    required
                    className="w-full px-3 py-2 text-[13px] bg-white border border-[#d8d4cc] rounded-lg outline-none focus:border-[#2d5c3e]"
                  >
                    <option value="">Select from 160+ Products...</option>
                    {allProducts.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name} (/product/{p.slug})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {addForm.targetType === "page" && (
                <div>
                  <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1">
                    Select Site Page *
                  </label>
                  <select
                    value={addForm.page_slug}
                    onChange={(e) =>
                      setAddForm((prev) => ({
                        ...prev,
                        page_slug: e.target.value,
                      }))
                    }
                    required
                    className="w-full px-3 py-2 text-[13px] bg-white border border-[#d8d4cc] rounded-lg outline-none focus:border-[#2d5c3e]"
                  >
                    {SITE_PAGES.filter((p) => p.slug !== "all" && p.slug !== "product-detail-pages" && p.slug !== "category").map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Can I request a physical sample before bulk order?"
                  value={addForm.question}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      question: e.target.value,
                    }))
                  }
                  required
                  className="w-full px-3 py-2 text-[13px] bg-white border border-[#d8d4cc] rounded-lg outline-none focus:border-[#2d5c3e]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter the detailed answer..."
                  value={addForm.answer}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      answer: e.target.value,
                    }))
                  }
                  required
                  className="w-full p-3 text-[13px] bg-white border border-[#d8d4cc] rounded-lg outline-none focus:border-[#2d5c3e] leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1">
                    Section Subtitle (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Samples & Proofing"
                    value={addForm.categoryLabel}
                    onChange={(e) =>
                      setAddForm((prev) => ({
                        ...prev,
                        categoryLabel: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-1.5 text-[12px] bg-white border border-[#d8d4cc] rounded-lg outline-none focus:border-[#2d5c3e]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1">
                    Status
                  </label>
                  <select
                    value={addForm.status}
                    onChange={(e) =>
                      setAddForm((prev) => ({
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

              <div className="p-4 border-t border-[#e0ddd6] bg-[#f5f3ee]/30 -mx-6 -mb-6 mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 h-9 rounded-lg border border-[#e0ddd6] text-[12px] font-bold text-[#7a7672] hover:bg-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 h-9 rounded-lg bg-[#2d5c3e] text-white text-[12px] font-bold hover:bg-[#234931] flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" /> Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
