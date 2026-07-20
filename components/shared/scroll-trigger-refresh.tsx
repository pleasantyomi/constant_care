"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Header and Footer live in the root layout, so they never remount on
 * client-side navigation — the GSAP ScrollTriggers inside them (AccentDash,
 * StaggerChildren) are created once and cache their trigger boundaries
 * against whichever page happened to be loaded first. Navigating to a page
 * with a different total height leaves those boundaries stale: a "once"
 * trigger calibrated against a tall page can become permanently unreachable
 * on a shorter one, leaving that content stuck at opacity 0. Recalculating
 * after every route change keeps the boundaries honest.
 */
export default function ScrollTriggerRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    // Wait a frame so the new route's DOM has actually painted before we
    // measure it — refreshing against the outgoing page's leftover layout
    // would just reproduce the same stale-boundary problem.
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
