import Image from "next/image";
import { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
  className?: string;
}

export default function Background({
  children,
  className = "",
}: BackgroundProps) {
  return (
    <div
      className={`relative overflow-hidden text-white text-center md:text-3xl text-2xl font-medium py-5 bg-primary  ${className}`}
    >
      <Image
        src="/backgrounds/seamless_2D_vector_background_pattern_202605132350.jpeg"
        alt=""
        fill
        aria-hidden
        className="object-cover pointer-events-none select-none opacity-40 mix-blend-multiply"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
