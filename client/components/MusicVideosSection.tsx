"use client";

import { gsap } from "gsap";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import DraggableHorizontalScroll from "@/components/DraggableHorizontalScroll";

interface MusicVideo {
  id: string;
  imageSrc: string;
  href: string;
}

interface MusicVideosSectionProps {
  title?: string;
  videos: MusicVideo[];
  className?: string;
}

export default function MusicVideosSection({
  title = "Music Videos",
  videos,
  className = "",
}: MusicVideosSectionProps) {
  const displayVideos = videos;
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    // Title entrance animation
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
  }, []);

  return (
    <section ref={sectionRef} className={`mb-16 ${className}`}>
      {/* Title */}
      <h2
        ref={titleRef}
        className="text-5xl md:text-6xl text-yellow-400 mb-12 text-left font-bold"
      >
        {title}
      </h2>

      <DraggableHorizontalScroll ariaLabel="Music videos, scroll horizontally or drag to browse">
        {displayVideos.map((video, index) => (
          <div key={video.id} className="w-[min(88vw,22rem)] shrink-0">
            <MusicVideoCard video={video} index={index} />
          </div>
        ))}
      </DraggableHorizontalScroll>
    </section>
  );
}

interface MusicVideoCardProps {
  video: MusicVideo;
  index: number;
}

function MusicVideoCard({ video, index }: MusicVideoCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    if (!card || !image) return;

    // Entrance animation with stagger
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
        delay: index * 0.05, // Stagger effect
      }
    );

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(image, {
        scale: 1.1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
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
    };

    // 3D tilt effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      // 3D tilt effect
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
  }, [index]);

  return (
    <a
      ref={cardRef}
      href={video.href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block w-full cursor-pointer overflow-hidden rounded-lg shadow-lg no-underline"
      style={{
        aspectRatio: "16/9",
        minHeight: "200px",
        transformStyle: "preserve-3d",
      }}
    >
      <div ref={imageRef} className="relative w-full h-full overflow-hidden">
        <Image
          src={video.imageSrc}
          alt={`Music video ${video.id}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 88vw, 22rem"
        />
      </div>
    </a>
  );
}

