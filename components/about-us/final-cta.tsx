import Link from "next/link";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";

export default function FinalCta() {
  return (
    <section className="py-14 bg-white md:py-20">
      <FadeIn className="w-11/12 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold leading-snug md:text-3xl text-primary">
          Together, We Can Build Stronger Communities.
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Whether you are seeking support for yourself or a loved one,
          looking to partner with us, or interested in joining our team, we
          invite you to discover the Constant Care difference.
        </p>

        <StaggerChildren className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Button
            render={<Link href="/contact-us" />}
            nativeButton={false}
            className="font-normal transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Contact Us
          </Button>
          <Button
            render={<Link href="/referrals" />}
            nativeButton={false}
            variant="outline"
            className="font-normal transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Refer a Client
          </Button>
          <Button
            render={<Link href="/careers" />}
            nativeButton={false}
            variant="outline"
            className="font-normal transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Join Our Team
          </Button>
        </StaggerChildren>

        <p className="mt-10 text-sm italic font-medium tracking-wide text-accent">
          Care with Purpose. Support You Can Trust.
        </p>
      </FadeIn>
    </section>
  );
}
