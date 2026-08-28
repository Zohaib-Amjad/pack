"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Link2,
  Search,
  FileText,
  Upload,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminCaseStudyNewView() {
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [allowIndexing, setAllowIndexing] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("Retail & Gift");
  const [author, setAuthor] = useState("HOF Pack Team");
  const [tags, setTags] = useState("");
  const [saving, setSaving] = useState(false);

  // Auto-generate slug from title
  const handleAutoSlug = () => {
    const generated = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
    setSlug(generated);
  };

  // Checklist items calculation
  const checklist = useMemo(() => {
    const items = [
      { label: "Title added", done: title.trim().length > 0 },
      { label: "Slug set", done: slug.trim().length > 0 },
      { label: "Excerpt written", done: excerpt.trim().length > 0 },
      { label: "Cover image uploaded", done: coverImage.trim().length > 0 },
      { label: "Content written", done: content.trim().length > 0 },
      {
        label: "Meta description set",
        done: (metaDescription || excerpt).trim().length > 0,
      },
    ];
    return items;
  }, [title, slug, excerpt, coverImage, content, metaDescription]);

  const handleSave = async (publishNow = false) => {
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Title is required",
        description: "Please enter a case study title.",
      });
      return;
    }

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: publishNow || isPublished ? "Case Study Published!" : "Draft Saved",
        description: `"${title}" has been saved successfully.`,
      });
      router.push("/admin/case-studies");
    }, 800);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setCoverImage(fakeUrl);
      toast({
        title: "Cover Image Selected",
        description: `${file.name} ready for case study.`,
      });
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0">
      {/* Subtabs Bar */}
      <div className="ptabs bg-white/70 backdrop-blur-sm border-b border-[#e0ddd6]/60 flex px-5 sm:px-6 shrink-0 overflow-x-auto gap-4 [scrollbar-width:thin]">
        <Link
          href="/admin/case-studies"
          className="ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-[#2d5c3e]"
        >
          All Case Studies
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
        </Link>
        <Link
          href="/admin/case-studies"
          className="ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-[#aaa6a0] hover:text-[#1a1a1a]"
        >
          Published
        </Link>
        <Link
          href="/admin/case-studies"
          className="ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 text-[#aaa6a0] hover:text-[#1a1a1a]"
        >
          Drafts
        </Link>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col gap-5 w-full">
            {/* Header with Title & Action Buttons */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/case-studies"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e0ddd6] bg-white text-[#7a7672] hover:bg-[#f5f3ee] transition-colors no-underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                  <h1 className="text-[15px] font-bold text-[#1a1a1a]">
                    New Case Study
                  </h1>
                  <p className="text-[11px] text-[#aaa6a0] truncate max-w-[320px]">
                    Create a new case study
                  </p>
                </div>
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
                  onClick={() => handleSave(false)}
                  disabled={saving}
                  className="h-[36px] inline-flex items-center gap-2 px-5 text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] transition-all disabled:opacity-60 cursor-pointer shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving ? "Saving..." : "Save Case Study"}
                </button>
              </div>
            </div>

            {/* Form Layout: 2 Columns */}
            <div className="grid xl:grid-cols-[1fr_360px] gap-5 items-start">
              {/* Left Column: Core Fields */}
              <div className="flex flex-col gap-4">
                {/* Title & Slug */}
                <div className="bg-white border border-[#e0ddd6] rounded-[12px] p-6">
                  <div className="mb-4">
                    <label className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-1.5">
                      Title *
                    </label>
                    <input
                      className="w-full h-[48px] px-3.5 text-[16px] font-semibold bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/60 focus:ring-2 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#c8c4bc]"
                      placeholder="Case study title..."
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (!slug) {
                          setSlug(
                            e.target.value
                              .toLowerCase()
                              .replace(/[^\w\s-]/g, "")
                              .replace(/\s+/g, "-")
                          );
                        }
                      }}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-0">
                        Slug *
                      </label>
                      <button
                        type="button"
                        onClick={handleAutoSlug}
                        className="flex items-center gap-1 text-[10px] font-semibold text-[#aaa6a0] hover:text-[#e8732a] transition-colors cursor-pointer"
                      >
                        <Link2 className="w-3 h-3" /> Auto
                      </button>
                    </div>
                    <div className="flex items-center gap-0 rounded-[8px] border border-[#e0ddd6] overflow-hidden focus-within:border-[#e8732a]/60 focus-within:ring-2 focus-within:ring-[#e8732a]/10 transition-all">
                      <span className="h-[38px] px-3 flex items-center text-[12px] text-[#aaa6a0] font-medium bg-[#f5f3ee] border-r border-[#e0ddd6] shrink-0 select-none">
                        /case-studies/
                      </span>
                      <input
                        className="flex-1 h-[38px] px-3 text-[13px] bg-white text-[#1a1a1a] placeholder:text-[#c8c4bc] focus:outline-none"
                        placeholder="case-study-slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Excerpt */}
                <div className="bg-white border border-[#e0ddd6] rounded-[12px] p-6">
                  <label className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-1.5">
                    Excerpt
                  </label>
                  <textarea
                    className="w-full px-3 py-2.5 text-[13px] bg-[#f5f3ee] border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/60 focus:ring-2 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#c8c4bc] resize-none leading-relaxed"
                    rows={3}
                    placeholder="Brief summary of the case study result..."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                  />
                  <p className="mt-1.5 text-[10px] text-[#aaa6a0]">
                    {excerpt.length} / 200 characters recommended
                  </p>
                </div>

                {/* Content Area */}
                <div className="bg-white border border-[#e0ddd6] rounded-[12px] p-6">
                  <label className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-1.5">
                    Content (HTML / Rich Text)
                  </label>
                  <textarea
                    className="w-full min-h-[350px] p-4 text-[13px] font-mono bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] leading-relaxed"
                    placeholder="<h2>1. Introduction</h2><p>Describe the client background, challenge, and the results achieved...</p>"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* SEO & Meta Box */}
                <div className="bg-white border border-[#e0ddd6] rounded-[12px] p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-[#f5f3ee] flex items-center justify-center">
                      <Search className="w-3.5 h-3.5 text-[#7a7672]" />
                    </div>
                    <p className="text-[12px] font-bold text-[#1a1a1a]">
                      SEO &amp; Meta
                    </p>
                  </div>

                  {/* Google Search Result Preview */}
                  <div className="mb-5 p-4 rounded-[10px] bg-[#f5f3ee] border border-[#e0ddd6]">
                    <p className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#aaa6a0] mb-2">
                      Search Preview
                    </p>
                    <p className="text-[#1a0dab] text-[14px] font-medium leading-tight truncate">
                      {metaTitle || title || "Case study title will appear here"}
                    </p>
                    <p className="text-[#006621] text-[11px] mt-0.5">
                      hofpack.com › case-studies › {slug || "case-study-slug"}
                    </p>
                    <p className="text-[#545454] text-[12px] mt-1 leading-[1.5] line-clamp-2">
                      {metaDescription ||
                        excerpt ||
                        "Your meta description will appear here in search results."}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-0">
                          Meta Title
                        </label>
                        <span className="text-[10px] font-medium text-[#aaa6a0]">
                          {metaTitle.length}/60
                        </span>
                      </div>
                      <input
                        className="w-full h-[38px] px-3 text-[13px] bg-[#f5f3ee] border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/60 focus:ring-2 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#c8c4bc]"
                        placeholder="SEO title"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-0">
                          Meta Description
                        </label>
                        <span className="text-[10px] font-medium text-[#aaa6a0]">
                          {metaDescription.length}/160
                        </span>
                      </div>
                      <textarea
                        className="w-full px-3 py-2.5 text-[13px] bg-[#f5f3ee] border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/60 focus:ring-2 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#c8c4bc] resize-none"
                        rows={3}
                        placeholder="SEO description"
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#e0ddd6]">
                      <div>
                        <p className="text-[12px] font-semibold text-[#1a1a1a]">
                          Allow search engine indexing
                        </p>
                        <p className="text-[10.5px] text-[#aaa6a0] mt-0.5">
                          Page will appear in Google search results
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAllowIndexing(!allowIndexing)}
                        className={`relative w-10 h-6 rounded-full transition-colors shrink-0 cursor-pointer ${
                          allowIndexing ? "bg-[#2d5c3e]" : "bg-[#d8d4cc]"
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                            allowIndexing ? "left-5" : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Settings & Checklist */}
              <div className="flex flex-col gap-4">
                {/* Publish Status Card */}
                <div className="bg-white border border-[#e0ddd6] rounded-[12px] overflow-hidden">
                  <div
                    className={`px-5 py-3 border-b border-[#e0ddd6] flex items-center justify-between ${
                      isPublished ? "bg-[#eaf2ed]" : "bg-[#fdf0e8]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full animate-pulse ${
                          isPublished ? "bg-[#2d5c3e]" : "bg-[#e8732a]"
                        }`}
                      />
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider ${
                          isPublished ? "text-[#2d5c3e]" : "text-[#c45a18]"
                        }`}
                      >
                        {isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsPublished(!isPublished)}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-md transition-all bg-white/60 text-[#1a1a1a] hover:bg-white cursor-pointer"
                    >
                      {isPublished ? "Set to Draft" : "Publish"}
                    </button>
                  </div>

                  <div className="p-5 space-y-3">
                    <label
                      onClick={() => setIsPublished(true)}
                      className="flex items-start gap-3 cursor-pointer group"
                    >
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          isPublished
                            ? "border-[#2d5c3e] bg-[#2d5c3e]"
                            : "border-[#d8d4cc] group-hover:border-[#e8732a]/50"
                        }`}
                      >
                        {isPublished && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#1a1a1a]">
                          Published
                        </p>
                        <p className="text-[10.5px] text-[#aaa6a0]">
                          Visible to everyone on the site
                        </p>
                      </div>
                    </label>

                    <label
                      onClick={() => setIsPublished(false)}
                      className="flex items-start gap-3 cursor-pointer group"
                    >
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          !isPublished
                            ? "border-[#e8732a] bg-[#e8732a]"
                            : "border-[#d8d4cc] group-hover:border-[#e8732a]/50"
                        }`}
                      >
                        {!isPublished && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#1a1a1a]">
                          Draft
                        </p>
                        <p className="text-[10.5px] text-[#aaa6a0]">
                          Only visible to admins
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Cover Image Card */}
                <div className="bg-white border border-[#e0ddd6] rounded-[12px] p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-[#f5f3ee] flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5 text-[#7a7672]" />
                    </div>
                    <p className="text-[12px] font-bold text-[#1a1a1a]">
                      Cover Image
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="border-2 border-dashed border-[#e0ddd6] rounded-[12px] bg-[#f5f3ee]/50 hover:bg-[#f5f3ee] transition-all overflow-hidden relative">
                      {coverImage ? (
                        <div className="relative aspect-[16/9] w-full">
                          <Image
                            src={coverImage}
                            alt="Cover preview"
                            fill
                            className="object-cover"
                          />
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
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Case Study Settings Card */}
                <div className="bg-white border border-[#e0ddd6] rounded-[12px] p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-4">
                    Case Study Settings
                  </p>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-1.5">
                        Industry / Category
                      </label>
                      <select
                        className="w-full h-[38px] px-3 text-[13px] bg-[#f5f3ee] border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/60 focus:ring-2 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] cursor-pointer"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option>Retail &amp; Gift</option>
                        <option>Food &amp; Beverage</option>
                        <option>Beauty &amp; Cosmetics</option>
                        <option>E-Commerce</option>
                        <option>Fashion &amp; Apparel</option>
                        <option>Technology</option>
                        <option>Health &amp; Wellness</option>
                        <option>Sustainability</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-1.5">
                        Author
                      </label>
                      <input
                        className="w-full h-[38px] px-3 text-[13px] bg-[#f5f3ee] border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/60 focus:ring-2 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#c8c4bc]"
                        placeholder="HOF Pack Team"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-1.5">
                        Tags
                      </label>
                      <input
                        className="w-full h-[38px] px-3 text-[13px] bg-[#f5f3ee] border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/60 focus:ring-2 focus:ring-[#e8732a]/10 transition-all text-[#1a1a1a] placeholder:text-[#c8c4bc]"
                        placeholder="rigid-boxes, luxury, unboxing"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                      />
                      <p className="mt-1.5 text-[10px] text-[#aaa6a0]">
                        Comma-separated
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pre-publish Checklist Card */}
                <div className="bg-white border border-[#e0ddd6] rounded-[12px] p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#aaa6a0] mb-3">
                    Pre-publish Checklist
                  </p>
                  <div className="space-y-2">
                    {checklist.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${
                            item.done
                              ? "bg-[#2d5c3e] text-white"
                              : "bg-[#f5f3ee] border border-[#e0ddd6]"
                          }`}
                        >
                          {item.done && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <span
                          className={`text-[11.5px] font-medium ${
                            item.done ? "text-[#1a1a1a]" : "text-[#aaa6a0]"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Submit Button */}
                <button
                  type="button"
                  onClick={() => handleSave(true)}
                  disabled={saving}
                  className="w-full h-[44px] inline-flex items-center justify-center gap-2 text-[13px] font-bold rounded-[10px] bg-[#e8732a] text-white hover:bg-[#c45a18] transition-all disabled:opacity-60 shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Publishing..." : "Publish Case Study"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
