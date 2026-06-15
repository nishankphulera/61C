"use client";

import Image from "next/image";

const FILM_ROLL_SRC = "/FilmRollHorizontalMirror.png";

/**
 * Overlay rectangles for the three transparent frame windows in FilmRollHorizontal.png.
 * Frames are arranged horizontally across the strip; the canister sits on the far right.
 * Coordinates are relative to the full image bounding box.
 */
const FRAME_SLOTS = [
  { top: "17%", left: "15.8%", width: "25.5%", height: "66%" },
  { top: "17%", left: "42.8%", width: "25.5%", height: "66%" },
  { top: "17%", left: "68.8%", width: "27.5%", height: "66%" },
] as const;

/** Returns true when the source path/URL looks like a video file. */
function isVideo(src: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(src);
}

export type FilmRollStripProps = {
  /** Public URLs or static paths to three media sources (GIFs or MP4s). */
  gifs: readonly [string, string, string];
  className?: string;
  filmAlt?: string;
  gifAlts?: readonly [string, string, string];
};

export default function FilmRollStrip({
  gifs,
  className = "",
  filmAlt = "Film roll",
  gifAlts = ["Film frame 1", "Film frame 2", "Film frame 3"],
}: FilmRollStripProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative w-full">
        {FRAME_SLOTS.map((slot, i) => (
          <div
            key={i}
            className="absolute z-0 overflow-hidden"
            style={{
              top: slot.top,
              left: slot.left,
              width: slot.width,
              height: slot.height,
            }}
          >
            {isVideo(gifs[i]) ? (
              <video
                src={gifs[i]}
                autoPlay
                loop
                muted
                playsInline
                aria-label={gifAlts[i]}
                className="h-[99%] w-[90%] object-cover object-center"
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element -- animated GIFs */
              <img
                src={gifs[i]}
                alt={gifAlts[i]}
                className="h-full w-full object-cover object-center"
                loading="eager"
                decoding="async"
              />
            )}
          </div>
        ))}

        <Image
          src={FILM_ROLL_SRC}
          alt={filmAlt}
          width={1920}
          height={540}
          className="relative z-10 h-auto w-full select-none pointer-events-none"
          priority
          sizes="100vw"
        />
      </div>
    </div>
  );
}
