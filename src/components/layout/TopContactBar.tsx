import React from "react";
import { Phone, Mail, Clock, Star, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/data/seed-data";

export function TopContactBar() {
  return (
    <div className="bg-[#f5f3ee] border-b border-[#e0ddd6] text-xs text-[#4a4a4a] py-2 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${SITE_CONFIG.phone.replace(/\D/g, "")}`}
            className="flex items-center gap-1.5 hover:text-[#e8732a] transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-[#2d5c3e]" />
            <span>{SITE_CONFIG.phone}</span>
          </a>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="flex items-center gap-1.5 hover:text-[#e8732a] transition-colors font-medium"
          >
            <Mail className="w-3.5 h-3.5 text-[#2d5c3e]" />
            <span>{SITE_CONFIG.email}</span>
          </a>
          <div className="flex items-center gap-1.5 text-[#7a7672]">
            <Clock className="w-3.5 h-3.5 text-[#2d5c3e]" />
            <span>Mon - Fri: 8:00 AM - 6:00 PM EST</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1a1a1a]">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span>{SITE_CONFIG.rating.score}/5.0</span>
            <span className="text-[#7a7672] font-normal">({SITE_CONFIG.rating.totalReviews})</span>
          </div>
          <span className="text-[#d8d4cc]">|</span>
          <div className="flex items-center gap-1 text-[#2d5c3e] font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Price Match Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}
