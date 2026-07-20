import Image from "next/image";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";

export default function LookingAhead() {
  return (
    <section className="relative py-14 overflow-hidden bg-primary md:py-20">
      <Image
        src="/backgrounds/seamless_2D_vector_background_pattern_202605132350.jpeg"
        alt=""
        fill
        aria-hidden
        className="object-cover pointer-events-none select-none mix-blend-multiply opacity-40 pattern-drift"
      />

      <FadeIn className="relative w-11/12 max-w-2xl mx-auto text-center">
        <span className="text-xs font-semibold tracking-widest uppercase text-accent">
          Looking Ahead
        </span>
        <AccentDash className="w-10 mx-auto mt-2 origin-center border-white" />

        <p className="mt-6 text-sm leading-relaxed text-white/85">
          Constant Care Family Services is building for the future. As we
          grow, we remain committed to expanding innovative services,
          developing meaningful partnerships, investing in exceptional
          professionals, and creating programs that strengthen individuals,
          families, and communities across New Brunswick and beyond.
        </p>

        <p className="mt-8 text-lg font-medium text-white md:text-xl">
          Our ambition is not simply to become larger.
          <br />
          Our ambition is to create lasting impact.
        </p>
      </FadeIn>
    </section>
  );
}
