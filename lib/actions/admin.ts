"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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
