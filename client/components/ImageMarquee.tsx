"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

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
}

// Splits the array into chunks
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

interface ImageRowProps {
  row: ImageItem[];
  direction: number;
  /** Intrinsic size for next/image; tile box uses CSS var --marquee-img on section */
  imageSize: number;
}

const DiamondSeparator = () => (
  <div className="flex items-center justify-center shrink-0 px-2">
    <div className="w-2 h-2 bg-white/30 rotate-45" />
  </div>
);

const ImageRow: React.FC<ImageRowProps> = ({ row, direction, imageSize }) => {
  const { scrollY } = useScroll();

  const smoothY = useSpring(scrollY, {
    damping: 30,
    stiffness: 80,
  });

  const x = useTransform(smoothY, [0, 10000], [0, direction * 12000]);

  // Duplicate heavily to fill the screen in both scroll directions
  const repeatedRow = Array(20).fill(row).flat();

  return (
    <motion.div
      className="flex items-center space-x-4 md:space-x-8 w-max will-change-transform"
      style={{ x }}
    >
      {repeatedRow.map((item, idx) => (
        <React.Fragment key={`${item.alt}-${idx}`}>
          <div className="flex-shrink-0 relative group cursor-pointer w-[var(--marquee-img)] h-[var(--marquee-img)]">
            <Image
              src={item.src}
              alt={item.alt}
              width={imageSize}
              height={imageSize}
              className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(255,255,255,0.08)] 
                         group-hover:scale-110 group-hover:drop-shadow-[0_8px_24px_rgba(255,255,255,0.15)] 
                         transition-all duration-300 ease-out"
            />
          </div>
          <DiamondSeparator />
        </React.Fragment>
      ))}
    </motion.div>
  );
};

const ImageMarquee: React.FC<ImageMarqueeProps> = ({
  images,
  title = "Our Work",
  imageSize = 120,
  rows = 5,
}) => {
  const items = images || defaultImages;
  const itemsPerRow = Math.ceil(items.length / rows);
  const imageRows = chunkArray(items, itemsPerRow);

  const [rowDirections, setRowDirections] = React.useState<number[]>([]);

  React.useEffect(() => {
    const randomDirs = Array.from({ length: imageRows.length }, () =>
      Math.random() < 0.5 ? 1 : -1
    );
    setRowDirections(randomDirs);
  }, [imageRows.length]);

  const safeDirections =
    rowDirections.length > 0
      ? rowDirections
      : Array.from({ length: rows }, (_, i) => (i % 2 === 0 ? -1 : 1));

  return (
    <section className="[--marquee-img:72px] md:[--marquee-img:140px] py-12 md:py-20 bg-[#050505] relative w-full overflow-hidden flex flex-col items-center justify-center border-y border-white/5 z-10">
      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-[10] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Section title */}
      <div className="text-center mb-8 md:mb-14 relative z-10 w-full px-4">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-black text-white tracking-widest uppercase opacity-80"
        >
          {title}
        </motion.h2>
      </div>

      {/* Scrolling image rows */}
      <div className="space-y-4 md:space-y-8 relative z-10 w-full flex flex-col items-center overflow-x-visible">
        {imageRows.map((row, rowIndex) => (
          <ImageRow
            key={rowIndex}
            row={row}
            direction={safeDirections[rowIndex % safeDirections.length]}
            imageSize={imageSize}
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
