import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { ContactNotificationEmail } from "./templates/contact-notification";
import { ReferralNotificationEmail } from "./templates/referral-notification";
import { ApplicationNotificationEmail } from "./templates/application-notification";
import { NewsletterNotificationEmail } from "./templates/newsletter-notification";
import { ContactConfirmationEmail } from "./templates/contact-confirmation";
import { ReferralConfirmationEmail } from "./templates/referral-confirmation";
import { ApplicationConfirmationEmail } from "./templates/application-confirmation";
import { CallbackNotificationEmail } from "./templates/callback-notification";
import { SignInCodeEmail } from "./templates/sign-in-code";

// Sends through the Google Workspace mailbox (info@constantcarefamilyservices.com)
// via SMTP rather than a third-party email API — the domain is on Wix, and
// Resend (and similar providers) require DNS records on the sending domain
// for deliverability, which isn't available there. Gmail/Workspace SMTP
// needs an App Password (not the account password) since 2-Step
// Verification blocks plain password SMTP auth:
// https://support.google.com/mail/answer/185833

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

const FROM = process.env.EMAIL_FROM || process.env.GMAIL_USER;
const TO = process.env.NOTIFICATIONS_EMAIL || process.env.GMAIL_USER;

/** True once GMAIL_USER and GMAIL_APP_PASSWORD are both configured. */
export function isEmailConfigured() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

async function send(options: {
  to: string;
  replyTo: string;
  subject: string;
  react: React.ReactElement;
}) {
  const transporter = getTransporter();
  if (!transporter || !FROM) return { skipped: true as const };

  const html = await render(options.react);
  return transporter.sendMail({
    from: FROM,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    html,
  });
}

export async function sendContactNotification(input: {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
}) {
  if (!TO) return { skipped: true as const };
  return send({
    to: TO,
    replyTo: input.email,
    subject: `New contact message from ${input.name}`,
    react: ContactNotificationEmail(input),
  });
}

export async function sendReferralNotification(input: {
  referrerName: string;
  referrerRelationship: string;
  organization?: string | null;
  referrerPhone: string;
  referrerEmail: string;
  clientName: string;
  clientContact: string;
  service?: string | null;
  urgency: string;
  reason: string;
  notes?: string | null;
}) {
  if (!TO) return { skipped: true as const };
  return send({
    to: TO,
    replyTo: input.referrerEmail,
    subject: `New ${input.urgency.toLowerCase()} referral — ${input.clientName}`,
    react: ReferralNotificationEmail(input),
  });
}

export async function sendApplicationNotification(input: {
  name: string;
  email: string;
  phone: string;
  position?: string | null;
  resumeUrl?: string | null;
  message?: string | null;
}) {
  if (!TO) return { skipped: true as const };
  return send({
    to: TO,
    replyTo: input.email,
    subject: `New application: ${input.position || "General"} — ${input.name}`,
    react: ApplicationNotificationEmail(input),
  });
}

export async function sendNewsletterNotification(input: { email: string }) {
  if (!TO) return { skipped: true as const };
  return send({
    to: TO,
    replyTo: input.email,
    subject: `New newsletter subscriber: ${input.email}`,
    react: NewsletterNotificationEmail(input),
  });
}

export async function sendContactConfirmation(input: {
  name: string;
  email: string;
}) {
  if (!TO) return { skipped: true as const };
  return send({
    to: input.email,
    replyTo: TO,
    subject: "We've received your message — Constant Care Family Services",
    react: ContactConfirmationEmail(input),
  });
}

export async function sendReferralConfirmation(input: {
  referrerName: string;
  referrerEmail: string;
  clientName: string;
}) {
  if (!TO) return { skipped: true as const };
  return send({
    to: input.referrerEmail,
    replyTo: TO,
    subject: "We've received your referral — Constant Care Family Services",
    react: ReferralConfirmationEmail(input),
  });
}

export async function sendApplicationConfirmation(input: {
  name: string;
  email: string;
  position?: string | null;
}) {
  if (!TO) return { skipped: true as const };
  return send({
    to: input.email,
    replyTo: TO,
    subject:
      "We've received your application — Constant Care Family Services",
    react: ApplicationConfirmationEmail(input),
  });
}

export async function sendCallbackNotification(input: {
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  note?: string | null;
  careFinder?: string | null;
}) {
  if (!TO) return { skipped: true as const };
  return send({
    to: TO,
    replyTo: TO,
    subject: `Callback request: ${input.name}, ${input.preferredDate} ${input.preferredTime}`,
    react: CallbackNotificationEmail(input),
  });
}

export async function sendSignInCode(input: { email: string; code: string }) {
  if (!TO) return { skipped: true as const };
  return send({
    to: input.email,
    replyTo: TO,
    subject: `${input.code} is your Constant Care sign-in code`,
    react: SignInCodeEmail({ code: input.code }),
  });
}
