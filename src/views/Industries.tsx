"use client";

import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Sparkles, UtensilsCrossed, Shirt, Cpu, ArrowRight } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import indEcommerce from "@/assets/ind-ecommerce.jpg";
import indCosmetics from "@/assets/ind-cosmetics.jpg";
import indFood from "@/assets/ind-food.jpg";
import indFashion from "@/assets/ind-fashion.jpg";
import indTech from "@/assets/ind-tech.jpg";

const industries = [
  {
    icon: ShoppingCart,
    title: "E-Commerce & DTC",
    desc: "Mailer boxes, custom inserts, and branded tissue that make your unboxing worth sharing. We work with Shopify sellers, Amazon brands, and direct-to-consumer businesses of all sizes.",
    image: indEcommerce,
    stats: "2,000+ DTC brands",
  },
  {
    icon: Sparkles,
    title: "Cosmetics & Beauty",
    desc: "Rigid boxes with magnetic closures, velvet inserts, and premium finishes. Packaging that matches the quality your customers expect from a beauty brand.",
    image: indCosmetics,
    stats: "500+ beauty brands",
  },
  {
    icon: UtensilsCrossed,
    title: "Food & Beverage",
    desc: "FDA-compliant packaging for snacks, coffee, supplements, and more. Food-safe materials that keep your products fresh and your brand looking sharp.",
    image: indFood,
    stats: "FDA compliant",
  },
  {
    icon: Shirt,
    title: "Apparel & Fashion",
    desc: "Custom garment boxes, tissue paper, and shopping bags that extend your brand beyond the product itself. Make the packaging part of the experience.",
    image: indFashion,
    stats: "Premium finishes",
  },
  {
    icon: Cpu,
    title: "Electronics & Tech",
    desc: "Precision-cut foam inserts and protective packaging for electronics. Clean, modern designs that communicate quality before the box is even opened.",
    image: indTech,
    stats: "Custom foam inserts",
  },
];

const Industries = () => {
  const { open } = useQuoteModal();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="ds-eyebrow text-accent mb-3">By Industry</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground">
            Built for <span className="text-accent">Your Industry</span>
          </h1>
          <p className="mt-4 text-primary-foreground/70 max-w-2xl mx-auto text-lg font-sans">
            We know every industry has different packaging needs. Here&apos;s how we handle yours.
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding bg-background">
        <div className="container-max max-w-6xl">
          <div className="space-y-20 lg:space-y-28">
            {industries.map((ind, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                  <div className="w-full lg:w-1/2">
                    <div className="relative group">
                      <div className="overflow-hidden rounded-2xl border border-border shadow-lg relative h-72 sm:h-80 lg:h-96">
                        <Image
                          src={ind.image}
                          alt={ind.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                      <div className={`absolute bottom-4 ${isEven ? 'right-4' : 'left-4'} bg-card/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-border shadow-md`}>
                        <span className="text-xs font-semibold text-accent font-sans">{ind.stats}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className={`${isEven ? "lg:pl-4" : "lg:pr-4"}`}>
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mb-5">
                        <ind.icon size={28} className="text-accent" />
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">{ind.title}</h2>
                      <p className="mt-4 text-muted-foreground leading-relaxed font-sans text-base lg:text-lg">{ind.desc}</p>
                      <Button variant="cta" className="mt-6" onClick={() => open()}>
                        Get a Quote <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Industries;