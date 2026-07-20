import type { ComponentType } from "react";
import { PhoneCall, ClipboardList, HeartHandshake, Workflow } from "lucide-react";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";

const steps: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  description: string;
}[] = [
  {
    icon: PhoneCall,
    title: "Reach Out",
    description:
      "It starts with a conversation. Contact us or send a referral, and we'll listen to what you and your family actually need.",
  },
  {
    icon: ClipboardList,
    title: "Build the Plan",
    description:
      "Together we create a personalized care plan around the individual's goals, routines, and preferences — never a one-size-fits-all program.",
  },
  {
    icon: HeartHandshake,
    title: "Meet Your Team",
    description:
      "We match each individual with trained, compassionate support workers who fit their personality and needs, not just their schedule.",
  },
  {
    icon: Workflow,
    title: "Stay Coordinated",
    description:
      "Care doesn't stand still. We review, adjust, and coordinate with families and partners so support keeps fitting real life.",
  },
];

export default function Approach() {
  return (
    <section className="py-14 bg-secondary/40 md:py-20">
      <div className="w-11/12 mx-auto md:w-10/12">
        <FadeIn className="max-w-3xl mx-auto mb-12 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            Our Approach
          </span>
          <AccentDash className="w-10 mx-auto mt-2 origin-center border-primary" />
          <h2 className="mt-4 text-2xl font-bold leading-snug md:text-3xl text-primary">
            Person-Centred. Evidence-Informed. Community-Focused.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Every individual has unique goals, strengths, experiences, and
            aspirations. Our approach begins by listening.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We work alongside individuals and families to develop
            personalized support plans that respect personal choices while
            promoting independence, safety, community participation, and
            long-term success. By combining evidence-informed practices with
            compassionate relationships, we deliver care that adapts as
            people&rsquo;s needs evolve.
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="relative flex flex-col p-6 bg-white border rounded-lg shadow-sm border-border"
            >
              <span
                aria-hidden
                className="absolute text-5xl font-bold select-none top-4 right-5 text-secondary"
              >
                {index + 1}
              </span>
              <span className="flex items-center justify-center mb-4 border rounded-full h-14 w-14 border-accent">
                <step.icon className="text-accent h-7 w-7" aria-hidden />
              </span>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </article>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
