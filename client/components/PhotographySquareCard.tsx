"use client";

import { gsap } from "gsap";
import GalleryImage from "@/components/GalleryImage";
import React, { useEffect, useRef } from "react";
import {
  PHOTO_UNIFORM_CARD_CLASS,
  PHOTO_UNIFORM_IMAGE_SIZES,
} from "@/lib/photographyUniformGrid";

export type PhotographySquareCardProps = {
  id: string;
  imageSrc: string;
  alt: string;
  onOpen: () => void;
  /** Section hook for GSAP (e.g. `product-card`, `hospitality-card`). */
  cardClassName?: string;
};

export default function PhotographySquareCard({
  id,
  imageSrc,
  alt,
  onOpen,
  cardClassName = "",
}: PhotographySquareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const imageElement = imageRef.current;

    if (!card || !imageElement) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(imageElement, {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(imageElement, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      gsap.to(card, {
        rotationY: rotateY,
        rotationX: -rotateX,
        transformPerspective: 1000,
        duration: 0.6,
        ease: "power1.out",
      });

      const moveX = (x - centerX) / 15;
      const moveY = (y - centerY) / 15;

      gsap.to(imageElement, {
        x: -moveX,
        y: -moveY,
        duration: 0.6,
        ease: "power1.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mousemove", handleMouseMove);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, [id]);

  const handleClick = () => {
    const card = cardRef.current;
    if (card) {
      gsap.to(card, {
        scale: 0.95,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          onOpen();
        },
      });
    } else {
      onOpen();
    }
  };

  const mergedCardClass = [cardClassName, PHOTO_UNIFORM_CARD_CLASS]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      className={mergedCardClass}
      style={{ transformStyle: "preserve-3d" }}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div
        ref={imageRef}
        className="relative flex h-full w-full items-center justify-center overflow-hidden"
      >
        <GalleryImage
          src={imageSrc}
          alt={alt}
          fill
          fit="cover"
          sizes={PHOTO_UNIFORM_IMAGE_SIZES}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
