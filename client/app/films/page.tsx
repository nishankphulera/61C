"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import FilmsCard from "@/components/FilmsCard";
import DigitalFilmsCard from "@/components/DigitalFilmsCard";
import FilmsGrid from "@/components/FilmsGrid";
import MusicVideosSection from "@/components/MusicVideosSection";
import BrandMarquee from "@/components/BrandWork";
import Header from "@/components/Header";

export default function FilmsPage() {
  const filmsRef = useRef<HTMLDivElement>(null);
  const digitalFilmsRef = useRef<HTMLDivElement>(null);
  const filmsGridRef = useRef<HTMLDivElement>(null);
  const musicVideosRef = useRef<HTMLDivElement>(null);

  // In view hooks for scroll animations
  const isFilmsInView = useInView(filmsRef, { once: true, amount: 0.2 });
  const isDigitalFilmsInView = useInView(digitalFilmsRef, { once: true, amount: 0.2 });
  const isFilmsGridInView = useInView(filmsGridRef, { once: true, amount: 0.2 });
  const isMusicVideosInView = useInView(musicVideosRef, { once: true, amount: 0.2 });

  // Scroll-based parallax for Digital Films section
  const { scrollYProgress } = useScroll({
    target: digitalFilmsRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect - moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  // Films data - width > height (landscape)
  const films = [
    {
      id: "1",
      title: "The Great Adventure",
      imageSrc: "https://picsum.photos/800/450?random=1",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "2",
      title: "Mystery of the Lost City",
      imageSrc: "https://picsum.photos/800/450?random=2",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "3",
      title: "Space Odyssey 2024",
      imageSrc: "https://picsum.photos/800/450?random=3",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "4",
      title: "Cinematic Masterpiece",
      imageSrc: "https://picsum.photos/800/450?random=4",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  // Additional films for the grid section
  const gridFilms = [
    {
      id: "g1",
      title: "Epic Journey",
      imageSrc: "https://picsum.photos/800/450?random=13",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "g2",
      title: "The Final Frontier",
      imageSrc: "https://picsum.photos/800/450?random=14",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "g3",
      title: "Dark Secrets",
      imageSrc: "https://picsum.photos/800/450?random=15",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "g4",
      title: "Rising Phoenix",
      imageSrc: "https://picsum.photos/800/450?random=16",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "g5",
      title: "Time Traveler",
      imageSrc: "https://picsum.photos/800/450?random=17",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "g6",
      title: "Ocean Depths",
      imageSrc: "https://picsum.photos/800/450?random=18",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "g7",
      title: "Mountain Peak",
      imageSrc: "https://picsum.photos/800/450?random=19",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "g8",
      title: "Desert Storm",
      imageSrc: "https://picsum.photos/800/450?random=20",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "g9",
      title: "City Lights",
      imageSrc: "https://picsum.photos/800/450?random=21",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  // Digital Films data - height > width (portrait)
  const digitalFilms = [
    {
      id: "d1",
      title: "Digital Story 1",
      imageSrc: "https://picsum.photos/400/600?random=5",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "d2",
      title: "Digital Story 2",
      imageSrc: "https://picsum.photos/400/600?random=6",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "d3",
      title: "Digital Story 3",
      imageSrc: "https://picsum.photos/400/600?random=7",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "d4",
      title: "Digital Story 4",
      imageSrc: "https://picsum.photos/400/600?random=8",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "d5",
      title: "Digital Story 5",
      imageSrc: "https://picsum.photos/400/600?random=9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "d6",
      title: "Digital Story 6",
      imageSrc: "https://picsum.photos/400/600?random=10",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "d7",
      title: "Digital Story 7",
      imageSrc: "https://picsum.photos/400/600?random=11",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "d8",
      title: "Digital Story 8",
      imageSrc: "https://picsum.photos/400/600?random=12",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  // Music Videos data
  const musicVideos = [
    {
      id: "mv1",
      imageSrc: "https://picsum.photos/800/450?random=22",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "mv2",
      imageSrc: "https://picsum.photos/800/450?random=23",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "mv3",
      imageSrc: "https://picsum.photos/800/450?random=24",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "mv4",
      imageSrc: "https://picsum.photos/800/450?random=25",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "mv5",
      imageSrc: "https://picsum.photos/800/450?random=26",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "mv6",
      imageSrc: "https://picsum.photos/800/450?random=27",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "mv7",
      imageSrc: "https://picsum.photos/800/450?random=28",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "mv8",
      imageSrc: "https://picsum.photos/800/450?random=29",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "mv9",
      imageSrc: "https://picsum.photos/800/450?random=30",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "mv10",
      imageSrc: "https://picsum.photos/800/450?random=31",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "mv11",
      imageSrc: "https://picsum.photos/800/450?random=32",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "mv12",
      imageSrc: "https://picsum.photos/800/450?random=33",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  return (
    <main className="min-h-screen bg-black w-full">
      <Header />
      
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Films Section - Width > Height */}
        <motion.section
          ref={filmsRef}
          className="mb-16 -mx-4 md:-mx-8 pt-[4.5rem]"
          variants={sectionVariants}
          initial="hidden"
          animate={isFilmsInView ? "visible" : "hidden"}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-12 text-left px-4 md:px-8">
            Films
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2 px-0 justify-items-start">
            {films.map((film) => (
              <FilmsCard
                key={film.id}
                id={film.id}
                title={film.title}
                imageSrc={film.imageSrc}
                youtubeUrl={film.youtubeUrl}
              />
            ))}
          </div>
        </motion.section>

        {/* Digital Films Section - Height > Width */}
        <motion.section
          ref={digitalFilmsRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isDigitalFilmsInView ? "visible" : "hidden"}
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8"
            style={{ y: smoothY }}
          >
            {/* Left Column - 40% (2/5) */}
            <div className="md:col-span-2">
              <h2 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6">
                Digital Films
              </h2>
              <p className="text-yellow-200 text-lg md:text-2xl leading-relaxed">
                More than content creators, we're creative partners equipped to deliver everything from strategy and concept to films, photography, branded design, and scalable content systems.
              </p>
            </div>

            {/* Right Column - 60% (3/5) */}
            <div className="md:col-span-3">
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {digitalFilms.map((film) => (
                  <DigitalFilmsCard
                    key={film.id}
                    id={film.id}
                    title={film.title}
                    imageSrc={film.imageSrc}
                    youtubeUrl={film.youtubeUrl}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Films Grid Section - 3x3 Grid at bottom */}
        <motion.div
          ref={filmsGridRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isFilmsGridInView ? "visible" : "hidden"}
        >
          <FilmsGrid title="More Films" videos={gridFilms} />
        </motion.div>

        {/* Music Videos Section - 4x3 Grid */}
        <motion.div
          ref={musicVideosRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isMusicVideosInView ? "visible" : "hidden"}
        >
          <MusicVideosSection title="Music Videos" videos={musicVideos} />
        </motion.div>


      </div>

    </main>
  );
}
