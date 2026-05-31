"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

/** Exactly 4 rows × 7.5 logos = 30 assets. */
const ROW_COUNT = 4;
const TOTAL_LOGOS = 30;

type BrandLogo = { src: string; alt: string };

const brandLogos: BrandLogo[] = Array.from({ length: TOTAL_LOGOS }, (_, i) => {
  const num = i + 1;
  return {
    src: num === 29 ? "/29.png" : num === 30 ? "/30.png" : `/brands/${num}.webp`,
    alt: `Brand partner ${num}`,
  };
});

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

const brandsPerRow = Math.ceil(TOTAL_LOGOS / ROW_COUNT);
const brandRows = chunkArray(brandLogos, brandsPerRow);
const DEFAULT_DIRECTIONS = Array.from({ length: ROW_COUNT }, (_, i) =>
  i % 2 === 0 ? -1 : 1
);

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface RowProps {
  row: BrandLogo[];
  direction: number;
}

const LightningSeparator = () => (
  <div className="flex items-center justify-center shrink-0">
    <svg
      className="w-10 h-10 sm:w-12 sm:h-12 text-white/90"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  </div>
);

const MarqueeRow: React.FC<RowProps> = ({ row, direction }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Duplicate the row 4 times. Each copy represents 25% of the total width.
  // We wrap baseX between -25% and 0% to achieve a seamless loop.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  // Base auto-play speed in percentage of container width per second
  const baseVelocity = direction * 2;

  useAnimationFrame((_, delta) => {
    // delta is time since last frame in ms. We convert to seconds for framerate independence.
    let moveBy = baseVelocity * (delta / 1000);

    const scrollVel = velocityFactor.get();
    if (scrollVel !== 0) {
      // Speed up or slow down based on scroll velocity and direction
      moveBy += scrollVel * (delta / 1000) * 15 * direction;
    }

    baseX.set(baseX.get() + moveBy);
  });

  const repeatedRow = [...row, ...row, ...row, ...row];

  return (
    <motion.div
      className="flex items-center gap-4 sm:gap-6 md:gap-8 w-max will-change-transform"
      style={{ x }}
    >
      {repeatedRow.map((logo, brandIndex) => (
        <React.Fragment key={`${logo.src}-${brandIndex}`}>
          <div className="relative h-14 w-32 sm:h-18 sm:w-40 md:h-20 md:w-44 shrink-0 flex items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 30vw, 176px"
            />
          </div>

          <LightningSeparator />
        </React.Fragment>
      ))}
    </motion.div>
  );
};

const BrandMarquee: React.FC = () => {
  const [rowDirections, setRowDirections] = React.useState<number[]>([]);

  React.useEffect(() => {
    const randomDirs = Array.from({ length: ROW_COUNT }, () =>
      Math.random() < 0.5 ? 1 : -1
    );
    setRowDirections(randomDirs);
  }, []);

  const safeDirections =
    rowDirections.length > 0 ? rowDirections : DEFAULT_DIRECTIONS;

  return (
    <section className="py-24 bg-[#050505] relative w-full overflow-hidden flex flex-col items-center justify-center selection:bg-red-500 selection:text-white border-y border-white/5">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-1 mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="text-center mb-16 relative z-10 w-full px-4">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-black text-white tracking-widest uppercase opacity-80"
        >
          Brands That We Work With
        </motion.h2>
      </div>

      <div className="space-y-4 sm:space-y-6 relative z-10 w-full flex flex-col items-center overflow-x-visible">
        {brandRows.map((row, rowIndex) => (
          <MarqueeRow
            key={rowIndex}
            row={row}
            direction={safeDirections[rowIndex % safeDirections.length]}
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 w-[15%] max-w-[150px] h-full bg-linear-to-r from-[#050505] to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-[15%] max-w-[150px] h-full bg-linear-to-l from-[#050505] to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default BrandMarquee;
