import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/home/HeroSection";
import ClientLogosBar from "@/components/home/ClientLogosBar";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import DiscountBar from "@/components/home/DiscountBar";
import TrendingProducts from "@/components/home/TrendingProducts";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HomeQuoteSection from "@/components/home/HomeQuoteSection";
import FAQSection from "@/components/home/FAQSection";
import HomeMoreProducts from "@/components/home/HomeMoreProducts";
import TrustpilotTestimonialsSection from "@/components/home/TrustpilotTestimonialsSection";
import { fetchCmsHomeServer } from "@/lib/cms-server";
import { SITE_CONFIG } from "@/data/seed-data";

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | Custom Packaging Boxes & Mylar Bags | Low MOQ, Free Mockup`,
  description: SITE_CONFIG.description,
};

export default async function HomePage() {
  const cmsHome = await fetchCmsHomeServer();

  return (
    <div className="flex flex-col">
      {/* 1. Announcement Bar */}
      <AnnouncementBar cms={cmsHome} />

      {/* 2. Hero Section */}
      <HeroSection cms={cmsHome} />

      {/* 3. Client Logos Bar / Trust Marquee */}
      <ClientLogosBar cms={cmsHome} />

      {/* 4. Featured Categories (Low MOQ Must-Haves) */}
      <FeaturedCategories categories={[]} />

      {/* 5. Discount Bar (Flat 20% Off) */}
      <DiscountBar />

      {/* 6. Trending Products (Bento Grid) */}
      <TrendingProducts />

      {/* 7. How It Works (4-Step Process & Design Support) */}
      <HowItWorks />

      {/* 8. Sustainability / Greener Earth Section */}
      <WhyChooseUs />

      {/* 9. Home Quote Section */}
      <HomeQuoteSection />

      {/* 10. Common Questions (FAQ Section) */}
      <FAQSection />

      {/* 11. More Products Carousel */}
      <HomeMoreProducts />

      {/* 12. Trustpilot Testimonials Section (End of Home Page) */}
      <TrustpilotTestimonialsSection />
    </div>
  );
}
