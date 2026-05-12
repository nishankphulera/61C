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
  className = "mt-10",
}: FilmsGridProps) {
  // 3×3 grid: nine tiles, three columns from md+
  const displayVideos = videos.slice(0, 9);

  return (
    <section className={`mb-16 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {displayVideos.map((video) => (
          <FilmsCard
            key={video.id}
            id={video.id}
            title={video.title}
            imageSrc={video.imageSrc}
            href={video.youtubeUrl}
          />
        ))}
      </div>
    </section>
  );
}

