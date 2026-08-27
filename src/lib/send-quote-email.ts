export async function sendQuoteEmail(params: {
  name: string;
  email: string;
  phone: string;
  productInterest: string;
  specs: string;
}) {
  try {
    await fetch("/api/send-quote-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: params.name,
        customerEmail: params.email,
        customerPhone: params.phone,
        productInterest: params.productInterest,
        specs: params.specs,
      }),
    });
  } catch (err) {
    // Non-blocking — don't fail the form submission if email fails
    console.warn("[sendQuoteEmail] failed:", err);
  }
}
