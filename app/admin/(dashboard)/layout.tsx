import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";
import SidebarNav from "@/components/admin/sidebar-nav";
import LogoutButton from "@/components/admin/logout-button";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defense in depth — proxy.ts already gates /admin/*, but a Server
  // Component check here means this layout is safe even if proxy config
  // ever drifts out of sync with the route tree.
  const cookieStore = await cookies();
  const session = await verifySessionToken(
    cookieStore.get(SESSION_COOKIE)?.value,
  );
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-svh bg-secondary/20">
      <aside className="flex flex-col w-64 p-5 shrink-0 bg-primary">
        <Link href="/admin" className="flex items-center gap-2 px-1 mb-8">
          <Image
            src="/logo/CCFSI_ICON_C.png"
            alt=""
            aria-hidden
            width={32}
            height={32}
            className="w-7 h-auto"
          />
          <span className="text-sm font-bold text-white">
            Constant Care Admin
          </span>
        </Link>

        <SidebarNav />

        <div className="pt-4 mt-auto border-t border-white/15">
          <p className="px-3 mb-1 text-xs truncate text-white/50">
            {session.email}
          </p>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-8">{children}</main>
    </div>
  );
}
