import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Background from "@/components/shared/background";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";
import FinalCta from "@/components/about-us/final-cta";
import { contact, telHref } from "@/lib/contact";
import { servicesContent } from "@/lib/services-content";
import {
  formatAreaList,
  hasAreaPage,
  serviceAreaNames,
  serviceAreas,
} from "@/lib/service-areas";

const areaList = formatAreaList(serviceAreaNames);

export const metadata: Metadata = {
  title: "Areas We Serve in New Brunswick",
  description: `Home care and support services in ${areaList}, and across New Brunswick, from Constant Care Family Services.`,
  alternates: { canonical: "/areas-we-serve" },
};

export default function AreasWeServePage() {
  return (
    <div className="overflow-x-hidden">
      <Background className="md:py-10">
        <h1>Areas We Serve</h1>
        <p className="w-10/12 pt-3 mx-auto text-base font-normal leading-tight md:w-6/12">
          Home care and community support across New Brunswick.
        </p>
      </Background>

      <section className="py-14 bg-white md:py-20">
        <div className="w-11/12 mx-auto md:w-10/12">
          <FadeIn className="max-w-2xl mx-auto mb-12 text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">
              Our Communities
            </span>
            <AccentDash className="w-10 mx-auto mt-2 origin-center border-primary" />
            <h2 className="mt-4 text-2xl font-bold leading-snug md:text-3xl text-primary">
              Care Where You Live
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Constant Care Family Services supports individuals and families in{" "}
              {areaList}, and in communities across New Brunswick, at home and
              in the community.
            </p>
          </FadeIn>

          <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((area) => {
              const body = (
                <>
                  <span className="flex items-center justify-center w-12 h-12 border rounded-full shrink-0 border-accent">
                    <MapPin className="w-6 h-6 text-accent" aria-hidden />
                  </span>
                  <span className="flex-1">
                    <span className="block text-lg font-bold text-foreground">
                      {area.name}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      New Brunswick
                    </span>
                  </span>
                </>
              );
              return hasAreaPage(area) ? (
                <Link
                  key={area.slug}
                  href={`/areas-we-serve/${area.slug}`}
                  className="flex items-center gap-4 p-5 transition-colors bg-white border rounded-lg shadow-sm border-border hover:border-accent"
                >
                  {body}
                  <ArrowRight className="w-5 h-5 text-accent" aria-hidden />
                </Link>
              ) : (
                <div
                  key={area.slug}
                  className="flex items-center gap-4 p-5 bg-white border rounded-lg shadow-sm border-border"
                >
                  {body}
                </div>
              );
            })}
          </StaggerChildren>

          <FadeIn className="max-w-2xl p-6 mx-auto mt-10 text-center border rounded-2xl border-border bg-secondary/40">
            <h3 className="text-lg font-bold text-foreground">
              Don&rsquo;t see your community?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We support families across New Brunswick. Call us at{" "}
              <a href={telHref} className="font-medium text-primary hover:underline">
                {contact.phoneDisplay}
              </a>{" "}
              or{" "}
              <Link href="/contact-us" className="font-medium text-primary hover:underline">
                send us a message
              </Link>{" "}
              and we&rsquo;ll let you know how we can help.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-14 bg-secondary/40 md:py-20">
        <div className="w-11/12 mx-auto md:w-10/12">
          <FadeIn className="max-w-2xl mx-auto mb-10 text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">
              How We Support You
            </span>
            <AccentDash className="w-10 mx-auto mt-2 origin-center border-primary" />
            <h2 className="mt-4 text-2xl font-bold leading-snug md:text-3xl text-primary">
              Our Services
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Availability can vary by community. Contact us to confirm which
              services are available near you.
            </p>
          </FadeIn>
          <StaggerChildren className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {servicesContent.map((service) => (
              <Link
                key={service.slug}
                href={`/our-services/${service.slug}`}
                className="flex items-center justify-between gap-3 p-4 text-sm font-medium transition-colors bg-white border rounded-lg border-border text-foreground hover:border-accent hover:text-primary"
              >
                {service.title}
                <ArrowRight className="w-4 h-4 shrink-0 text-accent" aria-hidden />
              </Link>
            ))}
          </StaggerChildren>
          <FadeIn className="mt-8 text-center">
            <Link href="/faq" className="text-sm font-medium text-primary hover:underline">
              Questions about getting started? Read our FAQ &rarr;
            </Link>
          </FadeIn>
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
