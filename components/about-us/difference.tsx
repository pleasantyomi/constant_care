import Image from "next/image";
import type { ComponentType } from "react";
import {
  UserCheck,
  GraduationCap,
  HeartHandshake,
  Users,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";

const features: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  description: string;
}[] = [
  {
    icon: UserCheck,
    title: "Personalized Support",
    description:
      "Every care plan is designed around the individual—not a standard checklist.",
  },
  {
    icon: GraduationCap,
    title: "Highly Trained Professionals",
    description:
      "Our team is committed to continuous learning, best practices, and delivering exceptional service.",
  },
  {
    icon: HeartHandshake,
    title: "Trusted Relationships",
    description:
      "We build lasting partnerships founded on communication, respect, and reliability.",
  },
  {
    icon: Users,
    title: "Community Connections",
    description:
      "We help individuals build meaningful relationships and participate fully in their communities.",
  },
  {
    icon: Sparkles,
    title: "Holistic Care",
    description:
      "We focus on emotional, physical, social, and personal well-being—not just daily tasks.",
  },
  {
    icon: ShieldCheck,
    title: "Quality You Can Trust",
    description:
      "Every service reflects our commitment to safety, professionalism, compassion, and excellence.",
  },
];

export default function Difference() {
  return (
    <section className="relative py-14 overflow-hidden bg-primary md:py-20">
      <Image
        src="/backgrounds/seamless_2D_vector_background_pattern_202605132350.jpeg"
        alt=""
        fill
        aria-hidden
        className="object-cover pointer-events-none select-none mix-blend-multiply opacity-40 pattern-drift"
      />

      <div className="relative w-11/12 mx-auto md:w-10/12">
        <FadeIn className="mb-12 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            The Constant Care Difference
          </span>
          <AccentDash className="w-10 mx-auto mt-2 origin-center border-white" />
          <h2 className="mt-4 text-2xl font-bold leading-snug text-white md:text-3xl">
            Why Families Choose Us
          </h2>
        </FadeIn>

        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col p-6 bg-white shadow-md rounded-lg"
            >
              <span className="flex items-center justify-center mb-4 border rounded-full h-14 w-14 border-accent">
                <feature.icon className="text-accent h-7 w-7" aria-hidden />
              </span>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
