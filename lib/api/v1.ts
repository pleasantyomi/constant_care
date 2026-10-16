import "server-only";
import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";
import {
  optimizedImageUrl as buildOptimizedImageUrl,
  type OptimizedWidth,
} from "../../packages/shared/src/images";

// Helpers for the /api/v1 endpoints the mobile app reads.
//
// Contract rule: apps already installed on phones can't be force-updated, so
// never remove or rename a field here. Add fields, or add /api/v2.

// Short CDN cache: admin edits still show up within about a minute.
// These endpoints only serve public content, so any origin may read them
// (native apps ignore CORS; this lets the app's web build and previews work).
export function v1Json(data: unknown) {
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export function v1Unavailable() {
  return NextResponse.json(
    { error: "The database isn't configured." },
    { status: 503 },
  );
}

export function optimizedImageUrl(path: string, width?: OptimizedWidth) {
  return buildOptimizedImageUrl(SITE_URL, path, width);
}
