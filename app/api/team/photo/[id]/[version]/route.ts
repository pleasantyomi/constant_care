import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { get } from "@vercel/blob";
import { db, schema } from "@/lib/db";

// Team photos share the private Blob store with resumes, so this route is
// public but only ever serves the pathname stored on a team member row —
// it never takes a blob path from the request. The [version] segment is
// only there for cache-busting (see lib/team.ts), so responses can be
// cached as immutable.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; version: string }> },
) {
  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const [member] = await db
    .select({
      photoPathname: schema.teamMembers.photoPathname,
    })
    .from(schema.teamMembers)
    .where(eq(schema.teamMembers.id, id))
    .limit(1);

  if (!member?.photoPathname) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const blob = await get(member.photoPathname, { access: "private" });
  if (!blob) {
    return NextResponse.json({ error: "Photo not found" }, { status: 404 });
  }

  return new Response(blob.stream, {
    headers: {
      "Content-Type": blob.headers.get("content-type") || "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
