"use client";
import Image from 'next/image';
import React from 'react';

const TVDisplay = () => {
  // Replace this with your actual YouTube Video ID
  const YOUTUBE_VIDEO_ID = "eQRyZE2r7oM";

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 md:top-[-20%] flex items-center justify-center w-full z-40 px-4 md:px-12">
      {/* We use inline-flex to ensure the relative container perfectly hugs the Image's aspect ratio.
          This makes the % based absolute positioning of the video scale flawlessly across responsive sizes! */}
      <div className="relative inline-flex items-center justify-center w-full max-w-[1200px]">
        <Image
          src="/TV.png"
          alt="Retro TV"
          width={1920}
          height={1080}
          className="object-contain w-full h-auto z-10"
          priority
          quality={100}
        />

        {/* --- YOUTUBE SCREEN OVERLAY --- */}
        <div
          className="absolute overflow-hidden mix-blend-multiply"
          style={{
            /* 1. Positioning: Maps the video bounds to the White CRT screen area in TV.png */
            top: '42.5%',
            left: '9%',
            width: '61%',
            height: '50%',

            /* 2. Rounding: Curves the corners similar to the old glass screen */
            borderRadius: '12% / 10%',

            /* 3. Slant/Perspective: The drawn TV is naturally tilted! This perfectly aligns the straight video into the same 3D space */
            transform: 'perspective(1200px)',
            transformOrigin: 'center center'
          }}
        >
          <iframe

            className="w-full h-full pointer-events-none scale-[1.1]"
            /* The scale-[1.1] slightly zooms the youtube video in to hide the black bars/edges or title overlays safely */
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1`}
            title="YouTube TV Screen"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default TVDisplay;