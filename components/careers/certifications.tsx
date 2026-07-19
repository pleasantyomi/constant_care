import Image from "next/image";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";

// Placeholder list — confirm the organization's actual certification
// requirements per role before publishing as final. Framed below as
// "common requirements" rather than a hard, role-specific mandate.
const certifications = [
  "Standard First Aid & CPR",
  "Non-Violent Crisis Intervention (or equivalent) training",
  "Vulnerable Sector Check / criminal record check",
  "Relevant diploma or certification depending on role (e.g., PSW, DSW)",
];

export default function Certifications() {
  return (
    <section className="relative py-14 overflow-hidden bg-primary">
      <Image
        src="/backgrounds/seamless_2D_vector_background_pattern_202605132350.jpeg"
        alt=""
        fill
        aria-hidden
        className="object-cover pointer-events-none select-none mix-blend-multiply opacity-40 pattern-drift"
      />

      <div className="relative w-11/12 max-w-3xl mx-auto text-center">
        <FadeIn className="mb-10">
          <span className="inline-flex items-center justify-center mb-4 border rounded-full h-14 w-14 border-white/60">
            <ShieldCheck className="w-7 h-7 text-white" aria-hidden />
          </span>
          <h1 className="text-2xl text-white md:text-3xl">
            Required Certifications
          </h1>
          <AccentDash className="w-2/12 mx-auto mt-3 origin-center border-white" />
          <p className="max-w-xl mx-auto mt-4 text-sm leading-relaxed text-white/80">
            Certification requirements vary by role and are confirmed during
            the hiring process. Common requirements across our team include:
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-3 text-left sm:grid-cols-2">
          {certifications.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm"
            >
              <CheckCircle2
                className="w-5 h-5 mt-0.5 shrink-0 text-accent"
                aria-hidden
              />
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
