"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, ChevronDown, ChevronUp, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
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

interface Product {
  id: string;
  name: string;
  slug: string;
  images: string[] | null;
  category_id: string;
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
        className="flex items-center justify-between w-full font-sans text-[11px] tracking-[0.14em] uppercase text-[#1a1a1a] mb-3"
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
                  className="flex items-center gap-2 w-full text-left font-sans text-[12.5px] transition-colors"
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

// ── Sidebar — declared outside CatalogView to avoid re-creation on render ────
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
function ProductCard({ product }: { product: Product }) {
  const img = product.images?.[0] ?? null;
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
        className="px-3 py-1.5 rounded-[6px] border border-[#e0ddd6] font-sans text-[12px] text-[#4a4a4a] disabled:opacity-40 hover:border-[#e8732a] hover:text-[#e8732a] transition-colors"
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
            className="w-8 h-8 rounded-[6px] border font-sans text-[12px] transition-colors"
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
        className="px-3 py-1.5 rounded-[6px] border border-[#e0ddd6] font-sans text-[12px] text-[#4a4a4a] disabled:opacity-40 hover:border-[#e8732a] hover:text-[#e8732a] transition-colors"
      >
        Next →
      </button>
    </div>
  );
}

// ── Main view ─────────────────────────────────────────────────────────────────
export default function CatalogView() {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["public", "catalog-categories"],
    staleTime: Infinity,
    queryFn: async () => {
      const supabase = createPublicClient();
      const { data, error } = (await withAbortableTimeout(
        (signal) =>
          (supabase as any)
            .from("categories")
            .select("id, name, slug, section")
            .eq("is_active", true)
            .order("name")
            .abortSignal(signal),
      )) as any;
      if (error) throw error;
      return data || [];
    },
  });

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["public", "catalog-products"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const supabase = createPublicClient();
      const { data, error } = (await withAbortableTimeout(
        (signal) =>
          (supabase as any)
            .from("products")
            .select("id, name, slug, images, category_id")
            .eq("is_active", true)
            .order("name")
            .abortSignal(signal),
      )) as any;
      if (error) throw error;
      return data || [];
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
    setPage(1);
  };

  const filtered = useMemo(() => {
    if (selectedCategories.size === 0) return allProducts;
    return allProducts.filter((p) => selectedCategories.has(p.category_id));
  }, [allProducts, selectedCategories]);

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
      <div className="sm:hidden bg-white border-b border-[#e0ddd6] px-5 py-3 flex items-center justify-between">
        <span className="font-sans text-[12px] text-[#4a4a4a]">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          {selectedCategories.size > 0 && ` · ${selectedCategories.size} filter${selectedCategories.size > 1 ? "s" : ""}`}
        </span>
        <button
          onClick={() => setMobileSidebarOpen((v) => !v)}
          className="flex items-center gap-1.5 font-sans text-[12px] font-semibold text-[#e8732a]"
        >
          Filter {mobileSidebarOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Mobile sidebar drawer */}
      {mobileSidebarOpen && (
        <div className="sm:hidden bg-white border-b border-[#e0ddd6] px-5 py-5">
          <Sidebar {...sidebarProps} />
        </div>
      )}

      {/* Main layout */}
      <div className="bg-[#f5f3ee]" style={{ padding: "40px 40px 64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 32, alignItems: "flex-start" }}>

          {/* Desktop sidebar */}
          <div className="hidden sm:block flex-shrink-0" style={{ width: 210 }}>
            <div className="bg-white border border-[#e0ddd6] rounded-[10px] p-5 sticky top-[72px]">
              <p className="font-sans text-[11px] font-bold tracking-[0.14em] uppercase text-[#7a7672] mb-4">
                Filter Products
              </p>
              <Sidebar {...sidebarProps} />
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1 min-w-0">

            {/* Active filter chips */}
            {activeFilterLabels.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {activeFilterLabels.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => toggleCategory(c.id)}
                    className="flex items-center gap-2 font-sans text-[13px] font-medium text-[#e8732a] bg-[#fff0e8] border border-[#f5c8a8] rounded-full px-4 py-1.5 hover:bg-[#fde0cc] transition-colors"
                  >
                    {c.name} <X size={12} strokeWidth={2} />
                  </button>
                ))}
                <button
                  onClick={clearFilters}
                  className="font-sans text-[13px] text-[#7a7672] underline underline-offset-2 hover:text-[#e8732a] transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Result count */}
            <div className="flex items-center justify-between mb-5">
              <p className="font-sans text-[12.5px] text-[#7a7672]">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Package size={48} className="text-[#c8c4bc]" />
                <p className="font-sans text-[14px] text-[#7a7672]">No products match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="font-sans text-[12px] font-semibold text-[#e8732a] underline underline-offset-2"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Grid */}
            {paginated.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

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