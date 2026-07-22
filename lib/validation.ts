import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  service: z.string().trim().max(255).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(5000),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const referralSchema = z.object({
  referrerName: z.string().trim().min(1, "Your name is required").max(255),
  relationship: z
    .string()
    .trim()
    .min(1, "Please select your relationship to the client")
    .max(255),
  organization: z.string().trim().max(255).optional().or(z.literal("")),
  referrerPhone: z.string().trim().min(1, "Your phone number is required").max(50),
  referrerEmail: z.string().trim().email("Enter a valid email").max(255),
  clientName: z.string().trim().min(1, "Client name is required").max(255),
  clientContact: z
    .string()
    .trim()
    .min(1, "Client contact information is required")
    .max(255),
  service: z.string().trim().max(255).optional().or(z.literal("")),
  urgency: z.enum(["Standard", "Priority", "Urgent"], {
    error: "Please select an urgency level",
  }),
  reason: z.string().trim().min(1, "Please share a reason for the referral").max(5000),
  notes: z.string().trim().max(5000).optional().or(z.literal("")),
  consent: z
    .union([z.literal("on"), z.literal("true"), z.boolean()])
    .refine((v) => v === "on" || v === "true" || v === true, {
      message: "Please confirm consent before submitting",
    }),
});
export type ReferralInput = z.infer<typeof referralSchema>;

export const applicationSchema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(255),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(1, "Phone number is required").max(50),
  position: z.string().trim().max(255).optional().or(z.literal("")),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
});
export type ApplicationInput = z.infer<typeof applicationSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;
