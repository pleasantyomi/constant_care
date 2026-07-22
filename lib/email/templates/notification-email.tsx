import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { SITE_URL } from "@/lib/site";

// Mirrors components/shared/background.tsx for email: a Harmony Blue band
// with the seamless pattern behind it and the logo on top. Email clients
// can't do mix-blend-mode or CSS filters, so this degrades gracefully —
// modern clients (Gmail, Apple Mail, Outlook.com) show the textured
// background; Outlook desktop, which strips background-image, just shows
// solid Harmony Blue. Both look correct and on-brand.
const HARMONY_BLUE = "#1A4F72";
const CALM_MIST = "#E8F4F2";

export function BrandedEmailLayout({
  previewText,
  heading,
  children,
}: {
  previewText: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body
        style={{ backgroundColor: CALM_MIST, margin: 0, padding: "32px 0" }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #D6E3E8",
          }}
        >
          <Section
            style={{
              backgroundColor: HARMONY_BLUE,
              backgroundImage: `linear-gradient(rgba(26, 79, 114, 0.72), rgba(26, 79, 114, 0.72)), url(${SITE_URL}/backgrounds/seamless_2D_vector_background_pattern_202605132350.jpeg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "28px 32px",
              textAlign: "center",
            }}
          >
            <Img
              src={`${SITE_URL}/logo/CCFSI_LOGO_A.png`}
              alt="Constant Care Family Services Inc."
              width="160"
              style={{ margin: "0 auto 12px", height: "auto" }}
            />
            <Heading
              as="h1"
              style={{
                color: "#ffffff",
                fontSize: "20px",
                fontWeight: 700,
                margin: 0,
              }}
            >
              {heading}
            </Heading>
          </Section>

          <Section style={{ padding: "28px 32px" }}>{children}</Section>

          <Hr style={{ borderColor: "#D6E3E8", margin: 0 }} />
          <Section style={{ padding: "16px 32px" }}>
            <Text style={{ fontSize: "12px", color: "#5C7A88", margin: 0 }}>
              Constant Care Family Services Inc. &middot; New Brunswick, Canada
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <Section style={{ marginBottom: "12px" }}>
      <Text
        style={{
          fontSize: "11px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.03em",
          color: "#5C7A88",
          margin: "0 0 2px",
        }}
      >
        {label}
      </Text>
      <Text style={{ fontSize: "14px", color: "#0F2E42", margin: 0 }}>
        {value || "—"}
      </Text>
    </Section>
  );
}
