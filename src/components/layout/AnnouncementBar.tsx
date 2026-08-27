"use client";

import React, { useState, useEffect } from "react";
import { SITE_CONFIG } from "@/data/seed-data";
import { ChevronRight, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const announcements = SITE_CONFIG.announcements;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <aside aria-label="Announcement" className="bg-[#1e3d2b] text-white py-2 px-4 text-xs sm:text-sm font-medium relative z-50 border-b border-[#2d5c3e]/40 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden lg:flex items-center gap-2 text-emerald-300/80">
          <Sparkles className="w-3.5 h-3.5" />
          <span>USA Registered & BBB Accredited A+</span>
        </div>

        <div className="flex-1 flex items-center justify-center overflow-hidden h-5">
          <div
            key={currentIndex}
            className="animate-fade-in flex items-center gap-2 text-center transition-all duration-500"
          >
            <span className="font-semibold text-emerald-200">
              {announcements[currentIndex]}
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-xs text-emerald-200/90">
          <a
            href="#quote"
            className="inline-flex items-center gap-1 hover:text-white transition-colors underline underline-offset-2"
          >
            <span>Claim Discount</span>
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </aside>
  );
}