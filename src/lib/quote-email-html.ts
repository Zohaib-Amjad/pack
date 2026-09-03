export const CUSTOMER_QUOTE_EMAIL_SUBJECT =
  "Thanks for reaching out — HOF Pack will be in touch";

export type QuoteEmailFields = {
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  productInterest?: string;
  specs?: string;
  siteUrl?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function firstNameFrom(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return "there";
  return trimmed.split(/\s+/)[0] || "there";
}

function siteBaseUrl(override?: string): string {
  if (override) return override.replace(/\/$/, "");
  if (process.env.NODE_ENV !== "production") {
    return (process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000").replace(/\/$/, "");
  }
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://hofpack.com").replace(/\/$/, "");
}

function summaryRow(label: string, value: string | undefined): string {
  const text = (value || "").trim();
  if (!text) return "";
  return `
    <tr>
      <td style="padding:8px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#7a7672;width:120px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:8px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1a1a1a;vertical-align:top;">${escapeHtml(text)}</td>
    </tr>`;
}

/** Customer confirmation HTML — table-based, inline CSS for Gmail. */
export function buildCustomerQuoteEmailHtml(fields: QuoteEmailFields): string {
  const base = siteBaseUrl(fields.siteUrl);
  const logoUrl = `${base}/email-header-logo.png`;
  const first = escapeHtml(firstNameFrom(fields.customerName));
  const ctaUrl = escapeHtml(base);
  const summary =
    summaryRow("Name", fields.customerName) +
    summaryRow("Email", fields.customerEmail) +
    summaryRow("Phone", fields.customerPhone) +
    summaryRow("Product", fields.productInterest) +
    summaryRow("Details", fields.specs);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${CUSTOMER_QUOTE_EMAIL_SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f3ee;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f3ee;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#ffffff;border:1px solid #e0ddd6;">
          <tr>
            <td align="center" style="background-color:#f5f3ee;padding:20px 24px 12px;">
              <img src="${logoUrl}" alt="HOF Pack" width="520" style="display:block;width:520px;max-width:100%;height:auto;border:0;">
            </td>
          </tr>
          <tr>
            <td style="background-color:#1e3d2b;padding:28px 32px;">
              <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#e8732a;font-weight:bold;">Quote received</p>
              <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:26px;line-height:1.25;color:#ffffff;font-weight:bold;">Thanks for reaching out</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#1a1a1a;">
              <p style="margin:0 0 14px;">Hi ${first},</p>
              <p style="margin:0 0 14px;">A packaging advisor will be in touch shortly. You’ll get a quote and a free 3D mock-up within 24 hours.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 8px;">
              <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#1e3d2b;letter-spacing:0.04em;text-transform:uppercase;">What happens next</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#4a4a4a;">
                    <span style="display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;border-radius:11px;background-color:#e8732a;color:#ffffff;font-size:12px;font-weight:bold;">1</span>
                    &nbsp;We review your specs with the design team.
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#4a4a4a;">
                    <span style="display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;border-radius:11px;background-color:#e8732a;color:#ffffff;font-size:12px;font-weight:bold;">2</span>
                    &nbsp;You receive pricing and a free 3D mock-up.
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#4a4a4a;">
                    <span style="display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;border-radius:11px;background-color:#e8732a;color:#ffffff;font-size:12px;font-weight:bold;">3</span>
                    &nbsp;We print, inspect, and ship to your door.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 8px;">
              <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#1e3d2b;letter-spacing:0.04em;text-transform:uppercase;">Your request summary</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f3ee;border:1px solid #e0ddd6;">
                <tr>
                  <td style="padding:14px 16px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${summary}</table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:24px 32px 8px;">
              <a href="${ctaUrl}" style="display:inline-block;background-color:#e8732a;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;text-decoration:none;padding:14px 28px;border-radius:5px;">Explore HOF Pack</a>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;">
              <p style="margin:0 0 4px;">Talk soon,</p>
              <p style="margin:0;font-weight:bold;color:#2d5c3e;">The HOF Pack team</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e0ddd6;">
                <tr>
                  <td align="center" style="padding-top:16px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#7a7672;line-height:1.7;">
                    Free shipping USA &nbsp;·&nbsp; Low MOQ &nbsp;·&nbsp; Free 3D mock-up &nbsp;·&nbsp; USA-based team
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#2d5c3e;padding:18px 32px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;color:#ffffff;text-align:center;">
              <a href="mailto:info@hofpack.com" style="color:#ffffff;text-decoration:none;">info@hofpack.com</a>
              &nbsp;·&nbsp;
              <a href="tel:+18884294881" style="color:#ffffff;text-decoration:none;">+1 (888) 429-4881</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
