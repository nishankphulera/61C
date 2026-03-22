"use client";

import { useMemo } from "react";

interface AssetConfig {
  src: string;
  x: string;
  y: string;
  rotate: number;
  width: string;
  height: string;
  zIndex?: number;
  mirror?: "horizontal" | "vertical" | "both";
}

interface TitleWithSurroundingAssetsProps {
  title?: string;
  assets?: AssetConfig[];
}

export default function TitleWithSurroundingAssets({
  title,
  assets,
}: TitleWithSurroundingAssetsProps) {
  // Default assets array with positions and sizes
  const defaultAssets: AssetConfig[] = [
    { src: "/Megaphone.png", x: "4%", y: "4%", rotate: 0, width: "500px", height: "500px" },
    {
      src: "/unknown.png", x: "4%", y: "22%", rotate: -20, width: "300px", height: "300px", mirror
        : 'horizontal'
    },
    { src: "/Clapperboard.png", x: "64%", y: "60%", rotate: 0, width: "500px", height: "500px", mirror: "horizontal" },
    { src: "/disk.png", x: "96%", y: "10%", rotate: -30, width: "380px", height: "380px" },
    { src: "/Cassette.png", x: "40%", y: "6%", rotate: -20, width: "360px", height: "360px" },
    { src: "/Vinyl.png", x: "5%", y: "44%", rotate: 0, width: "400px", height: "400px" },
    { src: "/Converse.png", x: "70%", y: "-2%", rotate: -150, width: "400px", height: "400px" },
    { src: "/Pelican Case.png", x: "100%", y: "28%", rotate: 10, width: "400px", height: "400px" },
    { src: "/Lego.png", x: "25%", y: "60%", rotate: 20, width: "640px", height: "640px" },
    { src: "/Chair.png", x: "90%", y: "56%", rotate: 30, width: "700px", height: "700px", mirror: "horizontal" },
  ];

  const assetsToRender = assets || defaultAssets;

  // Calculate the height needed based on asset positions
  const containerHeight = useMemo(() => {
    // Extract all y positions and convert to numbers
    const yValues = assetsToRender.map(asset => {
      const yStr = asset.y.replace('%', '');
      return parseFloat(yStr) || 0;
    });

    // Find min and max y positions
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    // Calculate the largest asset height in pixels
    const maxAssetHeight = Math.max(...assetsToRender.map(asset => {
      const heightStr = asset.height.replace('px', '');
      return parseFloat(heightStr) || 0;
    }));

    // Convert max asset height to viewport percentage (using 1000px as base for calculation)
    const baseViewportHeight = 1000;
    const maxAssetHeightVh = (maxAssetHeight / baseViewportHeight) * 100;

    // Calculate total height needed: range of positions + asset height + padding
    const range = maxY - minY;
    // Add extra space for assets that extend beyond their position (half height above and below)
    const totalHeight = Math.max(100, range + maxAssetHeightVh + 20); // Add 20% padding

    return `${totalHeight}vh`;
  }, [assetsToRender]);

  return (
    <div
      className="relative w-full flex items-center justify-center bg-black overflow-hidden"
      style={{ minHeight: containerHeight, height: containerHeight }}
    >

      {/* Center title */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
        <div className="relative top-[8%] left-[0%] z-50 w-[90rem] md:w-[50rem] lg:w-[50rem]">
          <img src="/61CYellow.png" alt="61C Logo" className="w-full h-auto" />
        </div>
      </div>

      {/* Assets in fixed art-directed positions */}
      {assetsToRender.map((asset, index) => {
        // Build transform string with rotation and mirroring
        const transformParts = [`translate(-50%, -50%)`, `rotate(${asset.rotate}deg)`];

        if (asset.mirror === "horizontal" || asset.mirror === "both") {
          transformParts.push("scaleX(-1)");
        }
        if (asset.mirror === "vertical" || asset.mirror === "both") {
          transformParts.push("scaleY(-1)");
        }

        const transform = transformParts.join(" ");

        return (
          <img
            key={`asset-${index}`}
            src={asset.src}
            alt={`Asset ${index + 1}`}
            className="absolute pointer-events-none select-none object-contain drop-shadow-xl"
            style={{
              left: asset.x,
              top: asset.y,
              transform: transform,
              width: asset.width,
              height: asset.height,
              zIndex: asset.zIndex || (10 + (index % 3)),
            }}
            draggable={false}
          />
        );
      })}
    </div>
  );
}
