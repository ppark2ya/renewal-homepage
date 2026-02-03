import { getPlaiceholder } from "plaiceholder";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Cache for blur data URLs to avoid re-fetching
const blurCache = new Map<string, string>();

/**
 * Generate a blur data URL for an image
 * This should be called on the server side (Server Components or API routes)
 */
export async function getBlurDataURL(src: string): Promise<string | undefined> {
  // Check cache first
  if (blurCache.has(src)) {
    return blurCache.get(src);
  }

  try {
    let buffer: Buffer;

    // Check if it's a local image (starts with /)
    if (src.startsWith("/")) {
      // Read from public directory
      const filePath = join(process.cwd(), "public", src);
      buffer = await readFile(filePath);
    } else {
      // Fetch remote image
      const response = await fetch(src, {
        next: { revalidate: 86400 }, // Cache for 24 hours
      });

      if (!response.ok) {
        console.warn(`Failed to fetch image for blur: ${src}`);
        return undefined;
      }

      buffer = Buffer.from(await response.arrayBuffer());
    }

    // Generate blur placeholder
    const { base64 } = await getPlaiceholder(buffer, {
      size: 10, // Small size for blur
    });

    // Cache the result
    blurCache.set(src, base64);

    return base64;
  } catch (error) {
    console.warn(`Failed to generate blur for: ${src}`, error);
    return undefined;
  }
}

/**
 * Generate blur data URLs for multiple images in parallel
 */
export async function getBlurDataURLs(
  srcs: string[]
): Promise<Map<string, string>> {
  const results = await Promise.allSettled(
    srcs.map(async (src) => ({
      src,
      blur: await getBlurDataURL(src),
    }))
  );

  const blurMap = new Map<string, string>();

  results.forEach((result) => {
    if (result.status === "fulfilled" && result.value.blur) {
      blurMap.set(result.value.src, result.value.blur);
    }
  });

  return blurMap;
}

/**
 * Default blur placeholder for fallback (gray blur)
 */
export const DEFAULT_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAECABEDITH/2gAMAwEAAhEDEQA/ANJ8f1vT7qzvYLe6gklt5TFKqSAlHABKsB0RkdGopdMVkZYwQCSAexSlKjYkkC2UJYH/2Q==";
