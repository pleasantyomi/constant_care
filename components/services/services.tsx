import Image from "next/image";
import FadeIn from "@/components/animations/fade-in";
import AccentDash from "@/components/animations/accent-dash";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Services() {
  const our_services = [
    {
      slug: "seniors",
      title: "Home Care Services",
      image:
        "/images/services/Caregiver_and_adult_preparing_meal_202607191117_6.jpeg",
      imageAlt:
        "A senior enjoying tea with a caregiver in a bright living room",
      imagePosition: "right", // alternates per item, see map below
      paragraphs: [
        "Everyday support that helps individuals remain safe, comfortable, and independent in their own home, from personal care and meal preparation to medication reminders and light housekeeping.",
        "Every visit is built around the individual's own routine and preferences, so support feels like a trusted relationship rather than a checklist of tasks to complete.",
      ],
      link: "/our-services/home-care-services",
    },
    {
      slug: "disability",
      title: "Disability Support Services",
      image:
        "/images/services/Support_worker_client_community_202607191117.jpeg",
      imageAlt:
        "A support worker and adult client collaborating on a community activity",
      imagePosition: "left",
      paragraphs: [
        "Independence looks different for everyone. Our disability support services help adults build the life skills, community connections, and confidence they need to live as independently as possible, on their own terms.",
        "From personal support to employment readiness, every plan starts with the individual's own goals, not a one-size-fits-all program.",
      ],
      link: "/our-services/disability-support-services",
    },
    {
      slug: "community",
      title: "Community Support",
      image:
        "/images/services/Group_walking_on_path_conversing_202607191117.jpeg",
      imageAlt:
        "A youth support worker mentoring a teenager at a kitchen table",
      imagePosition: "right",
      paragraphs: [
        "Support that helps individuals participate fully and confidently in community life, from shopping assistance and medical appointments to social activities and daily living skills.",
        "We meet people where they are, whether that's running errands, attending a program, or simply staying connected to the community around them.",
      ],
      link: "/our-services/community-support",
    },
    {
      slug: "respite",
      title: "Respite Services",
      image:
        "/images/services/Support_worker_and_adult_conversing_202607191117_3.jpeg",
      imageAlt: "A caregiver providing calm, attentive hands-on assistance",
      imagePosition: "left",
      paragraphs: [
        "Reliable relief for family caregivers, so they can rest, recharge, and return to caregiving with renewed strength, available in-home or through community-based respite.",
        "Respite care is scheduled around your family's real, changing needs, never a rigid, one-size-fits-all plan.",
      ],
      link: "/our-services/respite-services",
    },
    {
      slug: "youth",
      title: "Youth Services",
      image:
        "/images/services/Youth_worker_mentoring_teenager_202607191117.jpeg",
      imageAlt: "A multigenerational family relaxed together at home",
      imagePosition: "right",
      paragraphs: [
        "Dedicated one-to-one support that helps children and young people build skills, confidence, and stability, through mentoring, behavioural support, and life skills coaching.",
        "We work closely with families and schools to keep support connected across every part of a young person's life, not just the hours we're there.",
      ],
      link: "/our-services/youth-services",
    },
    {
      slug: "senior",
      title: "Senior Support Services",
      image: "/images/senior.jpeg",
      imageAlt: "A small group at a community activity",
      imagePosition: "left",
      paragraphs: [
        "Compassionate support that helps seniors stay active, connected, and comfortable at home, from companion care and wellness visits to meal preparation and transportation.",
        "We build every visit around dignity first, so care feels less like a service and more like a trusted relationship.",
      ],
      link: "/our-services/senior-support-services",
    },
    {
      slug: "residential",
      title: "Residential Services",
      image: "/images/services/support.jpeg",
      imageAlt: "A small group at a community activity",
      imagePosition: "right",
      paragraphs: [
        "Structured, individualized residential support for youth and adults who need a higher level of care, with planning built around each person's needs and goals.",
        "Reach out to discuss availability and eligibility: our team can walk you through what residential support could look like for your family.",
      ],
      link: "/our-services/residential-services",
    },
    {
      slug: "family",
      title: "Family Services",
      image: "/images/services/Family_laughing_on_couch_202607191117.jpeg",
      imageAlt: "A small group at a community activity",
      imagePosition: "left",
      paragraphs: [
        "Support that strengthens and empowers the whole family, not just the individual receiving care, including parent support, family navigation, and care coordination.",
        "We stand beside families as they navigate a complex care system, so no one has to figure it out alone.",
      ],
      link: "/our-services/family-services",
    },
    {
      slug: "transportation",
      title: "Transportation Services",
      image: "/images/services/transportation.jpeg",
      imageAlt: "A small group at a community activity",
      imagePosition: "right",
      paragraphs: [
        "Dependable transportation that keeps individuals connected to medical appointments, shopping, community activities, and the people who matter most.",
        "Every ride is scheduled with care, so getting there is never the hardest part of the day.",
      ],
      link: "/our-services/transportation-services",
    },
  ];
  return (
    <section className="w-11/12 py-14 mx-auto">
      <div className="space-y-16 md:space-y-20">
        {our_services.map((item) => (
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
              <h2 className="text-2xl font-bold text-primary">{item.title}</h2>

              {item.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}

              <div className="flex items-center gap-3 pt-2">
                <Button
                  render={
                    <Link
                      href={`/contact-us?service=${encodeURIComponent(item.title)}`}
                    />
                  }
                  nativeButton={false}
                  className="font-normal transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  Request This Service
                </Button>
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-2 transition-colors group text-accent hover:text-primary"
                >
                  Learn More
                  <ArrowRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>
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
      </div>{" "}
    </section>
  );
}
