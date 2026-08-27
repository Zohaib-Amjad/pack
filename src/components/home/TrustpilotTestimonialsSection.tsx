"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import TrustpilotBadge from "@/components/TrustpilotBadge";
import {
  TRUSTPILOT_PROFILE_URL,
  TRUSTPILOT_REVIEWS,
  type TrustpilotReview,
} from "@/data/trustpilot-reviews";

const AVATAR_COLORS = [
  "bg-[#2d5c3e] text-white",
  "bg-[#e8732a] text-white",
  "bg-[#1e3d2b] text-white",
  "bg-[#c45a18] text-white",
  "bg-[#3d6b4f] text-white",
];

function ReviewCardItem({ review, colorIndex }: { review: TrustpilotReview; colorIndex: number }) {
  const rating = Math.max(0, Math.min(5, review.rating || 5));
  const avatarClass = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length];

  return (
    <article className="mb-4 shrink-0 rounded-[16px] border border-[#dce8df] bg-white p-5 shadow-[0_8px_24px_rgba(45,92,62,0.06)]">
      {review.title ? (
        <p className="mb-1.5 font-sans text-[13px] font-semibold text-[#1a1a1a]">{review.title}</p>
      ) : null}
      <p className="font-sans text-[13.5px] leading-[1.65] text-[#1a1a1a]">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-3 flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? "fill-[#00b67a] text-[#00b67a]" : "fill-[#e0ddd6] text-[#e0ddd6]"}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-sans text-[12px] font-semibold ${avatarClass}`}
        >
          {review.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate font-sans text-[13px] font-semibold text-[#1a1a1a]">{review.name}</p>
          <p className="truncate font-sans text-[11.5px] text-[#7a7672]">
            {review.location}
            {review.dateLabel ? ` · ${review.dateLabel}` : ""}
          </p>
        </div>
      </div>
    </article>
  );
}

function MarqueeColumn({
  items,
  direction,
  duration,
}: {
  items: TrustpilotReview[];
  direction: "up" | "down";
  duration: string;
}) {
  // Need at least 2 copies for seamless loop; pad if few reviews
  const base = items.length >= 2 ? items : [...items, ...items, ...items];
  const loop = [...base, ...base];

  return (
    <div className="group relative h-[420px] overflow-hidden sm:h-[480px]">
      <div
        className={`flex flex-col will-change-transform group-hover:[animation-play-state:paused] ${
          direction === "up" ? "animate-marquee-vertical-up" : "animate-marquee-vertical-down"
        }`}
        style={{ animationDuration: duration }}
      >
        {loop.map((review, i) => (
          <ReviewCardItem key={`${review.id}-${i}`} review={review} colorIndex={i} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#E8F4EA] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#E8F4EA] to-transparent" />
    </div>
  );
}

const TrustpilotTestimonialsSection = () => {
  const { open } = useQuoteModal();

  const reviews = useMemo(() => TRUSTPILOT_REVIEWS.filter((r) => r.text.trim()), []);

  if (reviews.length === 0) return null;

  // 5 reviews → col A: 3, col B: 2 (balanced dual marquee)
  const leftCol = reviews.filter((_, i) => i % 2 === 0);
  const rightCol = reviews.filter((_, i) => i % 2 === 1);

  return (
    <section className="border-t border-[#dce8df] bg-[#E8F4EA] px-4 py-14 sm:px-10 sm:py-16">
      <div className="mx-auto grid max-w-[1100px] items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
        <div className="max-w-[420px]">
          <p className="ds-eyebrow mb-2 text-accent">Testimonials</p>
          <h2 className="font-display text-[28px] font-semibold leading-[1.15] text-[#1a1a1a] sm:text-[34px]">
            Trusted by <span className="text-accent">Growing Brands</span>
          </h2>
          <p className="mt-3 font-sans text-[13.5px] leading-[1.7] text-[#5a5652]">
            Real Trustpilot reviews from brands who package with HOF Pack.
          </p>

          <div className="mt-5">
            <TrustpilotBadge theme="light" />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => open()}
              className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-accent px-5 py-3 font-sans text-[12.5px] font-semibold text-white transition-colors hover:bg-[var(--ds-orange-hover)]"
            >
              Customize now
              <ArrowRight size={14} strokeWidth={2.5} />
            </button>
            <Link
              href="/our-products"
              className="inline-flex items-center justify-center rounded-[8px] border border-[#c5d6ca] bg-white px-5 py-3 font-sans text-[12.5px] font-semibold text-[#1a1a1a] no-underline transition-colors hover:border-[#a8c4b0] hover:bg-[#f7fbf8]"
            >
              Browse all products
            </Link>
          </div>

          <a
            href={TRUSTPILOT_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 font-sans text-[12px] font-medium text-[#00b67a] no-underline hover:underline"
          >
            See all reviews on Trustpilot
            <ArrowRight size={12} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <MarqueeColumn items={leftCol} direction="up" duration="28s" />
          <div className="hidden sm:block">
            <MarqueeColumn items={rightCol} direction="down" duration="32s" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustpilotTestimonialsSection;