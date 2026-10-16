"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import { db, schema } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth/require-admin";

// --- Submission status updates -------------------------------------------

export async function updateMessageStatus(id: string, status: string) {
  await requireAdminSession();
  if (!db) throw new Error("Database not configured");
  await db
    .update(schema.contactMessages)
    .set({ status })
    .where(eq(schema.contactMessages.id, id));
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function updateReferralStatus(id: string, status: string) {
  await requireAdminSession();
  if (!db) throw new Error("Database not configured");
  await db
    .update(schema.referrals)
    .set({ status })
    .where(eq(schema.referrals.id, id));
  revalidatePath("/admin/referrals");
  revalidatePath("/admin");
}

export async function updateApplicationStatus(id: string, status: string) {
  await requireAdminSession();
  if (!db) throw new Error("Database not configured");
  await db
    .update(schema.applications)
    .set({ status })
    .where(eq(schema.applications.id, id));
  revalidatePath("/admin/applications");
  revalidatePath("/admin");
}

// --- Job openings ---------------------------------------------------------

export async function createOpening(formData: FormData) {
  await requireAdminSession();
  if (!db) throw new Error("Database not configured");

  await db.insert(schema.jobOpenings).values({
    title: String(formData.get("title") || ""),
    category: String(formData.get("category") || ""),
    location: String(formData.get("location") || "New Brunswick"),
    isActive: formData.get("isActive") === "on",
    displayOrder: Number(formData.get("displayOrder") || 0),
  });
  revalidatePath("/admin/openings");
  revalidatePath("/careers");
}

export async function updateOpening(id: string, formData: FormData) {
  await requireAdminSession();
  if (!db) throw new Error("Database not configured");

  await db
    .update(schema.jobOpenings)
    .set({
      title: String(formData.get("title") || ""),
      category: String(formData.get("category") || ""),
      location: String(formData.get("location") || "New Brunswick"),
      isActive: formData.get("isActive") === "on",
      displayOrder: Number(formData.get("displayOrder") || 0),
      updatedAt: new Date(),
    })
    .where(eq(schema.jobOpenings.id, id));
  revalidatePath("/admin/openings");
  revalidatePath("/careers");
}

export async function deleteOpening(id: string) {
  await requireAdminSession();
  if (!db) throw new Error("Database not configured");

  await db.delete(schema.jobOpenings).where(eq(schema.jobOpenings.id, id));
  revalidatePath("/admin/openings");
  revalidatePath("/careers");
}

// --- Impact stats -----------------------------------------------------

export async function createImpactStat(formData: FormData) {
  await requireAdminSession();
  if (!db) throw new Error("Database not configured");

  await db.insert(schema.impactStats).values({
    label: String(formData.get("label") || ""),
    value: String(formData.get("value") || ""),
    isActive: formData.get("isActive") === "on",
    displayOrder: Number(formData.get("displayOrder") || 0),
  });
  revalidatePath("/admin/impact");
  revalidatePath("/about-us");
}

export async function updateImpactStat(id: string, formData: FormData) {
  await requireAdminSession();
  if (!db) throw new Error("Database not configured");

  await db
    .update(schema.impactStats)
    .set({
      label: String(formData.get("label") || ""),
      value: String(formData.get("value") || ""),
      isActive: formData.get("isActive") === "on",
      displayOrder: Number(formData.get("displayOrder") || 0),
      updatedAt: new Date(),
    })
    .where(eq(schema.impactStats.id, id));
  revalidatePath("/admin/impact");
  revalidatePath("/about-us");
}

export async function deleteImpactStat(id: string) {
  await requireAdminSession();
  if (!db) throw new Error("Database not configured");

  await db.delete(schema.impactStats).where(eq(schema.impactStats.id, id));
  revalidatePath("/admin/impact");
  revalidatePath("/about-us");
}

// --- Team members -----------------------------------------------------

const MAX_PHOTO_BYTES = 3 * 1024 * 1024; // 3MB, under Vercel's 4.5MB request cap
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Returns the uploaded blob's pathname, or null when no file was chosen.
async function uploadTeamPhoto(formData: FormData) {
  const photo = formData.get("photo");
  if (!(photo instanceof File) || photo.size === 0) return null;

  if (photo.size > MAX_PHOTO_BYTES) throw new Error("Photo must be under 3MB");
  if (!ALLOWED_PHOTO_TYPES.includes(photo.type)) {
    throw new Error("Photo must be a JPG, PNG, or WebP image");
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Photo uploads aren't configured (BLOB_READ_WRITE_TOKEN)");
  }

  // The Blob store is private (it also holds resumes), so photos are
  // served through /api/team/photo, which only reads paths stored here.
  const extension = photo.type === "image/jpeg" ? "jpg" : photo.type.split("/")[1];
  const blob = await put(`team/${Date.now()}.${extension}`, photo, {
    access: "private",
  });
  return blob.pathname;
}

async function deleteTeamPhoto(pathname: string | null) {
  if (!pathname) return;
  try {
    await del(pathname);
  } catch (error) {
    // An orphaned blob isn't worth failing the admin's edit over.
    console.error("Failed to delete team photo:", error);
  }
}

function teamMemberFields(formData: FormData) {
  return {
    name: String(formData.get("name") || ""),
    role: String(formData.get("role") || ""),
    bio: String(formData.get("bio") || ""),
    isActive: formData.get("isActive") === "on",
    displayOrder: Number(formData.get("displayOrder") || 0),
  };
}

export async function createTeamMember(formData: FormData) {
  await requireAdminSession();
  if (!db) throw new Error("Database not configured");

  const photoPathname = await uploadTeamPhoto(formData);
  await db
    .insert(schema.teamMembers)
    .values({ ...teamMemberFields(formData), photoPathname });
  revalidatePath("/admin/team");
  revalidatePath("/our-team");
}

export async function updateTeamMember(id: string, formData: FormData) {
  await requireAdminSession();
  if (!db) throw new Error("Database not configured");

  const [existing] = await db
    .select({ photoPathname: schema.teamMembers.photoPathname })
    .from(schema.teamMembers)
    .where(eq(schema.teamMembers.id, id))
    .limit(1);
  if (!existing) throw new Error("Team member not found");

  const newPhoto = await uploadTeamPhoto(formData);
  const removePhoto = formData.get("removePhoto") === "on";
  const photoPathname =
    newPhoto ?? (removePhoto ? null : existing.photoPathname);

  await db
    .update(schema.teamMembers)
    .set({ ...teamMemberFields(formData), photoPathname, updatedAt: new Date() })
    .where(eq(schema.teamMembers.id, id));

  if (photoPathname !== existing.photoPathname) {
    await deleteTeamPhoto(existing.photoPathname);
  }
  revalidatePath("/admin/team");
  revalidatePath("/our-team");
}

export async function deleteTeamMember(id: string) {
  await requireAdminSession();
  if (!db) throw new Error("Database not configured");

  const [deleted] = await db
    .delete(schema.teamMembers)
    .where(eq(schema.teamMembers.id, id))
    .returning({ photoPathname: schema.teamMembers.photoPathname });
  await deleteTeamPhoto(deleted?.photoPathname ?? null);
  revalidatePath("/admin/team");
  revalidatePath("/our-team");
}

// --- Callback requests (from the app) -------------------------------------

export async function updateCallbackStatus(id: string, status: string) {
  await requireAdminSession();
  if (!db) throw new Error("Database not configured");
  await db
    .update(schema.callbackRequests)
    .set({ status })
    .where(eq(schema.callbackRequests.id, id));
  revalidatePath("/admin/callbacks");
  revalidatePath("/admin");
}

// --- Referrer-facing progress note -----------------------------------------

export async function updateReferrerUpdate(id: string, formData: FormData) {
  await requireAdminSession();
  if (!db) throw new Error("Database not configured");
  const update = String(formData.get("referrerUpdate") || "").trim().slice(0, 500);
  await db
    .update(schema.referrals)
    .set({ referrerUpdate: update || null, referrerUpdateAt: update ? new Date() : null })
    .where(eq(schema.referrals.id, id));
  revalidatePath(`/admin/referrals/${id}`);
}
