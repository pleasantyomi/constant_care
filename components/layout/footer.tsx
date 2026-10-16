"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import AccentDash from "@/components/animations/accent-dash";
import StaggerChildren from "@/components/animations/stagger-children";
import { mainNav as quickLinks, services as ourServices } from "@/lib/nav";
import { contact, mailtoHref, telHref } from "@/lib/contact";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error();
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  // Admin is its own internal tool, not part of the public marketing site.
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="relative py-20 overflow-hidden text-white bg-primary">
      <Image
        src="/backgrounds/seamless_2D_vector_pattern_design_202605132257.jpeg"
        alt=""
        fill
        aria-hidden
        className="object-cover pointer-events-none select-none mix-blend-multiply opacity-40 pattern-drift"
      />

      <div className="relative w-11/12 mx-auto">
        <StaggerChildren className="grid gap-10  lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/">
              <Image
                src="/logo/CCFSI_LOGO_A.png"
                alt="Constant Care Family Services Inc."
                width={378}
                height={240}
                className="h-auto w-36"
              />
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Compassionate, person-centred care and support services that
              empower individuals and families to live safely, independently,
              and with dignity.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide uppercase">
              Quick Links
            </h2>
            <AccentDash className="w-8 mt-2" />
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors text-white/70 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide uppercase">
              How We Support You
            </h2>
            <AccentDash className="w-8 mt-2" />
            <ul className="mt-4 space-y-2">
              {ourServices.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors text-white/70 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide uppercase">
              Get In Touch
            </h2>
            <AccentDash className="w-8 mt-2" />
            <p className="mt-4 space-y-0.5 text-sm leading-relaxed text-white/70">
              <Link href={telHref}>Phone: {contact.phoneDisplay}</Link>
              <Link
                className="block"
                href={mailtoHref}
              >
                {contact.email}
              </Link>
            </p>
            {status === "sent" ? (
              <p className="mt-4 text-sm text-accent">
                Thanks! You&rsquo;re on the list.
              </p>
            ) : (
              <form className="flex gap-2 mt-4" onSubmit={handleSubscribe}>
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="footer-email"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="text-white border-white/25 bg-white/10 placeholder:text-white/40 focus-visible:border-accent focus-visible:ring-accent/40"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="px-4 text-sm font-medium text-white transition-all rounded-md cursor-pointer shrink-0 bg-accent hover:bg-accent/80 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === "sending" ? "Sending..." : "Send"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="mt-2 text-xs text-white/60">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </StaggerChildren>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 mt-12 text-xs border-t sm:flex-row border-white/15 text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Constant Care Family Services Inc.
            All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="transition-colors hover:text-accent">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-accent">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
