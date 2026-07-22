import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "./session";

/**
 * Verifies the admin session inside the Server Action/route itself.
 * proxy.ts already gates /admin/* pages, but per Next's own guidance a
 * matcher change can silently stop covering a Server Function — every
 * mutation must check this independently rather than trusting proxy alone.
 */
export async function requireAdminSession() {
  const cookieStore = await cookies();
  const session = await verifySessionToken(
    cookieStore.get(SESSION_COOKIE)?.value,
  );
  if (!session) throw new Error("Not authenticated");
  return session;
}
