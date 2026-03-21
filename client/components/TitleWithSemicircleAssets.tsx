"use client";

import Image from "next/image";
import TV from "./TV";

export default function TitleWithSemicircleAssets() {

  // Select 8 interesting assets for the semicircle
  const assets = [
    "dancingBurger",
    "directorsCut",
    "flippingBowl",
    "flyingRibbons",
   "fork",
    "frogShoes",
    "harddiskToaster",

  ];

  // Calculate positions for assets in a semicircle below the title
  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 300 : 400; // Smaller radius on mobile
  const centerX = 50; // Percentage from left
  const centerY = typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 0; // Adjusted for mobile
  
  const assetPositions = assets.map((_, index) => {
    // Calculate angle for downward semicircle (0 to π)
    const angle = (index * Math.PI) / (assets.length - 1); // 0 to π
    
    // Convert to percentage positions
    const x = centerX + (radius * Math.cos(angle)) / 10; // Divide by 10 to scale to percentage
    const y = centerY + (radius * Math.sin(angle)) / 10; // Add because Y increases downward
    
    return {
      x: Math.max(5, Math.min(95, x)), // Clamp between 5% and 95%
      y: Math.max(5, Math.min(95, y)), // Clamp between 5% and 95%
      angle: (angle * 180) / Math.PI // Convert to degrees for rotation
    };
  });

  return (
    <div className="relative w-screen h-[180vh] flex items-center justify-center bg-black overflow-hidden">
      {/* Title */}
      <div className="absolute top-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white text-center tracking-wider px-4">
          61C studios
        </h1>
      </div>

      {/* Assets in semicircle */}
      {assets.map((asset, index) => (
        <div
          key={asset}
          className="absolute transition-transform duration-300 hover:scale-110"
          style={{
            left: `${assetPositions[index].x}%`,
            top: `${assetPositions[index].y}%`,
            transform: `translate(-50%, -50%) rotate(${assetPositions[index].angle}deg)`,
          }}
        >
          <Image
            src={`/${asset}.svg`}
            alt={asset}
            width={450}
            height={450}
            className="object-contain"
            style={{
              width: typeof window !== 'undefined' && window.innerWidth < 768 ? '300px' : '450px',
              height: typeof window !== 'undefined' && window.innerWidth < 768 ? '300px' : '450px',
              objectFit: 'contain'
            }}
          />
        </div>
      ))}

      {/* TV Component positioned below the semicircle */}
      <div style={{marginTop:200}}>
      <TV />
      </div>
    </div>
  );
}
