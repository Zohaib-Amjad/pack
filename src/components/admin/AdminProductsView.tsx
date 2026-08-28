"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  Upload,
  Download,
  Filter,
  ExternalLink,
  Copy,
  Pen,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { getAllProducts, categories, type Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 10;

interface ProductWithState extends Product {
  id?: string;
  image?: string;
  is_active?: boolean;
  is_trending?: boolean;
  created_at?: string;
}

export default function AdminProductsView() {
  const allProducts = getAllProducts();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"catalog" | "import_export">("catalog");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTrending, setSelectedTrending] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Maintain local product state for live toggling, duplicate, delete
  const [productList, setProductList] = useState<ProductWithState[]>(() => {
    return allProducts.map((p, idx) => ({
      ...p,
      id: `prod-${p.slug}`,
      image: (p as any).image || "/images/products/custom-cake-boxes.jpg",
      is_active: true,
      is_trending: idx < 12,
      created_at: `Aug ${Math.max(1, 28 - (idx % 25))}, 2026`,
    }));
  });

  const filteredProducts = useMemo(() => {
    return productList.filter((product) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.slug.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      if (selectedStatus === "active" && !product.is_active) return false;
      if (selectedStatus === "hidden" && product.is_active) return false;

      if (selectedTrending === "yes" && !product.is_trending) return false;

      return true;
    });
  }, [productList, searchQuery, selectedCategory, selectedStatus, selectedTrending]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const toggleSelectAll = () => {
    if (selectedRows.size === paginatedProducts.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedProducts.map((p) => p.slug)));
    }
  };

  const toggleSelectRow = (slug: string) => {
    const next = new Set(selectedRows);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    setSelectedRows(next);
  };

  const handleDuplicate = (product: ProductWithState) => {
    const duplicated: ProductWithState = {
      ...product,
      id: `prod-${product.slug}-copy-${Date.now()}`,
      name: `${product.name} (Copy)`,
      slug: `${product.slug}-copy`,
      created_at: "Aug 28, 2026",
    };
    setProductList((prev) => [duplicated, ...prev]);
    toast({
      title: "Product Duplicated",
      description: `Created copy of "${product.name}".`,
    });
  };

  const handleDelete = (slug: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    setProductList((prev) => prev.filter((p) => p.slug !== slug));
    toast({
      title: "Product Deleted",
      description: `"${name}" has been removed.`,
    });
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Slug,Category,Status,Created"]
        .concat(
          productList.map(
            (p) =>
              `"${p.name}","${p.slug}","${p.category}","${
                p.is_active ? "Active" : "Hidden"
              }","${p.created_at}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "hofpack_products_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Catalog Exported",
      description: `Exported ${productList.length} products to CSV.`,
    });
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0">
      {/* Subtabs Bar */}
      <div className="ptabs bg-white/70 backdrop-blur-sm border-b border-[#e0ddd6]/60 flex px-5 sm:px-6 shrink-0 overflow-x-auto gap-4 [scrollbar-width:thin]">
        <button
          type="button"
          onClick={() => setActiveTab("catalog")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "catalog"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Product Catalog
          {activeTab === "catalog" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("import_export")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "import_export"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Import / Export
          {activeTab === "import_export" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
      </div>

      {/* Main View Area */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col gap-[14px]">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="absolute left-[13px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#aaa6a0]" />
                <input
                  placeholder="Search products…"
                  className="w-full h-[40px] pl-[38px] pr-[14px] text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/40 focus:ring-4 focus:ring-[#e8732a]/5 transition-all text-[#1a1a1a] placeholder:text-[#d8d4cc]"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    toast({
                      title: "Import Catalog",
                      description: "Select CSV or JSON packaging data to import.",
                    })
                  }
                  className="inline-flex items-center gap-1.5 h-[40px] px-4 text-[12px] font-bold border border-[#e0ddd6] bg-white text-[#1a1a1a] rounded-[8px] hover:bg-[#f5f3ee] transition-colors cursor-pointer"
                >
                  <Upload className="w-[14px] h-[14px]" /> Import
                </button>
                <button
                  type="button"
                  onClick={handleExport}
                  className="inline-flex items-center gap-1.5 h-[40px] px-4 text-[12px] font-bold border border-[#e0ddd6] bg-white text-[#1a1a1a] rounded-[8px] hover:bg-[#f5f3ee] disabled:opacity-50 transition-colors cursor-pointer"
                >
                  <Download className="w-[14px] h-[14px]" /> Export All
                </button>
                <Link
                  href="/admin/products/new"
                  className="inline-flex items-center gap-1.5 h-[40px] px-4 text-[12px] font-bold bg-[#e8732a] text-white rounded-[8px] hover:bg-[#c45a18] transition-colors no-underline shadow-sm"
                >
                  <Plus className="w-[15px] h-[15px]" /> New Product
                </Link>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-[13px] h-[13px] text-[#aaa6a0] shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-[34px] px-3 pr-7 text-[12px] bg-white border border-[#e0ddd6] rounded-[7px] text-[#4a4a4a] focus:outline-none focus:border-[#e8732a]/40 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 6px center",
                  backgroundSize: "16px",
                }}
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-[34px] px-3 pr-7 text-[12px] bg-white border border-[#e0ddd6] rounded-[7px] text-[#4a4a4a] focus:outline-none focus:border-[#e8732a]/40 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 6px center",
                  backgroundSize: "16px",
                }}
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="hidden">Hidden</option>
              </select>

              <select
                value={selectedTrending}
                onChange={(e) => {
                  setSelectedTrending(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-[34px] px-3 pr-7 text-[12px] bg-white border border-[#e0ddd6] rounded-[7px] text-[#4a4a4a] focus:outline-none focus:border-[#e8732a]/40 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 6px center",
                  backgroundSize: "16px",
                }}
              >
                <option value="">All Products</option>
                <option value="yes">Trending Only</option>
              </select>
            </div>

            {/* Table Card */}
            <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                <div className="ch-l flex-1">
                  <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                    Product Catalog
                  </div>
                  <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                    {filteredProducts.length} products total
                  </div>
                </div>
              </div>

              <div className="cb p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#e0ddd6]">
                        <th className="p-[10px_16px] w-10">
                          <input
                            type="checkbox"
                            checked={
                              paginatedProducts.length > 0 &&
                              selectedRows.size === paginatedProducts.length
                            }
                            onChange={toggleSelectAll}
                            className="w-3.5 h-3.5 accent-[#e8732a] cursor-pointer"
                          />
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider">
                          Product
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider">
                          Category
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider text-center">
                          Status
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider text-center">
                          Trending
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider">
                          Created
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e0ddd6]">
                      {paginatedProducts.map((product) => {
                        const isSelected = selectedRows.has(product.slug);
                        return (
                          <tr
                            key={product.slug}
                            className={`hover:bg-[#f5f3ee] transition-colors group ${
                              isSelected ? "bg-[#fdf0e8]/30" : ""
                            }`}
                          >
                            <td className="p-[12px_16px]">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelectRow(product.slug)}
                                className="w-3.5 h-3.5 accent-[#e8732a] cursor-pointer"
                              />
                            </td>
                            <td className="p-[12px_16px]">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-[6px] bg-[#f5f3ee] border border-[#e0ddd6] overflow-hidden shrink-0 relative">
                                  <Image
                                    alt={product.name}
                                    fill
                                    sizes="40px"
                                    className="object-cover"
                                    src={product.image || "/images/products/custom-cake-boxes.jpg"}
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[12px] font-bold text-[#1a1a1a] truncate max-w-[220px] sm:max-w-[280px]">
                                    {product.name}
                                  </p>
                                  <p className="text-[10px] text-[#aaa6a0] font-medium truncate">
                                    /{product.slug}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-[12px_16px] text-[12px] font-semibold text-[#7a7672]">
                              {product.category}
                            </td>
                            <td className="p-[12px_16px] text-center">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-[4px] text-[9px] font-black uppercase tracking-wider ${
                                  product.is_active
                                    ? "bg-[#eaf2ed] text-[#2d5c3e]"
                                    : "bg-[#f0ede8] text-[#aaa6a0]"
                                }`}
                              >
                                {product.is_active ? "Active" : "Hidden"}
                              </span>
                            </td>
                            <td className="p-[12px_16px] text-center">
                              {product.is_trending ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#e8732a]">
                                  <Sparkles className="w-3 h-3" /> Yes
                                </span>
                              ) : (
                                <span className="text-[11px] text-[#d8d4cc]">—</span>
                              )}
                            </td>
                            <td className="p-[12px_16px]">
                              <p className="text-[11px] text-[#7a7672] whitespace-nowrap">
                                {product.created_at || "Aug 24, 2026"}
                              </p>
                            </td>
                            <td className="p-[12px_16px] text-right">
                              <div className="flex items-center justify-end gap-1.5 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                <Link
                                  target="_blank"
                                  href={`/product/${product.slug}`}
                                >
                                  <button
                                    type="button"
                                    className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-[#f5f3ee] transition-all cursor-pointer"
                                    title="View live product"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </button>
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => handleDuplicate(product)}
                                  title="Duplicate"
                                  className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-[#f5f3ee] transition-all cursor-pointer"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                                <Link href={`/admin/products/${product.slug}`}>
                                  <button
                                    type="button"
                                    className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-[#e8732a] hover:text-white hover:border-[#e8732a] transition-all cursor-pointer"
                                    title="Edit product"
                                  >
                                    <Pen className="w-3.5 h-3.5" />
                                  </button>
                                </Link>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(product.slug, product.name)
                                  }
                                  className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all cursor-pointer"
                                  title="Delete product"
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
                <div className="p-[12px_16px] flex items-center justify-between border-t border-[#e0ddd6]">
                  <p className="text-[11px] text-[#aaa6a0]">
                    Page <span className="font-bold text-[#1a1a1a]">{currentPage}</span> of{" "}
                    <span className="font-bold text-[#1a1a1a]">{totalPages}</span> ({filteredProducts.length} total)
                  </p>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-all"
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
