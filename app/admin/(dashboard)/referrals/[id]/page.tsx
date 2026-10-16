import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db, schema } from "@/lib/db";
import { updateReferralStatus, updateReferrerUpdate } from "@/lib/actions/admin";
import StatusSelect from "@/components/admin/status-select";
import StatusBadge from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const dynamic = "force-dynamic";

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
        {label}
      </p>
      <p className="text-sm whitespace-pre-wrap">{value}</p>
    </div>
  );
}

export default async function ReferralDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!db) notFound();

  const [referral] = await db
    .select()
    .from(schema.referrals)
    .where(eq(schema.referrals.id, id))
    .limit(1);
  if (!referral) notFound();

  const action = updateReferralStatus.bind(null, referral.id);

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/referrals"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        Back to Referrals
      </Link>

      <div className="flex items-start justify-between gap-4 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            {referral.clientName}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={referral.urgency} />
            <p className="text-sm text-muted-foreground">
              {referral.createdAt.toLocaleString()}
            </p>
          </div>
        </div>
        <StatusSelect
          currentStatus={referral.status}
          options={["new", "contacted", "in-progress", "closed"]}
          action={action}
        />
      </div>

      <div className="grid gap-5 p-6 mt-6 bg-white border rounded-lg shadow-sm border-border">
        <h2 className="text-xs font-semibold tracking-wide uppercase text-accent">
          About the Client
        </h2>
        <Field label="Client Name" value={referral.clientName} />
        <Field label="Client Contact" value={referral.clientContact} />
        <Field label="Service(s) Needed" value={referral.service} />
        <Field label="Reason for Referral" value={referral.reason} />
        <Field label="Additional Notes" value={referral.notes} />

        <hr className="border-border" />

        <h2 className="text-xs font-semibold tracking-wide uppercase text-accent">
          About the Referrer
        </h2>
        <Field label="Name" value={referral.referrerName} />
        <Field label="Relationship to Client" value={referral.referrerRelationship} />
        <Field label="Organization" value={referral.organization} />
        <Field label="Phone" value={referral.referrerPhone} />
        <Field label="Email" value={referral.referrerEmail} />

        <p className="text-xs text-muted-foreground">
          Client/guardian consent to share this information was confirmed at
          submission.
        </p>
      </div>

      <div className="p-6 mt-6 bg-white border rounded-lg shadow-sm border-border">
        <h2 className="text-xs font-semibold tracking-wide uppercase text-accent">
          Update for the Referrer
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Shown to {referral.referrerName} in the app&rsquo;s referral tracker,
          next to the status. Keep it short and leave out client details, for
          example &ldquo;Assessment booked for Oct 17.&rdquo;
        </p>
        <form action={updateReferrerUpdate.bind(null, referral.id)} className="grid gap-3 mt-4">
          <Textarea
            name="referrerUpdate"
            defaultValue={referral.referrerUpdate ?? ""}
            maxLength={500}
            rows={3}
            placeholder="No update shown yet"
          />
          <div className="flex items-center gap-3">
            <Button type="submit" size="sm">
              Save update
            </Button>
            {referral.referrerUpdateAt && (
              <span className="text-xs text-muted-foreground">
                Last updated {referral.referrerUpdateAt.toLocaleString()}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
