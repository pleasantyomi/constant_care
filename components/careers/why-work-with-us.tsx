import type { ComponentType } from "react";
import { Heart, CalendarClock, GraduationCap, Users, TrendingUp } from "lucide-react";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";

// Pay, benefits, and scheduling specifics must be confirmed with the
// Constant Care team before publishing — this section intentionally sticks
// to qualitative points only.
const reasons: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
}[] = [
  { icon: Heart, title: "Meaningful, purpose-driven work" },
  { icon: CalendarClock, title: "Flexible scheduling" },
  { icon: GraduationCap, title: "Ongoing training and professional development" },
  { icon: Users, title: "A supportive, team-oriented culture" },
  { icon: TrendingUp, title: "Opportunities for growth within the organization" },
];

export default function WhyWorkWithUs() {
  return (
    <section className="py-14 bg-white">
      <div className="w-11/12 mx-auto md:w-10/12">
        <FadeIn className="mb-12">
          <h1 className="text-2xl text-center md:text-3xl text-primary">
            Why Work With Us
          </h1>
          <AccentDash className="w-2/12 mx-auto mt-2 origin-center md:mt-3 md:w-1/12 border-primary" />
        </FadeIn>

        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {reasons.map((reason) => (
            <article
              key={reason.title}
              className="flex flex-col items-center p-6 text-center bg-white border rounded-lg shadow-sm border-border"
            >
              <span className="flex items-center justify-center mb-4 border rounded-full h-14 w-14 border-accent">
                <reason.icon className="text-accent h-7 w-7" aria-hidden />
              </span>
              <p className="text-sm font-medium leading-relaxed text-foreground">
                {reason.title}
              </p>
            </article>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
