import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { signInEmailSchema } from "@/lib/validation";
import { issueSignInCode } from "@/lib/auth/app-session";
import { sendSignInCode } from "@/lib/email/mailer";

// Step 1 of app sign-in: email a 6-digit code. Only addresses that have sent
// us a referral can sign in for now (the referral tracker). The response is
// the same either way, so it can't be used to discover who has referred.
export async function POST(request: Request) {
  if (!db) {
    return NextResponse.json({ error: "The database isn't configured." }, { status: 503 });
  }

  const limited = await checkRateLimit(request, "sign-in");
  if (limited) return limited;

  const body = await request.json().catch(() => null);
  const parsed = signInEmailSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Enter a valid email" },
      { status: 400 },
    );
  }
  const { email } = parsed.data;

  const [match] = await db
    .select({ id: schema.referrals.id })
    .from(schema.referrals)
    .where(sql`lower(${schema.referrals.referrerEmail}) = ${email}`)
    .limit(1);

  if (match) {
    const code = await issueSignInCode(email);
    try {
      await sendSignInCode({ email, code });
    } catch (error) {
      console.error("Failed to send sign-in code:", error);
      return NextResponse.json(
        { error: "We couldn't send the code just now. Please try again." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
