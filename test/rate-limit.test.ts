import { describe, it, expect, beforeAll } from "vitest";
import { NextRequest } from "next/server";
import {
  checkRateLimit,
  recordFailure,
  resetRateLimit,
  RATE_LIMIT_MAX_ATTEMPTS,
  RATE_LIMIT_WINDOW_MS,
} from "@/lib/rate-limit";

beforeAll(() => {
  process.env.ADMIN_SECRET = "test-secret-do-not-use-in-prod";
  process.env.ADMIN_PASSWORD = "correct horse battery staple";
});

describe("rate limiter", () => {
  it("allows up to MAX_ATTEMPTS, then limits", () => {
    const key = "k-basic";
    const t0 = 1_000_000;
    for (let i = 0; i < RATE_LIMIT_MAX_ATTEMPTS; i++) {
      expect(checkRateLimit(key, t0).limited).toBe(false);
      recordFailure(key, t0);
    }
    const blocked = checkRateLimit(key, t0);
    expect(blocked.limited).toBe(true);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("resets after the window expires", () => {
    const key = "k-window";
    const t0 = 5_000_000;
    for (let i = 0; i < RATE_LIMIT_MAX_ATTEMPTS; i++) recordFailure(key, t0);
    expect(checkRateLimit(key, t0).limited).toBe(true);
    // jump past the window
    expect(checkRateLimit(key, t0 + RATE_LIMIT_WINDOW_MS + 1).limited).toBe(false);
  });

  it("resetRateLimit clears the counter (successful login)", () => {
    const key = "k-reset";
    const t0 = 9_000_000;
    for (let i = 0; i < RATE_LIMIT_MAX_ATTEMPTS; i++) recordFailure(key, t0);
    expect(checkRateLimit(key, t0).limited).toBe(true);
    resetRateLimit(key);
    expect(checkRateLimit(key, t0).limited).toBe(false);
  });
});

describe("login route is rate limited", () => {
  function loginReq(ip: string, password: string) {
    return new NextRequest("http://localhost/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: JSON.stringify({ password }),
    });
  }

  it("returns 429 once the attempt threshold is exceeded for an IP", async () => {
    const { POST } = await import("@/app/api/admin/login/route");
    const ip = "203.0.113.7"; // unique IP so this bucket is isolated
    let last = 200;
    for (let i = 0; i < RATE_LIMIT_MAX_ATTEMPTS; i++) {
      const res = await POST(loginReq(ip, "wrong"));
      expect(res.status).toBe(401); // wrong password, but not yet limited
    }
    const res = await POST(loginReq(ip, "wrong"));
    last = res.status;
    expect(last).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
  });

  it("a correct login clears the limiter for that IP", async () => {
    const { POST } = await import("@/app/api/admin/login/route");
    const ip = "203.0.113.8";
    for (let i = 0; i < 3; i++) await POST(loginReq(ip, "wrong"));
    const ok = await POST(loginReq(ip, "correct horse battery staple"));
    expect(ok.status).toBe(200);
    // counter cleared -> a subsequent wrong attempt is 401, not 429
    const after = await POST(loginReq(ip, "wrong"));
    expect(after.status).toBe(401);
  });
});
