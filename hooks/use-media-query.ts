"use client";

import { useEffect, useState } from "react";

/**
 * Detect whether a CSS media query currently matches.
 *
 * @example
 * const isDesktop = useMediaQuery("(min-width: 768px)");
 */
export const useMediaQuery = (query: string): boolean => {
  const getMatches = (q: string): boolean => {
    // Guard against SSR where `window` is undefined.
    if (typeof window === "undefined") return false;
    return window.matchMedia(q).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => getMatches(query));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);

    // Sync in case the query changed between render and effect.
    setMatches(mediaQueryList.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

// Tailwind's default breakpoints (min-width based).
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Returns true when the viewport width is at least the given breakpoint.
 *
 * @example
 * const isMd = useBreakpoint("md"); // true when width >= 768px
 */
export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  return useMediaQuery(`(min-width: ${BREAKPOINTS[breakpoint]}px)`);
};

/**
 * Convenience hook that reports whether the current viewport is mobile-sized.
 * Mobile is defined as anything below the `md` (768px) breakpoint.
 */
export const useIsMobile = (): boolean => {
  return !useBreakpoint("md");
};
