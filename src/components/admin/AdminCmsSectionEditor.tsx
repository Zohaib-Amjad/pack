"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Save, Check, Sparkles, Image as ImageIcon, Eye } from "lucide-react";

export default function AdminCmsSectionEditor() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug.join("/") : params?.slug || "section";

  // Section title formatter
  const formattedTitle = slug
    .split("/")
    .map((part) =>
      part
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    )
    .join(" · ");

  const [heading, setHeading] = useState("Custom Packaging That Elevates Your Brand");
  const [subheading, setSubheading] = useState(
    "High quality custom boxes and flexible packaging with low MOQ, free 3D design support, and rapid turnaround across the United States."
  );
  const [ctaText, setCtaText] = useState("Get Instant Quote");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-6 sm:p-8 max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#e0ddd6]">
          <div>
            <h2 className="text-[20px] font-bold text-[#1a1a1a] capitalize">
              {formattedTitle} Section
            </h2>
            <p className="text-[12px] text-[#7a7672]">
              Edit live content and layout properties for this section.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="h-[40px] inline-flex items-center gap-[7px] px-6 text-[12px] font-bold rounded-[8px] bg-[#2d5c3e] text-white hover:bg-[#1e3d2b] transition-all shadow-sm cursor-pointer"
            >
              {isSaved ? (
                <>
                  <Check size={16} /> Saved!
                </>
              ) : (
                <>
                  <Save size={15} /> Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#e2ded7] shadow-sm flex flex-col gap-5">
          <div>
            <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1.5">
              Section Main Heading / Title
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full h-11 px-3.5 text-[14px] font-medium bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1.5">
              Description / Paragraph Text
            </label>
            <textarea
              rows={4}
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              className="w-full p-3.5 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1.5">
                Primary Button Label
              </label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full h-10 px-3.5 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#1a1a1a] mb-1.5">
                Visibility Status
              </label>
              <select className="w-full h-10 px-3.5 text-[13px] bg-[#faf8f5] border border-[#d8d4cc] rounded-lg text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:bg-white font-medium">
                <option value="published">Published & Visible</option>
                <option value="draft">Draft Mode (Hidden)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="bg-[#edf5f0] border border-[#cbe4d4] rounded-2xl p-6">
          <div className="flex items-center gap-2 text-[#2d5c3e] font-bold text-[13px] mb-3">
            <Sparkles size={16} />
            <span>Section Preview</span>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#e0ddd6]">
            <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-2">{heading}</h3>
            <p className="text-[13px] text-[#5a5652] leading-relaxed mb-4">{subheading}</p>
            <button
              type="button"
              className="px-5 py-2.5 rounded-lg bg-[#e8732a] text-white font-bold text-[12px]"
            >
              {ctaText}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
