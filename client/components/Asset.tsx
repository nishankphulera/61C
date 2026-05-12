"use client";

import Image from "next/image";
import React, { memo, useEffect, useRef } from "react";

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
  zIndex?: number;
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
  zIndex = 10,
  reverse = false,
  priority = false,
  sizes = "(min-width: 1024px) 45vw, 90vw",
}: AssetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isAnimated = /\.gif($|\?)/i.test(src);
  const videoMatch = src.match(/^(.*)\.(mp4|webm|mov)($|\?.*)/i);
  const isVideo = !!videoMatch;
  const videoStem = videoMatch?.[1] ?? "";

  // Pause <video> playback while the asset is offscreen so the GPU/decoder
  // isn't doing work the user can't see — this is the main reason scroll
  // remains smooth when many videos share the same scene.
  useEffect(() => {
    if (!isVideo) return;
    const node = videoRef.current;
    const host = ref.current;
    if (!node || !host) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          const playPromise = node.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {
              /* autoplay can reject silently; nothing to do */
            });
          }
        } else if (!node.paused) {
          node.pause();
        }
      },
      { rootMargin: "200px 0px 200px 0px", threshold: 0 }
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [isVideo]);

  const style: React.CSSProperties = {
    position: "absolute",
    zIndex,
    // Always include translateZ(0) so the browser reliably promotes this asset
    // to its own compositor layer. Without this, rotated PNG/GIF assets share
    // the parent's paint layer, and any GIF frame update invalidates the whole
    // viewport's paint — which is the primary cause of scroll jank here.
    transform: rotate !== 0 ? `translateZ(0) rotate(${rotate}deg)` : "translateZ(0)",
    backfaceVisibility: "hidden",
    // Animated assets repaint constantly; hint to keep them on their own layer
    // and skip them when fully off-screen.
    ...(isAnimated || isVideo
      ? { willChange: "transform", contain: "paint" as const }
      : null),
  };

  if (position.topPx !== undefined) style.top = `${position.topPx}px`;
  else if (position.top !== undefined) style.top = position.top;
  if (position.bottom !== undefined) style.bottom = position.bottom;
  if (position.leftPx !== undefined) style.left = `${position.leftPx}px`;
  else if (position.left !== undefined) style.left = position.left;
  if (position.rightPx !== undefined) style.right = `${position.rightPx}px`;
  else if (position.right !== undefined) style.right = position.right;

  const mediaClass = `w-full h-auto object-contain pointer-events-none select-none${
    reverse ? " -scale-x-100" : ""
  }`;

  return (
    <div ref={ref} className={className} style={style}>
      {isVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          disableRemotePlayback
          preload={priority ? "auto" : "metadata"}
          aria-label={alt}
          className={mediaClass}
        >
          {/* MP4/H.264 is universally supported and is what's authored for
              these assets — listing it first lets browsers stop iterating
              <source> children and avoid 404s on missing .webm variants. */}
          <source src={`${videoStem}.mp4`} type="video/mp4" />
          <source src={`${videoStem}.webm`} type="video/webm" />
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
    </div>
  );
}

const Asset = memo(AssetImpl);
export default Asset;
