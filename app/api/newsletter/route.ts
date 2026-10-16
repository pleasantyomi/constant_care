import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { newsletterSchema } from "@/lib/validation";
import { sendNewsletterNotification } from "@/lib/email/mailer";

export async function POST(request: Request) {
  if (!db) {
    return NextResponse.json(
      { error: "This isn't configured yet. Please try again later." },
      { status: 503 },
    );
  }

  const limited = await checkRateLimit(request, "newsletter");
  if (limited) return limited;

  const body = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid email" },
      { status: 400 },
    );
  }

  const inserted = await db
    .insert(schema.newsletterSubscribers)
    .values({ email: parsed.data.email })
    .onConflictDoNothing()
    .returning({ id: schema.newsletterSubscribers.id });

  // Best-effort, and only for genuinely new subscribers (not re-signups).
  if (inserted.length > 0) {
    try {
      await sendNewsletterNotification({ email: parsed.data.email });
    } catch (error) {
      console.error("Failed to send newsletter notification email:", error);
    }
  }

  return NextResponse.json({ ok: true });
}
