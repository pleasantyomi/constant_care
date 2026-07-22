// Resets an existing admin's password. Run with:
//
//   npx tsx scripts/set-admin-password.ts "you@example.com" "new-password"

import { eq } from "drizzle-orm";
import { db, schema } from "../lib/db";
import { hashPassword } from "../lib/auth/password";

async function main() {
  const [email, password] = process.argv.slice(2);

  if (!email || !password) {
    console.error(
      'Usage: npx tsx scripts/set-admin-password.ts "you@example.com" "new-password"',
    );
    process.exit(1);
  }
  if (!db) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  const [user] = await db
    .update(schema.adminUsers)
    .set({ passwordHash })
    .where(eq(schema.adminUsers.email, email))
    .returning({ id: schema.adminUsers.id, email: schema.adminUsers.email });

  if (!user) {
    console.error(`No admin user found with email ${email}`);
    process.exit(1);
  }

  console.log(`Updated password for ${user.email} (${user.id})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
