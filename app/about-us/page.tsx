import Hero from "@/components/about-us/hero";
import WhoWeAre from "@/components/about-us/who-we-are";
import WhyWeExist from "@/components/about-us/why-we-exist";
import MissionVision from "@/components/about-us/mission-vision";
import Values from "@/components/about-us/values";
import Approach from "@/components/about-us/approach";
import Difference from "@/components/about-us/difference";
import Impact from "@/components/about-us/impact";
import WhoWeServe from "@/components/about-us/who-we-serve";
import LookingAhead from "@/components/about-us/looking-ahead";
import FinalCta from "@/components/about-us/final-cta";

// Founders' Message isn't rendered yet — components/about-us/founders-message.tsx
// is ready to go, but its body copy is a structural placeholder, not a real
// quote. Drop it in below Impact (or wherever reads best) once the founders'
// actual words are ready.

export default function About() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <WhoWeAre />
      <WhyWeExist />
      <MissionVision />
      <Values />
      <Approach />
      <Difference />
      <Impact />
      <WhoWeServe />
      <LookingAhead />
      <FinalCta />
    </div>
  );
}
