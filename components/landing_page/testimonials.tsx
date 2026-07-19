"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: "t1",
    quote:
      "Knowing my mother has someone reliable checking in on her gives our whole family peace of mind. The team treats her like a person, not just a client on a schedule.",
    name: "Sarah M.",
    role: "Daughter of a Constant Care Client",
    rating: 5,
    initials: "SM",
    isPlaceholder: true,
  },
  {
    id: "t2",
    quote:
      "Our son's support worker took the time to actually understand him before jumping into a routine. That made all the difference in how quickly he opened up.",
    name: "David T.",
    role: "Parent",
    rating: 5,
    initials: "DT",
    isPlaceholder: true,
  },
  {
    id: "t3",
    quote:
      "Respite care used to feel like an impossible ask. Constant Care made it simple — flexible scheduling that actually works around our family's life, not the other way around.",
    name: "Angela R.",
    role: "Family Caregiver",
    rating: 5,
    initials: "AR",
    isPlaceholder: true,
  },
  {
    id: "t4",
    quote:
      "As a social worker, I need to know a referral will be followed through on. Constant Care has never once let a client fall through the cracks.",
    name: "Patricia L.",
    role: "Social Worker",
    rating: 5,
    initials: "PL",
    isPlaceholder: true,
  },
  {
    id: "t5",
    quote:
      "I get to make my own decisions about my day, with support there when I actually need it. That's all I ever wanted from a care provider.",
    name: "James K.",
    role: "Client",
    rating: 5,
    initials: "JK",
    isPlaceholder: true,
  },
];

export default function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () =>
      setActive(api.selectedScrollSnap() % testimonials.length);
    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const current = testimonials[active];

  return (
    <section className="relative py-20 my-24 overflow-hidden bg-primary">
      <Image
        src="/backgrounds/seamless_2D_vector_background_pattern_202605132350.jpeg"
        alt=""
        fill
        aria-hidden
        className="object-cover pointer-events-none select-none mix-blend-multiply opacity-40"
      />

      <div className="relative w-11/12 max-w-4xl mx-auto text-center text-white">
        <span
          aria-hidden
          className="block w-10 mx-auto mb-6 border-b-2 border-accent"
        />
        <h1 className="text-2xl md:text-3xl">
          <span className="block">Why Families Trust</span>
          <span className="block font-semibold">Constant Care</span>
        </h1>
        {/* <p className="mt-4 text-sm text-white/70">
          Real experiences from the individuals, families, and partners we
          support across New Brunswick.
        </p>` */}

        <div className="relative mt-16">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => api?.scrollPrev()}
            className="absolute left-0 z-10 flex items-center justify-center transition-colors -translate-y-1/2 border rounded-full cursor-pointer md:-left-10 w-9 h-9 top-1/2 border-accent/70 text-accent hover:bg-accent hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <blockquote
            key={current.id}
            aria-live="polite"
            className="max-w-2xl px-12 mx-auto text-sm leading-relaxed duration-700 md:text-base text-white/90 animate-in fade-in md:px-16"
          >
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => api?.scrollNext()}
            className="absolute right-0 z-10 flex items-center justify-center transition-colors -translate-y-1/2 border rounded-full cursor-pointer md:-right-10 w-9 h-9 top-1/2 border-accent/70 text-accent hover:bg-accent hover:text-white"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "center" }}
          plugins={[
            Autoplay({
              delay: 8000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="mt-16"
        >
          <CarouselContent className="items-start">
            {/* Render the list twice so the loop always has slides to pull
                from — five 1/5-width slides alone exactly fill the viewport,
                which disables embla's loop. */}
            {[...testimonials, ...testimonials].map((item, slideIndex) => {
              const index = slideIndex % testimonials.length;
              const isActive = index === active;
              return (
                <CarouselItem
                  key={`${item.id}-${slideIndex}`}
                  className="md:basis-1/5 basis-full"
                >
                  <button
                    type="button"
                    onClick={() => api?.scrollTo(slideIndex)}
                    aria-label={`Show testimonial from ${item.name}`}
                    aria-current={isActive}
                    className="flex flex-col items-center gap-1.5 cursor-pointer w-full"
                  >
                    <span className="flex items-center justify-center w-20 h-20">
                      <span
                        className={cn(
                          "flex items-center justify-center w-14 h-14 rounded-full font-semibold transition-all duration-300",
                          isActive
                            ? "bg-accent text-white ring-2 ring-white/70 scale-125"
                            : "bg-white/15 text-white/80 scale-100",
                        )}
                      >
                        {item.initials}
                      </span>
                    </span>
                    <span className="flex gap-0.5" aria-hidden>
                      {Array.from({ length: item.rating }).map(
                        (_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={cn(
                              "w-3 h-3 fill-current transition-colors duration-300",
                              isActive
                                ? "text-yellow-400"
                                : "text-yellow-400/50",
                            )}
                          />
                        ),
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-semibold transition-colors duration-300",
                        isActive ? "text-white" : "text-white/60",
                      )}
                    >
                      {item.name}
                    </span>
                    <span
                      className={cn(
                        "text-[11px] transition-colors duration-300",
                        isActive ? "text-accent" : "text-white/40",
                      )}
                    >
                      {item.role}
                    </span>
                  </button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
