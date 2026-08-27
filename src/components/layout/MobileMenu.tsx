"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CATEGORIES, SITE_CONFIG } from "@/data/seed-data";
import {
  X,
  ChevronDown,
  Phone,
  Mail,
  Box,
  Layers,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Package,
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export function MobileMenu({ isOpen, onClose, onOpenQuote }: MobileMenuProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const industryItems = [
    { name: "Bakery Boxes", slug: "bakery-boxes" },
    { name: "Candle Boxes", slug: "custom-candle-boxes" },
    { name: "Coffee Packaging", slug: "custom-coffee-packaging" },
    { name: "Cosmetic Boxes", slug: "custom-cosmetic-boxes" },
    { name: "Custom Cigarette Boxes", slug: "custom-cigarette-boxes" },
    { name: "Custom Jewelry Boxes", slug: "custom-jewelry-boxes" },
    { name: "Custom Retail Boxes", slug: "custom-retail-boxes" },
    { name: "Custom Wax Papers", slug: "custom-wax-papers" },
    { name: "Pre Roll Boxes", slug: "pre-roll-boxes" },
    { name: "Soap Boxes", slug: "custom-soap-boxes" },
  ];

  const materialItems = [
    { name: "Corrugated Cardboard", slug: "custom-corrugated-boxes" },
    { name: "Eco-Friendly Kraft Paper", slug: "custom-kraft-boxes" },
    { name: "Luxury Rigid Greyboard", slug: "custom-rigid-boxes" },
    { name: "SBS Paperboard Cartons", slug: "custom-mailer-boxes" },
    { name: "High-Barrier Foil Mylar", slug: "custom-mylar-bags" },
  ];

  const styleItems = [
    { name: "Custom Mailer Boxes", slug: "custom-mailer-boxes" },
    { name: "Two-Piece Rigid Boxes", slug: "custom-rigid-boxes" },
    { name: "Magnetic Luxury Boxes", slug: "custom-rigid-boxes" },
    { name: "Kraft Tuck Boxes", slug: "custom-kraft-boxes" },
    { name: "Stand-Up Foil Pouches", slug: "custom-mylar-bags" },
    { name: "Gable & Handle Boxes", slug: "bakery-boxes" },
  ];

  const helpItems = [
    { name: "Artwork Guidelines", href: "/artwork-guidelines" },
    { name: "Packaging Blog", href: "/blog" },
    { name: "Resource Library", href: "/library" },
    { name: "Track Your Order", href: "/track" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Our Process", href: "/process" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <div className="fixed inset-0 z-[80] lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#f5f3ee] shadow-2xl flex flex-col z-50 overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-[#e0ddd6] flex items-center justify-between bg-white">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#2d5c3e] flex items-center justify-center text-white font-black text-sm">
              <Box className="w-4 h-4 text-emerald-300" />
            </div>
            <span className="font-extrabold text-[#1a1a1a] text-lg">
              HOF <span className="text-[#2d5c3e]">Pack</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#ece9e2] text-[#4a4a4a] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-2 flex-1">
          <Link
            href="/"
            onClick={onClose}
            className="block py-2.5 px-3 rounded-xl text-sm font-bold text-[#1a1a1a] bg-white border border-[#e0ddd6]"
          >
            Home
          </Link>

          {/* Boxes by Industry Accordion */}
          <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("industry")}
              className="w-full flex items-center justify-between py-3 px-3.5 text-sm font-bold text-[#1a1a1a] text-left"
            >
              <span>Boxes by Industry</span>
              <ChevronDown
                className={`w-4 h-4 text-[#7a7672] transition-transform duration-200 ${
                  openSection === "industry" ? "rotate-180 text-[#e8732a]" : ""
                }`}
              />
            </button>
            {openSection === "industry" && (
              <div className="px-3 pb-3 pt-1 space-y-1 bg-[#faf8f5] border-t border-[#e0ddd6]">
                {industryItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/${item.slug}`}
                    onClick={onClose}
                    className="block py-2 px-2.5 text-xs font-medium text-[#4a4a4a] hover:text-[#e8732a] hover:bg-[#f5f3ee] rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Boxes by Material Accordion */}
          <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("material")}
              className="w-full flex items-center justify-between py-3 px-3.5 text-sm font-bold text-[#1a1a1a] text-left"
            >
              <span>Boxes by Material</span>
              <ChevronDown
                className={`w-4 h-4 text-[#7a7672] transition-transform duration-200 ${
                  openSection === "material" ? "rotate-180 text-[#e8732a]" : ""
                }`}
              />
            </button>
            {openSection === "material" && (
              <div className="px-3 pb-3 pt-1 space-y-1 bg-[#faf8f5] border-t border-[#e0ddd6]">
                {materialItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/${item.slug}`}
                    onClick={onClose}
                    className="block py-2 px-2.5 text-xs font-medium text-[#4a4a4a] hover:text-[#e8732a] hover:bg-[#f5f3ee] rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Boxes by Style Accordion */}
          <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("style")}
              className="w-full flex items-center justify-between py-3 px-3.5 text-sm font-bold text-[#1a1a1a] text-left"
            >
              <span>Boxes by Style</span>
              <ChevronDown
                className={`w-4 h-4 text-[#7a7672] transition-transform duration-200 ${
                  openSection === "style" ? "rotate-180 text-[#e8732a]" : ""
                }`}
              />
            </button>
            {openSection === "style" && (
              <div className="px-3 pb-3 pt-1 space-y-1 bg-[#faf8f5] border-t border-[#e0ddd6]">
                {styleItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/${item.slug}`}
                    onClick={onClose}
                    className="block py-2 px-2.5 text-xs font-medium text-[#4a4a4a] hover:text-[#e8732a] hover:bg-[#f5f3ee] rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            onClick={onClose}
            className="block py-2.5 px-3 rounded-xl text-sm font-bold text-[#1a1a1a] bg-white border border-[#e0ddd6]"
          >
            Contact Us
          </Link>

          {/* Help Center Accordion */}
          <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("help")}
              className="w-full flex items-center justify-between py-3 px-3.5 text-sm font-bold text-[#1a1a1a] text-left"
            >
              <span>Help Center</span>
              <ChevronDown
                className={`w-4 h-4 text-[#7a7672] transition-transform duration-200 ${
                  openSection === "help" ? "rotate-180 text-[#e8732a]" : ""
                }`}
              />
            </button>
            {openSection === "help" && (
              <div className="px-3 pb-3 pt-1 space-y-1 bg-[#faf8f5] border-t border-[#e0ddd6]">
                {helpItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className="block py-2 px-2.5 text-xs font-medium text-[#4a4a4a] hover:text-[#e8732a] hover:bg-[#f5f3ee] rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA & Direct Contact */}
        <div className="p-4 border-t border-[#e0ddd6] bg-white space-y-3">
          <button
            onClick={() => {
              onClose();
              onOpenQuote();
            }}
            className="w-full bg-[#e8732a] hover:bg-[#c45a18] text-white py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 ds-btn"
          >
            <span>GET A FREE QUOTE</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="space-y-2 pt-2 text-xs text-[#4a4a4a]">
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-2 hover:text-[#e8732a] font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-[#2d5c3e]" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-2 hover:text-[#e8732a] font-semibold"
            >
              <Mail className="w-3.5 h-3.5 text-[#2d5c3e]" />
              <span>{SITE_CONFIG.email}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}