import Link from "next/link";
import { desc } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import StatusBadge from "@/components/admin/status-badge";

export const dynamic = "force-dynamic";

export default async function ReferralsPage() {
  const referrals = db
    ? await db
        .select()
        .from(schema.referrals)
        .orderBy(desc(schema.referrals.createdAt))
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Referrals</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {referrals.length} total
      </p>

      <div className="mt-6 overflow-hidden bg-white border rounded-lg shadow-sm border-border">
        {referrals.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">
            No referrals yet.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-xs uppercase border-b bg-secondary/40 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Referrer</th>
                <th className="px-4 py-3 text-left">Urgency</th>
                <th className="px-4 py-3 text-left">Received</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((referral) => (
                <tr
                  key={referral.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/20"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/referrals/${referral.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {referral.clientName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {referral.referrerName}
                    <p className="text-xs">{referral.referrerRelationship}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={referral.urgency} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {referral.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={referral.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
