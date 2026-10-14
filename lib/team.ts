import type { schema } from "@/lib/db";

type TeamMember = typeof schema.teamMembers.$inferSelect;

// The version segment changes whenever the member is edited, so a replaced
// photo gets a fresh URL instead of a stale cached one. It's a path segment
// rather than a ?v= query because next/image rejects query strings on local
// sources unless images.localPatterns is configured.
export function teamPhotoSrc(member: TeamMember) {
  if (!member.photoPathname) return null;
  return `/api/team/photo/${member.id}/${member.updatedAt.getTime()}`;
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
