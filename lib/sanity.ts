import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "wnzlt1qo";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN !== "false";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

export async function safeSanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T,
): Promise<T> {
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch {
    return fallback;
  }
}

