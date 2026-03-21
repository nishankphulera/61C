"use client";

import RandomSizedCard from "@/components/RandomSizedCard";

interface Photo {
  id: string;
  imageSrc: string;
  youtubeUrl: string;
  width: number; // Grid column span
  height: number; // Grid row span
}

export default function PhotographySection() {

  // Photography data with varied sizes - HD images
  const photos: Photo[] = [
    {
      id: "p1",
      imageSrc: "https://picsum.photos/1920/3840?random=40",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      width: 2,
      height: 2,
    },
    {
      id: "p2",
      imageSrc: "https://picsum.photos/1920/2880?random=41",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      width: 1,
      height: 1,
    },
    {
      id: "p3",
      imageSrc: "https://picsum.photos/1920/3840?random=42",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      width: 1,
      height: 2,
    },
    {
      id: "p4",
      imageSrc: "https://picsum.photos/3840/1920?random=43",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      width: 2,
      height: 1,
    },
    {
      id: "p5",
      imageSrc: "https://picsum.photos/1920/3840?random=44",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      width: 1,
      height: 2,
    },
    {
      id: "p6",
      imageSrc: "https://picsum.photos/1920/1920?random=45",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      width: 1,
      height: 1,
    },
    {
      id: "p7",
      imageSrc: "https://picsum.photos/3840/3840?random=46",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      width: 2,
      height: 2,
    },
    {
      id: "p8",
      imageSrc: "https://picsum.photos/1920/1920?random=47",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      width: 1,
      height: 1,
    },
    {
      id: "p9",
      imageSrc: "https://picsum.photos/3840/1920?random=48",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      width: 2,
      height: 1,
    },
    {
      id: "p10",
      imageSrc: "https://picsum.photos/1920/3840?random=49",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      width: 1,
      height: 2,
    },
    {
      id: "p11",
      imageSrc: "https://picsum.photos/3840/1920?random=50",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      width: 2,
      height: 1,
    },
    {
      id: "p12",
      imageSrc: "https://picsum.photos/1920/1920?random=51",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      width: 1,
      height: 1,
    },
  ];

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 w-full">
        {/* Left Column - 40% (2/5) */}
        <div className="md:col-span-2">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6">
            Photography
          </h1>
          <p className="text-yellow-200 text-lg md:text-2xl leading-relaxed">
            Capturing moments that tell stories. Our photography work spans
            portraits, landscapes, events, and commercial shoots. Each image
            is crafted with attention to detail, composition, and the unique
            narrative it conveys.
          </p>
        </div>

        {/* Right Column - 60% (3/5) */}
        <div className="md:col-span-3">
          <div
            className="grid gap-4 md:gap-6 w-full"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              gridAutoRows: "200px",
            }}
          >
            {photos.map((photo) => (
              <div
                key={photo.id}
                style={{
                  gridColumn: `span ${photo.width}`,
                  gridRow: `span ${photo.height}`,
                  minHeight: `${photo.height * 200}px`,
                }}
              >
                <RandomSizedCard
                  id={photo.id}
                  imageSrc={photo.imageSrc}
                  youtubeUrl={photo.youtubeUrl}
                  width={photo.width}
                  height={photo.height}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

