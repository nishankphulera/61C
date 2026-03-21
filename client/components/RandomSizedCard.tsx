"use client";

import { gsap } from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface RandomSizedCardProps {
  id: string;
  imageSrc: string;
  youtubeUrl?: string; // Optional, not used for click action
  width?: number; // Grid column span (1-4)
  height?: number; // Grid row span (1-4)
  className?: string;
}

export default function RandomSizedCard({
  id,
  imageSrc,
  youtubeUrl,
  width = 1,
  height = 1,
  className = "",
}: RandomSizedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalImageRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    if (!card || !image) return;

    // Entrance animation
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
        delay: parseFloat(id.replace(/\D/g, "")) * 0.05 || 0,
      }
    );

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(image, {
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
      gsap.to(image, {
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
      
      gsap.to(image, {
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
  }, [id]);

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

  const handleClick = () => {
    const card = cardRef.current;
    if (card) {
      gsap.to(card, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          setIsModalOpen(true);
        },
      });
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close if clicking on backdrop (not on image)
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        className={`relative w-full h-full cursor-pointer overflow-hidden rounded-lg shadow-lg ${className}`}
        style={{
          transformStyle: "preserve-3d",
        }}
        onClick={handleClick}
      >
        <div ref={imageRef} className="relative w-full h-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={`Photo ${id}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Modal/Lightbox */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-start justify-center backdrop-blur-sm"
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
          <img
            src={imageSrc}
            alt={`Photo ${id} - Enlarged`}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </>
  );
}

