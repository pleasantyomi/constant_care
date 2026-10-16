import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { callbackSchema } from "@/lib/validation";
import { sendCallbackNotification } from "@/lib/email/mailer";

// "Book a free callback" from the app. Stores the request and emails the
// office; staff manage it under /admin/callbacks.
export async function POST(request: Request) {
  if (!db) {
    return NextResponse.json(
      { error: "The database isn't configured yet. Please try again later." },
      { status: 503 },
    );
  }

  const limited = await checkRateLimit(request, "callbacks");
  if (limited) return limited;

  const body = await request.json().catch(() => null);
  const parsed = callbackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid request" },
      { status: 400 },
    );
  }
  const { name, phone, preferredDate, preferredTime, note, careFinder } = parsed.data;

  await db.insert(schema.callbackRequests).values({
    name,
    phone,
    preferredDate,
    preferredTime,
    note: note || null,
    careFinder: careFinder || null,
  });

  try {
    await sendCallbackNotification({ name, phone, preferredDate, preferredTime, note, careFinder });
  } catch (error) {
    console.error("Failed to send callback notification email:", error);
  }

  return NextResponse.json({ ok: true });
}
