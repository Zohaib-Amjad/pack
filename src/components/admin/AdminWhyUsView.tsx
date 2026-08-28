"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  RefreshCw,
  Save,
  Plus,
  Trash2,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCmsHomeSection } from "@/hooks/useCmsHomeSection";

interface WhyUsCardItem {
  id: string;
  title: string;
  statVal: string;
  statLabel: string;
  description: string;
  active: boolean;
  featured: boolean;
}

const INITIAL_WHY_US_CARDS: WhyUsCardItem[] = [
  {
    id: "wuc-1",
    title: "Eco-Friendly Packaging That Builds Customer Trust",
    statVal: "Free",
    statLabel: "Design Support",
    description: "Going green is no longer a trend or differentiation point; it has become a necessity because it's the right thing to do.",
    active: true,
    featured: false,
  },
  {
    id: "wuc-2",
    title: "Strong Yet Lightweight",
    statVal: "4K+",
    statLabel: "DPI Resolution",
    description: "Our Kraft boxes are sturdy, light, and perfect for candles, food, and everyday retail products.",
    active: true,
    featured: true,
  },
  {
    id: "wuc-3",
    title: "A Natural Look That Elevates Brand Identity",
    statVal: "100%",
    statLabel: "Inspection Rate",
    description: "Minimalist kraft packaging is a growing trend — and one of the most effective ways to tell your brand's sustainability story.",
    active: true,
    featured: false,
  },
  {
    id: "wuc-4",
    title: "Best Price, Guaranteed",
    statVal: "Best",
    statLabel: "Price Match",
    description: "Premium packaging at prices that make sense. We'll match any comparable quote.",
    active: true,
    featured: false,
  },
  {
    id: "wuc-5",
    title: "Your Own Account Manager",
    statVal: "1:1",
    statLabel: "Personal Contact",
    description: "One person who knows your project inside out. Call, email, or text. They're there.",
    active: true,
    featured: false,
  },
  {
    id: "wuc-6",
    title: "Always Ahead of Deadline",
    statVal: "8 to 12",
    statLabel: "Day Turnaround",
    description: "We build buffer into every order. Your boxes arrive before you need them.",
    active: true,
    featured: true,
  },
  {
    id: "wuc-7",
    title: "Two Continents, One Standard",
    statVal: "2",
    statLabel: "Global Facilities",
    description: "Facilities in the USA . Same quality checks, same results, wherever we print.",
    active: true,
    featured: false,
  },
  {
    id: "wuc-8",
    title: "USA Team, Global Reach",
    statVal: "USA",
    statLabel: "Based Service",
    description: "Based in the US, shipping worldwide. Local service with global manufacturing muscle.",
    active: true,
    featured: false,
  },
];

export default function AdminWhyUsView() {
  const { toast } = useToast();
  const { local, setLocal, save, saving, refetch } = useCmsHomeSection("whyUs");

  const [sectionLabel, setSectionLabel] = useState("Why Us");
  const [ctaLabel, setCtaLabel] = useState("View Eco-Friendly Products");
  const [titleLead, setTitleLead] = useState("Good Packaging Shouldn’t Cost The Earth");
  const [titleAccent, setTitleAccent] = useState("Shop with us for a Greener Future");
  const [ctaHref, setCtaHref] = useState("/custom-kraft-boxes");
  const [description, setDescription] = useState(
    "For a sustainable future and a greener Earth, HOF Pack offers recyclable materials, a minimalist branding trend, and a cost-effective solution to your plastic-free packaging. We use recycled materials, soy-based inks, and work with FSC-certified suppliers."
  );
  const [cards, setCards] = useState<WhyUsCardItem[]>(INITIAL_WHY_US_CARDS);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (local) {
      setSectionLabel(local.sectionLabel ?? "Why Us");
      setTitleLead(local.titleLead ?? "Good Packaging Shouldn’t Cost The Earth");
      setTitleAccent(local.titleAccent ?? "Shop with us for a Greener Future");
      setCtaLabel(local.ctaLabel ?? "View Eco-Friendly Products");
      setCtaHref(local.ctaHref ?? "/custom-kraft-boxes");
      setDescription(
        local.description ??
          "For a sustainable future and a greener Earth, HOF Pack offers recyclable materials, a minimalist branding trend, and a cost-effective solution to your plastic-free packaging. We use recycled materials, soy-based inks, and work with FSC-certified suppliers."
      );
      if (Array.isArray(local.cards) && local.cards.length > 0) {
        setCards(
          local.cards.map((c) => ({
            id: c.id,
            title: c.title || "",
            statVal: c.stat || "",
            statLabel: c.statLabel || "",
            description: c.desc || "",
            active: c.active !== false,
            featured: c.featured === true,
          }))
        );
      }
    }
  }, [local]);

  const handleToggleCardField = (id: string, field: "active" | "featured") => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: !c[field] } : c))
    );
  };

  const handleUpdateCard = (id: string, field: keyof WhyUsCardItem, val: any) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    );
  };

  const handleAddCard = () => {
    const newCard: WhyUsCardItem = {
      id: crypto.randomUUID(),
      title: "",
      statVal: "",
      statLabel: "",
      description: "",
      active: true,
      featured: false,
    };
    setCards((prev) => [...prev, newCard]);
  };

  const handleRemoveCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleReset = () => {
    if (refetch) {
      refetch();
    } else {
      setSectionLabel("Why Us");
      setCtaLabel("View Eco-Friendly Products");
      setTitleLead("Good Packaging Shouldn’t Cost The Earth");
      setTitleAccent("Shop with us for a Greener Future");
      setCtaHref("/custom-kraft-boxes");
      setDescription(
        "For a sustainable future and a greener Earth, HOF Pack offers recyclable materials, a minimalist branding trend, and a cost-effective solution to your plastic-free packaging. We use recycled materials, soy-based inks, and work with FSC-certified suppliers."
      );
      setCards(INITIAL_WHY_US_CARDS);
    }
    toast({
      title: "Reset from server",
      description: "Restored latest Why Us settings from Supabase.",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      sectionLabel,
      titleLead,
      titleAccent,
      description,
      ctaLabel,
      ctaHref,
      cards: cards.map((c) => ({
        id: c.id,
        title: c.title,
        stat: c.statVal,
        statLabel: c.statLabel,
        desc: c.description,
        active: c.active,
        featured: c.featured,
      })),
    };

    if (setLocal) {
      setLocal(updated);
    }

    if (save) {
      await save(updated);
    }

    setIsSaved(true);
    toast({
      title: "Why Us Saved",
      description: "Updated Why Us copy and cards on the live homepage.",
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

              {/* Card 1: Section Heading, Intro & CTA */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 bg-white">
                  <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                    Why us
                  </h2>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                    SECTION HEADING, INTRO, AND CTA
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Row 1: Section Label + CTA Label */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Section label
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={sectionLabel}
                        onChange={(e) => setSectionLabel(e.target.value)}
                        placeholder="Why Us"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        CTA label
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={ctaLabel}
                        onChange={(e) => setCtaLabel(e.target.value)}
                        placeholder="View Eco-Friendly Products"
                      />
                    </div>
                  </div>

                  {/* Row 2: Title Lead + Title Accent */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Title lead
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={titleLead}
                        onChange={(e) => setTitleLead(e.target.value)}
                        placeholder="Good Packaging Shouldn’t Cost The Earth"
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
                        placeholder="Shop with us for a Greener Future"
                      />
                    </div>
                  </div>

                  {/* Row 3: CTA Href */}
                  <div>
                    <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                      CTA Href
                    </label>
                    <input
                      className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                      value={ctaHref}
                      onChange={(e) => setCtaHref(e.target.value)}
                      placeholder="/custom-kraft-boxes"
                    />
                  </div>

                  {/* Row 4: Description */}
                  <div>
                    <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3.5 py-2 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] resize-none"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Why Us Cards */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 flex items-center justify-between bg-white">
                  <div>
                    <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                      Why us cards
                    </h2>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                      EACH CARD — STATS, TITLE, BODY; TOGGLE ACTIVE TO HIDE WITHOUT DELETING
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCard}
                    className="inline-flex items-center gap-1.5 h-[34px] px-3.5 text-[11px] font-bold rounded-lg border border-[#e0ddd6] bg-white text-[#1a1a1a] hover:bg-[#faf8f5] transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#e8732a]" />
                    Add card
                  </button>
                </div>

                <div className="divide-y divide-[#e0ddd6]/80 bg-white">
                  {cards.map((c, index) => (
                    <div key={c.id} className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#f5f3ee] text-[#7a7672] text-[10px] font-bold flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-[13px] font-bold text-[#1a1a1a]">
                            {c.title || `Card #${index + 1}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#7a7672] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={c.active}
                              onChange={() => handleToggleCardField(c.id, "active")}
                              className="w-4 h-4 rounded text-[#2d5c3e] focus:ring-[#2d5c3e] border-[#d8d4cc]"
                            />
                            Active
                          </label>
                          <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#7a7672] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={c.featured}
                              onChange={() => handleToggleCardField(c.id, "featured")}
                              className="w-4 h-4 rounded text-[#e8732a] focus:ring-[#e8732a] border-[#d8d4cc]"
                            />
                            Featured
                          </label>
                          <button
                            type="button"
                            onClick={() => handleRemoveCard(c.id)}
                            className="p-1 text-[#aaa6a0] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Card Title */}
                      <div>
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                          Title
                        </label>
                        <input
                          className="w-full min-h-[38px] px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                          value={c.title}
                          onChange={(e) => handleUpdateCard(c.id, "title", e.target.value)}
                          placeholder="Card title..."
                        />
                      </div>

                      {/* Stats */}
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                            Stat (Large)
                          </label>
                          <input
                            className="w-full min-h-[38px] px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                            value={c.statVal}
                            onChange={(e) => handleUpdateCard(c.id, "statVal", e.target.value)}
                            placeholder="e.g. 100%"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                            Stat Label
                          </label>
                          <input
                            className="w-full min-h-[38px] px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                            value={c.statLabel}
                            onChange={(e) => handleUpdateCard(c.id, "statLabel", e.target.value)}
                            placeholder="e.g. Recyclable"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          className="w-full px-3 py-1.5 text-[12px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] resize-none"
                          value={c.description}
                          onChange={(e) => handleUpdateCard(c.id, "description", e.target.value)}
                          placeholder="Card description..."
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
