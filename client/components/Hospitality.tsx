"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhotographySquareCard from "@/components/PhotographySquareCard";
import React, { useEffect, useRef } from "react";
import { usePhotographyLightbox } from "@/components/PhotographyLightboxContext";
import { PHOTO_UNIFORM_GRID_CLASS } from "@/lib/photographyUniformGrid";

gsap.registerPlugin(ScrollTrigger);

interface HospitalityImage {
  id: string;
  imageSrc: string;
}

const IMAGES: HospitalityImage[] = Array.from({ length: 6 }, (_, i) => ({
  id: `h-${i + 1}`,
  imageSrc: `https://picsum.photos/1200/1200?random=${i + 700}`,
}));

type HospitalityProps = {
  images?: string[];
};

export default function Hospitality({ images }: HospitalityProps) {
  const { open } = usePhotographyLightbox();
  const sectionRef = useRef<HTMLElement>(null);
  const list = images?.length ? images.map((imageSrc, idx) => ({ id: `h-${idx + 1}`, imageSrc })) : IMAGES;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const title = section.querySelector("h2");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const grid = section.querySelector(".hospitality-grid");
      const cards = grid?.querySelectorAll(".hospitality-card");
      if (grid && cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
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

  return (
    <section ref={sectionRef} className="mb-16 -mx-4 md:-mx-8">
      <h2 className="mb-12 px-4 text-left text-5xl text-yellow-400 md:px-8 md:text-6xl">
        Hospitality
      </h2>

      <div className={`hospitality-grid ${PHOTO_UNIFORM_GRID_CLASS}`}>
        {list.map((img) => (
          <PhotographySquareCard
            key={img.id}
            id={img.id}
            imageSrc={img.imageSrc}
            alt={`Hospitality ${img.id}`}
            cardClassName="hospitality-card"
            onOpen={() => open(img.imageSrc, { alt: `Hospitality ${img.id}` })}
          />
        ))}
      </div>
    </section>
  );
}
