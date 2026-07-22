import { Link, Text } from "@react-email/components";
import { BrandedEmailLayout, FieldRow } from "./notification-email";

export function ApplicationNotificationEmail({
  name,
  email,
  phone,
  position,
  resumeUrl,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  position?: string | null;
  resumeUrl?: string | null;
  message?: string | null;
}) {
  return (
    <BrandedEmailLayout
      previewText={`New job application from ${name}`}
      heading="New Job Application"
    >
      <FieldRow label="Name" value={name} />
      <FieldRow label="Email" value={email} />
      <FieldRow label="Phone" value={phone} />
      {position && <FieldRow label="Position of Interest" value={position} />}
      {message && <FieldRow label="Cover Letter / Message" value={message} />}
      {resumeUrl && (
        <Text style={{ fontSize: "14px", margin: "12px 0 0" }}>
          <Link href={resumeUrl} style={{ color: "#3AAFA9" }}>
            Download resume
          </Link>
        </Text>
      )}
    </BrandedEmailLayout>
  );
}
