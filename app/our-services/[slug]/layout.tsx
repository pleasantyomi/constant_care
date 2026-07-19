import { notFound } from "next/navigation";
import Link from "next/link";
import Background from "@/components/shared/background";
import { Button } from "@/components/ui/button";
import { servicesContent } from "@/lib/services-content";

export default async function ServiceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = servicesContent.find((item) => item.slug === slug);
  if (!category) notFound();

  return (
    <div>
      <Background className="md:py-10">
        <h1>{category.header}</h1>
        <p className="w-10/12 pt-3 mx-auto text-base font-normal leading-tight md:w-5/12">
          {category.description}
        </p>
      </Background>

      {children}

      <div className="pb-14">
        <Button
          render={<Link href="/contact-us" />}
          nativeButton={false}
          className="flex w-8/12 mx-auto font-normal md:w-3/12"
        >
          Request This Service
        </Button>
      </div>
    </div>
  );
}
