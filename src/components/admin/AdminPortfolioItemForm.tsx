"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  Upload,
  Plus,
  Trash2,
  Image as ImageIcon,
  RotateCcw,
  RotateCw,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Outdent,
  Indent,
  Code,
  HelpCircle,
  Baseline,
  ChevronDown,
  Heart,
} from "lucide-react";
import { createDataClient } from "@/utils/supabase/data-client";
import { createPublicClient } from "@/utils/supabase/public-client";
import { useToast } from "@/hooks/use-toast";

type PortfolioModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  itemId?: string;
  isEdit?: boolean;
};

export default function AdminPortfolioModal({
  isOpen = true,
  onClose,
  onSuccess,
  itemId,
  isEdit = false,
}: PortfolioModalProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [manualUrl, setManualUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(Boolean(isEdit && itemId));

  useEffect(() => {
    if (isEdit && itemId) {
      fetchItem(itemId);
    } else {
      // Reset form
      setTitle("");
      setCategory("");
      setProjectUrl("");
      setManualUrl("");
      setImages([]);
      setDescription("");
    }
  }, [isEdit, itemId, isOpen]);

  const fetchItem = async (id: string) => {
    try {
      setLoading(true);
      const supabase = createPublicClient();
      const { data, error } = await (supabase
        .from("portfolio_items" as any)
        .select("*")
        .eq("id", id)
        .maybeSingle() as any);

      if (error || !data) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not find project.",
        });
        return;
      }

      setTitle(data.title || "");
      setCategory(data.category || "");
      setProjectUrl(data.project_url || data.url || "");
      const loadedImgs = Array.isArray(data.images) && data.images.length > 0
        ? data.images
        : data.image_url
        ? [data.image_url]
        : [];
      setImages(loadedImgs);
      setManualUrl(loadedImgs[0] || "");
      setDescription(data.description || "");
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load project details.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setImages((prev) => [...prev, result]);
          if (!manualUrl) setManualUrl(result);
        }
      };
      reader.readAsDataURL(file);
    });

    toast({
      title: "Artwork uploaded",
      description: "Image added to project gallery.",
    });
  };

  const handleAddManualUrl = () => {
    if (!manualUrl.trim()) return;
    if (!images.includes(manualUrl.trim())) {
      setImages((prev) => [...prev, manualUrl.trim()]);
      toast({
        title: "Image added",
        description: "Manual URL image added to project media.",
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Project Title Required",
        description: "Please enter a project title.",
      });
      return;
    }

    try {
      setSaving(true);
      const supabase = createDataClient();

      const finalImages = images.length > 0 ? images : manualUrl.trim() ? [manualUrl.trim()] : [];
      const primaryImage = finalImages[0] || "/images/products/custom-boxes/custom-cardboard-boxes.png";

      const payload = {
        title: title.trim(),
        category: category.trim() || "Custom Boxes",
        image_url: primaryImage,
        images: finalImages,
        description: description.trim(),
        project_url: projectUrl.trim(),
        updated_at: new Date().toISOString(),
      };

      if (isEdit && itemId) {
        const { error } = await (supabase
          .from("portfolio_items" as any)
          .update(payload as any)
          .eq("id", itemId) as any);

        if (error) throw error;
      } else {
        const { error } = await (supabase
          .from("portfolio_items" as any)
          .insert({
            ...payload,
            created_at: new Date().toISOString(),
          } as any) as any);

        if (error) throw error;
      }

      toast({
        title: isEdit ? "Project Updated" : "Project Created",
        description: `"${title}" has been saved to your portfolio.`,
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: unknown) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: err instanceof Error ? err.message : "Failed to save project.",
      });
    } finally {
      setSaving(false);
    }
  };

  const wordCount = description.trim() ? description.trim().split(/\s+/).length : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-[940px] my-8 bg-white rounded-[20px] shadow-2xl border border-[#e0ddd6] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#e0ddd6]/70 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#2d5c3e] text-white flex items-center justify-center shadow-sm">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-[17px] font-bold text-[#1a1a1a] leading-tight">
                {isEdit ? "Edit Project" : "Add New Project"}
              </h2>
              <p className="text-[10px] font-bold text-[#7a7672] uppercase tracking-[0.15em] mt-0.5">
                PORTFOLIO MANAGEMENT
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#aaa6a0] hover:text-[#1a1a1a] hover:bg-[#f5f3ee] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content Form */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-7 [scrollbar-width:thin]">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#e8732a] border-t-transparent animate-spin" />
              <p className="text-[13px] text-[#7a7672]">Loading project...</p>
            </div>
          ) : (
            <form id="portfolio-form" onSubmit={handleSubmit} className="space-y-7">
              {/* 1. CORE INFORMATION */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-[2px] bg-[#e8732a]" />
                  <span className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider">
                    CORE INFORMATION
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-[#7a7672] uppercase tracking-wider block mb-1.5">
                      PROJECT TITLE
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Luxury Chocolate Box"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full h-[42px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] placeholder:text-[#d0ccc4]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#7a7672] uppercase tracking-wider block mb-1.5">
                      CATEGORY
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Food & Beverage"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-[42px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] placeholder:text-[#d0ccc4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#7a7672] uppercase tracking-wider block mb-1.5">
                    PROJECT URL (OPTIONAL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/project"
                    value={projectUrl}
                    onChange={(e) => setProjectUrl(e.target.value)}
                    className="w-full h-[42px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] placeholder:text-[#d0ccc4]"
                  />
                </div>
              </div>

              {/* 2. PROJECT MEDIA */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-[2px] bg-[#2d5c3e]" />
                  <span className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider">
                    PROJECT MEDIA
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Upload Card */}
                  <div className="border border-[#e0ddd6] rounded-[14px] bg-[#faf8f5]/80 p-3.5 flex flex-col justify-between">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#e0ddd6] rounded-[10px] bg-white p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#2d5c3e] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#2d5c3e]/10 text-[#2d5c3e] flex items-center justify-center mb-2">
                        <Upload className="w-4 h-4" />
                      </div>
                      <p className="text-[11px] font-bold text-[#1a1a1a] text-center">
                        Upload Artwork (Cloudinary)
                      </p>
                      <p className="text-[9px] text-[#aaa6a0] text-center mt-0.5">
                        PNG, JPG or WebP up to 5MB
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>

                    <div className="mt-3">
                      <label className="text-[9px] font-bold text-[#7a7672] uppercase tracking-wider block mb-1">
                        MANUAL URL
                      </label>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          placeholder="Or paste an image URL..."
                          value={manualUrl}
                          onChange={(e) => setManualUrl(e.target.value)}
                          onBlur={handleAddManualUrl}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddManualUrl();
                            }
                          }}
                          className="flex-1 h-[34px] px-2.5 text-[11px] bg-white border border-[#e0ddd6] rounded-[6px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] placeholder:text-[#d0ccc4]"
                        />
                        <button
                          type="button"
                          onClick={handleAddManualUrl}
                          className="h-[34px] px-2.5 bg-[#f5f3ee] hover:bg-[#e0ddd6] text-[#1a1a1a] text-[11px] font-bold rounded-[6px] transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Rendered Uploaded Images */}
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[4/3] sm:aspect-auto sm:h-[180px] rounded-[14px] border border-[#e0ddd6] overflow-hidden bg-[#faf8f5] group"
                    >
                      <Image
                        src={img}
                        alt={`Project media ${idx + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all shadow-md cursor-pointer"
                        title="Remove Image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {/* Add Image Placeholder Button */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#e0ddd6] rounded-[14px] bg-white flex flex-col items-center justify-center p-6 min-h-[180px] cursor-pointer hover:border-[#2d5c3e] hover:bg-[#faf8f5] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#faf8f5] text-[#aaa6a0] flex items-center justify-center mb-1.5">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-[#7a7672]">Add Image</span>
                  </div>
                </div>
              </div>

              {/* 3. PROJECT DESCRIPTION (TinyMCE Rich Text Layout) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-[2px] bg-[#e8732a]" />
                  <span className="text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider">
                    PROJECT DESCRIPTION
                  </span>
                </div>

                <div className="border border-[#e0ddd6] rounded-[10px] bg-white overflow-hidden shadow-sm">
                  {/* TinyMCE Top Menu Bar */}
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#e0ddd6] bg-[#faf8f5] text-[11px] text-[#5a5652]">
                    <div className="flex items-center gap-3">
                      <span className="cursor-pointer hover:text-[#1a1a1a]">File</span>
                      <span className="cursor-pointer hover:text-[#1a1a1a]">Edit</span>
                      <span className="cursor-pointer hover:text-[#1a1a1a]">View</span>
                      <span className="cursor-pointer hover:text-[#1a1a1a]">Insert</span>
                      <span className="cursor-pointer hover:text-[#1a1a1a]">Format</span>
                      <span className="cursor-pointer hover:text-[#1a1a1a]">Tools</span>
                      <span className="cursor-pointer hover:text-[#1a1a1a]">Table</span>
                      <span className="cursor-pointer hover:text-[#1a1a1a]">Help</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#e8732a] font-semibold text-[10px]">
                      <Heart className="w-3 h-3 fill-current" />
                      <span>Get all features</span>
                    </div>
                  </div>

                  {/* TinyMCE Toolbar */}
                  <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 border-b border-[#e0ddd6] bg-white text-[#5a5652]">
                    <button
                      type="button"
                      className="p-1 hover:bg-[#f5f3ee] rounded text-[#7a7672] hover:text-[#1a1a1a]"
                      title="Undo"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:bg-[#f5f3ee] rounded text-[#7a7672] hover:text-[#1a1a1a]"
                      title="Redo"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-[1px] h-4 bg-[#e0ddd6] mx-1" />

                    <div className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 border border-[#e0ddd6] rounded bg-white">
                      <span>Paragraph</span>
                      <ChevronDown className="w-3 h-3 text-[#aaa6a0]" />
                    </div>

                    <div className="w-[1px] h-4 bg-[#e0ddd6] mx-1" />

                    <button
                      type="button"
                      className="p-1 hover:bg-[#f5f3ee] rounded text-[#7a7672] hover:text-[#1a1a1a]"
                      title="Bold"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:bg-[#f5f3ee] rounded text-[#7a7672] hover:text-[#1a1a1a]"
                      title="Italic"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:bg-[#f5f3ee] rounded text-[#7a7672] hover:text-[#1a1a1a]"
                      title="Text color"
                    >
                      <Baseline className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-[1px] h-4 bg-[#e0ddd6] mx-1" />

                    <button
                      type="button"
                      className="p-1 hover:bg-[#f5f3ee] rounded text-[#7a7672] hover:text-[#1a1a1a]"
                      title="Align Left"
                    >
                      <AlignLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:bg-[#f5f3ee] rounded text-[#7a7672] hover:text-[#1a1a1a]"
                      title="Align Center"
                    >
                      <AlignCenter className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:bg-[#f5f3ee] rounded text-[#7a7672] hover:text-[#1a1a1a]"
                      title="Align Right"
                    >
                      <AlignRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:bg-[#f5f3ee] rounded text-[#7a7672] hover:text-[#1a1a1a]"
                      title="Justify"
                    >
                      <AlignJustify className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-[1px] h-4 bg-[#e0ddd6] mx-1" />

                    <button
                      type="button"
                      className="p-1 hover:bg-[#f5f3ee] rounded text-[#7a7672] hover:text-[#1a1a1a]"
                      title="Bullet list"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:bg-[#f5f3ee] rounded text-[#7a7672] hover:text-[#1a1a1a]"
                      title="Numbered list"
                    >
                      <ListOrdered className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:bg-[#f5f3ee] rounded text-[#7a7672] hover:text-[#1a1a1a]"
                      title="Outdent"
                    >
                      <Outdent className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:bg-[#f5f3ee] rounded text-[#7a7672] hover:text-[#1a1a1a]"
                      title="Indent"
                    >
                      <Indent className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-[1px] h-4 bg-[#e0ddd6] mx-1" />

                    <button
                      type="button"
                      className="p-1 hover:bg-[#f5f3ee] rounded text-[#7a7672] hover:text-[#1a1a1a]"
                      title="Code"
                    >
                      <Code className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:bg-[#f5f3ee] rounded text-[#7a7672] hover:text-[#1a1a1a]"
                      title="Help"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Textarea */}
                  <textarea
                    rows={8}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write detailed project overview, manufacturing materials, custom finishings, and client background..."
                    className="w-full p-4 text-[13px] text-[#1a1a1a] focus:outline-none resize-y min-h-[160px] font-sans placeholder:text-[#d0ccc4]"
                  />

                  {/* Bottom Status Bar */}
                  <div className="flex items-center justify-between px-3 py-1.5 border-t border-[#e0ddd6] bg-[#faf8f5] text-[10px] text-[#aaa6a0]">
                    <span>p</span>
                    <span>Press Alt + 0 for help</span>
                    <div className="flex items-center gap-3">
                      <span>{wordCount} words</span>
                      <span>Build with TinyMCE</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-[#e0ddd6]/70 flex items-center justify-end gap-3 bg-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[12px] font-bold text-[#7a7672] hover:text-[#1a1a1a] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="portfolio-form"
            disabled={saving}
            className="h-[38px] px-6 text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] disabled:opacity-50 inline-flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Add to Portfolio"}
          </button>
        </div>
      </div>
    </div>
  );
}
