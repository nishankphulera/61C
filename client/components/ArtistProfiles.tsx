"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ArtistImage {
  id: string;
  imageSrc: string;
  orientation: "portrait" | "landscape";
  row: number; // 1 or 2
  width: number; // Width in pixels for variable sizing
}

export default function ArtistProfiles() {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalImageRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row1ContainerRef = useRef<HTMLDivElement>(null);
  const row2ContainerRef = useRef<HTMLDivElement>(null);

  // Fixed height for all images
  const IMAGE_HEIGHT = 250;

  // Sample images with variable widths but same height
  const images: ArtistImage[] = [
    // Row 1
    { id: "a1", imageSrc: "https://picsum.photos/600/800?random=400", orientation: "portrait", row: 1, width: 300 },
    { id: "a2", imageSrc: "https://picsum.photos/800/600?random=401", orientation: "landscape", row: 1, width: 500 },
    { id: "a3", imageSrc: "https://picsum.photos/500/700?random=402", orientation: "portrait", row: 1, width: 250 },
    { id: "a4", imageSrc: "https://picsum.photos/900/500?random=403", orientation: "landscape", row: 1, width: 600 },
    { id: "a5", imageSrc: "https://picsum.photos/550/750?random=404", orientation: "portrait", row: 1, width: 275 },
    { id: "a6", imageSrc: "https://picsum.photos/700/400?random=405", orientation: "landscape", row: 1, width: 450 },
    { id: "a7", imageSrc: "https://picsum.photos/600/900?random=406", orientation: "portrait", row: 1, width: 320 },
    { id: "a8", imageSrc: "https://picsum.photos/850/550?random=407", orientation: "landscape", row: 1, width: 550 },
    // Row 2
    { id: "a9", imageSrc: "https://picsum.photos/750/500?random=408", orientation: "landscape", row: 2, width: 480 },
    { id: "a10", imageSrc: "https://picsum.photos/500/800?random=409", orientation: "portrait", row: 2, width: 280 },
    { id: "a11", imageSrc: "https://picsum.photos/800/700?random=410", orientation: "landscape", row: 2, width: 520 },
    { id: "a12", imageSrc: "https://picsum.photos/600/850?random=411", orientation: "portrait", row: 2, width: 310 },
    { id: "a13", imageSrc: "https://picsum.photos/900/600?random=412", orientation: "landscape", row: 2, width: 580 },
    { id: "a14", imageSrc: "https://picsum.photos/550/800?random=413", orientation: "portrait", row: 2, width: 290 },
    { id: "a15", imageSrc: "https://picsum.photos/700/500?random=414", orientation: "landscape", row: 2, width: 470 },
    { id: "a16", imageSrc: "https://picsum.photos/650/900?random=415", orientation: "portrait", row: 2, width: 330 },
  ];

  // Modal animations
  useEffect(() => {
    const modal = modalRef.current;
    const modalImage = modalImageRef.current;

    if (!modal || !modalImage) return;

    if (isModalOpen) {
      // Open modal animation
      gsap.set(modal, { display: "flex" });
      gsap.fromTo(
        modal,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );
      gsap.fromTo(
        modalImage,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          delay: 0.1,
        }
      );
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Close modal animation
      gsap.to(modalImage, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(modal, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(modal, { display: "none" });
          document.body.style.overflow = "unset";
        },
      });
    }
  }, [isModalOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

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
        y: 80,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
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
        y: 80,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
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
    const row1Cards = row1Container.querySelectorAll(".artist-profile-card");
    const row2Cards = row2Container.querySelectorAll(".artist-profile-card");

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
          delay: index * 0.08,
          scrollTrigger: {
            trigger: card as Element,
            start: "left 90%",
            end: "left 10%",
            toggleActions: "play none none none",
            // Also trigger on vertical scroll
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
          delay: index * 0.08,
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
      // Kill all ScrollTriggers created in this effect
      const allTriggers = ScrollTrigger.getAll();
      allTriggers.forEach((trigger) => {
        const triggerElement = trigger.vars.trigger;
        // Check if trigger is related to this component
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
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close if clicking on backdrop (not on image)
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  // Group images by row
  const row1Images = images.filter((img) => img.row === 1);
  const row2Images = images.filter((img) => img.row === 2);

  return (
    <>
      <section ref={sectionRef} className="mb-16 bg-black py-12 px-4 md:px-8">
        {/* Title */}
        <h2 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-12 text-left">
          Artist Profiles
        </h2>

        {/* Horizontally scrollable grid with 2 rows */}
        <div className="space-y-6">
          {/* Row 1 */}
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
                <ArtistProfileCard
                  key={image.id}
                  image={image}
                  height={IMAGE_HEIGHT}
                  onClick={() => handleImageClick(image.imageSrc)}
                />
              ))}
            </div>
          </div>

          {/* Row 2 */}
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
                <ArtistProfileCard
                  key={image.id}
                  image={image}
                  height={IMAGE_HEIGHT}
                  onClick={() => handleImageClick(image.imageSrc)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal/Lightbox */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-start justify-center bg-black/90 backdrop-blur-sm"
        onClick={handleCloseModal}
        style={{ display: "none" }}
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 z-10 text-white hover:text-yellow-400 transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div
          ref={modalImageRef}
          className="flex items-center justify-center rounded-lg bg-amber-200"
          style={{
            width: "90vw",
            height: "80vh",
            maxWidth: "90vw",
            maxHeight: "80vh",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Artist profile preview"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
      </div>
    </>
  );
}

interface ArtistProfileCardProps {
  image: ArtistImage;
  height: number;
  onClick: () => void;
}

function ArtistProfileCard({ image, height, onClick }: ArtistProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const imageElement = imageRef.current;

    if (!card || !imageElement) return;

    // Enhanced hover effects with rotation
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
      className="artist-profile-card relative cursor-pointer overflow-hidden rounded-lg shadow-lg flex-shrink-0"
      style={{
        width: `${image.width}px`,
        height: `${height}px`,
        transformStyle: "preserve-3d",
      }}
      onClick={handleClick}
    >
      <div ref={imageRef} className="relative w-full h-full overflow-hidden">
        <Image
          src={image.imageSrc}
          alt={`Artist profile ${image.id}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, 25vw"
        />
      </div>
    </div>
  );
}

