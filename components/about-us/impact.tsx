import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";

// Once we're operating and have real numbers to share (clients served,
// satisfaction, partnerships, response times), this is the natural place
// for a stat-tile row — swap the moments list below for that when ready.
const moments = [
  "Every individual who gains confidence.",
  "Every family that finds peace of mind.",
  "Every milestone achieved.",
  "Every barrier removed.",
  "Every opportunity created.",
];

export default function Impact() {
  return (
    <section className="py-14 bg-white md:py-20">
      <div className="w-11/12 max-w-3xl mx-auto text-center">
        <FadeIn>
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            Our Impact
          </span>
          <AccentDash className="w-10 mx-auto mt-2 origin-center border-primary" />
          <h2 className="mt-4 text-2xl font-bold leading-snug md:text-3xl text-primary">
            Creating Positive Change Every Day
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Success is measured not by the services we provide, but by the
            lives we help transform.
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-3 mt-8">
          {moments.map((moment) => (
            <p
              key={moment}
              className="text-base font-medium md:text-lg text-primary"
            >
              {moment}
            </p>
          ))}
        </StaggerChildren>

        <FadeIn>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            These are the moments that define our purpose and inspire us to
            continually raise the standard of community care.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
