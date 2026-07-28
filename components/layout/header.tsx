"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, services } from "@/lib/nav";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isAdmin = pathname.startsWith("/admin");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close every open menu when navigation happens.
  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Close the services dropdown on outside click or Escape.
  useEffect(() => {
    if (!servicesOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClasses = (href: string) =>
    cn(
      "transition-colors hover:text-accent",
      isActive(href) && "text-accent font-medium",
    );

  // Admin is its own internal tool, not part of the public marketing site.
  if (isAdmin) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full py-4 bg-white transition-shadow duration-300",
        scrolled && "shadow-md",
      )}
    >
      <div className="flex items-center justify-between w-11/12 mx-auto">
        <Link href="/" aria-label="Constant Care Family Services, Home">
          <Image
            src="/logo/CCFSI_ICON_B.png"
            alt="Constant Care Family Services logo"
            width={100}
            height={50}
            className="w-8 h-auto"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="items-center hidden md:hidden gap-8 text-sm lg:flex">
          {mainNav.map((link) =>
            link.href === "/our-services" ? (
              <div
                key={link.label}
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <div className="flex items-center gap-0.5">
                  <Link href={link.href} className={linkClasses(link.href)}>
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    aria-label="Toggle services menu"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => setServicesOpen((open) => !open)}
                    className={cn(
                      "cursor-pointer transition-colors hover:text-accent",
                      isActive(link.href) && "text-accent",
                    )}
                  >
                    <ChevronDown
                      size={18}
                      className={cn(
                        "transition-transform duration-200",
                        servicesOpen && "rotate-180",
                      )}
                    />
                  </button>
                </div>

                {servicesOpen && (
                  <div className="absolute left-0 w-64 top-full pt-3">
                    <div className="py-2 bg-white border rounded-md shadow-lg border-border animate-in fade-in slide-in-from-top-2 duration-200">
                      {services.map((service) => (
                        <Link
                          key={service.label}
                          href={service.href}
                          onClick={() => setServicesOpen(false)}
                          className="block px-4 py-2 text-sm transition-colors hover:bg-secondary hover:text-primary"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={linkClasses(link.href)}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="cursor-pointer lg:hidden text-foreground"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile navigation panel */}
      {mobileOpen && (
        <nav className="absolute left-0 w-full bg-white border-t shadow-md lg:hidden top-full border-border animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col w-11/12 py-3 mx-auto text-sm">
            {mainNav.map((link) =>
              link.href === "/our-services" ? (
                <div key={link.label}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn("py-2.5", linkClasses(link.href))}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      aria-label="Toggle services list"
                      aria-expanded={mobileServicesOpen}
                      onClick={() => setMobileServicesOpen((open) => !open)}
                      className="p-2 cursor-pointer"
                    >
                      <ChevronDown
                        size={18}
                        className={cn(
                          "transition-transform duration-200",
                          mobileServicesOpen && "rotate-180",
                        )}
                      />
                    </button>
                  </div>
                  {mobileServicesOpen && (
                    <div className="flex flex-col pl-4 border-l border-border">
                      {services.map((service) => (
                        <Link
                          key={service.label}
                          href={service.href}
                          onClick={() => setMobileOpen(false)}
                          className="py-2 transition-colors text-muted-foreground hover:text-accent"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn("py-2.5", linkClasses(link.href))}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
