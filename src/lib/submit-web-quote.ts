/**
 * Client helper: POST quote fields to our server route, which forwards to CRM.
 * Secrets stay on the server (never NEXT_PUBLIC_*).
 */

export type SubmitWebQuoteInput = {
  name: string;
  email: string;
  phone: string;
  quantity: string;
  box_type?: string;
  company?: string;
  project_details?: string;
  external_id: string;
  /** Home quote form: box dimensions */
  length?: string;
  width?: string;
  depth?: string;
  unit?: string;
  color?: string;
  /** Uploaded artwork / design (public URL) */
  attachment_url?: string;
  attachment_name?: string;
  attachment_type?: string;
  /**
   * Where the lead came from on the website.
   * e.g. product_page | category_page | home_quote | quote_modal
   */
  form_source?: string;
  /** Product slug when lead is from a product page */
  product_slug?: string;
  /** Human product/category label (often same as box_type) */
  product_name?: string;
};

export async function submitWebQuote(params: SubmitWebQuoteInput): Promise<void> {
  try {
    const res = await fetch("/api/web-quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      console.warn("[submitWebQuote] server returned", res.status, body);
    }
  } catch (err) {
    // Non-blocking — do not fail the form if CRM forward fails
    console.warn("[submitWebQuote] failed:", err);
  }
}
