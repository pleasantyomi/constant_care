import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Background from "@/components/shared/background";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";
import FinalCta from "@/components/about-us/final-cta";
import { servicesContent } from "@/lib/services-content";
import { hasAreaPage, serviceAreas } from "@/lib/service-areas";

// One page per community, but only for communities with real local details
// (see lib/service-areas.ts on why). Everything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceAreas.filter(hasAreaPage).map((area) => ({ slug: area.slug }));
}

function findArea(slug: string) {
  const area = serviceAreas.find((item) => item.slug === slug);
  return area && hasAreaPage(area) ? area : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const area = findArea((await params).slug);
  if (!area) return {};
  return {
    title: `Home Care in ${area.name}, NB`,
    description: area.local.intro,
    alternates: { canonical: `/areas-we-serve/${area.slug}` },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const area = findArea((await params).slug);
  if (!area) notFound();

  const services = area.local.services?.length
    ? servicesContent.filter((service) => area.local.services!.includes(service.slug))
    : servicesContent;

  return (
    <div className="overflow-x-hidden">
      <Background className="md:py-10">
        <h1>Home Care in {area.name}</h1>
        <p className="w-10/12 pt-3 mx-auto text-base font-normal leading-tight md:w-6/12">
          {area.local.intro}
        </p>
      </Background>

      {(area.local.notes?.length || area.local.nearby?.length) && (
        <section className="py-14 bg-white md:py-20">
          <FadeIn className="w-11/12 max-w-3xl mx-auto space-y-6">
            {area.local.notes?.map((note) => (
              <p key={note} className="text-sm leading-relaxed text-muted-foreground">
                {note}
              </p>
            ))}
            {area.local.nearby?.length ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                We also support families in nearby {area.local.nearby.join(", ")}.
              </p>
            ) : null}
          </FadeIn>
        </section>
      )}

      <section className="py-14 bg-secondary/40 md:py-20">
        <div className="w-11/12 mx-auto md:w-10/12">
          <FadeIn className="max-w-2xl mx-auto mb-10 text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">
              Services in {area.name}
            </span>
            <AccentDash className="w-10 mx-auto mt-2 origin-center border-primary" />
            <h2 className="mt-4 text-2xl font-bold leading-snug md:text-3xl text-primary">
              How We Support You
            </h2>
          </FadeIn>
          <StaggerChildren className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/our-services/${service.slug}`}
                className="flex items-start gap-3 p-4 transition-colors bg-white border rounded-lg border-border hover:border-accent"
              >
                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-accent" aria-hidden />
                <span className="flex-1 text-sm font-medium text-foreground">{service.title}</span>
                <ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-accent" aria-hidden />
              </Link>
            ))}
          </StaggerChildren>
          <FadeIn className="mt-8 text-center">
            <Link href="/areas-we-serve" className="text-sm font-medium text-primary hover:underline">
              See all the communities we serve &rarr;
            </Link>
          </FadeIn>
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
