// Routes a site-relative image (e.g. "/images/services/x.jpeg") through the
// website's Next.js image optimizer, so phones get a resized WebP instead of
// the multi-megabyte original. `width` must be one of Next's default sizes.
export type OptimizedWidth = 640 | 1080 | 1920;

export function optimizedImageUrl(
  siteUrl: string,
  path: string,
  width: OptimizedWidth = 1080,
) {
  const base = siteUrl.replace(/\/$/, "");
  return `${base}/_next/image?url=${encodeURIComponent(path)}&w=${width}&q=75`;
}
