"use client";
import Image from 'next/image';
import React from 'react';

const TVDisplay = () => {
  const YOUTUBE_VIDEO_ID = "eQRyZE2r7oM";

  return (
    <div className="relative z-40 flex w-full justify-center ps-[max(1rem,env(safe-area-inset-left))] pe-[max(1rem,env(safe-area-inset-right))] md:ps-12 md:pe-12 md:-mt-[min(22vh,12rem)] max-[599px]:-mt-16 max-[399px]:-mt-24">
      {/* Wrapper preserves the TV.png intrinsic aspect ratio (1500x1613); percent-based overlay stays pixel-locked at every size. */}
      <div className="relative inline-flex items-center justify-center w-full max-w-[1100px]">
        <Image
          src="/TV.png"
          alt="Retro TV"
          width={1500}
          height={1613}
          className="object-contain z-10 w-full h-auto"
          priority
          quality={100}
        />

        {/* --- YOUTUBE SCREEN OVERLAY --- */}
        <div
          className="absolute overflow-hidden mix-blend-multiply top-[48%] left-[5%] w-[68%] h-[42%]"
          style={{
            /* Rounded to match the CRT glass corners in the new TV asset. */
            borderRadius: '8% / 6%',
            /* Subtle perspective preserves the drawn TV's slight tilt. */
            transform: 'perspective(1200px)',
            transformOrigin: 'center center',
          }}
        >
          <iframe
            className="w-full h-full pointer-events-none scale-[1.25]"
            /* Zoom hides YouTube's title bar and "Watch on YouTube" watermark; mute=1 enables autoplay (browsers block unmuted autoplay). */
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0`}
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
