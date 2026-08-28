"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  RefreshCw,
  Save,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCmsHomeSection } from "@/hooks/useCmsHomeSection";

export default function AdminFeaturedCategoriesView() {
  const { toast } = useToast();
  const { local, setLocal, save, saving, refetch } = useCmsHomeSection("featuredCategories");

  const [sectionLabel, setSectionLabel] = useState("Shop By Category");
  const [titleBeforeAccent, setTitleBeforeAccent] = useState("Find Your");
  const [titleAccent, setTitleAccent] = useState("Perfect Box");
  const [description, setDescription] = useState(
    "Browse our most popular packaging styles. Every box is fully customizable to fit your brand."
  );
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (local) {
      setSectionLabel(local.sectionLabel ?? "Shop By Category");
      setTitleBeforeAccent(local.titleBeforeAccent ?? local.titleLead ?? "Find Your");
      setTitleAccent(local.titleAccent ?? "Perfect Box");
      setDescription(
        local.description ??
          "Browse our most popular packaging styles. Every box is fully customizable to fit your brand."
      );
    }
  }, [local]);

  const handleReset = () => {
    if (refetch) {
      refetch();
    } else {
      setSectionLabel("Shop By Category");
      setTitleBeforeAccent("Find Your");
      setTitleAccent("Perfect Box");
      setDescription(
        "Browse our most popular packaging styles. Every box is fully customizable to fit your brand."
      );
    }
    toast({
      title: "Reset from server",
      description: "Restored latest featured categories settings from Supabase.",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFeaturedCategories = {
      sectionLabel,
      titleBeforeAccent,
      titleLead: titleBeforeAccent,
      titleAccent,
      description,
    };

    if (setLocal) {
      setLocal(updatedFeaturedCategories);
    }

    if (save) {
      await save(updatedFeaturedCategories);
    }

    setIsSaved(true);
    toast({
      title: "Featured Categories Saved",
      description: "Updated header and description copy on the live homepage.",
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
      <div className="max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col gap-5">
          {/* Top Info Banner */}
          <div className="flex items-start gap-3 p-4 rounded-[12px] border border-[#e0ddd6] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="h-10 w-10 rounded-xl bg-[#eaf2ed] flex items-center justify-center shrink-0 text-[#2d5c3e]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-[16px] font-bold text-[#1a1a1a] tracking-tight">
                Content Manager
              </h1>
              <p className="text-[11px] text-[#aaa6a0] font-semibold mt-0.5 leading-relaxed">
                Edit public page copy stored in Supabase. Use the main sidebar to
                jump to any section.
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-[920px]">
              {/* Action Toolbar */}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn h-[36px] px-4 text-[11px] font-bold rounded-[8px] border border-[#d8d4cc] bg-white text-[#7a7672] hover:bg-[#faf8f5] inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset from server
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn h-[36px] px-5 text-[11px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] disabled:opacity-50 inline-flex items-center gap-2 shadow-[0_4px_14px_rgba(232,115,42,0.2)] cursor-pointer transition-colors"
                >
                  {isSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                  {saving ? "Saving..." : isSaved ? "Saved & published!" : "Save & publish"}
                </button>
              </div>

              {/* Main Card */}
              <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                {/* Card Header */}
                <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                  <div className="ch-l flex-1">
                    <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                      Featured categories header
                    </div>
                    <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                      Grid still loads from database
                    </div>
                  </div>
                </div>

                {/* Card Body Fields */}
                <div className="cb p-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Section label
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={sectionLabel}
                        onChange={(e) => setSectionLabel(e.target.value)}
                        placeholder="Shop By Category"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Title (before accent)
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={titleBeforeAccent}
                        onChange={(e) => setTitleBeforeAccent(e.target.value)}
                        placeholder="Find Your"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Title accent
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={titleAccent}
                        onChange={(e) => setTitleAccent(e.target.value)}
                        placeholder="Perfect Box"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Browse our most popular packaging styles..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
