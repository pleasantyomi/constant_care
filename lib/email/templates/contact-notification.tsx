import { Text } from "@react-email/components";
import { BrandedEmailLayout, FieldRow } from "./notification-email";

export function ContactNotificationEmail({
  name,
  email,
  phone,
  service,
  message,
}: {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
}) {
  return (
    <BrandedEmailLayout
      previewText={`New contact message from ${name}`}
      heading="New Contact Message"
    >
      <FieldRow label="Name" value={name} />
      <FieldRow label="Email" value={email} />
      {phone && <FieldRow label="Phone" value={phone} />}
      {service && <FieldRow label="Regarding" value={service} />}
      <FieldRow label="Message" value={message} />
      <Text style={{ fontSize: "12px", color: "#5C7A88", marginTop: "16px" }}>
        Reply directly to this email to respond to {name}.
      </Text>
    </BrandedEmailLayout>
  );
}
