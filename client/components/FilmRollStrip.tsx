"use client";

import Image from "next/image";

const FILM_ROLL_SRC = "/FilmRollHorizontalMirror.png";

/**
 * Overlay rectangles for the three transparent frame windows in FilmRollHorizontal.png.
 * Frames are arranged horizontally across the strip; the canister sits on the far right.
 * Coordinates are relative to the full image bounding box.
 */
const FRAME_SLOTS = [
  { top: "16%", left: "16%", width: "23.5%", height: "68%" },
  { top: "16%", left: "44%", width: "23.5%", height: "68%" },
  { top: "16%", left: "69%", width: "23.5%", height: "68%" },
] as const;

export type FilmRollStripProps = {
  /** Public URLs or static paths to three animated GIFs (e.g. `/clip.gif`). GIFs loop by default in the browser. */
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
    <div className={`relative inline-block w-full max-w-full ${className}`}>
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
            {/* eslint-disable-next-line @next/next/no-img-element -- animated GIFs */}
            <img
              src={gifs[i]}
              alt={gifAlts[i]}
              className="h-full w-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
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
