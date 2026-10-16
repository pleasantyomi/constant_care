import "server-only";
import { lt, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";

// Per-IP submission limits for the public form routes, stored in Postgres
// (no extra service needed). Fails open: if the check itself errors, the
// submission goes through — a broken limiter must never block a referral.

const limits = {
  contact: { max: 5, windowMinutes: 10 },
  referrals: { max: 5, windowMinutes: 10 },
  applications: { max: 5, windowMinutes: 60 },
  newsletter: { max: 5, windowMinutes: 10 },
  callbacks: { max: 3, windowMinutes: 30 },
  // Sign-in codes: per IP. Each code also allows only 5 guesses.
  "sign-in": { max: 5, windowMinutes: 15 },
} as const;

export type RateLimitedForm = keyof typeof limits;

function clientIp(request: Request) {
  // Vercel sets x-forwarded-for; the first entry is the client.
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

// Returns a 429 response when the client is over the limit, otherwise null.
export async function checkRateLimit(request: Request, form: RateLimitedForm) {
  if (!db) return null;
  const { max, windowMinutes } = limits[form];
  const key = `${form}:${clientIp(request)}`;
  const windowExpired = sql`${schema.rateLimits.windowStart} < now() - make_interval(mins => ${windowMinutes})`;

  try {
    const [row] = await db
      .insert(schema.rateLimits)
      .values({ key, count: 1 })
      .onConflictDoUpdate({
        target: schema.rateLimits.key,
        set: {
          count: sql`case when ${windowExpired} then 1 else ${schema.rateLimits.count} + 1 end`,
          windowStart: sql`case when ${windowExpired} then now() else ${schema.rateLimits.windowStart} end`,
        },
      })
      .returning({ count: schema.rateLimits.count });

    // Occasionally clear out stale rows so the table stays small.
    if (Math.random() < 0.02) {
      await db
        .delete(schema.rateLimits)
        .where(lt(schema.rateLimits.windowStart, sql`now() - interval '1 day'`));
    }

    if (row && row.count > max) {
      return NextResponse.json(
        {
          error:
            "You've sent several submissions in a short time. Please wait a few minutes and try again, or call us directly.",
        },
        { status: 429 },
      );
    }
  } catch (error) {
    console.error("Rate limit check failed (allowing request):", error);
  }
  return null;
}
