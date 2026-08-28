"use client";

import React, { useState } from "react";
import {
  FileText,
  RefreshCw,
  Save,
  Plus,
  Trash2,
  Check,
} from "lucide-react";

interface FeatureCardItem {
  id: string;
  icon: "box" | "palette" | "printer" | "sparkles";
  title: string;
  description: string;
  active: boolean;
}

const INITIAL_FEATURE_CARDS: FeatureCardItem[] = [
  {
    id: "fc-1",
    icon: "box",
    title: "Custom Sizes and Shapes",
    description: "Take full control and customize the exact size you need. Reduce waste, fit your product perfectly, and create a tailored unboxing experience.",
    active: true,
  },
  {
    id: "fc-2",
    icon: "palette",
    title: "Premium Materials",
    description: "Choose from kraft, corrugated, rigid, and specialty stocks. Every material is sustainably sourced and built to protect your products.",
    active: true,
  },
  {
    id: "fc-3",
    icon: "printer",
    title: "Vibrant Printing",
    description: "CMYK, PMS spot colors, and specialty inks deliver bold, consistent color. Your brand will look stunning on every single box.",
    active: true,
  },
  {
    id: "fc-4",
    icon: "sparkles",
    title: "Luxury Finishes",
    description: "Spot UV, foil stamping, embossing, debossing, and holographic effects. Elevate the look and feel of your packaging.",
    active: true,
  },
];

export default function AdminPackagingShowcaseView() {
  const [sectionLabel, setSectionLabel] = useState("Options and Materials");
  const [title, setTitle] = useState("Build Your Packaging Any Way You Want");
  const [description, setDescription] = useState("Enjoy endless customization to create the packaging you need to succeed.");
  const [ctaLabel, setCtaLabel] = useState("Start Customizing");

  const [cards, setCards] = useState<FeatureCardItem[]>(INITIAL_FEATURE_CARDS);
  const [isSaved, setIsSaved] = useState(false);

  const handleToggleCard = (id: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const handleUpdateCard = (id: string, field: keyof FeatureCardItem, val: any) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    );
  };

  const handleAddCard = () => {
    const newCard: FeatureCardItem = {
      id: crypto.randomUUID(),
      icon: "box",
      title: "",
      description: "",
      active: true,
    };
    setCards((prev) => [...prev, newCard]);
  };

  const handleRemoveCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleReset = () => {
    setSectionLabel("Options and Materials");
    setTitle("Build Your Packaging Any Way You Want");
    setDescription("Enjoy endless customization to create the packaging you need to succeed.");
    setCtaLabel("Start Customizing");
    setCards(INITIAL_FEATURE_CARDS);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
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
            <form onSubmit={handleSave} className="flex max-w-[920px] flex-col gap-4">
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
                  className="btn h-[36px] px-5 text-[11px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] disabled:opacity-50 inline-flex items-center gap-2 shadow-[0_4px_14px_rgba(232,115,42,0.2)] cursor-pointer transition-colors"
                >
                  {isSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                  {isSaved ? "Saved & published!" : "Save & publish"}
                </button>
              </div>

              {/* Card 1: Packaging Showcase Section Header */}
              <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                  <div className="ch-l flex-1">
                    <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                      Packaging showcase
                    </div>
                    <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                      Section header and quote CTA label
                    </div>
                  </div>
                </div>

                <div className="cb p-6">
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Section label
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={sectionLabel}
                        onChange={(e) => setSectionLabel(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Title
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Description
                      </label>
                      <textarea
                        className="w-full min-h-[100px] p-3 text-[12px] font-mono bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        CTA label
                      </label>
                      <input
                        className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={ctaLabel}
                        onChange={(e) => setCtaLabel(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Feature cards */}
              <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                  <div className="ch-l flex-1">
                    <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                      Feature cards
                    </div>
                    <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                      Icon, title, and body; toggle Active to hide on the site
                    </div>
                  </div>
                </div>

                <div className="cb p-0">
                  <div className="flex flex-col gap-0 border-b border-[#e0ddd6] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[11px] font-semibold text-[#7a7672]">
                      Icons: box, palette, printer, sparkles.
                    </p>
                    <button
                      type="button"
                      onClick={handleAddCard}
                      className="mt-2 inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#e0ddd6] bg-white px-3 py-2 text-[11px] font-bold text-[#1a1a1a] shadow-sm transition-colors hover:border-[#2d5c3e]/25 hover:bg-[#f5f3ee] sm:mt-0 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add card
                    </button>
                  </div>

                  <div className="divide-y divide-[#e0ddd6]">
                    {cards.map((c, index) => (
                      <div
                        key={c.id}
                        className="space-y-3 px-4 py-4 hover:bg-[#faf8f5]/50 transition-colors"
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#aaa6a0]">
                            Card {index + 1}
                          </span>
                          <div className="flex flex-wrap items-center gap-2">
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#e0ddd6] bg-[#f5f3ee]/50 px-2.5 py-1.5 text-[11px] font-semibold text-[#1a1a1a]">
                              <input
                                className="h-3.5 w-3.5 accent-[#2d5c3e]"
                                type="checkbox"
                                checked={c.active}
                                onChange={() => handleToggleCard(c.id)}
                              />
                              Active
                            </label>
                            <button
                              type="button"
                              onClick={() => handleRemoveCard(c.id)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#e0ddd6] bg-white text-[#7a7672] transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                              title="Remove card"
                              aria-label="Remove card"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                              Icon
                            </label>
                            <select
                              value={c.icon}
                              onChange={(e) =>
                                handleUpdateCard(c.id, "icon", e.target.value)
                              }
                              className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                            >
                              <option value="box">box</option>
                              <option value="palette">palette</option>
                              <option value="printer">printer</option>
                              <option value="sparkles">sparkles</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                              Title
                            </label>
                            <input
                              className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                              value={c.title}
                              onChange={(e) =>
                                handleUpdateCard(c.id, "title", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                            Description
                          </label>
                          <textarea
                            className="w-full min-h-[100px] p-3 text-[12px] font-mono bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                            rows={3}
                            value={c.description}
                            onChange={(e) =>
                              handleUpdateCard(c.id, "description", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
