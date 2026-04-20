"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { usePhotographyLightbox } from "@/components/PhotographyLightboxContext";

gsap.registerPlugin(ScrollTrigger);

interface FashionImage {
  id: string;
  imageSrc: string;
  row: number; // 1 or 2
}

type FashionProps = {
  images?: string[];
};

export default function Fashion({ images }: FashionProps) {
  const { open } = usePhotographyLightbox();
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row1ContainerRef = useRef<HTMLDivElement>(null);
  const row2ContainerRef = useRef<HTMLDivElement>(null);

  // Fashion images - 2 rows with 6 columns each (12 images total)
  const fallbackImages: FashionImage[] = [
    // Row 1 - 6 images
    { id: "f1", imageSrc: "https://picsum.photos/600/800?random=500", row: 1 },
    { id: "f2", imageSrc: "https://picsum.photos/600/800?random=501", row: 1 },
    { id: "f3", imageSrc: "https://picsum.photos/600/800?random=502", row: 1 },
    { id: "f4", imageSrc: "https://picsum.photos/600/800?random=503", row: 1 },
    { id: "f5", imageSrc: "https://picsum.photos/600/800?random=504", row: 1 },
    { id: "f6", imageSrc: "https://picsum.photos/600/800?random=505", row: 1 },
    // Row 2 - 6 images
    { id: "f7", imageSrc: "https://picsum.photos/600/800?random=506", row: 2 },
    { id: "f8", imageSrc: "https://picsum.photos/600/800?random=507", row: 2 },
    { id: "f9", imageSrc: "https://picsum.photos/600/800?random=508", row: 2 },
    { id: "f10", imageSrc: "https://picsum.photos/600/800?random=509", row: 2 },
    { id: "f11", imageSrc: "https://picsum.photos/600/800?random=510", row: 2 },
    { id: "f12", imageSrc: "https://picsum.photos/600/800?random=511", row: 2 },
  ];
  const gallery = images?.length
    ? images.map((imageSrc, index) => ({
        id: `f${index + 1}`,
        imageSrc,
        row: index < Math.ceil(images.length / 2) ? 1 : 2,
      }))
    : fallbackImages;

  // Scroll-triggered animations
  useEffect(() => {
    const section = sectionRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    const row1Container = row1ContainerRef.current;
    const row2Container = row2ContainerRef.current;

    if (!section || !row1 || !row2 || !row1Container || !row2Container) return;

    // Title animation on scroll into view
    const title = section.querySelector("h2");
    if (title) {
      gsap.fromTo(
        title,
        {
          opacity: 0,
          x: -100,
          scale: 0.9,
        },
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

    // Row 1 reveal animation on scroll into view
    gsap.fromTo(
      row1Container,
      {
        opacity: 0,
        x: 100,
        scale: 0.95,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row1,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      }
    );

    // Row 2 reveal animation on scroll into view
    gsap.fromTo(
      row2Container,
      {
        opacity: 0,
        x: 100,
        scale: 0.95,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row2,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate cards as they come into view during horizontal scroll
    const row1Cards = row1Container.querySelectorAll(".fashion-card");
    const row2Cards = row2Container.querySelectorAll(".fashion-card");

    // Row 1 cards animation
    row1Cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.7,
          y: 50,
          rotation: -5,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card as Element,
            start: "left 90%",
            end: "left 10%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        }
      );
    });

    // Row 2 cards animation
    row2Cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.7,
          y: 50,
          rotation: 5,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card as Element,
            start: "left 90%",
            end: "left 10%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        }
      );
    });

    // Cleanup function
    return () => {
      const allTriggers = ScrollTrigger.getAll();
      allTriggers.forEach((trigger) => {
        const triggerElement = trigger.vars.trigger;
        if (
          triggerElement === section ||
          triggerElement === row1 ||
          triggerElement === row2 ||
          triggerElement === row1Container ||
          triggerElement === row2Container ||
          Array.from(row1Cards).includes(triggerElement as Element) ||
          Array.from(row2Cards).includes(triggerElement as Element)
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  const handleImageClick = (imageSrc: string) => {
    open(imageSrc, { alt: "Fashion & lifestyle" });
  };

  // Group images by row
  const row1Images = gallery.filter((img) => img.row === 1);
  const row2Images = gallery.filter((img) => img.row === 2);

  return (
      <section ref={sectionRef} className="mb-16 bg-black py-12 px-4 md:px-8">
        {/* Title on top left */}
        <h2 className="text-5xl md:text-6xl text-yellow-400 mb-12 text-left">
          Fashion & Lifestyle
        </h2>

        {/* Horizontally scrollable grid with 2 rows, 6 columns each */}
        <div className="space-y-6">
          {/* Row 1 - 6 images */}
          <div
            ref={row1Ref}
            className="overflow-x-auto scrollbar-hide"
            style={{
              scrollBehavior: "smooth",
            }}
          >
            <div
              ref={row1ContainerRef}
              className="flex gap-4 md:gap-6"
              style={{ minWidth: "max-content" }}
            >
              {row1Images.map((image) => (
                <FashionCard
                  key={image.id}
                  image={image}
                  onClick={() => handleImageClick(image.imageSrc)}
                />
              ))}
            </div>
          </div>

          {/* Row 2 - 6 images */}
          <div
            ref={row2Ref}
            className="overflow-x-auto scrollbar-hide"
            style={{
              scrollBehavior: "smooth",
            }}
          >
            <div
              ref={row2ContainerRef}
              className="flex gap-4 md:gap-6"
              style={{ minWidth: "max-content" }}
            >
              {row2Images.map((image) => (
                <FashionCard
                  key={image.id}
                  image={image}
                  onClick={() => handleImageClick(image.imageSrc)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}

interface FashionCardProps {
  image: FashionImage;
  onClick: () => void;
}

function FashionCard({ image, onClick }: FashionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const imageElement = imageRef.current;

    if (!card || !imageElement) return;

    // Enhanced hover effects
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        y: -5,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(imageElement, {
        scale: 1.15,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(imageElement, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.4,
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

  return (
    <div
      ref={cardRef}
      className="fashion-card relative cursor-pointer overflow-hidden rounded-lg shadow-lg flex-shrink-0"
      style={{
        width: "180px",
        height: "300px",
        transformStyle: "preserve-3d",
      }}
      onClick={handleClick}
    >
      <div ref={imageRef} className="relative w-full h-full overflow-hidden">
        <Image
          src={image.imageSrc}
          alt={`Fashion ${image.id}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, 400px"
        />
      </div>
    </div>
  );
}

