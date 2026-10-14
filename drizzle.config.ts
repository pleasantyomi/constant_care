import { defineConfig } from "drizzle-kit";

// drizzle-kit runs outside Next, so .env.local isn't loaded automatically —
// load it here so DATABASE_URL is set for the db:* scripts. Variables already
// in the environment take precedence, and a missing file (e.g. on Vercel,
// where env vars come from the project settings) is fine.
try {
  process.loadEnvFile(".env.local");
} catch {}

export default defineConfig({
  out: "./drizzle",
  schema: "./lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
