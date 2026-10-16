"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  HandHeart,
  FileText,
  Briefcase,
  BarChart3,
  Users,
  PhoneCall,
  UsersRound,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/referrals", label: "Referrals", icon: HandHeart },
  { href: "/admin/callbacks", label: "Callbacks", icon: PhoneCall },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/openings", label: "Job Openings", icon: Briefcase },
  { href: "/admin/impact", label: "Impact Stats", icon: BarChart3 },
  { href: "/admin/team", label: "Team Members", icon: UsersRound },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
];

export default function SidebarNav({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="grid gap-1">
      {links.map((link) => {
        const isActive =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-accent text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white",
            )}
          >
            <link.icon className="w-4 h-4" aria-hidden />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
