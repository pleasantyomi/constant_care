import Link from "next/link";
import { eq, count } from "drizzle-orm";
import { Mail, HandHeart, FileText } from "lucide-react";
import { db, schema } from "@/lib/db";

async function getCounts() {
  if (!db) return null;

  const [messages, newMessages, referrals, newReferrals, applications, newApplications] =
    await Promise.all([
      db.select({ value: count() }).from(schema.contactMessages),
      db
        .select({ value: count() })
        .from(schema.contactMessages)
        .where(eq(schema.contactMessages.status, "new")),
      db.select({ value: count() }).from(schema.referrals),
      db
        .select({ value: count() })
        .from(schema.referrals)
        .where(eq(schema.referrals.status, "new")),
      db.select({ value: count() }).from(schema.applications),
      db
        .select({ value: count() })
        .from(schema.applications)
        .where(eq(schema.applications.status, "new")),
    ]);

  return {
    messages: messages[0].value,
    newMessages: newMessages[0].value,
    referrals: referrals[0].value,
    newReferrals: newReferrals[0].value,
    applications: applications[0].value,
    newApplications: newApplications[0].value,
  };
}

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const cards = [
    {
      href: "/admin/messages",
      label: "Contact Messages",
      icon: Mail,
      total: counts?.messages ?? 0,
      unread: counts?.newMessages ?? 0,
    },
    {
      href: "/admin/referrals",
      label: "Referrals",
      icon: HandHeart,
      total: counts?.referrals ?? 0,
      unread: counts?.newReferrals ?? 0,
    },
    {
      href: "/admin/applications",
      label: "Applications",
      icon: FileText,
      total: counts?.applications ?? 0,
      unread: counts?.newApplications ?? 0,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Overview of activity across the site.
      </p>

      {!db && (
        <p className="p-4 mt-6 text-sm border rounded-lg border-destructive/30 bg-destructive/5 text-destructive">
          The database isn&rsquo;t configured (DATABASE_URL is missing), so
          nothing below reflects real data yet.
        </p>
      )}

      <div className="grid gap-4 mt-6 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="p-5 transition-colors bg-white border rounded-lg shadow-sm border-border hover:border-accent"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center justify-center rounded-full h-10 w-10 bg-secondary">
                <card.icon className="w-5 h-5 text-primary" aria-hidden />
              </span>
              {card.unread > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold text-white rounded-full bg-accent">
                  {card.unread} new
                </span>
              )}
            </div>
            <p className="mt-4 text-2xl font-bold text-primary">
              {card.total}
            </p>
            <p className="text-sm text-muted-foreground">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
