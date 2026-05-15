"use client";

import Image from "next/image";

type GalleryImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
};

/** Gallery image with correct referrer policy for Google-hosted assets. */
export default function GalleryImage({
  src,
  alt,
  className,
  sizes,
  fill,
  width,
  height,
}: GalleryImageProps) {
  const needsNoReferrer =
    src.startsWith("/api/drive-image/") ||
    src.includes("googleusercontent.com") ||
    src.includes("drive.google.com") ||
    src.includes("drive.usercontent.google.com");

  const fitClass = fill ? "object-contain" : "";
  const mergedClassName = [fitClass, className].filter(Boolean).join(" ");

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={mergedClassName}
      sizes={sizes}
      referrerPolicy={needsNoReferrer ? "no-referrer" : undefined}
      unoptimized
    />
  );
}
