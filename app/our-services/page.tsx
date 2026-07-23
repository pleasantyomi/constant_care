import type { Metadata } from "next";
import Background from "@/components/shared/background";
import Image from "next/image";
import Services from "@/components/services/services";
import FadeIn from "@/components/animations/fade-in";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore home care, disability support, youth, senior, respite, residential, and family services from Constant Care Family Services Inc. across New Brunswick.",
  alternates: { canonical: "/our-services" },
};

export default function OurServices() {
  return (
    <div className="overflow-x-hidden">
      <Background>Our Services</Background>
      <FadeIn>
        <Image
          src="/images/services/Home_care_support_worker_in_202607191117_5.jpeg"
          alt="About Hero"
          width={1000}
          height={500}
          className="w-11/12 h-[25vh] md:h-[30vh] lg:h-[60vh] object-top mt-12 object-cover mx-auto rounded-2xl "
        />
      </FadeIn>

      <FadeIn className="w-11/12 pt-10 pb-10 mx-auto md:w-11/12 lg:w-10/12">
        <h1 className="text-xl font-medium text-center lg:text-2xl md:text-xl">
          Support for Every Stage, Every Need
        </h1>
        <p className="grid w-full gap-3 pt-2 mx-auto text-center lg:w-8/12 md:w-9/12">
          <span>
            From home care to residential support, our services are built around
            the people we serve — coordinated, consistent, and delivered with
            dignity
          </span>
        </p>
      </FadeIn>
      <Services />
    </div>
  );
}
