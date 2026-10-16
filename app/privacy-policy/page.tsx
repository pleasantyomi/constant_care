import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/shared/legal-page";
import { contact, mailtoHref } from "@/lib/contact";

// DRAFT. Written from what the site and app actually do (lib/db/schema.ts,
// app/api/*, Vercel Blob, Gmail SMTP, Vercel Analytics), but it has NOT been
// reviewed by a lawyer or privacy advisor. Referrals can include personal
// health information, which New Brunswick's PHIPAA covers. Have it reviewed,
// then remove `robots: { index: false }` below. The reviewer should also
// name the regulator in "Your choices and rights" (PHIPAA / NB Integrity
// Commissioner vs. PIPEDA / federal Privacy Commissioner). Both app stores require a
// privacy policy URL, so this must be final before the app is submitted.
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Constant Care Family Services Inc. collects, uses, and protects personal information.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false },
};

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" updated="October 2026">
      <p>
        Constant Care Family Services Inc. (&ldquo;Constant Care&rdquo;,
        &ldquo;we&rdquo;) respects your privacy. This policy explains what
        personal information we collect through our website and mobile app,
        why we collect it, and how we protect it.
      </p>

      <LegalSection title="Information we collect">
        <p>We only collect information you choose to send us:</p>
        <ul className="pl-5 space-y-2 list-disc">
          <li>
            <strong className="text-foreground">Contact form:</strong>{" "}
            your
            name, email, phone number (optional), the service you&rsquo;re
            asking about, and your message.
          </li>
          <li>
            <strong className="text-foreground">Referrals:</strong>{" "}
            the
            referrer&rsquo;s name, role, organization, phone, and email, and
            the client&rsquo;s name, contact information, the services needed,
            urgency, the reason for the referral, and any notes. A referral
            can include health information about the client, and we ask the
            referrer to confirm the client (or their guardian) has consented
            to sharing it.
          </li>
          <li>
            <strong className="text-foreground">Job applications:</strong>{" "}
            your name, email, phone, position of interest, message, and
            resume if you upload one.
          </li>
          <li>
            <strong className="text-foreground">Newsletter:</strong>{" "}
            your
            email address.
          </li>
        </ul>
        <p>
          We also collect anonymous, aggregated website statistics (such as
          page views) through Vercel Analytics, which does not use cookies or
          identify individual visitors.
        </p>
      </LegalSection>

      <LegalSection title="How we use it">
        <ul className="pl-5 space-y-2 list-disc">
          <li>To respond to your inquiry or referral and arrange care.</li>
          <li>To review job applications and contact applicants.</li>
          <li>To send newsletter updates you signed up for.</li>
          <li>
            To send you a confirmation email when you submit a form, and to
            notify our staff that a submission has arrived.
          </li>
        </ul>
        <p>We do not sell your personal information or use it for advertising.</p>
      </LegalSection>

      <LegalSection title="Where it is stored and who processes it">
        <p>
          Submissions are stored in a secured database hosted by Neon, on
          Amazon Web Services servers in the United States. Resumes are stored
          in private file storage provided by Vercel and can only be opened by
          signed-in Constant Care staff. Our website and app are hosted by
          Vercel, and notification and confirmation emails are sent through
          Google Workspace. These providers process information on our
          behalf and may store it outside Canada.
        </p>
      </LegalSection>

      <LegalSection title="Who can see it">
        <p>
          Only authorized Constant Care staff can access submissions, through
          a password-protected administration area. We share information
          with others only when needed to arrange care with your consent, or
          when required by law.
        </p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          We keep personal information only as long as needed for the
          purpose it was collected for, or as required by law, and then
          securely delete it.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Our public website does not use tracking or advertising cookies.
          Staff who sign in to the administration area receive a secure
          session cookie that keeps them signed in.
        </p>
      </LegalSection>

      <LegalSection title="Your choices and rights">
        <p>
          You can ask to see, correct, or delete the personal information we
          hold about you, or unsubscribe from our newsletter at any time, by
          contacting us. If you have a concern about how we handle your
          information, please contact us first; you may also contact the
          privacy regulator responsible for us.
        </p>
      </LegalSection>

      <LegalSection title="Contact us">
        <p>
          Questions about this policy or your information:{" "}
          <Link href={mailtoHref} className="text-primary underline">
            {contact.email}
          </Link>{" "}
          or {contact.phoneDisplay}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
