// One-off script to create an admin account. There's no public signup
// form by design — admins are provisioned by whoever holds the database
// credentials. Run with:
//
//   npx tsx scripts/create-admin.ts "you@example.com" "a-strong-password" "Your Name"

import { db, schema } from "../lib/db";
import { hashPassword } from "../lib/auth/password";

async function main() {
  const [email, password, name] = process.argv.slice(2);

  if (!email || !password || !name) {
    console.error(
      'Usage: npx tsx scripts/create-admin.ts "you@example.com" "password" "Your Name"',
    );
    process.exit(1);
  }
  if (!db) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  const [user] = await db
    .insert(schema.adminUsers)
    .values({ email, passwordHash, name })
    .returning({ id: schema.adminUsers.id, email: schema.adminUsers.email });

  console.log(`Created admin user ${user.email} (${user.id})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
