"use client";

import { useState, useRef, type RefObject } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, X } from "lucide-react";
import SmsConsentLabel from "@/components/SmsConsentLabel";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { sendQuoteEmail } from "@/lib/send-quote-email";
import { submitWebQuote } from "@/lib/submit-web-quote";
import { useToast } from "@/hooks/use-toast";
import { trackLeadSubmitted } from "@/lib/analytics";
import { buildInquiryAttribution, isFromPaidTraffic } from "@/lib/attribution";
import { uploadInquiryAttachment } from "@/lib/inquiry-attachment";
import {
  ARTWORK_ACCEPT,
  blockInvalidNumberKeys,
  isValidEmail,
  isValidPhone,
  sanitizeNonNegativeNumber,
  PHONE_NATIONAL_DIGITS,
  sanitizePhoneInput,
  validateArtworkFile,
  validateOptionalDimension,
  validateRequiredEmail,
  validateRequiredName,
  validateRequiredPhone,
  validateRequiredQuantity,
} from "@/lib/form-validation";
import { useAbandonedFormCapture } from "@/hooks/useAbandonedFormCapture";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-[11px] font-medium text-red-500">{msg}</p>;
}

const inputCls =
  "w-full h-[44px] px-4 rounded-[8px] border border-[#CFCFCF] bg-white text-[13px] text-[#1a1a1a] placeholder:text-[#bbb] outline-none focus:border-[#e8732a] focus:ring-2 focus:ring-[#e8732a]/20 transition-all";
const labelCls =
  "block text-[12px] font-semibold text-[#6B6B66] mb-1.5 tracking-wide uppercase";
const errCls = "border-red-400";
const FORM_BG = "#E8F4EA";

const FIELD_ORDER = [
  "companyName",
  "firstName",
  "email",
  "phone",
  "length",
  "width",
  "height",
  "quantity",
  "artwork",
  "smsConsent",
] as const;

function scrollToField(el: HTMLElement | null) {
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => {
    el.focus({ preventScroll: true });
    el.classList.add("hof-field-attention");
    window.setTimeout(() => el.classList.remove("hof-field-attention"), 1200);
  }, 350);
}

export type QuoteRequestFormProps = {
  /** Shown in inquiry + email as product interest */
  productInterest?: string;
  /** chat_inquiries.source — falls back to attribution-derived value if omitted */
  source?: string;
  /** Stable category identifier for attribution (chat_inquiries.category_slug) */
  categorySlug?: string;
  /**
   * section = home page block with heading
   * card = category-style section wrapper
   * embedded = product hero (no outer page chrome)
   */
  variant?: "section" | "card" | "embedded";
  /**
   * Path to redirect to after a successful submit, e.g. `/thank-you/rigid-boxes`.
   * Omit to keep the inline "submitted" confirmation state instead.
   */
  thankYouPath?: string;
  id?: string;
  headingEyebrow?: string;
  headingTitle?: string;
  headingSubtitle?: string;
};

export default function QuoteRequestForm({
  productInterest = "General Inquiry",
  source,
  categorySlug,
  variant = "section",
  thankYouPath,
  id = "quote-form",
  headingEyebrow = "GET A FREE QUOTE",
  headingTitle = "Custom packaging, quoted in minutes",
  headingSubtitle,
}: QuoteRequestFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const lengthRef = useRef<HTMLInputElement>(null);
  const widthRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const artworkBoxRef = useRef<HTMLDivElement>(null);
  const smsConsentRef = useRef<HTMLInputElement>(null);

  const fieldRefs: Record<string, RefObject<HTMLElement | null>> = {
    companyName: companyRef,
    firstName: nameRef,
    email: emailRef,
    phone: phoneRef,
    length: lengthRef,
    width: widthRef,
    height: heightRef,
    quantity: quantityRef,
    artwork: artworkBoxRef,
    smsConsent: smsConsentRef,
  };

  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [quantity, setQuantity] = useState("");

  const [requirements, setRequirements] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Same capture path as header QuoteModal — watch controlled fields so a lead
  // is scheduled whenever name/email/phone state changes (not only onChange).
  const {
    track: trackUnfilled,
    flushNow: flushUnfilled,
    onFormInput: onUnfilledFormInput,
    onFormBlurCapture: onUnfilledFormBlur,
  } = useAbandonedFormCapture({
    formName: "quote-request-form",
    enabled: !submitted && !isSubmitting,
    categorySlug,
    productInterest,
    fields: { firstName, email, phone },
  });

  const nameOk = firstName.trim().length >= 2;
  const emailOk = isValidEmail(email);
  const phoneOk = isValidPhone(phone);
  const companyOk = companyName.trim().length > 0;
  const quantityOk = quantity.trim().length > 0;

  // Granular progress: step 1 (contact 40%) → step 2 (qty + dims 40%) → step 3 (notes 20%)
  const contactScore =
    (companyOk ? 0.2 : 0) +
    (nameOk ? 0.3 : 0) +
    (emailOk ? 0.25 : 0) +
    (phoneOk ? 0.25 : 0);
  const dimsFilled = [length, width, height].filter((v) => v.trim()).length;
  const specsScore =
    (quantityOk ? 0.7 : 0) + (dimsFilled > 0 ? Math.min(dimsFilled, 3) * 0.1 : 0);
  const notesScore =
    (requirements.trim() ? 0.6 : 0) + (artworkFile ? 0.4 : 0);
  const pct = Math.min(
    100,
    Math.round(contactScore * 40 + specsScore * 40 + notesScore * 20),
  );
  const contactFilled = companyOk && nameOk && emailOk && phoneOk;
  const activeStep =
    contactFilled && quantityOk ? 3 : contactFilled ? 2 : 1;

  const setDimension =
    (setter: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = sanitizeNonNegativeNumber(e.target.value);
      if (next !== null) setter(next);
    };

  const setArtwork = (file: File | null) => {
    if (!file) {
      setArtworkFile(null);
      setErrors((er) => ({ ...er, artwork: "" }));
      return;
    }
    const err = validateArtworkFile(file);
    if (err) {
      setErrors((er) => ({ ...er, artwork: err }));
      setArtworkFile(null);
      return;
    }
    setArtworkFile(file);
    setErrors((er) => ({ ...er, artwork: "" }));
  };

  const resetForm = () => {
    setCompanyName("");
    setFirstName("");
    setEmail("");
    setPhone("");
    setLength("");
    setWidth("");
    setHeight("");
    setUnit("in");
    setQuantity("");
    setRequirements("");
    setArtworkFile(null);
    setSmsConsent(false);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!companyName.trim()) errs.companyName = "Company name is required";
    const nameErr = validateRequiredName(firstName, "Name");
    if (nameErr) errs.firstName = nameErr;
    const emailErr = validateRequiredEmail(email);
    if (emailErr) errs.email = emailErr;
    const phoneErr = validateRequiredPhone(phone);
    if (phoneErr) errs.phone = phoneErr;
    const qtyErr = validateRequiredQuantity(quantity);
    if (qtyErr) errs.quantity = qtyErr;
    const lengthErr = validateOptionalDimension(length, "Length");
    if (lengthErr) errs.length = lengthErr;
    const widthErr = validateOptionalDimension(width, "Width");
    if (widthErr) errs.width = widthErr;
    const heightErr = validateOptionalDimension(height, "Height");
    if (heightErr) errs.height = heightErr;
    const artworkErr = validateArtworkFile(artworkFile);
    if (artworkErr) errs.artwork = artworkErr;
    if (!smsConsent) errs.smsConsent = "Please agree to continue";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = FIELD_ORDER.find((key) => errs[key]);
      if (firstKey) {
        // Wait a tick so error borders paint, then scroll to the missing field.
        requestAnimationFrame(() => {
          scrollToField(fieldRefs[firstKey]?.current ?? null);
        });
      }
      return;
    }

    setIsSubmitting(true);
    const externalId = crypto.randomUUID();
    const attribution = buildInquiryAttribution("category_quote_form", categorySlug);
    // If the caller didn't pin a source explicitly, derive it from real
    // attribution instead of always defaulting to "organic" — a visitor who
    // arrived via a Google Ads click should show up as landing_page traffic.
    const resolvedSource = source || (isFromPaidTraffic() ? "landing_page" : "organic");

    try {
      let attachment: { url: string; name: string; type: string } | null = null;
      if (artworkFile) {
        attachment = await uploadInquiryAttachment(artworkFile);
      }

      const dims =
        length.trim() || width.trim() || height.trim()
          ? `Dimensions: ${length || "—"}x${width || "—"}x${height || "—"} ${unit}`
          : "Dimensions: Not specified";
      const specs = [
        `Company: ${companyName.trim()}`,
        dims,
        `Quantity: ${quantity}`,
        "",
        "Requirements:",
        requirements || "None",
        attachment ? `\nArtwork file: ${attachment.name}\nArtwork URL: ${attachment.url}` : "",
      ].join("\n");

      const crmForward = submitWebQuote({
        name: firstName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: companyName.trim(),
        quantity: quantity.trim(),
        box_type: productInterest,
        project_details: specs,
        external_id: externalId,
        length: length.trim() || undefined,
        width: width.trim() || undefined,
        depth: height.trim() || undefined,
        unit,
        attachment_url: attachment?.url,
        attachment_name: attachment?.name,
        attachment_type: attachment?.type,
        form_source: categorySlug ? "category_page" : "home_quote",
        product_slug: categorySlug || undefined,
        product_name: productInterest,
      });

      const supabase = createPublicClient();
      const { error } = (await withAbortableTimeout(
        (signal) =>
          supabase
            .from("chat_inquiries" as any)
            .insert({
              name: firstName.trim(),
              email: email.trim(),
              phone: phone.trim(),
              product_interest: productInterest,
              message: specs,
              source: resolvedSource,
              status: "new",
              ...attribution,
              attachment_url: attachment?.url ?? null,
              attachment_name: attachment?.name ?? null,
              attachment_type: attachment?.type ?? null,
            } as any)
            .abortSignal(signal) as any,
      )) as any;

      await crmForward;

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        sendQuoteEmail({
          name: firstName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          productInterest,
          specs,
        });
        toast({
          title: "Request Sent!",
          description: "We'll get back to you with a quote within 24 hours.",
        });
        trackLeadSubmitted("category_quote_form", attribution);
        resetForm();
        if (thankYouPath) {
          router.push(thankYouPath);
        } else {
          setSubmitted(true);
        }
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formInner = submitted ? (
    <div className="rounded-[16px] border-2 border-[#EDEDEA] bg-white p-10 text-center flex flex-col items-center gap-5 sm:p-16">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#b8dfc8] bg-[#edf7f1]">
        <CheckCircle size={32} className="text-[#2d5c3e]" />
      </div>
      <div>
        <p
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700,
            fontSize: 22,
            color: "#1a1a1a",
            marginBottom: 8,
          }}
        >
          Quote Request Received!
        </p>
        <p style={{ fontSize: 13, color: "#7a7672", lineHeight: 1.7 }}>
          We&apos;ll review your specs and get back to you within 24 hours.
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          resetForm();
          setSubmitted(false);
        }}
        style={{ fontSize: 12, color: "#e8732a", textDecoration: "underline" }}
      >
        Submit another request
      </button>
    </div>
  ) : (
    <>
      {variant !== "embedded" && (
        <>
          <div className="mb-4">
            <div className="mb-2 flex justify-between">
              <span style={{ fontSize: 12, color: "#717182" }}>Step {activeStep} of 3</span>
              <span style={{ fontSize: 12, color: "#717182" }}>{pct}% Complete</span>
            </div>
            <div className="h-[6px] w-full overflow-hidden rounded-full" style={{ background: "#E0DDD6" }}>
              <div
                className="h-full rounded-full"
                style={{
                  background: "#2D5C3E",
                  width: `${pct}%`,
                  transition: "width 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </div>
          </div>

          <div className="mb-8 flex justify-between">
            {[
              { num: 1, title: "Information", sub: "Contact Details", align: "items-start text-left" },
              { num: 2, title: "Box Specifications", sub: "Packaging requirements", align: "items-center text-center" },
              { num: 3, title: "Comments", sub: "Additional notes", align: "items-end text-right" },
            ].map((s) => {
              const active = s.num <= activeStep;
              return (
                <div key={s.num} className={`flex flex-col gap-2 ${s.align}`}>
                  <div
                    className="flex shrink-0 items-center justify-center rounded-[4px] text-[13px] font-bold"
                    style={{
                      width: 28,
                      height: 28,
                      background: active ? "#E8732A" : "#E0DDD6",
                      color: active ? "#fff" : "#aaa",
                    }}
                  >
                    {s.num}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: active ? 700 : 400,
                        color: active ? "#1a1a1a" : "#aaa6a0",
                        lineHeight: "20px",
                      }}
                    >
                      {s.title}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: active ? "#717182" : "#c8c4bc",
                        lineHeight: "16px",
                      }}
                    >
                      {s.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <form
        onSubmit={handleSubmit}
        onInput={onUnfilledFormInput}
        onBlurCapture={onUnfilledFormBlur}
        className={`flex flex-col gap-10 rounded-[16px] border-2 border-[#dce8df] ${
          variant === "embedded" ? "gap-8 p-5 sm:p-6" : "gap-12 p-6 sm:p-12"
        }`}
        style={{ background: FORM_BG }}
      >
        {/* 1. Contact */}
        <div>
          <h3
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: variant === "embedded" ? 20 : 24,
              color: "#1A1A1A",
              marginBottom: 20,
            }}
          >
            Contact details
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>
                Company name <span className="text-[#e8732a]">*</span>
              </label>
              <input
                ref={companyRef}
                placeholder="Acme Co."
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  setErrors((er) => ({ ...er, companyName: "" }));
                }}
                className={`${inputCls} ${errors.companyName ? errCls : ""}`}
              />
              <FieldError msg={errors.companyName} />
            </div>
            <div>
              <label className={labelCls}>
                Name <span className="text-[#e8732a]">*</span>
              </label>
              <input
                ref={nameRef}
                name="firstName"
                data-unfilled="firstName"
                autoComplete="name"
                placeholder="Jane"
                value={firstName}
                onChange={(e) => {
                  const next = e.target.value;
                  setFirstName(next);
                  setErrors((er) => ({ ...er, firstName: "" }));
                  trackUnfilled({ firstName: next, email, phone });
                }}
                onBlur={() => flushUnfilled()}
                className={`${inputCls} ${errors.firstName ? errCls : ""}`}
              />
              <FieldError msg={errors.firstName} />
            </div>
            <div>
              <label className={labelCls}>
                Email <span className="text-[#e8732a]">*</span>
              </label>
              <input
                ref={emailRef}
                name="email"
                data-unfilled="email"
                type="email"
                autoComplete="email"
                placeholder="jane@company.com"
                value={email}
                onChange={(e) => {
                  const next = e.target.value;
                  setEmail(next);
                  setErrors((er) => ({ ...er, email: "" }));
                  trackUnfilled({ firstName, email: next, phone });
                }}
                onBlur={() => flushUnfilled()}
                className={`${inputCls} ${errors.email ? errCls : ""}`}
              />
              <FieldError msg={errors.email} />
            </div>
            <div>
              <label className={labelCls}>
                Phone <span className="text-[#e8732a]">*</span>
              </label>
              <input
                ref={phoneRef}
                name="phone"
                data-unfilled="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={PHONE_NATIONAL_DIGITS}
                placeholder="5551234567"
                value={phone}
                onChange={(e) => {
                  const next = sanitizePhoneInput(e.target.value);
                  setPhone(next);
                  setErrors((er) => ({ ...er, phone: "" }));
                  trackUnfilled({ firstName, email, phone: next });
                }}
                onBlur={() => flushUnfilled()}
                className={`${inputCls} ${errors.phone ? errCls : ""}`}
              />
              <p className="mt-1 text-[10px] text-[#aaa6a0]">
                USA {PHONE_NATIONAL_DIGITS}-digit mobile
              </p>
              <FieldError msg={errors.phone} />
            </div>
          </div>
        </div>

        {/* 2. Specs */}
        <div>
          <h3
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: variant === "embedded" ? 20 : 24,
              color: "#1A1A1A",
              marginBottom: 20,
            }}
          >
            2. Box Specifications
          </h3>
          <div
            className="mb-4 rounded-[10px] border border-[#dce8df] p-4"
            style={{ background: "#f4faf5" }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span style={{ fontSize: 14, fontWeight: 600, color: "#6B6B66", letterSpacing: "0.02em" }}>
                Dimensions (L × W × H){" "}
                <span style={{ fontWeight: 400, color: "#aaa", textTransform: "none", fontSize: 12 }}>
                  Optional
                </span>
              </span>
              <div className="flex overflow-hidden rounded-[6px] border border-[#CFCFCF]">
                {(["in", "cm"] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    className="px-3 py-1 text-[12px] font-semibold transition-all"
                    style={{
                      background: unit === u ? "#E8732A" : "#fff",
                      color: unit === u ? "#fff" : "#6B6B66",
                    }}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: "Length",
                  val: length,
                  set: setLength,
                  key: "length",
                  ph: "e.g., 8",
                  ref: lengthRef,
                },
                {
                  label: "Width",
                  val: width,
                  set: setWidth,
                  key: "width",
                  ph: "e.g. 5",
                  ref: widthRef,
                },
                {
                  label: "Height",
                  val: height,
                  set: setHeight,
                  key: "height",
                  ph: "e.g. 3",
                  ref: heightRef,
                },
              ].map((f) => (
                <div key={f.key}>
                  <label className={labelCls}>{f.label}</label>
                  <input
                    ref={f.ref}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="any"
                    placeholder={f.ph}
                    value={f.val}
                    onChange={setDimension(f.set)}
                    onKeyDown={blockInvalidNumberKeys}
                    className={`${inputCls} ${errors[f.key] ? errCls : ""}`}
                  />
                  <FieldError msg={errors[f.key]} />
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-md">
            <label className={labelCls}>
              Order Quantity <span className="text-[#e8732a]">*</span>
            </label>
            <input
              ref={quantityRef}
              type="text"
              inputMode="numeric"
              placeholder="500"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value.replace(/\D/g, ""));
                setErrors((er) => ({ ...er, quantity: "" }));
              }}
              className={`${inputCls} ${errors.quantity ? errCls : ""}`}
            />
            <FieldError msg={errors.quantity} />
          </div>
        </div>

        {/* 3. Anything else */}
        <div>
          <h3
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: variant === "embedded" ? 20 : 24,
              color: "#1A1A1A",
              marginBottom: 20,
            }}
          >
            Anything else?
          </h3>
          <div className="mb-5">
            <label className={labelCls}>
              Requirements{" "}
              <span style={{ fontWeight: 400, color: "#aaa", textTransform: "none" }}>Optional</span>
            </label>
            <textarea
              placeholder="Finish, artwork status, or target date."
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-[8px] border border-[#CFCFCF] bg-white px-4 py-3 text-[13px] outline-none transition-all placeholder:text-[#bbb] focus:border-[#e8732a] focus:ring-2 focus:ring-[#e8732a]/20"
            />
          </div>

          <div className="mb-6">
            <h4
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: "#1A1A1A",
                marginBottom: 12,
              }}
            >
              Upload Artwork file{" "}
              <span style={{ fontWeight: 400, color: "#aaa", fontSize: 12 }}>Optional</span>
            </h4>
            <div
              ref={artworkBoxRef}
              tabIndex={-1}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files[0];
                if (f) setArtwork(f);
              }}
              onClick={() => fileRef.current?.click()}
              className="cursor-pointer rounded-[10px] border-2 border-dashed p-8 text-center transition-all outline-none sm:p-10"
              style={{
                borderColor: errors.artwork ? "#ef4444" : "#E8732A",
                background: dragOver ? "#fcecd8" : "#FFFAF6",
              }}
            >
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                accept={ARTWORK_ACCEPT}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setArtwork(f);
                  e.target.value = "";
                }}
              />
              {artworkFile ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[13px] font-medium text-[#1a1a1a]">{artworkFile.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setArtwork(null);
                    }}
                    className="text-[#aaa] hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-[14px] font-bold text-[#1a1a1a]">Drag and drop your files</p>
                  <p className="mt-1 text-[12px] text-[#717182]">JPEG, PNG, PDF, and MP4 formats, up to 50MB</p>
                </>
              )}
            </div>
            <FieldError msg={errors.artwork} />
          </div>

          <div className="mt-5 mb-3">
            <label
              className={`flex items-start gap-2.5 rounded-[8px] p-1 cursor-pointer ${
                errors.smsConsent ? "outline outline-1 outline-red-400" : ""
              }`}
            >
              <input
                ref={smsConsentRef}
                type="checkbox"
                checked={smsConsent}
                onChange={(e) => {
                  setSmsConsent(e.target.checked);
                  setErrors((er) => ({ ...er, smsConsent: "" }));
                }}
                className="mt-[2px] h-4 w-4 shrink-0 rounded border-[#CFCFCF] accent-[#e8732a]"
              />
              <span className="text-[12px] leading-[1.55] text-[#4a4a4a]">
                <SmsConsentLabel />
              </span>
            </label>
            <FieldError msg={errors.smsConsent} />
          </div>

          <div className="mt-2 flex justify-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className="hof-quote-submit inline-flex items-center justify-center gap-2 rounded-[8px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              style={{ background: "#E8732A", fontSize: 14, padding: "14px 48px" }}
            >
              {isSubmitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : null}
              {isSubmitting ? "Sending…" : "Request a Free Quote"}
            </button>
          </div>
        </div>
      </form>
      <style>{`
        .hof-quote-submit {
          transition:
            background-color 180ms ease,
            transform 180ms ease,
            box-shadow 180ms ease;
          box-shadow: 0 2px 0 rgba(196, 90, 24, 0.25);
        }
        .hof-quote-submit:hover:not(:disabled) {
          background: #c45a18 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(232, 115, 42, 0.35);
        }
        .hof-quote-submit:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 0 rgba(196, 90, 24, 0.25);
        }
        .hof-field-attention {
          animation: hof-field-pulse 1.1s ease;
        }
        @keyframes hof-field-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(232, 115, 42, 0.55);
          }
          40% {
            box-shadow: 0 0 0 6px rgba(232, 115, 42, 0.2);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(232, 115, 42, 0);
          }
        }
      `}</style>
    </>
  );

  if (variant === "embedded") {
    return (
      <div id={id} className="scroll-mt-6 w-full">
        {formInner}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <section
        id={id}
        className="scroll-mt-6 border-t border-[#dce8df] px-4 py-16 sm:px-6"
        style={{ background: FORM_BG }}
      >
        <div className="mx-auto max-w-[1080px]">
          <div className="mb-8 text-center">
            <p className="mb-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
              {headingEyebrow}
            </p>
            <h2 className="font-display text-[32px] font-semibold text-foreground sm:text-[36px]">
              {headingTitle}
            </h2>
            {headingSubtitle ? (
              <p className="mx-auto mt-2 max-w-xl font-sans text-[13px] text-[var(--ds-muted)]">
                {headingSubtitle}
              </p>
            ) : null}
          </div>
          {formInner}
        </div>
      </section>
    );
  }

  // section (home)
  return (
    <div
      id={id}
      suppressHydrationWarning
      style={{ background: FORM_BG }}
      className="scroll-mt-6 px-4 py-10 sm:px-10 sm:py-[72px]"
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div className="mb-8 text-center">
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 18,
              color: "#E8732A",
              marginBottom: 10,
            }}
          >
            {headingEyebrow}
          </p>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(28px,4vw,44px)",
              lineHeight: "120%",
              color: "#000000",
            }}
          >
            {headingTitle}
          </h2>
        </div>
        {formInner}
      </div>
    </div>
  );
}