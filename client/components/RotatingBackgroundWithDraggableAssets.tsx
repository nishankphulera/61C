"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface DraggableAsset {
  id: string;
  x: number;
  y: number;
  asset: string;
  scale: number;
}

interface DraggableAssetsProps {
  assets: string[];
  count?: number;
}

export default function DraggableAssets({
  assets,
  count = 8,
}: DraggableAssetsProps) {
  const [draggableAssets, setDraggableAssets] = useState<DraggableAsset[]>([]);
  const [draggedAsset, setDraggedAsset] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize draggable assets
  useEffect(() => {
    const newAssets: DraggableAsset[] = [];
    
    for (let i = 0; i < count; i++) {
      newAssets.push({
        id: `asset-${i}`,
        x: Math.random() * 80 + 10, // 10% to 90% of container width
        y: Math.random() * 80 + 10, // 10% to 90% of container height
        asset: assets[Math.floor(Math.random() * assets.length)],
        scale: 0.5 + Math.random() * 0.5, // 0.5 to 1.0 scale
      });
    }
    
    setDraggableAssets(newAssets);
  }, [assets, count]);

  // Handle mouse down on draggable asset
  const handleMouseDown = (e: React.MouseEvent, assetId: string) => {
    e.preventDefault();
    setDraggedAsset(assetId);
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const asset = draggableAssets.find(a => a.id === assetId);
    if (!asset) return;
    
    const assetX = (asset.x / 100) * rect.width;
    const assetY = (asset.y / 100) * rect.height;
    
    setDragOffset({
      x: e.clientX - assetX,
      y: e.clientY - assetY,
    });
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedAsset || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newX = ((e.clientX - dragOffset.x) / rect.width) * 100;
    const newY = ((e.clientY - dragOffset.y) / rect.height) * 100;
    
    // Constrain to container bounds
    const constrainedX = Math.max(0, Math.min(100, newX));
    const constrainedY = Math.max(0, Math.min(100, newY));
    
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
        const newX = ((e.clientX - dragOffset.x) / rect.width) * 100;
        const newY = ((e.clientY - dragOffset.y) / rect.height) * 100;
        
        const constrainedX = Math.max(0, Math.min(100, newX));
        const constrainedY = Math.max(0, Math.min(100, newY));
        
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
      className="relative w-full h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Draggable Assets */}
      {draggableAssets.map((asset) => (
        <div
          key={asset.id}
          className={`absolute cursor-grab active:cursor-grabbing select-none ${
            draggedAsset === asset.id ? 'z-50' : 'z-20'
          }`}
          style={{
            left: `${asset.x}%`,
            top: `${asset.y}%`,
            transform: 'translate(-50%, -50%)',
            scale: asset.scale,
          }}
          onMouseDown={(e) => handleMouseDown(e, asset.id)}
        >
          <Image
            src={`/${asset.asset}.svg`}
            alt={asset.asset}
            width={200}
            height={200}
            className="pointer-events-none"
            draggable={false}
            onLoad={() => console.log(`Loaded: ${asset.asset}.svg`)}
            onError={() => console.error(`Failed to load: ${asset.asset}.svg`)}
          />
        </div>
      ))}
    </div>
  );
}
