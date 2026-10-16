import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { signInCodeSchema } from "@/lib/validation";
import { redeemSignInCode } from "@/lib/auth/app-session";

// Step 2 of app sign-in: exchange the emailed code for a session token,
// which the app keeps in the device's secure storage.
export async function POST(request: Request) {
  if (!db) {
    return NextResponse.json({ error: "The database isn't configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const parsed = signInCodeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid code" },
      { status: 400 },
    );
  }
  const { email, code } = parsed.data;

  const token = await redeemSignInCode(email, code, "referrer");
  if (!token) {
    return NextResponse.json(
      { error: "That code didn't work. Check it, or request a new one." },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { token, email, role: "referrer" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
