"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, Check, Trash2 } from "lucide-react";
import {
  fetchFaqById,
  saveFaqRecord,
  deleteFaqRecord,
} from "@/lib/faq-service";
import { BASE_CATEGORIES } from "@/lib/category-service";

export default function EditFaqPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("Global Support");
  const [tab, setTab] = useState<"global" | "artwork" | "category" | "product">("global");
  const [categorySlug, setCategorySlug] = useState("bakery-boxes");
  const [productSlug, setProductSlug] = useState("");
  const [order, setOrder] = useState<number>(1);
  const [status, setStatus] = useState<"Published" | "Draft">("Published");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchFaqById(id).then((found) => {
      if (found) {
        setQuestion(found.question);
        setAnswer(found.answer);
        setCategory(found.category);
        setTab(found.tab || "global");
        if (found.category_slug) setCategorySlug(found.category_slug);
        if (found.product_slug) setProductSlug(found.product_slug);
        if (found.order) setOrder(found.order);
        setStatus(found.status || "Published");
      }
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    setIsSaved(true);
    await saveFaqRecord({
      id,
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim() || (tab === "category" ? categorySlug : "Global Support"),
      tab,
      section: tab === "global" ? "homepage" : tab,
      category_slug: tab === "category" ? categorySlug : null,
      product_slug: tab === "product" ? productSlug.trim() : null,
      order: Number(order) || 1,
      status,
    });
    setTimeout(() => {
      router.push("/admin/faqs");
    }, 500);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      await deleteFaqRecord(id);
      router.push("/admin/faqs");
    }
  };

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Global settings" },
        { label: "FAQs", href: "/admin/faqs" },
        { label: "Edit FAQ" },
      ]}
    >
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
              <h2 className="text-[20px] font-bold text-[#1a1a1a]">Edit FAQ</h2>
              <p className="text-[12px] text-[#7a7672]">
                Update knowledge base question, answer, and target page category.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDelete}
              className="h-[40px] inline-flex items-center gap-2 px-4 text-[12px] font-bold rounded-[8px] border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <Trash2 size={16} /> Delete
            </button>
            <button
              onClick={handleSubmit}
              className="h-[40px] inline-flex items-center gap-2 px-6 text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] cursor-pointer"
            >
              {isSaved ? <Check size={16} /> : <Save size={16} />}
              {isSaved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 border border-[#e2ded7] shadow-sm flex flex-col gap-4"
        >
          <div>
            <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1">
              Question Title *
            </label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What are the benefits of custom packaging?"
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
              placeholder="Write the full comprehensive answer here..."
              className="w-full p-3.5 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1">
                Target Page Category
              </label>
              <select
                value={tab}
                onChange={(e) => setTab(e.target.value as any)}
                className="w-full h-10 px-3 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white"
              >
                <option value="global">Homepage FAQs (Global)</option>
                <option value="artwork">Artwork Guidelines Page</option>
                <option value="category">Category Page (Specific)</option>
                <option value="product">Product Detail Page (Specific)</option>
              </select>
            </div>

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
                  placeholder="e.g. kraft-paper-tubes"
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
    </AdminLayout>
  );
}
