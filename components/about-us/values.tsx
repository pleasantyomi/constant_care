import type { ComponentType } from "react";
import {
  Heart,
  Award,
  BadgeCheck,
  TrendingUp,
  Users,
  Handshake,
} from "lucide-react";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";
import { values as sharedValues, type ValueIcon } from "@/lib/about-content";

const icons: Record<ValueIcon, ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  Heart,
  Award,
  BadgeCheck,
  TrendingUp,
  Users,
  Handshake,
};

// Copy lives in packages/shared so the mobile app shows the same values.
const values = sharedValues.map((value) => ({ ...value, icon: icons[value.icon] }));

export default function Values() {
  return (
    <section className="py-14 bg-white md:py-20">
      <div className="w-11/12 mx-auto md:w-10/12">
        <FadeIn className="mb-12 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            Our Values
          </span>
          <AccentDash className="w-10 mx-auto mt-2 origin-center border-primary" />
        </FadeIn>

        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="flex flex-col p-6 bg-white border rounded-lg shadow-sm border-border"
            >
              <span className="flex items-center justify-center mb-4 border rounded-full h-14 w-14 border-accent">
                <value.icon className="text-accent h-7 w-7" aria-hidden />
              </span>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </article>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
