"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  RefreshCw,
  Save,
  Plus,
  Trash2,
  Check,
  Star,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCmsHomeSection } from "@/hooks/useCmsHomeSection";

interface ReviewItem {
  id: string;
  name: string;
  company: string;
  initials: string;
  rating: number;
  highlightPill: string;
  quote: string;
  column: "left" | "right" | "auto";
  active: boolean;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Sarah M.",
    company: "Glow Cosmetics",
    initials: "SM",
    rating: 5,
    highlightPill: "Customers notice the difference",
    quote: "We switched to HOF Pack last year and the difference is night and day. Our customers actually comment on the packaging now. That never happened before.",
    column: "left",
    active: true,
  },
  {
    id: "rev-2",
    name: "James L.",
    company: "TechGear Pro",
    initials: "JL",
    rating: 5,
    highlightPill: "Small runs, big quality",
    quote: "As a startup, we needed small quantities without sacrificing quality. HOF Pack delivered exactly that. 200 boxes that looked like we ordered 20,000.",
    column: "right",
    active: true,
  },
  {
    id: "rev-3",
    name: "Maria R.",
    company: "Organic Eats",
    initials: "MR",
    rating: 5,
    highlightPill: "Real eco commitment",
    quote: "They actually use recycled materials. It's not just marketing. The boxes arrived a full week early, and our customers love that everything is compostable.",
    column: "left",
    active: true,
  },
  {
    id: "rev-4",
    name: "David K.",
    company: "LuxeWick Candles",
    initials: "DK",
    rating: 5,
    highlightPill: "Looks like luxury",
    quote: "The rigid boxes with magnetic closure blew us away. People think we're a luxury brand now. The quality is that good.",
    column: "right",
    active: true,
  },
  {
    id: "rev-5",
    name: "Emily T.",
    company: "Rise & Grind Coffee",
    initials: "ET",
    rating: 5,
    highlightPill: "Three-time repeat customer",
    quote: "From our first call to delivery, everything just worked. The bags keep our beans fresh and the print quality is spot on. We've reordered three times already.",
    column: "left",
    active: true,
  },
];

export default function AdminTestimonialsView() {
  const { toast } = useToast();
  const { local, setLocal, save, saving, refetch } = useCmsHomeSection("testimonials");

  const [sectionLabel, setSectionLabel] = useState("Real Reviews");
  const [description, setDescription] = useState("Here's what our customers have to say after working with us.");
  const [titleLead, setTitleLead] = useState("Don't Take Our Word");
  const [titleAccent, setTitleAccent] = useState("for It");

  const [primaryCtaLabel, setPrimaryCtaLabel] = useState("Customize now");
  const [secondaryCtaLabel, setSecondaryCtaLabel] = useState("Browse all products");
  const [secondaryCtaHref, setSecondaryCtaHref] = useState("/our-products");
  const [trustpilotLinkLabel, setTrustpilotLinkLabel] = useState("See all reviews on Trustpilot");
  const [trustpilotLinkHref, setTrustpilotLinkHref] = useState("https://www.trustpilot.com/review/hofpack.com");

  const [leftColumnDirection, setLeftColumnDirection] = useState<"up" | "down">("up");
  const [rightColumnDirection, setRightColumnDirection] = useState<"up" | "down">("down");
  const [scrollSpeed, setScrollSpeed] = useState<"slow" | "normal" | "fast">("normal");

  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (local) {
      setSectionLabel(typeof local.sectionLabel === "string" ? local.sectionLabel : "Real Reviews");
      setDescription(
        typeof local.description === "string"
          ? local.description
          : "Here's what our customers have to say after working with us."
      );
      setTitleLead(typeof local.titleLead === "string" ? local.titleLead : "Don't Take Our Word");
      setTitleAccent(typeof local.titleAccent === "string" ? local.titleAccent : "for It");

      setPrimaryCtaLabel(typeof local.primaryCtaLabel === "string" ? local.primaryCtaLabel : "Customize now");
      setSecondaryCtaLabel(typeof local.secondaryCtaLabel === "string" ? local.secondaryCtaLabel : "Browse all products");
      setSecondaryCtaHref(typeof local.secondaryCtaHref === "string" ? local.secondaryCtaHref : "/our-products");
      setTrustpilotLinkLabel(typeof local.trustpilotLinkLabel === "string" ? local.trustpilotLinkLabel : "See all reviews on Trustpilot");
      setTrustpilotLinkHref(typeof local.trustpilotLinkHref === "string" ? local.trustpilotLinkHref : "https://www.trustpilot.com/review/hofpack.com");

      setLeftColumnDirection(local.leftColumnDirection === "down" ? "down" : "up");
      setRightColumnDirection(local.rightColumnDirection === "up" ? "up" : "down");
      setScrollSpeed(local.scrollSpeed === "fast" ? "fast" : local.scrollSpeed === "slow" ? "slow" : "normal");

      if (Array.isArray(local.items)) {
        setReviews(
          local.items.map((r, idx) => ({
            id: r.id || `rev-${idx + 1}-${Date.now()}`,
            name: typeof r.name === "string" ? r.name : "",
            company: typeof r.company === "string" ? r.company : "",
            initials: typeof r.initials === "string" ? r.initials : "",
            rating: typeof r.rating === "number" ? r.rating : 5,
            highlightPill: typeof r.highlight === "string" ? r.highlight : "",
            quote: typeof r.text === "string" ? r.text : "",
            column: r.column === "left" || r.column === "right" ? r.column : "auto",
            active: r.active !== false,
          }))
        );
      }
    }
  }, [local]);

  const handleToggleReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const handleUpdateReview = (id: string, field: keyof ReviewItem, val: any) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  const handleMoveReview = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= reviews.length) return;
    setReviews((prev) => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  const handleAddReview = () => {
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: "",
      company: "",
      initials: "",
      rating: 5,
      highlightPill: "",
      quote: "",
      column: "auto",
      active: true,
    };
    setReviews((prev) => [newRev, ...prev]);
    toast({
      title: "New Review Added",
      description: "Added a new review card at the top. Fill in details and click Save & publish.",
    });
  };

  const handleRemoveReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const handleReset = () => {
    if (refetch) {
      refetch();
    } else {
      setSectionLabel("TESTIMONIALS");
      setDescription("Real Trustpilot reviews from brands who package with HOF Pack.");
      setTitleLead("Trusted by");
      setTitleAccent("Growing Brands");
      setPrimaryCtaLabel("Customize now");
      setSecondaryCtaLabel("Browse all products");
      setSecondaryCtaHref("/our-products");
      setTrustpilotLinkLabel("See all reviews on Trustpilot");
      setTrustpilotLinkHref("https://www.trustpilot.com/review/hofpack.com");
      setLeftColumnDirection("up");
      setRightColumnDirection("down");
      setScrollSpeed("normal");
      setReviews(INITIAL_REVIEWS);
    }
    toast({
      title: "Reset from server",
      description: "Restored latest Testimonials settings from Supabase.",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      sectionLabel,
      titleLead,
      titleAccent,
      description,
      primaryCtaLabel,
      secondaryCtaLabel,
      secondaryCtaHref,
      trustpilotLinkLabel,
      trustpilotLinkHref,
      leftColumnDirection,
      rightColumnDirection,
      scrollSpeed,
      trustStats: [],
      items: reviews.map((r) => ({
        id: r.id,
        name: r.name,
        company: r.company,
        initials: r.initials || (r.name ? r.name.slice(0, 2).toUpperCase() : "HP"),
        rating: Number(r.rating) || 5,
        highlight: r.highlightPill,
        text: r.quote,
        column: r.column,
        active: r.active,
      })),
    };

    if (setLocal) {
      setLocal(updated as any);
    }

    if (save) {
      await save(updated as any);
    }

    setIsSaved(true);
    toast({
      title: "Testimonials Saved",
      description: "Updated Testimonials in Supabase.",
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
            <form onSubmit={handleSave} className="flex max-w-[920px] flex-col gap-5">
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

              {/* Card 1: Section Headings */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 bg-white">
                  <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                    Testimonials
                  </h2>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                    SECTION HEADINGS
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Section label
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={sectionLabel}
                        onChange={(e) => setSectionLabel(e.target.value)}
                        placeholder="TESTIMONIALS"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Description
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Real Trustpilot reviews from brands who package with HOF Pack."
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Title lead
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={titleLead}
                        onChange={(e) => setTitleLead(e.target.value)}
                        placeholder="Trusted by"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Title accent
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={titleAccent}
                        onChange={(e) => setTitleAccent(e.target.value)}
                        placeholder="Growing Brands"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Calls to Action & Links */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 bg-white">
                  <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                    Buttons & Links
                  </h2>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                    PRIMARY CTA, SECONDARY CTA, AND REVIEW LINK
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Primary CTA */}
                  <div>
                    <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                      Primary Button Label (Opens Quote Modal)
                    </label>
                    <input
                      className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                      value={primaryCtaLabel}
                      onChange={(e) => setPrimaryCtaLabel(e.target.value)}
                      placeholder="Customize now"
                    />
                  </div>

                  {/* Secondary CTA */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Secondary Button Label
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={secondaryCtaLabel}
                        onChange={(e) => setSecondaryCtaLabel(e.target.value)}
                        placeholder="Browse all products"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Secondary Button Link
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={secondaryCtaHref}
                        onChange={(e) => setSecondaryCtaHref(e.target.value)}
                        placeholder="/our-products"
                      />
                    </div>
                  </div>

                  {/* Review Link */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Reviews Link Text (Leave empty to hide)
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={trustpilotLinkLabel}
                        onChange={(e) => setTrustpilotLinkLabel(e.target.value)}
                        placeholder="See all reviews on Trustpilot"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Reviews Link URL
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={trustpilotLinkHref}
                        onChange={(e) => setTrustpilotLinkHref(e.target.value)}
                        placeholder="https://www.trustpilot.com/review/hofpack.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Sliders, Scrolling & Order Settings */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 bg-white">
                  <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                    Sliders, Scrolling & Direction Controls
                  </h2>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                    CONFIGURE SCROLL DIRECTION AND SPEED FOR EACH SLIDER
                  </p>
                </div>

                <div className="p-6 grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                      Slider 1 (Left Column) Direction
                    </label>
                    <select
                      className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                      value={leftColumnDirection}
                      onChange={(e) => setLeftColumnDirection(e.target.value as "up" | "down")}
                    >
                      <option value="up">Scroll Up (Default)</option>
                      <option value="down">Scroll Down</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                      Slider 2 (Right Column) Direction
                    </label>
                    <select
                      className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                      value={rightColumnDirection}
                      onChange={(e) => setRightColumnDirection(e.target.value as "up" | "down")}
                    >
                      <option value="down">Scroll Down (Default)</option>
                      <option value="up">Scroll Up</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                      Slider Scroll Speed
                    </label>
                    <select
                      className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                      value={scrollSpeed}
                      onChange={(e) => setScrollSpeed(e.target.value as "slow" | "normal" | "fast")}
                    >
                      <option value="normal">Normal (Balanced)</option>
                      <option value="fast">Fast (Dynamic)</option>
                      <option value="slow">Slow (Relaxed)</option>
                    </select>
                  </div>
                </div>
              </div>



              {/* Card 5: Reviews */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 flex items-center justify-between bg-white">
                  <div>
                    <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                      Reviews ({reviews.length})
                    </h2>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                      CUSTOM ORDER, SLIDER 1/2 ASSIGNMENT & RATINGS
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddReview}
                    className="inline-flex items-center gap-1.5 h-[34px] px-3.5 text-[11px] font-bold rounded-lg border border-[#e0ddd6] bg-white text-[#1a1a1a] hover:bg-[#faf8f5] transition-colors shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#e8732a]" />
                    Add review
                  </button>
                </div>

                <div className="divide-y divide-[#e0ddd6]/80 bg-white">
                  {reviews.map((rev, index) => (
                    <div key={rev.id} className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#f5f3ee] text-[#7a7672] text-[10px] font-bold flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-[13px] font-bold text-[#1a1a1a]">
                            {rev.name || `Review #${index + 1}`}
                          </span>
                          <div className="flex items-center gap-0.5 ml-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={
                                  i < rev.rating
                                    ? "fill-[#00b67a] text-[#00b67a]"
                                    : "fill-[#e0ddd6] text-[#e0ddd6]"
                                }
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Order buttons */}
                          <div className="flex items-center border border-[#e0ddd6] rounded-md overflow-hidden bg-white">
                            <button
                              type="button"
                              onClick={() => handleMoveReview(index, "up")}
                              disabled={index === 0}
                              title="Move up in order"
                              className="p-1 hover:bg-[#faf8f5] text-[#7a7672] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveReview(index, "down")}
                              disabled={index === reviews.length - 1}
                              title="Move down in order"
                              className="p-1 hover:bg-[#faf8f5] text-[#7a7672] disabled:opacity-30 disabled:cursor-not-allowed border-l border-[#e0ddd6] transition-colors"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#7a7672] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={rev.active}
                              onChange={() => handleToggleReview(rev.id)}
                              className="w-4 h-4 rounded text-[#2d5c3e] focus:ring-[#2d5c3e] border-[#d8d4cc]"
                            />
                            Active
                          </label>

                          <button
                            type="button"
                            onClick={() => handleRemoveReview(rev.id)}
                            className="p-1 text-[#aaa6a0] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-4 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                            Name
                          </label>
                          <input
                            className="w-full min-h-[38px] px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                            value={rev.name}
                            onChange={(e) => handleUpdateReview(rev.id, "name", e.target.value)}
                            placeholder="Sarah M."
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                            Company / Location
                          </label>
                          <input
                            className="w-full min-h-[38px] px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                            value={rev.company}
                            onChange={(e) => handleUpdateReview(rev.id, "company", e.target.value)}
                            placeholder="Glow Cosmetics"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                            Slider Assignment
                          </label>
                          <select
                            className="w-full min-h-[38px] px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                            value={rev.column}
                            onChange={(e) => handleUpdateReview(rev.id, "column", e.target.value as any)}
                          >
                            <option value="auto">Auto (Balanced)</option>
                            <option value="left">Slider 1 (Left Column)</option>
                            <option value="right">Slider 2 (Right Column)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                            Star Rating
                          </label>
                          <select
                            className="w-full min-h-[38px] px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                            value={rev.rating}
                            onChange={(e) => handleUpdateReview(rev.id, "rating", Number(e.target.value))}
                          >
                            <option value={5}>★★★★★ (5 Stars)</option>
                            <option value={4}>★★★★☆ (4 Stars)</option>
                            <option value={3}>★★★☆☆ (3 Stars)</option>
                            <option value={2}>★★☆☆☆ (2 Stars)</option>
                            <option value={1}>★☆☆☆☆ (1 Star)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-1 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                            Highlight / Title
                          </label>
                          <input
                            className="w-full min-h-[38px] px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                            value={rev.highlightPill}
                            onChange={(e) => handleUpdateReview(rev.id, "highlightPill", e.target.value)}
                            placeholder="Customers notice the difference"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                          Review Quote
                        </label>
                        <textarea
                          rows={2}
                          className="w-full px-3 py-1.5 text-[12px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] resize-none"
                          value={rev.quote}
                          onChange={(e) => handleUpdateReview(rev.id, "quote", e.target.value)}
                          placeholder="Customer review text..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
