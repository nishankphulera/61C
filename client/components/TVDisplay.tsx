"use client";
import Image from "next/image";
import React, { memo, useCallback, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";

const TVDisplay = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Mount the video ~200px before the section enters the viewport so playback is ready by the time the TV is on-screen.
  const shouldMountVideo = useInView(wrapperRef, {
    once: true,
    margin: "200px 0px",
  });

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !isMuted;
    video.muted = next;
    setIsMuted(next);
  }, [isMuted]);

  return (
    <div
      ref={wrapperRef}
      className="relative z-40 flex w-full justify-center ps-[max(1rem,env(safe-area-inset-left))] pe-[max(1rem,env(safe-area-inset-right))] md:ps-12 md:pe-12 md:-mt-[min(22vh,12rem)] max-[599px]:-mt-16 max-[399px]:-mt-24"
    >
      {/* Wrapper preserves the TV.png intrinsic aspect ratio (1500x1613); percent-based overlay stays pixel-locked at every size. */}
      <div className="relative inline-flex items-center justify-center w-[100%] h-[100%] ">
        <Image
          src="/tvstretchedfinal.png"
          alt="Retro TV"
          width={1500}
          height={1613}
          sizes="(min-width: 1200px) 1100px, 100vw"
          className="object-contain z-10 w-full h-auto"
        />

        {/* --- VIDEO SCREEN OVERLAY --- */}
        <div
          className="absolute overflow-hidden mix-blend-multiply top-[36.5%] left-[6%] w-[72%] h-[56%]"
          style={{
            /* Rounded to match the CRT glass corners in the new TV asset. */
            borderRadius: "8% / 6%",
            /* Subtle perspective preserves the drawn TV's slight tilt. */
            transform: "perspective(1200px)",
            transformOrigin: "center center",
          }}
        >
          {shouldMountVideo && (
            <video
              ref={videoRef}
              className="w-full h-full pointer-events-none object-cover"
              src="/tvShowreel.mp4"
              autoPlay
              muted={isMuted}
              loop
              playsInline
            />
          )}
        </div>

        {/* --- MUTE/UNMUTE CONTROL ---
            Anchored to percent coordinates so it tracks the screen's bottom-right corner at every size.
            Lives outside the mix-blend wrapper so its colors render normally. */}
        {shouldMountVideo && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            aria-pressed={!isMuted}
            className="absolute z-30 bottom-[12%] right-[29%] inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm shadow-lg ring-1 ring-white/15 transition-colors hover:bg-black/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            ) : (
              <SpeakerWaveIcon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(TVDisplay);
