"use client";

import React from "react";

const FILM_ROLL_SRC = "/filmRoll.png";

/** Percent-of-container boxes aligned to transparent windows in `filmRoll.png` (square asset). */
const DEFAULT_SLOTS: readonly React.CSSProperties[] = [
  { top: "26%", left: "34.5%", width: "28.9%", height: "20%" },
  { top: "47.25%", left: "34.5%", width: "28.9%", height: "18.75%" },
  { top: "67.125%", left: "34.5%", width: "28.9%", height: "19.25%" },
];

export interface FilmRollProps {
  /** Three GIF URLs, top frame → bottom frame. Animated GIFs loop by default in the browser. */
  gifs: readonly [string, string, string];
  className?: string;
  alts?: readonly [string, string, string];
  /** Override frame placement if your asset differs */
  slots?: readonly [React.CSSProperties, React.CSSProperties, React.CSSProperties];
}

export default function FilmRoll({ gifs, className = "", alts, slots }: FilmRollProps) {
  const frameStyles = slots ?? DEFAULT_SLOTS;
  const labels = alts ?? (["Film frame 1", "Film frame 2", "Film frame 3"] as const);

  return (
    <div className={`relative w-full ${className}`.trim()}>
      <div className="pointer-events-none absolute inset-0 z-0">
        {gifs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={labels[i]}
            className="absolute object-cover"
            style={frameStyles[i]}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
      <img
        src={FILM_ROLL_SRC}
        alt=""
        className="relative z-10 block h-auto w-full select-none"
        draggable={false}
        role="presentation"
      />
    </div>
  );
}
