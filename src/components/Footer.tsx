"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, MapPin, Phone, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (name: string) => {
    setOpenSection((prev) => (prev === name ? null : name));
  };

  return (
    <footer className="text-white">
      <div className="bg-[#1e3d2b]">
        <div className="mx-auto max-w-[1300px] px-4 py-[52px] sm:px-8 sm:pb-10">
          <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 xl:gap-14">
            {/* Left Column */}
            <div className="w-full max-w-[320px]">
              <Link href="/" className="inline-block transition-opacity hover:opacity-90" aria-label="HOF Pack Home">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="HOF Pack"
                  loading="lazy"
                  width="1080"
                  height="1080"
                  className="mb-[14px] w-[200px] h-auto -mt-16 -mb-8"
                  style={{ color: "transparent" }}
                  src="/images/brand/logo-white.png"
                />
              </Link>
              <p className="mb-5 text-[12.5px] leading-[1.65] text-white/70">
                Premium custom packaging for brands that care about presentation. Made in the USA.
              </p>
              <div className="mb-5 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                  STORE DETAILS
                </p>
                <div className="space-y-1.5 text-[12.5px] leading-relaxed text-white/70">
                  <p>
                    <span className="font-bold text-white">Business Name:</span> HOFPACK LLC
                  </p>
                  <p>
                    <span className="font-bold text-white">Store Name:</span> HOF Pack
                  </p>
                  <p>
                    <span className="font-bold text-white">EIN Assigned:</span> 41–5364572
                  </p>
                  <p>
                    <span className="font-bold text-white">Location:</span> 3700 W Tybolt Dr, Tucson, AZ 85746, USA
                  </p>
                  <p>
                    <span className="font-bold text-white">Phone:</span>{" "}
                    <a href="tel:+18884294881" className="hover:text-accent transition">
                      +1 (888) 429–4881
                    </a>
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-white/25">We Accept</p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex h-7 w-11 items-center justify-center rounded bg-white px-1">
                    <svg viewBox="0 0 48 16" className="h-4 w-auto" aria-label="Visa">
                      <text x="0" y="13" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="#1A1F71">
                        VISA
                      </text>
                    </svg>
                  </div>
                  <div className="flex h-7 w-11 items-center justify-center rounded bg-white px-1">
                    <svg viewBox="0 0 38 24" className="h-5 w-auto" aria-label="Mastercard">
                      <circle cx="13" cy="12" r="10" fill="#EB001B"></circle>
                      <circle cx="25" cy="12" r="10" fill="#F79E1B"></circle>
                      <path d="M19 5.5a10 10 0 0 1 0 13A10 10 0 0 1 19 5.5z" fill="#FF5F00"></path>
                    </svg>
                  </div>
                  <div className="flex h-7 w-11 items-center justify-center rounded bg-white px-1">
                    <svg viewBox="0 0 60 16" className="h-4 w-auto" aria-label="PayPal">
                      <text x="0" y="12" fontFamily="Arial" fontSize="11" fontWeight="bold" fill="#003087">
                        Pay
                      </text>
                      <text x="22" y="12" fontFamily="Arial" fontSize="11" fontWeight="bold" fill="#009cde">
                        Pal
                      </text>
                    </svg>
                  </div>
                  <div className="flex h-7 w-11 items-center justify-center rounded bg-[#2E77BC] px-1">
                    <svg viewBox="0 0 52 14" className="h-3 w-auto" aria-label="American Express">
                      <text x="0" y="11" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="white">
                        AMEX
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <p className="mb-2.5 text-[10px] uppercase tracking-[0.14em] text-white/25">Trusted &amp; Secure</p>
                <div className="flex flex-wrap items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Trust Badge"
                    loading="lazy"
                    width="80"
                    height="48"
                    className="h-12 w-auto object-contain drop-shadow-md"
                    style={{ color: "transparent" }}
                    src="/images/brand/trust-badge.png"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Comodo Secure"
                    loading="lazy"
                    width="80"
                    height="48"
                    className="h-12 w-auto object-contain drop-shadow-md"
                    style={{ color: "transparent" }}
                    src="/images/brand/badge-comodo.png"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="SSL Certified"
                    loading="lazy"
                    width="80"
                    height="48"
                    className="h-12 w-auto object-contain drop-shadow-md"
                    style={{ color: "transparent" }}
                    src="/images/brand/badge-ssl-certified.png"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Guaranteed"
                    loading="lazy"
                    width="80"
                    height="48"
                    className="h-12 w-auto object-contain drop-shadow-md"
                    style={{ color: "transparent" }}
                    src="/images/brand/badge-guaranteed.png"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Secure Payment"
                    loading="lazy"
                    width="48"
                    height="48"
                    className="h-12 w-auto object-contain drop-shadow-md"
                    style={{ color: "transparent" }}
                    src="/images/brand/badge-secure-payment.png"
                  />
                </div>
              </div>
              <div className="mt-8 flex gap-[10px]">
                <a
                  href="https://www.facebook.com/people/HOF-Pack/61583706969172/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/15 text-white/60 transition hover:border-accent hover:text-accent"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/hofpack/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/15 text-white/60 transition hover:border-accent hover:text-accent"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@hofpack"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/15 text-white/60 transition hover:border-accent hover:text-accent"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.pinterest.com/hofpack/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/15 text-white/60 transition hover:border-accent hover:text-accent"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Desktop Navigation (Single 5-column row) */}
            <div className="hidden md:grid w-full md:grid-cols-5 md:gap-4 lg:gap-6">
              {/* Business */}
              <div>
                <h4 className="mb-[14px] text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                  Business
                </h4>
                <ul className="space-y-[9px]">
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/about">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/case-studies">
                      Case Studies
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Policies */}
              <div>
                <h4 className="mb-[14px] text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                  Policies
                </h4>
                <ul className="space-y-[9px]">
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/privacy">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/terms">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/refund-policy">
                      Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/shipping-policy">
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/cancellation-policy">
                      Cancellation Policy
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/sitemap.xml">
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Category */}
              <div>
                <h4 className="mb-[14px] text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                  Category
                </h4>
                <ul className="space-y-[9px]">
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/custom-coffee-packaging">
                      Coffee Packaging
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/custom-mylar-bags">
                      Mylar Bags
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/custom-rigid-boxes">
                      Rigid Boxes
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/custom-display-boxes">
                      Display Boxes
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/custom-tuck-boxes">
                      Tuck Boxes
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Products */}
              <div>
                <h4 className="mb-[14px] text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                  Products
                </h4>
                <ul className="space-y-[9px]">
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/child-resistant-boxes">
                      Child Resistant Rigid Boxes
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/coffee-cup-sleeves">
                      Coffee Cup Sleeves
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/stand-up-pouches">
                      Custom Stand Up Pouches
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/tuck-top-boxes">
                      Custom Tuck Top Boxes
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/kraft-mylar-bags">
                      Kraft Mylar Bags
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/kraft-pillow-boxes">
                      Kraft Pillow Boxes
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/magnetic-closure-boxes">
                      Magnetic Closure Boxes
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/retail-display-boxes">
                      Retail Display Boxes
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="mb-[14px] text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                  Contact
                </h4>
                <ul className="space-y-[9px]">
                  <li>
                    <a href="mailto:info@hofpack.com" className="text-[12.5px] text-white/70 transition hover:text-accent">
                      info@hofpack.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+18884294881" className="text-[12.5px] text-white/70 transition hover:text-accent">
                      +1 (888) 429 4881
                    </a>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/contact">
                      Live Chat
                    </Link>
                  </li>
                  <li>
                    <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/contact">
                      Get a Quote
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mobile Accordions */}
            <div className="block md:hidden w-full border-t border-white/10">
              {/* Business */}
              <div className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => toggleSection("business")}
                  className="flex w-full items-center justify-between py-3 text-left"
                  aria-expanded={openSection === "business"}
                >
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">Business</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${
                      openSection === "business" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openSection === "business" ? "max-h-[300px] pb-3" : "max-h-0"
                  }`}
                >
                  <ul className="space-y-[9px] pt-1">
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/about">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/case-studies">
                        Case Studies
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Policies */}
              <div className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => toggleSection("policies")}
                  className="flex w-full items-center justify-between py-3 text-left"
                  aria-expanded={openSection === "policies"}
                >
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">Policies</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${
                      openSection === "policies" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openSection === "policies" ? "max-h-[300px] pb-3" : "max-h-0"
                  }`}
                >
                  <ul className="space-y-[9px] pt-1">
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/privacy">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/terms">
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/refund-policy">
                        Refund Policy
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/shipping-policy">
                        Shipping Policy
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/cancellation-policy">
                        Cancellation Policy
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/sitemap.xml">
                        Sitemap
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Category */}
              <div className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => toggleSection("category")}
                  className="flex w-full items-center justify-between py-3 text-left"
                  aria-expanded={openSection === "category"}
                >
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">Category</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${
                      openSection === "category" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openSection === "category" ? "max-h-[300px] pb-3" : "max-h-0"
                  }`}
                >
                  <ul className="space-y-[9px] pt-1">
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/custom-coffee-packaging">
                        Coffee Packaging
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/custom-mylar-bags">
                        Mylar Bags
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/custom-rigid-boxes">
                        Rigid Boxes
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/custom-display-boxes">
                        Display Boxes
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/custom-tuck-boxes">
                        Tuck Boxes
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Products */}
              <div className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => toggleSection("products")}
                  className="flex w-full items-center justify-between py-3 text-left"
                  aria-expanded={openSection === "products"}
                >
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">Products</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${
                      openSection === "products" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openSection === "products" ? "max-h-[350px] pb-3" : "max-h-0"
                  }`}
                >
                  <ul className="space-y-[9px] pt-1">
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/child-resistant-boxes">
                        Child Resistant Rigid Boxes
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/coffee-cup-sleeves">
                        Coffee Cup Sleeves
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/stand-up-pouches">
                        Custom Stand Up Pouches
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/tuck-top-boxes">
                        Custom Tuck Top Boxes
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/kraft-mylar-bags">
                        Kraft Mylar Bags
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/kraft-pillow-boxes">
                        Kraft Pillow Boxes
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/magnetic-closure-boxes">
                        Magnetic Closure Boxes
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/product/retail-display-boxes">
                        Retail Display Boxes
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact */}
              <div className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => toggleSection("contact")}
                  className="flex w-full items-center justify-between py-3 text-left"
                  aria-expanded={openSection === "contact"}
                >
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">Contact</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${
                      openSection === "contact" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openSection === "contact" ? "max-h-[300px] pb-3" : "max-h-0"
                  }`}
                >
                  <ul className="space-y-[9px] pt-1">
                    <li>
                      <a href="mailto:info@hofpack.com" className="text-[12.5px] text-white/70 transition hover:text-accent">
                        info@hofpack.com
                      </a>
                    </li>
                    <li>
                      <a href="tel:+18884294881" className="text-[12.5px] text-white/70 transition hover:text-accent">
                        +1 (888) 429 4881
                      </a>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/contact">
                        Live Chat
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[12.5px] text-white/70 transition hover:text-accent" href="/contact">
                        Get a Quote
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-[18px]">
            <div className="flex flex-col gap-4 text-[11.5px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-center sm:text-left">
                &copy; {new Date().getFullYear()} HOF Pack. All rights reserved.
              </p>
              {/* Policy links hidden for now
              <div className="flex flex-wrap justify-center gap-3 sm:gap-5 sm:justify-end">
                <Link className="transition hover:text-white/70" href="/privacy">
                  Privacy Policy
                </Link>
                <Link className="transition hover:text-white/70" href="/terms">
                  Terms of Service
                </Link>
                <Link className="transition hover:text-white/70" href="/refund-policy">
                  Refund Policy
                </Link>
                <Link className="transition hover:text-white/70" href="/shipping-policy">
                  Shipping Policy
                </Link>
                <Link className="transition hover:text-white/70" href="/sitemap.xml">
                  Sitemap
                </Link>
              </div>
              */}
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-5">
              <p className="shrink-0 font-sans text-[13px] font-medium text-white sm:text-[14px]">
                Logistics Partners
              </p>
              <div className="flex flex-wrap items-center justify-center p-0 m-0 sm:justify-end" style={{ gap: 10 }}>
                {/* DHL */}
                <span className="m-0 inline-flex items-center p-0 leading-none">
                  <svg viewBox="0 0 46 16" width="58" height="20" className="m-0 block p-0" role="img" aria-label="DHL">
                    <title>DHL</title>
                    <text
                      x="1"
                      y="14"
                      fontFamily="Arial Black, Impact, sans-serif"
                      fontSize="15"
                      fontWeight="900"
                      fontStyle="italic"
                      fill="#D40511"
                      letterSpacing="-1.2"
                    >
                      DHL
                    </text>
                  </svg>
                </span>
                {/* UPS */}
                <span className="m-0 inline-flex items-center p-0 leading-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="UPS"
                    loading="lazy"
                    width="28"
                    height="34"
                    className="m-0 block h-[34px] w-auto p-0 object-contain"
                    style={{ color: "transparent" }}
                    src="/images/logistics/ups.png"
                  />
                </span>
                {/* FedEx */}
                <span className="m-0 inline-flex items-center p-0 leading-none">
                  <svg viewBox="0 0 70 20" width="88" height="20" className="m-0 block p-0" role="img" aria-label="FedEx">
                    <title>FedEx</title>
                    <text
                      x="0"
                      y="16"
                      fontFamily="Arial Black, Arial, sans-serif"
                      fontSize="16"
                      fontWeight="900"
                      fill="#C4B5FD"
                    >
                      Fed
                    </text>
                    <text
                      x="36"
                      y="16"
                      fontFamily="Arial Black, Arial, sans-serif"
                      fontSize="16"
                      fontWeight="900"
                      fill="#FF6600"
                    >
                      Ex
                    </text>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}