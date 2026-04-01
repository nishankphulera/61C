"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ProductImage {
  id: string;
  imageSrc: string;
}

type ProductFAndBProps = {
  images?: string[];
};

export default function ProductFAndB({ images }: ProductFAndBProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalImageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2×6 grid = 12 images (first row r1-1…r1-6, second row r2-1…r2-6)
  const fallbackImages: ProductImage[] = [
    ...Array.from({ length: 6 }, (_, i) => ({ id: `r1-${i + 1}`, imageSrc: `https://picsum.photos/1920/1920?random=${i + 100}` })),
    ...Array.from({ length: 6 }, (_, i) => ({ id: `r2-${i + 1}`, imageSrc: `https://picsum.photos/1920/1920?random=${i + 200}` })),
  ];
  const gridImages: ProductImage[] =
    images && images.length
      ? images.map((imageSrc, index) => ({ id: `p-${index + 1}`, imageSrc }))
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
          duration: 0.6,
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
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        }
      );
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Close modal animation
      gsap.to(modalImage, {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
      gsap.to(modal, {
        opacity: 0,
        duration: 0.6,
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
    <>
      <section ref={sectionRef} className="mb-16 -mx-4 md:-mx-8">
        {/* Title */}
        <h2 className="text-5xl md:text-6xl text-yellow-400 mb-12 text-left px-4 md:px-8">
          Product F&B
        </h2>

        {/* 2 rows × 6 columns on md+; smaller breakpoints use fewer columns */}
        <div className="product-grid grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 md:grid-rows-2 gap-3 md:gap-4 lg:gap-6 px-4 md:px-8">
          {gridImages.map((image) => (
            <ProductImageCard
              key={image.id}
              image={image}
              onClick={() => handleImageClick(image.imageSrc)}
            />
          ))}
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
              alt="Product preview"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
      </div>
    </>
  );
}

interface ProductImageCardProps {
  image: ProductImage;
  onClick: () => void;
}

function ProductImageCard({ image, onClick }: ProductImageCardProps) {
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
      className="product-card relative min-w-0 aspect-square w-full cursor-pointer overflow-hidden rounded-lg shadow-lg"
      style={{ transformStyle: "preserve-3d" }}
      onClick={handleClick}
    >
      <div ref={imageRef} className="relative w-full h-full overflow-hidden">
        <Image
          src={image.imageSrc}
          alt={`Product ${image.id}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
        />
      </div>
    </div>
  );
}

