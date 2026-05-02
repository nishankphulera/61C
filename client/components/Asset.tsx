"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import React, { memo, useMemo, useRef } from "react";

interface PositionProps {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  topPx?: number;
  leftPx?: number;
  rightPx?: number;
}

interface AssetProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  position?: PositionProps;
  rotate?: number;
  parallax?: number;
  scaleFactor?: number;
  zIndex?: number;
  /** Fallback: if provided and `progress` is not, this Asset creates its own scroll listener. Prefer `progress`. */
  scrollContainer?: React.RefObject<HTMLElement | null>;
  /** Shared scroll progress (0..1) from the parent. Prevents each Asset from registering its own scroll listener. */
  progress?: MotionValue<number>;
  /** When true, flips the image horizontally (mirror). */
  reverse?: boolean;
  /** Prioritize image loading (LCP candidates). Defaults to false. */
  priority?: boolean;
  /** Responsive sizes hint for next/image. */
  sizes?: string;
}

function AssetImpl({
  src = "/Drone.svg",
  alt = "Asset",
  width = 400,
  height = 400,
  className = "",
  position = {},
  rotate = 0,
  parallax = 0.5,
  scaleFactor = 0,
  zIndex = 10,
  scrollContainer,
  progress,
  reverse = false,
  priority = false,
  sizes = "(min-width: 1024px) 45vw, 90vw",
}: AssetProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Fallback scroll if the parent did not share a progress MotionValue.
  // When `progress` is passed, the hook call below is still made but its result is ignored;
  // to keep hook order stable we always call useScroll.
  const { scrollYProgress: fallbackProgress } = useScroll(
    scrollContainer && !progress
      ? { target: scrollContainer, offset: ["start end", "end start"] }
      : {}
  );
  const sectionProgress = progress ?? fallbackProgress;

  const parallaxTravelPx = useMemo(
    () =>
      typeof window !== "undefined" && window.innerWidth >= 1024 ? 760 : 420,
    []
  );

  const y = useTransform(
    sectionProgress,
    [0, 1],
    [0, parallax * parallaxTravelPx]
  );

  const scrollScale = useTransform(sectionProgress, [0, 1], [1, 1 + scaleFactor]);
  const scale = scaleFactor === 0 ? 1 : scrollScale;

  const style: React.CSSProperties = {
    position: "absolute",
    zIndex,
  };

  if (position.topPx !== undefined) style.top = `${position.topPx}px`;
  else if (position.top !== undefined) style.top = position.top;
  if (position.bottom !== undefined) style.bottom = position.bottom;
  if (position.leftPx !== undefined) style.left = `${position.leftPx}px`;
  else if (position.left !== undefined) style.left = position.left;
  if (position.rightPx !== undefined) style.right = `${position.rightPx}px`;
  else if (position.right !== undefined) style.right = position.right;

  const isAnimated = /\.gif($|\?)/i.test(src);
  const videoMatch = src.match(/^(.*)\.(mp4|webm|mov)($|\?.*)/i);
  const isVideo = !!videoMatch;
  const videoStem = videoMatch?.[1] ?? "";

  const mediaClass = `w-full h-auto object-contain pointer-events-none select-none${
    reverse ? " -scale-x-100" : ""
  }`;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        y,
        scale,
        rotate,
      }}
    >
      {isVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          aria-label={alt}
          className={mediaClass}
        >
          <source src={`${videoStem}.webm`} type="video/webm" />
          <source src={`${videoStem}.mp4`} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          unoptimized={isAnimated}
          draggable={false}
          className={mediaClass}
        />
      )}
    </motion.div>
  );
}

const Asset = memo(AssetImpl);
export default Asset;
