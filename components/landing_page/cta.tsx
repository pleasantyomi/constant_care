import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StaggerChildren from "@/components/animations/stagger-children";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-white my-14 ">
      <div className="w-11/12 max-w-5xl mx-auto">
        <div className="relative px-6 py-16 overflow-hidden text-center text-white rounded-2xl bg-primary md:px-16">
          <Image
            src="/backgrounds/seamless_2D_vector_background_pattern_202605132350.jpeg"
            alt=""
            fill
            aria-hidden
            className="object-cover pointer-events-none select-none mix-blend-multiply opacity-40 pattern-drift"
          />

          <StaggerChildren className="relative">
            <h1 className="text-3xl font-semibold md:text-4xl">
              Ready to get started?
            </h1>
            <p className="max-w-xl mx-auto mt-4 text-sm leading-relaxed md:text-base text-white/80">
              Whether you need support for yourself or a loved one, our team is
              ready to build a care plan that fits your life. Reach out today
              and we&rsquo;ll take it from there.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <Button
                render={<Link href="/our-services" />}
                nativeButton={false}
                className="px-6 font-normal transition-all bg-white text-primary hover:bg-white/85 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Request a Service
              </Button>
              <Button
                render={<Link href="/contact-us" />}
                nativeButton={false}
                className="px-6 font-normal text-white transition-all bg-transparent border border-white/60 hover:bg-white/10 hover:-translate-y-0.5"
              >
                Contact Us
              </Button>
            </div>
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
