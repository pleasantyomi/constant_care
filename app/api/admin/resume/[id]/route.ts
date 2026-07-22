import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { get } from "@vercel/blob";
import { db, schema } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth/require-admin";

// Resumes live in a private Blob store, so they can't be linked to
// directly — this route verifies the admin session, then re-fetches the
// file from Blob server-side (using BLOB_READ_WRITE_TOKEN) and streams it
// back, rather than exposing a public URL for a personal document.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id } = await params;
  const [application] = await db
    .select()
    .from(schema.applications)
    .where(eq(schema.applications.id, id))
    .limit(1);

  if (!application?.resumeUrl) {
    return NextResponse.json({ error: "No resume on file" }, { status: 404 });
  }

  const blob = await get(application.resumeUrl, { access: "private" });
  if (!blob) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  return new Response(blob.stream, {
    headers: {
      "Content-Type": blob.headers.get("content-type") || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${application.resumeFilename || "resume"}"`,
    },
  });
}
