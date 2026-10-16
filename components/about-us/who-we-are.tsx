import Image from "next/image";
import FadeIn from "@/components/animations/fade-in";
import AccentDash from "@/components/animations/accent-dash";
import { whoWeAre } from "@/lib/about-content";

export default function WhoWeAre() {
  return (
    <section className="py-14 bg-white md:py-20">
      <div className="grid items-center w-11/12 max-w-6xl gap-10 mx-auto md:grid-cols-2 md:gap-14">
        <FadeIn y={0} x={-48} className="space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            {whoWeAre.eyebrow}
          </span>
          <AccentDash className="w-10 border-primary" />
          <h2 className="text-2xl font-bold leading-snug md:text-3xl text-primary">
            {whoWeAre.heading}
          </h2>

          {whoWeAre.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </FadeIn>

        <FadeIn y={0} x={48} className="overflow-hidden shadow-lg rounded-2xl">
          <Image
            src={whoWeAre.image.src}
            alt={whoWeAre.image.alt}
            width={800}
            height={800}
            className="object-cover w-full aspect-square"
          />
        </FadeIn>
      </div>
    </section>
  );
}
