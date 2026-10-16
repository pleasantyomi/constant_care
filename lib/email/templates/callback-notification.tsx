import { Text } from "@react-email/components";
import { BrandedEmailLayout, FieldRow } from "./notification-email";
import { formatCallbackSlot } from "@/lib/callbacks";

export function CallbackNotificationEmail({
  name,
  phone,
  preferredDate,
  preferredTime,
  note,
  careFinder,
}: {
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  note?: string | null;
  careFinder?: string | null;
}) {
  const slot = `${formatCallbackSlot(preferredDate, preferredTime)} (Atlantic time)`;
  return (
    <BrandedEmailLayout
      previewText={`Callback request from ${name}: ${slot}`}
      heading="New Callback Request"
    >
      <FieldRow label="Name" value={name} />
      <FieldRow label="Phone" value={phone} />
      <FieldRow label="Preferred time" value={slot} />
      {careFinder && <FieldRow label="Care finder answers" value={careFinder} />}
      {note && <FieldRow label="Note" value={note} />}
      <Text style={{ fontSize: "12px", color: "#5C7A88", marginTop: "16px" }}>
        Sent from the Constant Care app. Mark it scheduled or done in the
        admin panel under Callbacks.
      </Text>
    </BrandedEmailLayout>
  );
}
