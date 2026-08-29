"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchAllFaqs, deleteFaqRecord, BASE_FAQS, type FAQItem } from "@/lib/faq-service";

export default function AdminFaqsView() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<
    "global" | "artwork" | "category" | "product"
  >("global");
  const [searchQuery, setSearchQuery] = useState("");
  const [faqs, setFaqs] = useState<FAQItem[]>(BASE_FAQS);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const list = await fetchAllFaqs();
      setFaqs(list);
    } catch {
      setFaqs(BASE_FAQS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const handleSync = () => loadData();
    window.addEventListener("storage", handleSync);
    window.addEventListener("focus", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("focus", handleSync);
    };
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesTab =
        activeTab === "global"
          ? true // Show all 18 FAQs on global tab (matching user's provided list)
          : activeTab === "artwork"
            ? faq.tab === "artwork" || faq.section === "artwork"
            : activeTab === "category"
              ? faq.tab === "category" || faq.section === "category"
              : faq.tab === "product" || faq.section === "product";

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        (faq.category && faq.category.toLowerCase().includes(q));

      return matchesTab && matchesSearch;
    });
  }, [faqs, activeTab, searchQuery]);

  const handleDelete = async (id: string, question: string) => {
    if (!confirm(`Are you sure you want to delete this FAQ?\n"${question}"`))
      return;
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    await deleteFaqRecord(id);
    toast({
      title: "FAQ Deleted",
      description: "Question removed from FAQ catalog.",
    });
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0">
      {/* Subtabs Bar */}
      <div className="ptabs bg-white/70 backdrop-blur-sm border-b border-[#e0ddd6]/60 flex px-5 sm:px-6 shrink-0 overflow-x-auto gap-4 [scrollbar-width:thin]">
        <button
          type="button"
          onClick={() => setActiveTab("global")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "global"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Global FAQs
          {activeTab === "global" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("artwork")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "artwork"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Artwork Guidelines
          {activeTab === "artwork" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("category")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "category"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          By Category
          {activeTab === "category" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("product")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "product"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          By Product
          {activeTab === "product" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 [scrollbar-width:thin]">
        <div className="max-w-[1200px] mx-auto space-y-6">
          {/* Top action / search bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-[400px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa6a0]" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-white rounded-lg border border-[#e0ddd6] text-[13px] text-[#1a1a1a] placeholder-[#aaa6a0] focus:outline-none focus:border-[#2d5c3e] focus:ring-1 focus:ring-[#2d5c3e] transition-colors"
              />
            </div>

            <Link
              href="/admin/faqs/new"
              className="inline-flex items-center justify-center gap-2 bg-[#2d5c3e] text-white px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-[#234931] transition-colors shrink-0 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add FAQ
            </Link>
          </div>

          {/* FAQs List Card */}
          <div className="bg-white rounded-xl border border-[#e0ddd6] overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-[#e0ddd6] flex items-center justify-between bg-[#faf8f5]">
              <h2 className="text-[14px] font-bold text-[#1a1a1a] capitalize">
                {activeTab === "global"
                  ? "Global FAQs"
                  : activeTab === "artwork"
                    ? "Artwork Guidelines FAQs"
                    : activeTab === "category"
                      ? "Category-Specific FAQs"
                      : "Product-Specific FAQs"}
              </h2>
              <span className="text-[12px] font-medium text-[#7a7672]">
                {filteredFaqs.length} {filteredFaqs.length === 1 ? "question" : "questions"}
              </span>
            </div>

            {filteredFaqs.length === 0 ? (
              <div className="p-12 text-center text-[#7a7672]">
                <p className="text-[13px]">No FAQs found matching your criteria.</p>
              </div>
            ) : (
              <div className="divide-y divide-[#e0ddd6]">
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="p-5 hover:bg-[#faf8f5]/60 transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="w-5 h-5 rounded-full bg-[#f0ede6] text-[#7a7672] text-[11px] font-bold inline-flex items-center justify-center shrink-0">
                          {faq.order ?? index + 1}
                        </span>
                        <Link
                          href={`/admin/faqs/${faq.id}`}
                          className="text-[14px] font-bold text-[#1a1a1a] hover:text-[#e8732a] transition-colors"
                        >
                          {faq.question}
                        </Link>
                        {faq.status === "Draft" && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#f5f3ee] text-[#7a7672] border border-[#e0ddd6]">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-[#7a7672] line-clamp-2 leading-relaxed">
                        {faq.answer}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-[#aaa6a0] pt-1">
                        <span>{faq.category || "Global Support"}</span>
                        {faq.category_slug && (
                          <>
                            <span>•</span>
                            <span className="text-[#2d5c3e] font-medium">
                              /{faq.category_slug}
                            </span>
                          </>
                        )}
                        {faq.product_slug && (
                          <>
                            <span>•</span>
                            <span className="text-[#e8732a] font-medium">
                              /product/{faq.product_slug}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                      <Link
                        href={`/admin/faqs/${faq.id}`}
                        className="px-3 py-1.5 text-[12px] font-semibold text-[#2d5c3e] hover:bg-[#edf7f1] rounded-lg transition-colors border border-[#b8dfc8]"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(faq.id, faq.question)}
                        className="p-1.5 text-[#aaa6a0] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
