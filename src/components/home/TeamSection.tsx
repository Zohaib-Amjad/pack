"use client";

import React from "react";
import Image from "next/image";
import type { CmsHome } from "@/types/cms";

export interface TeamMemberItem {
  name: string;
  role: string;
  badge: string;
  description: string;
  image: string;
}

const DEFAULT_TEAM_MEMBERS: TeamMemberItem[] = [
  {
    name: "Jason Clarke",
    role: "HEAD OF STRUCTURAL DESIGN",
    badge: "500+ DIELINES",
    description: "Draws every precision dieline, custom insert, and engineers packaging geometry tailored to your product.",
    image: "/images/team/jason-clarke.jpg",
  },
  {
    name: "Erica Stevenson",
    role: "CLIENT & BRAND LEAD",
    badge: "200+ BRANDS ONBOARDED",
    description: "Turns your brief into a practical material, specialty finish (foil, spot UV, embossing), and launch plan.",
    image: "/images/team/erica-stevenson.jpg",
  },
  {
    name: "Mike Bell",
    role: "PRODUCTION & PRESS MANAGER",
    badge: "18 YRS ON PRESS",
    description: "Runs offset and digital production, oversees Pantone color matching, and signs off on flawless finish quality.",
    image: "/images/team/mike-bell.jpg",
  },
  {
    name: "Noah Hill",
    role: "QUALITY & LOGISTICS",
    badge: "99.8% ON-TIME",
    description: "Owns final multi-point QC inspection, secure packing checks, and on-time door-to-door dispatch.",
    image: "/images/team/noah-hill.jpg",
  },
];

type TeamSectionProps = {
  cms?: CmsHome;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  members?: TeamMemberItem[];
};

export default function TeamSection({
  eyebrow = "Direct Packaging Experts",
  title = "Four names, not a ticket queue",
  subtitle = "Every project is run by the same hands from brief to delivery.",
  members = DEFAULT_TEAM_MEMBERS,
}: TeamSectionProps) {
  return (
    <section className="bg-[#faf8f5] border-t border-[#e0ddd6] py-14 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 sm:mb-12">
          <div>
            {eyebrow && (
              <span className="inline-block text-[11px] font-bold tracking-widest text-[#e8732a] uppercase mb-1.5">
                {eyebrow}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1a1a1a] tracking-tight leading-tight">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-[13.5px] text-[#666] leading-relaxed max-w-sm md:text-right pb-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {members.map((member) => (
            <div
              key={member.name}
              className="group bg-white rounded-2xl sm:rounded-[22px] border border-[#e2ded6] p-2.5 sm:p-3 pb-4 sm:pb-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] hover:border-[#d0ccc3] transition-all duration-300 flex flex-col"
            >
              {/* Photo Container with Badge Overlay */}
              <div className="relative aspect-square w-full rounded-xl sm:rounded-[16px] overflow-hidden bg-[#eeebe4] mb-3.5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {member.badge && (
                  <div className="absolute bottom-2.5 left-2.5 z-10 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] sm:text-[9.5px] font-bold tracking-wider text-[#1a1a1a] uppercase shadow-sm border border-black/5">
                    {member.badge}
                  </div>
                )}
              </div>

              {/* Member Information */}
              <div className="px-1.5 flex flex-col flex-1">
                <h3 className="text-[16.5px] sm:text-[17.5px] font-bold text-[#1a1a1a] tracking-tight leading-snug group-hover:text-[#e8732a] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#c85a32] mt-0.5 mb-2">
                  {member.role}
                </p>
                <p className="text-[12px] sm:text-[12.5px] text-[#555] leading-relaxed mt-auto">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
