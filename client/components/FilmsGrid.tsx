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
  // Up to 12 videos for a 3×4 grid (3 rows × 4 columns on md+)
  const displayVideos = videos.slice(0, 12);

  return (
    <section className={`mb-16 mt-10 ${className}`}>
     

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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

