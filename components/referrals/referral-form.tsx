"use client";

import { useState, type FormEvent } from "react";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/lib/nav";

const relationships = [
  "Family Member",
  "Hospital",
  "Physician",
  "Social Worker",
  "Occupational Therapist",
  "School",
  "Community Organization",
  "Indigenous Community",
  "Case Manager",
  "Other",
];

const urgencyLevels = ["Standard", "Priority", "Urgent"];

export default function ReferralForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Capture the form element now — event.currentTarget is only valid
    // during synchronous event dispatch and becomes null once the awaits
    // below resume, so grabbing it later would throw and land in catch.
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");
    setErrorMessage(null);
    try {
      const response = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referrerName: formData.get("referrerName"),
          relationship: formData.get("relationship"),
          organization: formData.get("organization"),
          referrerPhone: formData.get("referrerPhone"),
          referrerEmail: formData.get("referrerEmail"),
          clientName: formData.get("clientName"),
          clientContact: formData.get("clientContact"),
          service: formData.get("service"),
          urgency: formData.get("urgency"),
          reason: formData.get("reason"),
          notes: formData.get("notes"),
          consent: formData.get("consent"),
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error);
      }
      setStatus("sent");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <section id="refer" className="py-14 bg-secondary/40 scroll-mt-24">
      <div className="w-11/12 mx-auto md:w-10/12 lg:w-8/12">
        <FadeIn className="mb-10 text-center">
          <h1 className="text-2xl md:text-3xl text-primary">
            Online Referral Form
          </h1>
          <AccentDash className="w-2/12 mx-auto mt-2 origin-center md:mt-3 md:w-1/12 border-primary" />
          <p className="max-w-lg mx-auto mt-4 text-sm leading-relaxed text-muted-foreground">
            Please share as much detail as you can — it helps us respond
            quickly and match the right support.
          </p>
        </FadeIn>

        <FadeIn className="p-6 bg-white border shadow-sm rounded-2xl border-border md:p-10">
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              About You
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="ref-name" className="text-sm font-medium">
                  Your Name
                </label>
                <Input id="ref-name" name="referrerName" required placeholder="Jane Doe" />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="ref-relationship" className="text-sm font-medium">
                  Role / Relationship to Client
                </label>
                <Select name="relationship" required>
                  <SelectTrigger id="ref-relationship" className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationships.map((relationship) => (
                      <SelectItem key={relationship} value={relationship}>
                        {relationship}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="ref-org" className="text-sm font-medium">
                Organization{" "}
                <span className="font-normal text-muted-foreground">
                  (if applicable)
                </span>
              </label>
              <Input id="ref-org" name="organization" placeholder="e.g. Dr. Smith Family Clinic" />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="ref-phone" className="text-sm font-medium">
                  Your Phone
                </label>
                <Input
                  id="ref-phone"
                  name="referrerPhone"
                  type="tel"
                  required
                  placeholder="(506) 000-0000"
                />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="ref-email" className="text-sm font-medium">
                  Your Email
                </label>
                <Input
                  id="ref-email"
                  name="referrerEmail"
                  type="email"
                  required
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <h2 className="pt-2 text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              About the Client
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="ref-client-name" className="text-sm font-medium">
                  Client Name
                </label>
                <Input id="ref-client-name" name="clientName" required placeholder="Full name" />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="ref-client-contact" className="text-sm font-medium">
                  Client Contact Information
                </label>
                <Input
                  id="ref-client-contact"
                  name="clientContact"
                  required
                  placeholder="Phone or email"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="ref-service" className="text-sm font-medium">
                  Service(s) Needed
                </label>
                <Select name="service">
                  <SelectTrigger id="ref-service" className="w-full">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.label} value={service.label}>
                        {service.label}
                      </SelectItem>
                    ))}
                    <SelectItem value="Not sure">Not sure / Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="ref-urgency" className="text-sm font-medium">
                  Urgency Level
                </label>
                <Select name="urgency" defaultValue="Standard">
                  <SelectTrigger id="ref-urgency" className="w-full">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="ref-reason" className="text-sm font-medium">
                Reason for Referral
              </label>
              <Textarea
                id="ref-reason"
                name="reason"
                required
                className="min-h-24"
                placeholder="What kind of support is being requested, and why?"
              />
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="ref-notes" className="text-sm font-medium">
                Additional Notes{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </label>
              <Textarea
                id="ref-notes"
                name="notes"
                className="min-h-20"
                placeholder="Anything else we should know?"
              />
            </div>

            <label className="flex items-start gap-3 pt-2 text-sm cursor-pointer text-foreground">
              <Checkbox name="consent" required className="mt-0.5" />
              <span>
                I confirm that the client (or their guardian) has consented
                to this information being shared with Constant Care Family
                Services Inc. for the purpose of arranging care.
              </span>
            </label>

            <div>
              <Button
                type="submit"
                disabled={status === "sending"}
                className="justify-self-start disabled:opacity-60"
              >
                {status === "sending" ? "Submitting..." : "Submit a Referral"}
              </Button>
              {status === "sent" && (
                <p className="mt-3 text-sm text-accent">
                  Thank you — we&rsquo;ve received the referral and will
                  follow up promptly.
                </p>
              )}
              {status === "error" && (
                <p className="mt-3 text-sm text-destructive">
                  {errorMessage}
                </p>
              )}
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
