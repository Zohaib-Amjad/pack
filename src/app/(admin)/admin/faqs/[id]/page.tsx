"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, Check, Trash2 } from "lucide-react";
import { INITIAL_FAQS, FAQItem } from "@/components/admin/AdminFaqsView";

export default function EditFaqPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [faq, setFaq] = useState<FAQItem | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("Global Support");
  const [tab, setTab] = useState<"global" | "artwork" | "category" | "product">("global");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const found = INITIAL_FAQS.find((f) => f.id === id);
    if (found) {
      setFaq(found);
      setQuestion(found.question);
      setAnswer(found.answer);
      setCategory(found.category);
      setTab(found.tab);
    } else {
      // Fallback template
      setQuestion("FAQ Item");
      setAnswer("");
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      router.push("/admin/faqs");
    }, 1000);
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
                Update knowledge base question, answer, and category.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (confirm("Are you sure you want to delete this FAQ?")) {
                  router.push("/admin/faqs");
                }
              }}
              className="h-[40px] inline-flex items-center gap-2 px-4 text-[12px] font-bold rounded-[8px] border border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} /> Delete
            </button>
            <button
              onClick={handleSubmit}
              className="h-[40px] inline-flex items-center gap-2 px-6 text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18]"
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
              Question Title
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
              Answer Content
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1">
                Tab Section
              </label>
              <select
                value={tab}
                onChange={(e) =>
                  setTab(e.target.value as "global" | "artwork" | "category" | "product")
                }
                className="w-full h-10 px-3 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white"
              >
                <option value="global">Global FAQs</option>
                <option value="artwork">Artwork Guidelines</option>
                <option value="category">By Category</option>
                <option value="product">By Product</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1">
                Category Tag / Subtitle
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Global Support or Artwork: color mode"
                className="w-full h-10 px-3 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white"
              >
              </input>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
