import Link from "next/link";
import { desc } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import StatusBadge from "@/components/admin/status-badge";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = db
    ? await db
        .select()
        .from(schema.contactMessages)
        .orderBy(desc(schema.contactMessages.createdAt))
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Contact Messages</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {messages.length} total
      </p>

      <div className="mt-6 overflow-hidden bg-white border rounded-lg shadow-sm border-border">
        {messages.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">
            No messages yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase border-b bg-secondary/40 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Regarding</th>
                  <th className="px-4 py-3 text-left">Received</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr
                    key={message.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/20"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Link
                        href={`/admin/messages/${message.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {message.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {message.email}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {message.service || "General Inquiry"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {message.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={message.status} />
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
