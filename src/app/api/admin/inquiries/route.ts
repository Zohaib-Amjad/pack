import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import { createAdminClient } from "@/utils/supabase/admin";
import {
  getAllMemoryUnfilledLeads,
  updateMemoryUnfilledLeadStatus,
  deleteMemoryUnfilledLead,
} from "@/lib/unfilled-form-store";

export interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  product: string;
  date: string;
  status: "new" | "resolved";
  type: "Unfilled Form" | "Organic" | "Ig" | "Fb" | "Landing Page" | "Add to Cart";
  assignee: string;
  isPulsing?: boolean;
  message?: string;
  quantity?: string;
  dimensions?: string;
  campaign?: string;
  source?: string;
}

/**
 * Maps raw database source / UTM values to standardized UI type
 */
function determineInquiryType(
  rawSource?: string,
  rawCampaign?: string,
  message?: string
): "Unfilled Form" | "Organic" | "Ig" | "Fb" | "Landing Page" | "Add to Cart" {
  const s = (rawSource || "").toLowerCase();
  const c = (rawCampaign || "").toLowerCase();
  const m = (message || "").toLowerCase();

  if (s.includes("unfilled") || s.includes("abandoned") || m.includes("unfilled form")) {
    return "Unfilled Form";
  }
  if (s.includes("cart") || s.includes("add_to_cart") || m.includes("add to cart")) {
    return "Add to Cart";
  }
  if (s === "ig" || s.includes("instagram") || c.includes("ig")) {
    return "Ig";
  }
  if (s === "fb" || s.includes("facebook") || c.includes("fb")) {
    return "Fb";
  }
  if (
    s.includes("landing") ||
    s.includes("gads") ||
    s.includes("google_ads") ||
    s.includes("cpc") ||
    s.includes("ppc") ||
    s.includes("category_page")
  ) {
    return "Landing Page";
  }
  return "Organic";
}

function formatDate(isoOrTimestamp?: string | Date | number): string {
  if (!isoOrTimestamp) return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  try {
    const d = new Date(isoOrTimestamp);
    if (isNaN(d.getTime())) return String(isoOrTimestamp);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return String(isoOrTimestamp);
  }
}

function cleanDigits(val?: string): string {
  return (val || "").replace(/\D/g, "");
}

/**
 * Deduplicates and merges raw inquiry items into a unique list.
 * 1 user / identity = exactly 1 lead.
 */
function mergeAndDeduplicateInquiries(rawItems: InquiryItem[]): InquiryItem[] {
  const merged: InquiryItem[] = [];

  for (const item of rawItems) {
    const normEmail = (item.email || "").trim().toLowerCase();
    const normPhone = cleanDigits(item.phone);
    const normName = (item.name || "").trim().toLowerCase();

    // Look for an existing match in merged array
    const existingIndex = merged.findIndex((m) => {
      // Direct ID match
      if (m.id === item.id) return true;

      // Email match (valid emails only)
      const mEmail = (m.email || "").trim().toLowerCase();
      if (
        normEmail &&
        mEmail &&
        !normEmail.includes("unfilled@visitor.lead") &&
        !normEmail.includes("no email") &&
        !mEmail.includes("unfilled@visitor.lead") &&
        !mEmail.includes("no email")
      ) {
        if (normEmail === mEmail) return true;
      }

      // Phone match
      const mPhone = cleanDigits(m.phone);
      if (normPhone && mPhone && normPhone.length >= 7 && mPhone.length >= 7) {
        if (normPhone === mPhone) return true;
      }

      // Name match (meaningful names only >= 3 chars, e.g. "testing name")
      const mName = (m.name || "").trim().toLowerCase();
      if (
        normName &&
        mName &&
        normName.length >= 3 &&
        !normName.includes("anonymous") &&
        !mName.includes("anonymous")
      ) {
        if (normName === mName) return true;
      }

      return false;
    });

    if (existingIndex >= 0) {
      // Merge with existing record, picking the more complete values
      const existing = merged[existingIndex];
      const hasBetterEmail =
        normEmail &&
        (!existing.email ||
          existing.email.includes("no email") ||
          existing.email.includes("unfilled@visitor.lead") ||
          (normEmail.endsWith(".com") && !existing.email.endsWith(".com")));

      merged[existingIndex] = {
        ...existing,
        name: existing.name && !existing.name.includes("Anonymous") ? existing.name : item.name,
        email: hasBetterEmail ? item.email : existing.email,
        phone: item.phone || existing.phone,
        message: item.message && item.message.length > (existing.message || "").length ? item.message : existing.message,
        product: existing.product && existing.product !== "General Inquiry" ? existing.product : item.product,
        status: existing.status === "resolved" || item.status === "resolved" ? "resolved" : "new",
        isPulsing: existing.status === "new" || item.status === "new",
      };
    } else {
      merged.push(item);
    }
  }

  return merged;
}

export async function GET() {
  const rawItems: InquiryItem[] = [];

  // 1. Live In-Memory Captured Unfilled Leads
  try {
    const memoryLeads = getAllMemoryUnfilledLeads();
    for (const mem of memoryLeads) {
      const isNew = mem.status === "new";
      rawItems.push({
        id: mem.id,
        name: mem.name,
        email: mem.email || "No email captured",
        phone: mem.phone || "",
        product: mem.product || "General Inquiry",
        date: mem.date || formatDate(mem.createdAt),
        status: isNew ? "new" : "resolved",
        type: "Unfilled Form",
        assignee: "Unassigned",
        isPulsing: isNew,
        message: mem.message || "Unfilled form capture",
        source: mem.source || "unfilled_form",
      });
    }
  } catch (err) {
    console.warn("Memory unfilled leads read warning:", err);
  }

  // 2. Fetch from Supabase chat_inquiries
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("chat_inquiries" as any)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);

      if (!error && Array.isArray(data)) {
        for (const row of data) {
          const itemType = determineInquiryType(row.source, row.utm_campaign, row.message);
          const isNew = row.status === "new" || !row.status;

          rawItems.push({
            id: String(row.id),
            name: row.name || "Anonymous Lead",
            email: row.email || "No email provided",
            phone: row.phone || "",
            product: row.product_interest || row.box_type || "General Inquiry",
            date: formatDate(row.created_at),
            status: isNew ? "new" : "resolved",
            type: itemType,
            assignee: row.assignee || "Unassigned",
            isPulsing: isNew,
            message: row.message || "",
            quantity: row.quantity || undefined,
            dimensions: row.dimensions || undefined,
            campaign: row.utm_campaign || undefined,
            source: row.source || undefined,
          });
        }
      }
    }
  } catch (err) {
    console.warn("Supabase fetch inquiries error:", err);
  }

  // 3. Fetch from Payload CMS collections: leads, quote-requests, contact-submissions
  try {
    const payload = await getPayload({ config });

    // A. Payload "leads"
    try {
      const leadsRes = await (payload as any).find({
        collection: "leads",
        sort: "-createdAt",
        limit: 100,
      });
      if (leadsRes?.docs) {
        for (const doc of leadsRes.docs) {
          const isNew = doc.status === "new" || !doc.status;
          rawItems.push({
            id: String(doc.id),
            name: doc.name || "Inquiry Lead",
            email: doc.email || "",
            phone: doc.phone || "",
            product: doc.product || "General Inquiry",
            date: formatDate(doc.createdAt),
            status: isNew ? "new" : "resolved",
            type: determineInquiryType(doc.source, undefined, doc.message),
            assignee: "Unassigned",
            isPulsing: isNew,
            message: doc.message || "",
            source: doc.source || "organic",
          });
        }
      }
    } catch {}

    // B. Payload "quote-requests"
    try {
      const quotesRes = await (payload as any).find({
        collection: "quote-requests",
        sort: "-createdAt",
        limit: 100,
      });
      if (quotesRes?.docs) {
        for (const doc of quotesRes.docs) {
          const isNew = doc.status === "new" || !doc.status;
          rawItems.push({
            id: String(doc.id),
            name: doc.fullName || "Quote Customer",
            email: doc.email || "",
            phone: doc.phone || "",
            product: doc.boxStyle || "Custom Packaging",
            date: formatDate(doc.createdAt),
            status: isNew ? "new" : "resolved",
            type: "Organic",
            assignee: "Unassigned",
            isPulsing: isNew,
            message: doc.additionalNotes || "",
            quantity: doc.quantity ? `${doc.quantity} pcs` : undefined,
            dimensions: doc.material || undefined,
          });
        }
      }
    } catch {}
  } catch (payloadErr) {
    console.warn("Payload fetch inquiries warning:", payloadErr);
  }

  // Deduplicate and merge into 1 single lead per user identity
  const items = mergeAndDeduplicateInquiries(rawItems);

  // Calculate dynamic counts for tabs
  const counts = {
    new: items.filter((i) => i.status === "new").length,
    resolved: items.filter((i) => i.status === "resolved").length,
    all: items.length,
    organic: items.filter((i) => i.type === "Organic").length,
    landing: items.filter((i) => i.type === "Landing Page").length,
    cart: items.filter((i) => i.type === "Add to Cart").length,
    unfilled: items.filter((i) => i.type === "Unfilled Form").length,
  };

  return NextResponse.json({
    inquiries: items,
    counts,
  });
}

/**
 * PATCH /api/admin/inquiries
 * Updates inquiry status (new / resolved) or assignee
 */
export async function PATCH(req: Request) {
  try {
    const { id, status, assignee } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing inquiry id" }, { status: 400 });
    }

    // 1. Update in memory store
    if (status) {
      updateMemoryUnfilledLeadStatus(id, status);
    }

    // 2. Update in Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        const updateData: any = {};
        if (status) updateData.status = status;
        if (assignee) updateData.assignee = assignee;

        await supabase.from("chat_inquiries" as any).update(updateData).eq("id", id);
      } catch (supaErr) {
        console.warn("Supabase update error:", supaErr);
      }
    }

    // 3. Update in Payload CMS
    try {
      const payload = await getPayload({ config });
      const updateData: any = {};
      if (status) updateData.status = status;

      await (payload as any).update({
        collection: "leads",
        id,
        data: updateData,
      }).catch(() => null);
    } catch {}

    return NextResponse.json({ success: true, message: "Inquiry updated" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/inquiries
 * Removes an inquiry from the database
 */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing inquiry id" }, { status: 400 });
    }

    // 1. Delete from memory store
    deleteMemoryUnfilledLead(id);

    // 2. Delete in Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        await supabase.from("chat_inquiries" as any).delete().eq("id", id);
      } catch (supaErr) {
        console.warn("Supabase delete error:", supaErr);
      }
    }

    // 3. Delete in Payload
    try {
      const payload = await getPayload({ config });
      await (payload as any).delete({
        collection: "leads",
        id,
      }).catch(() => null);
    } catch {}

    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete" }, { status: 500 });
  }
}
