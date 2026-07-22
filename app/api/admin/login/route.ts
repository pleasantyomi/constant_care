import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth/session";

export async function POST(request: Request) {
  if (!db) {
    return NextResponse.json(
      { error: "The database isn't configured yet." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  const [user] = await db
    .select()
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.email, email))
    .limit(1);

  // Constant-shaped error for both "no such user" and "wrong password" so
  // the response doesn't reveal which one failed.
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 },
    );
  }

  const token = await createSessionToken({ id: user.id, email: user.email });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
