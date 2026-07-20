import { Suspense } from "react";
import Background from "@/components/shared/background";
import Form from "@/components/contact-us/form";
import Map from "@/components/contact-us/map";

export default function Contact() {
  return (
    <div>
      <Background>Contact Us</Background>
      <section className="py-12 md:py-14">
        <Suspense>
          <Form />
        </Suspense>
        <Map />
      </section>
    </div>
  );
}
