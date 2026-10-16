import { desc } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { updateCallbackStatus } from "@/lib/actions/admin";
import { formatCallbackSlot } from "@/lib/callbacks";
import StatusBadge from "@/components/admin/status-badge";
import StatusSelect from "@/components/admin/status-select";

export const dynamic = "force-dynamic";

// Callback requests booked from the app's "Book a free callback" screen.
export default async function CallbacksPage() {
  const callbacks = db
    ? await db
        .select()
        .from(schema.callbackRequests)
        .orderBy(desc(schema.callbackRequests.createdAt))
    : [];
  const open = callbacks.filter((c) => c.status === "new" || c.status === "scheduled").length;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-primary">Callbacks</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {open} to do · {callbacks.length} total. Times are Atlantic time, as
        chosen in the app.
      </p>

      <div className="grid gap-4 mt-6">
        {callbacks.length === 0 && (
          <p className="p-6 text-sm bg-white border rounded-lg text-muted-foreground border-border">
            No callback requests yet.
          </p>
        )}
        {callbacks.map((callback) => (
          <div
            key={callback.id}
            className="flex flex-wrap items-start justify-between gap-4 p-5 bg-white border rounded-lg shadow-sm border-border"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">{callback.name}</p>
                <StatusBadge status={callback.status} />
              </div>
              <p className="text-sm">
                <a href={`tel:${callback.phone}`} className="text-primary hover:underline">
                  {callback.phone}
                </a>{" "}
                <span className="text-muted-foreground">
                  · wants a call {formatCallbackSlot(callback.preferredDate, callback.preferredTime)}
                </span>
              </p>
              {callback.careFinder && (
                <p className="text-xs text-muted-foreground">{callback.careFinder}</p>
              )}
              {callback.note && (
                <p className="text-sm whitespace-pre-wrap text-foreground">{callback.note}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Requested {callback.createdAt.toLocaleString()}
              </p>
            </div>
            <StatusSelect
              currentStatus={callback.status}
              options={["new", "scheduled", "done", "cancelled"]}
              action={updateCallbackStatus.bind(null, callback.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
