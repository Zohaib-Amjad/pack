/**
 * Server-only: forward a web quote lead to the HofPack CRM webhook.
 * Do not import this from client components.
 */

export type WebQuoteCrmPayload = {
  name: string;
  email: string;
  phone: string;
  quantity: string;
  box_type?: string;
  company?: string;
  project_details?: string;
  external_id: string;
  length?: string;
  width?: string;
  depth?: string;
  unit?: string;
  color?: string;
  /** Public URL of uploaded artwork / design file */
  attachment_url?: string;
  attachment_name?: string;
  attachment_type?: string;
  form_source?: string;
  product_slug?: string;
  product_name?: string;
};

export type ForwardWebQuoteResult =
  | { ok: true; status: number; created: boolean; contactId?: string }
  | { ok: false; skipped?: boolean; status?: number; error: string };

export async function forwardWebQuoteToCrm(
  payload: WebQuoteCrmPayload,
): Promise<ForwardWebQuoteResult> {
  const url = process.env.HOF_CRM_WEBHOOK_URL?.trim();
  const secret = process.env.HOF_CRM_WEBHOOK_SECRET?.trim();

  if (!url || !secret) {
    console.warn(
      "[hof-crm-webhook] HOF_CRM_WEBHOOK_URL or HOF_CRM_WEBHOOK_SECRET not set — skipping CRM forward",
    );
    return { ok: false, skipped: true, error: "CRM webhook not configured" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": secret,
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        quantity: payload.quantity,
        box_type: payload.box_type || undefined,
        company: payload.company || undefined,
        project_details: payload.project_details || undefined,
        external_id: payload.external_id,
        length: payload.length || undefined,
        width: payload.width || undefined,
        depth: payload.depth || undefined,
        unit: payload.unit || undefined,
        color: payload.color || undefined,
        attachment_url: payload.attachment_url || undefined,
        attachment_name: payload.attachment_name || undefined,
        attachment_type: payload.attachment_type || undefined,
        form_source: payload.form_source || undefined,
        product_slug: payload.product_slug || undefined,
        product_name: payload.product_name || undefined,
      }),
    });

    let body: { ok?: boolean; created?: boolean; contactId?: string; error?: string } = {};
    try {
      body = await res.json();
    } catch {
      // CRM may return empty body on some errors
    }

    if (!res.ok) {
      const message = body.error || `CRM webhook returned ${res.status}`;
      console.error("[hof-crm-webhook] CRM forward failed:", message, {
        status: res.status,
        external_id: payload.external_id,
      });
      return { ok: false, status: res.status, error: message };
    }

    return {
      ok: true,
      status: res.status,
      created: Boolean(body.created),
      contactId: body.contactId,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "CRM webhook request failed";
    console.error("[hof-crm-webhook] CRM forward error:", message, {
      external_id: payload.external_id,
    });
    return { ok: false, error: message };
  }
}
