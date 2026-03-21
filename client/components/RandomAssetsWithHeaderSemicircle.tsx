"use client";

import Image from "next/image";
import { useEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";

interface RandomSVGsProps {
  assets: string[];
  count?: number;
  padding?: number;
  safeRadius?: number; // radius of semi-circle area at top
}

export default function RandomSvgWithHeaderSemicircle({
  assets,
  count = 10,
  padding = 20,
  safeRadius = 280, // default radius for header/title safe zone
}: RandomSVGsProps) {
  const baseSize = 260;

  // Track window size client-side only
  const [windowSize, setWindowSize] = useState({ width: 1300, height: 800 });

  useEffect(() => {
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    updateSize(); // initial
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Generate positions only when assets, count, or window size changes
  const positions = useMemo(() => {
    const arr: {
      top: number;
      left: number;
      scale: number;
      asset: string;
    }[] = [];

    const cx = windowSize.width / 2;
    const cy = 0;

    for (let i = 0; i < count; i++) {
      let tries = 0;
      let top = 0;
      let left = 0;
      let scale = 1;
      let asset = assets[0];

      while (tries < 100) {
        top = Math.random() * windowSize.height;
        left = Math.random() * windowSize.width;
        scale = 0.5 + Math.random() * 1;
        asset = assets[Math.floor(Math.random() * assets.length)];

        const radiusNew = (baseSize * scale) / 2;

        // check overlap with existing
        const overlap = arr.some((pos) => {
          const radiusExisting = (baseSize * pos.scale) / 2;
          const dist = Math.hypot(pos.left - left, pos.top - top);
          return dist < radiusNew + radiusExisting + padding;
        });

        // check if inside forbidden top semi-circle
        const distToCenter = Math.hypot(left - cx, top - cy);
        const insideSemiCircle = distToCenter < safeRadius && top < safeRadius;

        if (!overlap && !insideSemiCircle) break;
        tries++;
      }

      arr.push({ top, left, scale, asset });
    }

    return arr;
  }, [assets, count, padding, windowSize, safeRadius]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".floating-asset");

    items.forEach((el) => {
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: "sine.inOut" },
      });

      tl.to(el, {
        y: "+=" + (Math.random() * 40 - 20),
        x: "+=" + (Math.random() * 40 - 20),
        duration: 3 + Math.random() * 2,
      })
        .to(
          el,
          {
            rotation: Math.random() * 360,
            duration: 6 + Math.random() * 4,
            ease: "none",
          },
          0
        )
        .to(
          el,
          {
            scale: "+=" + (Math.random() * 0.3 - 0.15),
            duration: 2 + Math.random() * 1.5,
          },
          "<1"
        );
    });
  }, [positions]);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen z-10 overflow-hidden bg-black"
    >
      {positions.map((item, idx) => (
        <div
          key={idx}
          className="absolute floating-asset"
          style={{
            top: `${item.top}px`,
            left: `${item.left}px`,
            transform: `translate(-50%, -50%) scale(${item.scale})`,
          }}
        >
          <Image
            src={`/${item.asset}.svg`}
            alt={item.asset}
            width={baseSize}
            height={baseSize}
            priority
          />
        </div>
      ))}

      {/* Optional: visualize the safe area for debugging */}
      
    </div>
  );
}
