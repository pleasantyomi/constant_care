import FadeIn from "@/components/animations/fade-in";
import AccentDash from "@/components/animations/accent-dash";

export default function WhyWeExist() {
  return (
    <section className="py-14 bg-secondary/40 md:py-20">
      <FadeIn className="w-11/12 max-w-3xl mx-auto text-center">
        <span className="text-xs font-semibold tracking-widest uppercase text-accent">
          Why We Exist
        </span>
        <AccentDash className="w-10 mx-auto mt-2 origin-center border-primary" />
        <h2 className="mt-4 text-2xl font-bold leading-snug md:text-3xl text-primary">
          Because Everyone Deserves the Opportunity to Thrive.
        </h2>

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Across our communities, thousands of individuals and families face
          barriers that limit independence, opportunity, and quality of
          life. Whether navigating disability, aging, youth challenges, or
          the demands of caregiving, too many people struggle to access the
          personalized support they deserve.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          We believe care should do more than respond to challenges: it
          should create opportunities.
        </p>
        <p className="mt-4 text-base font-medium leading-relaxed text-primary">
          That belief is why Constant Care Family Services was founded.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Our purpose is to remove barriers, empower independence,
          strengthen families, and help build communities where everyone
          feels valued, included, and supported.
        </p>
      </FadeIn>
    </section>
  );
}
