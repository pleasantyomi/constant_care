import { asc, eq } from "drizzle-orm";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";
import { db, schema } from "@/lib/db";

// Qualitative fallback shown until real numbers exist to publish — add
// stats from /admin/impact and this section switches to the stat grid
// automatically.
const moments = [
  "Every individual who gains confidence.",
  "Every family that finds peace of mind.",
  "Every milestone achieved.",
  "Every barrier removed.",
  "Every opportunity created.",
];

export default async function Impact() {
  const stats = db
    ? await db
        .select()
        .from(schema.impactStats)
        .where(eq(schema.impactStats.isActive, true))
        .orderBy(asc(schema.impactStats.displayOrder))
    : [];

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

        {stats.length > 0 ? (
          <StaggerChildren className="grid grid-cols-2 gap-6 mt-10 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id}>
                <p className="text-3xl font-bold md:text-4xl text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </StaggerChildren>
        ) : (
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
        )}

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
