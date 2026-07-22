import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// `db` is null when DATABASE_URL isn't configured (e.g. local dev before
// provisioning, or this sandbox's build) so importing this module never
// crashes the build. Every caller must handle the null case — public pages
// fall back to sensible defaults, API routes return a clear 500.
function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return drizzle(neon(url), { schema });
}

export const db = createDb();
export { schema };
