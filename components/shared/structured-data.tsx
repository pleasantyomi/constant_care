import { SITE_URL } from "@/lib/site";
import { contact } from "@/lib/contact";

// LocalBusiness JSON-LD, read by Google to understand what the business is,
// where it serves, and how to contact it. No street address on purpose —
// the business is service-area only and doesn't have a public office.
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Constant Care Family Services Inc.",
    description:
      "Person-centred home care and support services in Fredericton, Moncton, Miramichi, and across New Brunswick, delivered with compassion and professionalism.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo/CCFSI_LOGO_A.png`,
    image: `${SITE_URL}/og_image.jpg`,
    telephone: contact.phoneSchema,
    email: contact.email,
    // The communities served, for local search ("home care Fredericton").
    areaServed: [
      { "@type": "City", name: "Fredericton", containedInPlace: { "@type": "State", name: "New Brunswick" } },
      { "@type": "City", name: "Moncton", containedInPlace: { "@type": "State", name: "New Brunswick" } },
      { "@type": "City", name: "Miramichi", containedInPlace: { "@type": "State", name: "New Brunswick" } },
      { "@type": "State", name: "New Brunswick" },
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "NB",
      addressCountry: "CA",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "08:00",
      closes: "17:30",
    },
    // Tells Google these profiles and this site describe the same
    // business — helps disambiguate from unrelated companies that share
    // part of the name.
    sameAs: [
      "https://www.facebook.com/share/1Jzmfyp1FW/",
      "https://www.instagram.com/constantcarefamilyservices/",
      "https://www.linkedin.com/company/constant-care-family-servicess/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
