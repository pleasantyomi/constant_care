import { Suspense } from "react";
import type { Metadata } from "next";
import Background from "@/components/shared/background";
import Form from "@/components/contact-us/form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Constant Care Family Services Inc. Call, email, or send us a message and our team will respond promptly.",
  alternates: { canonical: "/contact-us" },
};

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
