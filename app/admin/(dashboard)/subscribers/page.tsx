import { desc } from "drizzle-orm";
import { db, schema } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SubscribersPage() {
  const subscribers = db
    ? await db
        .select()
        .from(schema.newsletterSubscribers)
        .orderBy(desc(schema.newsletterSubscribers.subscribedAt))
    : [];

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-primary">
        Newsletter Subscribers
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {subscribers.length} total — collected from the footer signup form.
      </p>

      <div className="mt-6 overflow-hidden bg-white border rounded-lg shadow-sm border-border">
        {subscribers.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">
            No subscribers yet.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-xs uppercase border-b bg-secondary/40 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr
                  key={subscriber.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3">{subscriber.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {subscriber.subscribedAt.toLocaleDateString()}
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
