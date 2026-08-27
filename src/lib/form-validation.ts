/** Shared public-form validation helpers */

export const ARTWORK_MAX_BYTES = 50 * 1024 * 1024;
export const ARTWORK_ACCEPT = ".jpg,.jpeg,.png,.pdf,.mp4";
export const ARTWORK_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
  "video/mp4",
] as const;

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** USA mobile length (NANP national number, without country code). */
export const PHONE_NATIONAL_DIGITS = 10;

export function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

/**
 * Normalize to 10-digit US national number.
 * Accepts 10 digits, or 11 digits starting with 1 / +1…
 */
export function normalizeUsPhoneDigits(value: string) {
  let digits = phoneDigits(value);
  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }
  return digits.slice(0, PHONE_NATIONAL_DIGITS);
}

/** Valid USA phone: exactly 10 NANP digits (area + exchange start with 2–9). */
export function isValidPhone(value: string) {
  const digits = normalizeUsPhoneDigits(value);
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(digits);
}

/** Digits only, max 10 — USA forms (no international country codes). */
export function sanitizePhoneInput(raw: string) {
  return normalizeUsPhoneDigits(raw);
}

/** Alias for +1-prefixed UI fields. */
export function sanitizeUsPhoneNational(raw: string) {
  return sanitizePhoneInput(raw);
}

/** Store as +1XXXXXXXXXX when valid; otherwise null. */
export function toE164UsPhone(value: string) {
  const digits = normalizeUsPhoneDigits(value);
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) return null;
  return `+1${digits}`;
}

/** Allow empty or non-negative decimal while typing. Returns null if invalid keystroke. */
export function sanitizeNonNegativeNumber(raw: string) {
  if (raw === "") return "";
  if (raw === "." || raw === "0." || /^\d+\.$/.test(raw)) return raw;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return null;
  return raw;
}

export function isPositiveNumber(value: string) {
  if (!value.trim()) return false;
  const n = Number(value);
  return Number.isFinite(n) && n > 0;
}

export function isPositiveInteger(value: string) {
  if (!/^\d+$/.test(value.trim())) return false;
  const n = Number(value);
  return Number.isInteger(n) && n > 0;
}

export function validateRequiredName(value: string, label = "Name") {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required`;
  if (trimmed.length < 2) return `Enter a valid ${label.toLowerCase()}`;
  return null;
}

export function validateRequiredEmail(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required";
  if (!isValidEmail(trimmed)) return "Enter a valid email address";
  return null;
}

export function validateRequiredPhone(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "Phone number is required";
  const digits = normalizeUsPhoneDigits(trimmed);
  if (digits.length !== PHONE_NATIONAL_DIGITS) {
    return `Enter a ${PHONE_NATIONAL_DIGITS}-digit USA mobile number`;
  }
  if (!isValidPhone(digits)) {
    return "Enter a valid USA mobile number";
  }
  return null;
}

export function validateOptionalPhone(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  return validateRequiredPhone(trimmed);
}

export function validateRequiredQuantity(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "Quantity is required";
  if (!isPositiveInteger(trimmed)) return "Enter a valid quantity (numbers only)";
  return null;
}

export function validateOptionalQuantity(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!isPositiveInteger(trimmed)) return "Enter a valid quantity (numbers only)";
  return null;
}

export function validateRequiredDimension(value: string, label: string) {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required`;
  if (!isPositiveNumber(trimmed)) return `${label} must be a positive number`;
  return null;
}

export function validateOptionalDimension(value: string, label: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!isPositiveNumber(trimmed)) return `${label} must be a positive number`;
  return null;
}

export function validateArtworkFile(file: File | null) {
  if (!file) return null;
  if (file.size > ARTWORK_MAX_BYTES) return "File must be 50MB or smaller";
  const type = (file.type || "").toLowerCase();
  const extOk = /\.(jpe?g|png|pdf|mp4)$/i.test(file.name);
  const mimeOk = ARTWORK_MIME_TYPES.includes(type as (typeof ARTWORK_MIME_TYPES)[number]);
  if (!mimeOk && !extOk) return "Use JPEG, PNG, PDF, or MP4 only";
  return null;
}

export function blockInvalidNumberKeys(e: { key: string; preventDefault: () => void }) {
  if (e.key === "-" || e.key === "e" || e.key === "E" || e.key === "+") {
    e.preventDefault();
  }
}
