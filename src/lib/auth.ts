import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

/**
 * Minimal, dependency-free admin session auth.
 *
 * A single shared admin password (env: ADMIN_PASSWORD) gates the dashboard.
 * On login we set a signed, httpOnly, expiring cookie (HMAC-SHA256 over the
 * expiry, using ADMIN_SESSION_SECRET). Verification happens server-side before
 * any admin page renders or any admin action runs — never client-side only.
 *
 * This is intentionally simple for a single-officer login. For multiple
 * accounts/roles, swap this for a real auth provider (e.g. Auth.js) later.
 */

const COOKIE = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === "production") {
    // Fail closed in production if not configured.
    throw new Error("ADMIN_SESSION_SECRET is not set (min 16 chars).");
  }
  return "dev-insecure-secret-change-me";
}

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "changeme";
}

function sign(value: string): string {
  return crypto.createHmac("sha256", secret()).update(value).digest("base64url");
}

function makeToken(): string {
  const exp = String(Date.now() + SESSION_TTL_MS);
  return `${exp}.${sign(exp)}`;
}

function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  const expected = sign(exp);
  // Constant-time compare to avoid signature timing leaks.
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  return Number(exp) > Date.now();
}

/** Constant-time password check. */
export function verifyPassword(candidate: string): boolean {
  const expected = adminPassword();
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createSession(): void {
  cookies().set(COOKIE, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export function destroySession(): void {
  cookies().delete(COOKIE);
}

export function isAdmin(): boolean {
  return verifyToken(cookies().get(COOKIE)?.value);
}

/** Redirect to the login page unless the caller has a valid admin session. */
export function requireAdmin(): void {
  if (!isAdmin()) redirect("/admin/login");
}
