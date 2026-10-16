import { asc, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { v1Json, v1Unavailable } from "@/lib/api/v1";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!db) return v1Unavailable();

  const openings = await db
    .select({
      id: schema.jobOpenings.id,
      title: schema.jobOpenings.title,
      category: schema.jobOpenings.category,
      location: schema.jobOpenings.location,
    })
    .from(schema.jobOpenings)
    .where(eq(schema.jobOpenings.isActive, true))
    .orderBy(asc(schema.jobOpenings.displayOrder));

  return v1Json({ openings });
}
