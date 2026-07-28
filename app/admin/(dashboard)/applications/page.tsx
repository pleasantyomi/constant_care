import Link from "next/link";
import { desc } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import StatusBadge from "@/components/admin/status-badge";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
  const applications = db
    ? await db
        .select()
        .from(schema.applications)
        .orderBy(desc(schema.applications.createdAt))
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Applications</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {applications.length} total
      </p>

      <div className="mt-6 overflow-hidden bg-white border rounded-lg shadow-sm border-border">
        {applications.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">
            No applications yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase border-b bg-secondary/40 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Position</th>
                  <th className="px-4 py-3 text-left">Resume</th>
                  <th className="px-4 py-3 text-left">Received</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr
                    key={application.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/20"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Link
                        href={`/admin/applications/${application.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {application.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {application.email}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {application.position || "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {application.resumeUrl ? (
                        <span className="text-xs text-accent">Attached</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {application.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={application.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
