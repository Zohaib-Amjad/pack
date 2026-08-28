"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  Pen,
  Trash2,
  Package,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { categories, type Category } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

// Predefined thumbnail map matching product catalog
const CATEGORY_IMAGES: Record<string, string> = {
  "bakery-boxes": "/images/products/custom-cake-boxes.jpg",
  "candle-boxes": "/images/products/two-piece-candle-boxes.jpg",
  "cardboard-boxes": "/images/products/cardboard-boxes-with-lids.jpg",
  "coffee-packaging": "/images/products/stand-up-coffee-pouches.jpg",
  "corrugated-boxes": "/images/products/custom-corrugated-boxes.jpg",
  "cosmetic-boxes": "/images/products/makeup-packaging.jpg",
  "custom-cigarette-boxes": "/images/products/cardboard-cigarette-boxes.jpg",
  "custom-food-boxes": "/images/products/custom-burger-boxes.jpg",
  "custom-jewelry-boxes": "/images/products/cardboard-jewelry-boxes.jpg",
  "custom-labels-and-stickers": "/images/products/custom-vinyl-stickers.jpg",
  "custom-mailer-boxes": "/images/products/corrugated-mailer-boxes.jpg",
  "custom-retail-boxes": "/images/products/custom-retail-boxes.jpg",
  "custom-wax-papers": "/images/products/custom-deli-papers.jpg",
  "display-boxes": "/images/products/counter-display-boxes.jpg",
  "gable-boxes": "/images/products/gable-box-with-window.jpg",
  "kraft-boxes": "/images/products/kraft-boxes-with-lids.jpg",
  "mylar-bags": "/images/products/cookies-mylar-bags.jpg",
  "pillow-boxes": "/images/products/pillow-gift-boxes.jpg",
  "pre-roll-boxes": "/images/products/pre-roll-display-boxes.jpg",
  "rigid-boxes": "/images/products/rigid-setup-boxes.jpg",
  "soap-boxes": "/images/products/kraft-soap-boxes.jpg",
  "tube-packaging": "/images/products/cardboard-tube-packaging.jpg",
  "tuck-boxes": "/images/products/reverse-tuck-boxes.jpg",
};

interface CategoryWithState extends Category {
  id?: string;
  is_active?: boolean;
}

export default function AdminCategoriesView() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<
    "all" | "industry" | "style" | "material"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [categoryList, setCategoryList] = useState<CategoryWithState[]>(() => {
    return categories.map((c, idx) => ({
      ...c,
      id: `cat-${c.slug}`,
      // Make custom-food-boxes hidden as shown in the screenshot, others active
      is_active: c.slug !== "custom-food-boxes",
    }));
  });

  const filteredCategories = useMemo(() => {
    return categoryList.filter((cat) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        cat.name.toLowerCase().includes(q) ||
        cat.slug.toLowerCase().includes(q) ||
        (cat.description && cat.description.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (activeTab === "industry") return cat.section === "industry";
      if (activeTab === "style") return cat.section === "style";
      if (activeTab === "material") return cat.section === "material";

      return true;
    });
  }, [categoryList, searchQuery, activeTab]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / rowsPerPage)
  );
  const paginatedCategories = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredCategories.slice(start, start + rowsPerPage);
  }, [filteredCategories, currentPage, rowsPerPage]);

  const startCount = (currentPage - 1) * rowsPerPage + 1;
  const endCount = Math.min(
    currentPage * rowsPerPage,
    filteredCategories.length
  );

  const handleDelete = (slug: string, name: string) => {
    if (
      !confirm(
        `Are you sure you want to delete category "${name}"? Products inside will remain.`
      )
    )
      return;
    setCategoryList((prev) => prev.filter((c) => c.slug !== slug));
    toast({
      title: "Category Deleted",
      description: `"${name}" has been removed.`,
    });
  };

  const getSectionLabel = (section: string) => {
    if (section === "industry") return "Industry Section";
    if (section === "style") return "Style Section";
    if (section === "material") return "Material Section";
    return "Custom Section";
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0">
      {/* Subtabs Bar */}
      <div className="ptabs bg-white/70 backdrop-blur-sm border-b border-[#e0ddd6]/60 flex px-5 sm:px-6 shrink-0 overflow-x-auto gap-4 [scrollbar-width:thin]">
        <button
          type="button"
          onClick={() => {
            setActiveTab("all");
            setCurrentPage(1);
          }}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "all"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Product Categories
          {activeTab === "all" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("industry");
            setCurrentPage(1);
          }}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "industry"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Industry Section
          {activeTab === "industry" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("style");
            setCurrentPage(1);
          }}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "style"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Style Section
          {activeTab === "style" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("material");
            setCurrentPage(1);
          }}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "material"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Material Section
          {activeTab === "material" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
      </div>

      {/* Main View Area */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col gap-[14px]">
            {/* Top Toolbar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-[13px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#aaa6a0]" />
                <input
                  placeholder="Search categories..."
                  className="w-full h-[40px] pl-[38px] pr-[14px] text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/40 focus:ring-4 focus:ring-[#e8732a]/5 transition-all outline-none text-[#1a1a1a] placeholder:text-[#d8d4cc]"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <label className="flex items-center gap-2 text-[11px] font-semibold text-[#7a7672] whitespace-nowrap">
                  <span className="hidden sm:inline">Rows</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="h-9 rounded-md border border-[#e0ddd6] bg-white px-2 text-[12px] font-semibold text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#e8732a]/25 cursor-pointer"
                  >
                    <option value={10}>10 / page</option>
                    <option value={25}>25 / page</option>
                    <option value={50}>50 / page</option>
                  </select>
                </label>

                <Link
                  href="/admin/categories/new"
                  className="btn btn-p h-[40px] inline-flex items-center gap-[7px] px-4 text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] transition-all no-underline shadow-sm"
                >
                  <Plus className="w-[15px] h-[15px]" /> New Category
                </Link>
              </div>
            </div>

            {/* Table Card */}
            <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                <div className="ch-l flex-1">
                  <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                    Categories
                  </div>
                  <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                    {filteredCategories.length} categories
                  </div>
                </div>
              </div>

              <div className="cb p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[640px]">
                    <thead>
                      <tr className="border-b border-[#e0ddd6]">
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider">
                          Category
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider w-[100px]">
                          Status
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider">
                          Section
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider hidden md:table-cell">
                          Description
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider text-center w-[100px]">
                          Products
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider text-right w-[120px]">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e0ddd6]">
                      {paginatedCategories.map((cat) => {
                        const img = CATEGORY_IMAGES[cat.slug];
                        return (
                          <tr
                            key={cat.slug}
                            className="hover:bg-[#f5f3ee] transition-colors group"
                          >
                            <td className="p-[12px_16px]">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="h-10 w-10 rounded-[6px] bg-[#f5f3ee] border border-[#e0ddd6] overflow-hidden shrink-0 relative">
                                  {img ? (
                                    <Image
                                      alt={cat.name}
                                      fill
                                      sizes="40px"
                                      className="object-cover"
                                      src={img}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <Layers className="w-5 h-5 text-[#d8d4cc]" />
                                    </div>
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[12px] font-bold text-[#1a1a1a] truncate">
                                    {cat.name}
                                  </p>
                                  <p className="text-[10px] text-[#aaa6a0] font-medium truncate">
                                    /{cat.slug}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-[12px_16px]">
                              <span
                                className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                  cat.is_active
                                    ? "bg-[#eaf2ed] text-[#2d5c3e]"
                                    : "bg-[#fdecea] text-[#b83c2b]"
                                }`}
                              >
                                {cat.is_active ? "Active" : "Hidden"}
                              </span>
                            </td>
                            <td className="p-[12px_16px] text-[12px] font-semibold text-[#7a7672] whitespace-nowrap">
                              {getSectionLabel(cat.section)}
                            </td>
                            <td className="p-[12px_16px] text-[12px] text-[#7a7672] hidden md:table-cell max-w-[280px]">
                              <span className="line-clamp-2">
                                {cat.description || "—"}
                              </span>
                            </td>
                            <td className="p-[12px_16px] text-center">
                              <span className="inline-flex items-center justify-center gap-1 text-[12px] font-semibold text-[#1a1a1a]">
                                <Package className="w-3.5 h-3.5 text-[#aaa6a0]" />
                                {cat.products?.length || 0}
                              </span>
                            </td>
                            <td className="p-[12px_16px] text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <Link
                                  href={`/admin/categories/${cat.slug}`}
                                  className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-[#e8732a] hover:text-white hover:border-[#e8732a] transition-all cursor-pointer"
                                  title="Edit category"
                                >
                                  <Pen className="w-3.5 h-3.5" />
                                </Link>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(cat.slug, cat.name)
                                  }
                                  className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all cursor-pointer"
                                  title="Delete category"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-[12px_16px] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-[#e0ddd6]">
                  <div className="text-[11px] text-[#aaa6a0]">
                    Showing{" "}
                    <span className="font-bold text-[#1a1a1a]">
                      {filteredCategories.length > 0
                        ? `${startCount}–${endCount}`
                        : "0"}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-[#1a1a1a]">
                      {filteredCategories.length}
                    </span>{" "}
                    · Page{" "}
                    <span className="font-bold text-[#1a1a1a]">
                      {currentPage} / {totalPages}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] disabled:opacity-30 hover:bg-[#f5f3ee] cursor-pointer disabled:cursor-not-allowed transition-all"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] disabled:opacity-30 hover:bg-[#f5f3ee] cursor-pointer disabled:cursor-not-allowed transition-all"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
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
