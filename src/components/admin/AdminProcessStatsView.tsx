"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  RefreshCw,
  Save,
  Check,
} from "lucide-react";
import { useCmsProcessSection } from "@/hooks/useCmsProcessSection";
import { DEFAULT_CMS_PROCESS } from "@/data/cms-defaults";
import { useToast } from "@/hooks/use-toast";

export default function AdminProcessStatsView() {
  const { local, setLocal, save, saving, refetch } =
    useCmsProcessSection("stats");
  const { toast } = useToast();

  const [jsonText, setJsonText] = useState(
    JSON.stringify(local || DEFAULT_CMS_PROCESS.stats, null, 2)
  );
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (local) {
      setJsonText(JSON.stringify(local, null, 2));
    }
  }, [local]);

  const handleReset = () => {
    if (refetch) {
      refetch();
    } else {
      setJsonText(JSON.stringify(DEFAULT_CMS_PROCESS.stats, null, 2));
    }
    toast({
      title: "Reset from server",
      description: "Restored latest Stats row from Supabase.",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        throw new Error("Value must be a JSON array");
      }
      setLocal(parsed);
      if (save) {
        await save(parsed);
      }
      setIsSaved(true);
      toast({
        title: "Saved successfully",
        description: "Process stats row has been saved & published.",
      });
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err: unknown) {
      toast({
        variant: "destructive",
        title: "Invalid JSON",
        description:
          err instanceof Error ? err.message : "Please check your JSON format.",
      });
    }
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

              {/* Card: Stats row */}
              <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                  <div className="ch-l flex-1">
                    <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                      Stats row
                    </div>
                    <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                      JSON array · icons: clock|sparkles|shield|globe
                    </div>
                  </div>
                </div>

                <div className="cb p-6">
                  <textarea
                    className="w-full min-h-[100px] p-3 text-[12px] font-mono bg-[#f5f3ee]/50 border border-[#e0ddd6] rounded-[8px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                    rows={14}
                    value={jsonText}
                    onChange={(e) => setJsonText(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
