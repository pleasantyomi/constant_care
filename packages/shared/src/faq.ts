// Frequently asked questions (website /faq, and the app later).
//
// Every answer restates something the business already says elsewhere on
// the site (services, about, forms, contact details). Questions people search
// for that need facts we don't have yet are listed in `faqToConfirm` and are
// NOT published until the business supplies real answers.

import { contact } from "./contact";
import { formatAreaList, serviceAreaNames } from "./service-areas";
import { servicesContent } from "./services-content";

export type FaqItem = {
  question: string;
  /** Plain-text answer (also used in the FAQPage structured data). */
  answer: string;
  /** Optional link shown under the answer on the website. */
  link?: { href: string; label: string };
};

// Mirrors the referral form's relationship options (referral-options.ts).
const referrers =
  "family members, hospitals, physicians, social workers, occupational therapists, schools, community organizations, Indigenous communities, and case managers";

const serviceTitles = servicesContent.map((service) => service.title);

export const faq: FaqItem[] = [
  {
    question: "What services does Constant Care Family Services offer?",
    answer: `We provide person-centred care and support in ${serviceTitles.length} service categories: ${serviceTitles.slice(0, -1).join("; ")}; and ${serviceTitles[serviceTitles.length - 1]}.`,
    link: { href: "/our-services", label: "See all services" },
  },
  {
    question: "Where in New Brunswick do you provide care?",
    answer: `We support individuals and families in ${formatAreaList(serviceAreaNames)}, and across New Brunswick. If you're not sure whether we serve your community, get in touch and we'll let you know.`,
    link: { href: "/areas-we-serve", label: "Areas we serve" },
  },
  {
    question: "How do I get started with home care?",
    answer: `Call us at ${contact.phoneDisplay}, send us a message through our contact form, or submit a referral online. A member of our team will follow up to talk about your needs and the support that would help.`,
    link: { href: "/contact-us", label: "Contact us" },
  },
  {
    question: "Who can make a referral?",
    answer: `Anyone involved in a person's care can refer them to us, including ${referrers}. You can also contact us directly for yourself or a loved one.`,
    link: { href: "/referrals", label: "Make a referral" },
  },
  {
    question: "Will care be tailored to my family member's needs?",
    answer:
      "Yes. Rather than offering one-size-fits-all solutions, we build personalized support plans around each individual's goals, strengths, and preferences, and we keep families informed and involved along the way.",
    link: { href: "/about-us", label: "About our approach" },
  },
  {
    question: "Do you offer support for family caregivers?",
    answer:
      "Yes. Our respite services provide trusted, flexible support that lets family caregivers rest, recharge, and look after their own well-being while their loved ones continue to receive high-quality care.",
    link: { href: "/our-services/respite-services", label: "Respite services" },
  },
  {
    question: "What are your office hours?",
    answer: `Our office hours are ${contact.officeHours.replace("Monday - Friday:", "Monday to Friday,").replace(" - ", " to ")}. You can reach us by phone at ${contact.phoneDisplay} or by email at ${contact.email}.`,
  },
  {
    question: "Are you hiring?",
    answer:
      "We're always interested in hearing from compassionate support workers and care professionals. See our current openings or send us your resume.",
    link: { href: "/careers", label: "Careers" },
  },
];

// Common searches we can't answer yet. Add them to `faq` once the business
// confirms real answers (don't guess on cost, funding, or timelines).
export const faqToConfirm = [
  "How much does home care cost?",
  "Is there government funding for home care in New Brunswick, and do you accept it?",
  "How quickly can services start?",
  "Do you provide care evenings, weekends, or overnight?",
];
