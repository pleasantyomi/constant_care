"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/lib/nav";

export default function Form() {
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service");
  // Only preselect if it matches one of our real services — anything else
  // falls through to the placeholder rather than silently showing nothing.
  const defaultService = services.some(
    (service) => service.label === requestedService,
  )
    ? requestedService!
    : undefined;

  const socials = [
    {
      icon: <FaFacebook size="20" />,
      name: "Facebook",
    },
    {
      icon: <FaInstagram size="20" />,
      name: "Instagram",
    },
    {
      icon: <FaXTwitter size="20" />,
      name: "Twitter",
    },
    {
      icon: <FaTiktok size="20" />,
      name: "Tiktok",
    },
  ];
  return (
    <section className="grid w-11/12 gap-16 mx-auto md:gap-8 lg:gap-16 md:w-11/12 lg:w-10/12 lg:grid-cols-5 md:grid-cols-5">
      <div className="relative grid p-6 space-y-6 overflow-hidden text-sm font-normal text-left text-white md:space-y-0 md:col-span-2 bg-primary h-stretch rounded-2xl">
        <Image
          src="/backgrounds/seamless_2D_vector_background_pattern_202605132350.jpeg"
          alt=""
          fill
          aria-hidden
          className="object-cover pointer-events-none select-none rounded-2xl opacity-40 mix-blend-multiply"
        />
        <div>
          <h2 className="pb-2 text-lg font-medium">Contact</h2>
          <p className="grid lg:text-sm md:text-[12px] text-sm">
            <span>Phone: +1 (506) 300-0055</span>
            <span>Email: info@constantcarefamilyservices.com</span>
          </p>
        </div>
        <div>
          <h2 className="pb-2 text-lg font-medium">Open Time</h2>
          <p className="grid lg:text-sm md:text-[12px] text-sm">
            <span>Monday - Friday: 8:00 AM - 5:30 PM</span>
          </p>
        </div>
        <div>
          <h2 className="pb-2 text-lg font-medium">Stay Connected</h2>
          <div>
            <div className="flex gap-2">
              {socials.map((social) => (
                <div
                  key={social.name}
                  className="relative w-12 h-12 rounded-full md:w-10 md:h-10 lg:w-12 lg:h-12 bg-accent"
                >
                  <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    {social.icon}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-3">
        <h1 className="text-xl font-medium md:text-2xl lg:text-3xl">
          We are always ready to help you and answer your questions
        </h1>
        {defaultService && (
          <p className="mt-2 text-sm text-accent">
            Regarding: <span className="font-medium">{defaultService}</span>
          </p>
        )}

        {/* Not wired to a backend yet — connect this to an email service or
            CRM endpoint before launch. preventDefault avoids the native
            GET-reload behavior in the meantime. */}
        <form
          className="grid pt-8 space-y-4 md:space-y-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid space-y-4 md:space-x-4 md:space-y-0 md:grid-cols-2 ">
            <div className="grid space-y-1">
              <label htmlFor="contact-name" className="text-base font-medium">
                Your Name
              </label>
              <Input id="contact-name" name="name" required placeholder="eg. John Doe" />
            </div>
            <div className="grid space-y-1">
              <label htmlFor="contact-email" className="text-base font-medium">
                Email
              </label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="eg. johndoe@gmail.com"
              />
            </div>
          </div>

          <div className="grid space-y-4 md:space-x-4 md:grid-cols-2 md:space-y-0 ">
            <div className="grid space-y-1">
              <label htmlFor="contact-phone" className="text-base font-medium">
                Phone
              </label>
              <Input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="eg. +1234567890"
              />
            </div>
            <div className="grid space-y-1">
              <label htmlFor="contact-service" className="text-base font-medium">
                Service
              </label>
              <Select name="service" defaultValue={defaultService}>
                <SelectTrigger id="contact-service" className="w-full">
                  <SelectValue placeholder="General Inquiry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Inquiry">
                    General Inquiry
                  </SelectItem>
                  {services.map((service) => (
                    <SelectItem key={service.label} value={service.label}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid space-y-1">
            <label htmlFor="contact-message" className="text-base font-medium">
              Your Message
            </label>
            <Textarea
              id="contact-message"
              name="message"
              required
              className="min-h-32"
              placeholder="Enter your message..."
            />
          </div>

          <div>
            <Button type="submit" className="w-6/12 lg:w-3/12">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
