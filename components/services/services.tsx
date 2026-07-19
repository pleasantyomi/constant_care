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
        "Aging at home shouldn't mean losing independence. Our senior support services help older adults stay safe, comfortable, and connected — from companionship and wellness visits to meal preparation and transportation to the places that matter.",
        "We build every visit around dignity first. Our support workers get to know each senior's routines, preferences, and pace, so care feels less like a service and more like a trusted relationship.",
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
        "From personal support to employment readiness, every plan starts with the individual's own goals — not a one-size-fits-all program.",
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
        "Young people need consistency, patience, and someone in their corner. Our youth services provide one-to-one mentoring, behavioural support, and crisis support that meets kids and teens exactly where they are.",
        "We work closely with families and schools to keep support connected across every part of a young person's life, not just the hours we're there.",
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
        "Some individuals need a higher, more coordinated level of care. Our team is trained to provide structured, consistent support for complex needs, with individualized care planning at the centre of everything we do.",
        "We coordinate closely with families, case managers, and healthcare providers so nothing falls through the cracks.",
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
        "Caregiving is demanding, and no one should have to carry it alone. Our respite and family services give caregivers real relief — in-home, in the community, or on a flexible schedule that works for your family.",
        "Beyond respite, our family navigation and advocacy services help families find their way through a complicated system with someone in their corner.",
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
        "Not everyone needs full-time care — some just need dependable support to stay active and connected. Our community-based services help individuals get to appointments, run errands, and take part in community life.",
        "Whether it's a weekly outing or occasional support, we meet people exactly where they are, on their schedule.",
      ],
      link: "/our-services/senior-support-service",
    },
    {
      slug: "residential",
      title: "Residential Services",
      image: "/images/services/support.jpeg",
      imageAlt: "A small group at a community activity",
      imagePosition: "right",
      paragraphs: [
        "Not everyone needs full-time care — some just need dependable support to stay active and connected. Our community-based services help individuals get to appointments, run errands, and take part in community life.",
        "Whether it's a weekly outing or occasional support, we meet people exactly where they are, on their schedule.",
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
        "Not everyone needs full-time care — some just need dependable support to stay active and connected. Our community-based services help individuals get to appointments, run errands, and take part in community life.",
        "Whether it's a weekly outing or occasional support, we meet people exactly where they are, on their schedule.",
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
        "Not everyone needs full-time care — some just need dependable support to stay active and connected. Our community-based services help individuals get to appointments, run errands, and take part in community life.",
        "Whether it's a weekly outing or occasional support, we meet people exactly where they are, on their schedule.",
      ],
      link: "/our-services/transportation-service",
    },
  ];
  return (
    <section className="w-11/12 mx-auto py-10">
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
                <Button className="font-normal">Request This Service</Button>
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
