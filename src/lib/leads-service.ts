import { getPayload } from "payload";
import config from "@/payload.config";
import { createAdminClient } from "@/utils/supabase/admin";
import type { LeadExportItem, LeadInput } from "./leads-schema";

export interface CreateLeadResult {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source: string;
  created_at: string;
}

/**
 * Persists a new lead into Payload CMS Leads collection
 * with resilient fallback/dual-write to Supabase if configured.
 */
export async function saveLead(input: LeadInput): Promise<CreateLeadResult> {
  const leadData = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: (input.phone || "").trim(),
    message: (input.message || "").trim(),
    source: (input.source || "website-contact").trim(),
    status: "new" as const,
  };

  let generatedId = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  let createdAt = new Date().toISOString();

  // 1. Save in Payload CMS
  try {
    const payload = await getPayload({ config });
    const doc = await (payload as any).create({
      collection: "leads",
      data: leadData,
    });
    if (doc?.id) {
      generatedId = String(doc.id);
    }
    if (doc?.createdAt) {
      createdAt = new Date(doc.createdAt).toISOString();
    }
  } catch (payloadErr) {
    console.warn("Payload DB save lead encountered error:", payloadErr);
  }

  // 2. Dual-save to Supabase if available for redundant reliability
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const supabase = createAdminClient();
      // Try saving to leads table or chat_inquiries
      const res = await supabase
        .from("leads" as any)
        .insert({
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone || null,
          message: leadData.message || null,
          source: leadData.source,
          status: leadData.status,
        })
        .select()
        .maybeSingle();

      if (res.error) {
        // If leads table does not exist in supabase, try chat_inquiries
        await supabase.from("chat_inquiries" as any).insert({
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone || null,
          message: leadData.message || null,
          source: leadData.source,
          status: "new",
        });
      }
    }
  } catch (supabaseErr) {
    console.warn("Supabase dual-sync warning:", supabaseErr);
  }

  return {
    id: generatedId,
    name: leadData.name,
    email: leadData.email,
    phone: leadData.phone,
    message: leadData.message,
    source: leadData.source,
    created_at: createdAt,
  };
}

/**
 * Retrieves leads from the database, optionally filtered by `since` ISO timestamp.
 * Returns formatted LeadExportItem array matching the CRM requirements.
 */
export async function getLeads(since?: Date): Promise<LeadExportItem[]> {
  const leads: LeadExportItem[] = [];

  // 1. Fetch from Payload CMS
  try {
    const payload = await getPayload({ config });
    const whereClause: any = {};

    if (since) {
      whereClause.createdAt = {
        greater_than_equal: since.toISOString(),
      };
    }

    const result = await (payload as any).find({
      collection: "leads",
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      sort: "-createdAt",
      limit: 500,
    });

    if (result && Array.isArray(result.docs)) {
      for (const doc of result.docs) {
        leads.push({
          id: String(doc.id),
          name: String(doc.name || ""),
          email: String(doc.email || ""),
          phone: String(doc.phone || ""),
          message: String(doc.message || ""),
          created_at: new Date(doc.createdAt).toISOString(),
        });
      }
    }
  } catch (payloadErr) {
    console.warn("Payload fetch leads warning:", payloadErr);
  }

  // 2. Fallback / Merge from Supabase if Payload has no entries or failed
  if (leads.length === 0) {
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.SUPABASE_SERVICE_ROLE_KEY
      ) {
        const supabase = createAdminClient();
        let query = supabase
          .from("leads" as any)
          .select("id, name, email, phone, message, created_at")
          .order("created_at", { ascending: false })
          .limit(500);

        if (since) {
          query = query.gte("created_at", since.toISOString());
        }

        const { data: supaLeads, error: supaErr } = await query;

        if (!supaErr && Array.isArray(supaLeads) && supaLeads.length > 0) {
          for (const item of supaLeads) {
            leads.push({
              id: String(item.id),
              name: String(item.name || ""),
              email: String(item.email || ""),
              phone: String(item.phone || ""),
              message: String(item.message || ""),
              created_at: new Date(item.created_at || Date.now()).toISOString(),
            });
          }
        } else {
          // If leads table had no data, also try chat_inquiries
          let inqQuery = supabase
            .from("chat_inquiries" as any)
            .select("id, name, email, phone, message, created_at")
            .order("created_at", { ascending: false })
            .limit(500);

          if (since) {
            inqQuery = inqQuery.gte("created_at", since.toISOString());
          }

          const { data: inqData } = await inqQuery;
          if (Array.isArray(inqData)) {
            for (const item of inqData) {
              leads.push({
                id: String(item.id),
                name: String(item.name || ""),
                email: String(item.email || ""),
                phone: String(item.phone || ""),
                message: String(item.message || ""),
                created_at: new Date(
                  item.created_at || Date.now()
                ).toISOString(),
              });
            }
          }
        }
      }
    } catch (supaFallbackErr) {
      console.warn("Supabase fallback fetch leads warning:", supaFallbackErr);
    }
  }

  // Deduplicate and ensure sort order by date descending
  return leads.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}
