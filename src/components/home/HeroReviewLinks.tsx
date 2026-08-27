"use client";

import { useEffect, useState } from "react";
import { TRUSTPILOT_PROFILE_URL } from "@/data/trustpilot-reviews";
import {
  PRODUCT_GOOGLE_RATING,
  PRODUCT_TRUSTPILOT_RATING,
} from "@/components/ProductRatingSlider";

const GOOGLE_REVIEWS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL?.trim() ||
  "https://share.google/cDClqBdrbxg8EOnS2";

const HERO_RATING_SLIDES = [
  {
    id: "google",
    rating: PRODUCT_GOOGLE_RATING,
    label: "Google",
    href: GOOGLE_REVIEWS_URL,
    starColor: "#fbbc04",
  },
  {
    id: "trustpilot",
    rating: PRODUCT_TRUSTPILOT_RATING,
    label: "Trustpilot",
    href: TRUSTPILOT_PROFILE_URL,
    starColor: "#00b67a",
  },
] as const;

export default function HeroReviewLinks() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_RATING_SLIDES.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  const slide = HERO_RATING_SLIDES[index];
  const score = slide.rating.toFixed(1);

  return (
    <div className="mt-5">
      <a
        key={slide.id}
        href={slide.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 no-underline animate-in fade-in duration-300"
        aria-label={`${slide.label} ${score} rating — view reviews`}
      >
        <span className="font-sans text-[12.5px] font-medium leading-none text-black sm:text-[13px]">
          {score} Rating
        </span>
        <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] shrink-0 sm:h-4 sm:w-4" aria-hidden>
          <path
            fill={slide.starColor}
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
        <span className="font-sans text-[12.5px] font-semibold leading-none text-black group-hover:text-accent sm:text-[13px]">
          {slide.label}
        </span>
      </a>
    </div>
  );
}