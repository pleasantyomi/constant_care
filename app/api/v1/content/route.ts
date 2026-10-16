import { servicesContent } from "@/lib/services-content";
import { contact } from "@/lib/contact";
import { relationships, urgencyLevels } from "@/lib/referral-options";
import { optimizedImageUrl, v1Json } from "@/lib/api/v1";

// Static site content for the mobile app. The app also bundles this content
// (packages/shared) so it works offline; this endpoint lets copy changes
// reach installed apps without a store release.
export const dynamic = "force-static";

export function GET() {
  return v1Json({
    services: servicesContent.map((service) => ({
      slug: service.slug,
      title: service.title,
      header: service.header,
      description: service.description,
      heroImageUrl: optimizedImageUrl(service.heroImage),
      note: service.note ?? null,
      groups: service.groups,
    })),
    contact,
    referralOptions: { relationships, urgencyLevels },
  });
}
