import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation";
import {
  sendContactNotification,
  sendContactConfirmation,
} from "@/lib/email/mailer";

export async function POST(request: Request) {
  if (!db) {
    return NextResponse.json(
      { error: "The database isn't configured yet. Please try again later." },
      { status: 503 },
    );
  }

  const limited = await checkRateLimit(request, "contact");
  if (limited) return limited;

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid submission" },
      { status: 400 },
    );
  }

  const { name, email, phone, service, message } = parsed.data;

  await db.insert(schema.contactMessages).values({
    name,
    email,
    phone: phone || null,
    service: service || null,
    message,
  });

  // Best-effort: the message is safely stored even if the email fails.
  try {
    await sendContactNotification({ name, email, phone, service, message });
  } catch (error) {
    console.error("Failed to send contact notification email:", error);
  }
  try {
    await sendContactConfirmation({ name, email });
  } catch (error) {
    console.error("Failed to send contact confirmation email:", error);
  }

  return NextResponse.json({ ok: true });
}
