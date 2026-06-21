"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { fetchPublicContent } from "@/lib/api";
import { compareContentByOrder, ContentItem } from "@/lib/content";
import Image from "next/image";
import { normalizeGalleryImageUrl } from "@/lib/mediaUrls";

export default function DesignPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchPublicContent({ page: "design" })
      .then((rows) => setItems([...rows].sort(compareContentByOrder)))
      .catch(() => setItems([]));
  }, []);

  const albumArts = items.filter(i => i.section === "album-art");
  const animations = items.filter(i => i.section === "animation");
  const illustrations = items.filter(i => i.section === "illustration");

  return (
    <div className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/designshowreel.mp4" type="video/mp4" />
          </video>
        </div>


      </section>

      <main className="w-full px-6 md:px-10 py-16">

        {/* Philosophy Statement */}
        <section className="my-16 md:my-24 w-full max-w-[1400px]">
          <p className="text-yellow-400 text-lg md:text-2xl lg:text-[1.9rem] xl:text-[2rem] leading-[1.3] md:leading-[1.3] font-medium tracking-wide">
            At 61C Studios, design is an extension of expression and storytelling. It is not treated as a
            supporting function to grab attention. Every visual ecosystem we create begins with
            emotion and is led by context. It enhances the narrative, making it impressionable and
            truly influential. Whether it&apos;s an album cover, animation, illustration, or brand identity &
            assets, we craft designs that feel distinctive, culturally relevant and creatively stimulating.
          </p>
        </section>

        {/* ALBUM ART */}
        <section className="my-24 md:my-32">
          <h2 className="text-[#FF00FF] text-4xl md:text-5xl font-bold tracking-tighter mb-8 md:mb-12 uppercase">
            ALBUM ART
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {albumArts.map((item) => {
              const imgSrc = item.thumbnailUrl ? normalizeGalleryImageUrl(item.thumbnailUrl) : (item.images?.[0] || "");
              return (
                <div 
                  key={item._id} 
                  className="relative aspect-square w-full overflow-hidden bg-white/5 hover:scale-[1.02] transition-transform duration-300 rounded-sm cursor-pointer"
                  onClick={() => imgSrc && setExpandedImage(imgSrc)}
                >
                  {imgSrc && (
                    <Image src={imgSrc} alt={item.title} fill className="object-cover" unoptimized />
                  )}
                </div>
              );
            })}
            {albumArts.length === 0 && (
              <p className="col-span-full text-white/50 text-lg">No album art available yet.</p>
            )}
          </div>
        </section>

        {/* ANIMATION */}
        <section className="my-24 md:my-32">
          <h2 className="text-[#FF00FF] text-4xl md:text-5xl font-bold tracking-tighter mb-8 md:mb-12 uppercase">
            ANIMATION
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {animations.map((item) => {
              const imgSrc = item.thumbnailUrl ? normalizeGalleryImageUrl(item.thumbnailUrl) : (item.images?.[0] || "");
              return (
                <div 
                  key={item._id} 
                  className="relative aspect-[16/9] w-full overflow-hidden bg-white/5 hover:scale-[1.02] transition-transform duration-300 rounded-sm cursor-pointer"
                  onClick={() => imgSrc && setExpandedImage(imgSrc)}
                >
                  {imgSrc && (
                    <Image src={imgSrc} alt={item.title} fill className="object-cover" unoptimized />
                  )}
                </div>
              );
            })}
            {animations.length === 0 && (
              <p className="col-span-full text-white/50 text-lg">No animations available yet.</p>
            )}
          </div>
        </section>

        {/* ILLUSTRATION */}
        <section className="my-24 md:my-32">
          <h2 className="text-[#FF00FF] text-4xl md:text-5xl font-bold tracking-tighter mb-8 md:mb-12 uppercase">
            ILLUSTRATION
          </h2>
          <div className="flex flex-col gap-4 md:gap-6">
            {(() => {
              const SQUARE_IMAGES = [
                "/illustrations1.png",
                "/illustrations2.jpg",
                "/illustrations3.jpg",
                "/illustrations4.jpg",
                "/illustrations5.jpg",
                "/illustrations6.jpg",
                "/illustration7.jpg",
                "/illustrations8.jpg",
              ];

              const WIDE_IMAGES = [
                "/illustrationwide1.jpg",
                "/illustrationwide2.png",
                "/illustrationwid3.jpg",
                "/illustrationwide4.png",
                "/illustrationwide5.png",
                "/illustrationwid6.jpg",
                "/illustrationwide7.jpg",
                "/illustrationwide8.png",
              ];

              let sqIdx = 0;
              let rectIdx = 0;
              const dummyItems = Array.from({ length: 16 }).map((_, i) => {
                const rowIndex = Math.floor(i / 4);
                const colIndex = i % 4;
                const isSquare = (rowIndex % 2 === 0) ? (colIndex % 2 === 0) : (colIndex % 2 !== 0);
                const src = isSquare ? SQUARE_IMAGES[sqIdx++] : WIDE_IMAGES[rectIdx++];

                return {
                  id: `dummy-${i}`,
                  src,
                  title: `illustration  ${i + 1}`,
                };
              });

              const displayItems = illustrations.length > 0
                ? illustrations.map(item => ({
                  id: item._id,
                  src: item.thumbnailUrl ? normalizeGalleryImageUrl(item.thumbnailUrl) : (item.images?.[0] || ""),
                  title: item.title,
                }))
                : dummyItems;

              const rows = [];
              for (let i = 0; i < displayItems.length; i += 4) {
                rows.push(displayItems.slice(i, i + 4));
              }

              return rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-col md:flex-row gap-4 md:gap-6 h-auto md:h-40 lg:h-56">
                  {row.map((item, colIndex) => {
                    // Even rows: Square, Rect, Square, Rect
                    // Odd rows: Rect, Square, Rect, Square
                    const isSquare = (rowIndex % 2 === 0) ? (colIndex % 2 === 0) : (colIndex % 2 !== 0);
                    const src = item.src;
                    return (
                      <div
                        key={item.id}
                        className={`relative overflow-hidden rounded-sm group bg-white/5 cursor-pointer ${isSquare ? "w-full md:w-auto md:aspect-square shrink-0" : "w-full md:flex-1"}`}
                        onClick={() => src && setExpandedImage(src)}
                      >
                        {src && (
                          <img
                            src={src}
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300 block"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ));
            })()}

          </div>
        </section>

      </main>

      {/* Lightbox Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 cursor-pointer backdrop-blur-sm"
          onClick={() => setExpandedImage(null)}
        >
          <img
            src={expandedImage}
            alt="Expanded view"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}

    </div>
  );
}
