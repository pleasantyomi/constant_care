import Image from "next/image";
import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { Users } from "lucide-react";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";
import { Button } from "@/components/ui/button";
import { db, schema } from "@/lib/db";
import { initials, teamPhotoSrc } from "@/lib/team";

export default async function TeamGrid() {
  const members = db
    ? await db
        .select()
        .from(schema.teamMembers)
        .where(eq(schema.teamMembers.isActive, true))
        .orderBy(asc(schema.teamMembers.displayOrder))
    : [];

  return (
    <section className="py-14 bg-white md:py-20">
      <div className="w-11/12 mx-auto md:w-10/12">
        <FadeIn className="max-w-2xl mx-auto mb-12 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            Our People
          </span>
          <AccentDash className="w-10 mx-auto mt-2 origin-center border-primary" />
          <h2 className="mt-4 text-2xl font-bold leading-snug md:text-3xl text-primary">
            The People Behind the Care
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Our team brings together experience, compassion, and a shared
            commitment to helping individuals and families across New
            Brunswick live with dignity and independence.
          </p>
        </FadeIn>

        {members.length > 0 ? (
          <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => {
              const photo = teamPhotoSrc(member);
              return (
                <article
                  key={member.id}
                  className="flex flex-col overflow-hidden bg-white border rounded-lg shadow-sm border-border"
                >
                  <div className="relative aspect-4/5 bg-secondary">
                    {photo ? (
                      <Image
                        src={photo}
                        alt={`Portrait of ${member.name}`}
                        fill
                        sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw"
                        className="object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-primary/60"
                      >
                        {initials(member.name)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col p-6">
                    <h3 className="text-lg font-bold text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-semibold tracking-wide uppercase text-accent">
                      {member.role}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                      {member.bio}
                    </p>
                  </div>
                </article>
              );
            })}
          </StaggerChildren>
        ) : (
          <FadeIn className="max-w-xl p-8 mx-auto text-center border rounded-2xl border-border bg-secondary/40">
            <span className="inline-flex items-center justify-center mb-4 border rounded-full h-14 w-14 border-accent">
              <Users className="w-7 h-7 text-accent" aria-hidden />
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Team profiles are coming soon. In the meantime, we&rsquo;d love
              to hear from you.
            </p>
            <Button
              render={<Link href="/contact-us" />}
              nativeButton={false}
              className="mt-6 font-normal"
            >
              Contact Us
            </Button>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
