/** Google Shopping / Ads UTM helpers + lightweight cart (sessionStorage). */

const CART_KEY = "hofpack_shopping_cart";
const STOCK_KEY = "hofpack_shopping_stock";
/** Fixed display/unit price for Google Shopping Add to Cart flow. */
const DEFAULT_UNIT_PRICE = 0.45;
/** Floor so the urgency signal never hits zero on the storefront. */
const MIN_STOCK = 3;

export type ShoppingCartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
};

function canUseStorage() {
  return typeof window !== "undefined";
}

function hasGoogleUtmParams(search?: string): boolean {
  const params = new URLSearchParams(
    search ?? (canUseStorage() ? window.location.search : ""),
  );
  const source = (params.get("utm_source") || "").toLowerCase();
  const hasGclid = !!params.get("gclid");
  return (
    source === "google" ||
    source === "google_shopping" ||
    source === "shopping" ||
    hasGclid
  );
}

/**
 * Add to Cart / price UI only when the *current* URL has Google UTM (or gclid).
 * Does not stick across normal product pages.
 */
export function shouldShowAddToCart(search?: string): boolean {
  if (!canUseStorage()) return false;
  // Clear legacy sticky flag from earlier builds
  try {
    sessionStorage.removeItem("hofpack_google_shopping_visitor");
  } catch {
    /* ignore */
  }
  return hasGoogleUtmParams(search ?? window.location.search);
}

/** @deprecated Use shouldShowAddToCart — kept for older call sites. */
export function isGoogleShoppingVisitor(): boolean {
  return shouldShowAddToCart();
}

/** @deprecated No longer persists session flag. */
export function captureGoogleShoppingVisitorFromUrl(search?: string): boolean {
  return shouldShowAddToCart(search);
}

export function resolveProductUnitPrice(_raw?: unknown): number {
  return DEFAULT_UNIT_PRICE;
}

export function formatUsd(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function readCart(): ShoppingCartItem[] {
  if (!canUseStorage()) return [];
  try {
    const raw = sessionStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeCart(items: ShoppingCartItem[]) {
  if (!canUseStorage()) return;
  sessionStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("hofpack-cart-updated"));
}

export function clearCart() {
  writeCart([]);
}

export function addToCart(item: ShoppingCartItem) {
  const cart = readCart();
  const idx = cart.findIndex((c) => c.slug === item.slug);
  if (idx >= 0) {
    cart[idx] = {
      ...cart[idx],
      quantity: Math.max(1, cart[idx].quantity + item.quantity),
      price: item.price,
      name: item.name,
      image: item.image ?? cart[idx].image,
    };
  } else {
    cart.push({ ...item, quantity: Math.max(1, item.quantity) });
  }
  writeCart(cart);
}

export function removeFromCart(slug: string) {
  writeCart(readCart().filter((i) => i.slug !== slug));
}

export function cartSubtotal(items: ShoppingCartItem[] = readCart()): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

type StockEntry = { qty: number; updatedAt: number };

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (Math.imul(31, h) + slug.charCodeAt(i)) >>> 0;
  }
  return h;
}

/** Stable seed per product so the same slug doesn't jump wildly on first view. */
function seedStock(slug: string): number {
  return 12 + (hashSlug(slug) % 37); // 12–48
}

function readStockMap(): Record<string, StockEntry> {
  if (!canUseStorage()) return {};
  try {
    const raw = sessionStorage.getItem(STOCK_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeStockMap(map: Record<string, StockEntry>) {
  if (!canUseStorage()) return;
  sessionStorage.setItem(STOCK_KEY, JSON.stringify(map));
}

/**
 * Dynamic "units left" for Google Shopping ATC UI.
 * Decays slowly over time (session-persisted) so the count feels live.
 */
export function getDynamicStock(slug: string): number {
  if (!slug) return MIN_STOCK;
  const now = Date.now();
  const map = readStockMap();
  const entry = map[slug];
  const tickMs = 35_000 + (hashSlug(slug) % 40_000); // ~35–75s per unit

  if (!entry) {
    const qty = seedStock(slug);
    map[slug] = { qty, updatedAt: now };
    writeStockMap(map);
    return qty;
  }

  const drops = Math.floor((now - entry.updatedAt) / tickMs);
  if (drops <= 0) return Math.max(MIN_STOCK, entry.qty);

  const qty = Math.max(MIN_STOCK, entry.qty - drops);
  map[slug] = { qty, updatedAt: entry.updatedAt + drops * tickMs };
  writeStockMap(map);
  return qty;
}

/** Apply a sale (e.g. after Add to Cart) and return the new count. */
export function consumeDynamicStock(slug: string, amount = 1): number {
  if (!slug) return MIN_STOCK;
  const map = readStockMap();
  const current = getDynamicStock(slug);
  const qty = Math.max(MIN_STOCK, current - Math.max(1, amount));
  map[slug] = { qty, updatedAt: Date.now() };
  writeStockMap(map);
  return qty;
}
