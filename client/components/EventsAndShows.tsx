"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhotographySquareCard from "@/components/PhotographySquareCard";
import React, { useEffect, useRef } from "react";
import { usePhotographyLightbox } from "@/components/PhotographyLightboxContext";
import { PHOTO_UNIFORM_GRID_CLASS } from "@/lib/photographyUniformGrid";

gsap.registerPlugin(ScrollTrigger);

interface EventImage {
  id: string;
  imageSrc: string;
}

type EventsAndShowsProps = {
  images?: string[];
};

const FALLBACK: EventImage[] = [
  { id: "e1", imageSrc: "https://picsum.photos/400/600?random=600" },
  { id: "e2", imageSrc: "https://picsum.photos/400/600?random=601" },
  { id: "e3", imageSrc: "https://picsum.photos/800/500?random=602" },
  { id: "e4", imageSrc: "https://picsum.photos/400/600?random=603" },
  { id: "e5", imageSrc: "https://picsum.photos/700/450?random=604" },
  { id: "e6", imageSrc: "https://picsum.photos/700/450?random=605" },
  { id: "e7", imageSrc: "https://picsum.photos/800/500?random=606" },
  { id: "e8", imageSrc: "https://picsum.photos/400/600?random=607" },
  { id: "e9", imageSrc: "https://picsum.photos/400/600?random=608" },
];

export default function EventsAndShows({ images }: EventsAndShowsProps) {
  const { open } = usePhotographyLightbox();
  const sectionRef = useRef<HTMLElement>(null);

  const gallery: EventImage[] = images?.length
    ? images.map((imageSrc, index) => ({ id: `e${index + 1}`, imageSrc }))
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

      const grid = section.querySelector(".events-grid");
      const cards = grid?.querySelectorAll(".event-card");
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
    open(imageSrc, { alt: "Events & shows" });
  };

  return (
    <section ref={sectionRef} className="mb-16 -mx-4 md:-mx-8">
      <h2 className="mb-12 px-4 text-left text-5xl text-yellow-400 md:px-8 md:text-6xl">
        Events
      </h2>

      <div className={`events-grid ${PHOTO_UNIFORM_GRID_CLASS}`}>
        {gallery.map((image) => (
          <PhotographySquareCard
            key={image.id}
            id={image.id}
            imageSrc={image.imageSrc}
            alt={`Event ${image.id}`}
            cardClassName="event-card"
            onOpen={() => handleImageClick(image.imageSrc)}
          />
        ))}
      </div>
    </section>
  );
}
