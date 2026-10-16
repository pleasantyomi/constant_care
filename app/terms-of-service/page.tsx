import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/shared/legal-page";
import { contact, mailtoHref } from "@/lib/contact";

// DRAFT. Not reviewed by a lawyer. Have it reviewed, then remove
// `robots: { index: false }` below.
export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for using the Constant Care Family Services Inc. website and mobile app.",
  alternates: { canonical: "/terms-of-service" },
  robots: { index: false },
};

export default function TermsOfService() {
  return (
    <LegalPage title="Terms of Service" updated="October 2026">
      <p>
        These terms apply to the Constant Care Family Services Inc. website
        and mobile app. By using them, you agree to these terms.
      </p>

      <LegalSection title="Information only, not emergency or medical advice">
        <p>
          The website and app describe our services and let you contact us.
          They are not a substitute for professional medical advice, and they
          are not monitored around the clock.{" "}
          <strong className="text-foreground">
            In an emergency, call 911.
          </strong>
        </p>
      </LegalSection>

      <LegalSection title="Submitting forms">
        <p>
          When you send a contact request, referral, or job application, you
          confirm the information is accurate and that you have the right to
          share it. For referrals, you confirm the client (or their guardian)
          has consented to their information being shared with us for the
          purpose of arranging care. Submitting a form does not guarantee that
          services will be provided or that an applicant will be hired.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <p>
          Please don&rsquo;t misuse the website or app: for example, by
          sending spam, submitting false information, or trying to access
          areas you aren&rsquo;t authorized to use.
        </p>
      </LegalSection>

      <LegalSection title="Our content">
        <p>
          The text, images, and logos on the website and app belong to
          Constant Care Family Services Inc. or are used with permission, and
          may not be copied for commercial use without our permission.
        </p>
      </LegalSection>

      <LegalSection title="Privacy">
        <p>
          How we handle personal information is described in our{" "}
          <Link href="/privacy-policy" className="text-primary underline">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Changes and governing law">
        <p>
          We may update these terms from time to time; the date above shows
          the latest version. These terms are governed by the laws of the
          Province of New Brunswick and the federal laws of Canada that apply
          there.
        </p>
      </LegalSection>

      <LegalSection title="Contact us">
        <p>
          <Link href={mailtoHref} className="text-primary underline">
            {contact.email}
          </Link>{" "}
          or {contact.phoneDisplay}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
