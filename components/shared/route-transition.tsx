"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader } from "@/components/shared/loader";

// Guaranteed minimum time the loader stays visible once shown, so a fast
// navigation doesn't produce an imperceptible flash. Shortened for users
// who've asked for reduced motion.
const MIN_VISIBLE_MS = 550;
const REDUCED_MOTION_MIN_VISIBLE_MS = 120;
// Safety net: if a click looked like navigation but the route never
// changes (blocked nav, same-page anchor we didn't catch, etc.), don't
// leave the overlay stuck forever.
const MAX_VISIBLE_MS = 4000;

export default function RouteTransition() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;

  const [visible, setVisible] = useState(false);
  const shownAtRef = useRef<number | null>(null);
  const maxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  const reducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Show as soon as the user commits to an internal navigation, rather
  // than waiting for the route to actually change — App Router doesn't
  // expose navigation-start events, so we detect the click ourselves.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      // Note: Next.js's <Link> calls preventDefault() on the click before
      // this bubbles up to document, so we deliberately don't check
      // event.defaultPrevented here — that would skip every real Link click.
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      shownAtRef.current = Date.now();
      setVisible(true);

      if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
      maxTimerRef.current = setTimeout(() => {
        setVisible(false);
        shownAtRef.current = null;
      }, MAX_VISIBLE_MS);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Hide once the route has actually changed, respecting the minimum
  // visible time so the reveal never looks like an abrupt flicker.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (shownAtRef.current === null) return;

    const minVisible = reducedMotion()
      ? REDUCED_MOTION_MIN_VISIBLE_MS
      : MIN_VISIBLE_MS;
    const elapsed = Date.now() - shownAtRef.current;
    const remaining = Math.max(0, minVisible - elapsed);

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
      shownAtRef.current = null;
      if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
    }, remaining);

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-100 flex items-center justify-center bg-background transition-opacity duration-300 ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <Loader size={88} label="Loading page" />
    </div>
  );
}
