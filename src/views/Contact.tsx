"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createPublicClient } from "@/utils/supabase/public-client";
import { trackLeadSubmitted } from "@/lib/analytics";
import { buildInquiryAttribution } from "@/lib/attribution";
import {
  PHONE_NATIONAL_DIGITS,
  sanitizePhoneInput,
  validateOptionalPhone,
  validateRequiredEmail,
  validateRequiredName,
  validateRequiredQuantity,
} from "@/lib/form-validation";
import { useAbandonedFormCapture } from "@/hooks/useAbandonedFormCapture";

const ALL_PRODUCT_OPTIONS = [
  "Custom Cheese Paper",
  "Press On Nail Packaging",
  "3.5 Mylar Bags",
  "3D Gable Boxes",
  "Black Tube Packaging",
  "Blank Cigarette Boxes",
  "Blunt Packaging",
  "Bracelet Boxes",
  "Candle Display Boxes",
  "Candle Dust Covers",
  "Candle Gift Boxes",
  "Candle Jar Boxes",
  "Candle Shipping Boxes",
  "Candle Tube Packaging",
  "Candy Pillow Boxes",
  "Cannabis Mylar Bags",
  "Cardboard Box with Lid",
  "Cardboard Cigarette Boxes",
  "Cardboard Display Boxes",
  "Cardboard Gable Boxes",
  "Cardboard Jewelry Boxes",
  "Cardboard Pencil Boxes",
  "Cardboard Pillow boxes",
  "Cardboard Shoe Boxes",
  "Cardboard Tube Packaging",
  "CBD Display Boxes",
  "Child Resistant Mylar Bags",
  "Child Resistant Rigid Boxes",
  "Christmas Gable Boxes",
  "Coffee Bag Sleeves",
  "Coffee Bean Packaging",
  "Coffee Capsule Packaging",
  "Coffee Cup Sleeves",
  "Coffee Filter Packaging",
  "Coffee Kraft Bags",
  "Collapsible Rigid Boxes",
  "Colored Mailer Boxes | Custom Shipping Boxes Wholesale",
  "Cookie Tube Packaging",
  "Cookies Mylar Bags",
  "Corrugated Boxes with Lids",
  "Corrugated Cake Boxes",
  "Corrugated Mailer Boxes",
  "Corrugated Tuck Top Boxes",
  "Counter Display Boxes",
  "Custom Air Float Boxes",
  "Custom Anklet Boxes",
  "Custom Bakery Wax Paper",
  "Custom Bangle Boxes",
  "Custom Booklet Boxes",
  "Custom Bra Boxes",
  "Custom Bread Bags",
  "Custom Business Labels",
  "Custom Butcher Paper",
  "Custom Butter Paper",
  "Custom Cake Boxes",
  "Custom Cardboard Ammo Boxes",
  "Custom Cardboard Can Carriers",
  "Custom Circle Stickers",
  "Custom Cylinder Packaging",
  "Custom Deli Papers",
  "Custom Die Cut Mylar Bags",
  "Custom Donut Boxes",
  "Custom Earring Boxes",
  "Custom Eco Safe Stickers",
  "Custom Food Wrapping Paper",
  "Custom Freezer Paper",
  "Custom Fry Paper",
  "Custom Greaseproof Paper",
  "Custom Hair Extension Boxes",
  "Custom Holographic Boxes",
  "Custom Holographic Stickers",
  "Custom Hot Paper",
  "Custom Kraft Window Boxes",
  "Custom Lenticular Stickers",
  "Custom Lighter Boxes",
  "Custom Lipstick Packaging",
  "Custom Pandasew Packaging",
  "Custom Paper Coffee Cups",
  "Custom Paper Cups",
  "Custom Pastry Boxes",
  "custom Perfume Boxes",
  "Custom Ring Boxes",
  "Custom Serum Boxes",
  "Custom Shipping Boxes",
  "Custom Shoulder Boxes",
  "Custom Stand Up Pouches",
  "Custom Sticker Sheets",
  "Custom Tuck End Boxes",
  "Custom Tuck Top Boxes",
  "Custom Vinyl Stickers",
  "Custom Ziplock Mylar Bags",
  "Double Wall Corrugated Boxes",
  "Ecommerce Packaging",
  "Eye Shadow Boxes",
  "Gable Box With Window",
  "Gable Gift Boxes",
  "Gusseted Coffee Bags",
  "Kraft Bakery Boxes",
  "Kraft Boxes With Lids",
  "Kraft Bulk Jewelry Boxes",
  "Kraft Gable Boxes",
  "Kraft Gift Boxes",
  "Kraft Mailer Boxes",
  "Kraft Mylar Bags",
  "Kraft Paper Tubes",
  "Kraft Pillow Boxes",
  "Kraft Tin Tie Bags",
  "Large Gable Boxes",
  "Lip Balm Boxes",
  "Lip Balm Tubes",
  "Lip Mask Boxes",
  "Luxury Candle Packaging",
  "Luxury Soap Packaging",
  "Magnetic Closure Boxes",
  "Makeup Packaging",
  "Mylar bags for Food Storage",
  "Mylar Vacuum Seal Bags",
  "Pantyhose Packaging",
  "Paper Cigarette Boxes",
  "Pendant Boxes",
  "Pillow Gift Boxes",
  "Playing Card Boxes",
  "Retail Display Boxes",
  "Reverse Tuck Boxes",
  "Rigid Jewellery Boxes",
  "Rigid Setup Boxes",
  "Screen Printing Boxes",
  "Single Wall Paper Cups",
  "Soap Display Boxes",
  "Soap Sleeve Packaging",
  "Soap Wrapping Paper",
  "Square Soap Boxes",
  "Stand Up Coffee Pouches",
  "Tea Gift Boxes",
  "Tuck Top Mailer Boxes",
  "Two Piece Candle Boxes",
  "Two Piece Rigid Boxes",
  "Underwear Packaging",
  "Vented Coffee Bags",
  "Votive Candle Boxes",
  "White Cardboard Boxes",
  "White Corrugated Boxes",
  "White Gable Boxes",
  "White Kraft Boxes",
  "Window Bakery Boxes",
];

export default function ContactView() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [productType, setProductType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [terms, setTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const { track: trackUnfilled, flushNow: flushUnfilled } = useAbandonedFormCapture({
    formName: "contact-page",
    enabled: !submitted && !isSubmitting,
    productInterest: productType || "Contact page inquiry",
  });

  const validate = () => {
    const errs: Record<string, string> = {};
    const firstErr = validateRequiredName(firstName, "First name");
    if (firstErr) errs.firstName = firstErr;
    const lastErr = validateRequiredName(lastName, "Last name");
    if (lastErr) errs.lastName = lastErr;
    const emailErr = validateRequiredEmail(email);
    if (emailErr) errs.email = emailErr;
    const phoneErr = validateOptionalPhone(phone);
    if (phoneErr) errs.phone = phoneErr;
    if (!productType.trim()) errs.productType = "Please select a product type";
    const qtyErr = validateRequiredQuantity(quantity);
    if (qtyErr) errs.quantity = qtyErr;
    if (!terms) errs.terms = "Please agree to continue";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      productType: true,
      quantity: true,
      terms: true,
    });

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);

    const fullMessage = [
      message,
      quantity ? `Quantity: ${quantity}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      company ? `Company: ${company}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const supabase = createPublicClient();
      const attribution = buildInquiryAttribution("contact_form");
      const { error } = await supabase.from("chat_inquiries" as any).insert({
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone: phone || null,
        product_interest: productType || null,
        message: fullMessage,
        source: "organic",
        status: "new",
        ...attribution,
      });

      if (error) throw error;

      setSubmitted(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setProductType("");
      setQuantity("");
      setMessage("");
      setTimeline("");
      setTerms(false);
      setTouched({});
      setErrors({});
      trackLeadSubmitted("contact_form", attribution);
      toast({ title: "Request Sent!", description: "We'll get back to you within 24 hours." });
    } catch (err: any) {
      toast({
        title: "Something went wrong",
        description: err?.message ?? "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setProductType("");
    setQuantity("");
    setMessage("");
    setTimeline("");
    setTerms(false);
    setTouched({});
    setErrors({});
    setSubmitted(false);
  };

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="bg-primary py-10 sm:py-14 text-center">
        <div className="max-w-[680px] mx-auto px-4 sm:px-5">
          <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-accent mb-3">
            Get Started
          </p>
          <h1 className="font-display text-[32px] sm:text-[48px] font-semibold text-white leading-[1.1] mb-3">
            Tell Us What You <span className="text-accent">Need</span>
          </h1>
          <p className="font-sans text-[13px] sm:text-[14px] text-white/75 leading-[1.65] mb-6">
            Describe your project. We&apos;ll send a detailed quote within 24 hours.
            <br className="hidden sm:block" />
            No pressure, no obligations. Just great packaging.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {[
              "Free Shipping",
              "Low MOQ",
              "USA Based Team",
              "Response in 24hrs",
              "Free 3D Mock-up",
            ].map((t) => (
              <span
                key={t}
                className="flex items-center gap-1.5 font-sans text-[11px] sm:text-[11.5px] text-white/80"
              >
                <span className="w-[5px] h-[5px] rounded-full bg-accent shrink-0 inline-block" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlights / Urgency Strip ── */}
      <div className="bg-[#fff8f0] border-y border-[#f5c8a8] py-2.5 px-4">
        <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
          {[
            "Quote ready in 3–24 hours",
            "Free 3D mock-up included",
            "No credit card required",
            "Low minimum order",
          ].map((t) => (
            <span
              key={t}
              className="flex items-center gap-1.5 font-sans text-[11px] sm:text-[11.5px] font-medium text-[#b84e14]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main Section (Left Sidebar + Right Form) ── */}
      <section className="bg-background py-10 sm:py-14">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-5 grid lg:grid-cols-[380px_1fr] gap-8 lg:gap-12 items-start">
          {/* ── Left Sidebar ── */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-display text-[28px] font-semibold text-foreground mb-2">
                Talk to a Real Person
              </h2>
              <p className="font-sans text-[13px] text-[var(--ds-body)] leading-[1.7]">
                No bots, no runaround. Our team picks up the phone and answers every email personally — usually within a few hours.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Email */}
              <a
                href="mailto:info@hofpack.com"
                className="flex items-start gap-3.5 px-4 py-3.5 bg-card border border-border rounded-[10px] hover:border-accent transition-colors no-underline"
              >
                <div className="w-9 h-9 rounded-[9px] bg-[#edf7f1] flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.1em] uppercase text-[var(--ds-placeholder)] mb-0.5">
                    Email
                  </p>
                  <p className="font-sans text-[13.5px] font-medium text-foreground">
                    info@hofpack.com
                  </p>
                  <p className="font-sans text-[11px] text-[var(--ds-muted)] mt-0.5">
                    Response within 3 hours on business days
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+18884294881"
                className="flex items-start gap-3.5 px-4 py-3.5 bg-card border border-border rounded-[10px] hover:border-accent transition-colors no-underline"
              >
                <div className="w-9 h-9 rounded-[9px] bg-[#fff0e8] flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-accent" />
                </div>
                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.1em] uppercase text-[var(--ds-placeholder)] mb-0.5">
                    Phone
                  </p>
                  <p className="font-sans text-[13.5px] font-medium text-foreground">
                    +1 (888) 429 4881
                  </p>
                  <p className="font-sans text-[11px] text-[var(--ds-muted)] mt-0.5">
                    Mon–Fri 9AM–6PM EST
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/12513734719?text=Hi!%20I'm%20interested%20in%20custom%20packaging%20from%20HOF%20Pack."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 px-4 py-3.5 bg-card border border-border rounded-[10px] hover:border-accent transition-colors no-underline"
              >
                <div className="w-9 h-9 rounded-[9px] bg-[#edf7f1] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.1em] uppercase text-[var(--ds-placeholder)] mb-0.5">
                    WhatsApp
                  </p>
                  <p className="font-sans text-[13.5px] font-medium text-foreground">
                    Message us directly
                  </p>
                  <p className="font-sans text-[11px] text-[var(--ds-muted)] mt-0.5">
                    Fastest response channel
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-start gap-3.5 px-4 py-3.5 bg-card border border-border rounded-[10px]">
                <div className="w-9 h-9 rounded-[9px] bg-[#e8f0ff] flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-[#1a3a8a]" />
                </div>
                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.1em] uppercase text-[var(--ds-placeholder)] mb-0.5">
                    Location
                  </p>
                  <p className="font-sans text-[13.5px] font-medium text-foreground">
                    3700 W TYBOLT Dr, Tucson, AZ 85746, USA
                  </p>
                  <p className="font-sans text-[11px] text-[var(--ds-muted)] mt-0.5">
                    Mon–Fri 9AM–6PM EST
                  </p>
                </div>
              </div>
            </div>

            {/* Turnaround Badge */}
            <div className="flex items-center gap-2.5 bg-[#edf7f1] border border-[#b8dfc8] rounded-lg px-4 py-3">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <div>
                <p className="font-sans text-[12px] font-medium text-[#1a5c32]">
                  Average quote turnaround: 3–24 hours
                </p>
                <p className="font-sans text-[11px] text-[#4a8a5c]">
                  Our team is online now — Mon to Fri 9AM–6PM EST
                </p>
              </div>
            </div>

            {/* What you get with HOF Pack */}
            <div className="bg-card border border-border rounded-xl px-5 py-5">
              <p className="font-sans text-[13px] font-semibold text-foreground mb-3.5">
                What you get with HOF Pack
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Free design help from day one — no hidden fees",
                  "Fully custom: size, shape, print, finish",
                  "Eco-friendly options on every product line",
                  "One dedicated manager who owns your project",
                  "Free 3D mock-up before production starts",
                  "Free shipping across all US states",
                  "No minimum order quantity — start from 1 unit",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 font-sans text-[12.5px] text-[var(--ds-body)] leading-[1.45]"
                  >
                    <span className="w-4 h-4 bg-[#edf7f1] rounded-[4px] flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l2.5 2.5L10 3" stroke="#2d5c3e" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours & Head Office card */}
            <div className="bg-primary rounded-xl px-5 py-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-[30px] h-[30px] rounded-[7px] bg-white/10 flex items-center justify-center shrink-0">
                  <Clock size={14} className="text-white/70" />
                </div>
                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.1em] uppercase text-white/45 mb-0.5">
                    Business Hours
                  </p>
                  <p className="font-sans text-[12.5px] font-medium text-white">
                    Mon to Fri · 9AM – 6PM EST
                  </p>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center gap-2.5">
                <div className="w-[30px] h-[30px] rounded-[7px] bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-white/70" />
                </div>
                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.1em] uppercase text-white/45 mb-0.5">
                    Head Office
                  </p>
                  <p className="font-sans text-[12.5px] font-medium text-white">
                    3700 W TYBOLT Dr, Tucson, AZ 85746, USA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Project Details Form ── */}
          <div className="bg-card border border-border rounded-[14px] px-5 sm:px-9 py-6 sm:py-9">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <CheckCircle size={32} className="text-accent" />
                </div>
                <h3 className="font-display text-3xl font-semibold text-foreground">
                  Quote Request Received!
                </h3>
                <p className="mt-3 font-sans text-sm text-muted-foreground max-w-sm leading-relaxed">
                  One of our experts will contact you within 24 hours with your custom pricing.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="mt-8 px-10 py-3 rounded-lg bg-accent font-sans font-semibold text-white transition-colors hover:bg-[var(--ds-orange-hover)]"
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex items-start justify-between mb-2 gap-4">
                  <h2 className="font-display text-[26px] font-semibold text-foreground">
                    Project Details
                  </h2>
                  <span className="font-sans text-[10.5px] text-[var(--ds-placeholder)] tracking-[0.05em] pt-1">
                    * Required fields
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {[
                    { label: "Free Quote", cls: "bg-[#edf7f1] text-[#1a5c32] border-[#b8dfc8]" },
                    { label: "No Obligation", cls: "bg-[#edf7f1] text-[#1a5c32] border-[#b8dfc8]" },
                    { label: "24hr Response", cls: "bg-[#fff0e8] text-[#b84e14] border-[#f5c8a8]" },
                    { label: "Free 3D Mock-up", cls: "bg-[var(--ds-panel-bg)] text-[#3a3a3a] border-[var(--ds-input-border)]" },
                    { label: "Low MOQ", cls: "bg-[#edf7f1] text-[#1a5c32] border-[#b8dfc8]" },
                  ].map(({ label, cls }) => (
                    <span
                      key={label}
                      className={`font-sans text-[9.5px] font-medium tracking-[0.05em] uppercase px-2.5 py-1 rounded-full border ${cls}`}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div className="h-px bg-border mb-4" />

                <p className="font-sans text-[9.5px] font-medium tracking-[0.15em] uppercase text-[var(--ds-placeholder)] mb-3">
                  Contact information
                </p>

                {/* First & Last Name */}
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[9.5px] font-medium tracking-[0.09em] uppercase text-[var(--ds-muted)]">
                      First name <span className="text-accent">*</span>
                    </label>
                    <input
                      name="firstName"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        trackUnfilled({ firstName: e.target.value, lastName, email, phone });
                        if (touched.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
                      }}
                      onBlur={() => {
                        setTouched((prev) => ({ ...prev, firstName: true }));
                        flushUnfilled();
                      }}
                      className={`flex w-full rounded-md px-3 py-2 font-sans font-normal bg-[#faf8f5] text-[#1a1a1a] border border-[#d8d4cc] placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-[#e8732a]/25 focus-visible:ring-offset-0 h-[38px] text-[13px] ${
                        touched.firstName && errors.firstName ? "border-red-400 focus-visible:ring-red-400/20" : ""
                      }`}
                    />
                    {touched.firstName && errors.firstName && (
                      <p className="text-[11px] font-medium text-red-500">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[9.5px] font-medium tracking-[0.09em] uppercase text-[var(--ds-muted)]">
                      Last name <span className="text-accent">*</span>
                    </label>
                    <input
                      name="lastName"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        trackUnfilled({ firstName, lastName: e.target.value, email, phone });
                        if (touched.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
                      }}
                      onBlur={() => {
                        setTouched((prev) => ({ ...prev, lastName: true }));
                        flushUnfilled();
                      }}
                      className={`flex w-full rounded-md px-3 py-2 font-sans font-normal bg-[#faf8f5] text-[#1a1a1a] border border-[#d8d4cc] placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-[#e8732a]/25 focus-visible:ring-offset-0 h-[38px] text-[13px] ${
                        touched.lastName && errors.lastName ? "border-red-400 focus-visible:ring-red-400/20" : ""
                      }`}
                    />
                    {touched.lastName && errors.lastName && (
                      <p className="text-[11px] font-medium text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[9.5px] font-medium tracking-[0.09em] uppercase text-[var(--ds-muted)]">
                      Email address <span className="text-accent">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        trackUnfilled({ firstName, lastName, email: e.target.value, phone });
                        if (touched.email) setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      onBlur={() => {
                        setTouched((prev) => ({ ...prev, email: true }));
                        flushUnfilled();
                      }}
                      className={`flex w-full rounded-md px-3 py-2 font-sans font-normal bg-[#faf8f5] text-[#1a1a1a] border border-[#d8d4cc] placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-[#e8732a]/25 focus-visible:ring-offset-0 h-[38px] text-[13px] ${
                        touched.email && errors.email ? "border-red-400 focus-visible:ring-red-400/20" : ""
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p className="text-[11px] font-medium text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[9.5px] font-medium tracking-[0.09em] uppercase text-[var(--ds-muted)]">
                      Phone number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={PHONE_NATIONAL_DIGITS}
                      placeholder="5551234567"
                      value={phone}
                      onChange={(e) => {
                        const cleaned = sanitizePhoneInput(e.target.value);
                        setPhone(cleaned);
                        trackUnfilled({ firstName, lastName, email, phone: cleaned });
                        if (touched.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                      }}
                      onBlur={() => {
                        setTouched((prev) => ({ ...prev, phone: true }));
                        flushUnfilled();
                      }}
                      className={`flex w-full rounded-md px-3 py-2 font-sans font-normal bg-[#faf8f5] text-[#1a1a1a] border border-[#d8d4cc] placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-[#e8732a]/25 focus-visible:ring-offset-0 h-[38px] text-[13px] ${
                        touched.phone && errors.phone ? "border-red-400 focus-visible:ring-red-400/20" : ""
                      }`}
                    />
                    <p className="text-[10px] text-[var(--ds-muted)]">USA 10-digit mobile</p>
                    {touched.phone && errors.phone && (
                      <p className="text-[11px] font-medium text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Company name */}
                <div className="mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[9.5px] font-medium tracking-[0.09em] uppercase text-[var(--ds-muted)]">
                      Company name
                    </label>
                    <input
                      name="company"
                      placeholder="Your Brand Inc."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="flex w-full rounded-md px-3 py-2 font-sans font-normal bg-[#faf8f5] text-[#1a1a1a] border border-[#d8d4cc] placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-[#e8732a]/25 focus-visible:ring-offset-0 h-[38px] text-[13px]"
                    />
                  </div>
                </div>

                <div className="h-px bg-border mb-4" />

                <p className="font-sans text-[9.5px] font-medium tracking-[0.15em] uppercase text-[var(--ds-placeholder)] mb-3">
                  Project details
                </p>

                {/* Product Type & Estimated Quantity */}
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[9.5px] font-medium tracking-[0.09em] uppercase text-[var(--ds-muted)]">
                      Product type <span className="text-accent">*</span>
                    </label>
                    <select
                      name="productType"
                      value={productType}
                      onChange={(e) => {
                        setProductType(e.target.value);
                        if (touched.productType) setErrors((prev) => ({ ...prev, productType: "" }));
                      }}
                      onBlur={() => setTouched((prev) => ({ ...prev, productType: true }))}
                      className={`w-full h-[38px] px-3 rounded-[7px] border border-[var(--ds-input-border)] bg-[var(--ds-input-bg)] font-sans text-[13px] text-[var(--ds-ink)] focus:outline-none focus:border-[var(--ds-orange)] focus:bg-white transition-colors appearance-none ${
                        touched.productType && errors.productType ? "border-red-400" : ""
                      }`}
                    >
                      <option value="">Select a product</option>
                      {ALL_PRODUCT_OPTIONS.map((prod) => (
                        <option key={prod} value={prod}>
                          {prod}
                        </option>
                      ))}
                    </select>
                    {touched.productType && errors.productType && (
                      <p className="text-[11px] font-medium text-red-500">{errors.productType}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[9.5px] font-medium tracking-[0.09em] uppercase text-[var(--ds-muted)]">
                      Estimated quantity <span className="text-accent">*</span>
                    </label>
                    <input
                      name="quantity"
                      type="text"
                      inputMode="numeric"
                      placeholder="e.g. 500"
                      value={quantity}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setQuantity(val);
                        if (touched.quantity) setErrors((prev) => ({ ...prev, quantity: "" }));
                      }}
                      onBlur={() => setTouched((prev) => ({ ...prev, quantity: true }))}
                      className={`flex w-full rounded-md px-3 py-2 font-sans font-normal bg-[#faf8f5] text-[#1a1a1a] border border-[#d8d4cc] placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-[#e8732a]/25 focus-visible:ring-offset-0 h-[38px] text-[13px] ${
                        touched.quantity && errors.quantity ? "border-red-400 focus-visible:ring-red-400/20" : ""
                      }`}
                    />
                    {touched.quantity && errors.quantity && (
                      <p className="text-[11px] font-medium text-red-500">{errors.quantity}</p>
                    )}
                  </div>
                </div>

                {/* Project Timeline */}
                <div className="mb-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[9.5px] font-medium tracking-[0.09em] uppercase text-[var(--ds-muted)]">
                      Project timeline
                    </label>
                    <select
                      name="timeline"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full h-[38px] px-3 rounded-[7px] border border-[var(--ds-input-border)] bg-[var(--ds-input-bg)] font-sans text-[13px] text-[var(--ds-ink)] focus:outline-none focus:border-[var(--ds-orange)] focus:bg-white transition-colors appearance-none"
                    >
                      <option value="" disabled>
                        When do you need them?
                      </option>
                      <option value="ASAP / Rush">ASAP / Rush</option>
                      <option value="Within 2 weeks">Within 2 weeks</option>
                      <option value="Within 1 month">Within 1 month</option>
                      <option value="1–3 months">1–3 months</option>
                      <option value="Just exploring">Just exploring</option>
                    </select>
                  </div>
                </div>

                {/* Your Message */}
                <div className="mb-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[9.5px] font-medium tracking-[0.09em] uppercase text-[var(--ds-muted)]">
                      Your message
                    </label>
                    <textarea
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Size, material, printing, finishes — anything that helps us give you an accurate quote."
                      className="flex w-full rounded-md px-3 font-sans font-normal bg-[#faf8f5] text-[#1a1a1a] border border-[#d8d4cc] placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-[#e8732a]/25 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px] text-[13px] py-2.5 resize-y"
                    />
                  </div>
                </div>

                {/* Trust Mini Grid */}
                <div className="grid grid-cols-2 gap-1.5 my-4">
                  {[
                    "Your info is 100% secure",
                    "No spam, ever",
                    "No obligation to buy",
                    "Reply within 24 hours",
                  ].map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1.5 font-sans text-[11.5px] text-[var(--ds-body)]"
                    >
                      <span className="w-[5px] h-[5px] rounded-full bg-primary shrink-0" />
                      {t}
                    </span>
                  ))}
                </div>

                {/* Privacy Terms Checkbox */}
                <div className="flex flex-col gap-1 mb-4">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      name="terms"
                      id="terms-checkbox"
                      checked={terms}
                      onChange={(e) => {
                        setTerms(e.target.checked);
                        if (touched.terms) setErrors((prev) => ({ ...prev, terms: "" }));
                      }}
                      onBlur={() => setTouched((prev) => ({ ...prev, terms: true }))}
                      className="mt-0.5 w-4 h-4 rounded-[3px] border bg-[var(--ds-input-bg)] shrink-0 accent-accent cursor-pointer border-input"
                    />
                    <label
                      htmlFor="terms-checkbox"
                      className="font-sans text-[11.5px] text-[var(--ds-muted)] leading-[1.5] cursor-pointer"
                    >
                      No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.{" "}
                      <Link
                        className="font-semibold text-[#2563eb] underline underline-offset-2 hover:text-[#1d4ed8]"
                        href="/privacy"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {touched.terms && errors.terms && (
                    <p className="text-[11px] font-medium text-red-500">{errors.terms}</p>
                  )}
                </div>

                {/* Form Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-border">
                  <div>
                    <p className="font-sans text-[11px] text-[var(--ds-placeholder)]">
                      Free quote · No credit card · No commitment
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent hover:bg-[var(--ds-orange-hover)] text-white font-sans text-[13px] font-medium tracking-[0.06em] border-none rounded-lg px-7 py-3 cursor-pointer transition-colors shrink-0 disabled:opacity-60"
                  >
                    <Send size={14} />
                    {isSubmitting ? "Sending…" : "Get My Free Quote"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ── */}
      <section className="border-t-[3px] border-accent bg-[#2d5c3e] text-white">
        <div className="mx-auto max-w-[1100px] px-4 py-10 text-center sm:px-10">
          <h2 className="font-display text-[24px] font-semibold text-white sm:text-[28px]">
            Let&apos;s build something great together.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-[13px] text-white/65 sm:text-sm">
            Get your custom packaging quote today — free design support included.
          </p>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 mt-4 rounded-md bg-accent px-7 py-[11px] text-[12px] font-medium uppercase tracking-[0.12em] text-white hover:bg-[#c45a18]"
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Get a Quote
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </>
  );
}