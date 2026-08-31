"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, Check } from "lucide-react";
import { saveFaqRecord } from "@/lib/faq-service";
import { BASE_CATEGORIES } from "@/lib/category-service";

const PAGE_OPTIONS = [
  { slug: "home", name: "Home Page (/)" },
  { slug: "product-detail-pages", name: "Product Detail Pages (/product/*)" },
  { slug: "process", name: "Process Page (/process)" },
  { slug: "about", name: "About Page (/about)" },
  { slug: "artwork-guidelines", name: "Artwork Guidelines (/artwork-guidelines)" },
  { slug: "contact", name: "Contact Page (/contact)" },
];

function NewFaqForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "global";
  const initialPage = searchParams.get("page") || "product-detail-pages";

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("Global Support");
  const [tab, setTab] = useState<"global" | "artwork" | "category" | "product" | "page">(
    initialTab === "pages" || initialTab === "page" ? "page" : (initialTab as any) || "global"
  );
  const [pageSlug, setPageSlug] = useState(initialPage);
  const [categorySlug, setCategorySlug] = useState("bakery-boxes");
  const [productSlug, setProductSlug] = useState("");
  const [order, setOrder] = useState<number>(1);
  const [status, setStatus] = useState<"Published" | "Draft">("Published");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (tab === "page") {
      const selected = PAGE_OPTIONS.find((p) => p.slug === pageSlug);
      setCategory(selected ? `${selected.name} FAQs` : "Page Support");
    } else if (tab === "artwork") {
      setCategory("Artwork Guidelines");
    } else if (tab === "category") {
      setCategory(`Category: ${categorySlug}`);
    } else if (tab === "product") {
      setCategory("Product Packaging");
    } else {
      setCategory("Global Support");
    }
  }, [tab, pageSlug, categorySlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    setIsSaved(true);

    const selectedPage = PAGE_OPTIONS.find((p) => p.slug === pageSlug);

    await saveFaqRecord({
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim() || "Global Support",
      tab,
      section: tab === "global" ? "homepage" : tab === "page" ? "page" : tab,
      page_slug: tab === "page" ? pageSlug : tab === "global" ? "home" : null,
      page_name: tab === "page" ? selectedPage?.name : null,
      category_slug: tab === "category" ? categorySlug : null,
      product_slug: tab === "product" ? productSlug.trim() : null,
      order: Number(order) || 1,
      status,
    });

    setTimeout(() => {
      router.push("/admin/faqs");
    }, 500);
  };

  return (
    <div className="p-6 sm:p-8 max-w-[1000px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e0ddd6]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/faqs"
            className="p-2 rounded-lg border border-[#e0ddd6] text-[#7a7672] hover:bg-white hover:text-[#1a1a1a]"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h2 className="text-[20px] font-bold text-[#1a1a1a]">Create New FAQ</h2>
            <p className="text-[12px] text-[#7a7672]">Add a new question and answer to the knowledge base.</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="h-[40px] inline-flex items-center gap-2 px-6 text-[12px] font-bold rounded-[8px] bg-[#2d5c3e] text-white hover:bg-[#1e3d2b] cursor-pointer shadow-sm"
        >
          {isSaved ? <Check size={16} /> : <Save size={16} />}
          {isSaved ? "Saved!" : "Publish FAQ"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-[#e2ded7] shadow-sm flex flex-col gap-4">
        <div>
          <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1">
            Question Title *
          </label>
          <input
            type="text"
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. How do I determine the right dimensions for my custom box?"
            className="w-full h-11 px-3.5 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1">
            Answer Content *
          </label>
          <textarea
            required
            rows={6}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write the comprehensive answer here..."
            className="w-full p-3.5 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1">
              Target Tab / Section
            </label>
            <select
              value={tab}
              onChange={(e) => setTab(e.target.value as any)}
              className="w-full h-10 px-3 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white"
            >
              <option value="page">By Specific Website Page</option>
              <option value="global">Homepage FAQs (Global)</option>
              <option value="artwork">Artwork Guidelines</option>
              <option value="category">By Category</option>
              <option value="product">By Product</option>
            </select>
          </div>

          {tab === "page" && (
            <div>
              <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1">
                Select Website Page
              </label>
              <select
                value={pageSlug}
                onChange={(e) => setPageSlug(e.target.value)}
                className="w-full h-10 px-3 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white"
              >
                {PAGE_OPTIONS.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {tab === "category" && (
            <div>
              <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1">
                Select Category Page
              </label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full h-10 px-3 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white"
              >
                {BASE_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name} (/{c.slug})
                  </option>
                ))}
              </select>
            </div>
          )}

          {tab === "product" && (
            <div>
              <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1">
                Product Slug
              </label>
              <input
                type="text"
                value={productSlug}
                onChange={(e) => setProductSlug(e.target.value)}
                placeholder="e.g. custom-mylar-bags"
                className="w-full h-10 px-3 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white"
              />
            </div>
          )}

          <div>
            <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1">
              Display Order
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              min={1}
              max={999}
              className="w-full h-10 px-3 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full h-10 px-3 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft (Hidden)</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function NewFaqPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Global settings" },
        { label: "FAQs", href: "/admin/faqs" },
        { label: "New FAQ" },
      ]}
    >
      <Suspense fallback={<div className="p-8 text-center text-sm text-[#7a7672]">Loading...</div>}>
        <NewFaqForm />
      </Suspense>
    </AdminLayout>
  );
}
