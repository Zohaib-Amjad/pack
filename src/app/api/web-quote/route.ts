import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import { createAdminClient } from "@/utils/supabase/admin";
import { forwardWebQuoteToCrm, type WebQuoteCrmPayload } from "@/lib/hof-crm-webhook";

/**
 * POST /api/web-quote
 * Receives quote forms from website, persists into database, and forwards to CRM webhook.
 */
export async function POST(req: Request) {
  try {
    const body: WebQuoteCrmPayload = await req.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const product = body.box_type || body.product_name || "Custom Quote";
    const specs = body.project_details || "";
    const source = body.form_source || "landing_page";

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Save to Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        await supabase.from("chat_inquiries" as any).insert({
          name,
          email,
          phone,
          product_interest: product,
          message: specs,
          source,
          status: "new",
          attachment_url: body.attachment_url,
          attachment_name: body.attachment_name,
          attachment_type: body.attachment_type,
        });
      } catch (supaErr) {
        console.warn("Supabase web-quote save error:", supaErr);
      }
    }

    // 2. Save to Payload CMS Leads
    try {
      const payload = await getPayload({ config });
      await (payload as any).create({
        collection: "leads",
        data: {
          name,
          email,
          phone,
          message: specs,
          source,
          status: "new",
        },
      });
    } catch {}

    // 3. Forward to CRM if configured
    await forwardWebQuoteToCrm(body).catch((e) => console.warn("CRM forward error:", e));

    return NextResponse.json({ success: true, message: "Quote lead processed" });
  } catch (error: any) {
    console.error("Web quote API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
