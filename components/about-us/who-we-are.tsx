import Image from "next/image";
import FadeIn from "@/components/animations/fade-in";
import AccentDash from "@/components/animations/accent-dash";

export default function WhoWeAre() {
  return (
    <section className="py-14 bg-white md:py-20">
      <div className="grid items-center w-11/12 max-w-6xl gap-10 mx-auto md:grid-cols-2 md:gap-14">
        <FadeIn y={0} x={-48} className="space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            Who We Are
          </span>
          <AccentDash className="w-10 border-primary" />
          <h2 className="text-2xl font-bold leading-snug md:text-3xl text-primary">
            More Than Care. A Commitment to Better Lives.
          </h2>

          <p className="text-sm leading-relaxed text-muted-foreground">
            Constant Care Family Services is a Canadian community care
            organization dedicated to delivering exceptional support that
            empowers individuals to thrive. We believe every person deserves
            the opportunity to live safely, independently, and with
            dignity, regardless of age, ability, or circumstance.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Our team provides personalized services built around each
            individual&rsquo;s goals, strengths, and aspirations. Rather than
            offering one-size-fits-all solutions, we create meaningful
            support plans that promote independence, inclusion, confidence,
            and long-term well-being.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Every interaction is guided by compassion, professionalism, and
            an unwavering commitment to excellence.
          </p>
        </FadeIn>

        <FadeIn y={0} x={48} className="overflow-hidden shadow-lg rounded-2xl">
          <Image
            src="/images/about_hero.jpeg"
            alt="A support worker and client sharing a warm conversation"
            width={800}
            height={800}
            className="object-cover w-full aspect-square"
          />
        </FadeIn>
      </div>
    </section>
  );
}
