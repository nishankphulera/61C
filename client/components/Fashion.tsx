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

interface FashionImage {
  id: string;
  imageSrc: string;
}

type FashionProps = {
  images?: string[];
};

const FALLBACK: FashionImage[] = [
  { id: "f1", imageSrc: "https://picsum.photos/600/800?random=500" },
  { id: "f2", imageSrc: "https://picsum.photos/600/800?random=501" },
  { id: "f3", imageSrc: "https://picsum.photos/600/800?random=502" },
  { id: "f4", imageSrc: "https://picsum.photos/600/800?random=503" },
  { id: "f5", imageSrc: "https://picsum.photos/600/800?random=504" },
  { id: "f6", imageSrc: "https://picsum.photos/600/800?random=505" },
  { id: "f7", imageSrc: "https://picsum.photos/600/800?random=506" },
  { id: "f8", imageSrc: "https://picsum.photos/600/800?random=507" },
  { id: "f9", imageSrc: "https://picsum.photos/600/800?random=508" },
  { id: "f10", imageSrc: "https://picsum.photos/600/800?random=509" },
  { id: "f11", imageSrc: "https://picsum.photos/600/800?random=510" },
  { id: "f12", imageSrc: "https://picsum.photos/600/800?random=511" },
];

export default function Fashion({ images }: FashionProps) {
  const { open } = usePhotographyLightbox();
  const sectionRef = useRef<HTMLElement>(null);

  const gallery: FashionImage[] = images?.length
    ? images.map((imageSrc, index) => ({ id: `f${index + 1}`, imageSrc }))
    : FALLBACK;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const title = section.querySelector("h2");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, x: -100, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
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

      const grid = section.querySelector(".fashion-grid");
      const cards = grid?.querySelectorAll(".fashion-card");
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
    }, section);

    return () => ctx.revert();
  }, []);

  const handleImageClick = (imageSrc: string) => {
    open(imageSrc, { alt: "Fashion & lifestyle" });
  };

  return (
    <section ref={sectionRef} className="mb-16 -mx-4 md:-mx-8">
      <h2 className="mb-12 px-4 text-left text-5xl text-yellow-400 md:px-8 md:text-6xl">
        Fashion & Lifestyle
      </h2>

      <div
        className={`fashion-grid ${PHOTO_UNIFORM_GRID_CLASS} ${PHOTO_UNIFORM_GRID_MD_TWO_ROWS}`}
      >
        {gallery.map((image) => (
          <PhotographySquareCard
            key={image.id}
            id={image.id}
            imageSrc={image.imageSrc}
            alt={`Fashion ${image.id}`}
            cardClassName="fashion-card"
            onOpen={() => handleImageClick(image.imageSrc)}
          />
        ))}
      </div>
    </section>
  );
}
