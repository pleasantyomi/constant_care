import { Text } from "@react-email/components";
import { BrandedEmailLayout, FieldRow } from "./notification-email";

export function ReferralNotificationEmail({
  referrerName,
  referrerRelationship,
  organization,
  referrerPhone,
  referrerEmail,
  clientName,
  clientContact,
  service,
  urgency,
  reason,
  notes,
}: {
  referrerName: string;
  referrerRelationship: string;
  organization?: string | null;
  referrerPhone: string;
  referrerEmail: string;
  clientName: string;
  clientContact: string;
  service?: string | null;
  urgency: string;
  reason: string;
  notes?: string | null;
}) {
  return (
    <BrandedEmailLayout
      previewText={`New ${urgency.toLowerCase()} referral from ${referrerName}`}
      heading={`New Referral — ${urgency}`}
    >
      <FieldRow label="Referrer" value={referrerName} />
      <FieldRow label="Relationship to Client" value={referrerRelationship} />
      {organization && <FieldRow label="Organization" value={organization} />}
      <FieldRow label="Referrer Phone" value={referrerPhone} />
      <FieldRow label="Referrer Email" value={referrerEmail} />
      <FieldRow label="Client Name" value={clientName} />
      <FieldRow label="Client Contact" value={clientContact} />
      {service && <FieldRow label="Service(s) Needed" value={service} />}
      <FieldRow label="Urgency" value={urgency} />
      <FieldRow label="Reason for Referral" value={reason} />
      {notes && <FieldRow label="Additional Notes" value={notes} />}
      <Text style={{ fontSize: "12px", color: "#5C7A88", marginTop: "16px" }}>
        Client/guardian consent to share this information was confirmed at
        submission.
      </Text>
    </BrandedEmailLayout>
  );
}
