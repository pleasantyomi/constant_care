import { NextResponse } from "next/server";
import { revokeAppSession } from "@/lib/auth/app-session";

export async function POST(request: Request) {
  await revokeAppSession(request);
  return NextResponse.json({ ok: true });
}
