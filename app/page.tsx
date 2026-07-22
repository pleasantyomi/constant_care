import Hero from "@/components/landing_page/hero";
import WhyChooseUs from "@/components/landing_page/whyChoose";
import CTA from "@/components/landing_page/cta";
import FadeIn from "@/components/animations/fade-in";
import WhoWeServe from "@/components/landing_page/whoWeServe";
import Testimonials from "@/components/landing_page/testimonials";
import Outro from "@/components/landing_page/outro";
import FoundersLetter from "@/components/landing_page/founders-letter";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <div className="relative z-10 flow-root bg-background">
        <WhyChooseUs />
        <WhoWeServe />
        <FadeIn>
          <Testimonials />
        </FadeIn>
        <Outro />
        <FoundersLetter />
        <CTA />
      </div>
    </div>
  );
}
