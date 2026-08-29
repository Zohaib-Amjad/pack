"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  FileText,
  Upload,
  Check,
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
  ChevronDown,
  Baseline,
  Search,
  Zap,
  Send,
  Heart,
  ImageIcon,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createPublicClient } from "@/utils/supabase/public-client";
import { createDataClient } from "@/utils/supabase/data-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { DEFAULT_BLOG_POSTS } from "@/data/blog-defaults";

type AdminBlogNewViewProps = {
  postId?: string;
  isEdit?: boolean;
};

export default function AdminBlogNewView({ postId, isEdit = false }: AdminBlogNewViewProps = {}) {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [allowIndexing, setAllowIndexing] = useState(true);
  const [isPublished, setIsPublished] = useState(true);
  const [coverImage, setCoverImage] = useState("");
  const [manualUrl, setManualUrl] = useState("");
  const [category, setCategory] = useState("Packaging");
  const [author, setAuthor] = useState("HOF Pack Team");
  const [tags, setTags] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(Boolean(isEdit && postId));

  useEffect(() => {
    if (isEdit && postId) {
      loadPost(postId);
    }
  }, [isEdit, postId]);

  const loadPost = async (id: string) => {
    try {
      setLoading(true);
      const supabase = createPublicClient();
      const { data } = await withAbortableTimeout((signal) =>
        (supabase
          .from("blog_posts" as any)
          .select("*")
          .eq("id", id)
          .maybeSingle() as any)
          .abortSignal(signal)
      );
      const post =
        data ||
        Object.values(DEFAULT_BLOG_POSTS).find((p) => p.id === id || p.slug === id);

      if (post) {
        setTitle(post.title || "");
        setSlug(post.slug || "");
        setExcerpt(post.excerpt || "");
        setContent(post.content || "");
        setMetaTitle(post.meta_title || post.title || "");
        setMetaDescription(post.meta_description || post.excerpt || "");
        setIsPublished(Boolean(post.is_published));
        setCoverImage(post.cover_image || "");
        setManualUrl(post.cover_image || "");
        setCategory(post.category || "Packaging");
        setAuthor(post.author || "HOF Pack Team");
        setTags(Array.isArray(post.tags) ? post.tags.join(", ") : "");
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleAutoSlug = () => {
    const generated = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
    setSlug(generated);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setCoverImage(result);
          setManualUrl(result);
          toast({
            title: "Cover Image Selected",
            description: `${file.name} ready for article.`,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyManualUrl = () => {
    if (manualUrl.trim()) {
      setCoverImage(manualUrl.trim());
      toast({
        title: "Image URL Applied",
        description: "Cover image set from manual URL.",
      });
    }
  };

  // Checklist items
  const checklist = useMemo(() => {
    const items = [
      { label: "Title added", done: title.trim().length > 0 },
      { label: "Slug set", done: slug.trim().length > 0 },
      { label: "Excerpt written", done: excerpt.trim().length > 0 },
      { label: "Cover image uploaded", done: coverImage.trim().length > 0 || manualUrl.trim().length > 0 },
      { label: "Content written", done: content.trim().length > 0 },
      { label: "Meta description set", done: (metaDescription || excerpt).trim().length > 0 },
    ];
    const completedCount = items.filter((i) => i.done).length;
    const percentage = Math.round((completedCount / items.length) * 100);
    return { items, percentage };
  }, [title, slug, excerpt, coverImage, manualUrl, content, metaDescription]);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const handleSave = async (publishNow = false) => {
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Title is required",
        description: "Please enter a blog post title.",
      });
      return;
    }

    setSaving(true);
    const postSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    const finalPublish = publishNow ? true : isPublished;
    const finalImage = coverImage.trim() || manualUrl.trim() || "/images/blog/b361803d-d29d-4085-beff-a704ff75dc18.png";

    try {
      const supabase = createDataClient();
      const newId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `post-${Date.now()}`;
      
      const payload: Record<string, unknown> = {
        title: title.trim(),
        slug: postSlug,
        excerpt: excerpt.trim(),
        content: content.trim(),
        is_published: finalPublish,
        cover_image: finalImage,
        image: finalImage,
        category: category.trim() || "Packaging",
        author: author.trim() || "HOF Pack Team",
        published_at: finalPublish ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      };

      if (metaTitle.trim()) payload.meta_title = metaTitle.trim();
      if (metaDescription.trim()) payload.meta_description = metaDescription.trim();
      const parsedTags = tags.split(",").map((t) => t.trim()).filter(Boolean);
      if (parsedTags.length > 0) payload.tags = parsedTags;

      if (isEdit && postId) {
        let res = await (supabase
          .from("blog_posts" as any)
          .update(payload as any)
          .eq("id", postId) as any);

        if (res.error) {
          // Retry with clean minimal payload if optional columns don't exist
          const minimalPayload = {
            title: title.trim(),
            slug: postSlug,
            excerpt: excerpt.trim(),
            content: content.trim(),
            is_published: finalPublish,
            cover_image: finalImage,
            category: category.trim() || "Packaging",
            author: author.trim() || "HOF Pack Team",
            published_at: finalPublish ? new Date().toISOString() : null,
          };
          res = await (supabase
            .from("blog_posts" as any)
            .update(minimalPayload as any)
            .eq("id", postId) as any);
          if (res.error) throw res.error;
        }
      } else {
        payload.id = newId;
        payload.created_at = new Date().toISOString();

        let res = await (supabase
          .from("blog_posts" as any)
          .insert(payload as any) as any);

        if (res.error) {
          // Retry with minimal payload
          const minimalPayload = {
            id: newId,
            title: title.trim(),
            slug: postSlug,
            excerpt: excerpt.trim(),
            content: content.trim(),
            is_published: finalPublish,
            cover_image: finalImage,
            category: category.trim() || "Packaging",
            author: author.trim() || "HOF Pack Team",
            published_at: finalPublish ? new Date().toISOString() : null,
            created_at: new Date().toISOString(),
          };
          res = await (supabase
            .from("blog_posts" as any)
            .insert(minimalPayload as any) as any);
          if (res.error) throw res.error;
        }
      }

      toast({
        title: finalPublish ? "Post Published!" : "Draft Saved",
        description: `"${title}" has been saved successfully.`,
      });
      router.push("/admin/blog");
    } catch (err: unknown) {
      const errMsg =
        (err as Record<string, unknown>)?.message ||
        (err as Record<string, unknown>)?.details ||
        (err as Record<string, unknown>)?.error_description ||
        (err instanceof Error ? err.message : "Failed to save post.");

      toast({
        variant: "destructive",
        title: "Error saving post",
        description: String(errMsg),
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-12 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#e8732a] border-t-transparent animate-spin" />
          <p className="text-[13px] text-[#7a7672]">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 scroll-smooth bg-[#faf8f5]/60">
      <div className="max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(isPublished);
          }}
          className="flex flex-col gap-6"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between gap-4 flex-wrap pb-2">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/blog"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e0ddd6] bg-white text-[#7a7672] hover:bg-[#f5f3ee] hover:text-[#1a1a1a] transition-colors"
                title="Back to all posts"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div>
                <h1 className="font-display text-[17px] font-bold text-[#1a1a1a] leading-tight">
                  {isEdit ? "Edit Blog Post" : "New Blog Post"}
                </h1>
                <p className="text-[11px] text-[#7a7672]">
                  {isEdit ? "Update your published or draft article" : "Create a new article"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsPublished(false);
                  handleSave(false);
                }}
                disabled={saving}
                className="h-[38px] px-4 text-[12px] font-bold rounded-[8px] border border-[#e0ddd6] bg-white text-[#7a7672] hover:bg-[#f5f3ee] hover:text-[#1a1a1a] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                Draft
              </button>
              <button
                type="button"
                onClick={() => handleSave(isPublished)}
                disabled={saving}
                className="h-[38px] px-5 text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] inline-flex items-center gap-2 shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : isEdit ? "Save Changes" : "Save Post"}
              </button>
            </div>
          </div>

          {/* Form Layout: 2 Columns */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">
            {/* Left Column (Main Article Fields) */}
            <div className="flex flex-col gap-5">
              {/* 1. Title & Slug Card */}
              <div className="bg-white border border-[#e0ddd6] rounded-[16px] p-6 shadow-sm space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7a7672] mb-1.5">
                    TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your post title..."
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
                    className="w-full h-[46px] px-3.5 text-[14px] font-medium bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] placeholder:text-[#d0ccc4]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7a7672]">
                      SLUG *
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoSlug}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7a7672] hover:text-[#e8732a] cursor-pointer"
                    >
                      <Zap className="w-3 h-3 text-[#e8732a]" /> Auto
                    </button>
                  </div>
                  <div className="flex items-center rounded-[8px] border border-[#e0ddd6] bg-white overflow-hidden focus-within:border-[#2d5c3e]">
                    <span className="h-[40px] px-3.5 flex items-center text-[12px] font-mono text-[#7a7672] bg-[#faf8f5] border-r border-[#e0ddd6] select-none">
                      /blog/
                    </span>
                    <input
                      type="text"
                      placeholder="post-slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="flex-1 h-[40px] px-3 text-[13px] font-mono bg-white text-[#1a1a1a] placeholder:text-[#d0ccc4] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Excerpt Card */}
              <div className="bg-white border border-[#e0ddd6] rounded-[16px] p-6 shadow-sm space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7a7672]">
                  EXCERPT
                </label>
                <textarea
                  rows={3}
                  placeholder="Short description shown in post cards and search results..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full p-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] placeholder:text-[#d0ccc4] resize-y leading-relaxed"
                />
                <p className="text-[10px] text-[#aaa6a0]">
                  {excerpt.length} / 200 characters recommended
                </p>
              </div>

              {/* 3. Content Card (TinyMCE Layout) */}
              <div className="bg-white border border-[#e0ddd6] rounded-[16px] p-6 shadow-sm space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7a7672] mb-1">
                  CONTENT
                </label>

                <div className="border border-[#e0ddd6] rounded-[10px] bg-white overflow-hidden">
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
                      title="Insert Image"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
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
                      title="More"
                    >
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Editor Textarea */}
                  <textarea
                    rows={12}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write article content, headings, insights, or rich HTML..."
                    className="w-full p-4 text-[13px] text-[#1a1a1a] focus:outline-none resize-y min-h-[260px] font-sans placeholder:text-[#d0ccc4] leading-relaxed"
                  />

                  {/* Status Footer */}
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

              {/* 4. SEO & Meta Card */}
              <div className="bg-white border border-[#e0ddd6] rounded-[16px] p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#7a7672]" />
                  <h3 className="text-[13px] font-bold text-[#1a1a1a]">
                    SEO &amp; Meta
                  </h3>
                </div>

                {/* Google Search Preview Box */}
                <div className="p-4 rounded-[12px] bg-[#faf8f5] border border-[#e0ddd6] space-y-1">
                  <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#aaa6a0]">
                    SEARCH PREVIEW
                  </p>
                  <p className="text-[15px] font-medium text-[#1a0dab] leading-tight truncate">
                    {metaTitle.trim() || title.trim() || "Post title will appear here"}
                  </p>
                  <p className="text-[11px] font-medium text-[#006621]">
                    hofpack.com › blog › {slug.trim() || "post-slug"}
                  </p>
                  <p className="text-[12px] text-[#545454] leading-snug line-clamp-2">
                    {metaDescription.trim() ||
                      excerpt.trim() ||
                      "Your meta description will appear here in search results."}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7a7672]">
                      META TITLE
                    </label>
                    <span className="text-[10px] font-medium text-[#aaa6a0]">
                      {metaTitle.length}/60
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="SEO title (defaults to post title)"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] placeholder:text-[#d0ccc4]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7a7672]">
                      META DESCRIPTION
                    </label>
                    <span className="text-[10px] font-medium text-[#aaa6a0]">
                      {metaDescription.length}/160
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="SEO description (defaults to excerpt)"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="w-full p-3 text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] placeholder:text-[#d0ccc4] resize-none"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#e0ddd6]">
                  <div>
                    <p className="text-[12px] font-bold text-[#1a1a1a]">
                      Allow search engine indexing
                    </p>
                    <p className="text-[10.5px] text-[#7a7672]">
                      Page will appear in Google search results
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAllowIndexing(!allowIndexing)}
                    className={`relative w-11 h-6 rounded-full transition-colors shrink-0 cursor-pointer ${
                      allowIndexing ? "bg-[#2d5c3e]" : "bg-[#d8d4cc]"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                        allowIndexing ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="flex flex-col gap-5">
              {/* 1. Status Card */}
              <div className="bg-white border border-[#e0ddd6] rounded-[16px] p-5 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isPublished ? "bg-[#2d5c3e]" : "bg-[#e8732a]"
                      }`}
                    />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a1a1a]">
                      {isPublished ? "PUBLISHED" : "DRAFT"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPublished(!isPublished)}
                    className="text-[11px] font-bold text-[#e8732a] hover:underline cursor-pointer"
                  >
                    {isPublished ? "Draft" : "Publish"}
                  </button>
                </div>

                <div className="space-y-2 pt-1 border-t border-[#e0ddd6]/60">
                  <label
                    onClick={() => setIsPublished(true)}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#faf8f5] cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="status"
                      checked={isPublished}
                      onChange={() => setIsPublished(true)}
                      className="mt-0.5 text-[#2d5c3e] focus:ring-[#2d5c3e]"
                    />
                    <div>
                      <p className="text-[12px] font-bold text-[#1a1a1a] leading-none">
                        Published
                      </p>
                      <p className="text-[10px] text-[#7a7672] mt-0.5">
                        Visible to everyone on the blog
                      </p>
                    </div>
                  </label>

                  <label
                    onClick={() => setIsPublished(false)}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#faf8f5] cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="status"
                      checked={!isPublished}
                      onChange={() => setIsPublished(false)}
                      className="mt-0.5 text-[#e8732a] focus:ring-[#e8732a]"
                    />
                    <div>
                      <p className="text-[12px] font-bold text-[#1a1a1a] leading-none">
                        Draft
                      </p>
                      <p className="text-[10px] text-[#7a7672] mt-0.5">
                        Only visible to admins
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* 2. Cover Image Card */}
              <div className="bg-white border border-[#e0ddd6] rounded-[16px] p-5 shadow-sm space-y-3.5">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#7a7672]" />
                  <span className="text-[12px] font-bold text-[#1a1a1a]">
                    Cover Image
                  </span>
                </div>

                {/* Upload or Preview Box */}
                {coverImage.trim() ? (
                  <div className="relative aspect-[16/10] rounded-[12px] overflow-hidden border border-[#e0ddd6] bg-[#faf8f5] group">
                    <Image
                      src={coverImage.trim()}
                      alt="Cover image preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImage("");
                        setManualUrl("");
                      }}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all shadow cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#e0ddd6] rounded-[12px] bg-white p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#2d5c3e] hover:bg-[#faf8f5] transition-colors"
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
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[9.5px] font-bold uppercase tracking-wider text-[#7a7672] block mb-1">
                    MANUAL URL
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Or paste an image URL..."
                      value={manualUrl}
                      onChange={(e) => setManualUrl(e.target.value)}
                      onBlur={handleApplyManualUrl}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleApplyManualUrl();
                        }
                      }}
                      className="flex-1 h-[36px] px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-[6px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] placeholder:text-[#d0ccc4]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyManualUrl}
                      className="h-[36px] px-3 bg-[#f5f3ee] hover:bg-[#e0ddd6] text-[#1a1a1a] text-[11px] font-bold rounded-[6px] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. POST SETTINGS Card */}
              <div className="bg-white border border-[#e0ddd6] rounded-[16px] p-5 shadow-sm space-y-3.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a7672] block">
                  POST SETTINGS
                </span>

                <div>
                  <label className="text-[9.5px] font-bold uppercase tracking-wider text-[#7a7672] block mb-1">
                    CATEGORY
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-[38px] px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                  >
                    <option value="Packaging">Packaging</option>
                    <option value="Industry News">Industry News</option>
                    <option value="Custom Boxes">Custom Boxes</option>
                    <option value="Design Tips">Design Tips</option>
                    <option value="Eco-Friendly">Eco-Friendly</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9.5px] font-bold uppercase tracking-wider text-[#7a7672] block mb-1">
                    AUTHOR
                  </label>
                  <input
                    type="text"
                    placeholder="HOF Pack Team"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full h-[38px] px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                  />
                </div>

                <div>
                  <label className="text-[9.5px] font-bold uppercase tracking-wider text-[#7a7672] block mb-1">
                    TAGS
                  </label>
                  <input
                    type="text"
                    placeholder="packaging, branding, eco"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full h-[38px] px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                  />
                  <span className="text-[9px] text-[#aaa6a0] mt-0.5 block">
                    Comma-separated
                  </span>
                </div>
              </div>

              {/* 4. PRE-PUBLISH CHECKLIST Card */}
              <div className="bg-white border border-[#e0ddd6] rounded-[16px] p-5 shadow-sm space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a7672] block">
                  PRE-PUBLISH CHECKLIST
                </span>

                <div className="space-y-2">
                  {checklist.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px]">
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${
                          item.done
                            ? "bg-[#2d5c3e] border-[#2d5c3e] text-white"
                            : "border-[#d8d4cc] bg-white"
                        }`}
                      >
                        {item.done && <Check className="w-2.5 h-2.5" />}
                      </div>
                      <span
                        className={
                          item.done
                            ? "text-[#1a1a1a] font-medium"
                            : "text-[#aaa6a0]"
                        }
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#e0ddd6]/60 flex items-center justify-between text-[10px] text-[#7a7672]">
                  <span>Completeness</span>
                  <span className="font-bold text-[#1a1a1a]">
                    {checklist.percentage}%
                  </span>
                </div>
              </div>

              {/* 5. Bottom Publish CTA */}
              <button
                type="button"
                onClick={() => handleSave(true)}
                disabled={saving}
                className="w-full h-[44px] px-4 text-[13px] font-bold rounded-[10px] bg-[#e8732a] text-white hover:bg-[#c45a18] inline-flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                Publish Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
