"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  RefreshCw,
  Save,
  Check,
  Plus,
  Trash2,
} from "lucide-react";
import { useCmsAboutSection } from "@/hooks/useCmsAboutSection";
import { DEFAULT_CMS_ABOUT } from "@/data/cms-defaults";
import { useToast } from "@/hooks/use-toast";
import type { CmsAboutStat } from "@/types/cms";

export default function AdminAboutStatsView() {
  const { local, setLocal, save, saving, refetch } = useCmsAboutSection("stats");
  const { toast } = useToast();

  const [stats, setStats] = useState<CmsAboutStat[]>(
    local || DEFAULT_CMS_ABOUT.stats
  );
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (local) {
      setStats(local);
    }
  }, [local]);

  const handleReset = () => {
    if (refetch) {
      refetch();
    } else {
      setStats(DEFAULT_CMS_ABOUT.stats);
    }
    toast({
      title: "Reset from server",
      description: "Restored latest Stats strip from Supabase.",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocal(stats);
    if (save) {
      await save(stats);
    }
    setIsSaved(true);
    toast({
      title: "Saved successfully",
      description: "Stats strip copy has been saved & published.",
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  const addStat = () => {
    const newStat: CmsAboutStat = {
      id: `ab-stat-${Date.now()}`,
      value: "100+",
      label: "New Metric",
      icon: "users",
      active: true,
    };
    setStats([...stats, newStat]);
  };

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const updateStat = (
    index: number,
    field: keyof CmsAboutStat,
    value: unknown
  ) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
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
            <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-[920px]">
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
                  {isSaved ? "Saved & published" : "Save & publish"}
                </button>
              </div>

              {/* Card: Stats strip */}
              <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                  <div className="ch-l flex-1">
                    <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                      Stats strip
                    </div>
                    <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                      Top cards on About page; toggle Active to hide
                    </div>
                  </div>
                </div>

                <div className="cb p-0">
                  <div className="flex flex-col gap-0 border-b border-[#e0ddd6] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[11px] font-semibold leading-relaxed text-[#7a7672]">
                      Icons: users, factory, globe, truck.
                    </p>
                    <button
                      type="button"
                      onClick={addStat}
                      className="mt-2 inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#e0ddd6] bg-white px-3 py-2 text-[11px] font-bold text-[#1a1a1a] shadow-sm transition-colors hover:border-[#2d5c3e]/25 hover:bg-[#f5f3ee] sm:mt-0 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add stat
                    </button>
                  </div>

                  <div className="divide-y divide-[#e0ddd6]">
                    {stats.map((stat, idx) => (
                      <div key={stat.id || idx} className="space-y-3 px-4 py-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#aaa6a0]">
                            Stat {idx + 1}
                          </span>
                          <div className="flex flex-wrap items-center gap-2">
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#e0ddd6] bg-[#f5f3ee]/50 px-2.5 py-1.5 text-[11px] font-semibold text-[#1a1a1a]">
                              <input
                                className="h-3.5 w-3.5 accent-[#2d5c3e]"
                                type="checkbox"
                                checked={stat.active !== false}
                                onChange={(e) =>
                                  updateStat(idx, "active", e.target.checked)
                                }
                              />
                              Active
                            </label>
                            <button
                              type="button"
                              onClick={() => removeStat(idx)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#e0ddd6] bg-white text-[#7a7672] transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                              title="Remove stat"
                              aria-label="Remove stat"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                          <div>
                            <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                              Value
                            </label>
                            <input
                              className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                              value={stat.value}
                              onChange={(e) =>
                                updateStat(idx, "value", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                              Label
                            </label>
                            <input
                              className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                              value={stat.label}
                              onChange={(e) =>
                                updateStat(idx, "label", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1 block">
                              Icon
                            </label>
                            <select
                              className="w-full min-h-[40px] px-[14px] py-2 text-[13px] bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                              value={stat.icon}
                              onChange={(e) =>
                                updateStat(idx, "icon", e.target.value)
                              }
                            >
                              <option value="users">users</option>
                              <option value="factory">factory</option>
                              <option value="globe">globe</option>
                              <option value="truck">truck</option>
                            </select>
                          </div>
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
