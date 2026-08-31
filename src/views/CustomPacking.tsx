"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Leaf,
  Package,
  Sparkles,
  Truck,
  Headphones,
  ShieldCheck,
  Tag,
} from "lucide-react";
import CustomPackingShell from "@/components/CustomPackingShell";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { useToast } from "@/hooks/use-toast";
import { trackLeadSubmitted } from "@/lib/analytics";
import { buildInquiryAttribution } from "@/lib/attribution";
import {
  PHONE_NATIONAL_DIGITS,
  sanitizeUsPhoneNational,
  validateOptionalQuantity,
  validateRequiredEmail,
  validateRequiredName,
} from "@/lib/form-validation";
import { useAbandonedFormCapture } from "@/hooks/useAbandonedFormCapture";

import heroPackaging from "@/assets/custom-packing/hero-packaging.png";
import catRigid from "@/assets/custom-packing/cat-rigid.png";
import catBakery from "@/assets/custom-packing/cat-bakery.png";
import catMailer from "@/assets/custom-packing/cat-mailer.png";
import catMylar from "@/assets/custom-packing/cat-mylar.png";
import catCandle from "@/assets/custom-packing/cat-candle.png";
import catSoap from "@/assets/custom-packing/cat-soap.png";
import catTuck from "@/assets/custom-packing/cat-tuck.png";

type CategoryCard = {
  title: string;
  subtitle: string;
  image: StaticImageData;
};

const categoryCards: CategoryCard[] = [
  {
    title: "Rigid Boxes",
    subtitle: "Luxury magnetic closure, two-piece and shoulder boxes for premium products.",
    image: catRigid,
  },
  {
    title: "Bakery Boxes",
    subtitle: "Custom pastry, donut, cake and cookie boxes with food-grade materials and windows.",
    image: catBakery,
  },
  {
    title: "Mailer Boxes",
    subtitle: "E-commerce ready custom corrugated mailers that protect and impress on unboxing.",
    image: catMailer,
  },
  {
    title: "Mylar Bags",
    subtitle: "Smell-proof, food-grade barrier pouches with custom printing and resealable zippers.",
    image: catMylar,
  },
  {
    title: "Candle Boxes",
    subtitle: "Two-piece, tuck end and display packaging built to protect delicate candle jars.",
    image: catCandle,
  },
  {
    title: "Soap Boxes",
    subtitle: "Custom cut-out, sleeve and tuck end packaging designed for bar soaps and cosmetics.",
    image: catSoap,
  },
  {
    title: "Tuck Boxes",
    subtitle: "Versatile folding carton boxes with custom printing, foil and embossing options.",
    image: catTuck,
  },
];

const faqs = [
  {
    question: "What is your Minimum Order Quantity (MOQ)?",
    answer:
      "Our MOQ starts at just 100 units for most custom packaging styles. This allows small businesses, startups and growing brands to order premium packaging without huge upfront commitments.",
  },
  {
    question: "How long does production and delivery take?",
    answer:
      "Standard production takes 8 to 12 business days after your artwork is approved. We also offer expedited turnaround for rush projects. Shipping is completely FREE within the United States.",
  },
  {
    question: "Do you provide free design assistance and dieline templates?",
    answer:
      "Yes! Our dedicated design team will help you place your artwork on our dielines, generate 2D and 3D mockups, and ensure your files are 100% print-ready at no extra charge.",
  },
  {
    question: "Can I get a sample before placing a full production order?",
    answer:
      "Absolutely. We offer digital 3D mockups for free with every quote. Physical pre-production samples can also be arranged upon request to check sizing, material and print finish.",
  },
  {
    question: "What printing and finishing options are available?",
    answer:
      "We offer full-color CMYK, Pantone matching, spot UV, hot foil stamping (gold, silver, holographic), embossing, debossing, matte/gloss lamination, soft-touch coatings and custom window cutouts.",
  },
  {
    question: "Are your packaging materials eco-friendly and recyclable?",
    answer:
      "Yes, sustainability is core to what we do. We offer FSC-certified cardstock, recycled kraft, biodegradable corrugated board and soy-based inks that meet high environmental standards.",
  },
];

const packagingOptions = [
  "Select a box type...",
  "Bakery box",
  "Candle box",
  "Mailer box",
  "Mylar bags",
  "Rigid box",
  "Custom food boxes",
  "Soap box",
  "Tuck box",
  "Not sure yet",
];

export default function CustomPacking() {
  const router = useRouter();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    estimatedQuantity?: string;
  }>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    packagingType: "",
    estimatedQuantity: "",
  });

  const {
    track: trackUnfilled,
    onFormInput: onUnfilledFormInput,
    onFormBlurCapture: onUnfilledFormBlur,
  } = useAbandonedFormCapture({
    formName: "custom-packing-page",
    enabled: !submitted && !isSubmitting,
    productInterest: formData.packagingType || "Custom packing inquiry",
  });

  const normalizeUsPhone = (value: string): string | null => {
    const digits = value.replace(/\D/g, "");
    const normalized = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
    if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(normalized)) return null;
    return `+1${normalized}`;
  };

  const updateForm = (field: keyof typeof formData, value: string) => {
    if (field === "name" || field === "email" || field === "phone" || field === "estimatedQuantity") {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "name" || field === "email" || field === "phone") {
      const next = { ...formData, [field]: value };
      trackUnfilled({ name: next.name, email: next.email, phone: next.phone });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: {
      name?: string;
      email?: string;
      phone?: string;
      estimatedQuantity?: string;
    } = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const normalizedPhone = normalizeUsPhone(formData.phone);

    const nameErr = validateRequiredName(name, "Name");
    if (nameErr) nextErrors.name = nameErr;
    const emailErr = validateRequiredEmail(email);
    if (emailErr) nextErrors.email = emailErr;
    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (formData.phone.replace(/\D/g, "").length !== PHONE_NATIONAL_DIGITS) {
      nextErrors.phone = `Enter a ${PHONE_NATIONAL_DIGITS}-digit USA mobile number.`;
    } else if (!normalizedPhone) {
      nextErrors.phone = "Please enter a valid USA phone number.";
    }
    const qtyErr = validateOptionalQuantity(formData.estimatedQuantity);
    if (qtyErr) nextErrors.estimatedQuantity = qtyErr;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    const message = [
      formData.company ? `Company: ${formData.company}` : null,
      formData.estimatedQuantity ? `Estimated Quantity: ${formData.estimatedQuantity}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const supabase = createPublicClient();
      const attribution = buildInquiryAttribution("custom_packing_view_form");
      const { error } = (await withAbortableTimeout((signal) =>
        supabase
          .from("chat_inquiries" as any)
          .insert({
            name,
            email,
            phone: normalizedPhone,
            product_interest: formData.packagingType || "Custom Packing Inquiry",
            message: message || "Custom packing inquiry submitted from landing page.",
            source: "landing_page",
            status: "new",
            ...attribution,
          } as any)
          .abortSignal(signal) as any
      )) as any;

      if (error) throw error;
      setSubmitted(true);
      trackLeadSubmitted("custom_packing_view_form", attribution);
      router.push("/thank-you");
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToQuoteForm = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <CustomPackingShell onGetQuoteClick={scrollToQuoteForm}>
        <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#1f5a38_45%,#2a6b45_100%)] px-4 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-12">
          <div className="mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-[1fr_430px] lg:items-start">
            <div className="pt-2 lg:pt-8">
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#ee7a1b] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_12px_rgba(238,122,27,0.45)]">
                  <Tag size={12} strokeWidth={2.5} />
                  Flat 20% Off Your First Order + Free Shipping
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
                  ✨ Premium Custom Packaging
                </span>
              </div>
              <h1 className="max-w-[840px] font-sans text-[26px] sm:text-[38px] lg:text-[48px] font-bold leading-[1.12] text-white [text-wrap:balance]">
                <span className="block">Custom Packaging That</span>
                <span className="block text-[#ee7a1b] mt-1">Defines Your Brand</span>
              </h1>
              <p className="mt-5 max-w-[560px] text-[14px] leading-[1.65] text-white sm:text-[15px]">
                Custom printed packaging built around your product, branding and order quantity. Low MOQ, free design
                support and quick US delivery.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={scrollToQuoteForm}
                  className="inline-flex items-center gap-2 rounded-[8px] bg-[#ee7a1b] px-7 py-3.5 text-[14px] font-bold text-white shadow-[0_4px_16px_rgba(238,122,27,0.4)] transition hover:bg-[#d96b14]"
                >
                  Get a Free Quote
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Top quote form box */}
            <div
              id="quote-form"
              className="rounded-[16px] border border-[#e0ddd6] bg-white p-6 shadow-xl sm:p-8"
            >
              <h2 className="font-display text-[22px] font-bold text-[#1a1a1a]">
                Get Your Instant Estimate
              </h2>
              <p className="mt-1 text-[13px] text-[#7a7672]">
                Fill out the details below and our team will get back to you within 24 hours.
              </p>

              <form
                onSubmit={handleSubmit}
                onInput={onUnfilledFormInput}
                onBlurCapture={onUnfilledFormBlur}
                className="mt-6 space-y-4"
              >
                <div>
                  <label className="mb-1 block text-[12px] font-semibold text-[#1a1a1a]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    data-unfilled="name"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    className="w-full rounded-[8px] border border-[#d8d4cc] bg-[#faf8f5] px-3.5 py-2.5 text-[13px] text-[#1a1a1a] outline-none focus:border-[#ee7a1b]"
                  />
                  {errors.name && <p className="mt-1 text-[11px] text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-semibold text-[#1a1a1a]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    data-unfilled="email"
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    className="w-full rounded-[8px] border border-[#d8d4cc] bg-[#faf8f5] px-3.5 py-2.5 text-[13px] text-[#1a1a1a] outline-none focus:border-[#ee7a1b]"
                  />
                  {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-[#1a1a1a]">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      data-unfilled="phone"
                      inputMode="numeric"
                      maxLength={PHONE_NATIONAL_DIGITS}
                      placeholder="5551234567"
                      value={formData.phone}
                      onChange={(e) => updateForm("phone", sanitizeUsPhoneNational(e.target.value))}
                      className="w-full rounded-[8px] border border-[#d8d4cc] bg-[#faf8f5] px-3.5 py-2.5 text-[13px] text-[#1a1a1a] outline-none focus:border-[#ee7a1b]"
                    />
                    {errors.phone && <p className="mt-1 text-[11px] text-red-500">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-[#1a1a1a]">
                      Quantity
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 500"
                      value={formData.estimatedQuantity}
                      onChange={(e) => updateForm("estimatedQuantity", e.target.value)}
                      className="w-full rounded-[8px] border border-[#d8d4cc] bg-[#faf8f5] px-3.5 py-2.5 text-[13px] text-[#1a1a1a] outline-none focus:border-[#ee7a1b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-semibold text-[#1a1a1a]">
                    Packaging Style
                  </label>
                  <select
                    value={formData.packagingType}
                    onChange={(e) => updateForm("packagingType", e.target.value)}
                    className="w-full rounded-[8px] border border-[#d8d4cc] bg-[#faf8f5] px-3.5 py-2.5 text-[13px] text-[#1a1a1a] outline-none focus:border-[#ee7a1b]"
                  >
                    {packagingOptions.map((opt) => (
                      <option key={opt} value={opt === "Select a box type..." ? "" : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-[8px] bg-[#ee7a1b] py-3.5 text-[14px] font-bold text-white shadow-md transition hover:bg-[#d96b14] disabled:opacity-50"
                >
                  {isSubmitting ? "Sending Request..." : "Request a Quote →"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Categories grid */}
        <section className="bg-[#faf8f5] py-16 sm:py-20 px-4 sm:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#ee7a1b] mb-2">Our Capabilities</p>
              <h2 className="font-display text-[32px] sm:text-[40px] font-bold text-[#1a1a1a]">Popular Packaging Categories</h2>
              <p className="mt-3 text-[14px] text-[#7a7672]">Choose from our wide selection of custom packaging types, engineered for protection and shelf appeal.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categoryCards.map((cat, idx) => (
                <div key={idx} className="overflow-hidden rounded-[14px] border border-[#e0ddd6] bg-white shadow-sm transition hover:shadow-md">
                  <div className="relative aspect-[16/10] bg-[#ece9e2]">
                    <Image src={cat.image} alt={cat.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-[18px] font-bold text-[#1a1a1a]">{cat.title}</h3>
                    <p className="mt-2 text-[13px] text-[#7a7672] leading-relaxed">{cat.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white py-16 sm:py-20 px-4 sm:px-8 border-t border-[#e0ddd6]">
          <div className="mx-auto max-w-[860px]">
            <div className="text-center mb-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#ee7a1b] mb-2">FAQ</p>
              <h2 className="font-display text-[32px] sm:text-[38px] font-bold text-[#1a1a1a]">Frequently Asked Questions</h2>
            </div>
            <div className="divide-y divide-[#e0ddd6]">
              {faqs.map((faq, i) => (
                <div key={i} className="py-5">
                  <h3 className="font-display text-[17px] font-bold text-[#1a1a1a] mb-2">{faq.question}</h3>
                  <p className="text-[13.5px] text-[#7a7672] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
    </CustomPackingShell>
  );
}