import type { ComponentType } from "react";
import {
  Users,
  Building2,
  Stethoscope,
  HandHeart,
  Activity,
  GraduationCap,
  Handshake,
  Landmark,
  ClipboardCheck,
} from "lucide-react";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";

const referrers: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
}[] = [
  { icon: Users, title: "Families" },
  { icon: Building2, title: "Hospitals" },
  { icon: Stethoscope, title: "Physicians" },
  { icon: HandHeart, title: "Social Workers" },
  { icon: Activity, title: "Occupational Therapists" },
  { icon: GraduationCap, title: "Schools" },
  { icon: Handshake, title: "Community Organizations" },
  { icon: Landmark, title: "Indigenous Communities" },
  { icon: ClipboardCheck, title: "Case Managers" },
];

export default function WhoCanRefer() {
  return (
    <section className="py-14 bg-white">
      <div className="w-11/12 mx-auto md:w-10/12">
        <FadeIn className="mb-12">
          <h1 className="text-2xl text-center md:text-3xl text-primary">
            Who Can Refer
          </h1>
          <AccentDash className="w-2/12 mx-auto mt-2 origin-center md:mt-3 md:w-1/12 border-primary" />
        </FadeIn>

        <StaggerChildren className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-9">
          {referrers.map((referrer) => (
            <article
              key={referrer.title}
              className="flex flex-col items-center p-4 text-center bg-white border rounded-lg shadow-sm border-border"
            >
              <span className="flex items-center justify-center mb-3 border rounded-full h-12 w-12 border-accent">
                <referrer.icon className="text-accent h-6 w-6" aria-hidden />
              </span>
              <p className="text-xs font-medium leading-snug text-foreground">
                {referrer.title}
              </p>
            </article>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
