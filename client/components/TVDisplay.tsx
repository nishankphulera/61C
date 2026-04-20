"use client";
import Image from 'next/image';
import React from 'react';

const TVDisplay = () => {
  // Replace this with your actual YouTube Video ID
  const YOUTUBE_VIDEO_ID = "I6cyvvQhNko";

  return (
    <div className="relative z-40 flex w-full justify-center ps-[max(1rem,env(safe-area-inset-left))] pe-[max(1rem,env(safe-area-inset-right))] md:ps-12 md:pe-12 md:-mt-[min(22vh,12rem)] max-[599px]:-mt-16 max-[399px]:-mt-24">
      {/* In-flow height follows the TV image; -mt overlaps the hero. */}
      <div className="relative inline-flex items-center justify-center w-full max-w-[1200px]">
        <Image
          src="/TV.png"
          alt="Retro TV"
          width={1920}
          height={1080}
          className="object-contain z-10 w-full max-sm:h-auto max-sm:max-h-[min(70dvh,520px)] sm:h-[1100]"
          priority
          quality={100}
        />

        {/* --- YOUTUBE SCREEN OVERLAY --- */}
        <div
          className="tv-youtube-screen-short-vh absolute overflow-hidden mix-blend-multiply top-[42.5%] left-[11%] w-[61%] h-[50%] max-[1219px]:top-[41.8%] max-[1219px]:h-[51.8%] max-[999px]:top-[36.8%] max-[999px]:h-[52.5%] max-[749px]:top-[42%] max-[749px]:h-[53%] max-[399px]:top-[38.5%] max-[399px]:h-[35%] max-[500px]:top-[40.5%] max-[500px]:h-[35%]"
          style={{
            /* 1. Positioning: Maps the video bounds to the White CRT screen area in TV.png */
            /* At <=1219px, slightly increase screen height to avoid bottom clipping. */
            /* Below 1000px / 750px / short viewport: nudge top up — scaling shifts the CRT read. */

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