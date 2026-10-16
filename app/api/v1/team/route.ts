import { asc, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { teamPhotoSrc } from "@/lib/team";
import { optimizedImageUrl, v1Json, v1Unavailable } from "@/lib/api/v1";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!db) return v1Unavailable();

  const members = await db
    .select()
    .from(schema.teamMembers)
    .where(eq(schema.teamMembers.isActive, true))
    .orderBy(asc(schema.teamMembers.displayOrder));

  return v1Json({
    members: members.map((member) => {
      const photo = teamPhotoSrc(member);
      return {
        id: member.id,
        name: member.name,
        role: member.role,
        bio: member.bio,
        photoUrl: photo ? optimizedImageUrl(photo, 640) : null,
      };
    }),
  });
}
