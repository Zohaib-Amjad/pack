"use client";

import { useEffect, useId, useState } from "react";
import { TRUSTPILOT_PROFILE_URL } from "@/data/trustpilot-reviews";

/** Ratings shown on every product page — update numbers here when needed */
export const PRODUCT_TRUSTPILOT_RATING = 4.1;
export const PRODUCT_GOOGLE_RATING = 5.0;

/** Google Business / reviews page — override via env */
const GOOGLE_REVIEWS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL?.trim() ||
  "https://share.google/cDClqBdrbxg8EOnS2";

type Slide = {
  id: string;
  label: string;
  rating: number;
  href: string;
  starStyle: "trustpilot" | "google";
};

const SLIDES: Slide[] = [
  {
    id: "trustpilot",
    label: "Trustpilot",
    rating: PRODUCT_TRUSTPILOT_RATING,
    href: TRUSTPILOT_PROFILE_URL,
    starStyle: "trustpilot",
  },
  {
    id: "google",
    label: "Google",
    rating: PRODUCT_GOOGLE_RATING,
    href: GOOGLE_REVIEWS_URL,
    starStyle: "google",
  },
];

function TrustpilotStars({ rating }: { rating: number }) {
  const clamped = Math.max(0, Math.min(5, rating));

  return (
    <div className="flex shrink-0 items-center gap-[3px]" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, clamped - i));
        return (
          <span
            key={i}
            className="relative inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center overflow-hidden rounded-[3px] bg-[#dcdce6] sm:h-6 sm:w-6"
          >
            {/* Green fill (partial for half-stars) */}
            <span
              className="absolute inset-y-0 left-0 bg-[#00b67a]"
              style={{ width: `${fill * 100}%` }}
            />
            {/* White star inside every Trustpilot box */}
            <svg
              viewBox="0 0 24 24"
              className="relative z-[1] h-[12px] w-[12px] sm:h-[14px] sm:w-[14px]"
              aria-hidden
            >
              <path
                fill="#ffffff"
                d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          </span>
        );
      })}
    </div>
  );
}

function GoogleStars({ rating }: { rating: number }) {
  const clamped = Math.max(0, Math.min(5, rating));
  const uid = useId().replace(/:/g, "");

  return (
    <div className="flex shrink-0 items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, clamped - i));
        const gid = `${uid}-g-${i}`;
        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 sm:h-[22px] sm:w-[22px]"
          >
            <defs>
              <linearGradient id={gid} x1="0" x2="1" y1="0" y2="0">
                <stop offset={`${fill * 100}%`} stopColor="#fbbc04" />
                <stop offset={`${fill * 100}%`} stopColor="#dadce0" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${gid})`}
              d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        );
      })}
    </div>
  );
}

/**
 * Auto-sliding Trustpilot ↔ Google rating row on product pages.
 * Entire slide is clickable → opens that platform’s reviews.
 */
export default function ProductRatingSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  const slide = SLIDES[index];
  const label = slide.rating.toFixed(1);

  return (
    <div className="flex flex-col gap-2">
      <a
        href={slide.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex w-fit max-w-full items-center gap-2.5 no-underline transition-opacity hover:opacity-85"
        aria-label={`${slide.label} rating ${label} out of 5 — view reviews`}
      >
        {slide.starStyle === "trustpilot" ? (
          <TrustpilotStars rating={slide.rating} />
        ) : (
          <GoogleStars rating={slide.rating} />
        )}
        <span className="font-sans text-[14px] font-semibold leading-none text-[#1a1a1a] group-hover:text-accent sm:text-[15px]">
          {slide.label}
        </span>
        <span className="font-sans text-[16px] font-semibold leading-none text-[#1a1a1a] sm:text-[17px]">
          {label}
        </span>
      </a>

      <div className="flex items-center gap-1.5" role="tablist" aria-label="Review platforms">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${s.label} rating`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-accent" : "w-1.5 bg-[#d8d4cc] hover:bg-[#b8b4ac]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}