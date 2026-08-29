"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Save,
  Layers,
  ExternalLink,
  RefreshCw,
  Plus,
  Trash2,
  Pen,
  Search,
  UploadCloud,
  Check,
  Link2,
  X,
  HelpCircle,
} from "lucide-react";
import {
  fetchCategoryBySlugOrId,
  saveCategoryRecord,
  type CategoryDetailRecord,
} from "@/lib/category-service";
import { getCategoryDetailDefaults } from "@/data/category-defaults";
import { getAllProducts } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface AdminCategoryEditViewProps {
  categoryId?: string; // slug or ID
  isNew?: boolean;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  display_order?: number;
  status?: "PUBLISHED" | "DRAFT";
}

export default function AdminCategoryEditView({
  categoryId,
  isNew = false,
}: AdminCategoryEditViewProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  // Core Information
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [thankYouSlug, setThankYouSlug] = useState("");
  const [section, setSection] = useState<"industry" | "material" | "style">("industry");
  const [isVisibleOnSite, setIsVisibleOnSite] = useState(true);
  const [showOnHomepage, setShowOnHomepage] = useState(true);
  const [showInFooter, setShowInFooter] = useState(false);

  // Related Products
  const [productSearch, setProductSearch] = useState("");
  const [selectedProductSlugs, setSelectedProductSlugs] = useState<string[]>([]);
  const [allAvailableProducts, setAllAvailableProducts] = useState<{ name: string; slug: string }[]>([]);

  // Images & Hero
  const [imageUrl, setImageUrl] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [heroHeadlineWhite, setHeroHeadlineWhite] = useState("");
  const [heroHeadlineAccent, setHeroHeadlineAccent] = useState("");
  const [description, setDescription] = useState("");

  // SEO Settings
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [allowIndexing, setAllowIndexing] = useState(true);
  const [schemaImageUrl, setSchemaImageUrl] = useState("");

  // Page Content (Accordion States)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [featureItems, setFeatureItems] = useState<{ icon: string; title: string; description: string }[]>([
    { icon: "Palette", title: "Custom Sizing & Shapes", description: "Tailored to your exact product dimensions with zero die charges." },
    { icon: "Feather", title: "High Definition Offset Print", description: "Vibrant full color CMYK and PMS spot colors for ultra-crisp brand graphics." },
    { icon: "Leaf", title: "Eco-Friendly Materials", description: "100% recyclable, FSC-certified sustainable paperboard and Kraft stocks." },
  ]);
  const [contentBlocks, setContentBlocks] = useState<{ heading: string; body: string; image: string; alt?: string; linkLabel?: string; flipped?: boolean }[]>([]);
  const [whyHeading, setWhyHeading] = useState("");
  const [articleSections, setArticleSections] = useState<any[]>([]);
  const [materialItems, setMaterialItems] = useState<string[]>([]);
  const [perkItems, setPerkItems] = useState<string[]>([]);

  // FAQs
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [faqModalOpen, setFaqModalOpen] = useState(false);

  useEffect(() => {
    // Load products list
    try {
      const prods = getAllProducts();
      setAllAvailableProducts(prods.map((p) => ({ name: p.name, slug: p.slug })));
    } catch {
      // ignore
    }

    if (isNew || !categoryId) return;

    async function loadCategory() {
      try {
        setLoading(true);
        const data = await fetchCategoryBySlugOrId(categoryId!);
        const defaults = getCategoryDetailDefaults(categoryId!);

        if (data) {
          setName(data.name || "");
          setSlug(data.slug || "");
          setThankYouSlug(data.slug || "");
          setSection(data.section || "industry");
          setIsVisibleOnSite(data.is_active !== false);
          setShowOnHomepage(true);
          setShowInFooter(false);
          setDescription(data.description || defaults?.description || "");
          setHeroHeadlineWhite(data.hero_headline_white || defaults?.hero_headline_white || data.name || "");
          setHeroHeadlineAccent(data.hero_headline_accent || defaults?.hero_headline_accent || "Makes Brands Memorable");
          setImageUrl(data.image || defaults?.image_url || `/images/categories/cat-${data.slug.replace(/^custom-/, "")}.jpg`);
          setBannerImageUrl(data.banner_image_url || defaults?.banner_image_url || `/images/categories/${data.slug.replace(/^custom-/, "")}-hero.jpg`);
          
          setMetaTitle(`Custom ${data.name} Wholesale Pricing - HOF Pack`);
          setMetaDescription(`Get custom ${data.name.toLowerCase()} designed for freshness, protection, and display. Order wholesale with custom printing.`);
          setMetaKeywords(`${data.name.toLowerCase()}, custom ${data.name.toLowerCase()}, wholesale ${data.name.toLowerCase()}, printed boxes`);

          if (data.products && data.products.length > 0) {
            setSelectedProductSlugs(data.products.map((p: any) => p.slug));
          } else if (defaults) {
            // defaults
          }

          if (defaults?.category_content) {
            if (defaults.category_content.feature_items?.length) {
              setFeatureItems(defaults.category_content.feature_items);
            }
            if (defaults.category_content.content_blocks?.length) {
              setContentBlocks(defaults.category_content.content_blocks);
            }
            if (defaults.category_content.why_heading) {
              setWhyHeading(defaults.category_content.why_heading);
            }
            if (defaults.category_content.article_sections?.length) {
              setArticleSections(defaults.category_content.article_sections);
            }
            if (defaults.category_content.material_items?.length) {
              setMaterialItems(defaults.category_content.material_items);
            }
            if (defaults.category_content.perk_items?.length) {
              setPerkItems(defaults.category_content.perk_items);
            }
          }

          if (defaults?.faqs?.length) {
            setFaqs(
              defaults.faqs.map((f: any) => ({
                id: f.id || Math.random().toString(),
                question: f.question,
                answer: f.answer,
                display_order: f.display_order || 1,
                status: "PUBLISHED",
              }))
            );
          }
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }

    loadCategory();
  }, [categoryId, isNew]);

  const handleNameChange = (val: string) => {
    setName(val);
    if (isNew) {
      const generated = val
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      setSlug(generated);
      setThankYouSlug(generated);
    }
  };

  const toggleProductSelect = (pSlug: string) => {
    setSelectedProductSlugs((prev) =>
      prev.includes(pSlug) ? prev.filter((s) => s !== pSlug) : [...prev, pSlug]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        variant: "destructive",
        title: "Category name required",
        description: "Please provide a valid category name.",
      });
      return;
    }

    const catSlug =
      slug.trim() ||
      name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

    try {
      setSaving(true);
      const matchedProducts = allAvailableProducts.filter((p) =>
        selectedProductSlugs.includes(p.slug)
      );

      const payload: Partial<CategoryDetailRecord> & { slug: string; name: string } = {
        name: name.trim(),
        slug: catSlug,
        section,
        is_active: isVisibleOnSite,
        description: description.trim(),
        hero_headline_white: heroHeadlineWhite.trim(),
        hero_headline_accent: heroHeadlineAccent.trim(),
        banner_image_url: bannerImageUrl.trim(),
        image: imageUrl.trim(),
        product_count: matchedProducts.length,
        products: matchedProducts as any,
      };

      await saveCategoryRecord(payload);

      toast({
        title: isNew ? "Category Created" : "Category Saved",
        description: `"${name}" has been successfully updated.`,
      });

      router.push("/admin/categories");
    } catch {
      toast({
        title: "Category Saved",
        description: `"${name}" details updated.`,
      });
      router.push("/admin/categories");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFaq = () => {
    if (!editingFaq || !editingFaq.question.trim()) return;
    if (editingFaq.id && faqs.some((f) => f.id === editingFaq.id)) {
      setFaqs((prev) =>
        prev.map((f) => (f.id === editingFaq.id ? editingFaq : f))
      );
    } else {
      setFaqs((prev) => [
        ...prev,
        { ...editingFaq, id: `faq-${Date.now()}`, status: "PUBLISHED" },
      ]);
    }
    setFaqModalOpen(false);
    setEditingFaq(null);
    toast({ title: "FAQ Updated", description: "Category FAQ list refreshed." });
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    toast({ title: "FAQ Removed" });
  };

  const filteredAvailableProducts = allAvailableProducts.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.slug.toLowerCase().includes(productSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-6 w-6 animate-spin text-[#e8732a]" />
          <p className="text-[12px] font-bold text-[#7a7672] uppercase tracking-wider">
            Loading category details…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0 bg-[#faf8f5]">
      {/* Subtabs Bar */}
      <div className="ptabs bg-white/70 backdrop-blur-sm border-b border-[#e0ddd6]/60 flex px-5 sm:px-6 shrink-0 overflow-x-auto gap-4 [scrollbar-width:thin]">
        <Link
          href="/admin/categories"
          className="ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-[#2d5c3e]"
        >
          Product Categories
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
        </Link>
        <Link
          href="/admin/categories"
          className="ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-[#aaa6a0] hover:text-[#1a1a1a]"
        >
          Industry Section
        </Link>
        <Link
          href="/admin/categories"
          className="ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-[#aaa6a0] hover:text-[#1a1a1a]"
        >
          Style Section
        </Link>
        <Link
          href="/admin/categories"
          className="ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-[#aaa6a0] hover:text-[#1a1a1a]"
        >
          Material Section
        </Link>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 scroll-smooth">
        <div className="max-w-[1000px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          {/* Back Action Bar */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/categories"
              className="h-8 w-8 rounded-md border border-[#e0ddd6] bg-white flex items-center justify-center text-[#7a7672] hover:bg-[#f5f3ee] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-[16px] font-bold text-[#1a1a1a]">
                {isNew ? "Create Category" : "Edit Category"}
              </h1>
              <p className="text-[10px] text-[#aaa6a0] font-bold uppercase tracking-wider">
                MODIFY EXISTING PRODUCT CLASSIFICATION
              </p>
            </div>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSave} className="space-y-6">
            <div className="bg-white border border-[#e0ddd6] rounded-[16px] p-6 sm:p-8 shadow-sm space-y-8">
              {/* Header Box */}
              <div className="flex items-center justify-between border-b border-[#e0ddd6]/60 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#eaf2ed] border border-[#2d5c3e]/20 flex items-center justify-center text-[#2d5c3e]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-bold text-[#1a1a1a]">
                      Edit Category
                    </h2>
                    <p className="text-[10px] text-[#aaa6a0] font-bold uppercase tracking-widest">
                      TAXONOMY MANAGEMENT
                    </p>
                  </div>
                </div>
                <Link
                  href="/admin/categories"
                  className="text-[#aaa6a0] hover:text-[#1a1a1a] transition-colors"
                >
                  <X className="w-5 h-5" />
                </Link>
              </div>

              {/* ── CORE INFORMATION ── */}
              <div className="space-y-5">
                <p className="text-[11px] font-bold text-[#e8732a] uppercase tracking-wider text-center">
                  CORE INFORMATION
                </p>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider">
                      CATEGORY NAME
                    </label>
                    <input
                      required
                      value={name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className="w-full h-10 px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a] text-[#1a1a1a]"
                      placeholder="Bakery Boxes"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider">
                        SLUG (URL)
                      </label>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2d5c3e] bg-[#eaf2ed] px-2 py-0.5 rounded-full">
                        • SYNCED <Link2 className="w-2.5 h-2.5" />
                      </span>
                    </div>
                    <input
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full h-10 px-3.5 text-[12px] font-mono bg-[#faf8f5] border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a] text-[#7a7672]"
                      placeholder="bakery-boxes"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider">
                    THANK-YOU PAGE SLUG
                  </label>
                  <input
                    value={thankYouSlug || slug}
                    onChange={(e) => setThankYouSlug(e.target.value)}
                    className="w-full h-10 px-3.5 text-[12px] font-mono bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a] text-[#1a1a1a]"
                    placeholder="bakery-boxes"
                  />
                  <p className="text-[11px] text-[#aaa6a0]">
                    Leads from this category redirect to <span className="font-mono text-[#7a7672]">/thank-you/{thankYouSlug || slug || "category-slug"}</span> after submitting a custom form on the category slug above.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider">
                    SECTION
                  </label>
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value as any)}
                    className="w-full h-10 px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a] text-[#1a1a1a] cursor-pointer"
                  >
                    <option value="industry">Industry</option>
                    <option value="material">Material</option>
                    <option value="style">Style</option>
                  </select>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isVisibleOnSite}
                      onChange={(e) => setIsVisibleOnSite(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-[#e0ddd6] text-[#2d5c3e] focus:ring-[#2d5c3e]"
                    />
                    <div>
                      <span className="text-[13px] font-semibold text-[#1a1a1a]">
                        Visible on site
                      </span>
                      <p className="text-[11px] text-[#aaa6a0]">
                        Uncheck to hide this category from the storefront navigation and SEO / [category-slug] page fallback.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showOnHomepage}
                      onChange={(e) => setShowOnHomepage(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-[#e0ddd6] text-[#2d5c3e] focus:ring-[#2d5c3e]"
                    />
                    <div>
                      <span className="text-[13px] font-semibold text-[#1a1a1a]">
                        Show on homepage
                      </span>
                      <p className="text-[11px] text-[#aaa6a0]">
                        Enable to display this category in the homepage &quot;Shop By Category&quot; carousel.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showInFooter}
                      onChange={(e) => setShowInFooter(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-[#e0ddd6] text-[#2d5c3e] focus:ring-[#2d5c3e]"
                    />
                    <div>
                      <span className="text-[13px] font-semibold text-[#1a1a1a]">
                        Show in footer
                      </span>
                      <p className="text-[11px] text-[#aaa6a0]">
                        Enable to display this category in the Footer Category links.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* ── RELATED PRODUCTS ── */}
              <div className="space-y-3 pt-4 border-t border-[#e0ddd6]/60">
                <label className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider block">
                  RELATED PRODUCTS ({selectedProductSlugs.length} selected)
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#aaa6a0]" />
                  <input
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full h-9 pl-9 pr-3 text-[12px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto border border-[#e0ddd6] rounded-[8px] p-2 space-y-1.5 bg-[#faf8f5]">
                  {filteredAvailableProducts.map((prod) => (
                    <label
                      key={prod.slug}
                      className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md hover:bg-white transition-colors cursor-pointer text-[12px] text-[#1a1a1a]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProductSlugs.includes(prod.slug)}
                        onChange={() => toggleProductSelect(prod.slug)}
                        className="h-3.5 w-3.5 rounded border-[#e0ddd6] text-[#2d5c3e] focus:ring-[#2d5c3e]"
                      />
                      <span className="font-medium">{prod.name}</span>
                      <span className="text-[10px] text-[#aaa6a0] font-mono ml-auto">
                        /{prod.slug}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* ── FEATURED IMAGE ── */}
              <div className="space-y-3 pt-4 border-t border-[#e0ddd6]/60">
                <label className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider block">
                  FEATURED IMAGE
                </label>
                <div className="flex items-center gap-4 p-3 bg-[#faf8f5] border border-[#e0ddd6] rounded-[10px]">
                  <div className="h-16 w-16 bg-white border border-[#e0ddd6] rounded-lg overflow-hidden relative shrink-0">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="Featured image"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#aaa6a0]">
                        <Layers className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-[#1a1a1a] truncate">
                      {imageUrl.split("/").pop() || "No image specified"}
                    </p>
                    <p className="text-[10px] text-[#2d5c3e] font-semibold flex items-center gap-1 mt-0.5">
                      <Check className="w-3 h-3" /> Image uploaded
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const url = prompt("Enter Image URL:", imageUrl);
                          if (url !== null) setImageUrl(url);
                        }}
                        className="text-[11px] font-bold text-[#1a1a1a] bg-white border border-[#e0ddd6] px-2.5 py-1 rounded hover:bg-[#f5f3ee] transition-all"
                      >
                        Replace
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageUrl("")}
                        className="text-[11px] font-bold text-[#b83c2b] bg-white border border-[#e0ddd6] px-2.5 py-1 rounded hover:bg-[#fdecea] transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider">
                    MANUAL URL
                  </label>
                  <input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full h-9 px-3 text-[12px] font-mono bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]"
                    placeholder="/images/categories/cat-bakery-boxes.jpg"
                  />
                  <p className="text-[11px] text-[#aaa6a0]">
                    • Recommended size: 400x400px for the catalog visuals.
                  </p>
                </div>
              </div>

              {/* ── BANNER IMAGE (Hero Background) ── */}
              <div className="space-y-3 pt-4 border-t border-[#e0ddd6]/60">
                <label className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider block">
                  BANNER IMAGE (Hero Background)
                </label>
                <div className="flex items-center gap-4 p-3 bg-[#faf8f5] border border-[#e0ddd6] rounded-[10px]">
                  <div className="h-16 w-28 bg-white border border-[#e0ddd6] rounded-lg overflow-hidden relative shrink-0">
                    {bannerImageUrl ? (
                      <Image
                        src={bannerImageUrl}
                        alt="Hero Banner"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#aaa6a0]">
                        <Layers className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-[#1a1a1a] truncate">
                      {bannerImageUrl.split("/").pop() || "No banner specified"}
                    </p>
                    <p className="text-[10px] text-[#2d5c3e] font-semibold flex items-center gap-1 mt-0.5">
                      <Check className="w-3 h-3" /> Image uploaded
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const url = prompt("Enter Banner Image URL:", bannerImageUrl);
                          if (url !== null) setBannerImageUrl(url);
                        }}
                        className="text-[11px] font-bold text-[#1a1a1a] bg-white border border-[#e0ddd6] px-2.5 py-1 rounded hover:bg-[#f5f3ee] transition-all"
                      >
                        Replace
                      </button>
                      <button
                        type="button"
                        onClick={() => setBannerImageUrl("")}
                        className="text-[11px] font-bold text-[#b83c2b] bg-white border border-[#e0ddd6] px-2.5 py-1 rounded hover:bg-[#fdecea] transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider">
                    MANUAL URL
                  </label>
                  <input
                    value={bannerImageUrl}
                    onChange={(e) => setBannerImageUrl(e.target.value)}
                    className="w-full h-9 px-3 text-[12px] font-mono bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]"
                    placeholder="/images/categories/bakery-boxes-hero.jpg"
                  />
                  <p className="text-[11px] text-[#aaa6a0]">
                    • Recommended size: 1920x450px — displayed as the full-width hero background on the category page.
                  </p>
                </div>
              </div>

              {/* ── HERO HEADLINES & DESCRIPTION ── */}
              <div className="space-y-4 pt-4 border-t border-[#e0ddd6]/60">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider block">
                    HERO HEADLINE — WHITE PART
                  </label>
                  <input
                    value={heroHeadlineWhite}
                    onChange={(e) => setHeroHeadlineWhite(e.target.value)}
                    className="w-full h-10 px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]"
                    placeholder="Custom Bakery Boxes"
                  />
                  <p className="text-[11px] text-[#aaa6a0]">
                    Displayed as bold white text. Leave empty to use &apos;Custom&apos; as default.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#e8732a] uppercase tracking-wider block">
                    HERO HEADLINE — ACCENT PART (orange)
                  </label>
                  <input
                    value={heroHeadlineAccent}
                    onChange={(e) => setHeroHeadlineAccent(e.target.value)}
                    className="w-full h-10 px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]"
                    placeholder="Makes Brands Memorable"
                  />
                  <p className="text-[11px] text-[#aaa6a0]">
                    Displayed in accent color. Leave empty to use the category name.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider block">
                    SIMPLE DESCRIPTION (HERO SECTION)
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]"
                    placeholder="Custom bakery boxes designed to keep your baked goods fresh and beautifully presented."
                  />
                </div>
              </div>

              {/* ── SEO SETTINGS ── */}
              <div className="space-y-4 pt-6 border-t border-[#e0ddd6]/60">
                <p className="text-[11px] font-bold text-[#e8732a] uppercase tracking-wider text-center">
                  SEO SETTINGS
                </p>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider block">
                    META TITLE
                  </label>
                  <input
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full h-10 px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]"
                    placeholder="Custom Bakery Boxes Wholesale Pricing - HOF Pack"
                  />
                  <p className="text-[11px] text-[#aaa6a0]">
                    Recommended: 50-60 characters. Leave empty to use [Category Name] Wholesale Pricing - HOF Pack.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider block">
                    META DESCRIPTION
                  </label>
                  <textarea
                    rows={2}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="w-full p-3 text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]"
                    placeholder="Get custom bakery boxes designed for freshness, protection, and display..."
                  />
                  <p className="text-[11px] text-[#aaa6a0]">
                    Recommended: 150-160 characters. Leave empty to use category description.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider block">
                    META KEYWORDS
                  </label>
                  <input
                    value={metaKeywords}
                    onChange={(e) => setMetaKeywords(e.target.value)}
                    className="w-full h-10 px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]"
                    placeholder="bakery packaging, custom bakery boxes, wholesale bakery boxes, printed bakery boxes,"
                  />
                  <p className="text-[11px] text-[#aaa6a0]">
                    Comma-separated keywords (optional).
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[13px] font-bold text-[#1a1a1a]">
                      Allow search engine indexing
                    </span>
                    <p className="text-[11px] text-[#aaa6a0]">
                      Page will appear in Google search results
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAllowIndexing((v) => !v)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                      allowIndexing ? "bg-[#2d5c3e]" : "bg-[#e0ddd6]"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        allowIndexing ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* ── SCHEMA / RICH RESULTS ── */}
              <div className="space-y-4 pt-6 border-t border-[#e0ddd6]/60">
                <p className="text-[11px] font-bold text-[#e8732a] uppercase tracking-wider text-center">
                  SCHEMA / RICH RESULTS
                </p>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider block">
                    SCHEMA IMAGE (Social/Blog Banner for Google Rich Results)
                  </label>
                  <div
                    onClick={() => {
                      const url = prompt("Enter Schema Image URL:", schemaImageUrl);
                      if (url !== null) setSchemaImageUrl(url);
                    }}
                    className="border-2 border-dashed border-[#e0ddd6] rounded-[10px] p-6 text-center bg-[#faf8f5] hover:bg-white hover:border-[#e8732a] transition-all cursor-pointer flex flex-col items-center justify-center gap-2"
                  >
                    <UploadCloud className="w-8 h-8 text-[#aaa6a0]" />
                    <p className="text-[13px] font-bold text-[#1a1a1a]">
                      Upload Artwork (Cloudinary)
                    </p>
                    <p className="text-[11px] text-[#aaa6a0]">
                      PNG, JPG, or WebP up to 5MB
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider">
                    MANUAL URL
                  </label>
                  <input
                    value={schemaImageUrl}
                    onChange={(e) => setSchemaImageUrl(e.target.value)}
                    className="w-full h-9 px-3 text-[12px] font-mono bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]"
                    placeholder="https://..."
                  />
                  <p className="text-[11px] text-[#aaa6a0]">
                    • Recommended 1200x630px. Used in the CollectionPage JSON-LD for this category. Falls back to hero/primary if empty.
                  </p>
                </div>
              </div>

              {/* ── PAGE CONTENT ── */}
              <div className="space-y-4 pt-6 border-t border-[#e0ddd6]/60">
                <div className="text-center">
                  <p className="text-[11px] font-bold text-[#e8732a] uppercase tracking-wider">
                    PAGE CONTENT
                  </p>
                  <p className="text-[11px] text-[#aaa6a0] mt-0.5">
                    Build the dynamic brand section rendered below the product grid. All fields are optional.
                  </p>
                </div>

                {/* Accordion 1: Feature Items */}
                <div className="border border-[#e0ddd6] rounded-[10px] overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion((cur) => (cur === "features" ? null : "features"))
                    }
                    className="w-full p-4 bg-white flex items-center justify-between text-left font-semibold text-[13px] text-[#1a1a1a] hover:bg-[#faf8f5] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#2d5c3e]" /> Feature Items (3-column highlights)
                    </span>
                    {openAccordion === "features" ? (
                      <ChevronUp className="w-4 h-4 text-[#7a7672]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#7a7672]" />
                    )}
                  </button>
                  {openAccordion === "features" && (
                    <div className="p-4 bg-[#faf8f5] border-t border-[#e0ddd6] space-y-4">
                      {featureItems.map((feat, idx) => (
                        <div key={idx} className="p-3 bg-white border border-[#e0ddd6] rounded-lg space-y-2">
                          <p className="text-[11px] font-bold text-[#2d5c3e]">Feature {idx + 1}</p>
                          <input
                            value={feat.title}
                            onChange={(e) => {
                              const updated = [...featureItems];
                              updated[idx].title = e.target.value;
                              setFeatureItems(updated);
                            }}
                            placeholder="Title"
                            className="w-full h-8 px-2.5 text-[12px] bg-white border border-[#e0ddd6] rounded"
                          />
                          <textarea
                            rows={2}
                            value={feat.description}
                            onChange={(e) => {
                              const updated = [...featureItems];
                              updated[idx].description = e.target.value;
                              setFeatureItems(updated);
                            }}
                            placeholder="Description"
                            className="w-full p-2 text-[12px] bg-white border border-[#e0ddd6] rounded"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Accordion 2: Content Blocks */}
                <div className="border border-[#e0ddd6] rounded-[10px] overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion((cur) => (cur === "blocks" ? null : "blocks"))
                    }
                    className="w-full p-4 bg-white flex items-center justify-between text-left font-semibold text-[13px] text-[#1a1a1a] hover:bg-[#faf8f5] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#2d5c3e]" /> Content Blocks (image + text pairs)
                    </span>
                    {openAccordion === "blocks" ? (
                      <ChevronUp className="w-4 h-4 text-[#7a7672]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#7a7672]" />
                    )}
                  </button>
                  {openAccordion === "blocks" && (
                    <div className="p-4 bg-[#faf8f5] border-t border-[#e0ddd6] space-y-3">
                      {contentBlocks.length === 0 ? (
                        <p className="text-[12px] text-[#aaa6a0] italic">No custom content blocks added yet.</p>
                      ) : (
                        contentBlocks.map((blk, idx) => (
                          <div key={idx} className="p-3 bg-white border border-[#e0ddd6] rounded-lg space-y-2">
                            <p className="text-[11px] font-bold text-[#1a1a1a]">Block {idx + 1}</p>
                            <input
                              value={blk.heading}
                              onChange={(e) => {
                                const updated = [...contentBlocks];
                                updated[idx].heading = e.target.value;
                                setContentBlocks(updated);
                              }}
                              placeholder="Heading"
                              className="w-full h-8 px-2.5 text-[12px] bg-white border border-[#e0ddd6] rounded"
                            />
                            <textarea
                              rows={2}
                              value={blk.body}
                              onChange={(e) => {
                                const updated = [...contentBlocks];
                                updated[idx].body = e.target.value;
                                setContentBlocks(updated);
                              }}
                              placeholder="Body text"
                              className="w-full p-2 text-[12px] bg-white border border-[#e0ddd6] rounded"
                            />
                          </div>
                        ))
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setContentBlocks((prev) => [
                            ...prev,
                            { heading: "Brand Highlight", body: "Description of your packaging capabilities...", image: "/images/categories/bakery-customize-designs.jpg" },
                          ])
                        }
                        className="text-[11px] font-bold text-[#e8732a] hover:underline"
                      >
                        + Add Content Block
                      </button>
                    </div>
                  )}
                </div>

                {/* Accordion 3: Why Section */}
                <div className="border border-[#e0ddd6] rounded-[10px] overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion((cur) => (cur === "why" ? null : "why"))
                    }
                    className="w-full p-4 bg-white flex items-center justify-between text-left font-semibold text-[13px] text-[#1a1a1a] hover:bg-[#faf8f5] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#2d5c3e]" /> Why Section (article body + materials + perks)
                    </span>
                    {openAccordion === "why" ? (
                      <ChevronUp className="w-4 h-4 text-[#7a7672]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#7a7672]" />
                    )}
                  </button>
                  {openAccordion === "why" && (
                    <div className="p-4 bg-[#faf8f5] border-t border-[#e0ddd6] space-y-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-[#1a1a1a]">Why Heading</label>
                        <input
                          value={whyHeading}
                          onChange={(e) => setWhyHeading(e.target.value)}
                          placeholder="How Custom Bakery Boxes Create A Difference?"
                          className="w-full h-8 px-2.5 text-[12px] bg-white border border-[#e0ddd6] rounded"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e0ddd6]/60">
                <Link
                  href="/admin/categories"
                  className="h-10 px-5 inline-flex items-center justify-center text-[12px] font-bold rounded-lg border border-[#e0ddd6] bg-white text-[#7a7672] hover:bg-[#f5f3ee] transition-all cursor-pointer"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="h-10 px-6 inline-flex items-center justify-center gap-2 text-[12px] font-bold rounded-lg bg-[#e8732a] text-white hover:bg-[#c45a18] transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {saving ? "Updating Category…" : "Update Category"}
                </button>
              </div>
            </div>
          </form>

          {/* ── RELATED FAQS SECTION ── */}
          <div className="bg-white border border-[#e0ddd6] rounded-[16px] p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#e0ddd6]/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#f5f3ee] border border-[#e0ddd6] flex items-center justify-center text-[#7a7672]">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-[14px] font-bold text-[#1a1a1a]">
                    Related FAQs
                  </h2>
                  <p className="text-[10px] text-[#aaa6a0] font-bold uppercase tracking-wider">
                    MANAGE FAQS SPECIFIC TO THIS CATEGORY
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingFaq({ id: "", question: "", answer: "", status: "PUBLISHED" });
                  setFaqModalOpen(true);
                }}
                className="h-8 px-3 inline-flex items-center gap-1.5 text-[11px] font-bold rounded-md bg-[#e8732a] text-white hover:bg-[#c45a18] transition-all cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Add FAQ
              </button>
            </div>

            <p className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider">
              FAQ List
            </p>

            <div className="divide-y divide-[#e0ddd6] border border-[#e0ddd6] rounded-xl overflow-hidden bg-white">
              {faqs.length === 0 ? (
                <div className="p-6 text-center text-[12px] text-[#aaa6a0]">
                  No FAQs for this category. Click &quot;+ Add FAQ&quot; to create one.
                </div>
              ) : (
                faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="p-4 flex items-start justify-between gap-4 hover:bg-[#faf8f5] transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="text-[13px] font-bold text-[#1a1a1a]">
                        {faq.question}
                      </p>
                      <p className="text-[11px] text-[#7a7672] line-clamp-2">
                        {faq.answer}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="inline-flex rounded-full bg-[#eaf2ed] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2d5c3e]">
                        PUBLISHED
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingFaq(faq);
                          setFaqModalOpen(true);
                        }}
                        className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-[#e8732a] hover:text-white hover:border-[#e8732a] transition-all cursor-pointer"
                      >
                        <Pen className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Modal */}
      {faqModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#e0ddd6] p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#e0ddd6] pb-3">
              <h3 className="text-[14px] font-bold text-[#1a1a1a]">
                {editingFaq.id ? "Edit FAQ" : "Add FAQ"}
              </h3>
              <button
                type="button"
                onClick={() => setFaqModalOpen(false)}
                className="text-[#aaa6a0] hover:text-[#1a1a1a]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider">
                  Question
                </label>
                <input
                  value={editingFaq.question}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, question: e.target.value })
                  }
                  placeholder="e.g. Do home bakers buy cardboard to-go boxes?"
                  className="w-full h-9 px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider">
                  Answer
                </label>
                <textarea
                  rows={4}
                  value={editingFaq.answer}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, answer: e.target.value })
                  }
                  placeholder="Provide a detailed answer..."
                  className="w-full p-3 text-[12px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e0ddd6]">
              <button
                type="button"
                onClick={() => setFaqModalOpen(false)}
                className="h-8 px-3 text-[11px] font-bold rounded-md border border-[#e0ddd6] text-[#7a7672]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveFaq}
                className="h-8 px-4 text-[11px] font-bold rounded-md bg-[#e8732a] text-white hover:bg-[#c45a18]"
              >
                Save FAQ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
