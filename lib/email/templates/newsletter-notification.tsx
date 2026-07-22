import { BrandedEmailLayout, FieldRow } from "./notification-email";

export function NewsletterNotificationEmail({ email }: { email: string }) {
  return (
    <BrandedEmailLayout
      previewText={`New newsletter subscriber: ${email}`}
      heading="New Newsletter Subscriber"
    >
      <FieldRow label="Email" value={email} />
    </BrandedEmailLayout>
  );
}
