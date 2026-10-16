import { asc, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { v1Json, v1Unavailable } from "@/lib/api/v1";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!db) return v1Unavailable();

  const stats = await db
    .select({
      id: schema.impactStats.id,
      label: schema.impactStats.label,
      value: schema.impactStats.value,
    })
    .from(schema.impactStats)
    .where(eq(schema.impactStats.isActive, true))
    .orderBy(asc(schema.impactStats.displayOrder));

  return v1Json({ stats });
}
