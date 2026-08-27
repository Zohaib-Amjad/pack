/** Site-wide WhatsApp (matches floating chat button): +1 251-373-4719 */
export const WHATSAPP_NUMBER = "12513734719";

export function getWhatsAppUrl(message?: string): string {
  const digits = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  if (!message) return `https://wa.me/${digits}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
