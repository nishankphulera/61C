// // import Image from "next/image";
// // import React from "react";

// // interface PositionProps {
// //   top?: string;
// //   bottom?: string;
// //   left?: string;
// //   right?: string;
// // }

// // interface FlyingRibbonProps {
// //   src?: string;
// //   alt?: string;
// //   width?: number;
// //   height?: number;
// //   className?: string;
// //   position?: PositionProps;
// //   rotate?: number;
// // }

// // const Asset: React.FC<FlyingRibbonProps> = ({
// //   src = "/flyingRibbons.svg",
// //   alt = "Flying Ribbon",
// //   width = 400,
// //   height = 400,
// //   className = "",
// //   position = {},
// //   rotate = 0,
// // }) => {
// //   const { top, bottom, left, right } = position;

// //   return (
// //     <div
// //       className={`absolute z-20 ${className}`}
// //       style={{
// //         top,
// //         bottom,
// //         left,
// //         right,
// //         transform: `rotate(${rotate}deg)`,
// //       }}
// //     >
// //       <Image
// //         src={src}
// //         alt={alt}
// //         width={width}
// //         height={height}
// //         className="w-full h-full drop-shadow-xl"
// //       />
// //     </div>
// //   );
// // };

// // export default Asset;"use client";




// "use client";

// import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// import React, { useRef } from "react";

// interface AssetProps {
//   src?: string;
//   alt?: string;
//   width?: number;
//   height?: number;
//   className?: string;
//   position?: {
//     top?: string | number;
//     bottom?: string | number;
//     left?: string | number;
//     right?: string | number;
//   };
//   rotate?: number;
//   parallax?: number;     // vertical movement multiplier (use negative for upward movement)
//   scaleFactor?: number;  // scaling factor
//   zIndex?: number;
// }

// export default function Asset({
//   src = "/flyingRibbons.svg",
//   alt = "Asset",
//   width = 400,
//   height = 400,
//   className = "",
//   position = {},
//   rotate = 0,
//   parallax = 0.5,
//   scaleFactor = 0,
//   zIndex = 10,
// }: AssetProps) {
//   const ref = useRef<HTMLDivElement>(null);

//   // Track the global viewport scroll
//   const { scrollY } = useScroll();

//   // Transform scrollY directly - parallax is the speed multiplier
//   // This will start from scroll position 0 immediately
//   const y = useTransform(scrollY, (value) => value * parallax);
//   // Use less damping for more immediate response
//   const smoothY = useSpring(y, { stiffness: 200, damping: 20 });

//   // Scale based on scroll position - use a reasonable max scroll
//   const maxScroll = typeof window !== "undefined" ? window.innerHeight * 5 : 5000;
//   const scale = useTransform(scrollY, [0, maxScroll], [1, 1 + scaleFactor]);
//   const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

//   const style: React.CSSProperties & { [key: string]: any } = {
//     position: "absolute",
//     zIndex,
//   };

//   // Add positioning
//   if (position.top !== undefined) {
//     style.top = typeof position.top === "number" ? `${position.top}px` : position.top;
//   }
//   if (position.bottom !== undefined) {
//     style.bottom = typeof position.bottom === "number" ? `${position.bottom}px` : position.bottom;
//   }
//   if (position.left !== undefined) {
//     style.left = typeof position.left === "number" ? `${position.left}px` : position.left;
//   }
//   if (position.right !== undefined) {
//     style.right = typeof position.right === "number" ? `${position.right}px` : position.right;
//   }

//   return (
//     <motion.div
//       ref={ref}
//       className={className}
//       style={{
//         ...style,
//         y: smoothY,
//         scale: smoothScale,
//         rotate,
//       }}
//     >
//       <img
//         src={src}
//         alt={alt}
//         width={width}
//         height={height}
//         className="w-full h-full object-contain pointer-events-none select-none"
//         draggable={false}
//       />
//     </motion.div>
//   );
// }"use client";
"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { useRef } from "react";

// ----------------------
// Type Definitions
// ----------------------
interface PositionProps {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
}

interface AssetProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  position?: PositionProps;
  rotate?: number;
  parallax?: number;
  scaleFactor?: number;
  zIndex?: number;
  scrollContainer?: React.RefObject<HTMLElement | null>;
}

// ----------------------
// Component
// ----------------------
export default function Asset({
  src = "/flyingRibbons.svg",
  alt = "Asset",
  width = 400,
  height = 400,
  className = "",
  position = {},
  rotate = 0,
  parallax = 0.5,
  scaleFactor = 0,
  zIndex = 10,
  scrollContainer,
}: AssetProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll inside the provided container
  const { scrollY } = useScroll({
    container: scrollContainer,
  });
  

  // Parallax movement
  const y = useTransform(scrollY, (value) => value * parallax);
  const smoothY = useSpring(y, { stiffness: 200, damping: 20 });

  // Scaling
  const maxScroll =
    typeof window !== "undefined" ? window.innerHeight * 5 : 5000;

  const scale = useTransform(scrollY, [0, maxScroll], [1, 1 + scaleFactor]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  // Style object
  const style: React.CSSProperties = {
    position: "absolute",
    zIndex,
  };

  // Apply positioning if provided
  if (position.top !== undefined) style.top = position.top;
  if (position.bottom !== undefined) style.bottom = position.bottom;
  if (position.left !== undefined) style.left = position.left;
  if (position.right !== undefined) style.right = position.right;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        y: smoothY,
        scale: smoothScale,
        rotate,
      }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
      />
    </motion.div>
  );
}
