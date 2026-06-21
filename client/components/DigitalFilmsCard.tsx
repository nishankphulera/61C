"use client";

import Image from "next/image";

interface DigitalFilmsCardProps {
  id: string;
  title: string;
  imageSrc: string;
  /** Destination when the card is activated (opens in a new tab). */
  href: string;
  className?: string;
  thumbnailUrl?: string;
}

export default function DigitalFilmsCard({
  id: _id,
  title,
  imageSrc,
  href,
  className = "",
  thumbnailUrl,
}: DigitalFilmsCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block w-full cursor-pointer overflow-hidden rounded-xl shadow-lg no-underline group ${className}`}
      style={{
        aspectRatio: "9/16",
        maxHeight: "500px",
      }}
    >
      {/* Background Image */}
      <div className="relative h-full w-full overflow-hidden bg-zinc-900">
        <Image
          src={thumbnailUrl || imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 48vw, 14rem"
        />
      </div>

      {/* Reel UI Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />



      {/* Center Play Icon (appears on hover) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="rounded-full bg-black/40 p-4 backdrop-blur-md">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Bottom Content Area */}

    </a>
  );
}
