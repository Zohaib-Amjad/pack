"use client";

import {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import heroImg from "@/assets/hero-packaging-new.jpg";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { trackLeadSubmitted } from "@/lib/analytics";
import { submitWebQuote } from "@/lib/submit-web-quote";
import { buildInquiryAttribution, isFromPaidTraffic } from "@/lib/attribution";
import SmsConsentLabel, { useSmsConsent } from "@/components/SmsConsentLabel";
import {
  PHONE_NATIONAL_DIGITS,
  sanitizePhoneInput,
  validateRequiredEmail,
  validateRequiredName,
  validateRequiredPhone,
  validateRequiredQuantity,
} from "@/lib/form-validation";
import { useAbandonedFormCapture } from "@/hooks/useAbandonedFormCapture";

// Context for opening modal from anywhere
type QuoteModalContextType = {
  open: (config?: { product?: string; category?: string }) => void;
};
const QuoteModalContext = createContext<QuoteModalContextType>({
  open: () => {},
});
export const useQuoteModal = () => useContext(QuoteModalContext);

export const QuoteModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<{ product?: string; category?: string }>(
    {},
  );

  const open = useCallback(
    (newConfig?: { product?: string; category?: string }) => {
      if (newConfig) setConfig(newConfig);
      setIsOpen(true);
    },
    [],
  );

  return (
    <QuoteModalContext.Provider value={{ open }}>
      {children}
      <QuoteModalDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialProduct={config.product}
        initialCategory={config.category}
      />
    </QuoteModalContext.Provider>
  );
};

function QuoteModalDialog({
  isOpen,
  onClose,
  initialProduct,
  initialCategory,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
  initialCategory?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  // Honeypot (bot trap — hidden from real users)
  const honeypotRef = useRef<HTMLInputElement>(null);

  // Math captcha
  const [captcha, setCaptcha] = useState({ n1: 0, n2: 0 });
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [boxType, setBoxType] = useState("");
  const [company, setCompany] = useState("");
  const [details, setDetails] = useState("");
  const [smsConsent, setSmsConsent] = useSmsConsent();

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const touch = (field: string) => setTouched((t) => ({ ...t, [field]: true }));
  const clearError = (field: string) => setErrors((er) => ({ ...er, [field]: "" }));

  const {
    track: trackUnfilled,
    onFormInput: onUnfilledFormInput,
    onFormBlurCapture: onUnfilledFormBlur,
  } = useAbandonedFormCapture({
    formName: "quote-modal",
    enabled: isOpen && !submitted && !loading,
    categorySlug: initialCategory,
    productInterest: initialProduct,
    fields: { name, email, phone },
  });

  // Sync initial values and regenerate captcha each time modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialCategory) setBoxType(initialCategory);
      setDetails("");
      setCaptcha({
        n1: Math.floor(Math.random() * 9) + 1,
        n2: Math.floor(Math.random() * 9) + 1,
      });
      setCaptchaAnswer("");
    }
  }, [isOpen, initialProduct, initialCategory]);

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      const supabase = createPublicClient();
      const { data } = (await withAbortableTimeout(
        (signal) =>
          supabase
            .from("categories" as any)
            .select("name")
            .eq("is_active", true)
            .order("name")
            .abortSignal(signal) as any,
      )) as any;
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check — bots fill hidden fields, humans don't
    if (honeypotRef.current?.value) return;

    // Mark all required fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      quantity: true,
      captcha: true,
      smsConsent: true,
    });

    const errs: Record<string, string> = {};
    const nameErr = validateRequiredName(name, "Full name");
    if (nameErr) errs.name = nameErr;
    const emailErr = validateRequiredEmail(email);
    if (emailErr) errs.email = emailErr;
    const phoneErr = validateRequiredPhone(phone);
    if (phoneErr) errs.phone = phoneErr;
    const qtyErr = validateRequiredQuantity(quantity);
    if (qtyErr) errs.quantity = qtyErr;
    if (!captchaAnswer.trim()) errs.captcha = "Please answer the verification question";
    if (!smsConsent) errs.smsConsent = "Please agree to continue";

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Math captcha validation
    if (parseInt(captchaAnswer, 10) !== captcha.n1 + captcha.n2) {
      setErrors((er) => ({ ...er, captcha: "The math answer is incorrect" }));
      setCaptcha({
        n1: Math.floor(Math.random() * 9) + 1,
        n2: Math.floor(Math.random() * 9) + 1,
      });
      setCaptchaAnswer("");
      return;
    }

    setLoading(true);
    const externalId = crypto.randomUUID();
    const supabase = createPublicClient();

    const messageContent = `Quantity: ${quantity}\nCompany: ${company}\n\nProject Details:\n${details}`;
    const attribution = buildInquiryAttribution("quote_modal", initialCategory);
    const resolvedSource = isFromPaidTraffic() ? "landing_page" : "organic";

    // Forward to HofPack CRM (server-side secret). Soft-fails; does not block thank-you UX.
    const crmForward = submitWebQuote({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      quantity: quantity.trim(),
      box_type: boxType.trim() || initialProduct || undefined,
      company: company.trim() || undefined,
      project_details: details.trim() || undefined,
      external_id: externalId,
      form_source: "quote_modal",
      product_slug: initialCategory || undefined,
      product_name: boxType.trim() || initialProduct || undefined,
    });

    const { error } = (await withAbortableTimeout(
      (signal) =>
        supabase
          .from("chat_inquiries" as any)
          .insert({
            name,
            email,
            phone,
            product_interest: boxType || initialProduct || "General Inquiry",
            message: messageContent,
            source: resolvedSource,
            status: "new",
            ...attribution,
          } as any)
          .abortSignal(signal) as any,
    )) as any;

    await crmForward;
    setLoading(false);

    if (error) {
      toast({
        title: "Error sending request",
        description: error.message,
        variant: "destructive",
      });
    } else {
      trackLeadSubmitted("quote_modal", attribution);
      toast({
        title: "Quote Request Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      // Send data to CRM (non-blocking)
      try {
        fetch("/api/crm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone,
            quantity,
            boxType: boxType || initialProduct || "General Inquiry",
            company,
            details,
          }),
        }).catch((crmErr) => {
          console.warn("[CRM Submission] Failed to forward to CRM API:", crmErr);
        });
      } catch (crmErr) {
        console.warn("[CRM Submission] Exception sending to CRM API:", crmErr);
      }

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setQuantity("");
      setBoxType("");
      setCompany("");
      setDetails("");

      const targetPath = initialCategory ? `/thank-you/${initialCategory}` : "/thank-you";
      onClose();
      router.push(targetPath);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after close animation
    setTimeout(() => {
      setSubmitted(false);
      setErrors({});
      setTouched({});
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        overlayClassName="inset-x-0 bottom-0 top-20 z-[90] lg:top-[112px]"
        className="flex top-[calc(5rem+12px)] z-[90] max-h-[calc(100dvh-5rem-24px)] w-[calc(100%-1.5rem)] max-w-4xl translate-y-0 flex-col gap-0 overflow-y-auto overscroll-contain border-border bg-card p-0 data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2 lg:top-[calc(112px+12px)] lg:max-h-[calc(100dvh-112px-24px)]"
      >
        <DialogTitle className="sr-only">Get a Free Quote</DialogTitle>
        <div className="grid min-h-0 md:grid-cols-5">
          {/* Left image panel */}
          <div className="relative hidden min-h-[280px] md:col-span-2 md:block">
            <Image
              src={heroImg}
              alt="Custom packaging"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/30" />
            <div className="relative z-10 flex flex-col justify-end h-full p-8">
              <h3 className="font-display text-2xl font-bold text-primary-foreground">
                Price Match Guarantee
              </h3>
              <p className="text-primary-foreground/70 text-sm font-sans mt-2">
                Fill out the form to get in touch with our dedicated packaging
                consultant.
              </p>
              <div className="mt-6 space-y-2 text-xs text-primary-foreground/60 font-sans">
                <p>✓ Free Shipping on All Orders</p>
                <p>✓ Low MOQ Starting at 100 Units</p>
                <p>✓ 8 to 12 Day Turnaround</p>
                <p>✓ Free Design Support</p>
              </div>
            </div>
          </div>

          {/* Right form panel */}
          <div className="p-6 sm:p-8 md:col-span-3">

            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-accent" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Quote Request Received!
                </h3>
                <p className="text-muted-foreground font-sans mt-2 max-w-sm">
                  Our dedicated packaging consultant will review your
                  requirements and get back to you within 24 hours.
                </p>
                <div className="flex gap-3 mt-6">
                  <Button variant="cta" onClick={() => setSubmitted(false)}>
                    Submit Another
                  </Button>
                  <Button variant="outline" onClick={handleClose}>
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Get a Free Quote
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans mt-1">
                    {initialProduct
                      ? `Inquiring about: ${initialProduct}`
                      : "Fill out the form and we'll get back to you within 24 hours."}
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  onInput={onUnfilledFormInput}
                  onBlurCapture={onUnfilledFormBlur}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="ds-label mb-1.5 block">Full Name *</label>
                      <Input
                        name="name"
                        data-unfilled="name"
                        placeholder="Your full name"
                        maxLength={100}
                        value={name}
                        onChange={(e) => {
                          const next = e.target.value;
                          setName(next);
                          if (touched.name) clearError("name");
                          trackUnfilled({ name: next, email, phone });
                        }}
                        onBlur={() => touch("name")}
                        className={touched.name && errors.name ? "border-red-400 focus-visible:ring-red-400/20" : ""}
                      />
                      {touched.name && errors.name && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="ds-label mb-1.5 block">Email *</label>
                      <Input
                        name="email"
                        data-unfilled="email"
                        type="email"
                        placeholder="email@company.com"
                        maxLength={255}
                        value={email}
                        onChange={(e) => {
                          const next = e.target.value;
                          setEmail(next);
                          if (touched.email) clearError("email");
                          trackUnfilled({ name, email: next, phone });
                        }}
                        onBlur={() => touch("email")}
                        className={touched.email && errors.email ? "border-red-400 focus-visible:ring-red-400/20" : ""}
                      />
                      {touched.email && errors.email && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="ds-label mb-1.5 block">Phone *</label>
                      <Input
                        name="phone"
                        data-unfilled="phone"
                        type="tel"
                        inputMode="numeric"
                        placeholder="5551234567"
                        maxLength={PHONE_NATIONAL_DIGITS}
                        value={phone}
                        onChange={(e) => {
                          const next = sanitizePhoneInput(e.target.value);
                          setPhone(next);
                          if (touched.phone) clearError("phone");
                          trackUnfilled({ name, email, phone: next });
                        }}
                        onBlur={() => touch("phone")}
                        className={touched.phone && errors.phone ? "border-red-400 focus-visible:ring-red-400/20" : ""}
                      />
                      <p className="mt-1 text-[10px] text-[#aaa6a0]">USA {PHONE_NATIONAL_DIGITS}-digit mobile</p>
                      {touched.phone && errors.phone && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="ds-label mb-1.5 block">Quantity *</label>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="e.g., 500"
                        maxLength={20}
                        value={quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value.replace(/\D/g, ""));
                          if (touched.quantity) clearError("quantity");
                        }}
                        onBlur={() => touch("quantity")}
                        className={touched.quantity && errors.quantity ? "border-red-400 focus-visible:ring-red-400/20" : ""}
                      />
                      {touched.quantity && errors.quantity && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.quantity}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="ds-label mb-1.5 block">
                        Select Box Type
                      </label>
                      <select
                        className="w-full h-10 px-3 rounded-md border border-[#d8d4cc] bg-[#faf8f5] font-sans text-[13px] text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-ring"
                        value={boxType}
                        onChange={(e) => setBoxType(e.target.value)}
                      >
                        <option value="">Select a category...</option>
                        {categories.map((cat: any) => (
                          <option key={cat.name} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="ds-label mb-1.5 block">
                        Company Name
                      </label>
                      <Input
                        placeholder="Your company"
                        maxLength={100}
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="ds-label mb-1.5 block">
                      Project Details
                    </label>
                    <Textarea
                      placeholder={
                        initialProduct
                          ? `Inquiry for: ${initialProduct}`
                          : "Provide detailed packaging specifications including dimensions, materials, weight restrictions, and design references..."
                      }
                      rows={3}
                      maxLength={1000}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                    />
                  </div>

                  {/* Honeypot — visually hidden, must remain empty */}
                  <input
                    ref={honeypotRef}
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      width: "1px",
                      height: "1px",
                      opacity: 0,
                    }}
                  />

                  {/* Math captcha */}
                  <div>
                    <label className="ds-label mb-1.5 block">
                      Security Check: What is {captcha.n1} + {captcha.n2}? *
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter the answer"
                      value={captchaAnswer}
                      onChange={(e) => { setCaptchaAnswer(e.target.value); if (touched.captcha) clearError("captcha"); }}
                      onBlur={() => touch("captcha")}
                      className={touched.captcha && errors.captcha ? "border-red-400 focus-visible:ring-red-400/20" : ""}
                    />
                    {touched.captcha && errors.captcha && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.captcha}</p>}
                  </div>

                  <div>
                    <label
                      className={`flex items-start gap-2.5 cursor-pointer rounded-[8px] p-1 ${
                        touched.smsConsent && errors.smsConsent
                          ? "outline outline-1 outline-red-400"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={smsConsent}
                        onChange={(e) => {
                          setSmsConsent(e.target.checked);
                          if (touched.smsConsent) clearError("smsConsent");
                        }}
                        onBlur={() => touch("smsConsent")}
                        className="mt-[2px] h-4 w-4 shrink-0 rounded border accent-[#e8732a]"
                      />
                      <span className="text-[12px] leading-[1.55] text-[#4a4a4a]">
                        <SmsConsentLabel />
                      </span>
                    </label>
                    {touched.smsConsent && errors.smsConsent && (
                      <p className="mt-1 text-[11px] font-medium text-red-500">{errors.smsConsent}</p>
                    )}
                  </div>

                  <Button
                    variant="cta"
                    size="lg"
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Send size={16} className="mr-2" />
                    )}
                    Submit Quote Request
                  </Button>

                  <p className="text-xs text-muted-foreground text-center font-sans">
                    Free Shipping · No Minimum MOQ · 8 to 12 Day Delivery ·
                    Price Match Guarantee
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default QuoteModalDialog;