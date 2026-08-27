"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import ProductSpecificationSection from "@/components/ProductSpecificationSection";
import CTASection from "@/components/CTASection";
import { getProductBySlug } from "@/data/products";
import { useProductDetail } from "@/hooks/useProduct";
import PageLoader from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, Send, ChevronRight, X } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import { useToast } from "@/hooks/use-toast";
import { getProductImage } from "@/data/categoryImages";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import ProductDynamicContent from "@/components/ProductDynamicContent";
import { sendQuoteEmail } from "@/lib/send-quote-email";
import { submitWebQuote } from "@/lib/submit-web-quote";
import { trackLeadSubmitted, pushDataLayerEvent } from "@/lib/analytics";
import { buildInquiryAttribution } from "@/lib/attribution";
import { useAbandonedFormCapture } from "@/hooks/useAbandonedFormCapture";
import RelatedProductsCarouselSection from "@/components/RelatedProductsCarouselSection";
import ProductRatingSlider from "@/components/ProductRatingSlider";
import {
  addToCart,
  consumeDynamicStock,
  formatUsd,
  getDynamicStock,
  resolveProductUnitPrice,
  shouldShowAddToCart,
} from "@/lib/google-shopping";
import { uploadInquiryAttachment } from "@/lib/inquiry-attachment";
import {
  ARTWORK_ACCEPT,
  blockInvalidNumberKeys,
  sanitizeNonNegativeNumber,
  PHONE_NATIONAL_DIGITS,
  sanitizePhoneInput,
  validateArtworkFile,
  validateRequiredDimension,
  validateRequiredEmail,
  validateRequiredName,
  validateRequiredPhone,
  validateRequiredQuantity,
} from "@/lib/form-validation";

const TrustpilotTestimonialsSection = dynamic(
  () => import("@/components/home/TrustpilotTestimonialsSection"),
);

const TestProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const productSlug = params?.productSlug as string;
  const { toast } = useToast();

  const { data, isLoading: loading } = useProductDetail(productSlug);

  const dbProduct = data?.product;
  const dbRelatedProducts = data?.relatedProducts || [];
  const dbFaqs = data?.faqs || [];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeImage, setActiveImage] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Contact States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const { track: trackUnfilled, flushNow: flushUnfilled } = useAbandonedFormCapture({
    formName: "product-quote-form",
    enabled: !quoteSubmitted && !isSubmitting,
    productInterest: dbProduct?.name || productSlug,
    categorySlug: (dbProduct as any)?.category_slug || (dbProduct as any)?.categories?.slug,
  });

  // Spec Form States
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [unit, setUnit] = useState("inch");
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [artworkFile, setArtworkFile] = useState<File | null>(null);

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const touch = (field: string) => setTouched((t) => ({ ...t, [field]: true }));
  const clearError = (field: string) => setErrors((er) => ({ ...er, [field]: "" }));

  const setPositiveNumber =
    (setter: (v: string) => void, field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = sanitizeNonNegativeNumber(e.target.value);
      if (next !== null) {
        setter(next);
        if (touched[field]) clearError(field);
      }
    };

  const setArtwork = (file: File | null) => {
    if (!file) {
      setArtworkFile(null);
      clearError("artwork");
      return;
    }
    const err = validateArtworkFile(file);
    if (err) {
      setErrors((er) => ({ ...er, artwork: err }));
      setArtworkFile(null);
      return;
    }
    setArtworkFile(file);
    clearError("artwork");
  };

  // Math Captcha — client-side only to avoid SSR hydration mismatch
  const [captcha, setCaptcha] = useState({ n1: 0, n2: 0 });
  const [captchaInput, setCaptchaInput] = useState("");
  const [showGoogleCart, setShowGoogleCart] = useState(false);
  const [stockLeft, setStockLeft] = useState<number | null>(null);

  useEffect(() => {
    setCaptcha({
      n1: Math.floor(Math.random() * 9) + 1,
      n2: Math.floor(Math.random() * 9) + 1,
    });
  }, []);

  useEffect(() => {
    setShowGoogleCart(shouldShowAddToCart());
  }, [productSlug]);

  useEffect(() => {
    if (!showGoogleCart || !productSlug) {
      setStockLeft(null);
      return;
    }
    setStockLeft(getDynamicStock(productSlug));
    const id = window.setInterval(() => {
      setStockLeft(getDynamicStock(productSlug));
    }, 15_000);
    return () => window.clearInterval(id);
  }, [showGoogleCart, productSlug]);

  const generateCaptcha = () => {
    setCaptcha({
      n1: Math.floor(Math.random() * 9) + 1,
      n2: Math.floor(Math.random() * 9) + 1,
    });
    setCaptchaInput("");
  };

  const staticResult = productSlug ? getProductBySlug(productSlug) : null;

  // UI rendering for categories/products relies on static data because the DB query here only selects
  // `categories (name, slug)` (no `products` relationship).
  const staticCategory = staticResult?.category ?? null;
  const staticCategoryProducts = staticCategory?.products ?? [];

  // Source of truth for related products: only DB selection.
  const relatedProducts = dbRelatedProducts;

  const category = dbProduct?.categories || staticCategory;

  const staticProductIndex = staticResult
    ? staticCategoryProducts.findIndex(
      (p: any) => p.slug === staticResult.product.slug,
    )
    : 0;

  // Used for image ordering and UI labels; always non-negative.
  const productIndex = staticProductIndex >= 0 ? staticProductIndex : 0;

  // Source of truth for product fields/images: DB first, then static fallback.
  const product = dbProduct || staticResult?.product;
  const pageTitle = product?.name || "Premium Packaging";
  const pageDescription =
    (typeof dbProduct?.description === "string" &&
      dbProduct.description.trim()) ||
    `Premium custom ${String(product?.name || "packaging").toLowerCase()} by HofPack.`;
  const labelClassName =
    "min-h-[16px] text-[9.5px] font-medium uppercase tracking-[0.09em] leading-[1.2] text-[#7a7672]";
  const inputClassName =
    "h-9 rounded-[7px] border-[#d8d4cc] bg-[#faf8f5] px-3 text-[12.5px] focus-visible:ring-accent/20";
  const selectTriggerClassName =
    "h-9 rounded-[7px] border-[#d8d4cc] bg-[#faf8f5] px-3 text-[12.5px] text-[#1a1a1a] focus:ring-accent/20";

  if (loading) {
    return <PageLoader />;
  }

  if (!product) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">
            Product not found
          </h1>
          <Button variant="link" asChild className="mt-4">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Gallery: prefer DB images, then fill with unique category fallbacks so thumbnails show.
  const dbImages: string[] = Array.isArray(dbProduct?.images)
    ? dbProduct.images.filter((img: unknown): img is string => typeof img === "string" && img.trim().length > 0)
    : [];
  const fallbackImages: string[] =
    category
      ? [0, 1, 2, 3]
          .map((offset) => getProductImage(category.slug, productIndex + offset))
          .filter((img): img is string => Boolean(img))
      : [];
  const productImages = (() => {
    const seen = new Set<string>();
    const merged: string[] = [];
    for (const img of [...dbImages, ...fallbackImages]) {
      if (!seen.has(img)) {
        seen.add(img);
        merged.push(img);
      }
    }
    return merged;
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all required fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      length: true,
      width: true,
      depth: true,
      quantity: true,
      captcha: true,
      artwork: true,
    });

    const errs: Record<string, string> = {};
    const firstErr = validateRequiredName(firstName, "First name");
    if (firstErr) errs.firstName = firstErr;
    const lastErr = validateRequiredName(lastName, "Last name");
    if (lastErr) errs.lastName = lastErr;
    const phoneErr = validateRequiredPhone(phone);
    if (phoneErr) errs.phone = phoneErr;
    const emailErr = validateRequiredEmail(email);
    if (emailErr) errs.email = emailErr;
    const lengthErr = validateRequiredDimension(length, "Length");
    if (lengthErr) errs.length = lengthErr;
    const widthErr = validateRequiredDimension(width, "Width");
    if (widthErr) errs.width = widthErr;
    const depthErr = validateRequiredDimension(depth, "Depth");
    if (depthErr) errs.depth = depthErr;
    const qtyErr = validateRequiredQuantity(quantity);
    if (qtyErr) errs.quantity = qtyErr;
    if (!captchaInput.trim()) errs.captcha = "Please answer the verification question";
    const artworkErr = validateArtworkFile(artworkFile);
    if (artworkErr) errs.artwork = artworkErr;

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Captcha validation
    if (parseInt(captchaInput, 10) !== captcha.n1 + captcha.n2) {
      setErrors((er) => ({ ...er, captcha: "The math answer is incorrect" }));
      generateCaptcha();
      return;
    }

    setIsSubmitting(true);

    try {
      let attachment: { url: string; name: string; type: string } | null = null;
      if (artworkFile) {
        attachment = await uploadInquiryAttachment(artworkFile);
      }

      const supabase = createPublicClient();
      const specs = [
        `Dimensions: ${length}x${width}x${depth} ${unit}`,
        `Quantity: ${quantity}`,
        `Color: ${color || "Not specified"}`,
        "",
        "Requirements:",
        description || "None",
        attachment ? `\nArtwork file: ${attachment.name}\nArtwork URL: ${attachment.url}` : "",
      ].join("\n");
      const attribution = buildInquiryAttribution("test_product_quote_form");
      const fullName = `${firstName} ${lastName}`.trim();
      const productInterest = product?.name || "Product Spec Inquiry";
      const externalId = crypto.randomUUID();

      const crmForward = submitWebQuote({
        name: fullName,
        email: email.trim(),
        phone: phone.trim(),
        quantity: quantity.trim(),
        box_type: productInterest,
        project_details: specs,
        external_id: externalId,
        length: length.trim() || undefined,
        width: width.trim() || undefined,
        depth: depth.trim() || undefined,
        unit,
        color: color || undefined,
        attachment_url: attachment?.url,
        attachment_name: attachment?.name,
        attachment_type: attachment?.type,
        form_source: "product_page",
        product_slug: productSlug,
        product_name: productInterest,
      });

      const { error } = (await withAbortableTimeout(
        (signal) =>
          supabase
            .from("chat_inquiries" as any)
            .insert({
              name: fullName,
              email: email.trim(),
              phone: phone.trim(),
              product_interest: productInterest,
              message: specs,
              source: "organic",
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
        trackLeadSubmitted("test_product_quote_form", attribution);
        setQuoteSubmitted(true);
        toast({ title: "Specs Sent!", description: "We'll get back to you with a quote within 24 hours." });
        sendQuoteEmail({
          name: fullName,
          email: email.trim(),
          phone: phone.trim(),
          productInterest,
          specs,
        });
        setFirstName(""); setLastName(""); setEmail(""); setPhone("");
        setLength(""); setWidth(""); setDepth(""); setQuantity("");
        setCaptchaInput("");
        setDescription("");
        setArtworkFile(null);
        generateCaptcha();
        router.push("/thank-you");
      }
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const productDetailSection = (() => {
    // If the product has structured content in product_content, use the dynamic renderer
    const pc = (dbProduct as any)?.product_content;
    const hasContent = pc && (
      pc.feature_items?.length ||
      pc.content_blocks?.length ||
      pc.article_sections?.length ||
      pc.spec_overrides
    );

    if (hasContent) {
      return (
        <ProductDynamicContent
          productName={product.name}
          stockInfo={dbProduct?.stock_info}
          printingOptions={dbProduct?.printing_options}
          finishingOptions={dbProduct?.finishing_options}
          proofInfo={dbProduct?.proof_info}
          turnaroundTime={dbProduct?.turnaround_time}
          sizeInfo={dbProduct?.size_info}
          minQuantity={dbProduct?.min_quantity}
          content={pc}
          afterCards={<TrustpilotTestimonialsSection />}
        />
      );
    }

    // Legacy fallback — testimonials after cards/content, before page end
    return (
      <>
        <ProductSpecificationSection productName={product.name} />
        <TrustpilotTestimonialsSection />
      </>
    );
  })();

  return (
    <Layout>
      <div className="bg-background min-h-screen font-sans text-foreground">
        {/* Breadcrumb */}
        <div className="border-b border-[#e0ddd6] bg-[#faf8f5] py-3">
          <div className="container-max px-4 lg:px-8">
            <nav className="flex items-center flex-wrap gap-2 text-[10px] font-medium uppercase tracking-[0.1em] text-[#9a9690]">
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <ChevronRight size={10} className="opacity-50" />
              <Link
                href={`/${category?.slug}`}
                className="hover:text-accent transition-colors"
              >
                {category?.name}
              </Link>
              <ChevronRight size={10} className="opacity-50" />
              <span className="font-medium text-[#1a1a1a]">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* 1. Hero — image + form flush (0 gap); no padding inside image */}
        <section className="bg-[#faf8f5] pb-6 pt-3 sm:pb-8 lg:pt-5">
          <div className="w-full px-3 sm:px-4 lg:px-6">
            <div className="grid grid-cols-1 items-stretch gap-0 overflow-hidden rounded-[14px] border border-[#e0ddd6] bg-card shadow-[0_8px_28px_rgba(0,0,0,0.04)] lg:grid-cols-2">
              {/* Left: image + thumbnails — no inner spacing */}
              <div className="m-0 min-w-0 p-0">
                <div
                  className="relative m-0 aspect-square w-full cursor-pointer overflow-hidden p-0"
                  onClick={() => setIsExpanded(true)}
                >
                  {productImages[activeImage] ? (
                    <Image
                      src={productImages[Math.min(activeImage, productImages.length - 1)]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#ece9e2]">
                      <Package size={80} className="text-muted" />
                    </div>
                  )}
                </div>

                {productImages.length > 1 && (
                  <div className="m-0 flex gap-0 overflow-x-auto p-0 custom-scrollbar">
                    {productImages.map((img, i) => (
                      <button
                        key={`${img}-${i}`}
                        type="button"
                        onClick={() => setActiveImage(i)}
                        className={`relative h-[56px] w-[56px] shrink-0 overflow-hidden border-0 border-r border-[#e0ddd6] p-0 transition-opacity duration-200 sm:h-[64px] sm:w-[64px] ${
                          activeImage === i
                            ? "opacity-100 ring-2 ring-inset ring-accent"
                            : "opacity-80 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} view ${i + 1}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: title + stars + form — flush to image edge */}
              <div className="m-0 min-w-0 border-0 bg-card p-5 sm:p-6 lg:py-6 lg:pl-5 lg:pr-6 xl:p-7 xl:pl-6">
                <div>
                  <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
                    F{100 + productIndex} — Custom Packaging
                  </p>
                  <h1 className="font-display text-[28px] font-semibold leading-[1.05] text-[#1a1a1a] sm:text-[32px]">
                    {pageTitle}
                  </h1>
                  <div className="mt-2.5">
                    <ProductRatingSlider />
                  </div>
                  <p className="mt-2.5 text-[12.5px] leading-6 text-[#4a4a4a]">
                    {pageDescription}
                  </p>
                </div>

                <div className="my-3.5 h-px bg-[#e0ddd6]" />

                {showGoogleCart && (
                  <div className="mb-4 space-y-3">
                    <p className="text-[15px] font-semibold text-[#c62828]">
                      Price : {formatUsd(resolveProductUnitPrice())}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        type="button"
                        onClick={() => {
                          const unitPrice = resolveProductUnitPrice();
                          const qty = 1;
                          const image =
                            Array.isArray((product as any)?.images) && (product as any).images[0]
                              ? (product as any).images[0]
                              : null;
                          addToCart({
                            productId: String((product as any)?.id || productSlug),
                            slug: productSlug,
                            name: pageTitle,
                            price: unitPrice,
                            quantity: qty,
                            image,
                          });
                          setStockLeft(consumeDynamicStock(productSlug, qty));
                          pushDataLayerEvent("add_to_cart", {
                            currency: "USD",
                            value: unitPrice * qty,
                            items: [
                              {
                                item_id: productSlug,
                                item_name: pageTitle,
                                price: unitPrice,
                                quantity: qty,
                              },
                            ],
                          });
                          sessionStorage.setItem("hofpack_cart_just_added", "1");
                          router.push("/cart");
                        }}
                        className="h-11 shrink-0 rounded-[8px] bg-[#2563eb] text-[14px] font-semibold text-white hover:bg-[#1d4ed8] min-w-[180px]"
                      >
                        Add to Cart
                      </Button>
                      {stockLeft != null && (
                        <p
                          className="ml-auto inline-flex items-center gap-2 text-[13px] font-semibold text-[#1b7a3d]"
                          aria-live="polite"
                        >
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-60" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
                          </span>
                          In stock — only {stockLeft} left
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit}
                >
                  {/* ── Contact details — all 4 in one row on md+ ── */}
                  <div>
                    <p className="mb-2 text-[9.5px] font-medium uppercase tracking-[0.15em] text-[#aaa6a0]">
                      Contact details
                    </p>
                    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                      <div className="space-y-1">
                        <label className={`flex gap-1 ${labelClassName}`}>
                          First name <span className="text-accent">*</span>
                        </label>
                        <Input
                          placeholder="Jane"
                          value={firstName}
                          onChange={(e) => {
                            const next = e.target.value;
                            setFirstName(next);
                            if (touched.firstName) clearError("firstName");
                            trackUnfilled({ firstName: next, lastName, email, phone });
                          }}
                          onBlur={() => {
                            touch("firstName");
                            flushUnfilled();
                          }}
                          className={`${inputClassName} ${touched.firstName && errors.firstName ? "border-red-400 focus-visible:ring-red-400/20" : ""}`}
                        />
                        {touched.firstName && errors.firstName && <p className="text-[11px] font-medium text-red-500">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className={`flex gap-1 ${labelClassName}`}>
                          Last name <span className="text-accent">*</span>
                        </label>
                        <Input
                          placeholder="Smith"
                          value={lastName}
                          onChange={(e) => {
                            const next = e.target.value;
                            setLastName(next);
                            if (touched.lastName) clearError("lastName");
                            trackUnfilled({ firstName, lastName: next, email, phone });
                          }}
                          onBlur={() => {
                            touch("lastName");
                            flushUnfilled();
                          }}
                          className={`${inputClassName} ${touched.lastName && errors.lastName ? "border-red-400 focus-visible:ring-red-400/20" : ""}`}
                        />
                        {touched.lastName && errors.lastName && <p className="text-[11px] font-medium text-red-500">{errors.lastName}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className={`flex gap-1 ${labelClassName}`}>
                          Phone <span className="text-accent">*</span>
                        </label>
                        <Input
                          type="tel"
                          inputMode="numeric"
                          maxLength={PHONE_NATIONAL_DIGITS}
                          placeholder="5551234567"
                          value={phone}
                          onChange={(e) => {
                            const next = sanitizePhoneInput(e.target.value);
                            setPhone(next);
                            if (touched.phone) clearError("phone");
                            trackUnfilled({ firstName, lastName, email, phone: next });
                          }}
                          onBlur={() => {
                            touch("phone");
                            flushUnfilled();
                          }}
                          className={`${inputClassName} ${touched.phone && errors.phone ? "border-red-400 focus-visible:ring-red-400/20" : ""}`}
                        />
                        <p className="text-[10px] text-[#aaa6a0]">USA {PHONE_NATIONAL_DIGITS}-digit mobile</p>
                        {touched.phone && errors.phone && <p className="text-[11px] font-medium text-red-500">{errors.phone}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className={`flex gap-1 ${labelClassName}`}>
                          Email address <span className="text-accent">*</span>
                        </label>
                        <Input
                          type="email"
                          placeholder="jane@company.com"
                          value={email}
                          onChange={(e) => {
                            const next = e.target.value;
                            setEmail(next);
                            if (touched.email) clearError("email");
                            trackUnfilled({ firstName, lastName, email: next, phone });
                          }}
                          onBlur={() => {
                            touch("email");
                            flushUnfilled();
                          }}
                          className={`${inputClassName} ${touched.email && errors.email ? "border-red-400 focus-visible:ring-red-400/20" : ""}`}
                        />
                        {touched.email && errors.email && <p className="text-[11px] font-medium text-red-500">{errors.email}</p>}
                      </div>
                    </div>
                  </div>

                  {/* ── Box specifications — all 6 in one row on lg+ ── */}
                  <div>
                    <p className="mb-2 text-[9.5px] font-medium uppercase tracking-[0.15em] text-[#aaa6a0]">
                      Box specifications
                    </p>
                    <div className="grid gap-2 grid-cols-2 min-[400px]:grid-cols-3 lg:grid-cols-6">
                      <div className="space-y-1 min-w-0">
                        <label className={`flex gap-1 ${labelClassName}`}>
                          Length (L) <span className="text-accent">*</span>
                        </label>
                        <Input
                          type="number"
                          inputMode="decimal"
                          min={0}
                          step="any"
                          placeholder="e.g. 8"
                          value={length}
                          onChange={setPositiveNumber(setLength, "length")}
                          onKeyDown={blockInvalidNumberKeys}
                          onBlur={() => touch("length")}
                          className={`${inputClassName} ${touched.length && errors.length ? "border-red-400 focus-visible:ring-red-400/20" : ""}`}
                        />
                        {touched.length && errors.length && <p className="text-[11px] font-medium text-red-500">{errors.length}</p>}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <label className={`flex gap-1 ${labelClassName}`}>
                          Width (W) <span className="text-accent">*</span>
                        </label>
                        <Input
                          type="number"
                          inputMode="decimal"
                          min={0}
                          step="any"
                          placeholder="e.g. 5"
                          value={width}
                          onChange={setPositiveNumber(setWidth, "width")}
                          onKeyDown={blockInvalidNumberKeys}
                          onBlur={() => touch("width")}
                          className={`${inputClassName} ${touched.width && errors.width ? "border-red-400 focus-visible:ring-red-400/20" : ""}`}
                        />
                        {touched.width && errors.width && <p className="text-[11px] font-medium text-red-500">{errors.width}</p>}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <label className={`flex gap-1 ${labelClassName}`}>
                          Depth (D) <span className="text-accent">*</span>
                        </label>
                        <Input
                          type="number"
                          inputMode="decimal"
                          min={0}
                          step="any"
                          placeholder="e.g. 3"
                          value={depth}
                          onChange={setPositiveNumber(setDepth, "depth")}
                          onKeyDown={blockInvalidNumberKeys}
                          onBlur={() => touch("depth")}
                          className={`${inputClassName} ${touched.depth && errors.depth ? "border-red-400 focus-visible:ring-red-400/20" : ""}`}
                        />
                        {touched.depth && errors.depth && <p className="text-[11px] font-medium text-red-500">{errors.depth}</p>}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <label className={`flex items-center ${labelClassName}`}>
                          Unit
                        </label>
                        <Select value={unit} onValueChange={setUnit}>
                          <SelectTrigger className={`${selectTriggerClassName} capitalize`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inch">in</SelectItem>
                            <SelectItem value="cm">cm</SelectItem>
                            <SelectItem value="mm">mm</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1 min-w-0">
                        <label className={`flex items-center gap-1 ${labelClassName}`}>
                          Quantity <span className="text-accent">*</span>
                        </label>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="500"
                          value={quantity}
                          onChange={(e) => {
                            setQuantity(e.target.value.replace(/\D/g, ""));
                            if (touched.quantity) clearError("quantity");
                          }}
                          onBlur={() => touch("quantity")}
                          className={`${inputClassName} ${touched.quantity && errors.quantity ? "border-red-400 focus-visible:ring-red-400/20" : ""}`}
                        />
                        {touched.quantity && errors.quantity && <p className="text-[11px] font-medium text-red-500">{errors.quantity}</p>}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <label className={`flex items-center ${labelClassName}`}>
                          Color
                        </label>
                        <Select value={color} onValueChange={setColor}>
                          <SelectTrigger className={selectTriggerClassName}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="white">White</SelectItem>
                            <SelectItem value="black">Black</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                            <SelectItem value="cmyk">Full Color (CMYK)</SelectItem>
                            <SelectItem value="none">No Print</SelectItem>
                            <SelectItem value="consult">Need Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* ── Description ── */}
                  <div className="space-y-1">
                    <p className="text-[9.5px] font-medium uppercase tracking-[0.15em] text-[#aaa6a0]">
                      Description & requirements
                    </p>
                    <Textarea
                      placeholder="Finishes, branding details, deadlines, or any special requirements…"
                      className="min-h-[72px] rounded-[7px] border-[#d8d4cc] bg-[#faf8f5] px-3 py-2 text-[12.5px] leading-6 resize-none focus-visible:ring-accent/20"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <p className="text-[9.5px] font-medium uppercase tracking-[0.15em] text-[#aaa6a0]">
                      Upload artwork{" "}
                      <span className="normal-case tracking-normal text-[#c8c4bc]">(optional)</span>
                    </p>
                    <label
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-[7px] border border-dashed px-3 py-2.5 transition-colors ${
                        errors.artwork
                          ? "border-red-400 bg-red-50"
                          : "border-[#d8d4cc] bg-[#faf8f5] hover:border-[#e8732a]/50"
                      }`}
                    >
                      <span className="truncate text-[12.5px] text-[#7a7672]">
                        {artworkFile
                          ? artworkFile.name
                          : "JPEG, PNG, PDF, or MP4 — up to 50MB"}
                      </span>
                      <span className="shrink-0 text-[11px] font-semibold text-[#e8732a]">
                        {artworkFile ? "Change" : "Browse"}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept={ARTWORK_ACCEPT}
                        onChange={(e) => {
                          const f = e.target.files?.[0] || null;
                          setArtwork(f);
                          e.target.value = "";
                        }}
                      />
                    </label>
                    {artworkFile && (
                      <button
                        type="button"
                        className="text-[11px] font-medium text-[#7a7672] underline hover:text-[#b83c2b]"
                        onClick={() => setArtwork(null)}
                      >
                        Remove file
                      </button>
                    )}
                    {errors.artwork && (
                      <p className="text-[11px] font-medium text-red-500">{errors.artwork}</p>
                    )}
                  </div>

                  <div className="mt-auto flex flex-col gap-3 border-t border-[#e0ddd6] pt-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex w-fit items-center gap-2 rounded-[7px] border border-[#d8d4cc] bg-[#f5f3ee] px-4 py-2.5">
                        <span className="text-[12.5px] font-medium text-[#7a7672]">
                          {captcha.n1} + {captcha.n2} =
                        </span>
                        <Input
                          type="text"
                          className={`h-7 w-10 rounded-none border-0 border-b bg-transparent p-0 text-center text-[12.5px] font-medium focus-visible:ring-0 ${touched.captcha && errors.captcha ? "border-red-400" : "border-[#c8c4bc]"}`}
                          value={captchaInput}
                          onChange={(e) => { setCaptchaInput(e.target.value); if (touched.captcha) clearError("captcha"); }}
                          onBlur={() => touch("captcha")}
                        />
                      </div>
                      {touched.captcha && errors.captcha && <p className="text-[11px] font-medium text-red-500">{errors.captcha}</p>}
                    </div>

                    <Button
                      type="submit"
                      variant="cta"
                      className="h-12 sm:h-11 w-full md:w-auto rounded-[7px] px-8 text-[11.5px] font-medium uppercase tracking-[0.12em] shadow-none md:min-w-[240px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send size={14} className="mr-1" />
                      )}
                      Request a Quote
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {productDetailSection}

        {/* FAQs Section */}
        {dbFaqs.length > 0 && (
          <section className="section-padding bg-background border-t border-border">
            <div className="container-max max-w-3xl">
              <div className="text-center mb-10">
               
                 <h2 className="font-sans uppercase text-center text-[#1a1a1a]"
          style={{ fontSize: 22, fontWeight: 500, letterSpacing: "0.12em", marginBottom: 40 }}>
         Common{" "}
          <span className="text-[#e8732a]">Questions</span>
        </h2>
              </div>
              <FaqAccordion faqs={dbFaqs} />
            </div>
          </section>
        )}

        <RelatedProductsCarouselSection
          title="Related products"
          products={relatedProducts}
          getProductImage={(_, index) =>
            category ? getProductImage(category.slug, (productIndex + index + 1) % 3) : undefined
          }
        />

        <CTASection />
      </div>

      {/* Fullscreen Image Overlay */}
      {isExpanded && productImages[activeImage] && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-3 rounded-full transition-all hover:bg-white/20"
          >
            <X size={24} />
          </button>
          <div className="relative w-full max-w-5xl aspect-square sm:aspect-video bg-transparent flex items-center justify-center">
            <Image
              src={productImages[activeImage]}
              alt={product.name}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default TestProductPage;