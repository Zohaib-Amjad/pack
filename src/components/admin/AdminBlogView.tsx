"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  ExternalLink,
  Eye,
  EyeOff,
  Pen,
  Trash2,
  FileText,
} from "lucide-react";
import { DEFAULT_BLOG_POSTS, type DefaultBlogPost } from "@/data/blog-defaults";
import { createPublicClient } from "@/utils/supabase/public-client";
import { createDataClient } from "@/utils/supabase/data-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { useToast } from "@/hooks/use-toast";

export default function AdminBlogView() {
  const [activeTab, setActiveTab] = useState<"all" | "published" | "drafts">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<DefaultBlogPost[]>(Object.values(DEFAULT_BLOG_POSTS));
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const supabase = createPublicClient();
      const res = (await withAbortableTimeout((signal) =>
        (supabase
          .from("blog_posts" as any)
          .select("*")
          .abortSignal(signal) as any)
      )) as any;

      const fallbackList = Object.values(DEFAULT_BLOG_POSTS);
      const data = res?.data;

      if (!res?.error && Array.isArray(data) && data.length > 0) {
        const dbItems: DefaultBlogPost[] = data.map((item: any) => ({
          id: item.id || item.slug,
          slug: item.slug,
          title: item.title || "Untitled Post",
          category: item.category || "Packaging",
          excerpt: item.excerpt || "",
          author: item.author || "HOF Pack Team",
          published_at: item.published_at || item.created_at || new Date().toISOString(),
          read_time: item.read_time || "5 min read",
          cover_image:
            item.cover_image ||
            item.image ||
            item.coverImage ||
            "/images/blog/b361803d-d29d-4085-beff-a704ff75dc18.png",
          is_published: item.is_published !== false,
          tags: Array.isArray(item.tags) ? item.tags : [],
          content: item.content || "",
        }));

        dbItems.sort((a, b) => {
          const timeA = new Date(a.published_at || 0).getTime();
          const timeB = new Date(b.published_at || 0).getTime();
          return timeB - timeA;
        });

        const dbSlugs = new Set(dbItems.map((p) => p.slug));
        const remainingFallbacks = fallbackList.filter((p) => !dbSlugs.has(p.slug));
        setPosts([...dbItems, ...remainingFallbacks]);
      } else {
        setPosts(fallbackList);
      }
    } catch {
      setPosts(Object.values(DEFAULT_BLOG_POSTS));
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        (post.title || "").toLowerCase().includes(q) ||
        (post.category || "").toLowerCase().includes(q) ||
        (post.slug || "").toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (activeTab === "published") return post.is_published;
      if (activeTab === "drafts") return !post.is_published;
      return true;
    });
  }, [posts, searchQuery, activeTab]);

  const togglePublish = async (id: string, currentStatus: boolean, title: string) => {
    try {
      const supabase = createDataClient();
      await (supabase
        .from("blog_posts" as any)
        .update({ is_published: !currentStatus, updated_at: new Date().toISOString() } as any)
        .eq("id", id) as any);

      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_published: !currentStatus } : p))
      );
      toast({
        title: !currentStatus ? "Post published" : "Post unpublished",
        description: `"${title}" is now ${!currentStatus ? "live" : "saved as draft"}.`,
      });
    } catch {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_published: !currentStatus } : p))
      );
      toast({
        title: !currentStatus ? "Post published" : "Post unpublished",
        description: `"${title}" status updated.`,
      });
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const supabase = createDataClient();
      await (supabase.from("blog_posts" as any).delete().eq("id", id) as any);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast({
        title: "Post deleted",
        description: `"${title}" has been removed.`,
      });
    } catch {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast({
        title: "Post removed",
        description: `"${title}" removed.`,
      });
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0">
      {/* Subtabs Bar */}
      <div className="ptabs bg-white/70 backdrop-blur-sm border-b border-[#e0ddd6]/60 flex px-5 sm:px-6 shrink-0 overflow-x-auto gap-4 [scrollbar-width:thin]">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "all"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          All Posts
          {activeTab === "all" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("published")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "published"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Published
          {activeTab === "published" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("drafts")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "drafts"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Drafts
          {activeTab === "drafts" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
      </div>

      {/* Main View Area */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col gap-[14px]">
            {/* Search + New Post Button */}
            <div className="flex items-center justify-between gap-[14px]">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-[13px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#aaa6a0]" />
                <input
                  placeholder="Search posts..."
                  className="w-full h-[40px] pl-[38px] pr-[14px] text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/40 focus:ring-4 focus:ring-[#e8732a]/5 transition-all text-[#1a1a1a] placeholder:text-[#d8d4cc]"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Link
                href="/admin/blog/new"
                className="h-[40px] inline-flex items-center gap-[7px] px-4 text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] transition-all no-underline shadow-sm cursor-pointer"
              >
                <Plus className="w-[15px] h-[15px]" /> New Post
              </Link>
            </div>

            {/* Table Card */}
            <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                <div className="ch-l flex-1">
                  <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                    Blog Posts
                  </div>
                  <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                    {posts.length} total posts
                  </div>
                </div>
              </div>

              <div className="cb p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#e0ddd6]">
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider">
                          Post
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider hidden sm:table-cell">
                          Category
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider text-center">
                          Status
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e0ddd6]">
                      {filteredPosts.map((post) => {
                        const cover =
                          post.cover_image ||
                          "/images/blog/b361803d-d29d-4085-beff-a704ff75dc18.png";

                        return (
                          <tr
                            key={post.id}
                            className="hover:bg-[#f5f3ee] transition-colors group"
                          >
                            <td className="p-[12px_16px]">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-14 rounded-[6px] bg-[#f5f3ee] border border-[#e0ddd6] overflow-hidden shrink-0 relative">
                                  <Image
                                    alt={post.title || "Blog post"}
                                    fill
                                    unoptimized
                                    sizes="56px"
                                    className="object-cover"
                                    src={cover}
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[12px] font-bold text-[#1a1a1a] truncate max-w-[280px] sm:max-w-[400px]">
                                    {post.title}
                                  </p>
                                  <p className="text-[10px] text-[#aaa6a0] font-medium truncate">
                                    /blog/{post.slug}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-[12px_16px] text-[12px] font-semibold text-[#7a7672] hidden sm:table-cell">
                              {post.category}
                            </td>
                            <td className="p-[12px_16px] text-center">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-[4px] text-[9px] font-black uppercase tracking-wider ${
                                  post.is_published
                                    ? "bg-[#eaf2ed] text-[#2d5c3e]"
                                    : "bg-[#f0ede8] text-[#aaa6a0]"
                                }`}
                              >
                                {post.is_published ? "Published" : "Draft"}
                              </span>
                            </td>
                            <td className="p-[12px_16px] text-right">
                              <div className="flex items-center justify-end gap-1.5 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                <Link
                                  target="_blank"
                                  href={`/blog/${post.slug}`}
                                >
                                  <button
                                    type="button"
                                    className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-[#f5f3ee] transition-all cursor-pointer"
                                    title="View live post"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </button>
                                </Link>
                                <button
                                  type="button"
                                  onClick={() =>
                                    togglePublish(post.id, post.is_published, post.title)
                                  }
                                  title={post.is_published ? "Unpublish" : "Publish"}
                                  className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-[#eaf2ed] hover:text-[#2d5c3e] hover:border-[#b8dfc8] transition-all cursor-pointer"
                                >
                                  {post.is_published ? (
                                    <EyeOff className="w-3.5 h-3.5" />
                                  ) : (
                                    <Eye className="w-3.5 h-3.5" />
                                  )}
                                </button>
                                <Link href={`/admin/blog/${post.id}`}>
                                  <button
                                    type="button"
                                    className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-[#e8732a] hover:text-white hover:border-[#e8732a] transition-all cursor-pointer"
                                    title="Edit post"
                                  >
                                    <Pen className="w-3.5 h-3.5" />
                                  </button>
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(post.id, post.title)}
                                  className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all cursor-pointer"
                                  title="Delete post"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredPosts.length === 0 && !loading && (
                  <div className="p-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#f5f3ee] text-[#7a7672] flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-1">
                      No blog posts found
                    </h3>
                    <p className="text-[12px] text-[#7a7672] max-w-sm mx-auto mb-4">
                      {searchQuery
                        ? "No posts matched your search criteria."
                        : "No articles available in this tab."}
                    </p>
                    <Link
                      href="/admin/blog/new"
                      className="btn h-[36px] inline-flex items-center gap-[7px] px-4 text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Create New Post
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
