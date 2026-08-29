"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  Eye,
  EyeOff,
  Pen,
  Trash2,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  fetchAllLibraryItems,
  saveLibraryItem,
  deleteLibraryItem,
  type LibraryItemRecord,
} from "@/lib/library-service";
import { DEFAULT_LIBRARY_ITEMS } from "@/data/library-defaults";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 10;

export default function AdminLibraryView() {
  const [activeTab, setActiveTab] = useState<"all" | "published" | "drafts">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<LibraryItemRecord[]>(DEFAULT_LIBRARY_ITEMS as any);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await fetchAllLibraryItems();
      setItems(data);
    } catch {
      setItems(DEFAULT_LIBRARY_ITEMS as any);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.section_name && item.section_name.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (activeTab === "published") return item.is_published;
      if (activeTab === "drafts") return !item.is_published;
      return true;
    });
  }, [items, searchQuery, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const togglePublish = async (item: LibraryItemRecord) => {
    const newStatus = !item.is_published;
    const updated = { ...item, is_published: newStatus };
    setItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
    await saveLibraryItem(updated);
    toast({
      title: newStatus ? "Item published" : "Item unpublished",
      description: `"${item.title}" is now ${newStatus ? "visible in library" : "hidden"}.`,
    });
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    await deleteLibraryItem(id);
    toast({
      title: "Item deleted",
      description: `"${title}" has been removed from the library.`,
    });
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0">
      {/* Subtabs Bar */}
      <div className="ptabs bg-white/70 backdrop-blur-sm border-b border-[#e0ddd6]/60 flex px-5 sm:px-6 shrink-0 overflow-x-auto gap-4 [scrollbar-width:thin]">
        <button
          type="button"
          onClick={() => {
            setActiveTab("all");
            setCurrentPage(1);
          }}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "all"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          All Items
          {activeTab === "all" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("published");
            setCurrentPage(1);
          }}
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
          onClick={() => {
            setActiveTab("drafts");
            setCurrentPage(1);
          }}
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
            {/* Search + New Item Button */}
            <div className="flex items-center justify-between gap-[14px]">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-[13px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#aaa6a0]" />
                <input
                  placeholder="Search library items..."
                  className="w-full h-[40px] pl-[38px] pr-[14px] text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/40 focus:ring-4 focus:ring-[#e8732a]/5 transition-all text-[#1a1a1a] placeholder:text-[#d8d4cc]"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <Link
                href="/admin/library/new"
                className="h-[40px] inline-flex items-center gap-[7px] px-4 text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] transition-all no-underline shadow-sm cursor-pointer"
              >
                <Plus className="w-[15px] h-[15px]" /> New Library Item
              </Link>
            </div>

            {/* Table Card */}
            <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                <div className="ch-l flex-1">
                  <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                    Library Items
                  </div>
                  <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                    {items.length} total items
                  </div>
                </div>
              </div>

              <div className="cb p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#e0ddd6]">
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider">
                          Item
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider hidden sm:table-cell">
                          Category
                        </th>
                        <th className="p-[10px_16px] text-[10px] font-bold text-[#aaa6a0] uppercase tracking-wider text-center">
                          Order
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
                      {paginatedItems.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-[#f5f3ee] transition-colors group"
                        >
                          <td className="p-[12px_16px]">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-14 rounded-[6px] bg-[#f5f3ee] border border-[#e0ddd6] overflow-hidden shrink-0 relative flex items-center justify-center">
                                <Image
                                  alt={item.title}
                                  fill
                                  unoptimized
                                  sizes="56px"
                                  className="object-contain p-1"
                                  src={item.image || "/Pillow Gift Boxes.png"}
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[12px] font-bold text-[#1a1a1a] truncate max-w-[280px] sm:max-w-[400px]">
                                  {item.title}
                                </p>
                                <p className="text-[10px] text-[#aaa6a0] font-medium truncate max-w-[280px] sm:max-w-[400px]">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-[12px_16px] text-[12px] font-semibold text-[#7a7672] hidden sm:table-cell">
                            {item.section_name || item.category || "General"}
                          </td>
                          <td className="p-[12px_16px] text-center text-[12px] font-mono font-medium text-[#7a7672]">
                            {item.order}
                          </td>
                          <td className="p-[12px_16px] text-center">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-[4px] text-[9px] font-black uppercase tracking-wider ${
                                item.is_published
                                  ? "bg-[#eaf2ed] text-[#2d5c3e]"
                                  : "bg-[#f0ede8] text-[#aaa6a0]"
                              }`}
                            >
                              {item.is_published ? "Published" : "Draft"}
                            </span>
                          </td>
                          <td className="p-[12px_16px] text-right">
                            <div className="flex items-center justify-end gap-1.5 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                              <button
                                type="button"
                                onClick={() => togglePublish(item)}
                                title={item.is_published ? "Unpublish" : "Publish"}
                                className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-[#eaf2ed] hover:text-[#2d5c3e] hover:border-[#b8dfc8] transition-all cursor-pointer"
                              >
                                {item.is_published ? (
                                  <EyeOff className="w-3.5 h-3.5" />
                                ) : (
                                  <Eye className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <Link href={`/admin/library/${item.id}`}>
                                <button
                                  type="button"
                                  className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-[#e8732a] hover:text-white hover:border-[#e8732a] transition-all cursor-pointer"
                                  title="Edit item"
                                >
                                  <Pen className="w-3.5 h-3.5" />
                                </button>
                              </Link>
                              <button
                                type="button"
                                onClick={() => handleDelete(item.id, item.title)}
                                className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all cursor-pointer"
                                title="Delete item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredItems.length === 0 && !loading && (
                  <div className="p-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#f5f3ee] text-[#7a7672] flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-1">
                      No library items found
                    </h3>
                    <p className="text-[12px] text-[#7a7672] max-w-sm mx-auto mb-4">
                      {searchQuery
                        ? "No items matched your search criteria."
                        : "No items available in this tab."}
                    </p>
                    <Link
                      href="/admin/library/new"
                      className="btn h-[36px] inline-flex items-center gap-[7px] px-4 text-[12px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Create New Item
                    </Link>
                  </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="p-4 border-t border-[#e0ddd6] flex items-center justify-between">
                    <p className="text-[11px] text-[#aaa6a0] font-medium">
                      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                      {Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} of{" "}
                      {filteredItems.length} items
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="w-7 h-7 rounded border border-[#e0ddd6] bg-white flex items-center justify-center text-[#7a7672] hover:bg-[#f5f3ee] disabled:opacity-40 cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] font-bold px-2 text-[#1a1a1a]">
                        {currentPage} / {totalPages}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="w-7 h-7 rounded border border-[#e0ddd6] bg-white flex items-center justify-center text-[#7a7672] hover:bg-[#f5f3ee] disabled:opacity-40 cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
