"use client";

import Image from "next/image";

const FILM_ROLL_SRC = "/horizontal filmroll.png";
const VERTICAL_FILM_ROLL_SRC = "/verticalFilmroll.png";

/**
 * Overlay rectangles for the three transparent frame windows in FilmRollHorizontal.png.
 * Frames are arranged horizontally across the strip; the canister sits on the far right.
 * Coordinates are relative to the full image bounding box.
 */
const FRAME_SLOTS = [
  { top: "28%", left: "12.5%", width: "24.2%", height: "46.5%" },
  { top: "28%", left: "37.3%", width: "24.2%", height: "46.5%" },
  { top: "28%", left: "62.1%", width: "24.2%", height: "46.5%" },
] as const;

/**
 * Overlay rectangles for verticalFilmroll.png for mobile view.
 */
const MOBILE_FRAME_SLOTS = [
  { top: "28.9%", left: "24.0%", width: "54.6%", height: "18.9%" },
  { top: "49.0%", left: "24.0%", width: "54.6%", height: "18.9%" },
  { top: "69.1%", left: "24.0%", width: "54.6%", height: "18.9%" },
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
  const renderFrames = (slots: typeof FRAME_SLOTS | typeof MOBILE_FRAME_SLOTS) => {
    return slots.map((slot, i) => (
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
            className="h-full w-full object-cover object-center scale-[1.02]"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element -- animated GIFs */
          <img
            src={gifs[i]}
            alt={gifAlts[i]}
            className="h-full w-full object-cover object-center scale-[1.02]"
            loading="eager"
            decoding="async"
          />
        )}
      </div>
    ));
  };

  return (
    <div className={`relative w-full ${className} flex items-center justify-center mb-20 mt-20`}>
      {/* Desktop View (Horizontal) */}
      <div className="relative w-[86%] hidden md:block">
        {renderFrames(FRAME_SLOTS)}
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

      {/* Mobile View (Vertical) */}
      <div className="relative h-[100vh] aspect-[822/1330] block md:hidden">
        {renderFrames(MOBILE_FRAME_SLOTS)}
        <Image
          src={VERTICAL_FILM_ROLL_SRC}
          alt={filmAlt}
          width={822}
          height={1330}
          className="relative z-10 h-full w-full select-none pointer-events-none"
          priority
          sizes="100vh"
        />
      </div>
    </div>
  );
}
