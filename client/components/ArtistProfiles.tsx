"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhotographySquareCard from "@/components/PhotographySquareCard";
import React, { useEffect, useRef } from "react";
import { usePhotographyLightbox } from "@/components/PhotographyLightboxContext";
import { PHOTO_UNIFORM_GRID_CLASS } from "@/lib/photographyUniformGrid";

gsap.registerPlugin(ScrollTrigger);

interface ArtistImage {
  id: string;
  imageSrc: string;
}

type ArtistProfilesProps = {
  images?: string[];
};

const FALLBACK: ArtistImage[] = [
  { id: "a1", imageSrc: "https://picsum.photos/600/800?random=400" },
  { id: "a2", imageSrc: "https://picsum.photos/800/600?random=401" },
  { id: "a3", imageSrc: "https://picsum.photos/500/700?random=402" },
  { id: "a4", imageSrc: "https://picsum.photos/900/500?random=403" },
  { id: "a5", imageSrc: "https://picsum.photos/550/750?random=404" },
  { id: "a6", imageSrc: "https://picsum.photos/700/400?random=405" },
  { id: "a7", imageSrc: "https://picsum.photos/600/900?random=406" },
  { id: "a8", imageSrc: "https://picsum.photos/850/550?random=407" },
  { id: "a9", imageSrc: "https://picsum.photos/750/500?random=408" },
  { id: "a10", imageSrc: "https://picsum.photos/500/800?random=409" },
  { id: "a11", imageSrc: "https://picsum.photos/800/700?random=410" },
  { id: "a12", imageSrc: "https://picsum.photos/600/850?random=411" },
  { id: "a13", imageSrc: "https://picsum.photos/900/600?random=412" },
  { id: "a14", imageSrc: "https://picsum.photos/550/800?random=413" },
  { id: "a15", imageSrc: "https://picsum.photos/700/500?random=414" },
  { id: "a16", imageSrc: "https://picsum.photos/650/900?random=415" },
];

export default function ArtistProfiles({ images }: ArtistProfilesProps) {
  const { open } = usePhotographyLightbox();
  const sectionRef = useRef<HTMLElement>(null);

  const gallery: ArtistImage[] = images?.length
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

      const grid = section.querySelector(".artist-profiles-grid");
      const cards = grid?.querySelectorAll(".artist-profile-card");
      if (grid && cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.04,
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
    open(imageSrc, { alt: "Artist profile" });
  };

  return (
    <section ref={sectionRef} className="mb-16 -mx-4 md:-mx-8">
      <h2 className="mb-12 px-4 text-left text-5xl text-yellow-400 md:px-8 md:text-6xl">
        Artist Profiles
      </h2>

      <div className={`artist-profiles-grid ${PHOTO_UNIFORM_GRID_CLASS}`}>
        {gallery.map((image) => (
          <PhotographySquareCard
            key={image.id}
            id={image.id}
            imageSrc={image.imageSrc}
            alt={`Artist profile ${image.id}`}
            cardClassName="artist-profile-card"
            onOpen={() => handleImageClick(image.imageSrc)}
          />
        ))}
      </div>
    </section>
  );
}
