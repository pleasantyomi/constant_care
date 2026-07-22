"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center w-full gap-2 px-3 py-2 text-sm text-left transition-colors rounded-md cursor-pointer text-white/70 hover:bg-white/10 hover:text-white"
    >
      <LogOut className="w-4 h-4" aria-hidden />
      Sign Out
    </button>
  );
}
