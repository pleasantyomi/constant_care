import { Text } from "@react-email/components";
import { BrandedEmailLayout } from "./notification-email";

export function ApplicationConfirmationEmail({
  name,
  position,
}: {
  name: string;
  position?: string | null;
}) {
  return (
    <BrandedEmailLayout
      previewText="We've received your application"
      heading="Application Received"
    >
      <Text style={{ fontSize: "14px", color: "#0F2E42", margin: "0 0 12px" }}>
        Hi {name},
      </Text>
      <Text style={{ fontSize: "14px", color: "#0F2E42", margin: "0 0 12px" }}>
        Thank you for applying{" "}
        {position ? (
          <>
            for the <strong>{position}</strong> position
          </>
        ) : (
          "to Constant Care Family Services"
        )}
        . We&rsquo;ve received your application and resume, and our hiring
        team will review it and reach out if you&rsquo;re a good fit for the
        next steps.
      </Text>
      <Text style={{ fontSize: "14px", color: "#0F2E42", margin: 0 }}>
        If you have any questions in the meantime, feel free to call us at{" "}
        <a href="tel:+15063000055" style={{ color: "#1A4F72" }}>
          +1 (506) 300-0055
        </a>
        .
      </Text>
    </BrandedEmailLayout>
  );
}
