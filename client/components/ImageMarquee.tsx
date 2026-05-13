"use client";

import React from "react";
import Image from "next/image";

interface ImageItem {
  src: string;
  alt: string;
}

interface ImageMarqueeProps {
  /** Array of image objects to display */
  images?: ImageItem[];
  /** Section heading text */
  title?: string;
  /** Fixed width/height for each image in px */
  imageSize?: number;
  /** Number of rows to split images into */
  rows?: number;
  /**
   * Horizontal pixels travelled per pixel of vertical scroll.
   * Matches the previous 6000 / 10000 mapping by default.
   */
  speed?: number;
  /**
   * How many times to repeat each row to keep tiles on-screen as we translate.
   * Must be large enough that `rowWidth >= viewportWidth + maxOffset`.
   */
  repeat?: number;
  /**
   * Smoothing factor (0..1). Higher = snappier, lower = floatier.
   * Frame-rate independent — internally normalised against a 60fps baseline.
   * 0.18 ≈ pleasantly smooth glide.
   */
  smoothing?: number;
}

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const defaultImages: ImageItem[] = Array.from({ length: 28 }, (_, i) => ({
  src: `/${i + 1}.png`,
  alt: `Work ${i + 1}`,
}));

const DiamondSeparator = React.memo(function DiamondSeparator() {
  return (
    <div
      className="flex items-center justify-center shrink-0 px-2"
      aria-hidden="true"
    >
      <div className="w-2 h-2 bg-white/30 rotate-45" />
    </div>
  );
});

interface ImageRowProps {
  row: ImageItem[];
  imageSize: number;
  repeat: number;
  innerRef: (el: HTMLDivElement | null) => void;
}

const ImageRow = React.memo(function ImageRow({
  row,
  imageSize,
  repeat,
  innerRef,
}: ImageRowProps) {
  const repeatedRow = React.useMemo(
    () => Array.from({ length: repeat }, () => row).flat(),
    [row, repeat]
  );

  return (
    <div
      ref={innerRef}
      className="flex items-center space-x-4 md:space-x-8 w-max will-change-transform"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        // Promote each row to its own compositor layer so transform updates
        // never trigger layout/paint — only a cheap GPU composite.
        contain: "layout paint",
      }}
    >
      {repeatedRow.map((item, idx) => (
        <React.Fragment key={`${item.alt}-${idx}`}>
          <div className="flex-shrink-0 relative group cursor-pointer w-[var(--marquee-img)] h-[var(--marquee-img)]">
            <Image
              src={item.src}
              alt={item.alt}
              width={imageSize}
              height={imageSize}
              sizes="(min-width: 768px) 140px, 72px"
              loading="lazy"
              decoding="async"
              draggable={false}
              className="w-full h-full object-contain select-none
                         group-hover:scale-110 group-hover:drop-shadow-[0_8px_24px_rgba(255,255,255,0.15)]
                         transition-transform duration-300 ease-out"
            />
          </div>
          <DiamondSeparator />
        </React.Fragment>
      ))}
    </div>
  );
});

const ImageMarquee: React.FC<ImageMarqueeProps> = ({
  images,
  title = "Our Work",
  imageSize = 120,
  rows = 5,
  speed = 0.6,
  repeat = 4,
  smoothing = 0.18,
}) => {
  const items = images || defaultImages;
  const itemsPerRow = Math.ceil(items.length / rows);
  const imageRows = React.useMemo(
    () => chunkArray(items, itemsPerRow),
    [items, itemsPerRow]
  );

  console.log("imageRows",imageRows);

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const rowRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const directionsRef = React.useRef<number[]>([]);

  // Stable per-row directions, regenerated only when row count changes.
  React.useEffect(() => {
    directionsRef.current = Array.from({ length: imageRows.length }, (_, i) =>
      // Deterministic fallback alternation, randomised once on mount.
      Math.random() < 0.5 ? 1 : i % 2 === 0 ? -1 : 1
    );
  }, [imageRows.length]);

  // Continuous rAF loop with frame-rate-independent interpolation.
  // The DOM transform eases toward a scroll-driven target each frame instead
  // of snapping to it, which absorbs irregular scroll deltas (wheel inertia,
  // touch flicks, trackpad momentum) and produces visibly smooth motion.
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rafId = 0;
    let running = false;
    let isVisible = true;
    let target = window.scrollY * speed;
    let current = target;
    let lastWritten = NaN;
    let lastTs = 0;

    const writeTransforms = (offset: number) => {
      const refs = rowRefs.current;
      const dirs = directionsRef.current;
      for (let i = 0; i < refs.length; i++) {
        const el = refs[i];
        if (!el) continue;
        const dir = dirs[i] ?? (i % 2 === 0 ? -1 : 1);
        el.style.transform = `translate3d(${dir * offset}px, 0, 0)`;
      }
    };

    const tick = (ts: number) => {
      if (!running) return;

      const dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 1 / 60;
      lastTs = ts;

      // Frame-rate-independent exponential smoothing.
      // `smoothing` is the per-60fps-frame lerp; rescale for actual dt.
      const k = 1 - Math.pow(1 - smoothing, dt * 60);
      current += (target - current) * k;

      // Snap when we're within sub-pixel range to avoid drifting forever.
      if (Math.abs(target - current) < 0.05) {
        current = target;
      }

      if (Math.abs(current - lastWritten) >= 0.1 || Number.isNaN(lastWritten)) {
        writeTransforms(current);
        lastWritten = current;
      }

      // Park the loop once we've fully caught up — saves battery while idle.
      if (current === target) {
        running = false;
        rafId = 0;
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || !isVisible) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = window.scrollY * speed;
      if (prefersReducedMotion) {
        // Honour user preference: jump directly, no animation.
        current = target;
        writeTransforms(current);
        lastWritten = current;
        return;
      }
      start();
    };

    const onResize = () => {
      target = window.scrollY * speed;
      start();
    };

    // Pause work entirely when the marquee is off-screen.
    let observer: IntersectionObserver | null = null;
    if (sectionRef.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            isVisible = entry.isIntersecting;
          }
          if (isVisible) start();
        },
        { rootMargin: "200px 0px" }
      );
      observer.observe(sectionRef.current);
    }

    writeTransforms(current);
    lastWritten = current;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
      running = false;
      observer?.disconnect();
    };
  }, [imageRows.length, speed, smoothing]);

  const setRowRef = React.useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      rowRefs.current[index] = el;
    },
    []
  );

  return (
    <section
      ref={sectionRef}
      className="[--marquee-img:72px] md:[--marquee-img:140px] py-12 md:py-20 bg-[#050505] relative w-full overflow-hidden flex flex-col items-center justify-center z-10"
      style={{ contain: "layout paint style" }}
    >
      <h2 className="sr-only">{title}</h2>
      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-[10] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Scrolling image rows */}
      <div className="space-y-4 md:space-y-8 relative z-10 w-full flex flex-col items-center overflow-x-visible">
        {imageRows.map((row, rowIndex) => (
          <ImageRow
            key={rowIndex}
            innerRef={setRowRef(rowIndex)}
            row={row}
            imageSize={imageSize}
            repeat={repeat}
          />
        ))}
      </div>

      {/* Edge fade masks */}
      <div className="absolute top-0 left-0 w-[15%] max-w-[150px] h-full bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-[15%] max-w-[150px] h-full bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default ImageMarquee;
