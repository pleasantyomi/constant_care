import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { db, schema } from "@/lib/db";
import { applicationSchema } from "@/lib/validation";
import {
  sendApplicationNotification,
  sendApplicationConfirmation,
} from "@/lib/email/mailer";

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Some browsers hand back multipart filenames with characters (spaces,
// unicode) already percent-encoded as literal text — e.g. "resume%20.pdf"
// instead of "resume .pdf". Using that raw string as part of a Blob
// pathname causes the SDK to encode it *again* when building the blob's
// URL, so the resulting URL doesn't match what get() looks up and
// downloads fail with "not found" even though the file exists. Stripping
// to a safe character set for the storage key sidesteps the whole
// encoding question; the original filename is preserved separately for
// the download's Content-Disposition header.
function sanitizeFilenameForPathname(name: string) {
  return (
    name
      .normalize("NFKD")
      .replace(/[^\w.-]+/g, "-")
      .replace(/-+/g, "-") || "resume"
  );
}

// The display name (used in the download's Content-Disposition header)
// should show the human-readable filename rather than the raw
// pre-encoded string, so decode it back to a normal string where possible.
function decodeDisplayFilename(name: string) {
  try {
    return decodeURIComponent(name);
  } catch {
    return name;
  }
}

export async function POST(request: Request) {
  if (!db) {
    return NextResponse.json(
      { error: "The database isn't configured yet. Please try again later." },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const parsed = applicationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    position: formData.get("position"),
    message: formData.get("message"),
  });
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid submission" },
      { status: 400 },
    );
  }
  const { name, email, phone, position, message } = parsed.data;

  const resume = formData.get("resume");
  // Stores the blob's pathname, not a public URL — the store is private
  // (resumes are personal documents, so they shouldn't be fetchable by
  // anyone who has the link). Admins retrieve it through the authenticated
  // /api/admin/resume route, which re-fetches it from Blob server-side.
  let resumePathname: string | null = null;
  let resumeFilename: string | null = null;

  if (resume instanceof File && resume.size > 0) {
    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { error: "Resume must be under 5MB." },
        { status: 400 },
      );
    }
    if (!ALLOWED_TYPES.includes(resume.type)) {
      return NextResponse.json(
        { error: "Resume must be a PDF or Word document." },
        { status: 400 },
      );
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        {
          error:
            "Resume uploads aren't configured yet. Please apply without a resume for now, or contact us directly.",
        },
        { status: 503 },
      );
    }

    const safeName = sanitizeFilenameForPathname(resume.name);
    const blob = await put(`resumes/${Date.now()}-${safeName}`, resume, {
      access: "private",
    });
    resumePathname = blob.pathname;
    resumeFilename = decodeDisplayFilename(resume.name);
  }

  await db.insert(schema.applications).values({
    name,
    email,
    phone,
    position: position || null,
    resumeUrl: resumePathname,
    resumeFilename,
    message: message || null,
  });

  try {
    await sendApplicationNotification({
      name,
      email,
      phone,
      position,
      resumeUrl: resumePathname ? "Attached — view in the admin panel" : null,
      message,
    });
  } catch (error) {
    console.error("Failed to send application notification email:", error);
  }
  try {
    await sendApplicationConfirmation({ name, email, position });
  } catch (error) {
    console.error("Failed to send application confirmation email:", error);
  }

  return NextResponse.json({ ok: true });
}
