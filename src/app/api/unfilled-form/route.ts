import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import { createAdminClient } from "@/utils/supabase/admin";
import { buildUnfilledDisplayName, buildUnfilledMessage, type UnfilledFormPayload } from "@/lib/unfilled-form";
import { saveUnfilledLeadToMemory } from "@/lib/unfilled-form-store";

/**
 * POST /api/unfilled-form
 * Captures abandoned/unfilled form leads and persists them to memory, Supabase & Payload CMS.
 * Performs intelligent upserting to guarantee 1 lead per user/session.
 */
export async function POST(req: Request) {
  try {
    const data: UnfilledFormPayload = await req.json();

    const name = buildUnfilledDisplayName(data.fields);
    const email = (data.fields.email || "").trim();
    const phone = (data.fields.phone || "").trim();
    const productInterest = data.productInterest || "General Inquiry";
    const message = buildUnfilledMessage(data.fields, data.formName || "Website Form");

    // Must have at least name, email, or phone to qualify as a capture
    if (!name && !email && !phone) {
      return NextResponse.json({ skipped: true });
    }

    // 1. Instant resilient memory store (Guarantees local + live dev immediacy with 1 lead per user)
    const memoryRecord = saveUnfilledLeadToMemory({
      sessionId: data.sessionId,
      name,
      email,
      phone,
      product: productInterest,
      message,
      source: "unfilled_form",
    });

    // 2. Persist to Supabase chat_inquiries (upsert by session_id)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        await supabase.from("chat_inquiries" as any).upsert(
          {
            session_id: data.sessionId,
            name,
            email: email || null,
            phone: phone || null,
            product_interest: productInterest,
            message,
            source: "unfilled_form",
            status: "new",
          },
          { onConflict: "session_id" }
        );
      } catch (supaErr) {
        console.warn("Supabase unfilled-form upsert warning:", supaErr);
      }
    }

    // 3. Persist to Payload CMS leads collection with update check
    try {
      const payload = await getPayload({ config });
      // Check if an existing unfilled lead exists for this email or name
      const existingLeads = await (payload as any).find({
        collection: "leads",
        where: email
          ? { email: { equals: email } }
          : { name: { equals: name } },
        limit: 1,
      });

      if (existingLeads?.docs && existingLeads.docs.length > 0) {
        const docId = existingLeads.docs[0].id;
        await (payload as any).update({
          collection: "leads",
          id: docId,
          data: {
            name,
            email: email || existingLeads.docs[0].email,
            phone: phone || existingLeads.docs[0].phone,
            message,
            source: "unfilled_form",
          },
        });
      } else {
        await (payload as any).create({
          collection: "leads",
          data: {
            name,
            email: email || "unfilled@visitor.lead",
            phone,
            message,
            source: "unfilled_form",
            status: "new",
          },
        });
      }
    } catch {}

    return NextResponse.json({
      success: true,
      id: memoryRecord.id,
      message: "Unfilled lead captured",
    });
  } catch (error: any) {
    console.error("Error capturing unfilled form:", error);
    return NextResponse.json({ error: "Failed to capture unfilled form" }, { status: 500 });
  }
}
