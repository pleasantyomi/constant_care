import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/fade-in";
import AccentDash from "@/components/animations/accent-dash";

export const trustIntro = {
  eyebrowLine: true,
  headingLine1: "Families across New Brunswick trust us",
  headingLine2: "to deliver compassionate, coordinated care.",
  highlightPhrase: "dedicated, trained support",
  paragraph:
    "We add {highlight} to every family we work with. Our value isn't limited to a single visit — it's in the consistency, coordination, and follow-through across the whole care journey. We're a person-centred care organization that stands behind every plan we build.",
  linkText: "Learn Our Story",
  linkHref: "/about",
  image: {
    src: "/images/outro.jpeg",
    alt: "A caregiver and client preparing a meal together at home",
  },
};

function HighlightedParagraph({
  template,
  highlight,
}: {
  template: string;
  highlight: string;
}) {
  const [before, after] = template.split("{highlight}");
  return (
    <p className="text-sm leading-relaxed lg:text-base md:text-sm text-muted-foreground">
      {before}
      <span className="text-accent">{highlight}</span>
      {after}
    </p>
  );
}

export default function Outro() {
  return (
    <section className="my-20 bg-white md:py-14">
      <div className="grid items-center w-11/12 max-w-6xl gap-10 mx-auto md:grid-cols-2 md:gap-14">
        <FadeIn y={0} x={-48} className="space-y-4">
          {trustIntro.eyebrowLine && <AccentDash className="w-10" />}
          <h1 className="text-2xl leading-snug md:text-2xl lg:text-3xl">
            <span className="block text-foreground">
              {trustIntro.headingLine1}
            </span>
            <span className="block font-bold text-primary">
              {trustIntro.headingLine2}
            </span>
          </h1>

          <HighlightedParagraph
            template={trustIntro.paragraph}
            highlight={trustIntro.highlightPhrase}
          />

          <Link
            href={trustIntro.linkHref}
            className="inline-flex items-center gap-2 pt-2 transition-colors group text-accent hover:text-primary"
          >
            {trustIntro.linkText}
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </FadeIn>

        <FadeIn y={0} x={48} className="overflow-hidden shadow-lg rounded-2xl">
          <Image
            src={trustIntro.image.src}
            alt={trustIntro.image.alt}
            width={1200}
            height={800}
            className="object-cover w-full aspect-video"
          />
        </FadeIn>
      </div>
    </section>
  );
}
