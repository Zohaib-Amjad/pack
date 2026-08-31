interface RateLimitRecord {
  timestamps: number[];
}

// In-memory store for rate limiting by IP/Key
const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically (every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      const validTimestamps = record.timestamps.filter(
        (ts) => now - ts < 15 * 60 * 1000
      );
      if (validTimestamps.length === 0) {
        rateLimitStore.delete(key);
      } else {
        record.timestamps = validTimestamps;
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitOptions {
  windowMs?: number; // Time window in milliseconds (default: 10 minutes)
  max?: number; // Max requests allowed per window (default: 5)
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number; // Unix timestamp in ms when oldest hit expires
}

/**
 * Checks and records rate limit for a client identifier (e.g. IP address).
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const windowMs = options.windowMs ?? 10 * 60 * 1000; // 10 minutes
  const max = options.max ?? 5; // 5 requests per window
  const now = Date.now();

  const record = rateLimitStore.get(identifier) || { timestamps: [] };

  // Filter timestamps within the current window
  const activeTimestamps = record.timestamps.filter(
    (timestamp) => now - timestamp < windowMs
  );

  const resetTime =
    activeTimestamps.length > 0 ? activeTimestamps[0] + windowMs : now + windowMs;

  if (activeTimestamps.length >= max) {
    rateLimitStore.set(identifier, { timestamps: activeTimestamps });
    return {
      success: false,
      limit: max,
      remaining: 0,
      resetTime,
    };
  }

  // Record the current hit
  activeTimestamps.push(now);
  rateLimitStore.set(identifier, { timestamps: activeTimestamps });

  return {
    success: true,
    limit: max,
    remaining: Math.max(0, max - activeTimestamps.length),
    resetTime,
  };
}

/**
 * Extracts client IP from standard proxy headers
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",").map((ip) => ip.trim());
    if (ips[0]) return ips[0];
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  return "127.0.0.1";
}
