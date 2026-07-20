import Image from "next/image";
import AccentDash from "@/components/animations/accent-dash";
import FadeIn from "@/components/animations/fade-in";

// Not wired into app/about-us/page.tsx yet — the paragraph below is a
// structural placeholder, not real copy. Replace it with an actual note
// from the founders (in their own words) before rendering this section on
// the live site; do not publish invented quotes attributed to real people.
export default function FoundersMessage() {
  return (
    <section className="py-14 bg-white md:py-20">
      <FadeIn className="w-11/12 max-w-3xl mx-auto text-center">
        <span className="text-xs font-semibold tracking-widest uppercase text-accent">
          Founders&rsquo; Message
        </span>
        <AccentDash className="w-10 mx-auto mt-2 origin-center border-primary" />
        <h2 className="mt-4 text-2xl font-bold leading-snug md:text-3xl text-primary">
          A Note From Our Founders
        </h2>

        <blockquote className="pl-6 mt-8 text-base italic leading-relaxed text-left border-l-2 md:text-lg text-muted-foreground border-accent">
          [Add a personal note here, in your own words, on why you and your
          business partner started Constant Care Family Services — what you
          saw missing in community care, and what you hope it means for the
          families you serve.]
        </blockquote>

        <div className="flex items-center justify-center gap-3 mt-8">
          <span className="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full bg-secondary">
            <Image
              src="/logo/CCFSI_ICON_B.png"
              alt=""
              aria-hidden
              width={40}
              height={40}
              className="w-6 h-auto"
            />
          </span>
          <div className="text-sm text-left">
            <p className="font-medium text-foreground">
              [Founder Name], [Founder Name]
            </p>
            <p className="text-xs text-muted-foreground">
              Co-Founders, Constant Care Family Services Inc.
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
