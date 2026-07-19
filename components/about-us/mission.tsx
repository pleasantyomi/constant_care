import Image from "next/image";
import FadeIn from "@/components/animations/fade-in";
import { cn } from "@/lib/utils";
import AccentDash from "@/components/animations/accent-dash";

export default function Mission() {
  const contents = [
    {
      slug: "mission",
      title: "Misson Statement",
      image: "/images/senior.jpeg",
      imageAlt:
        "A senior enjoying tea with a caregiver in a bright living room",
      imagePosition: "left", // alternates per item, see map below
      paragraphs: [
        "To provide inclusive, person-centered care through a coordinated and streamlined approach that ensures individuals and families receive consistent, high-quality support. ",
        "We are committed to promoting dignity, independence, and well-being through reliable and purposeful service delivery",
      ],
      pullQuote: "Your Comfort Zone Is Here.",
    },
    {
      slug: "vision",
      title: "Vision Statement",
      image: "/images/community.jpeg",
      imageAlt:
        "A senior enjoying tea with a caregiver in a bright living room",
      imagePosition: "right", // alternates per item, see map below
      paragraphs: [
        "To be a trusted leader in inclusive, coordinated care, recognized for delivering seamless, high-quality support that enhances outcomes for individuals and families while setting the standard for reliability, integrity, and excellence. ",
      ],
      pullQuote: "Your Comfort Zone Is Here.",
    },
  ];
  return (
    <section className="w-11/12 py-12 mx-auto md:w-11/12 md:py-14 lg::w-10/12">
      <div>
        <div className="space-y-14 md:space-y-20">
          {contents.map((item) => (
            <article
              key={item.slug}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              <FadeIn
                y={0}
                x={item.imagePosition === "left" ? 48 : -48}
                className={cn(
                  "space-y-4",
                  item.imagePosition === "left" && "md:order-2",
                )}
              >
                <h2 className="text-2xl font-bold text-primary">
                  {item.title}
                </h2>

                {item.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}

                <blockquote className="pl-4 text-sm italic leading-relaxed border-l-2 text-accent border-accent">
                  &ldquo;{item.pullQuote}&rdquo;
                </blockquote>
              </FadeIn>

              <FadeIn
                y={0}
                x={item.imagePosition === "left" ? -48 : 48}
                className={cn(item.imagePosition === "left" && "md:order-1")}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={800}
                  height={600}
                  className="object-cover w-full rounded-lg shadow-md aspect-4/3"
                />
              </FadeIn>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
