import type { ComponentType } from "react";
import {
  Accessibility,
  Backpack,
  HandHeart,
  UserRound,
  Compass,
  Handshake,
  Landmark,
  Building2,
} from "lucide-react";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";
import { audiences as sharedAudiences, type AudienceIcon } from "@/lib/about-content";

const icons: Record<AudienceIcon, ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  Accessibility,
  Backpack,
  HandHeart,
  UserRound,
  Compass,
  Handshake,
  Landmark,
  Building2,
};

// Copy lives in packages/shared so the mobile app shows the same list.
const audiences = sharedAudiences.map((audience) => ({ ...audience, icon: icons[audience.icon] }));

export default function WhoWeServe() {
  return (
    <section className="py-14 bg-secondary/40 md:py-20">
      <div className="w-11/12 mx-auto md:w-10/12">
        <FadeIn className="mb-12 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            Who We Serve
          </span>
          <AccentDash className="w-10 mx-auto mt-2 origin-center border-primary" />
          <h2 className="mt-4 text-2xl font-bold leading-snug md:text-3xl text-primary">
            We Proudly Support
          </h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {audiences.map((audience) => (
            <article
              key={audience.title}
              className="flex flex-col items-center p-4 text-center bg-white border rounded-lg shadow-sm border-border"
            >
              <span className="flex items-center justify-center mb-3 border rounded-full h-12 w-12 border-accent">
                <audience.icon className="text-accent h-6 w-6" aria-hidden />
              </span>
              <p className="text-xs font-medium leading-snug text-foreground">
                {audience.title}
              </p>
            </article>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
