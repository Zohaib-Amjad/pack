import React from "react";
import { TESTIMONIALS, SITE_CONFIG } from "@/data/seed-data";
import { Star, CheckCircle2, Award, Quote } from "lucide-react";

export function TrustpilotTestimonials() {
  return (
    <section className="py-20 bg-[#E8F4EA] border-t border-[#dce8df]" id="trustpilot-reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Trustpilot score */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-14 text-center md:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white text-[#2d5c3e] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              <Award className="w-3.5 h-3.5 text-[#00b67a]" />
              <span>Verified Customer Reviews</span>
            </div>
            <h2 className="ds-heading text-[#1a1a1a]">
              Rated Excellent by <span className="text-[#2d5c3e]">5,000+ Businesses</span>
            </h2>
            <p className="ds-body max-w-xl">
              See what business owners and founders say about our packaging print quality, turnaround speed, and dedicated USA support.
            </p>
          </div>

          {/* Trustpilot Score Badge */}
          <div className="bg-white p-5 rounded-2xl border border-[#dce8df] shadow-soft flex items-center gap-4">
            <div className="text-center pr-4 border-r border-[#e0ddd6]">
              <div className="text-3xl font-black text-[#1a1a1a]">4.9</div>
              <div className="text-[10px] text-[#7a7672] font-semibold">out of 5.0</div>
            </div>
            <div className="space-y-1">
              <div className="flex text-[#00b67a]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-xs font-bold text-[#1a1a1a] flex items-center gap-1">
                <span>Trustpilot & Google</span>
              </div>
              <div className="text-[10px] text-[#7a7672]">Based on {SITE_CONFIG.rating.totalReviews} reviews</div>
            </div>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-7 border border-[#dce8df] shadow-soft flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#00b67a]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#dce8df]" />
                </div>

                <h3 className="text-sm font-bold text-[#1a1a1a]">
                  &ldquo;{t.highlight}&rdquo;
                </h3>

                <p className="text-xs text-[#4a4a4a] leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f5f3ee] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#1a1a1a] flex items-center gap-1">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00b67a]" />
                  </div>
                  <div className="text-[11px] text-[#7a7672]">
                    {t.role}, <span className="font-semibold text-[#1a1a1a]">{t.company}</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-[#00b67a] bg-[#E8F4EA] px-2 py-0.5 rounded-full">
                  Verified Order
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
