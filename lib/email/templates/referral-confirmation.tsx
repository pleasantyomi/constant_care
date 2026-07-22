import { Text } from "@react-email/components";
import { BrandedEmailLayout } from "./notification-email";

export function ReferralConfirmationEmail({
  referrerName,
  clientName,
}: {
  referrerName: string;
  clientName: string;
}) {
  return (
    <BrandedEmailLayout
      previewText="We've received your referral"
      heading="Referral Received"
    >
      <Text style={{ fontSize: "14px", color: "#0F2E42", margin: "0 0 12px" }}>
        Hi {referrerName},
      </Text>
      <Text style={{ fontSize: "14px", color: "#0F2E42", margin: "0 0 12px" }}>
        Thank you for referring {clientName} to Constant Care Family
        Services. Our team has received the details and will review them
        shortly. We&rsquo;ll be in touch about next steps.
      </Text>
      <Text style={{ fontSize: "14px", color: "#0F2E42", margin: 0 }}>
        For urgent matters, please call us directly at{" "}
        <a href="tel:+15063000055" style={{ color: "#1A4F72" }}>
          +1 (506) 300-0055
        </a>
        .
      </Text>
    </BrandedEmailLayout>
  );
}
