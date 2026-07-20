import { Suspense } from "react";
import Background from "@/components/shared/background";
import Form from "@/components/contact-us/form";

export default function Contact() {
  return (
    <div className="overflow-x-hidden">
      <Background>Contact Us</Background>
      <section className="py-14 md:py-14">
        <Suspense>
          <Form />
        </Suspense>
      </section>
    </div>
  );
}
