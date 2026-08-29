"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, ChevronDown, ChevronUp, X, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { fetchAllProducts, type CustomProductRecord } from "@/lib/product-service";
import { categories as defaultCategories } from "@/data/products";
import Layout from "@/components/Layout";
import PageLoader from "@/components/PageLoader";

const PAGE_SIZE = 12;

// ── Types ─────────────────────────────────────────────────────────────────────
interface Category {
  id: string;
  name: string;
  slug: string;
  section: "industry" | "material" | "style";
}

// ── Filter group ──────────────────────────────────────────────────────────────
function FilterGroup({
  label,
  categories,
  selected,
  onToggle,
}: {
  label: string;
  categories: Category[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-[#e0ddd6] pb-4 mb-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full font-sans text-[11px] tracking-[0.14em] uppercase text-[#1a1a1a] mb-3 cursor-pointer"
        style={{ fontWeight: 700 }}
      >
        {label}
        {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>
      {open && (
        <ul className="flex flex-col gap-1.5">
          {categories.map((cat) => {
            const active = selected.has(cat.id);
            return (
              <li key={cat.id}>
                <button
                  onClick={() => onToggle(cat.id)}
                  className="flex items-center gap-2 w-full text-left font-sans text-[12.5px] transition-colors cursor-pointer"
                  style={{ color: active ? "#e8732a" : "#4a4a4a" }}
                >
                  <span
                    className="flex-shrink-0 w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors"
                    style={{
                      borderColor: active ? "#e8732a" : "#c8c4bc",
                      background: active ? "#e8732a" : "transparent",
                    }}
                  >
                    {active && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1 4l2 2 4-4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {cat.name}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({
  industryCategories,
  materialCategories,
  styleCategories,
  selectedCategories,
  onToggle,
}: {
  industryCategories: Category[];
  materialCategories: Category[];
  styleCategories: Category[];
  selectedCategories: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <aside className="w-full">
      {industryCategories.length > 0 && (
        <FilterGroup
          label="Boxes by Industry"
          categories={industryCategories}
          selected={selectedCategories}
          onToggle={onToggle}
        />
      )}
      {materialCategories.length > 0 && (
        <FilterGroup
          label="Boxes by Material"
          categories={materialCategories}
          selected={selectedCategories}
          onToggle={onToggle}
        />
      )}
      {styleCategories.length > 0 && (
        <FilterGroup
          label="Boxes by Style"
          categories={styleCategories}
          selected={selectedCategories}
          onToggle={onToggle}
        />
      )}
    </aside>
  );
}

// ── Product card ──────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: CustomProductRecord }) {
  const img =
    product.image ||
    (product.images && product.images[0]) ||
    "/images/products/custom-cake-boxes.jpg";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group rounded-xl overflow-hidden border border-[#e0ddd6] bg-white hover:border-[#e8732a] transition-colors"
    >
      <div className="aspect-square bg-[#ece9e2] overflow-hidden relative">
        {img ? (
          <Image
            src={img}
            alt={product.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={40} className="text-[#aaa6a0] group-hover:text-[#e8732a] transition-colors duration-300" />
          </div>
        )}
      </div>
      <div className="p-3 text-center">
        <h3 className="font-sans text-[12px] font-medium text-[#1a1a1a] group-hover:text-[#e8732a] transition-colors leading-tight">
          {product.name}
        </h3>
        <span className="inline-block mt-1.5 font-sans text-[11px] font-medium text-[#e8732a] uppercase tracking-[0.08em]">
          Get a Quote →
        </span>
      </div>
    </Link>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────
function Pagination({
  page,
  total,
  pageSize,
  onChange,
}: {
  page: number;
  total: number;
  pageSize: number;
  onChange: (p: number) => void;
}) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const pages: (number | "…")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-10">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1.5 rounded-[6px] border border-[#e0ddd6] font-sans text-[12px] text-[#4a4a4a] disabled:opacity-40 hover:border-[#e8732a] hover:text-[#e8732a] transition-colors cursor-pointer"
      >
        ← Prev
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="px-2 font-sans text-[12px] text-[#aaa6a0]">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className="w-8 h-8 rounded-[6px] border font-sans text-[12px] transition-colors cursor-pointer"
            style={{
              borderColor: page === p ? "#e8732a" : "#e0ddd6",
              background: page === p ? "#e8732a" : "transparent",
              color: page === p ? "#fff" : "#4a4a4a",
            }}
          >
            {p}
          </button>
        )
      )}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1.5 rounded-[6px] border border-[#e0ddd6] font-sans text-[12px] text-[#4a4a4a] disabled:opacity-40 hover:border-[#e8732a] hover:text-[#e8732a] transition-colors cursor-pointer"
      >
        Next →
      </button>
    </div>
  );
}

// ── Main view ─────────────────────────────────────────────────────────────────
export default function CatalogView() {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const fallbackCategories: Category[] = useMemo(() => {
    return defaultCategories.map((c) => ({
      id: c.slug,
      name: c.name,
      slug: c.slug,
      section: (c.section as any) || "industry",
    }));
  }, []);

  const { data: categories = fallbackCategories } = useQuery<Category[]>({
    queryKey: ["public", "catalog-categories"],
    staleTime: 0,
    refetchOnMount: true,
    queryFn: async () => {
      try {
        const { fetchAllAdminCategories } = await import("@/lib/category-service");
        const list = await fetchAllAdminCategories();
        if (list && list.length > 0) {
          return list
            .filter((c) => c.is_active !== false)
            .map((c) => ({
              id: c.slug,
              name: c.name,
              slug: c.slug,
              section: c.section,
            }));
        }
      } catch {
        // ignore
      }
      return fallbackCategories;
    },
  });

  const { data: allProducts = [], isLoading } = useQuery<CustomProductRecord[]>({
    queryKey: ["public", "catalog-products"],
    staleTime: 0,
    refetchOnMount: true,
    queryFn: async () => {
      const items = await fetchAllProducts();
      return items.filter((p) => p.is_active !== false);
    },
  });

  const industryCategories = useMemo(() => categories.filter((c) => c.section === "industry"), [categories]);
  const materialCategories = useMemo(() => categories.filter((c) => c.section === "material"), [categories]);
  const styleCategories = useMemo(() => categories.filter((c) => c.section === "style"), [categories]);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories(new Set());
    setSearchQuery("");
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = allProducts;
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      list = list.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q))
        );
      });
    }

    if (selectedCategories.size === 0) return list;

    const selectedNames = new Set<string>();
    const selectedSlugs = new Set<string>();

    categories.forEach((c) => {
      if (selectedCategories.has(c.id)) {
        selectedNames.add(c.name.toLowerCase());
        selectedSlugs.add(c.slug.toLowerCase());
      }
    });

    return list.filter((p) => {
      if (selectedCategories.has(p.category_id || "") || selectedCategories.has(p.category)) {
        return true;
      }
      const pCat = (p.category || "").toLowerCase();
      const pSlug = (p.slug || "").toLowerCase();
      if (selectedNames.has(pCat) || selectedSlugs.has(pSlug)) {
        return true;
      }
      return false;
    });
  }, [allProducts, selectedCategories, categories, searchQuery]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeFilterLabels = categories.filter((c) => selectedCategories.has(c.id));

  const sidebarProps = {
    industryCategories,
    materialCategories,
    styleCategories,
    selectedCategories,
    onToggle: toggleCategory,
  };

  if (isLoading) return <PageLoader />;

  return (
    <Layout>
      {/* Page header */}
      <div className="bg-[#2d5c3e]" style={{ padding: "48px 40px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p className="font-sans text-[11px] text-white/50 mb-3">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span className="mx-1.5 text-white/30">/</span>
            <span className="text-white/70">Catalog</span>
          </p>
          <h1 className="font-sans text-[32px] font-bold text-white leading-tight">
            Our Packaging <span style={{ color: "#e8732a" }}>Catalog</span>
          </h1>
          <p className="font-sans text-[13px] text-white/65 mt-2">
            {allProducts.length > 0 ? `${allProducts.length} products` : "Browse all products"} — fully customizable, free design support
          </p>
        </div>
      </div>

      {/* Mobile filter toggle */}
      <div className="md:hidden border-b border-[#e0ddd6] bg-[#faf8f5] px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="font-sans text-[12px] font-medium text-[#1a1a1a] flex items-center gap-1.5 cursor-pointer"
        >
          Filters
          {selectedCategories.size > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#e8732a] text-white text-[10px] flex items-center justify-center font-bold">
              {selectedCategories.size}
            </span>
          )}
        </button>
        <span className="font-sans text-[11px] text-[#7a7672]">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </span>
      </div>

      {/* Mobile drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
          <div className="relative ml-auto w-[280px] bg-white h-full overflow-y-auto p-5 z-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#e0ddd6] mb-4">
                <span className="font-sans text-[13px] font-bold text-[#1a1a1a]">Filters</span>
                <button onClick={() => setMobileSidebarOpen(false)} className="text-[#aaa6a0] hover:text-[#1a1a1a]">
                  <X size={16} />
                </button>
              </div>
              <Sidebar {...sidebarProps} />
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="mt-6 w-full py-2.5 rounded-[8px] bg-[#e8732a] text-white font-sans text-[12px] font-semibold tracking-wider uppercase cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div className="bg-[#faf8f5] min-h-[600px]">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }} className="flex gap-10">
          {/* Desktop sidebar */}
          <div className="hidden md:block w-[220px] flex-shrink-0">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#e0ddd6]">
              <span className="font-sans text-[12px] font-bold tracking-wider uppercase text-[#1a1a1a]">Filters</span>
              {selectedCategories.size > 0 && (
                <button
                  onClick={clearFilters}
                  className="font-sans text-[11px] text-[#e8732a] hover:underline cursor-pointer"
                >
                  Reset all
                </button>
              )}
            </div>
            <Sidebar {...sidebarProps} />
          </div>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Active filter chips & count */}
            <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
              <span className="font-sans text-[12px] text-[#7a7672]">
                Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} products
              </span>
              {activeFilterLabels.length > 0 && (
                <div className="flex flex-wrap gap-1.5 items-center">
                  {activeFilterLabels.map((cat) => (
                    <span
                      key={cat.id}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fdf0e8] border border-[#f5c8a8] font-sans text-[11px] text-[#c45a18]"
                    >
                      {cat.name}
                      <button onClick={() => toggleCategory(cat.id)} className="hover:text-black cursor-pointer">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={clearFilters}
                    className="font-sans text-[11px] text-[#aaa6a0] hover:text-[#1a1a1a] ml-1 underline cursor-pointer"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Package size={48} className="text-[#c8c4bc] mb-3" />
                <p className="font-sans text-[14px] font-semibold text-[#1a1a1a] mb-1">No products found</p>
                <p className="font-sans text-[12px] text-[#7a7672] mb-4">Try clearing some filters to see more packaging options.</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-[8px] bg-[#e8732a] text-white font-sans text-[12px] font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginated.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination
              page={page}
              total={filtered.length}
              pageSize={PAGE_SIZE}
              onChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}