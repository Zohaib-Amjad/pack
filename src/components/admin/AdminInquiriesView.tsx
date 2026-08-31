"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Calendar,
  RefreshCw,
  User,
  Check,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  Phone,
  Clock,
  Send,
} from "lucide-react";
import { categories } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  product: string;
  date: string;
  status: "new" | "resolved";
  type: "Unfilled Form" | "Organic" | "Ig" | "Fb" | "Landing Page" | "Add to Cart";
  assignee: string;
  isPulsing?: boolean;
  message?: string;
  quantity?: string;
  dimensions?: string;
  campaign?: string;
  source?: string;
}

const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: "inq-1",
    name: "Ahmed",
    email: "ahmedw.reda96@gmail.com",
    phone: "+1 (555) 234-5678",
    product: "General Inquiry",
    date: "Aug 28, 2026",
    status: "new",
    type: "Unfilled Form",
    assignee: "Unassigned",
    isPulsing: true,
    message: "Need quote for custom printed boxes with expedited delivery to Chicago.",
    quantity: "5,000 pcs",
  },
  {
    id: "inq-2",
    name: "Noelle Wallace",
    email: "nwallace@formulatorsampleshop.com",
    phone: "+1 (555) 432-8765",
    product: "Custom Perfume Boxes",
    date: "Aug 28, 2026",
    status: "new",
    type: "Organic",
    assignee: "Unassigned",
    isPulsing: true,
    message: "Looking for soft-touch matte finish with gold foil stamping for a 50ml fragrance bottle.",
    quantity: "2,500 pcs",
    dimensions: '2.5" x 2.5" x 4.5"',
  },
  {
    id: "inq-3",
    name: "Owen Sorum",
    email: "owensorum@gmail.com",
    phone: "+1 (555) 321-9876",
    product: "Blank Cigarette Boxes",
    date: "Aug 27, 2026",
    status: "new",
    type: "Unfilled Form",
    assignee: "Unassigned",
    isPulsing: true,
    message: "Ordering blank tuck-top flip boxes in 18pt SBS board.",
    quantity: "10,000 pcs",
  },
  {
    id: "inq-4",
    name: "Aman Tyagi",
    email: "narmisa20@gmail.com",
    phone: "+1 (555) 654-1234",
    product: "Magnetic Closure Boxes",
    date: "Aug 27, 2026",
    status: "new",
    type: "Unfilled Form",
    assignee: "Unassigned",
    isPulsing: false,
    message: "Luxury rigid boxes with magnetic catch and custom EVA foam insert.",
    quantity: "1,000 pcs",
    dimensions: '8" x 6" x 3"',
  },
  {
    id: "inq-5",
    name: "Chris Fuccillo",
    email: "chris.fuccillo@gmail.com",
    phone: "+1 (555) 789-0123",
    product: "Cardboard Cigarette Boxes",
    date: "Aug 26, 2026",
    status: "new",
    type: "Ig",
    assignee: "Unassigned",
    isPulsing: false,
    campaign: "(hof pack) specified testing 2",
    source: "ig",
    message: "Need sample proof sent to our design studio in Austin.",
    quantity: "5,000 pcs",
  },
  {
    id: "inq-6",
    name: "Chris Fuccillo",
    email: "chris.fuccillo@gmail.com",
    phone: "+1 (555) 789-0123",
    product: "Cardboard Cigarette Boxes",
    date: "Aug 26, 2026",
    status: "new",
    type: "Unfilled Form",
    assignee: "Unassigned",
    isPulsing: false,
    message: "Follow up inquiry regarding CMYK color matching specifications.",
    quantity: "5,000 pcs",
  },
  {
    id: "inq-7",
    name: "Nikita Eruslanov",
    email: "purchase.prestigeconceptus@gmail.com",
    phone: "+1 (555) 890-1234",
    product: "Cannabis Pre-Roll Packaging",
    date: "Aug 25, 2026",
    status: "new",
    type: "Organic",
    assignee: "Unassigned",
    isPulsing: false,
    message: "Child-resistant certified slide-out slider boxes with certified certificate.",
    quantity: "15,000 pcs",
  },
  {
    id: "inq-8",
    name: "Nikita Eruslanov",
    email: "purchase.prestigeconceptus@gmail.com",
    phone: "+1 (555) 890-1234",
    product: "Contact page inquiry",
    date: "Aug 25, 2026",
    status: "new",
    type: "Unfilled Form",
    assignee: "Unassigned",
    isPulsing: false,
    message: "Requesting supplier wholesale rate sheet.",
    quantity: "10,000 pcs",
  },
  {
    id: "inq-9",
    name: "Beck Robertson",
    email: "BR10016364@GMAIL.COM",
    phone: "+1 (555) 901-2345",
    product: "Custom Cardboard Ammo Boxes",
    date: "Aug 24, 2026",
    status: "new",
    type: "Unfilled Form",
    assignee: "Unassigned",
    isPulsing: false,
    message: "Heavy-duty 24pt kraft cardboard boxes with partitioned insert.",
    quantity: "3,000 pcs",
  },
  {
    id: "inq-10",
    name: "Beck Robertson",
    email: "BR10016364@GMAIL.COM",
    phone: "+1 (555) 901-2345",
    product: "Custom Cardboard Ammo Boxes",
    date: "Aug 24, 2026",
    status: "new",
    type: "Unfilled Form",
    assignee: "Unassigned",
    isPulsing: false,
    message: "Duplicate confirmation with updated dimensions.",
    quantity: "3,000 pcs",
  },
];

const ITEMS_PER_PAGE = 10;

export default function AdminInquiriesView() {
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<
    "new" | "resolved" | "all" | "organic" | "landing" | "cart" | "unfilled"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRange, setSelectedRange] = useState<"7d" | "30d" | "90d" | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedAssignee, setSelectedAssignee] = useState("all");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [inquiries, setInquiries] = useState<InquiryItem[]>(INITIAL_INQUIRIES);
  const [viewingInquiry, setViewingInquiry] = useState<InquiryItem | null>(null);

  // Fetch live inquiries from database
  const loadInquiries = async (showToast = false) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.inquiries) && data.inquiries.length > 0) {
          setInquiries(data.inquiries);
        }
        if (showToast) {
          toast({
            title: "Inquiries Refreshed",
            description: `Loaded ${data.inquiries?.length || 0} live inquiries.`,
          });
        }
      }
    } catch (err) {
      console.warn("Failed to fetch inquiries:", err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadInquiries(false);
  }, []);

  // Compute live counts
  const counts = useMemo(() => {
    return {
      new: inquiries.filter((i) => i.status === "new").length,
      resolved: inquiries.filter((i) => i.status === "resolved").length,
      all: inquiries.length,
      organic: inquiries.filter((i) => i.type === "Organic").length,
      landing: inquiries.filter((i) => i.type === "Landing Page").length,
      cart: inquiries.filter((i) => i.type === "Add to Cart").length,
      unfilled: inquiries.filter((i) => i.type === "Unfilled Form").length,
    };
  }, [inquiries]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.product.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (activeTab === "new" && inq.status !== "new") return false;
      if (activeTab === "resolved" && inq.status !== "resolved") return false;
      if (activeTab === "organic" && inq.type !== "Organic") return false;
      if (activeTab === "landing" && inq.type !== "Landing Page") return false;
      if (activeTab === "cart" && inq.type !== "Add to Cart") return false;
      if (activeTab === "unfilled" && inq.type !== "Unfilled Form") return false;

      if (selectedCampaign !== "all" && inq.campaign !== selectedCampaign) return false;
      if (selectedSource !== "all" && inq.source !== selectedSource) return false;
      if (selectedAssignee !== "all" && inq.assignee !== selectedAssignee) return false;

      return true;
    });
  }, [
    inquiries,
    searchQuery,
    activeTab,
    selectedCampaign,
    selectedSource,
    selectedAssignee,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredInquiries.length / ITEMS_PER_PAGE));
  const paginatedInquiries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredInquiries.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredInquiries, currentPage]);

  const toggleSelectAll = () => {
    if (selectedRows.size === paginatedInquiries.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedInquiries.map((i) => i.id)));
    }
  };

  const toggleSelectRow = (id: string) => {
    const next = new Set(selectedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedRows(next);
  };

  const handleResolve = async (id: string, name: string) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "resolved", isPulsing: false } : i))
    );
    try {
      await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "resolved" }),
      });
    } catch {}
    toast({
      title: "Inquiry Resolved",
      description: `Marked inquiry from "${name}" as resolved.`,
    });
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete inquiry from "${name}"?`)) return;
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    try {
      await fetch(`/api/admin/inquiries?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch {}
    toast({
      title: "Inquiry Deleted",
      description: `Inquiry from "${name}" has been removed.`,
    });
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0">
      {/* Subtabs Bar */}
      <div className="ptabs bg-white/70 backdrop-blur-sm border-b border-[#e0ddd6]/60 flex px-5 sm:px-6 shrink-0 overflow-x-auto gap-4 [scrollbar-width:thin]">
        <button
          type="button"
          onClick={() => {
            setActiveTab("new");
            setCurrentPage(1);
          }}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "new" ? "text-[#2d5c3e]" : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          New Inquiries
          {counts.new > 0 && (
            <span className="inline-flex min-w-[18px] items-center justify-center rounded-full bg-[#e8732a] px-1.5 py-[1px] text-[9px] font-extrabold leading-none text-white">
              {counts.new}
            </span>
          )}
          {activeTab === "new" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("resolved");
            setCurrentPage(1);
          }}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "resolved"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Resolved
          {activeTab === "resolved" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("all");
            setCurrentPage(1);
          }}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "all" ? "text-[#2d5c3e]" : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          All Inquiries
          {activeTab === "all" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("organic");
            setCurrentPage(1);
          }}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "organic"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Organic
          {activeTab === "organic" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("landing");
            setCurrentPage(1);
          }}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "landing"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Landing Page
          {activeTab === "landing" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("cart");
            setCurrentPage(1);
          }}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "cart"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Add to Cart
          {activeTab === "cart" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("unfilled");
            setCurrentPage(1);
          }}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "unfilled"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Unfilled Form
          {counts.unfilled > 0 && (
            <span className="inline-flex min-w-[18px] items-center justify-center rounded-full bg-[#e8732a] px-1.5 py-[1px] text-[9px] font-extrabold leading-none text-white">
              {counts.unfilled}
            </span>
          )}
          {activeTab === "unfilled" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
      </div>

      {/* Main View Area */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col gap-[14px]">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-[14px]">
              <div className="relative min-w-[220px] flex-1">
                <Search className="absolute left-[13px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#aaa6a0]" />
                <input
                  placeholder="Search inquiries..."
                  className="w-full h-[40px] pl-[38px] pr-[14px] text-[13px] bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/40 focus:ring-4 focus:ring-[#e8732a]/5 transition-all outline-none text-[#1a1a1a] placeholder:text-[#d8d4cc]"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    toast({
                      title: "Date Filter",
                      description: "Custom date range calendar filter opened.",
                    })
                  }
                  className="inline-flex h-[40px] min-w-[210px] items-center gap-2 rounded-[8px] border bg-white px-3 text-[12px] font-semibold transition-all border-[#e0ddd6] text-[#7a7672] hover:border-[#d8d4cc] cursor-pointer"
                >
                  <Calendar className="h-3.5 w-3.5 text-[#e8732a]" />
                  Filter by date
                </button>
              </div>

              <div className="flex items-center gap-1 rounded-[8px] border border-[#e0ddd6] bg-white p-1">
                <button
                  type="button"
                  onClick={() => setSelectedRange("7d")}
                  className={`h-[30px] rounded-[6px] px-2.5 text-[11px] font-bold transition-all cursor-pointer ${
                    selectedRange === "7d"
                      ? "bg-[#e8732a] text-white"
                      : "text-[#7a7672] hover:bg-[#f5f3ee]"
                  }`}
                  title="Last 7d"
                >
                  7d
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRange("30d")}
                  className={`h-[30px] rounded-[6px] px-2.5 text-[11px] font-bold transition-all cursor-pointer ${
                    selectedRange === "30d"
                      ? "bg-[#e8732a] text-white"
                      : "text-[#7a7672] hover:bg-[#f5f3ee]"
                  }`}
                  title="Last 30d"
                >
                  30d
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRange("90d")}
                  className={`h-[30px] rounded-[6px] px-2.5 text-[11px] font-bold transition-all cursor-pointer ${
                    selectedRange === "90d"
                      ? "bg-[#e8732a] text-white"
                      : "text-[#7a7672] hover:bg-[#f5f3ee]"
                  }`}
                  title="Last 90d"
                >
                  90d
                </button>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-[40px] min-w-[170px] px-3 text-[12px] font-semibold bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/40 text-[#1a1a1a] cursor-pointer"
                title="Filter by landing page / product category"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedCampaign}
                onChange={(e) => {
                  setSelectedCampaign(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-[40px] min-w-[170px] px-3 text-[12px] font-semibold bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/40 text-[#1a1a1a] cursor-pointer"
                title="Filter by UTM campaign"
              >
                <option value="all">All Campaigns</option>
                <option value="(hof pack) specified testing 2">
                  (hof pack) specified testing 2
                </option>
                <option value="(hof pack) specified testing 2 – Copy">
                  (hof pack) specified testing 2 – Copy
                </option>
                <option value="120248008274760280">120248008274760280</option>
              </select>

              <select
                value={selectedSource}
                onChange={(e) => {
                  setSelectedSource(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-[40px] min-w-[160px] px-3 text-[12px] font-semibold bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/40 text-[#1a1a1a] cursor-pointer"
                title="Filter by UTM traffic source"
              >
                <option value="all">All Traffic Sources</option>
                <option value="fb">fb</option>
                <option value="ig">ig</option>
              </select>

              <select
                value={selectedAssignee}
                onChange={(e) => {
                  setSelectedAssignee(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-[40px] min-w-[190px] px-3 text-[12px] font-semibold bg-white border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#e8732a]/40 text-[#1a1a1a] cursor-pointer"
              >
                <option value="all">All Assignees</option>
                <option value="Chris Martin">Chris Martin</option>
                <option value="Steven Ignazio">Steven Ignazio</option>
                <option value="Mat Wilson">Mat Wilson</option>
              </select>

              <button
                type="button"
                disabled={isLoading}
                onClick={() => loadInquiries(true)}
                className="btn btn-xs h-[32px] p-[0_12px] text-[11px] font-bold text-[#7a7672] hover:text-[#1a1a1a] cursor-pointer inline-flex items-center disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin text-[#e8732a]" : ""}`} /> Refresh
              </button>
            </div>

            {/* List Card */}
            <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                <div className="ch-l flex-1">
                  <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                    {activeTab === "all"
                      ? "All Inquiries"
                      : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Inquiries`}
                  </div>
                </div>
              </div>

              <div className="cb p-0">
                <div className="flex flex-col divide-y divide-[#e0ddd6]">
                  {/* Select all header */}
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-[#faf8f5]">
                    <input
                      type="checkbox"
                      checked={
                        paginatedInquiries.length > 0 &&
                        selectedRows.size === paginatedInquiries.length
                      }
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-[#d8d4cc] accent-[#e8732a] cursor-pointer"
                      aria-label="Select all on this page"
                    />
                    <span className="text-[11px] font-semibold text-[#7a7672]">
                      Select all on this page
                    </span>
                  </div>

                  {paginatedInquiries.map((inq) => {
                    const isSelected = selectedRows.has(inq.id);
                    return (
                      <div
                        key={inq.id}
                        className={`flex items-start gap-0 bg-[#fff8f1] border-l-[3px] border-l-[#e8732a] ${
                          isSelected ? "bg-[#fef0e4]" : ""
                        }`}
                      >
                        <div className="flex items-center pl-4 pt-[14px]">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectRow(inq.id)}
                            className="h-4 w-4 rounded border-[#d8d4cc] accent-[#e8732a] cursor-pointer"
                            aria-label={`Select ${inq.name}`}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="lr flex items-start gap-4 p-[12px_16px] border-b border-[#e0ddd6] last:border-b-0 hover:bg-[#fff1e4] transition-colors border-b-[#f0e4d6]">
                            <div className="lr-c flex-1 min-w-0">
                              <div className="lr-n text-[12px] font-semibold text-[#1a1a1a]">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-bold">{inq.name}</span>

                                  {inq.isPulsing ? (
                                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-[1px] text-[9px] font-extrabold uppercase tracking-wider bg-[#e8732a] text-white">
                                      <span className="relative flex h-1.5 w-1.5">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                                      </span>
                                      New
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-[1px] text-[9px] font-extrabold uppercase tracking-wider bg-[#fff3e9] text-[#b85a1f]">
                                      New
                                    </span>
                                  )}

                                  {inq.type === "Unfilled Form" ? (
                                    <span className="rounded-full px-2 py-[1px] text-[9px] font-bold uppercase tracking-wider bg-[#fef3c7] text-[#92400e]">
                                      Unfilled Form
                                    </span>
                                  ) : inq.type === "Organic" ? (
                                    <span className="rounded-full px-2 py-[1px] text-[9px] font-bold uppercase tracking-wider bg-[#eaf2ed] text-[#2d5c3e]">
                                      Organic
                                    </span>
                                  ) : inq.type === "Ig" ? (
                                    <span className="rounded-full px-2 py-[1px] text-[9px] font-bold uppercase tracking-wider bg-[#eaf2ed] text-[#2d5c3e]">
                                      Ig
                                    </span>
                                  ) : (
                                    <span className="rounded-full px-2 py-[1px] text-[9px] font-bold uppercase tracking-wider bg-[#f5f3ee] text-[#7a7672]">
                                      {inq.type}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="lr-s text-[11px] text-[#aaa6a0] mt-[2px] leading-relaxed">
                                <span>
                                  {inq.email} • {inq.product}
                                </span>
                              </div>
                            </div>

                            <div className="lr-a flex gap-2 items-center shrink-0">
                              <span className="bdg p-[2px_10px] rounded-[20px] text-[9px] font-extrabold uppercase tracking-wider bg-[#eaf2ed] text-[#2d5c3e]">
                                {inq.status}
                              </span>

                              <div className="flex items-center gap-3">
                                <div className="flex min-w-[74px] flex-col items-center">
                                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-7 w-7 border border-[#e0ddd6]">
                                    <span className="flex h-full w-full items-center justify-center rounded-full bg-[#f5f3ee] text-[#aaa6a0]">
                                      <User className="h-3.5 w-3.5" />
                                    </span>
                                  </span>
                                  <span className="mt-1 text-[9px] font-semibold leading-tight text-[#7a7672] text-center">
                                    {inq.assignee}
                                  </span>
                                </div>

                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setViewingInquiry(inq)}
                                    className="btn btn-sm h-[28px] p-[0_12px] text-[11px] font-bold rounded-[6px] bg-[#e8732a] text-white hover:bg-[#c45a18] cursor-pointer"
                                  >
                                    View
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleResolve(inq.id, inq.name)
                                    }
                                    className="btn btn-sm h-[28px] p-[0_8px] text-[11px] font-bold rounded-[6px] border border-[#e0ddd6] text-[#7a7672] hover:bg-[#f5f3ee] cursor-pointer"
                                    title="Mark as resolved"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDelete(inq.id, inq.name)
                                    }
                                    className="btn btn-sm h-[28px] p-[0_8px] text-[11px] font-bold rounded-[6px] border border-[#f0c9c3] text-[#b83c2b] hover:bg-[#fdecea] cursor-pointer"
                                    title="Delete inquiry"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pagination Box */}
            <div className="p-[12px_16px] flex items-center justify-between border border-[#e0ddd6] rounded-[8px] bg-white">
              <div className="text-[11px] text-[#aaa6a0]">
                Page <span className="font-bold text-[#1a1a1a]">{currentPage}</span> of{" "}
                <span className="font-bold text-[#1a1a1a]">{totalPages}</span> (
                {filteredInquiries.length} total)
              </div>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed hover:bg-[#f5f3ee]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="w-7 h-7 bg-white border border-[#d8d4cc] rounded-md flex items-center justify-center text-[#7a7672] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed hover:bg-[#f5f3ee]"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {viewingInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#e0ddd6] overflow-hidden">
            <div className="p-5 border-b border-[#e0ddd6] flex items-center justify-between bg-[#f5f3ee]/50">
              <div>
                <h3 className="text-[16px] font-bold text-[#1a1a1a]">
                  Inquiry Details
                </h3>
                <p className="text-[11px] text-[#aaa6a0]">
                  Received on {viewingInquiry.date}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewingInquiry(null)}
                className="p-1.5 rounded-lg hover:bg-white text-[#7a7672]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-[13px]">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#f5f3ee]/40 border border-[#e0ddd6]">
                  <span className="text-[10px] font-bold uppercase text-[#aaa6a0] block mb-0.5">
                    Customer
                  </span>
                  <p className="font-bold text-[#1a1a1a]">{viewingInquiry.name}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#f5f3ee]/40 border border-[#e0ddd6]">
                  <span className="text-[10px] font-bold uppercase text-[#aaa6a0] block mb-0.5">
                    Product / Topic
                  </span>
                  <p className="font-bold text-[#1a1a1a]">{viewingInquiry.product}</p>
                </div>
              </div>

              <div className="space-y-2 p-3.5 rounded-xl bg-[#f5f3ee]/30 border border-[#e0ddd6]">
                <div className="flex items-center gap-2 text-[12px] text-[#4a4a4a]">
                  <Mail className="w-3.5 h-3.5 text-[#e8732a]" />
                  <a
                    href={`mailto:${viewingInquiry.email}`}
                    className="hover:underline text-[#2d5c3e] font-semibold"
                  >
                    {viewingInquiry.email}
                  </a>
                </div>
                {viewingInquiry.phone && (
                  <div className="flex items-center gap-2 text-[12px] text-[#4a4a4a]">
                    <Phone className="w-3.5 h-3.5 text-[#e8732a]" />
                    <span>{viewingInquiry.phone}</span>
                  </div>
                )}
                {viewingInquiry.quantity && (
                  <div className="flex items-center gap-2 text-[12px] text-[#4a4a4a]">
                    <span className="font-bold text-[10px] uppercase text-[#aaa6a0]">
                      Quantity:
                    </span>
                    <span>{viewingInquiry.quantity}</span>
                  </div>
                )}
                {viewingInquiry.dimensions && (
                  <div className="flex items-center gap-2 text-[12px] text-[#4a4a4a]">
                    <span className="font-bold text-[10px] uppercase text-[#aaa6a0]">
                      Dimensions:
                    </span>
                    <span>{viewingInquiry.dimensions}</span>
                  </div>
                )}
              </div>

              {viewingInquiry.message && (
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#aaa6a0] block mb-1">
                    Message Notes
                  </span>
                  <p className="p-3 rounded-xl bg-[#faf8f5] border border-[#e0ddd6] text-[#4a4a4a] text-[12px] leading-relaxed">
                    {viewingInquiry.message}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#e0ddd6] bg-[#f5f3ee]/30 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setViewingInquiry(null)}
                className="px-4 h-9 rounded-lg border border-[#e0ddd6] text-[12px] font-bold text-[#7a7672] hover:bg-white cursor-pointer"
              >
                Close
              </button>
              <a
                href={`mailto:${viewingInquiry.email}?subject=Regarding your inquiry for ${viewingInquiry.product}`}
                className="px-4 h-9 rounded-lg bg-[#e8732a] text-white text-[12px] font-bold hover:bg-[#c45a18] flex items-center gap-2 cursor-pointer no-underline"
              >
                <Send className="w-3.5 h-3.5" /> Reply to Customer
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
