import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { referralSchema } from "@/lib/validation";
import {
  sendReferralNotification,
  sendReferralConfirmation,
} from "@/lib/email/mailer";

export async function POST(request: Request) {
  if (!db) {
    return NextResponse.json(
      { error: "The database isn't configured yet. Please try again later." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = referralSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid submission" },
      { status: 400 },
    );
  }

  const {
    referrerName,
    relationship,
    organization,
    referrerPhone,
    referrerEmail,
    clientName,
    clientContact,
    service,
    urgency,
    reason,
    notes,
  } = parsed.data;

  await db.insert(schema.referrals).values({
    referrerName,
    referrerRelationship: relationship,
    organization: organization || null,
    referrerPhone,
    referrerEmail,
    clientName,
    clientContact,
    service: service || null,
    urgency,
    reason,
    notes: notes || null,
    consent: true,
  });

  try {
    await sendReferralNotification({
      referrerName,
      referrerRelationship: relationship,
      organization,
      referrerPhone,
      referrerEmail,
      clientName,
      clientContact,
      service,
      urgency,
      reason,
      notes,
    });
  } catch (error) {
    console.error("Failed to send referral notification email:", error);
  }
  try {
    await sendReferralConfirmation({ referrerName, referrerEmail, clientName });
  } catch (error) {
    console.error("Failed to send referral confirmation email:", error);
  }

  return NextResponse.json({ ok: true });
}
