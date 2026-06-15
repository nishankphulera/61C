"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhotographySquareCard from "@/components/PhotographySquareCard";
import React, { useEffect, useRef } from "react";
import { usePhotographyLightbox } from "@/components/PhotographyLightboxContext";
import { PHOTO_UNIFORM_GRID_CLASS } from "@/lib/photographyUniformGrid";

gsap.registerPlugin(ScrollTrigger);

interface AutomobileImage {
  id: string;
  imageSrc: string;
}

type AutomobileLifestyleProps = {
  images?: string[];
};

const FALLBACK: AutomobileImage[] = [
  { id: "a1", imageSrc: "https://picsum.photos/800/800?random=300" },
  { id: "a2", imageSrc: "https://picsum.photos/800/800?random=301" },
  { id: "a3", imageSrc: "https://picsum.photos/800/800?random=302" },
  { id: "a4", imageSrc: "https://picsum.photos/800/800?random=303" },
  { id: "a5", imageSrc: "https://picsum.photos/800/800?random=304" },
  { id: "a6", imageSrc: "https://picsum.photos/800/800?random=305" },
  { id: "a7", imageSrc: "https://picsum.photos/800/800?random=306" },
  { id: "a8", imageSrc: "https://picsum.photos/800/800?random=307" },
  { id: "a9", imageSrc: "https://picsum.photos/800/800?random=308" },
  { id: "a10", imageSrc: "https://picsum.photos/800/1200?random=309" },
  { id: "a11", imageSrc: "https://picsum.photos/800/1200?random=310" },
];

export default function AutomobileLifestyle({ images }: AutomobileLifestyleProps) {
  const { open } = usePhotographyLightbox();
  const sectionRef = useRef<HTMLElement>(null);

  const gallery: AutomobileImage[] = images?.length
    ? images.map((imageSrc, index) => ({ id: `a${index + 1}`, imageSrc }))
    : FALLBACK;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const title = section.querySelector("h2");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const grid = section.querySelector(".automobile-grid");
      const cards = grid?.querySelectorAll(".automobile-card");
      if (grid && cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleImageClick = (imageSrc: string) => {
    open(imageSrc, { alt: "Automobiles" });
  };

  return (
    <section ref={sectionRef} className="mb-16 -mx-4 md:-mx-8">
      <h2 className="mb-8 px-4 text-left text-5xl text-yellow-400 md:px-8 md:mb-12 md:text-6xl">
        Automotive
      </h2>

      <div className={`automobile-grid ${PHOTO_UNIFORM_GRID_CLASS}`}>
        {gallery.map((image) => (
          <PhotographySquareCard
            key={image.id}
            id={image.id}
            imageSrc={image.imageSrc}
            alt={`Automobiles ${image.id}`}
            cardClassName="automobile-card"
            onOpen={() => handleImageClick(image.imageSrc)}
          />
        ))}
      </div>
    </section>
  );
}
