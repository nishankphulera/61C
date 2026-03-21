"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";

interface DraggableAsset {
  id: string;
  x: number;
  y: number;
  asset: string;
  scale: number;
}

export default function TVWithRandomAssets() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [draggableAssets, setDraggableAssets] = useState<DraggableAsset[]>([]);
  const [draggedAsset, setDraggedAsset] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const assetsInitialized = useRef(false);

  const assets = [
    "61 key",
    "61cOpener",
    "bottle",
    "cannabiLighter",
    "colorfullPizza",
    "dancingBurger",
    "directorsCut",
    "flippingBowl",
    "flyingRibbons",
    "fork",
    "frogShoes",
    "harddiskToaster",
    "lego",
    "loudspeaker",
    "matchaMachine",
    "TV",
    "weakChair",
  ];


  // Initialize draggable assets only once
  useEffect(() => {
    // Only initialize if we haven't done it yet
    if (assetsInitialized.current) return;
    
    const newAssets: DraggableAsset[] = [];
    const count = 20; // number of assets
    const padding = 20; // minimum distance between assets
    const baseSize = 440; // base size for collision detection

    // Use current window size for initial positioning
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    // TV dimensions and position (center of screen)
    // Based on the HTML: w-[60%] max-w-[700px] aspect-square
    const tvSize = Math.min(currentWidth * 0.6, 700); // 60% of screen width, max 700px
    const tvLeft = (currentWidth - tvSize) / 2;
    const tvTop = (currentHeight - tvSize) / 2;
    const tvRight = tvLeft + tvSize;
    const tvBottom = tvTop + tvSize;

    // Add larger buffer around TV to keep assets away from TV boundary
    const tvBuffer = 100; // Increased buffer to ensure no overlap

    for (let i = 0; i < count; i++) {
      let tries = 0;
      let top = 0;
      let left = 0;
      let scale = 1;
      let asset = assets[0];

      while (tries < 100) {
        top = Math.random() * currentHeight;
        left = Math.random() * currentWidth;
        scale = 0.5 + Math.random() * 1;
        asset = assets[Math.floor(Math.random() * assets.length)];

        const radiusNew = (baseSize * scale) / 2;

        // Check overlap with existing assets
        const overlap = newAssets.some((pos) => {
          const radiusExisting = (baseSize * pos.scale) / 2;
          const dist = Math.hypot(pos.x - left, pos.y - top);
          return dist < radiusNew + radiusExisting + padding;
        });

        // Check if inside TV area (with buffer) - assets should NOT touch TV
        const insideTV = 
          left > tvLeft - tvBuffer &&
          left < tvRight + tvBuffer &&
          top > tvTop - tvBuffer &&
          top < tvBottom + tvBuffer;


        if (!overlap && !insideTV) break;
        tries++;
      }

      newAssets.push({
        id: `asset-${i}`,
        x: left,
        y: top,
        asset,
        scale,
      });
    }

    setDraggableAssets(newAssets);
    assetsInitialized.current = true;
  }, [assets]);

  // Handle mouse down on draggable asset
  const handleMouseDown = (e: React.MouseEvent, assetId: string) => {
    e.preventDefault();
    setDraggedAsset(assetId);
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const asset = draggableAssets.find(a => a.id === assetId);
    if (!asset) return;
    
    const assetX = asset.x;
    const assetY = asset.y;
    
    setDragOffset({
      x: e.clientX - assetX,
      y: e.clientY - assetY,
    });
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedAsset || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Constrain to container bounds
    const constrainedX = Math.max(0, Math.min(rect.width, newX));
    const constrainedY = Math.max(0, Math.min(rect.height, newY));
    
    setDraggableAssets(prev => 
      prev.map(asset => 
        asset.id === draggedAsset 
          ? { ...asset, x: constrainedX, y: constrainedY }
          : asset
      )
    );
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setDraggedAsset(null);
  };

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (draggedAsset) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        if (!draggedAsset || !containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        const constrainedX = Math.max(0, Math.min(rect.width, newX));
        const constrainedY = Math.max(0, Math.min(rect.height, newY));
        
        setDraggableAssets(prev => 
          prev.map(asset => 
            asset.id === draggedAsset 
              ? { ...asset, x: constrainedX, y: constrainedY }
              : asset
          )
        );
      };

      const handleGlobalMouseUp = () => {
        setDraggedAsset(null);
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [draggedAsset, dragOffset]);


  return (
    <div 
      ref={containerRef} 
      className="relative w-screen h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Draggable Assets around TV */}
      {draggableAssets.map((asset) => (
        <div
          key={asset.id}
          className={`absolute cursor-grab active:cursor-grabbing select-none ${
            draggedAsset === asset.id ? 'z-50' : 'z-20'
          }`}
          style={{
            left: `${asset.x}px`,
            top: `${asset.y}px`,
            transform: 'translate(-50%, -50%)',
            scale: asset.scale,
          }}
          onMouseDown={(e) => handleMouseDown(e, asset.id)}
        >
          <Image
            src={`/${asset.asset}.svg`}
            alt={asset.asset}
            width={130}
            height={130}
            className="pointer-events-none"
            draggable={false}
          />
        </div>
      ))}


      {/* TV Frame */}
      <div className="absolute left-1/2 top-1/2 w-[60%] max-w-[700px] aspect-square -translate-x-1/2 -translate-y-1/2 z-10 bg-grey-900 ">
        <Image
          src="/tv.svg"
          alt="TV Frame"
          fill
          className="object-contain"
          priority
        />

        {/* Video Inside TV */}
        <div className="absolute top-[42%] left-[15%] w-[55%] h-[46%] bg-black z-11 align-center flex justify-center items-center overflow-hidden rounded-md">
          <iframe
            className="w-[90%] h-[85%] rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/iMA9Y7Gziu0?autoplay=1&mute=0&controls=0&rel=0&modestbranding=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setVideoLoaded(true)}
          ></iframe>

          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white text-sm">
              Loading video...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
