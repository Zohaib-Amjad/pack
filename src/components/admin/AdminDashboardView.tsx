"use client";

import React from "react";
import Link from "next/link";
import {
  Package,
  Layers,
  Mail,
  User,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardView() {
  const recentInquiries = [
    {
      name: "Owen Sorum",
      email: "owensorum@gmail.com",
      interest: "Blank Cigarette Boxes",
      date: "8/27/2026",
    },
    {
      name: "test test",
      email: "test@gmail.com",
      interest: "Corrugated Tuck Top Boxes",
      date: "8/27/2026",
    },
    {
      name: "Chris Martin",
      email: "chrismartin@hofpack.com",
      interest: "General Inquiry",
      date: "8/26/2026",
    },
    {
      name: "Chris Martin",
      email: "chrismartin@hofpack.com",
      interest: "General Inquiry",
      date: "8/26/2026",
    },
    {
      name: "Tallal nasir",
      email: "tallal@hof-global.com",
      interest: "General Inquiry",
      date: "8/26/2026",
    },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ── 1. Top Stat Metric Cards (3 Columns) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Products */}
        <div className="bg-white rounded-2xl p-6 border border-[#e2ded7] shadow-sm relative overflow-hidden transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a7672] mb-2">
                TOTAL PRODUCTS
              </p>
              <h3 className="text-[38px] font-bold text-[#1a1a1a] leading-none">
                165
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#fdf4ee] flex items-center justify-center text-[#e8732a] shrink-0 border border-[#f5dfd0]">
              <Package size={22} strokeWidth={2.2} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#7a7672] mt-4 pt-4 border-t border-[#f0ece3]">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>Live System Status</span>
          </div>
        </div>

        {/* Active Categories */}
        <div className="bg-white rounded-2xl p-6 border border-[#e2ded7] shadow-sm relative overflow-hidden transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a7672] mb-2">
                ACTIVE CATEGORIES
              </p>
              <h3 className="text-[38px] font-bold text-[#1a1a1a] leading-none">
                23
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#fdf4ee] flex items-center justify-center text-[#e8732a] shrink-0 border border-[#f5dfd0]">
              <Layers size={22} strokeWidth={2.2} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#7a7672] mt-4 pt-4 border-t border-[#f0ece3]">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>Live System Status</span>
          </div>
        </div>

        {/* Total Inquiries */}
        <div className="bg-white rounded-2xl p-6 border border-[#e2ded7] shadow-sm relative overflow-hidden transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a7672] mb-2">
                TOTAL INQUIRIES
              </p>
              <h3 className="text-[38px] font-bold text-[#1a1a1a] leading-none">
                90
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#fdf4ee] flex items-center justify-center text-[#e8732a] shrink-0 border border-[#f5dfd0]">
              <Mail size={22} strokeWidth={2.2} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#7a7672] mt-4 pt-4 border-t border-[#f0ece3]">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>Live System Status</span>
          </div>
        </div>
      </div>

      {/* ── 2. Main Two-Column Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-6 items-start">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 border border-[#e2ded7] shadow-sm">
          <div className="flex justify-between items-center pb-4 mb-5 border-b border-[#f0ece3]">
            <div>
              <h4 className="text-[16px] font-bold text-[#1a1a1a]">
                Recent Activity
              </h4>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#7a7672]">
                LATEST CUSTOMER INQUIRIES AND INTERACTIONS
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-[12px] font-semibold text-[#1a1a1a] px-3 py-1.5 rounded-lg border border-[#d8d4cc] hover:bg-[#faf8f5] transition-colors"
            >
              View All
            </Link>
          </div>

          {/* Activity List */}
          <div className="divide-y divide-[#f2eee8]">
            {recentInquiries.map((inq, index) => (
              <div
                key={index}
                className="py-3.5 flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[#e8f2ec] text-[#2d5c3e] flex items-center justify-center shrink-0 border border-[#d2e4d9]">
                    <User size={16} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-bold text-[#1a1a1a] truncate">
                      {inq.name}
                    </p>
                    <p className="text-[12px] text-[#5a5652] truncate">
                      <span className="text-[#2d5c3e]">{inq.email}</span> is
                      interested in {inq.interest}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#faf8f5] border border-[#e0ddd6] text-[#5a5652]">
                    {inq.date}
                  </span>
                  <Link
                    href="/admin/inquiries"
                    className="text-[12px] font-medium px-3 py-1 rounded-md border border-[#d8d4cc] text-[#1a1a1a] hover:bg-[#2d5c3e] hover:text-white hover:border-[#2d5c3e] transition-colors"
                  >
                    Reply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-[#e2ded7] shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-4 mb-5 border-b border-[#f0ece3]">
              <h4 className="text-[16px] font-bold text-[#1a1a1a]">
                Quick Actions
              </h4>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#7a7672]">
                FREQUENTLY USED MANAGEMENT TOOLS
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Primary Action */}
              <Link
                href="/admin/products"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#e8732a] text-white font-semibold text-[13.5px] hover:bg-[#c45a18] transition-all shadow-sm"
              >
                <Package size={17} strokeWidth={2.2} />
                Manage All Products
              </Link>

              {/* Secondary Action */}
              <Link
                href="/admin/portfolio"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-[#d8d4cc] text-[#1a1a1a] font-semibold text-[13.5px] hover:bg-[#faf8f5] hover:border-[#2d5c3e] transition-all"
              >
                <Layers size={17} strokeWidth={2.2} />
                Portfolio Gallery
              </Link>
            </div>
          </div>

          {/* Tip Callout */}
          <div className="mt-6 p-4 rounded-xl bg-[#edf5f0] border border-[#cbe4d4] flex items-start gap-2.5">
            <Sparkles size={16} className="text-[#2d5c3e] shrink-0 mt-0.5" />
            <p className="text-[12px] text-[#2d5c3e] leading-relaxed">
              <span className="font-bold">Tip:</span> You can quickly toggle
              product visibility in the &quot;All Products&quot; section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
