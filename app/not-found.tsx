import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Background from "@/components/shared/background";
import FadeIn from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <div>
      <Background>Page Not Found</Background>

      <section className="w-11/12 py-16 mx-auto text-center md:w-8/12 lg:w-6/12 md:py-20">
        <FadeIn>
          <Image
            src="/logo/CCFSI_ICON_B.png"
            alt="Constant Care Family Services"
            width={100}
            height={50}
            className="w-10 h-auto mx-auto mb-6"
          />
          <p className="text-7xl font-bold md:text-8xl text-primary">404</p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            We couldn&rsquo;t find the page you were looking for. It may have
            moved, or the link might be outdated.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Button
              render={<Link href="/" />}
              nativeButton={false}
              className="font-normal transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              Back to Home
            </Button>
            <Button
              render={<Link href="/our-services" />}
              nativeButton={false}
              variant="outline"
              className="font-normal transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              Browse Our Services
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Still stuck?{" "}
            <Link
              href="/contact-us"
              className="transition-colors text-accent hover:text-primary"
            >
              Contact us
            </Link>{" "}
            and we&rsquo;ll help you find what you need.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
