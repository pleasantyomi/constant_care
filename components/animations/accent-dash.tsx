"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** The site's teal signature dash, drawing in from zero width on scroll. */
export default function AccentDash({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          scaleX: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 92%",
            once: true,
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <span
      ref={ref}
      aria-hidden
      className={cn("block border-b-2 border-accent origin-left", className)}
    />
  );
}
