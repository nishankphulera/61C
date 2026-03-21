"use client";

import React from "react";
import FilmsCard from "./FilmsCard";

interface Video {
  id: string;
  title: string;
  imageSrc: string;
  youtubeUrl: string;
}

interface FilmsGridProps {
  title: string;
  videos: Video[];
  className?: string;
}

export default function FilmsGrid({
  title,
  videos,
  className = "",
}: FilmsGridProps) {
  // Limit to 9 videos for 3x3 grid
  const displayVideos = videos.slice(0, 9);

  return (
    <section className={`mb-16 mt-50 ${className}`}>
      {/* Title */}
      {/* <h2 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-12 text-left">
        {title}
      </h2> */}

      {/* 3x3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {displayVideos.map((video) => (
          <FilmsCard
            key={video.id}
            id={video.id}
            title={video.title}
            imageSrc={video.imageSrc}
            youtubeUrl={video.youtubeUrl}
          />
        ))}
      </div>
    </section>
  );
}

