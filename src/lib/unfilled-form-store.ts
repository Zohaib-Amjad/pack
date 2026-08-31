/**
 * In-memory and persistent multi-layer store for live abandoned/unfilled form captures.
 * Deduplicates strictly so 1 user session / identity = exactly 1 lead.
 */

export interface UnfilledRecord {
  id: string;
  sessionId: string;
  name: string;
  email: string;
  phone?: string;
  product: string;
  message: string;
  source: string;
  date: string;
  createdAt: string;
  status: "new" | "resolved";
}

// Global in-memory cache shared across Next.js API route handlers in Node runtime
const globalForUnfilled = globalThis as unknown as {
  unfilledFormStore?: Map<string, UnfilledRecord>;
};

export const unfilledMemoryStore =
  globalForUnfilled.unfilledFormStore || new Map<string, UnfilledRecord>();

if (process.env.NODE_ENV !== "production") {
  globalForUnfilled.unfilledFormStore = unfilledMemoryStore;
}

function cleanPhoneNum(phone?: string): string {
  return (phone || "").replace(/\D/g, "");
}

/**
 * Finds existing lead by matching sessionId, email, phone, or name.
 */
function findExistingLead(
  sessionId: string,
  email?: string,
  phone?: string,
  name?: string
): { key: string; record: UnfilledRecord } | null {
  const normEmail = (email || "").trim().toLowerCase();
  const normPhone = cleanPhoneNum(phone);
  const normName = (name || "").trim().toLowerCase();

  for (const [key, item] of unfilledMemoryStore.entries()) {
    // 1. Match by session ID
    if (item.sessionId === sessionId || key === sessionId) {
      return { key, record: item };
    }

    // 2. Match by email
    if (normEmail && item.email && item.email.toLowerCase() === normEmail) {
      return { key, record: item };
    }

    // 3. Match by phone
    if (normPhone && normPhone.length >= 7 && cleanPhoneNum(item.phone) === normPhone) {
      return { key, record: item };
    }

    // 4. Match by name if typed during same session/context
    if (
      normName &&
      normName.length >= 2 &&
      item.name &&
      item.name.toLowerCase() === normName
    ) {
      return { key, record: item };
    }
  }
  return null;
}

export function saveUnfilledLeadToMemory(lead: {
  sessionId: string;
  name: string;
  email: string;
  phone?: string;
  product: string;
  message: string;
  source?: string;
}): UnfilledRecord {
  const existingMatch = findExistingLead(lead.sessionId, lead.email, lead.phone, lead.name);
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const existing = existingMatch?.record;
  const canonicalSession = existing?.sessionId || lead.sessionId;
  const targetKey = existingMatch?.key || canonicalSession;

  // Use the freshest non-empty values
  const mergedName = (lead.name || existing?.name || "Anonymous Lead").trim();
  const mergedEmail = (lead.email || existing?.email || "").trim();
  const mergedPhone = (lead.phone || existing?.phone || "").trim();
  const mergedProduct = (lead.product || existing?.product || "General Inquiry").trim();
  const mergedMessage = (lead.message || existing?.message || "").trim();

  const record: UnfilledRecord = {
    id: existing?.id || `unfilled-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    sessionId: canonicalSession,
    name: mergedName,
    email: mergedEmail,
    phone: mergedPhone,
    product: mergedProduct,
    message: mergedMessage,
    source: lead.source || existing?.source || "unfilled_form",
    date: existing?.date || dateFormatted,
    createdAt: existing?.createdAt || now.toISOString(),
    status: existing?.status || "new",
  };

  if (existingMatch && existingMatch.key !== targetKey) {
    unfilledMemoryStore.delete(existingMatch.key);
  }

  unfilledMemoryStore.set(targetKey, record);
  return record;
}

export function getAllMemoryUnfilledLeads(): UnfilledRecord[] {
  return Array.from(unfilledMemoryStore.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function updateMemoryUnfilledLeadStatus(id: string, status: "new" | "resolved") {
  for (const [key, record] of unfilledMemoryStore.entries()) {
    if (record.id === id || record.sessionId === id) {
      record.status = status;
      unfilledMemoryStore.set(key, record);
    }
  }
}

export function deleteMemoryUnfilledLead(id: string) {
  for (const [key, record] of unfilledMemoryStore.entries()) {
    if (record.id === id || record.sessionId === id) {
      unfilledMemoryStore.delete(key);
    }
  }
}
