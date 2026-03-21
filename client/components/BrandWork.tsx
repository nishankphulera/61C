"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const brands = [
  "Google", "Amazon", "Microsoft", "Apple", "Netflix", "Adobe",
  "Spotify", "Slack", "Meta", "Tesla", "Intel", "Coca-Cola",
  "Samsung", "IBM", "Zoom", "Oracle", "HP", "Asus", "Dell",
  "Uber", "Airbnb",
];

// Splits the array into chunks to precisely control the number of rows
const chunkArray = (arr: string[], size: number) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

// We want exactly 7 rows (as seen on the Supari Studios reference)
// 21 brands / 7 rows = 3 brands per row
const brandsPerRow = Math.ceil(brands.length / 7);
const brandRows = chunkArray(brands, brandsPerRow);

interface RowProps {
  row: string[];
  direction: number;
  index: number;
}

const LightningSeparator = () => (
  <div className="flex items-center justify-center shrink-0">
    <svg 
      className="w-10 h-10 sm:w-12 sm:h-12 text-white/90" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  </div>
);

const MarqueeRow: React.FC<RowProps> = ({ row, direction, index }) => {
  // Use global scrollY. It never fails to attach, avoids IntersectionObserver edge cases, 
  // and works consistently regardless of page height or absolute positioning.
  const { scrollY } = useScroll();
  
  const smoothY = useSpring(scrollY, {
    damping: 30,
    stiffness: 80,
  });

  // By using precise arrays instead of a transformer function, we avoid any stale closure 
  // bugs when 'direction' state updates from the randomizer.
  // We use a high multiplier (1.5x speed) so even a tiny scroll produces highly visible lateral movement!
  const x = useTransform(smoothY, [0, 10000], [0, direction * 15000]);

  // We heavily duplicate the content since a row of 3 brands is very short.
  // Multiplying by 25 ensures it easily stretches off-screen in both directions
  // even under extreme scrolling.
  const repeatedRow = Array(25).fill(row).flat();

  return (
    <motion.div
      className="flex items-center space-x-6 sm:space-x-8 w-max will-change-transform"
      style={{ x }}
    >
      {repeatedRow.map((brand, brandIndex) => (
        <React.Fragment key={`${brand}-${brandIndex}`}>
          {/* Brand Name Text: Bright White, Bold, Tightly Packed, Hovers Red violently */}
          <div className="flex flex-col items-center justify-center min-w-max cursor-crosshair">
            <span 
              className="text-5xl sm:text-7xl font-black text-white hover:text-[#FF0000] transition-colors duration-200 uppercase tracking-tighter leading-none"
            >
              {brand}
            </span>
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
    // Generate a strictly random array of 1 or -1 for each row
    const randomDirs = Array.from({ length: brandRows.length }, () =>
      Math.random() < 0.5 ? 1 : -1
    );
    setRowDirections(randomDirs);
  }, []);

  // Use a fallback deterministic array for the server-side render to prevent hydration mismatches
  const safeDirections = rowDirections.length > 0 ? rowDirections : [-1, 1, -1, 1, -1, 1, -1];

  return (
    <section className="py-24 bg-[#050505] relative w-full overflow-hidden flex flex-col items-center justify-center selection:bg-red-500 selection:text-white border-y border-white/5">
      {/* Background grain noise overlay matching reference aesthetics (optional) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

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
            index={rowIndex}
          />
        ))}
      </div>

      {/* Supari 15% Edge Fade Mask */}
      <div className="absolute top-0 left-0 w-[15%] max-w-[150px] h-full bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-[15%] max-w-[150px] h-full bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default BrandMarquee;