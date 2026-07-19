import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import AccentDash from "@/components/animations/accent-dash";
import StaggerChildren from "@/components/animations/stagger-children";
import { mainNav as quickLinks, services as ourServices } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="relative py-20 mt-24 overflow-hidden text-white bg-primary">
      <Image
        src="/backgrounds/seamless_2D_vector_pattern_design_202605132257.jpeg"
        alt=""
        fill
        aria-hidden
        className="object-cover pointer-events-none select-none mix-blend-multiply opacity-40 pattern-drift"
      />

      <div className="relative w-11/12 mx-auto">
        <StaggerChildren className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src="/logo/CCFSI_LOGO_A.png"
              alt="Constant Care Family Services Inc."
              width={378}
              height={240}
              className="h-auto w-36"
            />
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
              Our Services
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
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Leave your email and our team will get back to you.
            </p>
            {/* Add phone/email lines here once the official contact details
                are confirmed. */}
            <form className="flex gap-2 mt-4">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <Input
                id="footer-email"
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="text-white border-white/25 bg-white/10 placeholder:text-white/40 focus-visible:border-accent focus-visible:ring-accent/40"
              />
              <button
                type="submit"
                className="px-4 text-sm font-medium text-white transition-all rounded-md cursor-pointer shrink-0 bg-accent hover:bg-accent/80 hover:-translate-y-0.5 hover:shadow-md"
              >
                Send
              </button>
            </form>
          </div>
        </StaggerChildren>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 mt-12 text-xs border-t sm:flex-row border-white/15 text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Constant Care Family Services Inc.
            All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/" className="transition-colors hover:text-accent">
              Privacy Policy
            </Link>
            <Link href="/" className="transition-colors hover:text-accent">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
