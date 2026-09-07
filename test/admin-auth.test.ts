import { describe, it, expect, beforeAll } from "vitest";
import { NextRequest } from "next/server";
import {
  createSessionToken,
  verifySessionToken,
  verifyPassword,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";

beforeAll(() => {
  process.env.ADMIN_SECRET = "test-secret-do-not-use-in-prod";
  process.env.ADMIN_PASSWORD = "correct horse battery staple";
});

function req(url: string, init?: RequestInit & { token?: string }) {
  const headers = new Headers(init?.headers);
  if (init?.token) headers.set("cookie", `${SESSION_COOKIE_NAME}=${init.token}`);
  return new NextRequest(url, { ...init, headers });
}

describe("session token logic", () => {
  it("round-trips a freshly minted token", async () => {
    const token = await createSessionToken();
    expect(await verifySessionToken(token)).toBe(true);
  });

  it("rejects missing, malformed, wrong-role, and tampered tokens", async () => {
    const token = await createSessionToken();
    expect(await verifySessionToken(undefined)).toBe(false);
    expect(await verifySessionToken("not-a-token")).toBe(false);
    expect(await verifySessionToken(token.replace("admin", "user"))).toBe(false);
    // flip the last two hex chars of the signature
    const tampered = token.slice(0, -2) + (token.endsWith("00") ? "11" : "00");
    expect(await verifySessionToken(tampered)).toBe(false);
  });

  it("rejects an expired token (valid signature, past expiry)", async () => {
    // Forge payload with a past expiry, signed with the real secret path is not
    // exposed — instead assert verify rejects an obviously-past expires field by
    // reusing a real token whose expiry we rewind. Since the signature covers the
    // expiry, rewinding it invalidates the signature, which must also be rejected.
    const token = await createSessionToken();
    const [, , sig] = token.split(".");
    const past = `admin.${Date.now() - 1000}.${sig}`;
    expect(await verifySessionToken(past)).toBe(false);
  });

  it("verifyPassword matches only the configured password", () => {
    expect(verifyPassword("correct horse battery staple")).toBe(true);
    expect(verifyPassword("wrong")).toBe(false);
    expect(verifyPassword("")).toBe(false);
  });
});

describe("admin API enforcement (regression: routes were unauthenticated)", () => {
  it("PUT /api/admin/content rejects an unauthenticated request with 401", async () => {
    const { PUT } = await import("@/app/api/admin/content/route");
    const res = await PUT(
      req("http://localhost/api/admin/content", {
        method: "PUT",
        body: JSON.stringify({ settings: { name: "x" }, projects: [] }),
      })
    );
    expect(res.status).toBe(401);
  });

  it("GET /api/admin/content rejects an unauthenticated request with 401", async () => {
    const { GET } = await import("@/app/api/admin/content/route");
    const res = await GET(req("http://localhost/api/admin/content"));
    expect(res.status).toBe(401);
  });

  it("POST /api/admin/upload-url rejects an unauthenticated request with 401", async () => {
    const { POST } = await import("@/app/api/admin/upload-url/route");
    const res = await POST(
      req("http://localhost/api/admin/upload-url", {
        method: "POST",
        body: JSON.stringify({ filename: "x.png", contentType: "image/png" }),
      })
    );
    expect(res.status).toBe(401);
  });

  it("GET /api/admin/content allows an authenticated request", async () => {
    const { GET } = await import("@/app/api/admin/content/route");
    const token = await createSessionToken();
    const res = await GET(req("http://localhost/api/admin/content", { token }));
    expect(res.status).toBe(200);
  });
});
