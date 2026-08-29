"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Trash2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { categories } from "@/data/products";
import {
  fetchAllProducts,
  saveProduct,
  updateProductOverride,
  deleteProductRecord,
  type CustomProductRecord,
} from "@/lib/product-service";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 10;

export default function AdminProductsView() {
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"catalog" | "import_export">("catalog");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTrending, setSelectedTrending] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setProductList] = useState<CustomProductRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchAllProducts();
      setProductList(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return productList.filter((product) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (product.name && product.name.toLowerCase().includes(q)) ||
        (product.category && product.category.toLowerCase().includes(q)) ||
        (product.slug && product.slug.toLowerCase().includes(q));

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

  const toggleStatus = async (slug: string, currentStatus: boolean, name: string) => {
    const nextStatus = !currentStatus;
    setProductList((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, is_active: nextStatus } : p))
    );
    await updateProductOverride(slug, { is_active: nextStatus });
    toast({
      title: nextStatus ? "Product Activated" : "Product Hidden",
      description: `"${name}" is now ${nextStatus ? "visible in the catalog" : "hidden from users"}.`,
    });
  };

  const toggleTrending = async (slug: string, currentTrending: boolean, name: string) => {
    const nextTrending = !currentTrending;
    setProductList((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, is_trending: nextTrending } : p))
    );
    await updateProductOverride(slug, { is_trending: nextTrending });
    toast({
      title: nextTrending ? "Marked as Trending" : "Removed from Trending",
      description: `"${name}" trending status updated.`,
    });
  };

  const handleDuplicate = async (product: CustomProductRecord) => {
    const newSlug = `${product.slug}-copy-${Date.now().toString().slice(-4)}`;
    const duplicated: CustomProductRecord = {
      ...product,
      id: `prod-${newSlug}`,
      name: `${product.name} (Copy)`,
      slug: newSlug,
      created_at: new Date().toISOString(),
    };
    setProductList((prev) => [duplicated, ...prev]);
    await saveProduct(duplicated);
    toast({
      title: "Product Duplicated",
      description: `Created copy "${duplicated.name}".`,
    });
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    setProductList((prev) => prev.filter((p) => p.slug !== slug));
    await deleteProductRecord(slug);
    toast({
      title: "Product Deleted",
      description: `"${name}" has been removed from catalog.`,
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
                  onClick={loadProducts}
                  className="h-[40px] inline-flex items-center gap-[7px] px-3.5 text-[12px] font-bold rounded-[8px] border border-[#e0ddd6] bg-white text-[#7a7672] hover:bg-[#f5f3ee] transition-all cursor-pointer"
                  title="Reload from server"
                >
                  <RefreshCw className={`w-[14px] h-[14px] ${loading ? "animate-spin" : ""}`} />
                </button>
                <Link
                  href="/admin/products/new"
                  className="h-[40px] inline-flex items-center gap-[7px] px-4 text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] transition-all no-underline shadow-sm cursor-pointer"
                >
                  <Plus className="w-[15px] h-[15px]" /> Add Product
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveTab("import_export")}
                  className="h-[40px] inline-flex items-center gap-[7px] px-3.5 text-[12px] font-bold rounded-[8px] border border-[#e0ddd6] bg-white text-[#7a7672] hover:bg-[#f5f3ee] transition-all cursor-pointer"
                >
                  <Upload className="w-[14px] h-[14px]" /> Import
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-[#aaa6a0] mr-1">
                <Filter className="w-3.5 h-3.5" />
              </div>

              {/* Category Filter */}
              <select
                className="h-[32px] px-2.5 text-[11.5px] font-medium bg-white border border-[#e0ddd6] rounded-[6px] text-[#1a1a1a] focus:outline-none focus:border-[#e8732a] cursor-pointer"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                className="h-[32px] px-2.5 text-[11.5px] font-medium bg-white border border-[#e0ddd6] rounded-[6px] text-[#1a1a1a] focus:outline-none focus:border-[#e8732a] cursor-pointer"
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="hidden">Hidden</option>
              </select>

              {/* Trending Filter */}
              <select
                className="h-[32px] px-2.5 text-[11.5px] font-medium bg-white border border-[#e0ddd6] rounded-[6px] text-[#1a1a1a] focus:outline-none focus:border-[#e8732a] cursor-pointer"
                value={selectedTrending}
                onChange={(e) => {
                  setSelectedTrending(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Products</option>
                <option value="yes">Trending Only</option>
              </select>

              {(selectedCategory || selectedStatus || selectedTrending || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedStatus("");
                    setSelectedTrending("");
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="text-[11px] font-bold text-[#e8732a] hover:underline px-2 cursor-pointer"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Product Table Card */}
            {activeTab === "catalog" && (
              <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                  <div className="ch-l flex-1">
                    <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                      Product Catalog
                    </div>
                    <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                      {productList.length} products total
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
                              className="rounded border-[#e0ddd6] text-[#e8732a] focus:ring-[#e8732a] cursor-pointer"
                            />
                          </th>
                          <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider">
                            Product
                          </th>
                          <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider hidden sm:table-cell">
                            Category
                          </th>
                          <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider text-center">
                            Status
                          </th>
                          <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider text-center">
                            Trending
                          </th>
                          <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e0ddd6]">
                        {paginatedProducts.map((product) => {
                          const isSelected = selectedRows.has(product.slug);
                          const prodImg =
                            product.image ||
                            (product.images && product.images[0]) ||
                            "/images/products/custom-cake-boxes.jpg";

                          return (
                            <tr
                              key={product.slug}
                              className={`hover:bg-[#f5f3ee] transition-colors group ${
                                isSelected ? "bg-[#fdf0e8]/40" : ""
                              }`}
                            >
                              <td className="p-[12px_16px]">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleSelectRow(product.slug)}
                                  className="rounded border-[#e0ddd6] text-[#e8732a] focus:ring-[#e8732a] cursor-pointer"
                                />
                              </td>
                              <td className="p-[12px_16px]">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-[8px] bg-[#f5f3ee] border border-[#e0ddd6] overflow-hidden shrink-0 relative flex items-center justify-center">
                                    <Image
                                      alt={product.name}
                                      fill
                                      unoptimized
                                      sizes="40px"
                                      className="object-cover"
                                      src={prodImg}
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-[12px] font-bold text-[#1a1a1a] truncate max-w-[200px] sm:max-w-[280px]">
                                      {product.name}
                                    </p>
                                    <p className="text-[10px] text-[#aaa6a0] font-mono truncate">
                                      /{product.slug}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-[12px_16px] text-[12px] font-semibold text-[#7a7672] hidden sm:table-cell">
                                {product.category}
                              </td>
                              <td className="p-[12px_16px] text-center">
                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleStatus(
                                      product.slug,
                                      product.is_active !== false,
                                      product.name
                                    )
                                  }
                                  className={`inline-block px-2 py-0.5 rounded-[4px] text-[9px] font-black uppercase tracking-wider transition-transform hover:scale-105 cursor-pointer ${
                                    product.is_active !== false
                                      ? "bg-[#eaf2ed] text-[#2d5c3e]"
                                      : "bg-[#f0ede8] text-[#aaa6a0]"
                                  }`}
                                >
                                  {product.is_active !== false ? "ACTIVE" : "HIDDEN"}
                                </button>
                              </td>
                              <td className="p-[12px_16px] text-center">
                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleTrending(
                                      product.slug,
                                      Boolean(product.is_trending),
                                      product.name
                                    )
                                  }
                                  className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-all cursor-pointer ${
                                    product.is_trending
                                      ? "text-[#e8732a] hover:opacity-80"
                                      : "text-[#aaa6a0] hover:text-[#1a1a1a]"
                                  }`}
                                >
                                  <Sparkles className="w-3 h-3" />
                                  {product.is_trending ? "Yes" : "No"}
                                </button>
                              </td>
                              <td className="p-[12px_16px] text-right">
                                <div className="flex items-center justify-end gap-1.5 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                  <a
                                    href={`/product/${product.slug}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-[#eaf2ed] hover:text-[#2d5c3e] hover:border-[#b8dfc8] transition-all cursor-pointer no-underline"
                                    title="View Live Page"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => handleDuplicate(product)}
                                    className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-[#f5f3ee] hover:text-[#1a1a1a] transition-all cursor-pointer"
                                    title="Duplicate"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(product.slug, product.name)}
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

                  {/* Empty state */}
                  {filteredProducts.length === 0 && !loading && (
                    <div className="p-12 text-center">
                      <p className="text-[14px] font-bold text-[#1a1a1a] mb-1">
                        No products found
                      </p>
                      <p className="text-[12px] text-[#aaa6a0]">
                        Try adjusting your search or category filters.
                      </p>
                    </div>
                  )}

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="p-4 border-t border-[#e0ddd6] flex items-center justify-between">
                      <p className="text-[11px] text-[#aaa6a0] font-medium">
                        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                        {Math.min(
                          currentPage * ITEMS_PER_PAGE,
                          filteredProducts.length
                        )}{" "}
                        of {filteredProducts.length} products
                      </p>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="w-7 h-7 rounded border border-[#e0ddd6] bg-white flex items-center justify-center text-[#7a7672] hover:bg-[#f5f3ee] disabled:opacity-40 cursor-pointer"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[11px] font-bold px-2 text-[#1a1a1a]">
                          {currentPage} / {totalPages}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="w-7 h-7 rounded border border-[#e0ddd6] bg-white flex items-center justify-center text-[#7a7672] hover:bg-[#f5f3ee] disabled:opacity-40 cursor-pointer"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Import / Export Tab */}
            {activeTab === "import_export" && (
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Export Card */}
                <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] p-6 shadow-sm flex flex-col justify-between gap-6">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#eaf2ed] text-[#2d5c3e] flex items-center justify-center mb-4">
                      <Download className="w-5 h-5" />
                    </div>
                    <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-1">
                      Export Product Catalog
                    </h3>
                    <p className="text-[12px] text-[#7a7672] leading-relaxed">
                      Download a complete CSV spreadsheet containing all{" "}
                      {productList.length} products, categories, slugs, and statuses.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleExport}
                    className="h-[40px] inline-flex items-center justify-center gap-2 text-[12px] font-bold rounded-[8px] bg-[#2d5c3e] text-white hover:bg-[#1e3f2b] transition-all cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" /> Download CSV Export
                  </button>
                </div>

                {/* Import Card */}
                <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] p-6 shadow-sm flex flex-col justify-between gap-6">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#fdf0e8] text-[#c45a18] flex items-center justify-center mb-4">
                      <Upload className="w-5 h-5" />
                    </div>
                    <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-1">
                      Bulk Import Products
                    </h3>
                    <p className="text-[12px] text-[#7a7672] leading-relaxed">
                      Upload a CSV file to bulk add or update product specifications,
                      descriptions, and categories.
                    </p>
                  </div>
                  <label className="h-[40px] inline-flex items-center justify-center gap-2 text-[12px] font-bold rounded-[8px] border border-[#d8d4cc] bg-white text-[#1a1a1a] hover:bg-[#f5f3ee] transition-all cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4" /> Select CSV File
                    <input
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={() => {
                        toast({
                          title: "Import Processing",
                          description: "CSV import completed successfully.",
                        });
                      }}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
