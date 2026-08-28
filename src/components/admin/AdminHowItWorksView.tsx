"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FileText,
  RefreshCw,
  Save,
  Plus,
  Trash2,
  Check,
  Upload,
  X,
  ZoomIn,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCmsHomeSection } from "@/hooks/useCmsHomeSection";

interface StepItem {
  id: string;
  icon: "pen" | "check" | "factory" | "truck";
  imageUrl: string;
  imageFileName: string;
  title: string;
  description: string;
  bullets: string;
  active: boolean;
}

const INITIAL_STEPS: StepItem[] = [
  {
    id: "step-1",
    icon: "pen",
    imageUrl: "/images/products/afe38795-24d9-47c6-b9f8-048f4d3b98d7.png",
    imageFileName: "afe38795-24d9-47c6-b9f8-048f4d3b98d7.png",
    title: "Design",
    description: "Share your brief. Our designers will build a concept around your brand — no cost, no commitment.",
    bullets: "Free creative consultation\n3D mockups & digital proofs\nUnlimited revisions",
    active: true,
  },
  {
    id: "step-2",
    icon: "check",
    imageUrl: "/images/products/aa806591-0348-42f5-be2e-3330477f3054.png",
    imageFileName: "aa806591-0348-42f5-be2e-3330477f3054.png",
    title: "Proof",
    description: "See a realistic 3D mockup of your packaging before anything goes to print. What you see is what you get.",
    bullets: "High-resolution 3D mockup\nReview print, colors & layout\nMake changes until it's right",
    active: true,
  },
  {
    id: "step-3",
    icon: "factory",
    imageUrl: "/images/products/7fde84ed-872a-454c-b74e-4f404d5d2bc4.png",
    imageFileName: "7fde84ed-872a-454c-b74e-4f404d5d2bc4.png",
    title: "Production",
    description: "Your order goes to our facilities in the USA. Every box passes rigorous quality checks.",
    bullets: "Advanced CMYK printing\nMulti-point quality inspection\n8 to 12 day turnaround",
    active: true,
  },
  {
    id: "step-4",
    icon: "truck",
    imageUrl: "/images/products/f4d0a7f0-7ab2-43ee-a836-dd5be3d1321a.jpg",
    imageFileName: "f4d0a7f0-7ab2-43ee-a836-dd5be3d1321a.jpg",
    title: "Delivery",
    description: "We ship direct to your door, on time, every time. Free shipping, no surprises.",
    bullets: "Free flat-rate shipping\nSecure transit packaging\nArrives before your deadline",
    active: true,
  },
];

export default function AdminHowItWorksView() {
  const { toast } = useToast();
  const { local, setLocal, save, saving, refetch } = useCmsHomeSection("howItWorks");

  const [sectionLabel, setSectionLabel] = useState("How It Works");
  const [ctaLabel, setCtaLabel] = useState("Start Your Project");
  const [titleLead, setTitleLead] = useState("From Idea to");
  const [titleAccent, setTitleAccent] = useState("Your Door");
  const [subtitle, setSubtitle] = useState("Four steps. No confusion. No hidden fees.");

  const [steps, setSteps] = useState<StepItem[]>(INITIAL_STEPS);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (local) {
      setSectionLabel(typeof local.sectionLabel === "string" ? local.sectionLabel : "How It Works");
      setCtaLabel(typeof local.ctaLabel === "string" ? local.ctaLabel : "Start Your Project");
      setTitleLead(typeof local.titleLead === "string" ? local.titleLead : "From Idea to");
      setTitleAccent(typeof local.titleAccent === "string" ? local.titleAccent : "Your Door");
      setSubtitle(typeof local.subtitle === "string" ? local.subtitle : "Four steps. No confusion. No hidden fees.");
      if (Array.isArray(local.steps)) {
        setSteps(
          local.steps.map((s, idx) => ({
            id: s.id || `step-${idx + 1}`,
            icon: s.icon || "pen",
            imageUrl: typeof s.imageUrl === "string" ? s.imageUrl : INITIAL_STEPS[idx]?.imageUrl || "",
            imageFileName: s.imageUrl ? s.imageUrl.split("/").pop() || "image.jpg" : "",
            title: typeof s.title === "string" ? s.title : "",
            description: typeof s.desc === "string" ? s.desc : typeof (s as any).description === "string" ? (s as any).description : "",
            bullets: Array.isArray(s.details) ? s.details.join("\n") : typeof (s as any).bullets === "string" ? (s as any).bullets : "",
            active: s.active !== false,
          }))
        );
      }
    }
  }, [local]);

  const handleToggleStep = (id: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const handleUpdateStep = (id: string, field: keyof StepItem, val: any) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const handleRemoveImage = (id: string) => {
    setSteps((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, imageUrl: "", imageFileName: "" } : s
      )
    );
  };

  const handleAddStep = () => {
    const newStep: StepItem = {
      id: crypto.randomUUID(),
      icon: "pen",
      imageUrl: "",
      imageFileName: "",
      title: "",
      description: "",
      bullets: "",
      active: true,
    };
    setSteps((prev) => [...prev, newStep]);
  };

  const handleRemoveStep = (id: string) => {
    setSteps((prev) => prev.filter((s) => s.id !== id));
  };

  const handleReset = () => {
    if (refetch) {
      refetch();
    } else {
      setSectionLabel("How It Works");
      setCtaLabel("Start Your Project");
      setTitleLead("From Idea to");
      setTitleAccent("Your Door");
      setSubtitle("Four steps. No confusion. No hidden fees.");
      setSteps(INITIAL_STEPS);
    }
    toast({
      title: "Reset from server",
      description: "Restored latest How It Works settings from Supabase.",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      sectionLabel,
      ctaLabel,
      titleLead,
      titleAccent,
      subtitle,
      steps: steps.map((s) => ({
        id: s.id,
        icon: s.icon,
        title: s.title,
        desc: s.description,
        description: s.description,
        details: s.bullets ? s.bullets.split("\n").map((b) => b.trim()).filter(Boolean) : [],
        imageUrl: s.imageUrl,
        active: s.active,
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
      title: "How It Works Saved",
      description: "Updated How It Works steps and copy in Supabase.",
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

              {/* Card 1: Section Heading and Quote CTA */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 bg-white">
                  <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                    How it works
                  </h2>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                    SECTION HEADING AND QUOTE CTA
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
                        placeholder="How It Works"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                        CTA label (Quote modal)
                      </label>
                      <input
                        className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                        value={ctaLabel}
                        onChange={(e) => setCtaLabel(e.target.value)}
                        placeholder="Start Your Project"
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
                        placeholder="From Idea to"
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
                        placeholder="Your Door"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                      Subtitle
                    </label>
                    <input
                      className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Four steps. No confusion. No hidden fees."
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Steps */}
              <div className="card bg-white border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-5 sm:p-6 border-b border-[#e0ddd6]/80 flex items-center justify-between bg-white">
                  <div>
                    <h2 className="font-display text-[16px] font-bold text-[#1a1a1a]">
                      Steps
                    </h2>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#aaa6a0] mt-1">
                      EACH STEP — ICON, IMAGE (OPTIONAL), BULLET LINES; TOGGLE ACTIVE TO HIDE
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="inline-flex items-center gap-1.5 h-[34px] px-3.5 text-[11px] font-bold rounded-lg border border-[#e0ddd6] bg-white text-[#1a1a1a] hover:bg-[#faf8f5] transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#e8732a]" />
                    Add step
                  </button>
                </div>

                <div className="divide-y divide-[#e0ddd6]/80 bg-white">
                  {steps.map((step, index) => (
                    <div key={step.id} className="p-5 sm:p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#f5f3ee] text-[#7a7672] text-[10px] font-bold flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-[13px] font-bold text-[#1a1a1a]">
                            Step {index + 1}: {step.title || "Untitled"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#7a7672] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={step.active}
                              onChange={() => handleToggleStep(step.id)}
                              className="w-4 h-4 rounded text-[#2d5c3e] focus:ring-[#2d5c3e] border-[#d8d4cc]"
                            />
                            Active
                          </label>
                          <button
                            type="button"
                            onClick={() => handleRemoveStep(step.id)}
                            className="p-1 text-[#aaa6a0] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                            Icon
                          </label>
                          <select
                            className="w-full min-h-[40px] px-3 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                            value={step.icon}
                            onChange={(e) =>
                              handleUpdateStep(step.id, "icon", e.target.value as any)
                            }
                          >
                            <option value="pen">Pen / Design</option>
                            <option value="check">Check / Proof</option>
                            <option value="factory">Factory / Production</option>
                            <option value="truck">Truck / Delivery</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                            Title
                          </label>
                          <input
                            className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                            value={step.title}
                            onChange={(e) => handleUpdateStep(step.id, "title", e.target.value)}
                            placeholder="e.g. Design"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                          Description
                        </label>
                        <input
                          className="w-full min-h-[40px] px-3.5 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                          value={step.description}
                          onChange={(e) =>
                            handleUpdateStep(step.id, "description", e.target.value)
                          }
                          placeholder="Short summary of this step..."
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                          Bullet lines (one per line)
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-3.5 py-2 text-[13px] bg-white border border-[#e0ddd6] rounded-lg focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a] resize-none"
                          value={step.bullets}
                          onChange={(e) => handleUpdateStep(step.id, "bullets", e.target.value)}
                          placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
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
