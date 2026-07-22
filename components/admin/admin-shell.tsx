"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import SidebarNav from "./sidebar-nav";
import LogoutButton from "./logout-button";

function SidebarContent({
  email,
  onNavigate,
}: {
  email: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <Link
        href="/admin"
        onClick={onNavigate}
        className="flex items-center gap-2 px-1 mb-8"
      >
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

      <SidebarNav onNavigate={onNavigate} />

      <div className="pt-4 mt-auto border-t border-white/15">
        <p className="px-3 mb-1 text-xs truncate text-white/50">{email}</p>
        <LogoutButton />
      </div>
    </>
  );
}

export default function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-svh bg-secondary/20">
      {/* Desktop sidebar */}
      <aside className="flex-col hidden w-64 p-5 shrink-0 bg-primary lg:flex">
        <SidebarContent email={email} />
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between h-14 px-4 border-b lg:hidden bg-primary border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/logo/CCFSI_ICON_C.png"
            alt=""
            aria-hidden
            width={28}
            height={28}
            className="w-6 h-auto"
          />
          <span className="text-sm font-bold text-white">
            Constant Care Admin
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="p-2 -mr-2 text-white cursor-pointer"
        >
          <Menu className="w-5 h-5" aria-hidden />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 cursor-default bg-black/40"
          />
          <aside className="relative flex flex-col w-64 h-full p-5 bg-primary">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute p-2 text-white cursor-pointer top-4 right-4"
            >
              <X className="w-5 h-5" aria-hidden />
            </button>
            <SidebarContent
              email={email}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      <main className="flex-1 min-w-0 p-4 pt-20 sm:p-6 lg:p-8 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
