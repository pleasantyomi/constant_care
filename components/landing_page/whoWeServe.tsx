import Image from "next/image";
import FadeIn from "@/components/animations/fade-in";
import AccentDash from "@/components/animations/accent-dash";
import { cn } from "@/lib/utils";

export default function WhoWeServe() {
  const whoWeServe = [
    {
      slug: "everyone-with-disabilities",
      title: "Everyone with Disabilities",
      image: "/images/adults.jpeg",
      imageAlt:
        "A support worker and client with a disability collaborating on a community activity",
      imagePosition: "right",
      paragraphs: [
        "Independence looks different for everyone. Our disability support services help children, youth, and adults build the life skills, community connections, and confidence they need to live as independently as possible, on their own terms.",
        "From personal support to employment readiness, every plan starts with the individual's own goals — not a one-size-fits-all program, whatever their age or diagnosis.",
      ],
      pullQuote: "Support should open doors, not set limits.",
      pullQuoteAttribution: "The Constant Care Team",
    },
    {
      slug: "seniors",
      title: "Seniors",
      image: "/images/senior.jpeg",
      imageAlt:
        "A senior enjoying tea with a caregiver in a bright living room",
      imagePosition: "left", // alternates per item, see map below
      paragraphs: [
        "Aging at home shouldn't mean losing independence. Our senior support services help older adults stay safe, comfortable, and connected — from companionship and wellness visits to meal preparation and transportation to the places that matter.",
        "We build every visit around dignity first. Our support workers get to know each senior's routines, preferences, and pace, so care feels less like a service and more like a trusted relationship.",
      ],
      pullQuote: "Every senior deserves to feel at home, in their home.",
      pullQuoteAttribution: "The Constant Care Team",
    },
    {
      slug: "children-youth",
      title: "Children & Youth",
      image: "/images/youth.jpeg",
      imageAlt:
        "A youth support worker mentoring a teenager at a kitchen table",
      imagePosition: "right",
      paragraphs: [
        "Young people need consistency, patience, and someone in their corner. Our youth services provide one-to-one mentoring, behavioural support, and crisis support that meets kids and teens exactly where they are.",
        "We work closely with families and schools to keep support connected across every part of a young person's life, not just the hours we're there.",
      ],
      pullQuote: "Every young person deserves someone steady to count on.",
      pullQuoteAttribution: "The Constant Care Team",
    },
    {
      slug: "complex-support-needs",
      title: "Individuals with Complex Support Needs",
      image: "/images/support.jpeg",
      imageAlt: "A caregiver providing calm, attentive hands-on assistance",
      imagePosition: "left",
      paragraphs: [
        "Some individuals need a higher, more coordinated level of care. Our team is trained to provide structured, consistent support for complex needs, with individualized care planning at the centre of everything we do.",
        "We coordinate closely with families, case managers, and healthcare providers so nothing falls through the cracks.",
      ],
      pullQuote: "Complex needs deserve coordinated, careful attention.",
      pullQuoteAttribution: "The Constant Care Team",
    },
    {
      slug: "families-caregivers",
      title: "Families & Caregivers",
      image: "/images/family.jpeg",
      imageAlt: "A multigenerational family relaxed together at home",
      imagePosition: "right",
      paragraphs: [
        "Caregiving is demanding, and no one should have to carry it alone. Our respite and family services give caregivers real relief — in-home, in the community, or on a flexible schedule that works for your family.",
        "Beyond respite, our family navigation and advocacy services help families find their way through a complicated system with someone in their corner.",
      ],
      pullQuote: "When we support the caregiver, the whole family benefits.",
      pullQuoteAttribution: "The Constant Care Team",
    },
    {
      slug: "community-members",
      title: "Community Members",
      image: "/images/community.jpeg",
      imageAlt: "A small group at a community activity",
      imagePosition: "left",
      paragraphs: [
        "Not everyone needs full-time care — some just need dependable support to stay active and connected. Our community-based services help individuals get to appointments, run errands, and take part in community life.",
        "Whether it's a weekly outing or occasional support, we meet people exactly where they are, on their schedule.",
      ],
      pullQuote: "Community support should never feel like a burden.",
      pullQuoteAttribution: "The Constant Care Team",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-white ">
      <div className="relative w-11/12 max-w-6xl mx-auto">
        <FadeIn className="mb-14">
          <h1 className="text-2xl text-center md:text-3xl text-primary">
            Who We Serve
          </h1>
          <AccentDash className="w-2/12 mx-auto mt-2 origin-center md:mt-3 md:w-1/12 border-primary" />
        </FadeIn>

        <div className="space-y-16 md:space-y-20">
          {whoWeServe.map((item) => (
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

                <div className="flex items-center gap-3 pt-2">
                  <span className="flex items-center justify-center overflow-hidden rounded-full w-9 h-9 bg-secondary">
                    <Image
                      src="/logo/CCFSI_ICON_B.png"
                      alt=""
                      aria-hidden
                      width={40}
                      height={40}
                      className="w-5 h-auto"
                    />
                  </span>
                  <div className="text-sm">
                    <p className="font-medium text-foreground">
                      {item.pullQuoteAttribution}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Constant Care Family Services
                    </p>
                  </div>
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
        </div>
      </div>
    </section>
  );
}
