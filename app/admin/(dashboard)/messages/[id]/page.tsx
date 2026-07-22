import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db, schema } from "@/lib/db";
import { updateMessageStatus } from "@/lib/actions/admin";
import StatusSelect from "@/components/admin/status-select";

export const dynamic = "force-dynamic";

export default async function MessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!db) notFound();

  const [message] = await db
    .select()
    .from(schema.contactMessages)
    .where(eq(schema.contactMessages.id, id))
    .limit(1);
  if (!message) notFound();

  const action = updateMessageStatus.bind(null, message.id);

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/messages"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        Back to Messages
      </Link>

      <div className="flex items-start justify-between gap-4 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">{message.name}</h1>
          <p className="text-sm text-muted-foreground">
            {message.createdAt.toLocaleString()}
          </p>
        </div>
        <StatusSelect
          currentStatus={message.status}
          options={["new", "read", "archived"]}
          action={action}
        />
      </div>

      <div className="grid gap-4 p-6 mt-6 bg-white border rounded-lg shadow-sm border-border">
        <div>
          <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
            Email
          </p>
          <a
            href={`mailto:${message.email}`}
            className="text-sm text-accent hover:underline"
          >
            {message.email}
          </a>
        </div>
        {message.phone && (
          <div>
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              Phone
            </p>
            <p className="text-sm">{message.phone}</p>
          </div>
        )}
        <div>
          <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
            Regarding
          </p>
          <p className="text-sm">{message.service || "General Inquiry"}</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
            Message
          </p>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
}
