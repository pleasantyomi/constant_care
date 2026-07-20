import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
    <section className="w-11/12 py-14 mx-auto md:py-14 md:w-10/12">
      {/* <FadeIn className="overflow-hidden shadow-lg rounded-2xl">
        <Image
          src={category.heroImage}
          alt={category.header}
          width={1600}
          height={900}
          priority
          className="object-cover h-[30vh] md:h-[70vh] hidden object-top w-full aspect-video"
        />
      </FadeIn> */}

      <StaggerChildren className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3 md:mt-12">
        {category.points.map((point) => (
          <article
            key={point.title}
            className="flex flex-col overflow-hidden bg-white border rounded-lg shadow-md border-border"
          >
            <Image
              src={point.image}
              alt={point.title}
              width={800}
              height={600}
              className="object-cover w-full aspect-4/3"
            />
            <div className="flex flex-col flex-1 p-5">
              <h3 className="mb-2 text-lg font-bold text-primary">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {point.description}
              </p>
            </div>
          </article>
        ))}
      </StaggerChildren>
    </section>
  );
}
