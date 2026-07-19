"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ComponentType } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Autoplay from "embla-carousel-autoplay";
import {
  Handshake,
  UserRound,
  Workflow,
  BadgeCheck,
  ShieldCheck,
  Heart,
  Award,
  Accessibility,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import AccentDash from "@/components/animations/accent-dash";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const content = [
  {
    icon: Accessibility,
    title: "Inclusivity",
    description:
      "Equitable, barrier-free care for individuals of all backgrounds, abilities, and experiences",
  },
  {
    icon: UserRound,
    title: "Person-Centered Care",
    description:
      "Every decision reflects the individual's unique needs, preferences, and goals.",
  },
  {
    icon: Workflow,
    title: "Coordination & Efficiency",
    description:
      "A streamlined, collaborative approach that keeps care seamless and consistent.",
  },
  {
    icon: BadgeCheck,
    title: "Integrity",
    description:
      "Honesty, transparency, and accountability in every interaction.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "Dependable, consistent care that individuals and families can count on.",
  },
  {
    icon: Handshake,
    title: "Dignity & Respect",
    description:
      "Upholding the rights, independence, and cultural values of every individual.",
  },
  {
    icon: Heart,
    title: "Compassion",
    description: "Empathy and genuine concern for the well-being of others.",
  },
  {
    icon: Award,
    title: "Excellence & Quality",
    description:
      "High standards and continuous improvement in every aspect of care.",
  },
];

// Mobile shows the six cards as two pages of three.
const MOBILE_CHUNK_SIZE = 4;
const mobileChunks: (typeof content)[] = [];
for (let i = 0; i < content.length; i += MOBILE_CHUNK_SIZE) {
  mobileChunks.push(content.slice(i, i + MOBILE_CHUNK_SIZE));
}

function ContentCard({
  title,
  description,
  icon: Icon,
  active,
}: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  /** true = emphasized, false = dimmed, undefined = neutral (mobile grid) */
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-full h-full flex-col rounded-lg bg-white p-6 shadow-md transition-all duration-500",
        active === true && "scale-100 opacity-100 shadow-xl",
        active === false && "scale-90 opacity-70",
      )}
    >
      <span
        className={cn(
          "mb-4 flex h-14 w-14 items-center justify-center rounded-full border transition-colors duration-500",
          active === true ? "border-accent" : "border-border",
        )}
      >
        <Icon
          className={cn(
            "h-7 w-7 transition-colors duration-500",
            active === true ? "text-accent" : "text-primary",
          )}
          aria-hidden
        />
      </span>
      <h3
        className={cn(
          "mb-3 text-lg font-bold transition-colors duration-500",
          active === true ? "text-accent" : "text-foreground",
        )}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default function CoreValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [mobileApi, setMobileApi] = useState<CarouselApi>();
  const [mobileCurrent, setMobileCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!mobileApi) return;

    const onSelect = () => setMobileCurrent(mobileApi.selectedScrollSnap());
    onSelect();
    mobileApi.on("select", onSelect);

    return () => {
      mobileApi.off("select", onSelect);
    };
  }, [mobileApi]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".wc-reveal", {
          opacity: 0,
          y: 26,
          duration: 0.7,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-20 mt-10 mb-20 overflow-hidden md:mt-20 bg-primary"
    >
      <Image
        src="/backgrounds/seamless_2D_vector_background_pattern_202605132350.jpeg"
        alt=""
        fill
        aria-hidden
        className="object-cover pointer-events-none select-none mix-blend-multiply opacity-40 pattern-drift"
      />
      <div className="relative">
        <div className="mb-10 wc-reveal">
          <h1 className="text-2xl text-center text-white md:text-3xl">
            Core Values
          </h1>
          <AccentDash className="w-2/12 mx-auto mt-2 origin-center border-white md:mt-3 md:w-1/12" />
        </div>

        {/* Desktop: one card per slide, centered active card */}
        <div className="hidden md:block">
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "center" }}
            plugins={[
              Autoplay({
                delay: 10000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent className="items-stretch py-4">
              {content.map((item, index) => (
                <CarouselItem
                  key={item.title}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full wc-reveal">
                    <ContentCard
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                      active={index === current}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="flex justify-center gap-2 mt-6 wc-reveal">
            {content.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === current}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors duration-300 cursor-pointer",
                  index === current
                    ? "bg-accent"
                    : "bg-white/40 hover:bg-white/70",
                )}
              />
            ))}
          </div>
        </div>

        {/* Mobile: two pages of three stacked cards */}
        <div className="md:hidden">
          <Carousel
            setApi={setMobileApi}
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 10000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent className="items-stretch py-4">
              {mobileChunks.map((chunk, chunkIndex) => (
                <CarouselItem key={chunkIndex} className="basis-full">
                  <div className="grid w-11/12 gap-4 mx-auto">
                    {chunk.map((item) => (
                      <div key={item.title} className="wc-reveal">
                        <ContentCard
                          title={item.title}
                          description={item.description}
                          icon={item.icon}
                        />
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="flex justify-center gap-2 mt-6 wc-reveal">
            {mobileChunks.map((chunk, chunkIndex) => (
              <button
                key={chunkIndex}
                type="button"
                aria-label={`Go to page ${chunkIndex + 1}`}
                aria-current={chunkIndex === mobileCurrent}
                onClick={() => mobileApi?.scrollTo(chunkIndex)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors duration-300 cursor-pointer",
                  chunkIndex === mobileCurrent
                    ? "bg-accent"
                    : "bg-white/40 hover:bg-white/70",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
