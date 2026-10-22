import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Background from "@/components/shared/background";
import FadeIn from "@/components/animations/fade-in";
import FinalCta from "@/components/about-us/final-cta";
import { faq } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about home care and support services from Constant Care Family Services: what we offer, where we serve in New Brunswick, how referrals work, and how to get started.",
  alternates: { canonical: "/faq" },
};

// FAQPage structured data. Google shows FAQ rich results only for a few
// kinds of sites now, but the markup still helps it understand the page.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <div className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Background className="md:py-10">
        <h1>Frequently Asked Questions</h1>
      </Background>

      <section className="py-14 bg-white md:py-20">
        <div className="w-11/12 max-w-3xl mx-auto">
          <FadeIn className="grid gap-4">
            {faq.map((item) => (
              <details
                key={item.question}
                className="group p-5 bg-white border rounded-lg shadow-sm border-border open:border-accent"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h2 className="text-base font-bold text-foreground md:text-lg">
                    {item.question}
                  </h2>
                  <ChevronDown
                    className="w-5 h-5 transition-transform shrink-0 text-accent group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="inline-block mt-3 text-sm font-medium text-primary hover:underline"
                  >
                    {item.link.label} &rarr;
                  </Link>
                )}
              </details>
            ))}
          </FadeIn>
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
