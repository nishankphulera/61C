"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhotographySquareCard from "@/components/PhotographySquareCard";
import React, { useEffect, useRef } from "react";
import { usePhotographyLightbox } from "@/components/PhotographyLightboxContext";
import {
  PHOTO_UNIFORM_GRID_CLASS,
  PHOTO_UNIFORM_GRID_MD_TWO_ROWS,
} from "@/lib/photographyUniformGrid";

gsap.registerPlugin(ScrollTrigger);

interface ProductImage {
  id: string;
  imageSrc: string;
}

type ProductFAndBProps = {
  images?: string[];
  /** Section title (e.g. F&B vs Product). */
  heading?: string;
  /** Lightbox image description. */
  lightboxAlt?: string;
};

export default function ProductFAndB({
  images,
  heading = "Product F&B",
  lightboxAlt = "Product F&B",
}: ProductFAndBProps) {
  const { open } = usePhotographyLightbox();
  const sectionRef = useRef<HTMLElement>(null);

  // 2×6 grid = 12 images (first row r1-1…r1-6, second row r2-1…r2-6)
  const fallbackImages: ProductImage[] = [
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `r1-${i + 1}`,
      imageSrc: `https://picsum.photos/1920/1920?random=${i + 100}`,
    })),
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `r2-${i + 1}`,
      imageSrc: `https://picsum.photos/1920/1920?random=${i + 200}`,
    })),
  ];
  const gridImages: ProductImage[] =
    images && images.length
      ? images.map((imageSrc, index) => ({ id: `p-${index + 1}`, imageSrc }))
      : fallbackImages;

  const handleImageClick = (imageSrc: string) => {
    open(imageSrc, { alt: lightboxAlt });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const title = section.querySelector("h2");
    if (title) {
      gsap.fromTo(
        title,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    const grid = section.querySelector(".product-grid");
    const cards = grid?.querySelectorAll(".product-card");
    if (grid && cards?.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="mb-16 -mx-4 md:-mx-8">
      <h2 className="mb-12 px-4 text-left text-5xl text-yellow-400 md:px-8 md:text-6xl">
        {heading}
      </h2>

      <div
        className={`product-grid ${PHOTO_UNIFORM_GRID_CLASS} ${PHOTO_UNIFORM_GRID_MD_TWO_ROWS}`}
      >
        {gridImages.map((image) => (
          <PhotographySquareCard
            key={image.id}
            id={image.id}
            imageSrc={image.imageSrc}
            alt={`${lightboxAlt} ${image.id}`}
            cardClassName="product-card"
            onOpen={() => handleImageClick(image.imageSrc)}
          />
        ))}
      </div>
    </section>
  );
}
