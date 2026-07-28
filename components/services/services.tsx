import Image from "next/image";
import FadeIn from "@/components/animations/fade-in";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Services() {
  const our_services = [
    {
      slug: "home-care",
      title: "Home Care Services",
      image:
        "/images/services/Caregiver_and_adult_preparing_meal_202607191117.jpeg",
      imageAlt:
        "A caregiver and an older adult preparing a meal together in a home kitchen",
      imagePosition: "right",
      paragraphs: [
        "Helping individuals live safely, comfortably, and independently in the place they call home, with support tailored to each person's needs and pace.",
        "From personal care and daily living support to health monitoring and companionship, our home care team promotes dignity and well-being every visit.",
      ],
      link: "/our-services/home-care-services",
    },
    {
      slug: "disability-complex-support",
      title: "Disability & Complex Support",
      image:
        "/images/services/Support_worker_and_client_collab_202607191117.jpeg",
      imageAlt:
        "A support worker and an adult client collaborating on an activity at a table",
      imagePosition: "left",
      paragraphs: [
        "Individualized support that empowers people living with disabilities and complex needs to build independence, confidence, and community participation.",
        "Our team combines daily living support with clinical collaboration and goal-focused planning, so every plan reflects the person, not a diagnosis.",
      ],
      link: "/our-services/disability-complex-support",
    },
    {
      slug: "clinical-care-coordination",
      title: "Clinical Care Coordination",
      image:
        "/images/services/Home_care_support_worker_in_202607191117_6.jpeg",
      imageAlt:
        "A care coordinator reviewing a care plan document with a client",
      imagePosition: "right",
      paragraphs: [
        "Coordinating healthcare, community services, and support systems to deliver seamless, person-centred care across every provider involved.",
        "We manage assessments, care planning, and clinical collaboration, working alongside families, physicians, and allied health to keep care connected.",
      ],
      link: "/our-services/clinical-care-coordination",
    },
    {
      slug: "mental-health-behavioural-support",
      title: "Mental Health & Behavioural Support",
      image: "/images/services/behaviour.jpeg",
      imageAlt: "A support worker in a calm, attentive conversation with a client",
      imagePosition: "left",
      paragraphs: [
        "Evidence-informed behavioural science and person-centred mental wellness support that helps individuals build meaningful skills and emotional well-being.",
        "From functional behaviour assessments to Positive Behaviour Support Plans and caregiver coaching, our approach is structured, compassionate, and outcome-focused.",
      ],
      link: "/our-services/mental-health-behavioural-support",
    },
    {
      slug: "children-youth-family",
      title: "Children, Youth & Family Services",
      image:
        "/images/services/Support_worker_playing_with_child_202607191117.jpeg",
      imageAlt: "A support worker engaging warmly with a child",
      imagePosition: "right",
      paragraphs: [
        "Individualized services for children, youth, and families that promote healthy development, strengthen relationships, and support lifelong success.",
        "We support the whole family, not just the individual, through parenting support, life skills coaching, and behaviour and emotional development.",
      ],
      link: "/our-services/children-youth-family-services",
    },
    {
      slug: "senior-support",
      title: "Senior Support Services",
      image:
        "/images/services/Woman_laughing_with_caregiver_tea_202607191117_4.jpeg",
      imageAlt: "A senior and a companion sharing a laugh while gardening",
      imagePosition: "left",
      paragraphs: [
        "Helping older adults maintain independence, dignity, and quality of life while staying connected to the people and community they value most.",
        "Our team supports healthy aging through wellness visits, falls prevention, and companionship, working in partnership with families every step of the way.",
      ],
      link: "/our-services/senior-support-services",
    },
    {
      slug: "supported-living",
      title: "Supported Living Services",
      image: "/images/services/residentialHero.jpeg",
      imageAlt: "A bright, welcoming shared living room in a supported living home",
      imagePosition: "right",
      paragraphs: [
        "Individualized supports that promote independence, stability, and meaningful participation in community life for those who need a higher level of support.",
        "From daily living and personal support to 24-hour support where needed, every plan is built around the individual's own goals and pace.",
      ],
      link: "/our-services/supported-living-services",
    },
    {
      slug: "community-participation-independent-living",
      title: "Community Participation & Independent Living",
      image:
        "/images/services/Support_worker_client_sorting_gr_202607191117.jpeg",
      imageAlt:
        "An individual and a support worker shopping together in a grocery store",
      imagePosition: "left",
      paragraphs: [
        "Practical life skills, meaningful relationships, and the confidence to participate fully in community life, on each person's own terms.",
        "We support everything from budgeting and community navigation to employment coaching and recreation, so independence feels achievable, not abstract.",
      ],
      link: "/our-services/community-participation-independent-living",
    },
    {
      slug: "respite",
      title: "Respite Services",
      image:
        "/images/services/Support_worker_and_adult_conversing_202607191117.jpeg",
      imageAlt:
        "A family caregiver relaxing while a support worker engages with their loved one nearby",
      imagePosition: "right",
      paragraphs: [
        "Trusted, flexible respite that lets caregivers rest and recharge, knowing their loved one continues to receive high-quality care.",
        "Whether planned or short-notice, our respite support is scheduled around your family's real, changing needs.",
      ],
      link: "/our-services/respite-services",
    },
    {
      slug: "transportation-services",
      title: "Transportation Services",
      image: "/images/services/transportationHero.jpeg",
      imageAlt: "A support worker helping a client into a car",
      imagePosition: "left",
      paragraphs: [
        "Safe, dependable transportation and personalized accompaniment that helps individuals access healthcare, employment, education, and community life.",
        "From medical appointments to everyday errands, our team doesn't just provide a ride: they accompany and advocate every step of the way.",
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
