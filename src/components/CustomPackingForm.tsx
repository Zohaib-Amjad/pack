"use client";

import { useState } from "react";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { useToast } from "@/hooks/use-toast";
import { trackLeadSubmitted } from "@/lib/analytics";
import { buildInquiryAttribution } from "@/lib/attribution";
import {
  PHONE_NATIONAL_DIGITS,
  phoneDigits,
  sanitizeUsPhoneNational,
  validateOptionalQuantity,
  validateRequiredEmail,
  validateRequiredName,
} from "@/lib/form-validation";
import { useAbandonedFormCapture } from "@/hooks/useAbandonedFormCapture";

const packagingTypes = [
  "Bakery box", "Candle box", "Coffee box", "Display box",
  "Craft boxes", "Mailer boxes", "Mylar bags", "Rigid box",
  "Custom food boxes", "Soap box", "Tuck box", "Not sure yet",
];

interface Props {
  source?: string;
}

export default function CustomPackingForm({ source = "landing_page" }: Props) {
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
    name: "", email: "", phone: "", company: "",
    packagingType: "", estimatedQuantity: "",
  });

  const {
    track: trackUnfilled,
    onFormInput: onUnfilledFormInput,
    onFormBlurCapture: onUnfilledFormBlur,
  } = useAbandonedFormCapture({
    formName: "custom-packing-form",
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
    if (field === "name" || field === "email" || field === "phone" || field === "estimatedQuantity")
      setErrors((prev) => ({ ...prev, [field]: undefined }));
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
    if (!formData.phone.trim()) nextErrors.phone = "Phone number is required.";
    else if (phoneDigits(formData.phone).length !== PHONE_NATIONAL_DIGITS) {
      nextErrors.phone = `Enter a ${PHONE_NATIONAL_DIGITS}-digit USA mobile number.`;
    } else if (!normalizedPhone) nextErrors.phone = "Please enter a valid USA phone number.";
    const qtyErr = validateOptionalQuantity(formData.estimatedQuantity);
    if (qtyErr) nextErrors.estimatedQuantity = qtyErr;

    if (Object.keys(nextErrors).length > 0) { setErrors(nextErrors); return; }

    setIsSubmitting(true);
    const message = [
      formData.company ? `Company: ${formData.company}` : null,
      formData.estimatedQuantity ? `Estimated Quantity: ${formData.estimatedQuantity}` : null,
    ].filter(Boolean).join("\n");

    try {
      const supabase = createPublicClient();
      const attribution = buildInquiryAttribution("custom_packing_form");
      const { error } = (await withAbortableTimeout((signal) =>
        supabase.from("chat_inquiries" as any).insert({
          name, email,
          phone: normalizedPhone,
          product_interest: formData.packagingType || "Custom Packing Inquiry",
          message: message || "Custom packing inquiry submitted from landing page.",
          source,
          status: "new",
          ...attribution,
        } as any).abortSignal(signal) as any
      )) as any;
      if (error) throw error;
      setSubmitted(true);
      setFormData({
        name: "", email: "", phone: "", company: "",
        packagingType: "", estimatedQuantity: "",
      });
      setErrors({});
      trackLeadSubmitted("custom_packing_form", attribution);
    } catch (error: any) {
      toast({ title: "Something went wrong", description: error?.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "", email: "", phone: "", company: "",
      packagingType: "", estimatedQuantity: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div id="quote-form" className="scroll-mt-6 rounded-[16px] bg-white p-5 shadow-[0_12px_32px_rgba(0,0,0,0.14)] sm:p-6">
      <h3 className="text-[30px] font-bold leading-none text-[#1f1f1f] sm:text-[32px]">
        Get a Free Custom Quote
      </h3>
      <p className="mt-2 text-[13px] text-[#6c7170]">Reply within 1 business day.</p>

      {submitted ? (
        <div className="mt-6 rounded-[12px] border border-[#dce7df] bg-[#f5fbf7] p-4 text-[14px] text-[#245238] space-y-3">
          <p>Thanks! Your request has been captured. We will contact you shortly.</p>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-[#ee7a1b] underline"
          >
            Submit another request
          </button>
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
                className={`h-10 w-full rounded-[9px] border px-3 text-[14px] outline-none ${errors.name ? "border-red-400 focus:border-red-500" : "border-[#d6dad7] focus:border-[#a8b8ad]"}`}
                required
                placeholder="Jane Smith"
                value={formData.name}
                onChange={(e) => updateForm("name", e.target.value)}
              />
              {errors.name && <p className="text-[12px] font-medium text-red-600">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#2f2f2f]">
                Email <span className="text-[#ee7a1b]">*</span>
              </label>
              <input
                name="email"
                data-unfilled="email"
                className={`h-10 w-full rounded-[9px] border px-3 text-[14px] outline-none ${errors.email ? "border-red-400 focus:border-red-500" : "border-[#d6dad7] focus:border-[#a8b8ad]"}`}
                type="email"
                required
                placeholder="jane@company.com"
                value={formData.email}
                onChange={(e) => updateForm("email", e.target.value)}
              />
              {errors.email && <p className="text-[12px] font-medium text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#2f2f2f]">
                Phone <span className="text-[#ee7a1b]">*</span>
              </label>
              <div className={`flex h-10 w-full overflow-hidden rounded-[9px] border ${errors.phone ? "border-red-400" : "border-[#d6dad7]"}`}>
                <span className="inline-flex items-center border-r border-[#d6dad7] bg-[#f6f6f6] px-3 text-[14px] text-[#5b625f]">+1</span>
                <input
                  name="phone"
                  data-unfilled="phone"
                  className="h-full w-full px-3 text-[14px] outline-none"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  required
                  maxLength={PHONE_NATIONAL_DIGITS}
                  placeholder="5551234567"
                  value={formData.phone}
                  onChange={(e) =>
                    updateForm("phone", sanitizeUsPhoneNational(e.target.value))
                  }
                />
              </div>
              <p className="text-[11px] text-[#7a7a7a]">{PHONE_NATIONAL_DIGITS}-digit USA mobile</p>
              {errors.phone && <p className="text-[12px] font-medium text-red-600">{errors.phone}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#2f2f2f]">Company Name</label>
              <input
                className="h-10 w-full rounded-[9px] border border-[#d6dad7] px-3 text-[14px] outline-none focus:border-[#a8b8ad]"
                placeholder="Your Brand Inc."
                value={formData.company}
                onChange={(e) => updateForm("company", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-[#2f2f2f]">Packaging Type</label>
            <select
              className="h-10 w-full rounded-[9px] border border-[#d6dad7] bg-white px-3 text-[14px] text-[#2f2f2f] outline-none focus:border-[#a8b8ad]"
              value={formData.packagingType}
              onChange={(e) => updateForm("packagingType", e.target.value)}
            >
              <option value="">Select packaging type...</option>
              {packagingTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
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
              onChange={(e) =>
                updateForm("estimatedQuantity", e.target.value.replace(/\D/g, ""))
              }
            />
            {errors.estimatedQuantity && (
              <p className="text-[12px] font-medium text-red-600">{errors.estimatedQuantity}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-[9px] bg-[#ee7a1b] text-[16px] font-semibold leading-none text-white transition-colors hover:bg-[#d46710] disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Get My Quote"}
          </button>
          <p className="text-center text-[12px] text-[#7a7a7a]">Free design support · Low MOQ · No obligation</p>
        </form>
      )}
    </div>
  );
}