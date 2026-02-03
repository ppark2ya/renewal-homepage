import { getBlurDataURL, DEFAULT_BLUR_DATA_URL } from "@/lib/utils/image";
import ImageWithFallback from "./ImageWithFallback";
import { ImageProps } from "next/image";

type FallbackType = "image" | "icon" | "skeleton";

interface ServerImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackSrc?: string;
  fallbackType?: FallbackType;
  fallbackClassName?: string;
  /**
   * Enable server-side blur generation
   * When true, fetches the image on the server and generates a blur placeholder
   */
  enableBlur?: boolean;
}

/**
 * Server Component that generates blur placeholders on the server
 * Use this for critical images that need SSR blur placeholders
 *
 * @example
 * // In a Server Component (page.tsx, layout.tsx, etc.)
 * <ServerImage
 *   src="https://r2.example.com/image.jpg"
 *   alt="Product"
 *   fill
 *   enableBlur
 * />
 */
export default async function ServerImage({
  src,
  enableBlur = true,
  ...props
}: ServerImageProps) {
  let blurDataURL: string | undefined;

  if (enableBlur && typeof src === "string") {
    try {
      blurDataURL = await getBlurDataURL(src);
    } catch {
      // Use default blur on error
      blurDataURL = DEFAULT_BLUR_DATA_URL;
    }
  }

  return (
    <ImageWithFallback
      {...props}
      src={src}
      blurDataURL={blurDataURL ?? DEFAULT_BLUR_DATA_URL}
      placeholder={blurDataURL ? "blur" : undefined}
      showLoadingPlaceholder={!blurDataURL}
    />
  );
}
