"use client";

import { useState, useRef, useEffect, useId } from "react";
import { Search, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/products";

/** Strip characters that would break search patterns. */
function cleanPattern(raw: string) {
  return raw.trim().toLowerCase();
}

interface SearchBarProps {
  mode?: "icon" | "inline";
  onResultSelect?: () => void;
}

// Flat list of products for instant client-side search
const ALL_CATALOG_PRODUCTS = (categories || []).flatMap((cat) =>
  (cat?.products || []).map((p) => ({
    id: p.slug,
    name: p.name,
    slug: p.slug,
    category: cat.name,
    categorySlug: cat.slug,
  }))
);

const SearchBar = ({ mode = "icon", onResultSelect }: SearchBarProps) => {
  const isInline = mode === "inline";
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(isInline);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchProducts = () => {
      const q = cleanPattern(query);
      if (q.length <= 1) {
        setResults([]);
        setFetchError(null);
        return;
      }

      setLoading(true);
      setFetchError(null);

      // Instant client-side search across all products and categories
      const matched = ALL_CATALOG_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      ).slice(0, 8);

      setResults(matched);
      setLoading(false);
    };

    const timeoutId = setTimeout(searchProducts, 100);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (isInline) setIsOpen(true);
  }, [isInline]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isInline) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isInline]);

  return (
    <div ref={containerRef} className={`relative ${isInline ? "w-full" : ""}`}>
      {!isInline && (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-foreground/70 hover:text-foreground transition-colors"
          aria-label="Search products"
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <Search size={18} />
        </button>
      )}

      {(isInline || isOpen) && (
        <div
          id={panelId}
          role="search"
          className={
            isInline
              ? "w-full overflow-hidden rounded-xl border border-border bg-background"
              : "absolute top-full right-0 z-50 mt-2 w-[min(20rem,calc(100vw-1.5rem))] overflow-hidden rounded-xl border border-border bg-background shadow-xl animate-fade-in"
          }
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            {loading ? (
              <Loader2
                size={16}
                className="text-muted-foreground animate-spin shrink-0"
              />
            ) : (
              <Search size={16} className="text-muted-foreground shrink-0" />
            )}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-sans"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setResults([]);
                }}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
          {cleanPattern(query).length > 1 && (
            <div
              className={
                isInline
                  ? "max-h-[46vh] overflow-y-auto"
                  : "max-h-64 overflow-y-auto"
              }
            >
              {fetchError ? (
                <div className="px-4 py-6 text-center text-sm text-destructive font-sans">
                  {fetchError}
                </div>
              ) : !loading && results.length > 0 ? (
                results.map((r) => (
                  <Link
                    key={r.id}
                    href={`/product/${r.slug}`}
                    onClick={() => {
                      if (!isInline) setIsOpen(false);
                      setQuery("");
                      onResultSelect?.();
                    }}
                    className="block px-4 py-3 text-sm font-sans transition-colors hover:bg-accent/5"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {r.name}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        in {r.category}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                !loading && (
                  <div className="px-4 py-6 text-center text-sm font-sans text-muted-foreground">
                    No products found for &ldquo;{query.trim()}&rdquo;
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
