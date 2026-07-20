import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StaggerChildren from "@/components/animations/stagger-children";

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden bg-primary md:py-24">
      <Image
        src="/backgrounds/seamless_2D_vector_background_pattern_202605132350.jpeg"
        alt=""
        fill
        aria-hidden
        className="object-cover pointer-events-none select-none mix-blend-multiply opacity-40 pattern-drift"
      />

      <StaggerChildren className="relative w-11/12 max-w-3xl mx-auto text-center text-white">
        <h1 className="text-2xl font-semibold leading-tight md:text-3xl lg:text-5xl">
          Redefining Community Care Through Compassion, Innovation, and
          Excellence.
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-sm leading-relaxed md:text-base text-white/85">
          At Constant Care Family Services, we deliver person-centred support
          that empowers individuals, strengthens families, and builds more
          inclusive communities. Through compassionate care, trusted
          partnerships, and innovative solutions, we help people live with
          greater independence, dignity, and confidence.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Button
            render={<Link href="/our-services" />}
            nativeButton={false}
            className="font-normal transition-all bg-white text-primary hover:bg-white/85 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Explore Our Services
          </Button>
          <Button
            render={<Link href="/contact-us" />}
            nativeButton={false}
            className="font-normal text-white transition-all bg-transparent border border-white/60 hover:bg-white/10 hover:-translate-y-0.5"
          >
            Contact Us
          </Button>
        </div>
      </StaggerChildren>
    </section>
  );
}
