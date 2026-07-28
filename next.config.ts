import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // The "Our Services" content was restructured and several service slugs
  // changed or merged (see lib/services-content.ts). These were already
  // indexed by Google, so redirect old URLs to their closest new
  // equivalent instead of letting them 404.
  async redirects() {
    return [
      {
        source: "/our-services/disability-support-services",
        destination: "/our-services/disability-complex-support",
        permanent: true,
      },
      {
        source: "/our-services/community-support",
        destination: "/our-services/community-participation-independent-living",
        permanent: true,
      },
      {
        source: "/our-services/youth-services",
        destination: "/our-services/children-youth-family-services",
        permanent: true,
      },
      {
        source: "/our-services/family-services",
        destination: "/our-services/children-youth-family-services",
        permanent: true,
      },
      {
        source: "/our-services/residential-services",
        destination: "/our-services/supported-living-services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
