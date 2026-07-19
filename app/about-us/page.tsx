import Background from "@/components/shared/background";
import Image from "next/image";
import Mission from "@/components/about-us/mission";
import CoreValues from "@/components/about-us/core-values";
import Approach from "@/components/about-us/approach";

export default function About() {
  return (
    <div>
      <Background>About Us</Background>
      <Image
        src="/images/about_hero.jpeg"
        alt="About Hero"
        width={1000}
        height={500}
        className="w-11/12 h-[25vh] md:h-[30vh] lg:h-[60vh] object-top mt-12 object-cover mx-auto rounded-2xl "
      />

      <div className="w-11/12 pt-10 mx-auto md:w-11/12 lg:w-10/12">
        <p className="grid gap-3">
          <span>
            Constant Care Family Services Inc is a modern care-centred
            organisation committed to delivering inclusive, person-centred
            support services with professionalism, compassion, and structure.
          </span>
          <span>
            The brand exists to create an environment where individuals and
            families feel safe, respected, supported, and empowered through
            coordinated care systems that prioritise dignity, reliability, and
            quality.
          </span>
          <span>
            Constant Care Family Services Inc is not just a healthcare service
            provider, it is a trusted support system designed around people
          </span>
        </p>
      </div>

      <Mission />
      <CoreValues />
      <Approach />
    </div>
  );
}
