import type { Metadata } from "next";
import Background from "@/components/shared/background";
import WhyWorkWithUs from "@/components/careers/why-work-with-us";
import Certifications from "@/components/careers/certifications";
import CurrentOpenings from "@/components/careers/current-openings";
import ApplicationForm from "@/components/careers/application-form";

// Current Openings reads from the database — force dynamic rendering so
// admin edits show up immediately instead of waiting for a redeploy.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Constant Care Family Services Inc. — explore current openings and build a career supporting individuals and families across New Brunswick.",
  alternates: { canonical: "/careers" },
};

export default function Careers() {
  return (
    <div className="overflow-x-hidden">
      <Background className="md:py-10">
        <h1>Join Our Team</h1>
        {/* <p className="w-10/12 pt-3 mx-auto text-base font-normal leading-tight md:w-5/12">
          Build a career with purpose — supporting individuals and families
          across New Brunswick.
        </p> */}
      </Background>

      <WhyWorkWithUs />
      <Certifications />
      <CurrentOpenings />
      <ApplicationForm />
    </div>
  );
}
