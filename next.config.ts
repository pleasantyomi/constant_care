import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Team photos are uploaded through a Server Action (/admin/team), which
  // caps request bodies at 1MB by default. Photos are limited to 3MB in
  // lib/actions/admin.ts; this leaves room for multipart overhead while
  // staying under Vercel's 4.5MB function body limit.
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },

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
