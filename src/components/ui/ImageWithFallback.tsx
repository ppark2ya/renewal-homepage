"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

type FallbackType = "image" | "icon" | "skeleton";
type PlaceholderType = "skeleton" | "blur" | "icon";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackSrc?: string;
  fallbackType?: FallbackType;
  fallbackClassName?: string;
  showLoadingPlaceholder?: boolean;
  placeholderType?: PlaceholderType;
  /** Pre-generated blur data URL from server */
  blurDataURL?: string;
  /** Opacity for loading placeholder (0-100), default is 50 */
  placeholderOpacity?: number;
}

function FallbackIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function Placeholder({
  type,
  className,
  fill,
  opacity = 50,
}: {
  type: PlaceholderType | FallbackType;
  className?: string;
  fill?: boolean;
  opacity?: number;
}) {
  const baseClassName = fill ? "absolute inset-0" : "w-full h-full";
  const opacityStyle = { opacity: opacity / 100 };

  if (type === "skeleton") {
    return (
      <div
        className={`${baseClassName} animate-pulse bg-gray-300 ${className ?? ""}`}
        style={opacityStyle}
      />
    );
  }

  if (type === "blur") {
    return (
      <div
        className={`${baseClassName} animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] ${className ?? ""}`}
        style={{ ...opacityStyle, animation: "shimmer 1.5s infinite" }}
      />
    );
  }

  // icon type
  return (
    <div
      className={`${baseClassName} flex items-center justify-center bg-gray-200 ${className ?? ""}`}
      style={opacityStyle}
    >
      <FallbackIcon className="h-1/3 w-1/3 min-h-6 min-w-6 max-h-12 max-w-12 text-gray-400" />
    </div>
  );
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/images/placeholder.svg",
  fallbackType = "image",
  fallbackClassName,
  showLoadingPlaceholder = true,
  placeholderType = "skeleton",
  blurDataURL,
  placeholder,
  placeholderOpacity = 10,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [fallbackFailed, setFallbackFailed] = useState(false);

  // Use Next.js built-in blur if blurDataURL is provided
  const useNativeBlur = !!blurDataURL && placeholder === "blur";

  // Reset state when src changes
  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setFallbackFailed(false);
  }, [src]);

  // Show placeholder when both original and fallback failed
  if (fallbackFailed) {
    return (
      <div className={props.fill ? "relative w-full h-full" : undefined}>
        <Placeholder
          type={fallbackType}
          className={fallbackClassName ?? (props.className as string)}
          fill={props.fill}
          opacity={70}
        />
      </div>
    );
  }

  // If using native blur, let Next.js handle the placeholder
  if (useNativeBlur) {
    return (
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        placeholder="blur"
        blurDataURL={blurDataURL}
        onError={() => {
          if (imgSrc === src && fallbackSrc) {
            setImgSrc(fallbackSrc);
          } else {
            setFallbackFailed(true);
          }
        }}
      />
    );
  }

  return (
    <>
      {/* Loading placeholder */}
      {showLoadingPlaceholder && isLoading && (
        <Placeholder
          type={placeholderType}
          className={fallbackClassName ?? (props.className as string)}
          fill={props.fill}
          opacity={placeholderOpacity}
        />
      )}
      {/* Actual image */}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        className={`${props.className ?? ""} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (imgSrc === src && fallbackSrc) {
            // First failure: try fallback image
            setImgSrc(fallbackSrc);
          } else {
            // Fallback also failed: show placeholder
            setFallbackFailed(true);
            setIsLoading(false);
          }
        }}
      />
    </>
  );
}
