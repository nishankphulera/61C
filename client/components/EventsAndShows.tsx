"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

interface EventImage {
  id: string;
  imageSrc: string;
  orientation: "portrait" | "landscape";
  row: number; // 1 or 2
  width: number; // Width in pixels for variable sizing
  height: number; // Height in pixels for variable sizing
}

type EventsAndShowsProps = {
  images?: string[];
};

export default function EventsAndShows({ images }: EventsAndShowsProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalImageRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row1ContainerRef = useRef<HTMLDivElement>(null);
  const row2ContainerRef = useRef<HTMLDivElement>(null);

  // Events & Shows images - 2 rows with variable sizes
  // Top row: 5 images (mix of portrait and landscape)
  // Bottom row: 4 images (mix of portrait and landscape)
  const fallbackImages: EventImage[] = [
    // Row 1 - 5 images
    { id: "e1", imageSrc: "https://picsum.photos/400/600?random=600", orientation: "portrait", row: 1, width: 180, height: 270 },
    { id: "e2", imageSrc: "https://picsum.photos/400/600?random=601", orientation: "portrait", row: 1, width: 180, height: 270 },
    { id: "e3", imageSrc: "https://picsum.photos/800/500?random=602", orientation: "landscape", row: 1, width: 280, height: 180 },
    { id: "e4", imageSrc: "https://picsum.photos/400/600?random=603", orientation: "portrait", row: 1, width: 180, height: 270 },
    { id: "e5", imageSrc: "https://picsum.photos/700/450?random=604", orientation: "landscape", row: 1, width: 270, height: 180 },
    // Row 2 - 4 images
    { id: "e6", imageSrc: "https://picsum.photos/700/450?random=605", orientation: "landscape", row: 2, width: 270, height: 180 },
    { id: "e7", imageSrc: "https://picsum.photos/800/500?random=606", orientation: "landscape", row: 2, width: 280, height: 180 },
    { id: "e8", imageSrc: "https://picsum.photos/400/600?random=607", orientation: "portrait", row: 2, width: 180, height: 270 },
    { id: "e9", imageSrc: "https://picsum.photos/400/600?random=608", orientation: "portrait", row: 2, width: 180, height: 270 },
  ];
  const gallery: EventImage[] = images?.length
    ? images.map<EventImage>((imageSrc, index) => ({
        id: `e${index + 1}`,
        imageSrc,
        orientation: index % 3 === 0 ? "portrait" : "landscape",
        row: index < Math.ceil(images.length / 2) ? 1 : 2,
        width: index % 3 === 0 ? 180 : 280,
        height: index % 3 === 0 ? 270 : 180,
      }))
    : fallbackImages;

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
    const row1Cards = row1Container.querySelectorAll(".event-card");
    const row2Cards = row2Container.querySelectorAll(".event-card");

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
  const row1Images = gallery.filter((img) => img.row === 1);
  const row2Images = gallery.filter((img) => img.row === 2);

  return (
    <>
      <section ref={sectionRef} className="mb-16 bg-black py-12 px-4 md:px-8">
        {/* Title on top left */}
        <h2 className="text-5xl md:text-6xl text-yellow-400 mb-12 text-left">
          EVENTS & SHOWS
        </h2>

        {/* Horizontally scrollable grid with 2 rows, variable sizes */}
        <div className="space-y-6">
          {/* Row 1 - 5 images */}
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
                <EventCard
                  key={image.id}
                  image={image}
                  onClick={() => handleImageClick(image.imageSrc)}
                />
              ))}
            </div>
          </div>

          {/* Row 2 - 4 images */}
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
                <EventCard
                  key={image.id}
                  image={image}
                  onClick={() => handleImageClick(image.imageSrc)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal/Lightbox for enlarged image */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
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
            height: "90vh",
            maxWidth: "90vw",
            maxHeight: "90vh",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Event preview"
              className="w-full h-full object-contain rounded-lg"
            />
          )}
        </div>
      </div>
    </>
  );
}

interface EventCardProps {
  image: EventImage;
  onClick: () => void;
}

function EventCard({ image, onClick }: EventCardProps) {
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
      className="event-card relative cursor-pointer overflow-hidden rounded-lg shadow-lg flex-shrink-0"
      style={{
        width: `${image.width}px`,
        height: `${image.height}px`,
        transformStyle: "preserve-3d",
      }}
      onClick={handleClick}
    >
      <div ref={imageRef} className="relative w-full h-full overflow-hidden">
        <Image
          src={image.imageSrc}
          alt={`Event ${image.id}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, 25vw"
        />
      </div>
    </div>
  );
}

