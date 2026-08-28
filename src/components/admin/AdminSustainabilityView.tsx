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

interface SustainabilityPoint {
  id: string;
  icon: "leaf" | "heart" | "recycle" | "tree";
  title: string;
  description: string;
  active: boolean;
}

const INITIAL_POINTS: SustainabilityPoint[] = [
  {
    id: "sp-1",
    icon: "leaf",
    title: "Recycled & Biodegradable",
    description: "FSC-certified stock options across all product lines.",
    active: true,
  },
  {
    id: "sp-2",
    icon: "heart",
    title: "Cruelty-Free Inks",
    description: "Soy-based, vegan inks. Vibrant color without compromise.",
    active: true,
  },
  {
    id: "sp-3",
    icon: "recycle",
    title: "Fully Recyclable",
    description: "Every box we ship can be recycled or composted.",
    active: true,
  },
  {
    id: "sp-4",
    icon: "tree",
    title: "Responsible Sourcing",
    description: "Certified supply chain from raw material to your door.",
    active: true,
  },
];

export default function AdminSustainabilityView() {
  const { toast } = useToast();
  const { local, setLocal, save, saving, refetch } = useCmsHomeSection("sustainability");

  const [sectionLabel, setSectionLabel] = useState("Sustainability");
  const [titleBeforeAccent, setTitleBeforeAccent] = useState("Good Packaging Shouldn't");
  const [accentWords, setAccentWords] = useState("Cost the Earth");
  const [body, setBody] = useState(
    "We use recycled materials, soy-based inks, and work with FSC-certified suppliers.\nNot because it's trendy, because it's the right thing to do. Every box we make\ncan be recycled or composted, and we never test on animals."
  );
  const [panelTitle, setPanelTitle] = useState("Built for the Planet");
  const [panelSubtitle, setPanelSubtitle] = useState("Packaging that looks great and does good.");

  const [stat1Val, setStat1Val] = useState("100%");
  const [stat1Label, setStat1Label] = useState("Recyclable");
  const [stat2Val, setStat2Val] = useState("50+");
  const [stat2Label, setStat2Label] = useState("Certified Facilities");
  const [stat3Val, setStat3Val] = useState("0");
  const [stat3Label, setStat3Label] = useState("Animal Testing");

  const [ctaLabel, setCtaLabel] = useState("Our Story");
  const [ctaHref, setCtaHref] = useState("/about");

  const [points, setPoints] = useState<SustainabilityPoint[]>(INITIAL_POINTS);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (local) {
      setSectionLabel(local.sectionLabel ?? "Sustainability");
      setTitleBeforeAccent(local.titleLead ?? (local as any).titleBeforeAccent ?? "Good Packaging Shouldn't");
      setAccentWords(local.titleAccent ?? (local as any).accentWords ?? "Cost the Earth");
      setBody(
        local.body ??
          "We use recycled materials, soy-based inks, and work with FSC-certified suppliers.\nNot because it's trendy, because it's the right thing to do. Every box we make\ncan be recycled or composted, and we never test on animals."
      );
      setPanelTitle(local.panelTitle ?? "Built for the Planet");
      setPanelSubtitle(local.panelSubtitle ?? "Packaging that looks great and does good.");

      if (Array.isArray(local.stats) && local.stats.length >= 3) {
        setStat1Val(local.stats[0]?.value ?? "100%");
        setStat1Label(local.stats[0]?.label ?? "Recyclable");
        setStat2Val(local.stats[1]?.value ?? "50+");
        setStat2Label(local.stats[1]?.label ?? "Certified Facilities");
        setStat3Val(local.stats[2]?.value ?? "0");
        setStat3Label(local.stats[2]?.label ?? "Animal Testing");
      }

      setCtaLabel(local.ctaLabel ?? "Our Story");
      setCtaHref(local.ctaHref ?? "/about");

      if (Array.isArray(local.points) && local.points.length > 0) {
        setPoints(
          local.points.map((p) => ({
            id: p.id,
            icon: p.icon || "leaf",
            title: p.title || "",
            description: (p as any).description || p.desc || "",
            active: p.active !== false,
          }))
        );
      }
    }
  }, [local]);

  const handleToggleActive = (id: string) => {
    setPoints((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  const handleUpdatePoint = (
    id: string,
    field: keyof SustainabilityPoint,
    val: any
  ) => {
    setPoints((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );
  };

  const handleAddPoint = () => {
    const newP: SustainabilityPoint = {
      id: crypto.randomUUID(),
      icon: "leaf",
      title: "",
      description: "",
      active: true,
    };
    setPoints((prev) => [...prev, newP]);
  };

  const handleRemovePoint = (id: string) => {
    setPoints((prev) => prev.filter((p) => p.id !== id));
  };

  const handleReset = () => {
    if (refetch) {
      refetch();
    } else {
      setSectionLabel("Sustainability");
      setTitleBeforeAccent("Good Packaging Shouldn't");
      setAccentWords("Cost the Earth");
      setBody(
        "We use recycled materials, soy-based inks, and work with FSC-certified suppliers.\nNot because it's trendy, because it's the right thing to do. Every box we make\ncan be recycled or composted, and we never test on animals."
      );
      setPanelTitle("Built for the Planet");
      setPanelSubtitle("Packaging that looks great and does good.");
      setStat1Val("100%");
      setStat1Label("Recyclable");
      setStat2Val("50+");
      setStat2Label("Certified Facilities");
      setStat3Val("0");
      setStat3Label("Animal Testing");
      setCtaLabel("Our Story");
      setCtaHref("/about");
      setPoints(INITIAL_POINTS);
    }
    toast({
      title: "Reset from server",
      description: "Restored latest sustainability settings from Supabase.",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      sectionLabel,
      titleLead: titleBeforeAccent,
      titleAccent: accentWords,
      body,
      panelTitle,
      panelSubtitle,
      stats: [
        { value: stat1Val, label: stat1Label },
        { value: stat2Val, label: stat2Label },
        { value: stat3Val, label: stat3Label },
      ],
      ctaLabel,
      ctaHref,
      points: points.map((p) => ({
        id: p.id,
        icon: p.icon,
        title: p.title,
        desc: p.description,
        description: p.description,
        active: p.active,
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
      title: "Sustainability Section Saved",
      description: "Updated sustainability content and points in Supabase.",
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

              {/* Card 1: Main Copy & Stats */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 bg-white">
                  <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                    Sustainability
                  </h2>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                    SECTION COPY, SIDE PANEL, STATS, AND CTA
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Section Label */}
                  <div>
                    <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                      Section label
                    </label>
                    <input
                      className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                      value={sectionLabel}
                      onChange={(e) => setSectionLabel(e.target.value)}
                      placeholder="Sustainability"
                    />
                  </div>

                  {/* Title Before Accent + Accent Words */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Title before accent
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={titleBeforeAccent}
                        onChange={(e) => setTitleBeforeAccent(e.target.value)}
                        placeholder="Good Packaging Shouldn't"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Accent words
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={accentWords}
                        onChange={(e) => setAccentWords(e.target.value)}
                        placeholder="Cost the Earth"
                      />
                    </div>
                  </div>

                  {/* Body Text */}
                  <div>
                    <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                      Body
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3.5 py-2 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] resize-none"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </div>

                  {/* Panel Title & Subtitle */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Panel title
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={panelTitle}
                        onChange={(e) => setPanelTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        Panel subtitle
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={panelSubtitle}
                        onChange={(e) => setPanelSubtitle(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* 3 Stats Columns */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 block">
                        Stat 1 Value
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={stat1Val}
                        onChange={(e) => setStat1Val(e.target.value)}
                      />
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 block">
                        Label
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={stat1Label}
                        onChange={(e) => setStat1Label(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 block">
                        Stat 2 Value
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={stat2Val}
                        onChange={(e) => setStat2Val(e.target.value)}
                      />
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 block">
                        Label
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={stat2Label}
                        onChange={(e) => setStat2Label(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 block">
                        Stat 3 Value
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={stat3Val}
                        onChange={(e) => setStat3Val(e.target.value)}
                      />
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 block">
                        Label
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={stat3Label}
                        onChange={(e) => setStat3Label(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* CTA Label & Link */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        CTA Label
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={ctaLabel}
                        onChange={(e) => setCtaLabel(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        CTA Href
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={ctaHref}
                        onChange={(e) => setCtaHref(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Sustainability Points */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 flex items-center justify-between bg-white">
                  <div>
                    <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                      Sustainability points
                    </h2>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                      KEY ENVIRONMENTAL COMMITMENTS & PRACTICES
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddPoint}
                    className="inline-flex items-center gap-1.5 h-[34px] px-3.5 text-[11px] font-bold rounded-lg border border-[#e0ddd6] bg-white text-[#1a1a1a] hover:bg-[#faf8f5] transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#e8732a]" />
                    Add point
                  </button>
                </div>

                <div className="divide-y divide-[#e0ddd6]/80 bg-white">
                  {points.map((p, index) => (
                    <div key={p.id} className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#f5f3ee] text-[#7a7672] text-[10px] font-bold flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-[13px] font-bold text-[#1a1a1a]">
                            {p.title || `Point #${index + 1}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#7a7672] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={p.active}
                              onChange={() => handleToggleActive(p.id)}
                              className="w-4 h-4 rounded text-[#2d5c3e] focus:ring-[#2d5c3e] border-[#d8d4cc]"
                            />
                            Active
                          </label>
                          <button
                            type="button"
                            onClick={() => handleRemovePoint(p.id)}
                            className="p-1 text-[#aaa6a0] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                            Title
                          </label>
                          <input
                            className="w-full min-h-[38px] px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                            value={p.title}
                            onChange={(e) => handleUpdatePoint(p.id, "title", e.target.value)}
                            placeholder="Point title..."
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                            Description
                          </label>
                          <input
                            className="w-full min-h-[38px] px-3 text-[12px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                            value={p.description}
                            onChange={(e) => handleUpdatePoint(p.id, "description", e.target.value)}
                            placeholder="Point description..."
                          />
                        </div>
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
