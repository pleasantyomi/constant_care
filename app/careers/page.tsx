import Background from "@/components/shared/background";
import WhyWorkWithUs from "@/components/careers/why-work-with-us";
import Certifications from "@/components/careers/certifications";
import CurrentOpenings from "@/components/careers/current-openings";
import ApplicationForm from "@/components/careers/application-form";

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
