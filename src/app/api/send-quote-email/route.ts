import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  buildCustomerQuoteEmailHtml,
  CUSTOMER_QUOTE_EMAIL_SUBJECT,
} from "@/lib/quote-email-html";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const customerName = String(body.customerName || body.name || "").trim();
    const customerEmail = String(body.customerEmail || body.email || "").trim();
    const customerPhone = String(body.customerPhone || body.phone || "").trim();
    const productInterest = String(body.productInterest || "").trim();
    const specs = String(body.specs || body.message || "").trim();

    if (!customerEmail || !customerName) {
      return NextResponse.json({ error: "Missing customer name or email" }, { status: 400 });
    }

    const html = buildCustomerQuoteEmailHtml({
      customerName,
      customerEmail,
      customerPhone,
      productInterest,
      specs,
    });

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) {
      console.warn("[send-quote-email] SMTP not configured; skipped send");
      return NextResponse.json({ ok: true, skipped: true });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"HOF Pack" <${user}>`,
      to: customerEmail,
      subject: CUSTOMER_QUOTE_EMAIL_SUBJECT,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[send-quote-email]", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
