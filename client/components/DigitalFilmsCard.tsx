"use client";

import Image from "next/image";

interface DigitalFilmsCardProps {
  id: string;
  title: string;
  imageSrc: string;
  /** Destination when the card is activated (opens in a new tab). */
  href: string;
  className?: string;
}

export default function DigitalFilmsCard({
  id: _id,
  title,
  imageSrc,
  href,
  className = "",
}: DigitalFilmsCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block w-full cursor-pointer overflow-hidden rounded-lg shadow-lg no-underline ${className}`}
      style={{
        aspectRatio: "2/4",
        maxHeight: "420px",
      }}
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 48vw, 14rem"
        />
      </div>

      {/* Overlay with title */}
      {/* <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
        <h3 className="text-white text-2xl md:text-3xl font-bold text-center px-4 drop-shadow-lg">
          {title}
        </h3>
      </div> */}

      {/* Play icon overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="rounded-full bg-white/20 p-6 backdrop-blur-sm">
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
    </a>
  );
}
