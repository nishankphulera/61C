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
      className={`relative block w-full cursor-pointer overflow-hidden rounded-xl shadow-lg no-underline group ${className}`}
      style={{
        aspectRatio: "9/16",
        maxHeight: "500px",
      }}
    >
      {/* Background Image */}
      <div className="relative h-full w-full overflow-hidden bg-zinc-900">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 48vw, 14rem"
        />
      </div>

      {/* Reel UI Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Top Right: Reel Icon */}
      <div className="absolute top-4 right-4 text-white">
        <svg aria-label="Reels" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
          <path d="M12.441 5.485 10.375 9H7.132l2.066-3.515h3.243ZM15.659 5.485 13.593 9h-3.243l2.066-3.515h3.243ZM18.875 5.485 16.809 9h-3.243l2.066-3.515h3.243ZM5.981 5.485 3.915 9H2.015V7.485h3.966ZM19.25 21.015H4.75a2.753 2.753 0 0 1-2.735-2.75v-7.25h19.97v7.25a2.753 2.753 0 0 1-2.735 2.75ZM2 9.485h19.97v-2a2.753 2.753 0 0 0-2.735-2.75H4.75a2.753 2.753 0 0 0-2.735 2.75v2Z"></path>
        </svg>
      </div>

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
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
        
        {/* Left Side: Profile, Title, Audio */}
        <div className="flex-1 pr-4">
          {/* User Info */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                <Image src="/favicon.ico" alt="61C" width={28} height={28} className="object-cover" />
              </div>
            </div>
            <span className="text-white text-sm font-semibold tracking-tight">61cstudios</span>
            <span className="text-white text-[10px] px-2 py-[2px] rounded border border-white/40 font-medium ml-1">Follow</span>
          </div>
          
          {/* Caption / Title */}
          <p className="text-white text-sm line-clamp-2 mb-3 font-medium">
            {title}
          </p>

          {/* Audio Track */}
          <div className="flex items-center gap-1.5 text-white/90">
            <svg aria-label="Audio" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12">
              <path d="M12 2v20M8 6v12M4 10v4M16 6v12M20 10v4" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
            </svg>
            <span className="text-xs truncate w-32">Original Audio • 61cstudios</span>
          </div>
        </div>

        {/* Right Side: Action Icons */}
        <div className="flex flex-col items-center gap-4 pb-2">
          {/* Like */}
          <div className="flex flex-col items-center gap-1">
            <svg aria-label="Like" fill="currentColor" height="26" role="img" viewBox="0 0 24 24" width="26" className="text-white hover:text-gray-300 transition-colors">
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.14 6.14 0 0 0-4.896 2.387 6.14 6.14 0 0 0-4.896-2.387C3.927 1.904 0 5.678 0 9.122c0 4.27 3.332 6.516 6.332 9.197 2.753 2.457 4.542 4.093 4.914 4.453.284.273.726.273 1.01 0 .372-.36 2.16-1.996 4.914-4.453 3.00-2.681 6.332-4.927 6.332-9.197 0-3.444-3.927-7.218-6.708-7.218Z"></path>
            </svg>
            <span className="text-white text-xs font-medium">1.2K</span>
          </div>
          {/* Comment */}
          <div className="flex flex-col items-center gap-1">
            <svg aria-label="Comment" fill="currentColor" height="26" role="img" viewBox="0 0 24 24" width="26" className="text-white hover:text-gray-300 transition-colors">
              <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
            <span className="text-white text-xs font-medium">48</span>
          </div>
          {/* Share */}
          <div className="flex flex-col items-center gap-1">
            <svg aria-label="Share" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className="text-white hover:text-gray-300 transition-colors">
              <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
              <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
            </svg>
          </div>
          {/* More */}
          <div className="flex flex-col items-center gap-1 mt-1">
            <svg aria-label="More" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className="text-white hover:text-gray-300 transition-colors">
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="6" cy="12" r="1.5"></circle>
              <circle cx="18" cy="12" r="1.5"></circle>
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}
