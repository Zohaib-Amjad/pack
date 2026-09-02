"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./MobileMenu";
import { CATEGORIES } from "@/data/seed-data";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";
import {
  ArrowRight,
  Box,
  Layers,
  Sparkles,
  Search,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openQuoteModal } = useQuoteModal();
  const navRef = useRef<HTMLElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const industryItems = [
    { name: "Bakery Boxes", slug: "bakery-boxes", desc: "FDA food-grade cartons & gable boxes" },
    { name: "Candle Boxes", slug: "custom-candle-boxes", desc: "Crash-lock heavy duty candle boxes" },
    { name: "Coffee Packaging", slug: "custom-coffee-packaging", desc: "Degassing valve barrier pouches" },
    { name: "Cosmetic Boxes", slug: "custom-cosmetic-boxes", desc: "Luxury skincare & makeup packaging" },
    { name: "Custom Cigarette Boxes", slug: "custom-cigarette-boxes", desc: "Flip-top & sliding cigarette packaging" },
    { name: "Custom Jewelry Boxes", slug: "custom-jewelry-boxes", desc: "High-end luxury jewelry packaging boxes" },
    { name: "Custom Retail Boxes", slug: "custom-retail-boxes", desc: "Versatile retail packaging cartons" },
    { name: "Custom Wax Papers", slug: "custom-wax-papers", desc: "FDA-approved custom printed deli wraps" },
    { name: "Pre Roll Boxes", slug: "pre-roll-boxes", desc: "Child-resistant pre-roll cartons & slider boxes" },
    { name: "Soap Boxes", slug: "custom-soap-boxes", desc: "Kraft die-cut soap boxes & sleeves" },
  ];

  const materialItems = [
    { name: "Corrugated Cardboard", slug: "custom-corrugated-boxes", desc: "E-Flute, B-Flute, Double-wall heavy duty" },
    { name: "Eco-Friendly Kraft", slug: "custom-kraft-boxes", desc: "100% Recycled natural brown & bleached kraft" },
    { name: "Luxury Rigid Greyboard", slug: "custom-rigid-boxes", desc: "1200 - 1800 GSM wrapped presentation boxes" },
    { name: "SBS Premium Paperboard", slug: "custom-mailer-boxes", desc: "16pt - 24pt vibrant retail folding cartons" },
    { name: "High-Barrier Foil Mylar", slug: "custom-mylar-bags", desc: "Moisture & odor-proof foil stand-up pouches" },
  ];

  const styleItems = [
    { name: "Custom Mailer Boxes", slug: "custom-mailer-boxes", desc: "Roll end tuck-top unboxing mailers" },
    { name: "Two-Piece Rigid Boxes", slug: "custom-rigid-boxes", desc: "Lid and base luxury gift presentation" },
    { name: "Magnetic Closure Boxes", slug: "custom-rigid-boxes", desc: "Concealed magnetic flip-top luxury boxes" },
    { name: "Straight / Reverse Tuck Boxes", slug: "custom-kraft-boxes", desc: "Standard retail carton boxes" },
    { name: "Stand-Up Pouches", slug: "custom-mylar-bags", desc: "Resealable zipper barrier pouches" },
    { name: "Gable & Handle Boxes", slug: "bakery-boxes", desc: "Foldable top-handle retail packaging" },
  ];

  const helpItems = [
    { name: "Artwork Guidelines", href: "/artwork-guidelines", desc: "Pre-press dieline & vector artwork specs" },
    { name: "Blog", href: "/blog", desc: "Unboxing guides, industry insights & news" },
    { name: "Library", href: "/library", desc: "Downloadable dieline templates & charts" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background lg:bg-background/95 lg:backdrop-blur-md"
    >
      {/* 1. Top Utility Bar (Exact markup from hofpack.com) */}
      <div className="hidden lg:block bg-[#2d5c3e] text-white">
        <div className="container-max flex h-8 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left items */}
          <div className="flex items-center gap-[18px]">
            <div className="flex items-center gap-[5px] font-sans text-[11px] text-white/80">
              <div className="w-[5px] h-[5px] rounded-full bg-accent shrink-0" />
              Earth-Friendly Packaging
            </div>
            <div className="flex items-center gap-[5px] font-sans text-[11px] text-white/80">
              <div className="w-[5px] h-[5px] rounded-full bg-accent shrink-0" />
              Cruelty-Free
            </div>
            <div className="flex items-center gap-[5px] font-sans text-[11px] text-white/80">
              <div className="w-[5px] h-[5px] rounded-full bg-accent shrink-0" />
              Made in USA
            </div>
            <div className="flex items-center gap-[5px] font-sans text-[11px] text-white/80">
              <div className="w-[5px] h-[5px] rounded-full bg-accent shrink-0" />
              Low MOQ
            </div>
            <div className="flex items-center gap-[5px] font-sans text-[11px] text-white/80">
              <div className="w-[5px] h-[5px] rounded-full bg-accent shrink-0" />
              Free Design Support
            </div>
          </div>

          {/* Right items */}
          <div className="flex items-center gap-[6px] font-sans text-[11.5px] font-medium text-white/90">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                stroke="#e8732a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 6l-10 7L2 6"
                stroke="#e8732a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <a
              href="mailto:info@hofpack.com"
              className="text-white/85 hover:text-accent transition-colors no-underline"
            >
              info@hofpack.com
            </a>
            <span className="text-white/25 mx-1">|</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.06 2.22 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"
                stroke="#e8732a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <a
              href="tel:+18884294881"
              className="text-white/85 hover:text-accent transition-colors no-underline"
            >
              +1 (888) 429 4881
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar Row (Exact markup from hofpack.com) */}
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-20">
          {/* Logo */}
          <Link className="flex items-center gap-2" href="/">
            <img
              alt="HOF Pack"
              loading="lazy"
              width={256}
              height={154}
              decoding="async"
              className="block shrink-0 h-12 lg:h-[52px] w-auto object-contain"
              style={{ color: "transparent" }}
              src="/images/brand/logo-green-orange.png"
            />
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-0.5">
            <Link
              className={`px-3.5 py-2.5 ds-nav-link rounded-md transition-colors ${
                pathname === "/"
                  ? "text-accent font-semibold"
                  : "text-foreground/85 hover:text-foreground"
              }`}
              href="/"
            >
              Home
            </Link>

            {/* Boxes by Industry Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("industry")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "industry" ? null : "industry")
                }
                className={`flex items-center gap-1 px-3.5 py-2.5 ds-nav-link rounded-md transition-colors ${
                  activeDropdown === "industry"
                    ? "text-accent font-semibold"
                    : "text-foreground/85 hover:text-foreground"
                }`}
              >
                <span>Boxes by Industry</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`lucide lucide-chevron-down transition-transform duration-200 ${
                    activeDropdown === "industry" ? "rotate-180 text-accent" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {activeDropdown === "industry" && (
                <div className="absolute top-full left-0 w-[540px] bg-card rounded-2xl shadow-2xl border border-border p-6 z-50 animate-fade-in grid grid-cols-2 gap-3">
                  {industryItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={`/${item.slug}`}
                      onClick={() => setActiveDropdown(null)}
                      className="group p-2.5 rounded-xl hover:bg-background transition-colors flex flex-col"
                    >
                      <span className="text-xs font-bold text-foreground group-hover:text-accent transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground mt-0.5">
                        {item.desc}
                      </span>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-3 border-t border-border flex justify-between items-center text-xs">
                    <Link
                      href="/industries"
                      onClick={() => setActiveDropdown(null)}
                      className="font-bold text-primary hover:text-accent flex items-center gap-1"
                    >
                      View All Industries →
                    </Link>
                    <button
                      onClick={() => {
                        setActiveDropdown(null);
                        openQuoteModal("Industry Packaging");
                      }}
                      className="font-bold text-accent hover:underline"
                    >
                      Get Instant Quote
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Boxes by Material Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("material")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "material" ? null : "material")
                }
                className={`flex items-center gap-1 px-3.5 py-2.5 ds-nav-link rounded-md transition-colors ${
                  activeDropdown === "material"
                    ? "text-accent font-semibold"
                    : "text-foreground/85 hover:text-foreground"
                }`}
              >
                <span>Boxes by Material</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`lucide lucide-chevron-down transition-transform duration-200 ${
                    activeDropdown === "material" ? "rotate-180 text-accent" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {activeDropdown === "material" && (
                <div className="absolute top-full left-0 w-[420px] bg-card rounded-2xl shadow-2xl border border-border p-5 z-50 animate-fade-in space-y-1.5">
                  {materialItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={`/${item.slug}`}
                      onClick={() => setActiveDropdown(null)}
                      className="group block p-2.5 rounded-xl hover:bg-background transition-colors"
                    >
                      <div className="text-xs font-bold text-foreground group-hover:text-accent transition-colors flex items-center justify-between">
                        <span>{item.name}</span>
                        <ArrowRight className="w-3 h-3 text-placeholder group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {item.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Boxes by Style Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("style")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "style" ? null : "style")
                }
                className={`flex items-center gap-1 px-3.5 py-2.5 ds-nav-link rounded-md transition-colors ${
                  activeDropdown === "style"
                    ? "text-accent font-semibold"
                    : "text-foreground/85 hover:text-foreground"
                }`}
              >
                <span>Boxes by Style</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`lucide lucide-chevron-down transition-transform duration-200 ${
                    activeDropdown === "style" ? "rotate-180 text-accent" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {activeDropdown === "style" && (
                <div className="absolute top-full left-0 w-[460px] bg-card rounded-2xl shadow-2xl border border-border p-5 z-50 animate-fade-in space-y-1.5">
                  {styleItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={`/${item.slug}`}
                      onClick={() => setActiveDropdown(null)}
                      className="group block p-2.5 rounded-xl hover:bg-background transition-colors"
                    >
                      <div className="text-xs font-bold text-foreground group-hover:text-accent transition-colors flex items-center justify-between">
                        <span>{item.name}</span>
                        <ArrowRight className="w-3 h-3 text-placeholder group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {item.desc}
                      </div>
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-border">
                    <Link
                      href="/catalog"
                      onClick={() => setActiveDropdown(null)}
                      className="block text-center text-xs font-bold text-accent hover:underline"
                    >
                      Browse All Box Styles ({CATEGORIES.length}) →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Us */}
            <Link
              className={`px-3.5 py-2.5 ds-nav-link rounded-md transition-colors ${
                pathname === "/contact"
                  ? "text-accent font-semibold"
                  : "text-foreground/85 hover:text-foreground"
              }`}
              href="/contact"
            >
              Contact Us
            </Link>

            {/* Help Center Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("help")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "help" ? null : "help")
                }
                className={`flex items-center gap-1 px-3.5 py-2.5 ds-nav-link rounded-md transition-colors ${
                  activeDropdown === "help"
                    ? "text-accent font-semibold"
                    : "text-foreground/85 hover:text-foreground"
                }`}
              >
                <span>Help Center</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`lucide lucide-chevron-down transition-transform duration-200 ${
                    activeDropdown === "help" ? "rotate-180 text-accent" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {activeDropdown === "help" && (
                <div className="absolute top-full right-0 w-64 bg-card rounded-2xl shadow-2xl border border-border p-3 z-50 animate-fade-in space-y-1">
                  {helpItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="group block p-2.5 rounded-xl hover:bg-background transition-colors"
                    >
                      <div className="text-xs font-bold text-foreground group-hover:text-accent transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[10.5px] text-muted-foreground mt-0.5">
                        {item.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="relative">
              <Link
                href="/catalog"
                className="p-2 text-foreground/70 hover:text-foreground transition-colors inline-flex"
                aria-label="Search products"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </Link>
            </div>
            <button
              onClick={() => openQuoteModal()}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-accent text-accent-foreground font-sans font-medium text-[11.5px] uppercase tracking-[0.10em] shadow-md hover:shadow-lg hover:bg-[#c45a18] transition-all duration-300 rounded-lg h-11 px-8 py-3"
            >
              Get a Free Quote
            </button>
          </div>

          {/* Mobile menu toggle hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center text-foreground hover:text-accent transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-tray"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenQuote={() => openQuoteModal()}
      />
    </nav>
  );
}