// Lightweight in-memory rate limiter — no external dependencies.
//
// Scope note: state lives in the process, so on a serverless/multi-instance
// host (e.g. Vercel) the limit is enforced per-instance and resets on cold
// start. For a single-admin portfolio that is a meaningful brute-force
// slowdown, not a distributed guarantee. Swap the store for Redis/KV if you
// need cross-instance limits.

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 8; // failed attempts per window per key

interface Attempt {
  count: number;
  resetAt: number; // epoch ms when the window expires
}

const store = new Map<string, Attempt>();

export interface RateLimitResult {
  limited: boolean;
  retryAfterSeconds: number;
  remaining: number;
}

function prune(now: number): void {
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}

/** Returns whether `key` is currently rate-limited, without recording anything. */
export function checkRateLimit(key: string, now: number = Date.now()): RateLimitResult {
  const entry = store.get(key);
  if (!entry || entry.resetAt <= now) {
    return { limited: false, retryAfterSeconds: 0, remaining: MAX_ATTEMPTS };
  }
  if (entry.count >= MAX_ATTEMPTS) {
    return {
      limited: true,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
      remaining: 0,
    };
  }
  return { limited: false, retryAfterSeconds: 0, remaining: MAX_ATTEMPTS - entry.count };
}

/** Records one failed attempt for `key`, opening a fresh window if needed. */
export function recordFailure(key: string, now: number = Date.now()): void {
  const entry = store.get(key);
  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    entry.count += 1;
  }
  if (store.size > 1000) prune(now);
}

/** Clears the counter for `key` (call on a successful login). */
export function resetRateLimit(key: string): void {
  store.delete(key);
}

export const RATE_LIMIT_MAX_ATTEMPTS = MAX_ATTEMPTS;
export const RATE_LIMIT_WINDOW_MS = WINDOW_MS;
