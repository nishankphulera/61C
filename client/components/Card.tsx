"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

// Append translateZ(0) to whatever transform framer-motion generates so the
// card lives on its own compositor layer. Static GIFs inside otherwise force
// the parent layer to repaint on every animated frame.
const appendTranslateZ = (_: unknown, transform: string) =>
  `${transform} translateZ(0)`;

interface CardProps {
  title?: string;
  imageSrc: string;
  onClick: () => void;
  rotate?: number;
  position?: {
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
    topPx?: number;
    leftPx?: number;
    rightPx?: number;
  };
  className?: string;
  zIndex?: number;
  width?: string | number;
  reverse?: boolean;
  /** overlay: absolute collage card; stacked: normal flow for mobile columns */
  layout?: "overlay" | "stacked";
}

function CardImpl({
  title = "Navigation Card",
  imageSrc,
  onClick,
  rotate = 0,
  position = {},
  className = "",
  zIndex = 50,
  width,
  layout = "overlay",
  reverse = false,
}: CardProps) {
  const isStacked = layout === "stacked";
  const hostRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isVideo = /\.(mp4|webm|mov)($|\?)/i.test(imageSrc);

  // Pause the underlying <video> while the card is offscreen so it doesn't
  // burn decoder cycles when the user is reading other sections.
  useEffect(() => {
    if (!isVideo) return;
    const node = videoRef.current;
    const host = hostRef.current;
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

  const style: React.CSSProperties = isStacked
    ? {
        position: "relative",
        width: "100%",
        maxWidth: "min(22rem, 92vw)",
      }
    : {
        position: "absolute",
        zIndex,
        width: width || "100%",
        maxWidth: "90vw",
      };

  if (!isStacked) {
    if (position.topPx !== undefined) style.top = `${position.topPx}px`;
    else if (position.top !== undefined) style.top = position.top;
    if (position.bottom !== undefined) style.bottom = position.bottom;
    if (position.leftPx !== undefined) style.left = `${position.leftPx}px`;
    else if (position.left !== undefined) style.left = position.left;
    if (position.rightPx !== undefined) style.right = `${position.rightPx}px`;
    else if (position.right !== undefined) style.right = position.right;
  }

  return (
    <motion.div
      ref={hostRef}
      className={`cursor-pointer ${className}`}
      style={{
        ...style,
        rotate,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
      transformTemplate={appendTranslateZ}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        rotate: rotate + 5,
        transition: { duration: 0.3 },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      }}
    >
      <div className="relative w-full h-auto flex items-center justify-center">
        {(() => {
          const videoMatch = imageSrc.match(/^(.*)\.(mp4|webm|mov)($|\?.*)/i);
          const mediaClass = `w-full h-auto object-contain pointer-events-none select-none${
            reverse ? " -scale-x-100" : ""
          }`;
          if (videoMatch) {
            const stem = videoMatch[1];
            return (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                disableRemotePlayback
                preload="metadata"
                aria-label={title}
                className={mediaClass}
              >
                {/* MP4 first — universally supported and present for all
                    of our authored variants; avoids 404s for missing .webm. */}
                <source src={`${stem}.mp4`} type="video/mp4" />
                <source src={`${stem}.webm`} type="video/webm" />
              </video>
            );
          }
          return (
            <Image
              src={imageSrc}
              alt={title}
              width={1600}
              height={1200}
              sizes="(min-width: 1024px) 56rem, 90vw"
              unoptimized={/\.gif($|\?)/i.test(imageSrc)}
              loading="lazy"
              decoding="async"
              draggable={false}
              className={mediaClass}
            />
          );
        })()}
      </div>
    </motion.div>
  );
}

const Card = React.memo(CardImpl);
Card.displayName = "Card";

export default Card;
