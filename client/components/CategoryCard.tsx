"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface CategoryCardProps {
  title: string;
  onClick: () => void;
  initialRotation?: number;
  className?: string;
  delay?: number;
}

export default function CategoryCard({
  title,
  onClick,
  initialRotation = 0,
  className = "",
  delay = 0,
}: CategoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const innerCard = innerCardRef.current;

    if (!card || !innerCard) return;

    // Entrance animation
    gsap.fromTo(
      card,
      {
        opacity: 0,
        scale: 0.8,
        y: 50,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: delay,
      }
    );

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(innerCard, {
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(innerCard, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(innerCard, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    // 3D tilt effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      gsap.to(innerCard, {
        rotationY: rotateY,
        rotationX: -rotateX,
        transformPerspective: 1000,
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
  }, [delay]);

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
      className={`relative w-[280px] h-[180px] cursor-pointer ${className}`}
      style={{
        rotate: initialRotation,
        transformStyle: "preserve-3d",
      }}
      onClick={handleClick}
    >
      <div
        ref={innerCardRef}
        className="relative w-full h-full bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-50 rounded-lg shadow-2xl border-2 border-amber-200 overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.8),rgba(255,255,255,0))]" />
        
        {/* Title */}
        <div className="relative h-full flex items-center justify-center p-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center tracking-wide uppercase drop-shadow-sm">
            {title}
          </h2>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-200 rounded-bl-full opacity-30" />
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-amber-300 rounded-tr-full opacity-20" />
      </div>
    </div>
  );
}

