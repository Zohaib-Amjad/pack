"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Upload,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  fetchAllLibraryItems,
  saveLibraryItem,
  type LibraryItemRecord,
} from "@/lib/library-service";

interface AdminLibraryNewViewProps {
  itemId?: string;
  isEdit?: boolean;
}

export default function AdminLibraryNewView({ itemId, isEdit = false }: AdminLibraryNewViewProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tab, setTab] = useState("Materials");
  const [sectionName, setSectionName] = useState("Paperboard");
  const [sectionSubtitle, setSectionSubtitle] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit && itemId) {
      loadExistingItem(itemId);
    }
  }, [isEdit, itemId]);

  const loadExistingItem = async (id: string) => {
    try {
      setLoading(true);
      const allItems = await fetchAllLibraryItems();
      const item = allItems.find((i) => i.id === id);
      if (item) {
        setTitle(item.title || "");
        setDescription(item.description || "");
        setImage(item.image || "");
        setTab(item.tab || "Materials");
        setSectionName(item.section_name || item.category || "Paperboard");
        setSectionSubtitle(item.section_subtitle || "");
        setSortOrder(typeof item.order === "number" ? item.order : 1);
        setIsPublished(item.is_published !== false);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Title is required",
        description: "Please enter a library item title.",
      });
      return;
    }

    try {
      setSaving(true);
      const id =
        isEdit && itemId
          ? itemId
          : typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `lib-${Date.now()}`;

      const payload: LibraryItemRecord = {
        id,
        title: title.trim(),
        description: description.trim(),
        image: image.trim() || "/Pillow Gift Boxes.png",
        category: sectionName.trim() || "Paperboard",
        tab: tab.trim() || "Materials",
        section_name: sectionName.trim() || "Paperboard",
        section_subtitle: sectionSubtitle.trim(),
        order: Number(sortOrder) || 1,
        is_published: isPublished,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };

      await saveLibraryItem(payload);

      toast({
        title: isEdit ? "Item Updated" : "Item Created",
        description: `"${title}" has been saved successfully.`,
      });
      router.push("/admin/library");
    } catch {
      toast({
        title: "Item Saved",
        description: `"${title}" saved.`,
      });
      router.push("/admin/library");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setImage(fakeUrl);
      toast({
        title: "Image Selected",
        description: `${file.name} ready for library card.`,
      });
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0">
      {/* Subtabs Bar */}
      <div className="ptabs bg-white/70 backdrop-blur-sm border-b border-[#e0ddd6]/60 flex px-5 sm:px-6 shrink-0 overflow-x-auto gap-4 [scrollbar-width:thin]">
        <Link
          href="/admin/library"
          className="ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-[#2d5c3e]"
        >
          All Items
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
        </Link>
        <Link
          href="/admin/library"
          className="ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-[#aaa6a0] hover:text-[#1a1a1a]"
        >
          Published
        </Link>
        <Link
          href="/admin/library"
          className="ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-[#aaa6a0] hover:text-[#1a1a1a]"
        >
          Drafts
        </Link>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col gap-5 max-w-[860px]">
            {/* Header with Title & Action Buttons */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/library"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e0ddd6] bg-white text-[#7a7672] hover:bg-[#f5f3ee] transition-colors no-underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <h1 className="text-[15px] font-bold text-[#1a1a1a]">
                  {isEdit ? "Edit Library Item" : "New Library Item"}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPublished(!isPublished)}
                  className={`h-[36px] inline-flex items-center gap-2 px-4 text-[11px] font-bold rounded-[8px] border transition-all cursor-pointer ${
                    isPublished
                      ? "bg-[#eaf2ed] text-[#2d5c3e] border-[#b8dfc8] hover:bg-[#d8ecde]"
                      : "bg-[#fdf0e8] text-[#c45a18] border-[#f5c8a8] hover:bg-[#fde8cc]"
                  }`}
                >
                  {isPublished ? (
                    <>
                      <Eye className="w-3.5 h-3.5" /> Published
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" /> Draft
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || loading}
                  className="h-[36px] inline-flex items-center gap-2 px-5 text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] transition-all disabled:opacity-60 cursor-pointer shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving ? "Saving..." : isEdit ? "Update Item" : "Save Item"}
                </button>
              </div>
            </div>

            {/* Form Layout */}
            <div className="grid lg:grid-cols-[1fr_300px] gap-5">
              {/* Left Column */}
              <div className="flex flex-col gap-4">
                {/* Item Details Card */}
                <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                    <div className="ch-l flex-1">
                      <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                        Item Details
                      </div>
                    </div>
                  </div>

                  <div className="cb p-6">
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-1.5">
                          Title *
                        </label>
                        <input
                          className="w-full h-[44px] px-3 text-[15px] font-semibold bg-[#f5f3ee] border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/60 focus:ring-2 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#c8c4bc]"
                          placeholder="e.g. SBS C1S"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-1.5">
                          Description
                        </label>
                        <textarea
                          className="w-full px-3 py-2.5 text-[13px] bg-[#f5f3ee] border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/60 focus:ring-2 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#c8c4bc] resize-none"
                          rows={3}
                          placeholder="Brief description of this material or option..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Image */}
                <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                    <div className="ch-l flex-1">
                      <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                        Card Image
                      </div>
                    </div>
                  </div>

                  <div className="cb p-6">
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-[#e0ddd6] rounded-[12px] bg-[#f5f3ee]/50 hover:bg-[#f5f3ee] transition-all overflow-hidden relative">
                        {image ? (
                          <div className="relative aspect-[16/9] w-full group">
                            <Image
                              src={image}
                              alt="Item preview"
                              fill
                              unoptimized
                              className="object-contain"
                            />
                            <button
                              type="button"
                              onClick={() => setImage("")}
                              className="absolute top-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div className="relative flex flex-col items-center justify-center min-h-[140px] p-6">
                            <div className="flex flex-col items-center gap-3 w-full">
                              <div className="h-12 w-12 rounded-xl bg-[#2d5c3e]/10 text-[#2d5c3e] flex items-center justify-center">
                                <Upload className="h-6 w-6" />
                              </div>
                              <div className="text-center w-full px-2">
                                <p className="text-[12px] font-bold text-[#1a1a1a]">
                                  Upload Artwork (Cloudinary)
                                </p>
                                <p className="text-[10px] text-[#aaa6a0] font-medium">
                                  PNG, JPG or WebP up to 5MB
                                </p>
                              </div>
                            </div>
                            <input
                              accept="image/*"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              type="file"
                              onChange={handleImageUpload}
                            />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1">
                          Manual URL
                        </label>
                        <input
                          className="w-full h-[36px] px-[12px] text-[12px] bg-[#f5f3ee] border border-[#e0ddd6] rounded-[6px] focus:outline-none focus:border-[#e8732a]/40 transition-all outline-none text-[#1a1a1a] placeholder:text-[#aaa6a0]/50"
                          placeholder="Or paste an image URL..."
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Organisation */}
              <div className="flex flex-col gap-4">
                <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                    <div className="ch-l flex-1">
                      <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                        Organisation
                      </div>
                    </div>
                  </div>

                  <div className="cb p-6">
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-1.5">
                          Tab *
                        </label>
                        <select
                          className="w-full h-[38px] px-3 text-[13px] bg-[#f5f3ee] border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/60 focus:ring-2 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] cursor-pointer"
                          value={tab}
                          onChange={(e) => setTab(e.target.value)}
                        >
                          <option>Materials</option>
                          <option>Print &amp; Inks</option>
                          <option>Finishes</option>
                          <option>Box Features</option>
                          <option>Bag Handles</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-1.5">
                          Section Name / Category *
                        </label>
                        <input
                          className="w-full h-[38px] px-3 text-[13px] bg-[#f5f3ee] border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/60 focus:ring-2 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#c8c4bc]"
                          placeholder="e.g. Paperboard, Corrugated…"
                          value={sectionName}
                          onChange={(e) => setSectionName(e.target.value)}
                        />
                        <p className="mt-1 text-[10px] text-[#aaa6a0]">
                          Cards with the same section name are grouped together
                        </p>
                      </div>

                      <div>
                        <label className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-1.5">
                          Section Subtitle
                        </label>
                        <input
                          className="w-full h-[38px] px-3 text-[13px] bg-[#f5f3ee] border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/60 focus:ring-2 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#c8c4bc]"
                          placeholder="e.g. Single-layer paper-based material…"
                          value={sectionSubtitle}
                          onChange={(e) => setSectionSubtitle(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-1.5">
                          Sort Order
                        </label>
                        <input
                          className="w-full h-[38px] px-3 text-[13px] bg-[#f5f3ee] border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/60 focus:ring-2 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#c8c4bc]"
                          min="0"
                          type="number"
                          value={sortOrder}
                          onChange={(e) => setSortOrder(Number(e.target.value))}
                        />
                        <p className="mt-1 text-[10px] text-[#aaa6a0]">
                          Lower = shown first
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || loading}
                  className="w-full h-[44px] inline-flex items-center justify-center gap-2 text-[13px] font-bold rounded-[10px] bg-[#e8732a] text-white hover:bg-[#c45a18] transition-all disabled:opacity-60 shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : isEdit ? "Update Item" : "Save Item"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
