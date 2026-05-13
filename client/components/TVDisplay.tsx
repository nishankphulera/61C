"use client";
import Image from "next/image";
import React, { memo, useCallback, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";

const YOUTUBE_VIDEO_ID = "eQRyZE2r7oM";
// youtube-nocookie keeps autoplay/loop/controls behavior identical while trimming the initial cookie/script payload.
// enablejsapi=1 lets us drive mute/unMute via postMessage without reloading the iframe.
const EMBED_SRC = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1`;

const postToYouTube = (
  win: Window,
  func: "mute" | "unMute" | "playVideo",
) => {
  win.postMessage(
    JSON.stringify({ event: "command", func, args: [] }),
    "*",
  );
};

const TVDisplay = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  // Mount the iframe ~200px before the section enters the viewport so playback is ready by the time the TV is on-screen.
  const shouldMountIframe = useInView(wrapperRef, {
    once: true,
    margin: "200px 0px",
  });

  const toggleMute = useCallback(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    const next = !isMuted;
    postToYouTube(win, next ? "mute" : "unMute");
    // After autoplay-muted, browsers require a user gesture before audio plays; the click is that gesture.
    postToYouTube(win, "playVideo");
    setIsMuted(next);
  }, [isMuted]);

  return (
    <div
      ref={wrapperRef}
      className="relative z-40 flex w-full justify-center ps-[max(1rem,env(safe-area-inset-left))] pe-[max(1rem,env(safe-area-inset-right))] md:ps-12 md:pe-12 md:-mt-[min(22vh,12rem)] max-[599px]:-mt-16 max-[399px]:-mt-24"
    >
      {/* Wrapper preserves the TV.png intrinsic aspect ratio (1500x1613); percent-based overlay stays pixel-locked at every size. */}
      <div className="relative inline-flex items-center justify-center w-full max-w-[1100px]">
        <Image
          src="/TV.png"
          alt="Retro TV"
          width={1500}
          height={1613}
          sizes="(min-width: 1100px) 1100px, 100vw"
          className="object-contain z-10 w-full h-auto"
        />

        {/* --- YOUTUBE SCREEN OVERLAY --- */}
        <div
          className="absolute overflow-hidden mix-blend-multiply top-[48%] left-[5%] w-[68%] h-[42%]"
          style={{
            /* Rounded to match the CRT glass corners in the new TV asset. */
            borderRadius: "8% / 6%",
            /* Subtle perspective preserves the drawn TV's slight tilt. */
            transform: "perspective(1200px)",
            transformOrigin: "center center",
          }}
        >
          {shouldMountIframe && (
            <iframe
              ref={iframeRef}
              className="w-full h-full pointer-events-none scale-[1.25]"
              /* Zoom hides YouTube's title bar and "Watch on YouTube" watermark; mute=1 enables autoplay (browsers block unmuted autoplay). */
              src={EMBED_SRC}
              title="YouTube TV Screen"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* --- MUTE/UNMUTE CONTROL ---
            Anchored to percent coordinates so it tracks the screen's bottom-right corner at every size.
            Lives outside the mix-blend wrapper so its colors render normally. */}
        {shouldMountIframe && (
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
