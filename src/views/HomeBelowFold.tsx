"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import FeaturedCategories from "@/components/home/FeaturedCategories";

type FeaturedCategory = {
  id: string;
  name: string;
  slug: string;
  image_url?: string | null;
  show_on_homepage?: boolean;
};

const TrustpilotTestimonialsSection = dynamic(
  () => import("@/components/home/TrustpilotTestimonialsSection"),
  { ssr: false },
);
const DiscountBar = dynamic(() => import("@/components/home/DiscountBar"), { ssr: false });
const TrendingProducts = dynamic(() => import("@/components/home/TrendingProducts"), { ssr: false });
const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"), { ssr: false });
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"), { ssr: false });
const PremiumFinishes = dynamic(() => import("@/components/home/PremiumFinishes"), { ssr: false });
const HomeQuoteSection = dynamic(() => import("@/components/home/HomeQuoteSection"), { ssr: false });
const FAQSection = dynamic(() => import("@/components/home/FAQSection"), { ssr: false });
const HomeMoreProducts = dynamic(() => import("@/components/home/HomeMoreProducts"), { ssr: false });

function LazySection({
  children,
  placeholderClassName,
}: {
  children: ReactNode;
  placeholderClassName: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={visible ? undefined : placeholderClassName}>
      {visible ? children : null}
    </div>
  );
}

export default function HomeBelowFold({
  featuredCategories,
}: {
  featuredCategories: FeaturedCategory[];
}) {
  return (
    <>
      <LazySection placeholderClassName="min-h-[520px] sm:min-h-[400px]">
        <FeaturedCategories categories={featuredCategories} />
      </LazySection>
      <LazySection placeholderClassName="min-h-[100px]">
        <DiscountBar />
      </LazySection>
      <LazySection placeholderClassName="min-h-[850px] sm:min-h-[650px]">
        <TrendingProducts />
      </LazySection>
      <LazySection placeholderClassName="min-h-[700px] sm:min-h-[520px]">
        <HowItWorks />
      </LazySection>
      <LazySection placeholderClassName="min-h-[700px] sm:min-h-[520px]">
        <WhyChooseUs />
      </LazySection>
      <LazySection placeholderClassName="min-h-[480px]">
        <PremiumFinishes />
      </LazySection>
      <LazySection placeholderClassName="min-h-[800px] sm:min-h-[620px]">
        <HomeQuoteSection />
      </LazySection>
      <LazySection placeholderClassName="min-h-[600px]">
        <FAQSection />
      </LazySection>
      <LazySection placeholderClassName="min-h-[520px]">
        <HomeMoreProducts />
      </LazySection>
      <LazySection placeholderClassName="min-h-[650px]">
        <TrustpilotTestimonialsSection />
      </LazySection>
    </>
  );
}