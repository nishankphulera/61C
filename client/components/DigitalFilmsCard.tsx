"use client";

import { gsap } from "gsap";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

interface DigitalFilmsCardProps {
  id: string;
  title: string;
  imageSrc: string;
  youtubeUrl: string;
  className?: string;
}

export default function DigitalFilmsCard({
  id,
  title,
  imageSrc,
  youtubeUrl,
  className = "",
}: DigitalFilmsCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const playIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const playIcon = playIconRef.current;

    if (!card || !image || !playIcon) return;

    // Entrance animation with rotation
    gsap.fromTo(
      card,
      {
        opacity: 0,
        scale: 0.8,
        y: 50,
        rotationY: -15,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: parseFloat(id) * 0.1 || 0,
      }
    );

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        y: -10,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(image, {
        scale: 1.15,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(playIcon, {
        opacity: 1,
        scale: 1.2,
        rotation: 360,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(image, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(playIcon, {
        opacity: 0,
        scale: 0.5,
        rotation: -180,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      // 3D tilt effect
      gsap.to(card, {
        rotationY: rotateY,
        rotationX: -rotateX,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power1.out",
      });

      // Vertigo effect - image moves opposite to mouse direction
      const moveX = (x - centerX) / 12;
      const moveY = (y - centerY) / 12;
      
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

    // Initial play icon state
    gsap.set(playIcon, {
      opacity: 0,
      scale: 0.5,
      rotation: -180,
    });

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, [id]);

  const handleClick = () => {
    const card = cardRef.current;
    if (card) {
      gsap.to(card, {
        scale: 0.95,
        rotationY: 5,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          window.open(youtubeUrl, "_blank");
        },
      });
    } else {
      window.open(youtubeUrl, "_blank");
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative w-full cursor-pointer overflow-hidden rounded-lg shadow-lg ${className}`}
      style={{
        aspectRatio: "2/4", // Height > Width (portrait) - shorter height
        maxHeight: "420px",
        transformStyle: "preserve-3d",
      }}
      onClick={handleClick}
    >
      <div ref={imageRef} className="relative w-full h-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      
      {/* Overlay with title */}
      {/* <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
        <h3 className="text-white text-2xl md:text-3xl font-bold text-center px-4 drop-shadow-lg">
          {title}
        </h3>
      </div> */}

      {/* Play icon overlay */}
      <div
        ref={playIconRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

