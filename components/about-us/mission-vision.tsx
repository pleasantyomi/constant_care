import Image from "next/image";
import FadeIn from "@/components/animations/fade-in";
import { missionVision } from "@/lib/about-content";
import AccentDash from "@/components/animations/accent-dash";

// Copy lives in packages/shared so the mobile app shows the same text.
const cards = missionVision;

export default function MissionVision() {
  return (
    <section className="relative py-14 overflow-hidden bg-primary md:py-20">
      <Image
        src="/backgrounds/seamless_2D_vector_background_pattern_202605132350.jpeg"
        alt=""
        fill
        aria-hidden
        className="object-cover pointer-events-none select-none mix-blend-multiply opacity-40 pattern-drift"
      />

      <div className="relative grid w-11/12 max-w-6xl gap-8 mx-auto md:grid-cols-2">
        {cards.map((card) => (
          <FadeIn
            key={card.slug}
            className="p-8 bg-white shadow-lg rounded-2xl md:p-10"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">
              {card.title}
            </span>
            <AccentDash className="w-10 mt-2 border-primary" />
            <h2 className="mt-4 text-xl font-bold leading-snug text-primary">
              {card.heading}
            </h2>
            {card.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-sm leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
