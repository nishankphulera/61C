"use client";

import { gsap } from "gsap";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { usePhotographyLightbox } from "@/components/PhotographyLightboxContext";

interface AutomobileImage {
  id: string;
  imageSrc: string;
  column: number; // 1-4
  row: number; // Starting row position
  rowSpan: number; // Number of rows to span
}

type AutomobileLifestyleProps = {
  images?: string[];
};

export default function AutomobileLifestyle({ images }: AutomobileLifestyleProps) {
  const { open } = usePhotographyLightbox();
  const sectionRef = useRef<HTMLElement>(null);

  // Grid layout: 6 rows total
  // Columns 1-3: 3 square images each, each spanning 2 rows (3 × 2 = 6 rows)
  // Column 4: 2 taller images, each spanning 3 rows (2 × 3 = 6 rows)
  const fallbackImages: AutomobileImage[] = [
    // Column 1: square images
    { id: "a1", imageSrc: "https://picsum.photos/800/800?random=300", column: 1, row: 1, rowSpan: 2 },
    { id: "a2", imageSrc: "https://picsum.photos/800/800?random=301", column: 1, row: 3, rowSpan: 2 },
    { id: "a3", imageSrc: "https://picsum.photos/800/800?random=302", column: 1, row: 5, rowSpan: 2 },
    // Column 2: square images
    { id: "a4", imageSrc: "https://picsum.photos/800/800?random=303", column: 2, row: 1, rowSpan: 2 },
    { id: "a5", imageSrc: "https://picsum.photos/800/800?random=304", column: 2, row: 3, rowSpan: 2 },
    { id: "a6", imageSrc: "https://picsum.photos/800/800?random=305", column: 2, row: 5, rowSpan: 2 },
    // Column 3: square images
    { id: "a7", imageSrc: "https://picsum.photos/800/800?random=306", column: 3, row: 1, rowSpan: 2 },
    { id: "a8", imageSrc: "https://picsum.photos/800/800?random=307", column: 3, row: 3, rowSpan: 2 },
    { id: "a9", imageSrc: "https://picsum.photos/800/800?random=308", column: 3, row: 5, rowSpan: 2 },
    // Column 4: taller images (portrait orientation)
    { id: "a10", imageSrc: "https://picsum.photos/800/1200?random=309", column: 4, row: 1, rowSpan: 3 },
    { id: "a11", imageSrc: "https://picsum.photos/800/1200?random=310", column: 4, row: 4, rowSpan: 3 },
  ];
  const gallery = images?.length
    ? images.map((imageSrc, index) => {
        const column = (index % 4) + 1;
        const row = Math.floor(index / 4) * 2 + 1;
        return {
          id: `a${index + 1}`,
          imageSrc,
          column,
          row,
          rowSpan: column === 4 ? 3 : 2,
        };
      })
    : fallbackImages;

  // Grid animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const title = section.querySelector("h2");
    const cards = section.querySelectorAll(".automobile-card");

    // Title animation
    if (title) {
      gsap.fromTo(
        title,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }

    // Cards entrance animation
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.9,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.05,
        }
      );
    });
  }, []);

  const handleImageClick = (imageSrc: string) => {
    open(imageSrc, { alt: "Automobile" });
  };

  return (
      <section ref={sectionRef} className="mb-10 bg-black py-8 px-1 md:px-2">
        {/* Title */}
        <h2 className="text-5xl md:text-6xl  text-yellow-400 mb-8 text-left">
          Automobile
        </h2>

        {/* Grid: 6 rows × 4 columns */}
        {/* Columns 1-3: square images (2 rows each) */}
        {/* Column 4: taller images (3 rows each) */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-4 gap-1 md:gap-1"
          style={{
            gridTemplateRows: "repeat(6, minmax(0, 1fr))",
          }}
        >
          {gallery.map((image) => (
            <AutomobileImageCard
              key={image.id}
              image={image}
              onClick={() => handleImageClick(image.imageSrc)}
            />
          ))}
        </div>
      </section>
  );
}

interface AutomobileImageCardProps {
  image: AutomobileImage;
  onClick: () => void;
}

function AutomobileImageCard({ image, onClick }: AutomobileImageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const imageElement = imageRef.current;

    if (!card || !imageElement) return;

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(imageElement, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(imageElement, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Vertigo effect - image moves opposite to mouse direction with 3D tilt
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // 3D tilt effect
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      gsap.to(card, {
        rotationY: rotateY,
        rotationX: -rotateX,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power1.out",
      });

      // Vertigo effect - image moves opposite to mouse direction
      const moveX = (x - centerX) / 15;
      const moveY = (y - centerY) / 15;
      
      gsap.to(imageElement, {
        x: -moveX,
        y: -moveY,
        duration: 0.3,
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
  }, []);

  const handleClick = () => {
    const card = cardRef.current;
    if (card) {
      gsap.to(card, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          onClick();
        },
      });
    } else {
      onClick();
    }
  };

  // Column 4 images are taller (portrait), others are square
  const isTallImage = image.column === 4;
  const aspectRatio = isTallImage ? "2/3" : "1/1";

  return (
    <div
      ref={cardRef}
      className="automobile-card relative cursor-pointer overflow-hidden rounded-lg shadow-lg w-full h-full"
      style={{
        gridRow: `${image.row} / span ${image.rowSpan}`,
        gridColumn: image.column,
        aspectRatio: isTallImage ? undefined : aspectRatio,
        transformStyle: "preserve-3d",
      }}
      onClick={handleClick}
    >
      <div ref={imageRef} className="relative w-full h-full overflow-hidden">
        <Image
          src={image.imageSrc}
          alt={`Automobile ${image.id}`}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, 25vw"
        />
      </div>
    </div>
  );
}

