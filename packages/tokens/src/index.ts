// Constant Care Family Services Inc. — design tokens.
//
// The single source of truth for the website and the mobile app. The website
// reads these through the generated tokens.css (run `pnpm tokens:build` after
// editing); the app imports this file directly. Colours are hex because
// React Native doesn't support oklch().
//
// Brand palette
//   Harmony Blue   #1A4F72  primary
//   Calm Care Teal #3AAFA9  accent
//   Calm Mist      #E8F4F2  light section background
//   White          #FFFFFF  base background
//   Typography: Helvetica Neue (Heavy/Bold headings, Medium body)

export const palette = {
  harmonyBlue: "#1A4F72",
  calmCareTeal: "#3AAFA9",
  // Darker teal for small text: the brand teal is 2.66:1 on white (fails
  // WCAG AA); this is 5.1:1. Use the brand teal for icons and fills.
  deepTeal: "#1F7A75",
  calmMist: "#E8F4F2",
  // App screen background behind white cards.
  mistSurface: "#F6FAF9",
  white: "#FFFFFF",
  darkNavy: "#0F2E42",
  slate: "#5C7A88",
  mistBorder: "#D6E3E8",
  midBlue: "#4C7A9A",
  lightTeal: "#7FD4CE",
  deepNavy: "#0E2635",
  navyCard: "#16394F",
  steelBlue: "#2C5670",
  paleSlate: "#9CB8C4",
  red: "#E7000B",
  lightRed: "#FF6467",
} as const;

const p = palette;

// Semantic colours, named exactly like the website's CSS variables
// (--primary, --muted-foreground, …) so Tailwind classes match on both.
export const colors = {
  light: {
    background: p.white,
    foreground: p.darkNavy,
    card: p.white,
    "card-foreground": p.darkNavy,
    popover: p.white,
    "popover-foreground": p.darkNavy,
    primary: p.harmonyBlue,
    "primary-foreground": p.white,
    secondary: p.calmMist,
    "secondary-foreground": p.harmonyBlue,
    muted: p.calmMist,
    "muted-foreground": p.slate,
    accent: p.calmCareTeal,
    "accent-foreground": p.white,
    "accent-text": p.deepTeal,
    surface: p.mistSurface,
    destructive: p.red,
    border: p.mistBorder,
    input: p.mistBorder,
    ring: p.calmCareTeal,
    "chart-1": p.harmonyBlue,
    "chart-2": p.calmCareTeal,
    "chart-3": p.midBlue,
    "chart-4": p.lightTeal,
    "chart-5": p.darkNavy,
    sidebar: p.calmMist,
    "sidebar-foreground": p.darkNavy,
    "sidebar-primary": p.harmonyBlue,
    "sidebar-primary-foreground": p.white,
    "sidebar-accent": p.calmCareTeal,
    "sidebar-accent-foreground": p.white,
    "sidebar-border": p.mistBorder,
    "sidebar-ring": p.calmCareTeal,
  },
  dark: {
    background: p.deepNavy,
    foreground: p.white,
    card: p.navyCard,
    "card-foreground": p.white,
    popover: p.navyCard,
    "popover-foreground": p.white,
    primary: p.calmCareTeal, // teal pops on dark navy
    "primary-foreground": p.deepNavy,
    secondary: p.steelBlue,
    "secondary-foreground": p.white,
    muted: p.navyCard,
    "muted-foreground": p.paleSlate,
    accent: p.midBlue,
    "accent-foreground": p.white,
    "accent-text": p.lightTeal,
    surface: p.deepNavy,
    destructive: p.lightRed,
    border: p.steelBlue,
    input: `${p.steelBlue}66`, // 40% alpha
    ring: p.calmCareTeal,
    "chart-1": p.harmonyBlue,
    "chart-2": p.calmCareTeal,
    "chart-3": p.midBlue,
    "chart-4": p.lightTeal,
    "chart-5": p.darkNavy,
    sidebar: p.navyCard,
    "sidebar-foreground": p.white,
    "sidebar-primary": p.calmCareTeal,
    "sidebar-primary-foreground": p.deepNavy,
    "sidebar-accent": p.steelBlue,
    "sidebar-accent-foreground": p.white,
    "sidebar-border": p.steelBlue,
    "sidebar-ring": p.calmCareTeal,
  },
} as const;

export type ColorToken = keyof typeof colors.light;

// Corner radius. Web: --radius is 0.625rem; Tailwind derives sm…4xl from it.
// Values below are the same scale in px/pt (1rem = 16).
export const radiusBase = 10;
export const radius = {
  sm: radiusBase * 0.6,
  md: radiusBase * 0.8,
  lg: radiusBase,
  xl: radiusBase * 1.4,
  "2xl": radiusBase * 1.8,
  "3xl": radiusBase * 2.2,
  "4xl": radiusBase * 2.6,
} as const;

// Tailwind's default type scale, which the website uses unchanged.
export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
} as const;

// React Native picks a weight by family name rather than font-weight, so each
// weight is registered as its own family (see mobile/app/_layout.tsx). The
// files are the same ones the website loads from public/fonts/.
export const fontFamily = {
  light: "HelveticaNeue-Light",
  regular: "HelveticaNeue-Roman",
  italic: "HelveticaNeue-Italic",
  medium: "HelveticaNeue-Medium",
  mediumItalic: "HelveticaNeue-MediumItalic",
  bold: "HelveticaNeue-Bold",
  heavy: "HelveticaNeue-Heavy",
} as const;

// Motion, matching the website's GSAP effects (components/animations/*).
// The app uses slightly shorter durations — 0.9s feels slow on a phone.
export const motion = {
  fadeIn: { distance: 48, durationMs: { web: 900, app: 600 } },
  accentDash: { durationMs: 800 },
  staggerMs: 70,
  patternDrift: { distance: 24, durationMs: 60_000 },
  // The heart's double beat in the brand loader (website: components/shared/
  // loader.tsx, app: mobile/src/components/brand/brand-splash.tsx).
  // Keyframes are [fraction of duration, heart scale]; ease-in-out between.
  heartbeat: {
    durationMs: 1150,
    keyframes: [
      [0, 1],
      [0.14, 1.12],
      [0.28, 1],
      [0.42, 1.08],
      [0.56, 1],
      [1, 1],
    ],
  },
  // Fade from the loader into the page (the website's duration-300).
  loaderFadeMs: 300,
} as const;

export const brand = {
  name: "Constant Care Family Services Inc.",
  shortName: "Constant Care",
  tagline: "Care with Purpose. Support You Can Trust.",
} as const;
