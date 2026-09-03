"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { sanitizeHtml } from "@/lib/sanitize-html";
import Layout from "@/components/Layout";
import {
  ArrowRight,
  Send,
  CheckCircle,
  Leaf,
  ShieldCheck,
  Printer,
  Clock3,
  Star,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Loader2,
  Package2,
  Maximize,
  Sparkles,
  CheckCircle2,
  Check,
  Feather,
  Palette,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "@/components/PageLoader";
import NotFound from "./NotFound";
import { trackLeadSubmitted, pushDataLayerEvent } from "@/lib/analytics";
import { buildInquiryAttribution } from "@/lib/attribution";
import { useAbandonedFormCapture } from "@/hooks/useAbandonedFormCapture";
import { getProductDetailDefaults, ProductDetailData } from "@/data/product-defaults";
import { getProductBySlug, getProductTag, getAllProducts, isRemovedProductSlug } from "@/data/products";
import { fetchAllProducts } from "@/lib/product-service";
import { fetchProductFaqs } from "@/lib/faq-service";
import { FULL_PRODUCTS_DATABASE } from "@/data/product-detail-defaults";
import FeatureItemsRow from "@/components/FeatureItemsRow";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { uploadInquiryAttachment } from "@/lib/inquiry-attachment";
import SmsConsentLabel, { useSmsConsent } from "@/components/SmsConsentLabel";
import {
  addToCart,
  consumeDynamicStock,
  formatUsd,
  getDynamicStock,
  resolveProductUnitPrice,
  shouldShowAddToCart,
} from "@/lib/google-shopping";

interface ProductPageProps {
  productSlug?: string;
  /** From the server request URL so Vercel SSR matches Google Ads landings. */
  initialShowGoogleCart?: boolean;
}

const LOCKED_LOCAL_PRODUCT_SLUGS = new Set([
  "paperboard-lip-balm-tubes",
  "window-gable-boxes",
  "custom-kraft-gable-boxes",
  "smell-proof-mylar-bags",
  "christmas-candle-boxes",
  "bath-bomb-boxes",
]);

export default function ProductPage({
  productSlug: propSlug,
  initialShowGoogleCart = false,
}: ProductPageProps) {
  const params = useParams();
  const router = useRouter();
  const rawSlug = propSlug || (params?.productSlug as string) || "kraft-paper-tubes";
  const { toast } = useToast();
  const { open: openQuoteModal } = useQuoteModal();

  const [activeImage, setActiveImage] = useState<number>(0);
  const [activePlatform, setActivePlatform] = useState<"google" | "trustpilot">("google");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentRelatedPage, setCurrentRelatedPage] = useState<number>(0);
  const [randomRelatedProducts, setRandomRelatedProducts] = useState<{ name: string; slug: string; image: string }[]>([]);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [unit, setUnit] = useState("in");
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("");
  const [requirements, setRequirements] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [mathProblem, setMathProblem] = useState({ a: 4, b: 4 });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileAttached, setFileAttached] = useState<File | null>(null);
  const [smsConsent, setSmsConsent] = useSmsConsent();
  const [showGoogleCart, setShowGoogleCart] = useState(!!initialShowGoogleCart);
  const [stockLeft, setStockLeft] = useState<number | null>(null);

  useEffect(() => {
    setMathProblem({
      a: Math.floor(Math.random() * 8) + 2,
      b: Math.floor(Math.random() * 8) + 1,
    });

    // Populate randomized related products across horizontal scroll tabs
    const allDbProducts = Object.values(FULL_PRODUCTS_DATABASE).map((p) => ({
      name: p.name,
      slug: p.slug,
      image: p.images?.[0] || "/images/products/kraft-paper-tubes.jpg",
    }));

    const staticProds = getAllProducts().map((p) => ({
      name: p.name,
      slug: p.slug,
      image: (p as any).image || "/images/products/kraft-paper-tubes.jpg",
    }));

    const seen = new Set<string>();
    const pool: { name: string; slug: string; image: string }[] = [];

    for (const item of [...allDbProducts, ...staticProds]) {
      if (item.slug !== rawSlug && !isRemovedProductSlug(item.slug) && !seen.has(item.slug)) {
        seen.add(item.slug);
        pool.push(item);
      }
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setRandomRelatedProducts(shuffled.slice(0, 12));
  }, [rawSlug]);

  useEffect(() => {
    const fromUrl = shouldShowAddToCart();
    // Keep showing for this landing if the server already saw Google params,
    // even if analytics later strips UTM from the address bar.
    setShowGoogleCart(Boolean(initialShowGoogleCart) || fromUrl);
  }, [rawSlug, initialShowGoogleCart]);

  useEffect(() => {
    if (!showGoogleCart || !rawSlug) {
      setStockLeft(null);
      return;
    }
    setStockLeft(getDynamicStock(rawSlug));
    const id = window.setInterval(() => {
      setStockLeft(getDynamicStock(rawSlug));
    }, 15_000);
    return () => window.clearInterval(id);
  }, [showGoogleCart, rawSlug]);

  const { track: trackUnfilled, flushNow: flushUnfilled } = useAbandonedFormCapture({
    formName: "product-detail-quote-form",
    enabled: !submitted && !isSubmitting,
    productInterest: rawSlug,
  });

  const { data: productData, isLoading: loading } = useQuery<ProductDetailData>({
    queryKey: ["product-detail", rawSlug],
    enabled: !isRemovedProductSlug(rawSlug),
    queryFn: async () => {
      try {
        const [allItems, liveFaqs] = await Promise.all([
          fetchAllProducts(),
          fetchProductFaqs(rawSlug),
        ]);
        const customItem = allItems.find((p) => p.slug === rawSlug);

        if (customItem) {
          const lockedLocal = LOCKED_LOCAL_PRODUCT_SLUGS.has(rawSlug);
          const customImg =
            customItem.image ||
            (customItem.images && customItem.images[0]) ||
            "/images/products/custom-cake-boxes.jpg";

          const defaults = getProductDetailDefaults(
            rawSlug,
            customItem.name,
            customItem.category,
            FULL_PRODUCTS_DATABASE[rawSlug]?.category?.slug ||
              (customItem.category || "custom-boxes").toLowerCase().replace(/\s+/g, "-"),
            customImg
          );

          const mappedFaqs = liveFaqs.map((f) => ({
            id: f.id,
            question: f.question,
            answer: f.answer,
            display_order: f.order ?? 0,
          }));

          const cmsImages = (Array.isArray(customItem.images) ? customItem.images : [])
            .filter((img): img is string => typeof img === "string" && img.trim().length > 0)
            .filter((img) => !img.includes("custom-cake-boxes.jpg"));
          const cmsContent = (customItem as any).product_content;
          const cmsHasRichContent =
            cmsContent &&
            typeof cmsContent === "object" &&
            ((Array.isArray(cmsContent.content_blocks) && cmsContent.content_blocks.length > 0) ||
              (Array.isArray(cmsContent.article_sections) && cmsContent.article_sections.length > 0) ||
              (Array.isArray(cmsContent.feature_items) && cmsContent.feature_items.length > 0));

          return {
            ...defaults,
            id: customItem.id || `prod-${rawSlug}`,
            name: customItem.name || defaults.name,
            description:
              (lockedLocal ? defaults.description : customItem.description) ||
              customItem.description ||
              defaults.description,
            images:
              lockedLocal && defaults.images?.length
                ? defaults.images
                : cmsImages.length > 0
                  ? cmsImages
                  : defaults.images?.length
                    ? defaults.images
                    : [customImg],
            category: lockedLocal && defaults.category?.slug
              ? defaults.category
              : {
                  name: customItem.category || "Custom Boxes",
                  slug: (customItem.category || "custom-boxes")
                    .toLowerCase()
                    .replace(/\s+/g, "-"),
                },
            stock_info: lockedLocal
              ? defaults.stock_info
              : (customItem.specs as any)?.stockInfo || defaults.stock_info,
            printing_options: lockedLocal
              ? defaults.printing_options
              : (customItem.specs as any)?.printingOptions || defaults.printing_options,
            finishing_options: lockedLocal
              ? defaults.finishing_options
              : (customItem.specs as any)?.finishingOptions || defaults.finishing_options,
            product_content:
              lockedLocal || !cmsHasRichContent
                ? defaults.product_content
                : cmsContent,
            faqs: mappedFaqs.length > 0 ? mappedFaqs : defaults.faqs,
          };
        }

        if (liveFaqs.length > 0) {
          const defaults = getProductDetailDefaults(rawSlug);
          return {
            ...defaults,
            faqs: liveFaqs.map((f) => ({
              id: f.id,
              question: f.question,
              answer: f.answer,
              display_order: f.order ?? 0,
            })),
          };
        }
      } catch {
        // Fallback gracefully
      }

      return getProductDetailDefaults(rawSlug);
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const product: any = productData || getProductDetailDefaults(rawSlug);
  const images = product.images;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim() || !quantity.trim()) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill out all required contact and specification details.",
        variant: "destructive",
      });
      return;
    }

    if (!smsConsent) {
      toast({
        title: "Consent Required",
        description: "Please agree to the privacy notice to continue.",
        variant: "destructive",
      });
      return;
    }

    if (captchaInput.trim() !== String(mathProblem.a + mathProblem.b)) {
      toast({
        title: "Security Check",
        description: `Please solve ${mathProblem.a} + ${mathProblem.b} to verify you are human.`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let attachment: { url: string; name: string; type: string } | null = null;
      if (fileAttached) {
        try {
          attachment = await uploadInquiryAttachment(fileAttached);
        } catch (uploadErr) {
          console.warn("Artwork upload error:", uploadErr);
        }
      }

      const supabase = createPublicClient();
      const messageContent = `Product: ${product.name}
Dimensions: ${length || "-"} x ${width || "-"} x ${depth || "-"} ${unit}
Quantity: ${quantity}
Color: ${color || "Default"}
File: ${attachment ? attachment.name : fileAttached ? fileAttached.name : "None"}
${attachment ? `File URL: ${attachment.url}` : ""}

Requirements / Notes:
${requirements || "No additional notes"}`;

      const attribution = buildInquiryAttribution("product_page_quote_form");

      await withAbortableTimeout((signal) =>
      (supabase
        .from("chat_inquiries" as any)
        .insert({
          name: `${firstName} ${lastName}`.trim(),
          email: email.trim(),
          phone: phone.trim(),
          product_interest: product.name,
          message: messageContent,
          source: "product_detail",
          status: "new",
          attachment_url: attachment?.url ?? null,
          attachment_name: attachment?.name ?? null,
          attachment_type: attachment?.type ?? null,
          ...attribution,
        } as any)
        .abortSignal(signal) as any)
      );

      setSubmitted(true);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setLength("");
      setWidth("");
      setDepth("");
      setUnit("in");
      setQuantity("");
      setColor("");
      setRequirements("");
      setCaptchaInput("");
      setFileAttached(null);
      toast({
        title: "Quote Request Sent!",
        description: "Thank you! Our packaging specialists will contact you with a free dieline and estimate within 24 hours.",
      });
      trackLeadSubmitted("product_page_quote_form", attribution);
      const targetPath = product.category?.slug ? `/thank-you/${product.category.slug}` : "/thank-you";
      router.push(targetPath);
    } catch (err: any) {
      // In case Supabase table is unreachable, still provide success UX to customer
      setSubmitted(true);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setLength("");
      setWidth("");
      setDepth("");
      setUnit("in");
      setQuantity("");
      setColor("");
      setRequirements("");
      setCaptchaInput("");
      setFileAttached(null);
      toast({
        title: "Quote Request Received!",
        description: "We've registered your custom quote inquiry and will respond within 24 hours.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setLength("");
    setWidth("");
    setDepth("");
    setUnit("in");
    setQuantity("");
    setColor("");
    setRequirements("");
    setCaptchaInput("");
    setFileAttached(null);
    setSubmitted(false);
  };

  const scrollRelatedProducts = (pageIndex: number) => {
    setCurrentRelatedPage(pageIndex);
    const container = document.getElementById("related-products-slider");
    if (container) {
      const scrollWidth = container.clientWidth;
      container.scrollTo({ left: pageIndex * scrollWidth, behavior: "smooth" });
    }
  };

  const renderArticleSection = (s: any, i: number) => {
    if (s.level === "divider") return <div key={i} className="h-px bg-[#e0ddd6] my-2" />;

    const md = s.text ?? "";
    const converted = md
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.+?)_/g, "<em>$1</em>")
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>\n?)+/g, (m: string) => `<ul class="list-disc pl-5 space-y-1">${m}</ul>`)
      .replace(/^---$/gm, "<hr />");

    const html = sanitizeHtml(converted, { ADD_ATTR: ["target", "rel", "class"] });

    if (s.level === "h1") return <h1 key={i} className="font-display text-ds-heading font-semibold text-ds-ink" dangerouslySetInnerHTML={{ __html: html }} />;
    if (s.level === "h2") return <h2 key={i} className="font-display text-ds-heading font-semibold text-ds-ink" dangerouslySetInnerHTML={{ __html: html }} />;
    if (s.level === "h3") return <h3 key={i} className="font-display text-ds-subhead font-semibold text-ds-ink" dangerouslySetInnerHTML={{ __html: html }} />;
    if (s.level === "h4") return <h4 key={i} className="font-sans text-ds-card font-semibold text-ds-ink" dangerouslySetInnerHTML={{ __html: html }} />;
    if (s.level === "h5") return <h5 key={i} className="font-sans text-ds-body font-semibold text-ds-body" dangerouslySetInnerHTML={{ __html: html }} />;
    if (s.level === "h6") return <h6 key={i} className="font-sans text-ds-eyebrow font-medium uppercase tracking-ds-eyebrow text-ds-muted" dangerouslySetInnerHTML={{ __html: html }} />;
    return <div key={i} className="font-sans text-ds-body text-ds-body" dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const reviewsCol1 = [
    {
      title: "Made the vision I had for some custom…",
      text: "“Made the vision I had for some custom packaging come to life! Fantastic help from beginning to end.”",
      author: "Jarrett C",
      time: "US · 13 hours ago",
      initials: "JC",
      bg: "bg-[#2d5c3e]",
    },
    {
      title: "Exceptional quality control",
      text: "“Exceptional quality control. Great finished product! Matt kept me in the loop every step of the way. A+”",
      author: "Andrew Reynolds",
      time: "US · Jul 9, 2026",
      initials: "AR",
      bg: "bg-[#e8732a]",
    },
    {
      title: "The quality of the soap boxes turned…",
      text: "“The quality of the soap boxes turned out to be amazing. Excellent customer service & fast turnaround time.”",
      author: "Mary niles",
      time: "US · Apr 8, 2026",
      initials: "MN",
      bg: "bg-[#1e3d2b]",
    },
  ];

  const reviewsCol2 = [
    {
      title: "Great customer service",
      text: "“Chris was very patient and answered all my questions and the replies and followup was excellent.”",
      author: "Poornimarao Nageswararao",
      time: "US · 6 days ago",
      initials: "PN",
      bg: "bg-[#2d5c3e]",
    },
    {
      title: "A Job Well Done",
      text: "“The boxes I order are Excellent Quality, arrived on time, and I had amazing service. I am thankful for Matt for his patience and his ability to complete exactly what I asked.”",
      author: "Martina Gonzalez",
      time: "US · Jul 1, 2026",
      initials: "MG",
      bg: "bg-[#e8732a]",
    },
  ];

  if (isRemovedProductSlug(rawSlug)) {
    return <NotFound />;
  }

  return (
    <Layout>
      <div className="bg-background min-h-screen font-sans text-foreground">
        {/* Breadcrumb Bar */}
        <div className="border-b border-[#e0ddd6] bg-[#faf8f5] py-3">
          <div className="container-max px-4 lg:px-8">
            <nav className="flex items-center flex-wrap gap-2 text-[10px] font-medium uppercase tracking-[0.1em] text-[#9a9690]">
              <Link className="hover:text-accent transition-colors" href="/">
                Home
              </Link>
              <ChevronRight size={10} className="opacity-50" />
              <Link className="hover:text-accent transition-colors" href={`/${product.category.slug}`}>
                {product.category.name}
              </Link>
              <ChevronRight size={10} className="opacity-50" />
              <span className="font-medium text-[#1a1a1a]">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Product + Quick Quote Section */}
        <section className="bg-[#faf8f5] pb-6 pt-3 sm:pb-8 lg:pt-5" id="quote-form">
          <div className="w-full px-3 sm:px-4 lg:px-6">
            <div className="grid grid-cols-1 items-stretch gap-0 overflow-hidden rounded-[14px] border border-[#e0ddd6] bg-card shadow-[0_8px_28px_rgba(0,0,0,0.04)] lg:grid-cols-2">

              {/* Left: Product Images Gallery */}
              <div className="m-0 min-w-0 p-0 flex flex-col">
                <div className="relative m-0 aspect-square w-full cursor-pointer overflow-hidden p-0 bg-muted/20">
                  <Image
                    src={images[activeImage] || images[0]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>

                {/* Thumbnails Row */}
                {images.length > 1 && (
                  <div className="m-0 flex gap-0 overflow-x-auto p-0 custom-scrollbar border-t border-[#e0ddd6]">
                    {images.map((imgUrl: string, idx: number) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImage(idx)}
                        className={`relative h-[56px] w-[56px] shrink-0 overflow-hidden border-0 border-r border-[#e0ddd6] p-0 transition-opacity duration-200 sm:h-[64px] sm:w-[64px] ${activeImage === idx
                            ? "opacity-100 ring-2 ring-inset ring-accent"
                            : "opacity-80 hover:opacity-100"
                          }`}
                      >
                        <Image
                          src={imgUrl}
                          alt={`${product.name} view ${idx + 1}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Product Details & Fast Quote Form */}
              <div className="m-0 min-w-0 border-0 bg-card p-5 sm:p-6 lg:py-6 lg:pl-5 lg:pr-6 xl:p-7 xl:pl-6">
                <div>
                  <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
                    {getProductTag(rawSlug || product.slug, product.category?.slug)}
                  </p>
                  <h1 className="font-display text-[26px] sm:text-[30px] lg:text-[32px] font-semibold leading-[1.1] text-[#1a1a1a] [text-wrap:balance]">
                    {product.name}
                  </h1>

                  {/* Rating platform selector */}
                  <div className="mt-2.5">
                    <div className="flex flex-col gap-2">
                      <a
                        href="https://share.google/cDClqBdrbxg8EOnS2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex w-fit max-w-full items-center gap-2.5 no-underline transition-opacity hover:opacity-85"
                        aria-label="Google rating 5.0 out of 5 — view reviews"
                      >
                        <div className="flex shrink-0 items-center gap-0.5" aria-hidden="true">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <svg key={i} viewBox="0 0 24 24" className="h-5 w-5 shrink-0 sm:h-[22px] sm:w-[22px]">
                              <defs>
                                <linearGradient id={`star-grad-${i}`} x1="0" x2="1" y1="0" y2="0">
                                  <stop offset="100%" stopColor="#fbbc04" />
                                  <stop offset="100%" stopColor="#dadce0" />
                                </linearGradient>
                              </defs>
                              <path fill={`url(#star-grad-${i})`} d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span className="font-sans text-[14px] font-semibold leading-none text-[#1a1a1a] group-hover:text-accent sm:text-[15px]">
                          {activePlatform === "google" ? "Google" : "Trustpilot"}
                        </span>
                        <span className="font-sans text-[16px] font-semibold leading-none text-[#1a1a1a] sm:text-[17px]">
                          5.0
                        </span>
                      </a>
                      <div className="flex items-center gap-1.5" role="tablist" aria-label="Review platforms">
                        <button
                          type="button"
                          role="tab"
                          aria-selected={activePlatform === "trustpilot"}
                          onClick={() => setActivePlatform("trustpilot")}
                          aria-label="Show Trustpilot rating"
                          className={`h-1.5 rounded-full transition-all ${activePlatform === "trustpilot" ? "w-5 bg-accent" : "w-1.5 bg-[#d8d4cc] hover:bg-[#b8b4ac]"
                            }`}
                        />
                        <button
                          type="button"
                          role="tab"
                          aria-selected={activePlatform === "google"}
                          onClick={() => setActivePlatform("google")}
                          aria-label="Show Google rating"
                          className={`h-1.5 rounded-full transition-all ${activePlatform === "google" ? "w-5 bg-accent" : "w-1.5 bg-[#d8d4cc] hover:bg-[#b8b4ac]"
                            }`}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="mt-2.5 text-[12.5px] leading-6 text-[#4a4a4a]">
                    {product.description}
                  </p>
                </div>

                <div className="my-3.5 h-px bg-[#e0ddd6]" />

                {showGoogleCart && (
                  <div className="mb-4 space-y-3">
                    <p className="text-[15px] font-semibold text-[#c62828]">
                      Price : {formatUsd(resolveProductUnitPrice())}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const unitPrice = resolveProductUnitPrice();
                          const qty = 1;
                          const image =
                            Array.isArray(product?.images) && product.images[0]
                              ? product.images[0]
                              : null;
                          addToCart({
                            productId: String(product?.id || rawSlug),
                            slug: rawSlug,
                            name: product?.name || rawSlug,
                            price: unitPrice,
                            quantity: qty,
                            image,
                          });
                          setStockLeft(consumeDynamicStock(rawSlug, qty));
                          pushDataLayerEvent("add_to_cart", {
                            currency: "USD",
                            value: unitPrice * qty,
                            items: [
                              {
                                item_id: rawSlug,
                                item_name: product?.name || rawSlug,
                                price: unitPrice,
                                quantity: qty,
                              },
                            ],
                          });
                          sessionStorage.setItem("hofpack_cart_just_added", "1");
                          router.push("/cart");
                        }}
                        className="h-11 min-w-[180px] shrink-0 rounded-[8px] bg-[#2563eb] px-5 text-[14px] font-semibold text-white hover:bg-[#1d4ed8]"
                      >
                        Add to Cart
                      </button>
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

                {/* Instant Quote Form */}
                {submitted ? (
                  <div className="rounded-[10px] border border-[#dce8df] bg-[#E8F4EA] p-6 text-center animate-in fade-in duration-300">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#2d5c3e] text-white">
                      <Check size={24} />
                    </div>
                    <h3 className="font-display text-[20px] font-semibold text-[#1a1a1a]">Quote Request Received!</h3>
                    <p className="mt-2 text-[13px] text-[#4a4a4a]">
                      Thank you, <strong className="text-[#1a1a1a]">{firstName}</strong>. Our packaging team will prepare your custom estimate and digital proof within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="mt-5 inline-flex items-center justify-center rounded-[7px] bg-accent px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white hover:bg-[#c45a18]"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                    {/* Contact details */}
                    <div>
                      <p className="mb-2 text-[9.5px] font-medium uppercase tracking-[0.15em] text-[#aaa6a0]">
                        CONTACT DETAILS
                      </p>
                      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                        <div className="space-y-1">
                          <label className="flex items-center gap-1 min-h-[16px] text-[9.5px] font-medium uppercase tracking-[0.09em] leading-[1.2] text-[#7a7672]">
                            FIRST NAME <span className="text-accent">*</span>
                          </label>
                          <input
                            required
                            placeholder="Jane"
                            value={firstName}
                            onChange={(e) => {
                              setFirstName(e.target.value);
                              trackUnfilled({ name: `${e.target.value} ${lastName}`, email, phone });
                            }}
                            className="flex w-full py-2 font-sans font-normal text-[#1a1a1a] border placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-offset-0 h-9 rounded-[7px] border-[#d8d4cc] bg-[#faf8f5] px-3 text-[12.5px] focus-visible:ring-accent/20"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="flex items-center gap-1 min-h-[16px] text-[9.5px] font-medium uppercase tracking-[0.09em] leading-[1.2] text-[#7a7672]">
                            LAST NAME <span className="text-accent">*</span>
                          </label>
                          <input
                            required
                            placeholder="Smith"
                            value={lastName}
                            onChange={(e) => {
                              setLastName(e.target.value);
                              trackUnfilled({ name: `${firstName} ${e.target.value}`, email, phone });
                            }}
                            className="flex w-full py-2 font-sans font-normal text-[#1a1a1a] border placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-offset-0 h-9 rounded-[7px] border-[#d8d4cc] bg-[#faf8f5] px-3 text-[12.5px] focus-visible:ring-accent/20"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="flex items-center gap-1 min-h-[16px] text-[9.5px] font-medium uppercase tracking-[0.09em] leading-[1.2] text-[#7a7672]">
                            PHONE <span className="text-accent">*</span>
                          </label>
                          <input
                            required
                            type="tel"
                            inputMode="numeric"
                            maxLength={14}
                            placeholder="5551234567"
                            value={phone}
                            onChange={(e) => {
                              const cleaned = e.target.value.replace(/[^0-9+()-\s]/g, "");
                              setPhone(cleaned);
                              trackUnfilled({ name: `${firstName} ${lastName}`, email, phone: cleaned });
                            }}
                            className="flex w-full py-2 font-sans font-normal text-[#1a1a1a] border placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-offset-0 h-9 rounded-[7px] border-[#d8d4cc] bg-[#faf8f5] px-3 text-[12.5px] focus-visible:ring-accent/20"
                          />
                          <p className="text-[10px] text-[#aaa6a0]">USA 10-digit mobile</p>
                        </div>
                        <div className="space-y-1">
                          <label className="flex items-center gap-1 min-h-[16px] text-[9.5px] font-medium uppercase tracking-[0.09em] leading-[1.2] text-[#7a7672]">
                            EMAIL ADDRESS <span className="text-accent">*</span>
                          </label>
                          <input
                            required
                            type="email"
                            placeholder="jane@company.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              trackUnfilled({ name: `${firstName} ${lastName}`, email: e.target.value, phone });
                            }}
                            className="flex w-full py-2 font-sans font-normal text-[#1a1a1a] border placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-offset-0 h-9 rounded-[7px] border-[#d8d4cc] bg-[#faf8f5] px-3 text-[12.5px] focus-visible:ring-accent/20"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Box specifications */}
                    <div>
                      <p className="mb-2 text-[9.5px] font-medium uppercase tracking-[0.15em] text-[#aaa6a0]">
                        BOX SPECIFICATIONS
                      </p>
                      <div className="grid gap-2 grid-cols-2 min-[400px]:grid-cols-3 lg:grid-cols-6">
                        <div className="space-y-1 min-w-0">
                          <label className="flex items-center gap-1 min-h-[16px] text-[9.5px] font-medium uppercase tracking-[0.09em] leading-[1.2] text-[#7a7672]">
                            LENGTH (L) <span className="text-accent">*</span>
                          </label>
                          <input
                            type="number"
                            step="any"
                            min="0"
                            placeholder="e.g. 8"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            className="flex w-full py-2 font-sans font-normal text-[#1a1a1a] border placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-offset-0 h-9 rounded-[7px] border-[#d8d4cc] bg-[#faf8f5] px-3 text-[12.5px] focus-visible:ring-accent/20"
                          />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <label className="flex items-center gap-1 min-h-[16px] text-[9.5px] font-medium uppercase tracking-[0.09em] leading-[1.2] text-[#7a7672]">
                            WIDTH (W) <span className="text-accent">*</span>
                          </label>
                          <input
                            type="number"
                            step="any"
                            min="0"
                            placeholder="e.g. 5"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            className="flex w-full py-2 font-sans font-normal text-[#1a1a1a] border placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-offset-0 h-9 rounded-[7px] border-[#d8d4cc] bg-[#faf8f5] px-3 text-[12.5px] focus-visible:ring-accent/20"
                          />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <label className="flex items-center gap-1 min-h-[16px] text-[9.5px] font-medium uppercase tracking-[0.09em] leading-[1.2] text-[#7a7672]">
                            DEPTH (D) <span className="text-accent">*</span>
                          </label>
                          <input
                            type="number"
                            step="any"
                            min="0"
                            placeholder="e.g. 3"
                            value={depth}
                            onChange={(e) => setDepth(e.target.value)}
                            className="flex w-full py-2 font-sans font-normal text-[#1a1a1a] border placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-offset-0 h-9 rounded-[7px] border-[#d8d4cc] bg-[#faf8f5] px-3 text-[12.5px] focus-visible:ring-accent/20"
                          />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <label className="flex items-center min-h-[16px] text-[9.5px] font-medium uppercase tracking-[0.09em] leading-[1.2] text-[#7a7672]">
                            UNIT
                          </label>
                          <div className="relative">
                            <select
                              value={unit}
                              onChange={(e) => setUnit(e.target.value)}
                              className="flex w-full h-9 appearance-none items-center justify-between rounded-[7px] border border-[#d8d4cc] bg-[#faf8f5] px-3 pr-8 text-[12.5px] text-[#1a1a1a] focus:border-[#e8732a] focus:outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer"
                            >
                              <option value="in">In</option>
                              <option value="cm">cm</option>
                              <option value="mm">mm</option>
                            </select>
                            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7a7672] opacity-70" />
                          </div>
                        </div>
                        <div className="space-y-1 min-w-0">
                          <label className="flex items-center gap-1 min-h-[16px] text-[9.5px] font-medium uppercase tracking-[0.09em] leading-[1.2] text-[#7a7672]">
                            QUANTITY <span className="text-accent">*</span>
                          </label>
                          <input
                            required
                            placeholder="e.g. 500"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value.replace(/\D/g, ""))}
                            className="flex w-full py-2 font-sans font-normal text-[#1a1a1a] border placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-offset-0 h-9 rounded-[7px] border-[#d8d4cc] bg-[#faf8f5] px-3 text-[12.5px] focus-visible:ring-accent/20"
                          />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <label className="flex items-center min-h-[16px] text-[9.5px] font-medium uppercase tracking-[0.09em] leading-[1.2] text-[#7a7672]">
                            COLOR
                          </label>
                          <div className="relative">
                            <select
                              value={color}
                              onChange={(e) => setColor(e.target.value)}
                              className="flex w-full h-9 appearance-none items-center justify-between rounded-[7px] border border-[#d8d4cc] bg-[#faf8f5] px-3 pr-8 text-[12.5px] text-[#1a1a1a] focus:border-[#e8732a] focus:outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer"
                            >
                              <option value="">Select</option>
                              <option value="white">White</option>
                              <option value="black">Black</option>
                              <option value="custom">Custom</option>
                              <option value="cmyk">Full Color (CMYK)</option>
                              <option value="none">No Print</option>
                              <option value="consult">Need Consultation</option>
                            </select>
                            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7a7672] opacity-70" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description & requirements */}
                    <div className="space-y-1">
                      <p className="text-[9.5px] font-medium uppercase tracking-[0.15em] text-[#aaa6a0]">
                        DESCRIPTION &amp; REQUIREMENTS
                      </p>
                      <textarea
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder="Finishes, branding details, deadlines, or any special requirements…"
                        className="flex w-full font-sans font-normal text-[#1a1a1a] border placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-offset-0 min-h-[72px] rounded-[7px] border-[#d8d4cc] bg-[#faf8f5] px-3 py-2 text-[12.5px] leading-6 resize-none focus-visible:ring-accent/20"
                      />
                    </div>

                    {/* Upload artwork */}
                    <div className="space-y-1">
                      <p className="text-[9.5px] font-medium uppercase tracking-[0.15em] text-[#aaa6a0]">
                        UPLOAD ARTWORK <span className="normal-case tracking-normal text-[#c8c4bc]">(optional)</span>
                      </p>
                      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-[7px] border border-dashed px-3 py-2.5 transition-colors border-[#d8d4cc] bg-[#faf8f5] hover:border-[#e8732a]/50">
                        <span className="truncate text-[12.5px] text-[#7a7672]">
                          {fileAttached ? fileAttached.name : "JPEG, PNG, PDF, or MP4 — up to 50MB"}
                        </span>
                        <span className="shrink-0 text-[11px] font-semibold text-[#e8732a]">Browse</span>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf,.mp4"
                          onChange={(e) => setFileAttached(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <label className="flex cursor-pointer items-start gap-2.5 rounded-[8px] p-1">
                      <input
                        type="checkbox"
                        checked={smsConsent}
                        onChange={(e) => setSmsConsent(e.target.checked)}
                        className="mt-[2px] h-4 w-4 shrink-0 rounded border accent-[#e8732a]"
                      />
                      <span className="text-[12px] leading-[1.55] text-[#4a4a4a]">
                        <SmsConsentLabel />
                      </span>
                    </label>

                    {/* Captcha + Submit Button */}
                    <div className="mt-auto flex flex-col gap-3 border-t border-[#e0ddd6] pt-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="flex w-fit items-center gap-2 rounded-[7px] border border-[#d8d4cc] bg-[#f5f3ee] px-4 py-2.5">
                          <span className="text-[12.5px] font-medium text-[#7a7672]">
                            {mathProblem.a} + {mathProblem.b} =
                          </span>
                          <input
                            type="text"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            className="flex font-sans text-[#1a1a1a] placeholder:text-[#aaa6a0] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-[#e8732a]/25 focus-visible:ring-offset-0 file:border-0 file:bg-transparent file:text-[13px] file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50 h-7 w-10 rounded-none border-0 border-b bg-transparent p-0 text-center text-[12.5px] font-medium focus-visible:ring-0 border-[#c8c4bc]"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-accent text-accent-foreground font-sans hover:shadow-lg hover:bg-[#c45a18] transition-all duration-300 py-2 h-12 sm:h-11 w-full md:w-auto rounded-[7px] px-8 text-[11.5px] font-medium uppercase tracking-[0.12em] shadow-none md:min-w-[240px] text-white"
                      >
                        {isSubmitting ? (
                          <Loader2 size={14} className="animate-spin mr-1" />
                        ) : (
                          <Send size={14} className="mr-1" />
                        )}
                        Request a Quote
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Product Specification Table */}
        {(() => {
          const specOverrides = product.product_content?.spec_overrides;

          const specBoxStyle = product.box_style || product.name;
          const specDimension = specOverrides?.dimension_info || product.size_info || "Fully Customizable (All dimensions available)";
          const specQuantities = specOverrides?.quantities_info || product.min_quantity || "Starting from 100 Units";
          const specStock = product.stock_info || "10pt to 28pt Kraft, Corrugated, Rigid, Cardstock";

          const specPrintingList = specOverrides?.printing_options_list && specOverrides.printing_options_list.length > 0
            ? specOverrides.printing_options_list
            : (product.printing_options ? product.printing_options.split(/[,/]+/).map((s: string) => s.trim()).filter(Boolean) : ["CMYK", "PMS", "No Printing", "Offset High Fidelity"]);

          const specFinishingList = specOverrides?.finishing_options_list && specOverrides.finishing_options_list.length > 0
            ? specOverrides.finishing_options_list
            : (product.finishing_options ? product.finishing_options.split(/[,/]+/).map((s: string) => s.trim()).filter(Boolean) : ["Gloss", "Matte", "Aqua Coating", "Foil Stamping", "Spot UV"]);

          const specIncludedList = specOverrides?.included_options && specOverrides.included_options.length > 0
            ? specOverrides.included_options
            : ["Die Cutting", "Gluing", "Scored", "Perforation"];

          const specAdditionalList = specOverrides?.additional_options && specOverrides.additional_options.length > 0
            ? specOverrides.additional_options
            : ["Eco-Friendly", "Recycled Boxes", "Biodegradable"];

          const specProof = product.proof_info || "2D Flat View, 3D Digital Mockup";
          const specTurnaround = specOverrides?.turnaround_label || product.turnaround_time || "8 to 12 Business Days";
          const specRushAvailable = specOverrides?.rush_available !== false;
          const specShipping = product.shipping_info || "FREE Shipping Worldwide";
          const showShippingPolicy = specOverrides?.show_shipping_policy === true || (product.product_content as any)?.specifications?.showShippingPolicy === true;

          return (
            <section className="border-t border-[#e0ddd6] bg-[#faf8f5] py-12 sm:py-14 lg:py-16">
              <div className="container-max px-4 lg:px-8">
                <div className="mx-auto max-w-6xl">
                  <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="mb-2 text-ds-eyebrow uppercase text-accent">Packaging details</p>
                      <h2 className="font-display text-ds-heading font-semibold text-foreground">
                        Product Specification
                      </h2>
                    </div>
                    <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-ds-border bg-ds-card-bg px-3 py-2 text-ds-eyebrow font-bold uppercase tracking-[0.12em] text-ds-muted sm:px-4">
                      <ShieldCheck size={14} className="text-accent" />
                      Complete packaging overview
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[24px] border border-[#e6e1d8] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                    <div className="grid gap-2 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-[220px_1fr] lg:gap-6 border-b border-[#ece9e2]">
                      <div className="flex items-center gap-2.5 text-ds-spec-key font-medium text-ds-ink lg:items-start lg:pt-1">
                        <Package2 size={16} className="text-accent" />
                        <span>Box Style</span>
                      </div>
                      <div className="min-w-0 text-ds-spec-val text-ds-body">{specBoxStyle}</div>
                    </div>

                    <div className="grid gap-2 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-[220px_1fr] lg:gap-6 border-b border-[#ece9e2]">
                      <div className="flex items-center gap-2.5 text-ds-spec-key font-medium text-ds-ink lg:items-start lg:pt-1">
                        <Maximize size={16} className="text-accent" />
                        <span>Dimension (L + W + H)</span>
                      </div>
                      <div className="min-w-0 text-ds-spec-val text-ds-body">{specDimension}</div>
                    </div>

                    <div className="grid gap-2 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-[220px_1fr] lg:gap-6 border-b border-[#ece9e2]">
                      <div className="flex items-center gap-2.5 text-ds-spec-key font-medium text-ds-ink lg:items-start lg:pt-1">
                        <Package2 size={16} className="text-accent" />
                        <span>Quantities</span>
                      </div>
                      <div className="min-w-0 text-ds-spec-val text-ds-body">{specQuantities}</div>
                    </div>

                    <div className="grid gap-2 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-[220px_1fr] lg:gap-6 border-b border-[#ece9e2]">
                      <div className="flex items-center gap-2.5 text-ds-spec-key font-medium text-ds-ink lg:items-start lg:pt-1">
                        <ShieldCheck size={16} className="text-accent" />
                        <span>Stock</span>
                      </div>
                      <div className="min-w-0 text-ds-spec-val text-ds-body">{specStock}</div>
                    </div>

                    <div className="grid gap-2 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-[220px_1fr] lg:gap-6 border-b border-[#ece9e2]">
                      <div className="flex items-center gap-2.5 text-ds-spec-key font-medium text-ds-ink lg:items-start lg:pt-1">
                        <Printer size={16} className="text-accent" />
                        <span>Printing</span>
                      </div>
                      <div className="min-w-0 text-ds-spec-val text-ds-body">
                        <div className="flex flex-wrap gap-2">
                          {specPrintingList.map((item: string) => (
                            <span key={item} className="inline-flex items-center rounded-full border border-ds-input-border bg-ds-input-bg px-3 py-1 text-ds-caption font-medium text-ds-body">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-[220px_1fr] lg:gap-6 border-b border-[#ece9e2]">
                      <div className="flex items-center gap-2.5 text-ds-spec-key font-medium text-ds-ink lg:items-start lg:pt-1">
                        <Sparkles size={16} className="text-accent" />
                        <span>Finishing</span>
                      </div>
                      <div className="min-w-0 text-ds-spec-val text-ds-body">
                        <div className="flex flex-wrap gap-2">
                          {specFinishingList.map((item: string) => (
                            <span key={item} className="inline-flex items-center rounded-full border border-ds-input-border bg-ds-input-bg px-3 py-1 text-ds-caption font-medium text-ds-body">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-[220px_1fr] lg:gap-6 border-b border-[#ece9e2]">
                      <div className="flex items-center gap-2.5 text-ds-spec-key font-medium text-ds-ink lg:items-start lg:pt-1">
                        <CheckCircle2 size={16} className="text-accent" />
                        <span>Included Options</span>
                      </div>
                      <div className="min-w-0 text-ds-spec-val text-ds-body">
                        <div className="flex flex-wrap gap-2">
                          {specIncludedList.map((item: string) => (
                            <span key={item} className="inline-flex items-center rounded-full border border-ds-input-border bg-ds-input-bg px-3 py-1 text-ds-caption font-medium text-ds-body">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-[220px_1fr] lg:gap-6 border-b border-[#ece9e2]">
                      <div className="flex items-center gap-2.5 text-ds-spec-key font-medium text-ds-ink lg:items-start lg:pt-1">
                        <Leaf size={16} className="text-accent" />
                        <span>Additional Options</span>
                      </div>
                      <div className="min-w-0 text-ds-spec-val text-ds-body">
                        <div className="flex flex-wrap gap-2">
                          {specAdditionalList.map((item: string) => (
                            <span key={item} className="inline-flex items-center rounded-full border border-[#f5d5be] bg-[#fff5ee] px-3 py-1 text-ds-caption font-medium text-[#c45a18]">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-[220px_1fr] lg:gap-6 border-b border-[#ece9e2]">
                      <div className="flex items-center gap-2.5 text-ds-spec-key font-medium text-ds-ink lg:items-start lg:pt-1">
                        <ShieldCheck size={16} className="text-accent" />
                        <span>Proof</span>
                      </div>
                      <div className="min-w-0 text-ds-spec-val text-ds-body">
                        {specProof}
                      </div>
                    </div>

                    <div className={`grid gap-2 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-[220px_1fr] lg:gap-6 ${showShippingPolicy ? "border-b border-[#ece9e2]" : ""}`}>
                      <div className="flex items-center gap-2.5 text-ds-spec-key font-medium text-ds-ink lg:items-start lg:pt-1">
                        <Clock3 size={16} className="text-accent" />
                        <span>Turnaround</span>
                      </div>
                      <div className="min-w-0 text-ds-spec-val text-ds-body">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-ds-body font-semibold text-ds-ink">
                            {specTurnaround}
                          </span>
                          {specRushAvailable && (
                            <span className="inline-flex items-center rounded-full border border-[#f5d5be] bg-[#fff5ee] px-3 py-1 text-ds-caption font-semibold uppercase tracking-ds-eyebrow text-[#c45a18]">
                              Rush Available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {showShippingPolicy && (
                      <div className="grid gap-2 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-[220px_1fr] lg:gap-6">
                        <div className="flex items-center gap-2.5 text-ds-spec-key font-medium text-ds-ink lg:items-start lg:pt-1">
                          <ShieldCheck size={16} className="text-accent" />
                          <span>Shipping Policy</span>
                        </div>
                        <div className="min-w-0 text-ds-spec-val text-ds-body">
                          {specShipping}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })()}

        {/* 3 Top Features + 3 Alternating Content Blocks */}
        <section className="border-t border-[#e0ddd6] bg-[#faf8f5] py-14 sm:py-16 lg:py-20">
          <div className="container-max px-4 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:gap-16">

              {/* Feature items */}
              <FeatureItemsRow items={product.product_content?.feature_items || []} />

              {/* 3 Storytelling Blocks */}
              {(product.product_content?.content_blocks || []).map((block: any, idx: number) => (
                <div key={idx} className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                  <div className={block.flipped ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
                    <div className="flex flex-col gap-4">
                      <h3 className="font-display text-ds-subhead font-semibold leading-tight text-ds-ink">
                        {block.heading}
                      </h3>
                      <p className="font-sans text-ds-body text-ds-body">{block.body}</p>
                      {block.linkLabel && (
                        <a
                          href="#quote-form"
                          className="inline-flex w-fit items-center gap-2 border-b border-[#f5d5be] pb-1 text-ds-product font-semibold uppercase tracking-ds-product text-accent transition-colors hover:text-[#c45a18]"
                        >
                          {block.linkLabel}
                          <ArrowRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className={block.flipped ? "order-1 lg:order-1" : "order-1 lg:order-2"}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] border border-[#e6e1d8] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.05)]">
                      <Image
                        src={block.image}
                        alt={block.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dual-Column Animated Marquee Trustpilot Reviews */}
        <section className="border-t border-[#dce8df] bg-[#E8F4EA] px-4 py-14 sm:px-10 sm:py-16">
          <div className="mx-auto grid max-w-[1100px] items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
            <div className="max-w-[420px]">
              <p className="ds-eyebrow mb-2 text-accent">Testimonials</p>
              <h2 className="font-display text-[28px] font-semibold leading-[1.15] text-[#1a1a1a] sm:text-[34px]">
                Trusted by <span className="text-accent">Growing Brands</span>
              </h2>
              <p className="mt-3 font-sans text-[13.5px] leading-[1.7] text-[#5a5652]">
                Real Trustpilot reviews from brands who package with HOF Pack.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      product: product.name,
                      category:
                        typeof product.category === "string"
                          ? product.category
                          : product.category?.name,
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-accent px-5 py-3 font-sans text-[12.5px] font-semibold text-white transition-colors hover:bg-[#c45a18]"
                >
                  Customize now
                  <ArrowRight size={14} />
                </button>
                <Link
                  className="inline-flex items-center justify-center rounded-[8px] border border-[#c5d6ca] bg-white px-5 py-3 font-sans text-[12.5px] font-semibold text-[#1a1a1a] no-underline transition-colors hover:border-[#a8c4b0] hover:bg-[#f7fbf8]"
                  href="/our-products"
                >
                  Browse all products
                </Link>
              </div>
              <a
                href="https://www.trustpilot.com/review/hofpack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 font-sans text-[12px] font-medium text-[#00b67a] no-underline hover:underline"
              >
                See all reviews on Trustpilot
                <ArrowRight size={12} />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {/* Col 1 Up */}
              <div className="group relative h-[420px] overflow-hidden sm:h-[480px]">
                <div className="flex flex-col will-change-transform group-hover:[animation-play-state:paused] animate-marquee-vertical-up" style={{ animationDuration: "28s" }}>
                  {[...reviewsCol1, ...reviewsCol1].map((r, i) => (
                    <article key={i} className="mb-4 shrink-0 rounded-[16px] border border-[#dce8df] bg-white p-5 shadow-[0_8px_24px_rgba(45,92,62,0.06)]">
                      <p className="mb-1.5 font-sans text-[13px] font-semibold text-[#1a1a1a]">{r.title}</p>
                      <p className="font-sans text-[13.5px] leading-[1.65] text-[#1a1a1a]">{r.text}</p>
                      <div className="mt-3 flex items-center gap-0.5">
                        {[0, 1, 2, 3, 4].map((s) => (
                          <Star key={s} size={14} className="fill-[#00b67a] text-[#00b67a]" />
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-sans text-[12px] font-semibold text-white ${r.bg}`}>
                          {r.initials}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-sans text-[13px] font-semibold text-[#1a1a1a]">{r.author}</p>
                          <p className="truncate font-sans text-[11.5px] text-[#7a7672]">{r.time}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#E8F4EA] to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#E8F4EA] to-transparent" />
              </div>

              {/* Col 2 Down */}
              <div className="hidden sm:block">
                <div className="group relative h-[420px] overflow-hidden sm:h-[480px]">
                  <div className="flex flex-col will-change-transform group-hover:[animation-play-state:paused] animate-marquee-vertical-down" style={{ animationDuration: "32s" }}>
                    {[...reviewsCol2, ...reviewsCol2, ...reviewsCol2].map((r, i) => (
                      <article key={i} className="mb-4 shrink-0 rounded-[16px] border border-[#dce8df] bg-white p-5 shadow-[0_8px_24px_rgba(45,92,62,0.06)]">
                        <p className="mb-1.5 font-sans text-[13px] font-semibold text-[#1a1a1a]">{r.title}</p>
                        <p className="font-sans text-[13.5px] leading-[1.65] text-[#1a1a1a]">{r.text}</p>
                        <div className="mt-3 flex items-center gap-0.5">
                          {[0, 1, 2, 3, 4].map((s) => (
                            <Star key={s} size={14} className="fill-[#00b67a] text-[#00b67a]" />
                          ))}
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-sans text-[12px] font-semibold text-white ${r.bg}`}>
                            {r.initials}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-sans text-[13px] font-semibold text-[#1a1a1a]">{r.author}</p>
                            <p className="truncate font-sans text-[11.5px] text-[#7a7672]">{r.time}</p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#E8F4EA] to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#E8F4EA] to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scrollable Deep-Dive / Why Article Section */}
        {product.product_content?.article_sections && product.product_content.article_sections.length > 0 && (
          <section className="border-t border-[#e0ddd6] bg-[#faf8f5] py-14 sm:py-16 lg:py-20">
            <div className="container-max px-4 lg:px-8">
              <div className="mx-auto max-w-6xl">
                <div className="rounded-[20px] border border-[#e0ddd6] bg-white px-4 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] sm:px-6 sm:py-8 lg:px-8 xl:px-10">
                  <div className="article-body flex flex-col gap-4">
                    <div className="article-scroll max-h-[420px] overflow-y-auto overscroll-contain pr-2 sm:max-h-[480px]">
                      <div className="flex flex-col gap-4 pb-1">
                        {product.product_content.article_sections.map(renderArticleSection)}

                        {/* Material chips */}
                        {product.product_content.material_items && product.product_content.material_items.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {product.product_content.material_items.map((item: string) => (
                              <div
                                key={item}
                                className="inline-flex items-center gap-2 rounded-[10px] border border-ds-input-border bg-ds-input-bg px-4 py-2 text-ds-product font-medium text-ds-body"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                {item}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Perks Grid */}
                        {product.product_content.perk_items && product.product_content.perk_items.length > 0 && (
                          <div className="grid overflow-hidden rounded-[12px] border border-[#e0ddd6] sm:grid-cols-2 mt-4">
                            {product.product_content.perk_items.map((item: string, index: number) => (
                              <div
                                key={item}
                                className={`flex items-center gap-2.5 px-4 py-3 text-ds-body text-ds-body ${index % 2 === 0 ? "border-r border-[#e0ddd6]" : ""
                                  } ${index < (product.product_content?.perk_items?.length || 0) - 2 ? "border-b border-[#e0ddd6]" : ""}`}
                              >
                                <Check size={14} className="shrink-0 text-accent" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Common Questions (FAQ Accordion) */}
        {product.faqs && product.faqs.length > 0 && (
          <section className="section-padding bg-background border-t border-border">
            <div className="container-max max-w-3xl">
              <div className="text-center mb-10">
                <h2 className="font-sans uppercase text-center text-[#1a1a1a]" style={{ fontSize: "22px", fontWeight: 500, letterSpacing: "0.12em", marginBottom: "40px" }}>
                  Common <span className="text-[#e8732a]">Questions</span>
                </h2>
              </div>
              <div className="divide-y divide-[#e0ddd6]">
                {product.faqs.map((faq: any, idx: number) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={faq.id || idx}>
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-6 py-5 text-left group transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span className="font-sans text-[13.5px] font-normal leading-[1.5] text-[#1a1a1a] group-hover:text-[#e8732a] transition-colors duration-150">
                          {faq.question}
                        </span>
                        <ChevronRight
                          size={16}
                          className={`shrink-0 text-[#e8732a] transition-transform duration-200 ${isOpen ? "rotate-90" : ""
                            }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="pb-5 pt-1 text-[13px] leading-relaxed text-[#5a5652] animate-in fade-in-50 duration-200">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Related Products Horizontal Slider */}
        {((randomRelatedProducts.length > 0 ? randomRelatedProducts : product.relatedProducts) || []).length > 0 && (
          <section className="overflow-hidden section-padding bg-card border-t border-border">
            <div className="container-max px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-3xl font-display font-bold text-foreground">Related products</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollRelatedProducts(Math.max(0, currentRelatedPage - 1))}
                    disabled={currentRelatedPage === 0}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors border border-input bg-background font-medium text-sm hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full disabled:opacity-50"
                    type="button"
                    aria-label="Previous related products"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => scrollRelatedProducts(Math.min(2, currentRelatedPage + 1))}
                    disabled={currentRelatedPage >= 2}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors border border-input bg-background font-medium text-sm hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full disabled:opacity-50"
                    type="button"
                    aria-label="Next related products"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div
                id="related-products-slider"
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 lg:gap-6"
              >
                {(randomRelatedProducts.length > 0 ? randomRelatedProducts : (product.relatedProducts || [])).map((rel: any) => (
                  <div
                    key={rel.slug}
                    className="min-w-0 shrink-0 snap-start basis-[47%] sm:basis-[48%] lg:basis-[31%] xl:basis-[24%]"
                  >
                    <Link
                      className="group block overflow-hidden rounded-xl border border-border bg-card hover-lift"
                      href={`/product/${rel.slug}`}
                    >
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <Image
                          src={rel.image}
                          alt={rel.name}
                          fill
                          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, (max-width: 1280px) 31vw, 24vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="font-display text-sm leading-tight text-foreground transition-colors group-hover:text-accent">
                          {rel.name}
                        </h3>
                        <span className="mt-1.5 inline-block text-xs font-bold text-accent">
                          Get a Quote →
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Carousel Indicator Pills */}
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => scrollRelatedProducts(index)}
                      className={`h-1 rounded-full transition-all ${currentRelatedPage === index ? "w-12 bg-foreground" : "w-8 bg-muted/30 hover:bg-muted/60"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA Banner */}
        <section className="border-t-[3px] border-accent bg-[#2d5c3e] text-white">
          <div className="mx-auto max-w-[1100px] px-4 py-10 text-center sm:px-10">
            <h2 className="font-display text-[24px] font-semibold text-white sm:text-[28px]">
              Let&apos;s build something great together.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-[13px] text-white/65 sm:text-sm">
              Get your custom packaging quote today — free design support included.
            </p>
            <button
              type="button"
              onClick={() => openQuoteModal({ product: product.name, category: typeof product.category === "string" ? product.category : product.category?.name })}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-10 mt-4 rounded-md bg-accent px-7 py-[11px] text-[12px] font-medium uppercase tracking-[0.12em] text-white hover:bg-[#c45a18] transition-colors cursor-pointer"
            >
              Get a Quote
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}