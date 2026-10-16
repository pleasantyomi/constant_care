import { NextResponse } from "next/server";
import { desc, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { getAppSession } from "@/lib/auth/app-session";

// The signed-in referrer's referrals, for the app's tracker. Deliberately
// minimal: client initials, service, urgency, status, and the office's
// update — never the client's details or the reason for referral.
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => `${part[0]?.toUpperCase()}.`)
    .join("");
}

export async function GET(request: Request) {
  if (!db) {
    return NextResponse.json({ error: "The database isn't configured." }, { status: 503 });
  }
  const session = await getAppSession(request);
  if (!session || session.role !== "referrer") {
    return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  }

  const rows = await db
    .select()
    .from(schema.referrals)
    .where(sql`lower(${schema.referrals.referrerEmail}) = ${session.email}`)
    .orderBy(desc(schema.referrals.createdAt));

  return NextResponse.json(
    {
      email: session.email,
      organization: rows.find((row) => row.organization)?.organization ?? null,
      referrals: rows.map((row) => ({
        id: row.id,
        clientInitials: initials(row.clientName),
        service: row.service,
        urgency: row.urgency,
        status: row.status,
        createdAt: row.createdAt.toISOString(),
        update: row.referrerUpdate,
        updatedAt: row.referrerUpdateAt?.toISOString() ?? null,
      })),
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
