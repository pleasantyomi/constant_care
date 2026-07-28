import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";
import { servicesContent } from "@/lib/services-content";

export function generateStaticParams() {
  return servicesContent.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = servicesContent.find((item) => item.slug === slug);
  if (!category) return {};

  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: `/our-services/${category.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = servicesContent.find((item) => item.slug === slug);
  if (!category) notFound();

  return (
    <section className="w-11/12 py-14 mx-auto md:py-14 md:w-10/12 overflow-x-hidden">
      <FadeIn className="overflow-hidden shadow-lg rounded-2xl">
        <Image
          src={category.heroImage}
          alt={category.header}
          width={1600}
          height={900}
          priority
          className="object-cover h-[30vh] md:h-[50vh] object-top w-full aspect-video"
        />
      </FadeIn>

      <StaggerChildren className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3 md:mt-12">
        {category.groups.map((group) => (
          <div
            key={group.title}
            className="p-6 bg-white border rounded-lg shadow-sm border-border"
          >
            <h2 className="mb-4 text-base font-bold text-primary">
              {group.title}
            </h2>
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                >
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 shrink-0 text-accent"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </StaggerChildren>
    </section>
  );
}
