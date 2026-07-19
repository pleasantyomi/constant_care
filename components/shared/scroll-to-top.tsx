"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Ensures every route change starts at the very top of the page. */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // "instant" overrides the html element's scroll-smooth so the reset
    // doesn't play as a visible scroll animation on page change.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
