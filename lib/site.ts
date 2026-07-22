// Shared site URL, used anywhere an absolute URL is required (email image
// sources, Open Graph tags). Falls back to the current Vercel deployment
// so this never breaks in preview environments that lack the env var.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://constant-care.vercel.app"
).replace(/\/$/, "");
