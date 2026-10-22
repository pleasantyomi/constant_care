// The communities Constant Care serves. One list drives the website's
// "Areas We Serve" page, the per-community pages, the business data Google
// reads (areaServed in components/shared/structured-data.tsx), and the
// sitemap. Keep it identical to the Google Business Profile's service area.
//
// Community pages (/areas-we-serve/<slug>) only go live once `local` is
// filled in with real, community-specific details. Near-identical pages that
// just swap the town name count as "doorway pages" under Google's spam
// policies and can hurt rankings, so a community with no local details is
// listed on the Areas We Serve page but gets no page of its own.

export type ServiceArea = {
  slug: string;
  name: string;
  /** Community-specific details. Leave empty until the business supplies them. */
  local: {
    /** One or two sentences about supporting this community specifically. */
    intro?: string;
    /** Nearby communities also served from here (only ones actually served). */
    nearby?: string[];
    /** Services offered here, as service slugs; omit to show all. */
    services?: string[];
    /** Anything else genuinely local: staff based here, partner organizations. */
    notes?: string[];
  };
};

export const serviceAreas: ServiceArea[] = [
  { slug: "fredericton", name: "Fredericton", local: {} },
  { slug: "moncton", name: "Moncton", local: {} },
  { slug: "miramichi", name: "Miramichi", local: {} },
  { slug: "minto", name: "Minto", local: {} },
  { slug: "gagetown", name: "Gagetown", local: {} },
];

/** A community has its own page once it has local details. */
export function hasAreaPage(area: ServiceArea) {
  return Boolean(area.local.intro);
}

export const serviceAreaNames = serviceAreas.map((area) => area.name);

/** "Fredericton, Moncton, Miramichi, Minto, and Gagetown" */
export function formatAreaList(names: string[] = serviceAreaNames) {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}
