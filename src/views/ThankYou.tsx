"use client";

import { useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { ArrowLeft, Shield, Star, Clock, CheckCircle, Truck } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { pushDataLayerEvent } from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const steps = [
  {
    num: 1,
    done: true,
    label: "Details submitted",
    desc: "Confirmation email on its way to your inbox.",
    time: "Done — just now",
    timeColor: "green",
  },
  {
    num: 2,
    done: false,
    label: "Expert review",
    desc: "A specialist reviews your specs in full.",
    time: "Within a few hours",
    timeColor: "orange",
  },
  {
    num: 3,
    done: false,
    label: "We reach out if needed",
    desc: "If anything needs clarifying, we'll reach out directly.",
    time: "Only if required",
    timeColor: "neutral",
  },
  {
    num: 4,
    done: false,
    label: "Your custom quote",
    desc: "Detailed quote with pricing, options, and a free 3D mock-up.",
    time: "Within 24 hours",
    timeColor: "orange",
  },
  {
    num: 5,
    done: false,
    label: "You approve, we produce",
    desc: "Approved? We move straight to production.",
    time: "4–8 business days",
    timeColor: "green",
  },
  {
    num: 6,
    done: false,
    label: "Delivered to your door",
    desc: "Boxes arrive on time, inspected and packed with care.",
    time: "On your timeline",
    timeColor: "green",
  },
];

const timeClasses: Record<string, string> = {
  green: "text-[#2d5c3e] bg-[#edf7f1] border-[#b8dfc8]",
  orange: "text-[#b84e14] bg-[#fff0e8] border-[#f5c8a8]",
  neutral: "text-[#3a3a3a] bg-[#f5f3ee] border-[#d8d4cc]",
};

const timeStroke: Record<string, string> = {
  green: "#2d5c3e",
  orange: "#b84e14",
  neutral: "#3a3a3a",
};

const trustItems = [
  { icon: Shield, label: "5,000+ brands served" },
  { icon: Star, label: "4.9★ on Google" },
  { icon: Clock, label: "Response in <24 hours" },
  { icon: CheckCircle, label: "100% satisfaction guarantee" },
  { icon: Truck, label: "Free shipping all USA" },
];

type ThankYouViewProps = {
  /** Set when reached via /thank-you/<slug> for a known category. */
  categorySlug?: string;
  categoryName?: string;
};

export default function ThankYouView({ categorySlug, categoryName }: ThankYouViewProps = {}) {
  const { settings } = useSettings();
  const phone = settings.contact.phone || "+1 (888) 429 4881";
  const phoneRaw = phone.replace(/[^0-9+]/g, "");
  const browseMoreHref = categorySlug ? `/${categorySlug}` : "/custom-rigid-boxes";

  // Explicit dataLayer push instead of relying on GTM's default page-view
  // trigger: category thank-you pages are reached via router.push() from the
  // quote form (a client-side transition, not a new document load), which
  // GTM's History Change trigger can miss.
  useEffect(() => {
    pushDataLayerEvent("thank_you_view", { category_slug: categorySlug });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {/* Main content */}
      <div className="bg-[var(--ds-page-bg)] pt-2 pb-10 sm:pt-4 sm:pb-14 px-4">
        <div className="max-w-[610px] mx-auto text-center">

          {/* Success icon */}
          <div className="w-16 h-16 rounded-full bg-[#edf7f1] border-2 border-[#b8dfc8] flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <path d="M7 18l7 7L29 11" stroke="#2d5c3e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <p className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-accent mb-1.5">Quote Received</p>
          <h1 className="font-display text-[28px] sm:text-[34px] font-semibold text-foreground leading-[1.15] mb-2">
            You&apos;re in good hands.
          </h1>
          <p className="font-sans text-[14px] text-[var(--ds-body)] leading-[1.7] mb-6 max-w-[520px] mx-auto">
            {categoryName
              ? `Your ${categoryName.toLowerCase()} quote request has been submitted successfully. Our team has been notified and will prepare a detailed quote tailored to your specifications.`
              : "Your quote request has been submitted successfully. Our team has been notified and will prepare a detailed quote tailored to your specifications."}
          </p>

          {/* What happens next */}
          <div className="bg-card border border-border rounded-[14px] px-6 sm:px-8 py-5 text-left mb-4">
            <p className="font-sans text-[15px] font-bold text-foreground mb-4 text-center">What happens next</p>
            <div className="grid sm:grid-cols-2 gap-x-6">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className={`flex gap-3.5 items-start py-3 ${
                    i < steps.length - 2 ? "border-b border-[#f0ede6]" : ""
                  } ${i === steps.length - 2 ? "sm:border-b-0 border-b border-[#f0ede6]" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-sans text-[12px] font-bold text-white ${
                      step.done ? "bg-[#2d5c3e]" : "bg-accent"
                    }`}
                  >
                    {step.done ? (
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l3.5 3.5L12 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      step.num
                    )}
                  </div>
                  <div>
                    <p className={`font-sans text-[13px] font-semibold mb-0.5 ${step.done ? "text-[#2d5c3e]" : "text-foreground"}`}>
                      {step.label}
                    </p>
                    <p className="font-sans text-[12.5px] text-[var(--ds-body)] leading-[1.55]">{step.desc}</p>
                    <span className={`inline-flex items-center gap-1 font-sans text-[10.5px] font-semibold tracking-[0.06em] uppercase px-2 py-0.5 rounded-full border mt-1.5 ${timeClasses[step.timeColor]}`}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" stroke={timeStroke[step.timeColor]} strokeWidth="1.3" />
                        <path d="M6 3.5v3l2 1" stroke={timeStroke[step.timeColor]} strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                      {step.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urgency strip */}
          <div className="bg-[#fff8f0] border border-[#f5c8a8] rounded-[10px] px-5 py-3.5 flex items-center gap-3 mb-5 text-left">
            <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
            <div>
              <p className="font-sans text-[12.5px] font-medium text-[#b84e14]">
                Need it faster? Call us directly —{" "}
                <a
                  href={`tel:${phoneRaw}`}
                  onClick={() => pushDataLayerEvent("call_click", { category_slug: categorySlug })}
                  className="font-bold text-[#b84e14] no-underline inline-flex items-center gap-1"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.06 2.22 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" stroke="#b84e14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {phone}
                </a>
              </p>
              <p className="font-sans text-[11px] text-[#6a5245] mt-0.5">Our team is available Mon–Fri 9AM–6PM EST for RUSH orders</p>
            </div>
          </div>

          {/* WhatsApp card */}
          <div className="bg-card border border-border rounded-[12px] px-6 py-5 flex items-center gap-4 mb-5 text-left">
            <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-[13.5px] font-semibold text-foreground">Prefer WhatsApp?</p>
              <p className="font-sans text-[12px] text-[var(--ds-muted)]">Message us directly — fastest response channel</p>
            </div>
            <a
              href={getWhatsAppUrl("Hi! I just submitted a quote request and wanted to follow up.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => pushDataLayerEvent("whatsapp_click", { category_slug: categorySlug })}
              className="shrink-0 bg-[#25D366] hover:bg-[#1da851] text-white font-sans text-[12px] font-semibold px-4 py-2.5 rounded-[7px] transition-colors no-underline"
            >
              Message Us
            </a>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-accent hover:bg-[var(--ds-orange-hover)] text-white font-sans text-[13px] font-semibold tracking-[0.06em] px-8 py-3.5 rounded-[8px] transition-colors no-underline"
            >
              <ArrowLeft size={13} />
              Back to Home
            </Link>
            <Link
              href={browseMoreHref}
              className="inline-flex items-center gap-2 bg-card text-foreground font-sans text-[13px] font-medium px-8 py-3.5 rounded-[8px] border-[1.5px] border-border hover:border-accent hover:text-accent transition-colors no-underline"
            >
              Browse More Products
            </Link>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="bg-card border-y border-border py-5 px-4 sm:px-6">
        <div className="max-w-[680px] mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 font-sans text-[12px] font-medium text-foreground">
              <div className="w-8 h-8 bg-[#edf7f1] rounded-[8px] flex items-center justify-center shrink-0">
                <Icon size={15} className="text-[#2d5c3e]" />
              </div>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA strip */}
      <div className="bg-[#2d5c3e] border-t-[3px] border-accent py-10 px-4 text-center">
        <p className="font-display text-[22px] font-semibold text-white mb-1">Let&apos;s build something great together.</p>
        <p className="font-sans text-[13px] text-white/65 mb-5">Explore our full range of custom packaging solutions.</p>
        <Link
          href={browseMoreHref}
          className="inline-block bg-accent hover:bg-[var(--ds-orange-hover)] text-white font-sans text-[12px] font-semibold tracking-[0.1em] uppercase px-7 py-3 rounded-[6px] transition-colors no-underline"
        >
          View All Products →
        </Link>
      </div>
    </Layout>
  );
}