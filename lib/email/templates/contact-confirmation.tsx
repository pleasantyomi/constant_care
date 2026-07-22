import { Text } from "@react-email/components";
import { BrandedEmailLayout } from "./notification-email";

export function ContactConfirmationEmail({ name }: { name: string }) {
  return (
    <BrandedEmailLayout
      previewText="We've received your message"
      heading="Thanks for reaching out"
    >
      <Text style={{ fontSize: "14px", color: "#0F2E42", margin: "0 0 12px" }}>
        Hi {name},
      </Text>
      <Text style={{ fontSize: "14px", color: "#0F2E42", margin: "0 0 12px" }}>
        Thank you for contacting Constant Care Family Services. We&rsquo;ve
        received your message and a member of our team will get back to you
        soon.
      </Text>
      <Text style={{ fontSize: "14px", color: "#0F2E42", margin: 0 }}>
        If your matter is urgent, please call us directly at{" "}
        <a href="tel:+15063000055" style={{ color: "#1A4F72" }}>
          +1 (506) 300-0055
        </a>
        .
      </Text>
    </BrandedEmailLayout>
  );
}
