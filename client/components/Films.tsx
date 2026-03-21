"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FilmsProps {
  imageSide: "left" | "right";
  title: string;
  description?: string;
  imageSrc: string;
  redirectTo: string;
  className?: string;
}

export default function Films({
  imageSide,
  title,
  description,
  imageSrc,
  redirectTo,
  className = "",
}: FilmsProps) {
  const router = useRouter();

  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const handleClick = () => router.push(redirectTo);

  useEffect(() => {
    if (!cardRef.current || !imageRef.current || !titleRef.current) return;

    // Animation initial state
    gsap.set([imageRef.current, titleRef.current, descRef.current], {
      opacity: 0,
      y: 50,
    });
    gsap.set(imageRef.current, { scale: 1.1 });

    // Scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        toggleActions: "play none none reverse",
      },
      defaults: { ease: "power3.out" },
    });

    tl.to(imageRef.current, { opacity: 1, y: 0, scale: 1, duration: 1 })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .to(descRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");

    // Hover tilt
    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () =>
      gsap.to(card, { z: 50, duration: 0.5, ease: "power2.out" });

    const handleMouseLeave = () =>
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        z: 0,
        duration: 0.8,
        ease: "power3.out",
      });

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className={`group relative w-full h-[22rem] flex items-center justify-between
                  bg-black rounded-3xl overflow-hidden shadow-lg cursor-pointer
                  transition-shadow duration-500 ${className}`}
    >
      {imageSide === "left" ? (
        <>
          {/* Image */}
          <div
            ref={imageRef}
            className="w-[20rem] h-full overflow-hidden flex-shrink-0"
          >
            <Image
              src={imageSrc}
              alt={title}
              width={320}
              height={352}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & description inline */}
          <div className="flex flex-row items-center gap-8 px-8">
            <h3
              ref={titleRef}
              className="text-4xl font-semibold text-white-900"
            >
              {title}
            </h3>
            {description && (
              <p
                ref={descRef}
                className="text-lg text-black-700 max-w-sm leading-snug"
              >
                {description}
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Text first */}
          <div className="flex flex-row items-center gap-8 px-8">
            <h3
              ref={titleRef}
              className="text-4xl font-semibold text-white-900"
            >
              {title}
            </h3>
            {description && (
              <p
                ref={descRef}
                className="text-lg text-white-700 max-w-sm leading-snug"
              >
                {description}
              </p>
            )}
          </div>

          {/* Image on right */}
          <div
            ref={imageRef}
            className="w-[20rem] h-full overflow-hidden flex-shrink-0"
          >
            <Image
              src={imageSrc}
              alt={title}
              width={320}
              height={352}
              className="w-full h-full object-cover"
            />
          </div>
        </>
      )}
    </div>
  );
}
