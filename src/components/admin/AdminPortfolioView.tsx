"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Search, Plus, Pen, Trash2, LayoutGrid, List, FolderOpen } from "lucide-react";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { useToast } from "@/hooks/use-toast";
import AdminPortfolioModal from "@/components/admin/AdminPortfolioItemForm";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  created_at?: string;
}

const DEFAULT_ITEMS: PortfolioItem[] = [
  {
    id: "77e64c84-226c-41fa-a088-76b1811d25c2",
    title: "Premium Gift Packaging",
    category: "Rigid Boxes",
    image_url: "/images/products/rigid-boxes/magnetic-rigid-box.png",
    created_at: "2026-08-20T10:00:00Z",
  },
  {
    id: "d55e72df-2eb7-4807-bc68-bbf9fa23e9da",
    title: "Sustainable Range",
    category: "Eco-Friendly",
    image_url: "/images/products/eco-friendly-boxes/kraft-mailer-box.png",
    created_at: "2026-08-21T11:00:00Z",
  },
  {
    id: "029aea35-53e9-4402-8cf1-d35f186fbcf8",
    title: "Luxury Brand Collection 1",
    category: "Custom Boxes",
    image_url: "/images/products/custom-boxes/custom-cardboard-boxes.png",
    created_at: "2026-08-22T12:00:00Z",
  },
  {
    id: "d86ca408-185e-4ae9-8faa-21d0632c45c4",
    title: "E-Commerce Mailers",
    category: "Mailer Boxes",
    image_url: "/images/products/mailer-boxes/custom-printed-mailer-boxes.png",
    created_at: "2026-08-23T14:00:00Z",
  },
  {
    id: "125ca7c3-e37d-4e5f-9c1a-cc27f9ce2c15",
    title: "Cosmetics Line",
    category: "Custom Boxes",
    image_url: "/images/products/retail-boxes/cosmetic-boxes.png",
    created_at: "2026-08-24T16:00:00Z",
  },
];

export default function AdminPortfolioView() {
  const [activeTab, setActiveTab] = useState<"gallery" | "list">("gallery");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<PortfolioItem[]>(DEFAULT_ITEMS);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const supabase = createPublicClient();
      const { data, error } = (await withAbortableTimeout((signal) =>
        (supabase
          .from("portfolio_items" as any)
          .select("*")
          .order("created_at", { ascending: false })
          .abortSignal(signal) as any)
      )) as any;

      if (!error && data && data.length > 0) {
        setItems(data);
      }
    } catch {
      // Fallback to default items
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [items, searchQuery]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const supabase = createPublicClient();
      await (supabase.from("portfolio_items" as any).delete().eq("id", id) as any);
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast({
        title: "Project deleted",
        description: `"${title}" has been removed from your portfolio.`,
      });
    } catch {
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast({
        title: "Project removed",
        description: `"${title}" removed.`,
      });
    }
  };

  const handleOpenNew = () => {
    setEditItemId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (id: string) => {
    setEditItemId(id);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0">
      {/* Subtabs Bar */}
      <div className="ptabs bg-white/70 backdrop-blur-sm border-b border-[#e0ddd6]/60 flex px-5 sm:px-6 shrink-0 overflow-x-auto gap-4 [scrollbar-width:thin]">
        <button
          type="button"
          onClick={() => setActiveTab("gallery")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "gallery"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          Gallery View
          {activeTab === "gallery" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("list")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "list"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          <List className="w-3.5 h-3.5" />
          Detailed List
          {activeTab === "list" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
      </div>

      {/* Main View Area */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col gap-[14px]">
            {/* Action Bar: Search & New Project */}
            <div className="flex items-center justify-between gap-[14px]">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-[13px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#aaa6a0]" />
                <input
                  placeholder="Search projects..."
                  className="w-full h-[40px] pl-[38px] pr-[14px] text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/40 focus:ring-4 focus:ring-[#e8732a]/5 transition-all outline-none text-[#1a1a1a] placeholder:text-[#d8d4cc]"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={handleOpenNew}
                className="btn btn-p h-[40px] inline-flex items-center gap-[7px] p-[7px_16px] text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] transition-all cursor-pointer shadow-sm"
              >
                <Plus className="w-[15px] h-[15px]" /> New Project
              </button>
            </div>

            {/* Gallery View */}
            {activeTab === "gallery" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[14px]">
                {filteredItems.map((project: any) => {
                  const projectImage =
                    (typeof project.image_url === "string" && project.image_url.trim().length > 0 && project.image_url.trim()) ||
                    (Array.isArray(project.images) && project.images.length > 0 && project.images[0]) ||
                    (typeof project.image === "string" && project.image.trim().length > 0 && project.image.trim()) ||
                    (typeof project.featured_image === "string" && project.featured_image.trim().length > 0 && project.featured_image.trim()) ||
                    "/images/products/custom-boxes/custom-cardboard-boxes.png";

                  return (
                    <div
                      key={project.id}
                      className="p-card group relative aspect-[4/5] rounded-[10px] overflow-hidden border border-[#e0ddd6] bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <Image
                        alt={project.title}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        src={projectImage}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <div className="translate-y-2 group-hover:translate-y-0 transition-transform">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold text-[#e8732a] uppercase tracking-widest">
                              {project.category}
                            </span>
                            <div className="flex gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(project.id)}
                                className="w-7 h-7 bg-white/20 backdrop-blur-md rounded-md flex items-center justify-center text-white hover:bg-[#e8732a] transition-all cursor-pointer"
                                title="Edit project"
                              >
                                <Pen className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(project.id, project.title)}
                                className="w-7 h-7 bg-white/20 backdrop-blur-md rounded-md flex items-center justify-center text-white hover:bg-red-500 transition-all cursor-pointer"
                                title="Delete project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <h3 className="text-[14px] font-bold text-white mt-1">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Detailed List View */}
            {activeTab === "list" && (
              <div className="card bg-white border border-[#e0ddd6] rounded-[12px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[12px]">
                    <thead className="bg-[#f5f3ee]/60 border-b border-[#e0ddd6] text-[#7a7672] font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Project</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Created Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e0ddd6]">
                      {filteredItems.map((project: any) => {
                        const projectImage =
                          (typeof project.image_url === "string" && project.image_url.trim().length > 0 && project.image_url.trim()) ||
                          (Array.isArray(project.images) && project.images.length > 0 && project.images[0]) ||
                          (typeof project.image === "string" && project.image.trim().length > 0 && project.image.trim()) ||
                          (typeof project.featured_image === "string" && project.featured_image.trim().length > 0 && project.featured_image.trim()) ||
                          "/images/products/custom-boxes/custom-cardboard-boxes.png";

                        return (
                          <tr key={project.id} className="hover:bg-[#faf8f5] transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-md overflow-hidden bg-[#e0ddd6] shrink-0">
                                  <Image
                                    alt={project.title}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                    src={projectImage}
                                  />
                                </div>
                                <span className="font-bold text-[#1a1a1a]">{project.title}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex rounded-full bg-[#fdf4ee] px-2.5 py-1 text-[10px] font-bold text-[#e8732a] uppercase tracking-wider">
                                {project.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-[#7a7672]">
                              {project.created_at
                                ? new Date(project.created_at).toLocaleDateString()
                                : "Recent"}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEdit(project.id)}
                                  className="w-7 h-7 rounded-md border border-[#e0ddd6] bg-white flex items-center justify-center text-[#7a7672] hover:bg-[#f5f3ee] hover:text-[#1a1a1a] transition-all cursor-pointer"
                                  title="Edit project"
                                >
                                  <Pen className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(project.id, project.title)}
                                  className="w-7 h-7 rounded-md border border-[#e0ddd6] bg-white flex items-center justify-center text-[#7a7672] hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all cursor-pointer"
                                  title="Delete project"
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
              </div>
            )}

            {filteredItems.length === 0 && !loading && (
              <div className="bg-white rounded-2xl p-12 border border-[#e0ddd6] text-center">
                <div className="w-12 h-12 rounded-full bg-[#f5f3ee] text-[#7a7672] flex items-center justify-center mx-auto mb-3">
                  <FolderOpen className="w-6 h-6" />
                </div>
                <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-1">
                  No projects found
                </h3>
                <p className="text-[13px] text-[#7a7672] max-w-sm mx-auto mb-4">
                  {searchQuery
                    ? `No projects matching "${searchQuery}".`
                    : "Your portfolio is empty. Add your first showcase project!"}
                </p>
                <button
                  type="button"
                  onClick={handleOpenNew}
                  className="btn btn-p h-[36px] inline-flex items-center gap-1.5 px-4 text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      <AdminPortfolioModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchItems}
        itemId={editItemId || undefined}
        isEdit={Boolean(editItemId)}
      />
    </div>
  );
}
