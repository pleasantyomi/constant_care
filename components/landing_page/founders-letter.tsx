import Image from "next/image";
import { Quote } from "lucide-react";
import FadeIn from "@/components/animations/fade-in";
import AccentDash from "@/components/animations/accent-dash";

export default function FoundersLetter() {
  return (
    <section className="relative py-20 overflow-hidden bg-secondary/40 md:py-24">
      <div className="relative w-11/12 max-w-3xl mx-auto">
        <FadeIn className="mb-10 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            From Our Founders
          </span>
          <AccentDash className="w-10 mx-auto mt-2 origin-center border-primary" />
          <h1 className="mt-4 text-2xl font-bold leading-snug text-primary md:text-3xl">
            A Letter From Our Founders
          </h1>
        </FadeIn>

        <FadeIn className="relative p-8 bg-white shadow-lg rounded-2xl md:p-12">
          <Quote
            className="absolute w-10 h-10 text-accent/20 top-6 left-6 md:top-8 md:left-8"
            aria-hidden
          />

          <div className="relative space-y-5 text-sm leading-relaxed md:text-base text-muted-foreground">
            <p className="text-base font-semibold leading-snug md:text-lg text-primary">
              Every person deserves to be seen. Every voice deserves to be
              heard. Every life deserves the opportunity to flourish.
            </p>

            <p>
              That simple belief is the heart of{" "}
              <strong className="font-semibold text-foreground">
                Constant Care Family Services
              </strong>
              .
            </p>

            <p>
              We founded Constant Care because we believe care has the power
              to change lives, not only through the services we provide,
              but through the hope we restore, the confidence we build, and
              the futures we help shape. Our vision has always been greater
              than providing support; it is about creating opportunities,
              fostering independence, and helping people realize their full
              potential.
            </p>

            <p>
              As immigrants and members of a minority community, we
              understand what it means to overcome barriers, embrace new
              beginnings, and build a future through resilience,
              determination, and the support of others. Those experiences
              shaped our values and strengthened our belief that when people
              are treated with dignity, compassion, and genuine belief in
              their potential, extraordinary things become possible.
            </p>

            <p className="font-medium text-foreground">
              That belief is the foundation of Constant Care.
            </p>

            <p>
              We believe every individual, regardless of age, ability,
              background, culture, or life circumstance, deserves the
              opportunity to live with dignity, purpose, and belonging. Our
              role is not to walk ahead of those we serve or behind them, but
              beside them, offering encouragement, guidance, and unwavering
              support through every step of their journey.
            </p>

            <p>
              To us, care is deeply personal. It begins with listening
              without judgment, building trust, and creating meaningful
              relationships that empower people to thrive. Whether we are
              supporting children, youth, adults, seniors, individuals living
              with disabilities, newcomers, or families navigating life&rsquo;s
              challenges, our commitment remains the same: to help people
              discover hope, confidence, and new possibilities.
            </p>

            <p>
              As founders, our promise is simple: we will always lead with
              integrity, serve with compassion, and remain steadfast in our
              commitment to improving lives. Every decision we make is guided
              by one question:
            </p>

            <blockquote className="pl-4 italic border-l-2 text-accent border-accent">
              &ldquo;Will this create a better future for the people we
              serve?&rdquo;
            </blockquote>

            <p>If the answer is yes, we know we are fulfilling our purpose.</p>

            <p>
              Thank you for allowing us to be part of your journey. It is an
              honour to walk alongside you and help build a future filled
              with hope, opportunity, and possibility.
            </p>

            <p className="font-medium text-foreground">
              Because at Constant Care, we believe care is not just about
              meeting today&rsquo;s needs: it is about creating
              tomorrow&rsquo;s possibilities.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-6 mt-8 border-t border-border">
            <span className="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full bg-secondary">
              <Image
                src="/logo/CCFSI_ICON_B.png"
                alt=""
                aria-hidden
                width={40}
                height={40}
                className="w-6 h-auto"
              />
            </span>
            <div className="text-sm text-left">
              <p className="font-medium text-foreground">
                With gratitude, Tife &amp; Festus
              </p>
              <p className="text-xs text-muted-foreground">
                Co-Founders, Constant Care Family Services
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-8 text-center">
          <p className="text-sm italic font-medium tracking-wide text-accent">
            Care with Purpose. Support You Can Trust.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
