"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { sendQuoteEmail } from "@/lib/send-quote-email";
import { trackLeadSubmitted } from "@/lib/analytics";
import { buildInquiryAttribution } from "@/lib/attribution";
import {
  cartSubtotal,
  clearCart,
  formatUsd,
  readCart,
  removeFromCart,
  type ShoppingCartItem,
} from "@/lib/google-shopping";
import {
  PHONE_NATIONAL_DIGITS,
  sanitizePhoneInput,
  validateRequiredEmail,
  validateRequiredName,
  validateRequiredPhone,
} from "@/lib/form-validation";
import { useAbandonedFormCapture } from "@/hooks/useAbandonedFormCapture";
import { X } from "lucide-react";

function CartPageInner() {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState<ShoppingCartItem[]>([]);
  const [justAdded, setJustAdded] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [captcha, setCaptcha] = useState({ n1: 0, n2: 0 });
  const [captchaInput, setCaptchaInput] = useState("");

  const { track: trackUnfilled, flushNow: flushUnfilled } = useAbandonedFormCapture({
    formName: "cart-checkout-form",
    enabled: !checkoutDone && !isSubmitting,
    productInterest: "Cart checkout",
  });

  useEffect(() => {
    setItems(readCart());
    setJustAdded(sessionStorage.getItem("hofpack_cart_just_added") === "1");
    sessionStorage.removeItem("hofpack_cart_just_added");
    setCaptcha({
      n1: Math.floor(Math.random() * 9) + 1,
      n2: Math.floor(Math.random() * 9) + 1,
    });

    const sync = () => setItems(readCart());
    window.addEventListener("hofpack-cart-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("hofpack-cart-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const total = useMemo(() => cartSubtotal(items), [items]);

  const handleRemove = (slug: string) => {
    removeFromCart(slug);
    setItems(readCart());
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    const nameErr = validateRequiredName(name, "Name");
    if (nameErr) errs.name = nameErr;
    const phoneErr = validateRequiredPhone(phone);
    if (phoneErr) errs.phone = phoneErr;
    const emailErr = validateRequiredEmail(email);
    if (emailErr) errs.email = emailErr;
    if (Number(captchaInput) !== captcha.n1 + captcha.n2) errs.captcha = "Incorrect answer";
    if (items.length === 0) errs.cart = "Cart is empty";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    const lines = items.map(
      (i) =>
        `- ${i.name} | Qty ${i.quantity} | Unit ${formatUsd(i.price)} | Subtotal ${formatUsd(i.price * i.quantity)} | /product/${i.slug}`,
    );
    const specs = [
      "Source: Google Shopping Add to Cart checkout",
      `Cart total: ${formatUsd(total)}`,
      "",
      "Items:",
      ...lines,
      "",
      "Customer message:",
      message.trim() || "None",
    ].join("\n");

    const productInterest =
      items.length === 1 ? items[0].name : `Cart (${items.length} products)`;

    try {
      const supabase = createPublicClient();
      const attribution = buildInquiryAttribution("add_to_cart_checkout");
      const { error } = (await withAbortableTimeout(
        (signal) =>
          supabase
            .from("chat_inquiries" as any)
            .insert({
              name: name.trim(),
              email: email.trim(),
              phone: phone.trim(),
              product_interest: productInterest,
              message: specs,
              source: "add_to_cart",
              status: "new",
              ...attribution,
            } as any)
            .abortSignal(signal) as any,
      )) as any;

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }

      trackLeadSubmitted("add_to_cart_checkout", attribution);
      sendQuoteEmail({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        productInterest,
        specs,
      });
      clearCart();
      toast({
        title: "Order confirmed!",
        description: "We'll email you with final pricing shortly.",
      });
      setCheckoutDone(true);
      router.push("/thank-you");
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

  return (
    <Layout>
      <div className="mx-auto max-w-[960px] px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="mb-6 text-center font-display text-[28px] font-semibold text-[#1a1a1a] sm:text-[34px]">
          Your Cart
        </h1>

        {justAdded && (
          <div className="mb-5 rounded-[8px] border border-[#c5d9c9] bg-[#eaf2ed] px-4 py-3 text-center text-[13px] font-medium text-[#2d5c3e]">
            Product added to cart.
          </div>
        )}

        {items.length === 0 ? (
          <div className="rounded-[12px] border border-[#e0ddd6] bg-white p-10 text-center">
            <p className="text-[14px] text-[#7a7672]">Your cart is empty.</p>
            <Link
              href="/"
              className="mt-4 inline-flex text-[13px] font-semibold text-accent hover:underline"
            >
              Continue browsing
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-[12px] border border-[#e0ddd6] bg-white">
              <table className="w-full min-w-[560px] text-left text-[13px]">
                <thead className="border-b border-[#e0ddd6] bg-[#faf8f5] text-[11px] uppercase tracking-wider text-[#7a7672]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Product</th>
                    <th className="px-4 py-3 font-semibold">Price</th>
                    <th className="px-4 py-3 font-semibold">Qty</th>
                    <th className="px-4 py-3 font-semibold">Subtotal</th>
                    <th className="px-4 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.slug} className="border-b border-[#eeebe6] last:border-0">
                      <td className="px-4 py-3 font-medium text-[#1a1a1a]">{item.name}</td>
                      <td className="px-4 py-3 text-[#4a4a4a]">{formatUsd(item.price)}</td>
                      <td className="px-4 py-3 text-[#4a4a4a]">{item.quantity}</td>
                      <td className="px-4 py-3 text-[#4a4a4a]">
                        {formatUsd(item.price * item.quantity)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => handleRemove(item.slug)}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-accent hover:bg-[#fff3e9]"
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded-[8px] border border-[#e0ddd6] bg-[#f5f3ee] px-4 py-3 text-[12.5px] leading-6 text-[#5a5652]">
              Please note: The displayed amount is indicative only. Final pricing will be
              confirmed via email by our customer support team.
            </div>

            <form
              onSubmit={handleCheckout}
              className="mt-8 grid gap-6 lg:grid-cols-[1fr_240px]"
            >
              <div className="rounded-[12px] border border-[#e0ddd6] bg-white p-5 sm:p-6">
                <h2 className="mb-4 font-display text-[20px] font-semibold text-[#1a1a1a]">
                  Enter Personal Information
                </h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <Input
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        const next = e.target.value;
                        setName(next);
                        setErrors((er) => ({ ...er, name: "" }));
                        trackUnfilled({ name: next, email, phone });
                      }}
                      onBlur={() => flushUnfilled()}
                      className="h-10"
                    />
                    {errors.name && (
                      <p className="mt-1 text-[11px] font-medium text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="tel"
                      inputMode="numeric"
                      maxLength={PHONE_NATIONAL_DIGITS}
                      placeholder="5551234567"
                      value={phone}
                      onChange={(e) => {
                        const next = sanitizePhoneInput(e.target.value);
                        setPhone(next);
                        setErrors((er) => ({ ...er, phone: "" }));
                        trackUnfilled({ name, email, phone: next });
                      }}
                      onBlur={() => flushUnfilled()}
                      className="h-10"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-[11px] font-medium text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        const next = e.target.value;
                        setEmail(next);
                        setErrors((er) => ({ ...er, email: "" }));
                        trackUnfilled({ name, email: next, phone });
                      }}
                      onBlur={() => flushUnfilled()}
                      className="h-10"
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] font-medium text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>
                <Textarea
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-3 min-h-[110px]"
                />
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[12.5px] text-[#5a5652]">
                  <span>
                    {captcha.n1} + {captcha.n2} =
                  </span>
                  <Input
                    value={captchaInput}
                    onChange={(e) => {
                      setCaptchaInput(e.target.value.replace(/\D/g, ""));
                      setErrors((er) => ({ ...er, captcha: "" }));
                    }}
                    className="h-8 w-16"
                    placeholder="Ans"
                  />
                  <span className="text-[#7a7672]">(Are you human, or spambot?)</span>
                  {errors.captcha && (
                    <p className="w-full text-[11px] font-medium text-red-500">{errors.captcha}</p>
                  )}
                </div>
              </div>

              <div className="rounded-[12px] border border-[#e0ddd6] bg-white p-5">
                <h2 className="mb-3 font-display text-[18px] font-semibold text-[#1a1a1a]">
                  Cart Totals
                </h2>
                <div className="flex justify-between border-b border-[#eeebe6] py-2 text-[13px]">
                  <span className="text-[#7a7672]">Items</span>
                  <span className="font-medium text-[#1a1a1a]">{items.length}</span>
                </div>
                <div className="flex justify-between py-2 text-[13px]">
                  <span className="text-[#7a7672]">Total</span>
                  <span className="font-semibold text-[#1a1a1a]">{formatUsd(total)}</span>
                </div>
              </div>

              <div className="lg:col-span-2 flex justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 min-w-[200px] rounded-[8px] bg-[#2563eb] px-10 text-[14px] font-semibold text-white hover:bg-[#1d4ed8]"
                >
                  {isSubmitting ? "Confirming…" : "Check Out"}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <Layout>
          <div className="px-4 py-16 text-center text-[13px] text-[#7a7672]">Loading cart…</div>
        </Layout>
      }
    >
      <CartPageInner />
    </Suspense>
  );
}