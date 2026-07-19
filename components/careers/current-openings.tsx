import Link from "next/link";
import { Briefcase, ArrowRight } from "lucide-react";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";

// Replace with a real listing (title, department, location, type) once
// positions are posted — either manually or pulled from an ATS. Until then
// this renders the fallback empty state.
type Opening = {
  title: string;
  department: string;
  type: string;
  href: string;
};

const openings: Opening[] = [];

export default function CurrentOpenings() {
  return (
    <section className="py-14 bg-white">
      <div className="w-11/12 mx-auto md:w-10/12">
        <FadeIn className="mb-12">
          <h1 className="text-2xl text-center md:text-3xl text-primary">
            Current Openings
          </h1>
          <AccentDash className="w-2/12 mx-auto mt-2 origin-center md:mt-3 md:w-1/12 border-primary" />
        </FadeIn>

        {openings.length > 0 ? (
          <div className="grid max-w-3xl gap-4 mx-auto">
            {openings.map((opening) => (
              <Link
                key={opening.title}
                href={opening.href}
                className="flex items-center justify-between gap-4 p-5 transition-colors bg-white border rounded-lg shadow-sm border-border hover:border-accent"
              >
                <div>
                  <p className="font-bold text-foreground">{opening.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {opening.department} &middot; {opening.type}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 shrink-0 text-accent" aria-hidden />
              </Link>
            ))}
          </div>
        ) : (
          <FadeIn className="max-w-xl p-8 mx-auto text-center border rounded-2xl border-border bg-secondary/40">
            <span className="inline-flex items-center justify-center mb-4 border rounded-full h-14 w-14 border-accent">
              <Briefcase className="w-7 h-7 text-accent" aria-hidden />
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We don&rsquo;t have any open positions right now — check back
              soon, or submit your resume below and we&rsquo;ll reach out
              when a role opens up.
            </p>
            <Button
              render={<Link href="#apply" />}
              nativeButton={false}
              className="mt-6 font-normal"
            >
              Submit Your Resume
            </Button>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
