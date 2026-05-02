"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

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

export default function Card({
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
      className={`cursor-pointer ${className}`}
      style={{
        ...style,
        rotate,
      }}
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
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={title}
                className={mediaClass}
              >
                <source src={`${stem}.webm`} type="video/webm" />
                <source src={`${stem}.mp4`} type="video/mp4" />
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
              draggable={false}
              className={mediaClass}
            />
          );
        })()}
      </div>
    </motion.div>
  );
}
