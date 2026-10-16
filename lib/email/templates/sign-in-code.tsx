import { Text } from "@react-email/components";
import { BrandedEmailLayout } from "./notification-email";

export function SignInCodeEmail({ code }: { code: string }) {
  return (
    <BrandedEmailLayout
      previewText={`Your Constant Care sign-in code is ${code}`}
      heading="Your Sign-in Code"
    >
      <Text style={{ fontSize: "14px", color: "#0F2E42", margin: "0 0 16px" }}>
        Enter this code in the Constant Care app to sign in:
      </Text>
      <Text
        style={{
          fontSize: "32px",
          fontWeight: 700,
          letterSpacing: "8px",
          color: "#1A4F72",
          margin: "0 0 16px",
        }}
      >
        {code}
      </Text>
      <Text style={{ fontSize: "13px", color: "#5C7A88", margin: 0 }}>
        It expires in 10 minutes. If you didn&rsquo;t try to sign in, you can
        ignore this email.
      </Text>
    </BrandedEmailLayout>
  );
}
