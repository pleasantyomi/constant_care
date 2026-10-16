import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ScrollToTop from "@/components/shared/scroll-to-top";
import ScrollTriggerRefresh from "@/components/shared/scroll-trigger-refresh";
import StructuredData from "@/components/shared/structured-data";
import { Analytics } from "@vercel/analytics/next";

const helveticaNeue = localFont({
  src: [
    {
      path: "../public/fonts/HelveticaNeueUltraLight.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeueUltraLightItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/HelveticaNeueThin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeueThinItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/HelveticaNeueLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeueLightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeueItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeueMediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeueBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/HelveticaNeueHeavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeueHeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/fonts/HelveticaNeueBlack.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeueBlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://www.constantcarefamilyservices.com";
// const siteUrl = "https://constant-care.vercel.app/";
const siteName = "Constant Care Family Services Inc.";
// Shown under the site in search results (~155 characters is the visible
// limit), so it names the areas served.
const siteDescription =
  "Constant Care Family Services provides compassionate, person-centred home and community support across New Brunswick. We offer personal care, companionship, respite and emergency respite, residential and group home supports, disability services, senior care, mental health and wellness support, life skills development, and individualized care planning for children, youth, adults, and seniors. Our dedicated team is committed to delivering safe, reliable, culturally responsive services that promote independence, dignity, inclusion, and quality of life. Care with Purpose. Support You Can Trust.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Care with Purpose`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "home care services",
    "disability support services",
    "family services",
    "senior support",
    "person-centred care",
    "New Brunswick care services",
    "Constant Care Family Services",
    "Constant care",
    "Constant Care Family Services Inc.",
    // Local searches. Google ignores this tag, so the areas also appear in
    // the description and in structured data (areaServed).
    "care business in Fredericton",
    "home care Fredericton",
    "home care Moncton",
    "home care Miramichi",
    "Fredericton",
    "Moncton",
    "Miramichi",
    "Fredericton Moncton Miramichi",
    "home care New Brunswick",
    "care services New Brunswick",
    "New Brunswick",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  applicationName: siteName,
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName,
    title: `${siteName} | Care with Purpose`,
    description: siteDescription,
    images: [
      {
        url: "/og_image.jpg",
        width: 1200,
        height: 630,
        alt: "Constant Care Family Services Inc.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Care with Purpose`,
    description: siteDescription,
    images: ["/og_image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1A4F72",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(
        "h-full",
        "antialiased",
        helveticaNeue.variable,
        "font-sans",
        "scroll-smooth ",
        "overflow-x-hidden",
      )}
    >
      <body className="flex flex-col min-h-full">
        <StructuredData />
        <ScrollToTop />
        <ScrollTriggerRefresh />
        <Header />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
