"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
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
    subtitle: "Premium gift, retail and luxury packaging.",
    image: catRigid,
  },
  {
    title: "Mailer Boxes",
    subtitle: "Branded e-commerce shipping experience.",
    image: catMailer,
  },
  {
    title: "Mylar Bags",
    subtitle: "Stand-up pouches for coffee, snacks & more.",
    image: catMylar,
  },
  {
    title: "Tuck Boxes",
    subtitle: "Versatile tuck-end folding cartons.",
    image: catTuck,
  },
  {
    title: "Bakery Boxes",
    subtitle: "Window boxes, pastry and cake packaging.",
    image: catBakery,
  },
  {
    title: "Candle Boxes",
    subtitle: "Elegant boxes built for candle brands.",
    image: catCandle,
  },
  {
    title: "Soap & Skincare",
    subtitle: "Clean, modern packaging for personal care.",
    image: catSoap,
  },
];

const valueCards = [
  {
    icon: Package,
    title: "Low MOQ Available",
    body: "Order quantities that match your stage of growth — start small and scale up.",
  },
  {
    icon: Sparkles,
    title: "Free Design Support",
    body: "Our in-house designers prepare print-ready artwork at no extra cost.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Materials",
    body: "Recyclable kraft, FSC paper and biodegradable options across our range.",
  },
  {
    icon: Truck,
    title: "Worldwide Shipping",
    body: "Reliable delivery to your door, wherever your business operates.",
  },
  {
    icon: Headphones,
    title: "Custom Packaging",
    body: "Fully bespoke shapes, sizes, finishes and print — built around your brand.",
  },
  {
    icon: ShieldCheck,
    title: "Built for Growing Brands",
    body: "A packaging partner that grows with you, from launch to scale.",
  },
];

const processCards = [
  {
    number: "01",
    title: "Tell us what you need",
    body: "Share your product, dimensions and style — or just an idea. We'll guide you to the right packaging.",
  },
  {
    number: "02",
    title: "Custom design & pricing",
    body: "Receive print-ready mockups and transparent pricing — free and with no obligation.",
  },
  {
    number: "03",
    title: "Production & delivery",
    body: "We print, finish and ship your custom packaging straight to your door.",
  },
];

const SALES_PHONE = "+18884294881";
const SALES_PHONE_DISPLAY = "+1 (888) 429 4881";
const SALES_EMAIL = "info@hofpack.com";

const packagingTypes = [
  "Bakery box",
  "Candle box",
  "Coffee box",
  "Display box",
  "Craft boxes",
  "Mailer boxes",
  "Mylar bags",
  "Rigid box",
  "Custom food boxes",
  "Soap box",
  "Tuck box",
  "Not sure yet",
];

export default function CustomPacking() {
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
              <h1 className="max-w-[700px] text-[36px] font-bold leading-[1.03] text-white sm:text-[50px] lg:text-[60px]">
                Custom Packaging That
                <span className="block text-[#ee7a1b]">Defines Your Brand</span>
              </h1>
              <p className="mt-5 max-w-[560px] text-[14px] leading-[1.65] text-white sm:text-[15px]">
                Custom printed packaging built around your product, branding and order quantity. Low MOQ, free design
                support and worldwide shipping.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={scrollToQuoteForm}
                  className="inline-flex h-12 items-center gap-2 rounded-[9px] bg-[#ee7a1b] px-6 text-[15px] font-semibold leading-none text-white transition-colors hover:bg-[#d46710]"
                >
                  Get a Free Quote
                  <ArrowRight size={15} />
                </button>
                <a
                  href={`tel:${SALES_PHONE}`}
                  aria-label={`Call ${SALES_PHONE_DISPLAY}`}
                  className="inline-flex h-12 items-center rounded-[9px] border border-white/45 px-6 text-[15px] font-medium leading-none text-white transition-colors hover:border-white/80"
                >
                  Talk to Our Team
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/80">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ee7a1b]" />
                  Low MOQ
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ee7a1b]" />
                  Free Design Support
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ee7a1b]" />
                  Worldwide Shipping
                </span>
              </div>
            </div>

            <div id="quote-form" className="scroll-mt-6 rounded-[16px] bg-white p-5 shadow-[0_12px_32px_rgba(0,0,0,0.14)] sm:p-6">
              <h3 className="text-[30px] font-bold leading-none text-[#1f1f1f] sm:text-[32px]">
                Get a Free Custom Quote
              </h3>
              <p className="mt-2 text-[13px] text-[#6c7170]">Reply within 1 business day.</p>

              {submitted ? (
                <div className="mt-6 rounded-[12px] border border-[#dce7df] bg-[#f5fbf7] p-4 text-[14px] text-[#245238]">
                  Thanks! Your request has been captured. We will contact you shortly.
                </div>
              ) : (
                <form
                  className="mt-5 space-y-3.5"
                  onSubmit={handleSubmit}
                  onInput={onUnfilledFormInput}
                  onBlurCapture={onUnfilledFormBlur}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-medium text-[#2f2f2f]">
                        Name <span className="text-[#ee7a1b]">*</span>
                      </label>
                      <input
                        name="name"
                        data-unfilled="name"
                        className={`h-10 w-full rounded-[9px] border px-3 text-[14px] outline-none ${
                          errors.name ? "border-red-400 focus:border-red-500" : "border-[#d6dad7] focus:border-[#a8b8ad]"
                        }`}
                        required
                        value={formData.name}
                        onChange={(event) => updateForm("name", event.target.value)}
                      />
                      {errors.name ? (
                        <p className="text-[12px] font-medium text-red-600">{errors.name}</p>
                      ) : null}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-medium text-[#2f2f2f]">
                        Email <span className="text-[#ee7a1b]">*</span>
                      </label>
                      <input
                        name="email"
                        data-unfilled="email"
                        className={`h-10 w-full rounded-[9px] border px-3 text-[14px] outline-none ${
                          errors.email ? "border-red-400 focus:border-red-500" : "border-[#d6dad7] focus:border-[#a8b8ad]"
                        }`}
                        type="email"
                        required
                        value={formData.email}
                        onChange={(event) => updateForm("email", event.target.value)}
                      />
                      {errors.email ? (
                        <p className="text-[12px] font-medium text-red-600">{errors.email}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-medium text-[#2f2f2f]">
                        Phone <span className="text-[#ee7a1b]">*</span>
                      </label>
                      <div
                        className={`flex h-10 w-full overflow-hidden rounded-[9px] border ${
                          errors.phone ? "border-red-400" : "border-[#d6dad7]"
                        }`}
                      >
                        <span className="inline-flex items-center border-r border-[#d6dad7] bg-[#f6f6f6] px-3 text-[14px] text-[#5b625f]">
                          +1
                        </span>
                        <input
                          name="phone"
                          data-unfilled="phone"
                          className="h-full w-full px-3 text-[14px] outline-none focus:border-transparent"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          required
                          maxLength={PHONE_NATIONAL_DIGITS}
                          placeholder="5551234567"
                          value={formData.phone}
                          onChange={(event) =>
                            updateForm("phone", sanitizeUsPhoneNational(event.target.value))
                          }
                        />
                      </div>
                      <p className="text-[11px] text-[#7a7a7a]">{PHONE_NATIONAL_DIGITS}-digit USA mobile</p>
                      {errors.phone ? (
                        <p className="text-[12px] font-medium text-red-600">{errors.phone}</p>
                      ) : null}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-medium text-[#2f2f2f]">Company Name</label>
                      <input
                        className="h-10 w-full rounded-[9px] border border-[#d6dad7] px-3 text-[14px] outline-none focus:border-[#a8b8ad]"
                        value={formData.company}
                        onChange={(event) => updateForm("company", event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-[#2f2f2f]">Packaging Type</label>
                    <select
                      className="h-10 w-full rounded-[9px] border border-[#d6dad7] bg-white px-3 text-[14px] text-[#2f2f2f] outline-none focus:border-[#a8b8ad]"
                      value={formData.packagingType}
                      onChange={(event) => updateForm("packagingType", event.target.value)}
                    >
                      <option value="">Select packaging type...</option>
                      {packagingTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-[#2f2f2f]">Estimated Quantity</label>
                    <input
                      className={`h-10 w-full rounded-[9px] border px-3 text-[14px] outline-none ${
                        errors.estimatedQuantity
                          ? "border-red-400 focus:border-red-500"
                          : "border-[#d6dad7] focus:border-[#a8b8ad]"
                      }`}
                      type="text"
                      inputMode="numeric"
                      placeholder="e.g. 500"
                      value={formData.estimatedQuantity}
                      onChange={(event) =>
                        updateForm("estimatedQuantity", event.target.value.replace(/\D/g, ""))
                      }
                    />
                    {errors.estimatedQuantity && (
                      <p className="text-[12px] font-medium text-red-600">{errors.estimatedQuantity}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-[9px] bg-[#ee7a1b] text-[16px] font-semibold leading-none text-white transition-colors hover:bg-[#d46710]"
                  >
                    {isSubmitting ? "Submitting..." : "Get My Quote"}
                  </button>
                  <p className="text-center text-[12px] text-[#7a7a7a]">Free design support · Low MOQ · No obligation</p>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="-mt-2 px-4 pb-14 sm:px-8 sm:pb-16">
          <div className="mx-auto w-full max-w-[1280px] overflow-hidden rounded-[20px]">
            <Image
              src={heroPackaging}
              alt="Custom packaging set"
              className="h-auto w-full"
              priority
              sizes="(max-width: 768px) 100vw, 1320px"
            />
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#d07f3b]">Why Hof Pack</p>
            <h2 className="mt-3 max-w-[620px] text-[34px] font-bold leading-[1.05] text-[#1f4f35] sm:text-[42px]">
              A packaging partner built for growing brands
            </h2>
            <p className="mt-4 max-w-[900px] text-[18px] font-normal leading-[1.55] text-[#3f4845] sm:text-[20px]">
              Real value, no gimmicks — everything you need to launch and scale your packaging.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {valueCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article key={card.title} className="rounded-[16px] border border-[#e7e7e7] bg-white p-5 sm:p-6">
                    <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff2e5] text-[#ee7a1b]">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-[24px] font-bold leading-[1.16] text-[#222] sm:text-[28px]">{card.title}</h3>
                    <p className="mt-3 text-[16px] leading-[1.52] text-[#505856] sm:text-[17px]">{card.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#f5f4eb] px-4 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#d07f3b]">Our Range</p>
                <h2 className="mt-3 text-[34px] font-bold leading-[1.05] text-[#1f4f35] sm:text-[42px]">
                  Packaging built for every product
                </h2>
                <p className="mt-3 max-w-[900px] text-[18px] leading-[1.55] text-[#3f4845] sm:text-[20px]">
                  From rigid gift boxes to mylar bags — fully custom printed and shipped to your door.
                </p>
              </div>
              <button type="button" className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#d07f3b]">
                View all styles →
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {categoryCards.map((card) => (
                <article key={card.title} className="overflow-hidden rounded-[16px] border border-[#e7e7e0] bg-white">
                  <div className="relative aspect-[4/3]">
                    <Image src={card.image} alt={card.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                  </div>
                  <div className="flex items-start justify-between gap-4 px-5 py-5 sm:px-6">
                    <div>
                      <h3 className="text-[24px] font-bold text-[#222] sm:text-[28px]">{card.title}</h3>
                      <p className="mt-1.5 text-[16px] leading-[1.5] text-[#505856] sm:text-[17px]">{card.subtitle}</p>
                    </div>
                    <span className="mt-1 text-[#d07f3b]">→</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto w-full max-w-[1280px] text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#d07f3b]">Process</p>
            <h2 className="mt-3 text-[34px] font-bold leading-[1.05] text-[#1f4f35] sm:text-[42px]">How it works</h2>
            <p className="mx-auto mt-4 max-w-[920px] text-[18px] leading-[1.55] text-[#3f4845] sm:text-[20px]">
              From idea to delivered packaging — three simple steps.
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {processCards.map((step) => (
                <article key={step.number} className="rounded-[16px] border border-[#e7e7e7] bg-white p-5 text-left sm:p-6">
                  <p className="text-[46px] font-bold leading-none text-[#ee7a1b]">{step.number}</p>
                  <h3 className="mt-4 text-[24px] font-bold leading-[1.15] text-[#222] sm:text-[28px]">{step.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.52] text-[#505856] sm:text-[17px]">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f6f6f6] px-4 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto w-full max-w-[1280px] rounded-[18px] bg-[linear-gradient(120deg,#204f37_0%,#1f5a38_48%,#2f6d41_100%)] px-6 py-10 text-center sm:px-10 sm:py-12">
            <h2 className="text-[34px] font-bold leading-[1.06] text-white sm:text-[44px]">
              Ready to upgrade your <span className="text-[#ee7a1b]">packaging?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[840px] text-[16px] leading-[1.6] text-white sm:text-[18px]">
              Tell us what you need and our team will send custom pricing, packaging recommendations and delivery
              options.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={scrollToQuoteForm}
                className="inline-flex h-12 items-center gap-2 rounded-[10px] bg-[#ee7a1b] px-8 text-[15px] font-semibold leading-none text-white transition-colors hover:bg-[#d46710]"
              >
                Get a Free Quote
                <ArrowRight size={16} />
              </button>
              <a
                href={`mailto:${SALES_EMAIL}`}
                className="inline-flex h-12 items-center rounded-[10px] border border-white/35 px-7 text-[15px] font-medium leading-none text-white transition-colors hover:border-white/65"
              >
                Email Our Team
              </a>
            </div>
          </div>
        </section>
    </CustomPackingShell>
  );
}