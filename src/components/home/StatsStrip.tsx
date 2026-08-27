import React from "react";
import { Users, Star, RefreshCw, Clock } from "lucide-react";

export function StatsStrip() {
  const stats = [
    {
      value: "5,000+",
      label: "Brands Served Across USA",
      icon: <Users className="w-5 h-5 text-[#e8732a]" />,
    },
    {
      value: "4.9 / 5.0",
      label: "Average Customer Rating",
      icon: <Star className="w-5 h-5 text-amber-500 fill-amber-500" />,
    },
    {
      value: "98.4%",
      label: "Client Reorder Rate",
      icon: <RefreshCw className="w-5 h-5 text-[#2d5c3e]" />,
    },
    {
      value: "< 2 Hours",
      label: "Fastest Quote Turnaround",
      icon: <Clock className="w-5 h-5 text-[#e8732a]" />,
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-[#e0ddd6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#faf8f5] border border-[#e0ddd6]"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm mb-3">
                {s.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#1a1a1a] tracking-tight">
                {s.value}
              </div>
              <div className="text-xs font-semibold text-[#7a7672] mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
