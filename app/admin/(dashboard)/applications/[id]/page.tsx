import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { db, schema } from "@/lib/db";
import { updateApplicationStatus } from "@/lib/actions/admin";
import StatusSelect from "@/components/admin/status-select";

export const dynamic = "force-dynamic";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!db) notFound();

  const [application] = await db
    .select()
    .from(schema.applications)
    .where(eq(schema.applications.id, id))
    .limit(1);
  if (!application) notFound();

  const action = updateApplicationStatus.bind(null, application.id);

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/applications"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        Back to Applications
      </Link>

      <div className="flex items-start justify-between gap-4 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            {application.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {application.createdAt.toLocaleString()}
          </p>
        </div>
        <StatusSelect
          currentStatus={application.status}
          options={["new", "reviewing", "interviewing", "hired", "rejected"]}
          action={action}
        />
      </div>

      <div className="grid gap-4 p-6 mt-6 bg-white border rounded-lg shadow-sm border-border">
        <div>
          <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
            Email
          </p>
          <a
            href={`mailto:${application.email}`}
            className="text-sm text-accent hover:underline"
          >
            {application.email}
          </a>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
            Phone
          </p>
          <p className="text-sm">{application.phone}</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
            Position of Interest
          </p>
          <p className="text-sm">{application.position || "—"}</p>
        </div>
        {application.resumeUrl && (
          <div>
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              Resume
            </p>
            <a
              href={`/api/admin/resume/${application.id}`}
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
            >
              <Download className="w-4 h-4" aria-hidden />
              {application.resumeFilename || "Download resume"}
            </a>
          </div>
        )}
        {application.message && (
          <div>
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              Cover Letter / Message
            </p>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {application.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
