"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import {
  TRUSTPILOT_REVIEWS,
  type TrustpilotReview,
} from "@/data/trustpilot-reviews";
import { useCmsHome } from "@/hooks/useCms";
import type { CmsHome } from "@/types/cms";

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

type TrustpilotTestimonialsSectionProps = {
  cms?: CmsHome;
};

const TrustpilotTestimonialsSection = ({ cms }: TrustpilotTestimonialsSectionProps) => {
  const { open } = useQuoteModal();
  const { data } = useCmsHome(cms);
  const tm = data?.testimonials || cms?.testimonials;

  const sectionLabel = tm?.sectionLabel !== undefined ? tm.sectionLabel : "Real Reviews";
  const titleLead = tm?.titleLead !== undefined ? tm.titleLead : "Don't Take Our Word";
  const titleAccent = tm?.titleAccent !== undefined ? tm.titleAccent : "for It";
  const description =
    tm?.description !== undefined
      ? tm.description
      : "Here's what our customers have to say after working with us.";

  const primaryCtaLabel = tm?.primaryCtaLabel !== undefined ? tm.primaryCtaLabel : "Customize now";
  const secondaryCtaLabel =
    tm?.secondaryCtaLabel !== undefined ? tm.secondaryCtaLabel : "Browse all products";
  const secondaryCtaHref = tm?.secondaryCtaHref !== undefined ? tm.secondaryCtaHref : "/our-products";
  const trustpilotLinkLabel =
    tm?.trustpilotLinkLabel !== undefined ? tm.trustpilotLinkLabel : "See all reviews on Trustpilot";
  const trustpilotLinkHref =
    tm?.trustpilotLinkHref !== undefined
      ? tm.trustpilotLinkHref
      : "https://www.trustpilot.com/review/hofpack.com";

  const leftColDirection = tm?.leftColumnDirection === "down" ? "down" : "up";
  const rightColDirection = tm?.rightColumnDirection === "up" ? "up" : "down";
  const speed = tm?.scrollSpeed || "normal";
  const durationLeft = speed === "fast" ? "18s" : speed === "slow" ? "42s" : "28s";
  const durationRight = speed === "fast" ? "22s" : speed === "slow" ? "48s" : "32s";


  const { leftCol, rightCol } = useMemo(() => {
    const rawList = Array.isArray(tm?.items) ? tm.items : [];
    const active = rawList.filter((r) => r.active !== false && (r.text.trim() || r.name.trim()));

    if (active.length === 0) {
      return { leftCol: [] as TrustpilotReview[], rightCol: [] as TrustpilotReview[] };
    }

    const left: TrustpilotReview[] = [];
    const right: TrustpilotReview[] = [];

    active.forEach((r) => {
      const item: TrustpilotReview = {
        id: r.id,
        name: r.name || "Customer",
        location: r.company || "USA",
        initials: r.initials || (r.name ? r.name.slice(0, 2).toUpperCase() : "HP"),
        rating: typeof r.rating === "number" ? r.rating : 5,
        title: r.highlight || undefined,
        text: r.text,
        dateLabel: undefined,
      };

      if (r.column === "left") {
        left.push(item);
      } else if (r.column === "right") {
        right.push(item);
      } else {
        // Auto balance
        if (left.length <= right.length) {
          left.push(item);
        } else {
          right.push(item);
        }
      }
    });

    if (left.length === 0 && right.length > 0) return { leftCol: right, rightCol: right };
    if (right.length === 0 && left.length > 0) return { leftCol: left, rightCol: left };
    return { leftCol: left, rightCol: right };
  }, [tm?.items]);

  const hasReviews = leftCol.length > 0 || rightCol.length > 0;

  return (
    <section className="border-t border-[#dce8df] bg-[#E8F4EA] px-4 py-14 sm:px-10 sm:py-16">
      <div
        className={`mx-auto grid max-w-[1100px] items-center gap-10 ${
          hasReviews ? "lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12" : "grid-cols-1 max-w-[650px] text-center"
        }`}
      >
        <div className="max-w-[420px]">
          {sectionLabel && <p className="ds-eyebrow mb-2 text-accent">{sectionLabel}</p>}
          <h2 className="font-display text-[28px] font-semibold leading-[1.15] text-[#1a1a1a] sm:text-[34px]">
            {titleLead} {titleAccent && <span className="text-accent">{titleAccent}</span>}
          </h2>
          {description && (
            <p className="mt-3 font-sans text-[13.5px] leading-[1.7] text-[#5a5652]">
              {description}
            </p>
          )}



          {(primaryCtaLabel || secondaryCtaLabel) && (
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {primaryCtaLabel && (
                <button
                  type="button"
                  onClick={() => open()}
                  className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-accent px-5 py-3 font-sans text-[12.5px] font-semibold text-white transition-colors hover:bg-[var(--ds-orange-hover)]"
                >
                  {primaryCtaLabel}
                  <ArrowRight size={14} strokeWidth={2.5} />
                </button>
              )}
              {secondaryCtaLabel && (
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex items-center justify-center rounded-[8px] border border-[#c5d6ca] bg-white px-5 py-3 font-sans text-[12.5px] font-semibold text-[#1a1a1a] no-underline transition-colors hover:border-[#a8c4b0] hover:bg-[#f7fbf8]"
                >
                  {secondaryCtaLabel}
                </Link>
              )}
            </div>
          )}

          {trustpilotLinkLabel && (
            <a
              href={trustpilotLinkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-sans text-[12px] font-medium text-[#00b67a] no-underline hover:underline"
            >
              {trustpilotLinkLabel}
              <ArrowRight size={12} />
            </a>
          )}
        </div>

        {hasReviews && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <MarqueeColumn items={leftCol} direction={leftColDirection} duration={durationLeft} />
            <div className="hidden sm:block">
              <MarqueeColumn
                items={rightCol}
                direction={rightColDirection}
                duration={durationRight}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrustpilotTestimonialsSection;