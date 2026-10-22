import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { servicesContent } from "@/lib/services-content";
import { hasAreaPage, serviceAreas } from "@/lib/service-areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", changeFrequency: "monthly" as const, priority: 1 },
    { path: "/about-us", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/our-team", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/areas-we-serve", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/faq", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/our-services", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/careers", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/contact-us", changeFrequency: "yearly" as const, priority: 0.6 },
    { path: "/referrals", changeFrequency: "yearly" as const, priority: 0.7 },
  ];

  const serviceRoutes = servicesContent.map((service) => ({
    path: `/our-services/${service.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Community pages exist only once they have local details.
  const areaRoutes = serviceAreas.filter(hasAreaPage).map((area) => ({
    path: `/areas-we-serve/${area.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
