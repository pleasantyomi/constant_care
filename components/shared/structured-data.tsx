import { SITE_URL } from "@/lib/site";

// LocalBusiness JSON-LD, read by Google to understand what the business is,
// where it serves, and how to contact it. No street address on purpose —
// the business is service-area only and doesn't have a public office.
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Constant Care Family Services Inc.",
    description:
      "Constant Care Family Services Inc is a modern care-centred organisation committed to delivering inclusive, person-centred support services with professionalism, compassion, and structure.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo/CCFSI_LOGO_A.png`,
    image: `${SITE_URL}/og_image.jpg`,
    telephone: "+1-506-300-0055",
    email: "info@constantcarefamilyservices.com",
    areaServed: {
      "@type": "State",
      name: "New Brunswick",
    },
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
