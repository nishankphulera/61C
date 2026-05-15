"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalleryImage from "@/components/GalleryImage";
import React, { useEffect, useRef } from "react";
import { usePhotographyLightbox } from "@/components/PhotographyLightboxContext";

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
    ...Array.from({ length: 6 }, (_, i) => ({ id: `r1-${i + 1}`, imageSrc: `https://picsum.photos/1920/1920?random=${i + 100}` })),
    ...Array.from({ length: 6 }, (_, i) => ({ id: `r2-${i + 1}`, imageSrc: `https://picsum.photos/1920/1920?random=${i + 200}` })),
  ];
  const gridImages: ProductImage[] =
    images && images.length
      ? images.map((imageSrc, index) => ({ id: `p-${index + 1}`, imageSrc }))
      : fallbackImages;

  const handleImageClick = (imageSrc: string) => {
    open(imageSrc, { alt: lightboxAlt });
  };

  // Scroll: title + 2×6 grid cards (staggered)
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
        {/* Title */}
        <h2 className="text-5xl md:text-6xl text-yellow-400 mb-12 text-left px-4 md:px-8">
          {heading}
        </h2>

        {/* 2 rows × 6 columns on md+; smaller breakpoints use fewer columns */}
        <div className="product-grid grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 md:grid-rows-2 gap-3 md:gap-4 lg:gap-6 px-4 md:px-8">
          {gridImages.map((image) => (
            <ProductImageCard
              key={image.id}
              image={image}
              imageAltPrefix={lightboxAlt}
              onClick={() => handleImageClick(image.imageSrc)}
            />
          ))}
        </div>
      </section>
  );
}

interface ProductImageCardProps {
  image: ProductImage;
  imageAltPrefix: string;
  onClick: () => void;
}

function ProductImageCard({ image, imageAltPrefix, onClick }: ProductImageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const imageElement = imageRef.current;

    if (!card || !imageElement) return;

    // Hover effects
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
        duration: 0.6,
        ease: "power1.out",
      });

      // Vertigo effect - image moves opposite to mouse direction
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
  }, [image.id]);

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
          onClick();
        },
      });
    } else {
      onClick();
    }
  };

  return (
    <div
      ref={cardRef}
      className="product-card relative min-w-0 aspect-square w-full cursor-pointer overflow-hidden rounded-lg bg-black/40 shadow-lg"
      style={{ transformStyle: "preserve-3d" }}
      onClick={handleClick}
    >
      <div ref={imageRef} className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <GalleryImage
          src={image.imageSrc}
          alt={`${imageAltPrefix} ${image.id}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
        />
      </div>
    </div>
  );
}

