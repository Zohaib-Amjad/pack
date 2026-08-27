import React from "react";
import { CUSTOMIZATION_OPTIONS } from "@/data/seed-data";
import { Box, Layers, Printer, Sparkles, Sliders } from "lucide-react";

export function CustomizationMatrix() {
  const iconMap: Record<string, React.ReactNode> = {
    Box: <Box className="w-6 h-6 text-[#2d5c3e]" />,
    Layers: <Layers className="w-6 h-6 text-[#e8732a]" />,
    Printer: <Printer className="w-6 h-6 text-[#2d5c3e]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#e8732a]" />,
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#faf8f5] to-[#f5f3ee] border-b border-[#e0ddd6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-[#eaf2ed] text-[#2d5c3e] text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            <span>Options & Finishes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] tracking-tight">
            Build Your Packaging <span className="text-[#2d5c3e]">Any Way You Want</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4a4a4a] leading-relaxed">
            Enjoy unlimited freedom in sizing, structural dielines, sustainable boards, and high-end tactile finishes to make your packaging impossible to ignore.
          </p>
        </div>

        {/* 4 Customization Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CUSTOMIZATION_OPTIONS.map((opt) => (
            <div
              key={opt.id}
              className="bg-white rounded-3xl p-7 border border-[#e0ddd6] shadow-soft hover:shadow-soft-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#faf8f5] flex items-center justify-center border border-[#e0ddd6]">
                  {iconMap[opt.icon]}
                </div>

                <h3 className="text-xl font-bold text-[#1a1a1a]">
                  {opt.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#7a7672] leading-relaxed">
                  {opt.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e0ddd6] text-xs font-bold text-[#e8732a]">
                100% Tailored to Specs
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
