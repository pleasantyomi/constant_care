"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(textRef.current!.children, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        });
        gsap.from(imageRef.current, {
          opacity: 0,
          y: 60,
          duration: 1,
          delay: 0.4,
          ease: "power2.out",
        });
      });

      // Desktop-only scroll choreography: pin the hero, widen the image to
      // full bleed, then slide it up over the text before releasing the pin.
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              // Pin from the very first scrolled pixel: the hero sits right
              // below the sticky header, so "top" aligns with the header's
              // bottom edge, not the viewport top.
              start: () =>
                `top ${document.querySelector("header")?.offsetHeight ?? 0}px`,
              end: "+=150%",
              scrub: 1,
              pin: true,
              invalidateOnRefresh: true,
            },
          });

          tl.to(imageRef.current, {
            width: "100%",
            borderRadius: 0,
            ease: "none",
          }).to(imageRef.current, {
            y: () => -imageRef.current!.offsetTop,
            ease: "none",
          });
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative md:h-svh">
      <div
        ref={textRef}
        className="md:w-[65%] w-11/12 mx-auto pt-14 pb-10 md:pb-12 space-y-3"
      >
        <h1 className="text-3xl font-semibold text-center md:text-6xl">
          Care with Purpose. <br />
          Support You Can Trust.
        </h1>
        <p className="text-center md:text-lg">
          Constant Care Family Services Inc. provides compassionate,
          person-centred care and support services that empower individuals and
          families to live safely, independently, and with dignity.
        </p>
        <div className="flex items-center justify-center space-x-2">
          <Button className="md:text-base text-sm font-normal transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-md">
            Request Services
          </Button>
          <Button className="md:text-base text-sm font-normal transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-md">
            Refer a Client
          </Button>
          <Button className="md:text-base text-sm font-normal transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-md">
            Join Our Team
          </Button>
        </div>
      </div>

      <div
        ref={imageRef}
        className="relative z-10 w-11/12 mx-auto overflow-hidden rounded-2xl"
      >
        <Image
          src="/images/heroImage.jpeg"
          alt="Hero Image"
          width={1000}
          height={500}
          className="object-cover w-full"
        />
      </div>
    </section>
  );
}
