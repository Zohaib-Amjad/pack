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

interface AnnouncementMessage {
  id: string;
  text: string;
  active: boolean;
}

const DEFAULT_MESSAGES: AnnouncementMessage[] = [
  {
    id: "ann-0",
    text: "🎉 Flat 20% Off on Your First Order",
    active: true,
  },
  {
    id: "ann-1",
    text: "Free Shipping on All Orders",
    active: true,
  },
  {
    id: "ann-2",
    text: "Fastest Turnaround: 8 to 12 Days Delivery",
    active: true,
  },
  {
    id: "ann-3",
    text: "Low MOQ Starting at 100 Units",
    active: true,
  },
];

export default function AdminAnnouncementBarView() {
  const { toast } = useToast();
  const { local, setLocal, save, saving, refetch } = useCmsHomeSection("announcement");
  const [messages, setMessages] = useState<AnnouncementMessage[]>(DEFAULT_MESSAGES);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (local?.items && Array.isArray(local.items)) {
      setMessages(
        local.items.map((it) => ({
          id: it.id,
          text: it.text ?? "",
          active: it.active !== false,
        }))
      );
    }
  }, [local]);

  const handleToggleActive = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, active: !msg.active } : msg
      )
    );
  };

  const handleChangeText = (id: string, newText: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, text: newText } : msg))
    );
  };

  const handleAddMessage = () => {
    const newMsg: AnnouncementMessage = {
      id: `ann-${Date.now()}`,
      text: "",
      active: true,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleRemoveMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const handleReset = () => {
    if (refetch) {
      refetch();
    } else {
      setMessages(DEFAULT_MESSAGES);
    }
    toast({
      title: "Reset from server",
      description: "Restored latest announcement bar settings.",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAnnouncement = {
      items: messages.map((m) => ({
        id: m.id,
        text: m.text,
        active: m.active,
      })),
    };

    if (setLocal) {
      setLocal(updatedAnnouncement);
    }

    if (save) {
      await save(updatedAnnouncement);
    }

    setIsSaved(true);
    toast({
      title: "Announcement Bar Saved",
      description: "Updated announcement ticker messages on the live homepage.",
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
                  disabled={saving}
                  className="btn h-[36px] px-5 text-[11px] font-bold rounded-[8px] bg-[#e8732a] text-white hover:bg-[#c45a18] disabled:opacity-50 inline-flex items-center gap-2 shadow-[0_4px_14px_rgba(232,115,42,0.2)] cursor-pointer transition-colors"
                >
                  {isSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                  {saving ? "Saving..." : isSaved ? "Saved & published!" : "Save & publish"}
                </button>
              </div>

              {/* Main Card */}
              <div className="card rounded-[16px] border border-[#e0ddd6]/80 bg-white/80 backdrop-blur-md overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                {/* Header */}
                <div className="ch flex items-center justify-between border-b border-[#e0ddd6]/60 bg-[#f5f3ee]/30 p-[18px_24px]">
                  <div className="ch-l flex-1">
                    <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                      Announcement Bar
                    </div>
                    <div className="cs mt-[2px] text-[11px] font-medium uppercase tracking-wider text-[#aaa6a0]">
                      announcement
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="cb p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-[#e0ddd6] pb-3">
                      <div>
                        <h4 className="text-[13px] font-bold text-[#1a1a1a]">
                          Marquee Messages
                        </h4>
                        <p className="text-[11px] text-[#aaa6a0]">
                          These messages rotate in the top dark green ticker bar on the homepage.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddMessage}
                        className="btn h-[32px] px-3 text-[11px] font-bold rounded-[6px] bg-[#eaf2ed] text-[#2d5c3e] hover:bg-[#d8e8dd] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Message
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                      {messages.map((msg, index) => (
                        <div
                          key={msg.id}
                          className="flex items-center gap-3 p-3 rounded-[10px] border border-[#e0ddd6] bg-[#f5f3ee]/30 hover:bg-white transition-all"
                        >
                          <span className="text-[11px] font-bold text-[#aaa6a0] w-6 text-center">
                            #{index + 1}
                          </span>
                          <input
                            type="text"
                            value={msg.text}
                            onChange={(e) => handleChangeText(msg.id, e.target.value)}
                            placeholder="Enter announcement text..."
                            className="flex-1 min-h-[38px] px-3 text-[13px] bg-white border border-[#e0ddd6] rounded-[6px] focus:outline-none focus:border-[#2d5c3e] text-[#1a1a1a]"
                          />
                          <label className="flex items-center gap-2 cursor-pointer select-none text-[12px] font-semibold text-[#5a5652]">
                            <input
                              type="checkbox"
                              checked={msg.active}
                              onChange={() => handleToggleActive(msg.id)}
                              className="w-4 h-4 rounded text-[#2d5c3e] focus:ring-[#2d5c3e] border-[#d8d4cc]"
                            />
                            Active
                          </label>
                          <button
                            type="button"
                            onClick={() => handleRemoveMessage(msg.id)}
                            className="p-2 text-[#aaa6a0] hover:text-red-500 hover:bg-red-50 rounded-[6px] transition-colors"
                            title="Remove message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
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
