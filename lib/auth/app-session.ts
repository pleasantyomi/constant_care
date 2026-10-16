import "server-only";
import { createHash, randomBytes, randomInt, timingSafeEqual } from "node:crypto";
import { and, desc, eq, gt, isNull } from "drizzle-orm";
import { db, schema } from "@/lib/db";

// Sign-in for the mobile app: a 6-digit code emailed to the person, then a
// bearer token stored on the device (the web admin's cookie sessions don't
// fit a native app). Only hashes of codes and tokens are stored.
//
// Roles: "referrer" today (anyone who has sent us a referral from that email
// address). Family and caregiver roles come in later stages.

const CODE_TTL_MS = 10 * 60 * 1000;
const MAX_CODE_ATTEMPTS = 5;
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export type AppRole = "referrer";
export type AppSession = { id: string; email: string; role: AppRole };

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

// Codes are short, so mix in the server secret: a leaked table can't be
// brute-forced offline.
function hashCode(email: string, code: string) {
  return sha256(`${process.env.SESSION_SECRET ?? ""}:${email}:${code}`);
}

/** Creates a fresh code for the email (replacing older ones) and returns it. */
export async function issueSignInCode(email: string) {
  if (!db) throw new Error("Database not configured");
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  await db.delete(schema.authCodes).where(eq(schema.authCodes.email, email));
  await db.insert(schema.authCodes).values({
    email,
    codeHash: hashCode(email, code),
    expiresAt: new Date(Date.now() + CODE_TTL_MS),
  });
  return code;
}

/** Checks a code; on success returns a new session token, else null. */
export async function redeemSignInCode(email: string, code: string, role: AppRole) {
  if (!db) throw new Error("Database not configured");
  const [row] = await db
    .select()
    .from(schema.authCodes)
    .where(
      and(
        eq(schema.authCodes.email, email),
        isNull(schema.authCodes.usedAt),
        gt(schema.authCodes.expiresAt, new Date()),
      ),
    )
    .orderBy(desc(schema.authCodes.createdAt))
    .limit(1);
  if (!row || row.attempts >= MAX_CODE_ATTEMPTS) return null;

  const expected = Buffer.from(row.codeHash, "hex");
  const actual = Buffer.from(hashCode(email, code), "hex");
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    await db
      .update(schema.authCodes)
      .set({ attempts: row.attempts + 1 })
      .where(eq(schema.authCodes.id, row.id));
    return null;
  }

  await db
    .update(schema.authCodes)
    .set({ usedAt: new Date() })
    .where(eq(schema.authCodes.id, row.id));

  const token = randomBytes(32).toString("base64url");
  await db.insert(schema.appSessions).values({
    tokenHash: sha256(token),
    email,
    role,
    expiresAt: new Date(Date.now() + SESSION_TTL_MS),
  });
  return token;
}

function bearerToken(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(\S+)$/i.exec(header);
  return match?.[1] ?? null;
}

/** The signed-in app user for this request, or null. */
export async function getAppSession(request: Request): Promise<AppSession | null> {
  const token = bearerToken(request);
  if (!token || !db) return null;
  const [session] = await db
    .select()
    .from(schema.appSessions)
    .where(
      and(
        eq(schema.appSessions.tokenHash, sha256(token)),
        isNull(schema.appSessions.revokedAt),
        gt(schema.appSessions.expiresAt, new Date()),
      ),
    )
    .limit(1);
  if (!session) return null;

  // Record activity at most once an hour.
  if (Date.now() - session.lastUsedAt.getTime() > 60 * 60 * 1000) {
    await db
      .update(schema.appSessions)
      .set({ lastUsedAt: new Date() })
      .where(eq(schema.appSessions.id, session.id));
  }
  return { id: session.id, email: session.email, role: session.role as AppRole };
}

export async function revokeAppSession(request: Request) {
  const token = bearerToken(request);
  if (!token || !db) return;
  await db
    .update(schema.appSessions)
    .set({ revokedAt: new Date() })
    .where(eq(schema.appSessions.tokenHash, sha256(token)));
}
