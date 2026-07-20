import Image from "next/image";
import FadeIn from "@/components/animations/fade-in";
import AccentDash from "@/components/animations/accent-dash";

const cards = [
  {
    slug: "mission",
    title: "Our Mission",
    heading: "Transforming Lives Through Purposeful Care",
    paragraphs: [
      "Our mission is to deliver compassionate, innovative, and person-centred support that empowers individuals to achieve greater independence while strengthening families and creating healthier, more inclusive communities.",
      "We are committed to providing exceptional services through professional excellence, integrity, collaboration, and continuous innovation, ensuring every individual receives the support they need to reach their fullest potential.",
    ],
  },
  {
    slug: "vision",
    title: "Our Vision",
    heading: "Shaping the Future of Community Care",
    paragraphs: [
      "Our vision is to become Canada's most trusted community care organization, recognized for transforming lives through innovation, leadership, and exceptional service.",
      "We envision communities where every individual—regardless of age, ability, or circumstance—has equitable access to opportunities, compassionate support, and the resources needed to live with dignity, purpose, and confidence.",
    ],
  },
];

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
