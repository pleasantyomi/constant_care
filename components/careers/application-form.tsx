"use client";

import { useId, useState } from "react";
import { UploadCloud } from "lucide-react";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const positions = [
  "Personal Support Worker (PSW)",
  "Disability Support Worker (DSW)",
  "Youth Worker",
  "Respite Worker",
  "Care Coordinator",
  "Administrative / Office Role",
  "Other",
];

export default function ApplicationForm() {
  const resumeInputId = useId();
  const [resumeName, setResumeName] = useState<string | null>(null);

  return (
    <section id="apply" className="py-14 bg-secondary/40 scroll-mt-24">
      <div className="w-11/12 mx-auto md:w-10/12 lg:w-7/12">
        <FadeIn className="mb-10 text-center">
          <h1 className="text-2xl md:text-3xl text-primary">Apply Now</h1>
          <AccentDash className="w-2/12 mx-auto mt-2 origin-center md:mt-3 md:w-1/12 border-primary" />
          <p className="max-w-lg mx-auto mt-4 text-sm leading-relaxed text-muted-foreground">
            Tell us a bit about yourself. If a role matching your interests
            isn&rsquo;t open right now, we&rsquo;ll keep your application on
            file and reach out when one is.
          </p>
        </FadeIn>

        <FadeIn
          // Not wired to a backend yet — connect this to an email service or
          // ATS endpoint before launch. preventDefault avoids the native
          // GET-reload behavior in the meantime.
          className="p-6 bg-white border shadow-sm rounded-2xl border-border md:p-10"
        >
          <form
            className="grid gap-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="app-name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input id="app-name" name="name" required placeholder="Jane Doe" />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="app-email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="app-email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="app-phone" className="text-sm font-medium">
                  Phone
                </label>
                <Input
                  id="app-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="(506) 000-0000"
                />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="app-position" className="text-sm font-medium">
                  Position of Interest
                </label>
                <Select name="position">
                  <SelectTrigger id="app-position" className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-1.5">
              <span className="text-sm font-medium">Resume</span>
              <label
                htmlFor={resumeInputId}
                className="flex items-center gap-2 px-3 py-2 text-sm transition-colors border rounded-md cursor-pointer w-fit border-input hover:bg-secondary"
              >
                <UploadCloud className="w-4 h-4 text-accent" aria-hidden />
                Upload Resume
              </label>
              <input
                id={resumeInputId}
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(event) =>
                  setResumeName(event.target.files?.[0]?.name ?? null)
                }
              />
              {resumeName && (
                <p className="text-xs text-muted-foreground">{resumeName}</p>
              )}
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="app-message" className="text-sm font-medium">
                Cover Letter / Message{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </label>
              <Textarea
                id="app-message"
                name="message"
                className="min-h-28"
                placeholder="Tell us why you'd be a great fit..."
              />
            </div>

            <Button type="submit" className="justify-self-start">
              Apply Now
            </Button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
