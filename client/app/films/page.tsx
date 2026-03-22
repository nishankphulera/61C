"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import FilmsCard from "@/components/FilmsCard";
import DigitalFilmsCard from "@/components/DigitalFilmsCard";
import FilmsGrid from "@/components/FilmsGrid";
import MusicVideosSection from "@/components/MusicVideosSection";
import BrandMarquee from "@/components/BrandWork";
import Header from "@/components/Header";
import FilmRollStrip from "@/components/FilmRollStrip";
import Asset from "@/components/Asset";

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
  const scrollRef = useRef<HTMLDivElement | null>(null);

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
    {
      id: "g10",
      title: "Neon Nights",
      imageSrc: "https://picsum.photos/800/450?random=34",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "g11",
      title: "Coastal Drive",
      imageSrc: "https://picsum.photos/800/450?random=35",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "g12",
      title: "Winter Light",
      imageSrc: "https://picsum.photos/800/450?random=36",
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

  const filmRollGifs = ["/HomePage.gif", "/HomePage.gif", "/HomePage.gif"] as const;

  return (
    <main ref={scrollRef} className="min-h-screen bg-black w-full">
      <Header />
      <Asset reverse={true} scrollContainer={scrollRef} src="/chair.png" className="w-[16rem] md:w-[16rem] opacity-100" parallax={0.2} scaleFactor={0.012} rotate={-10} position={{ top: "3%", right: "-5%" }} zIndex={5} />
      <Asset reverse={false} scrollContainer={scrollRef} src="/Clapperboard.png" className="w-[34rem] md:w-[34rem] opacity-100" parallax={0.2} scaleFactor={0.012} rotate={0} position={{ top: "15%", left: "-6%" }} zIndex={10} />
      <Asset reverse={true} scrollContainer={scrollRef} src="/Megaphone.png" className="w-[34rem] md:w-[34rem] opacity-100" parallax={0.2} scaleFactor={0.012} rotate={30} position={{ top: "35%", right: "-10%" }} zIndex={20} />
      <Asset reverse={false} scrollContainer={scrollRef} src="/Clapperboard.png" className="w-[34rem] md:w-[34rem] opacity-100" parallax={0.2} scaleFactor={0.012} rotate={0} position={{ top: "15%", left: "-6%" }} zIndex={10} />
      <Asset reverse={true} scrollContainer={scrollRef} src="/Megaphone.png" className="w-[34rem] md:w-[34rem] opacity-100" parallax={0.2} scaleFactor={0.012} rotate={30} position={{ top: "35%", right: "-10%" }} zIndex={20} />

      <div className="flex justify-center px-4 pt-8 pb-2 md:pt-8 md:pb-4 ">
        <FilmRollStrip
          gifs={filmRollGifs}
          className="w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl"
          gifAlts={["Films highlight 1", "Films highlight 2", "Films highlight 3"]}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        {/* Films Section - Width > Height */}
        <motion.section
          ref={filmsRef}
          className="relative z-10 mb-16 -mx-6 md:-mx-10 pt-[4.5rem]"
          variants={sectionVariants}
          initial="hidden"
          animate={isFilmsInView ? "visible" : "hidden"}
        >
          <h1 className="text-5xl md:text-6xl text-yellow-400 mb-12 text-left px-0 md:px-0">
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

    

          {/* Music Videos Section — wider breakout than before (-mx-4 md:-mx-8) */}
          <motion.div
          ref={musicVideosRef}
          className="-mx-4 md:-mx-10"
          variants={sectionVariants}
          initial="hidden"
          animate={isMusicVideosInView ? "visible" : "hidden"}
        >
          <MusicVideosSection title="Music Videos" videos={musicVideos} />
        </motion.div>

        {/* Digital Films Section — wider breakout past container padding */}
        <motion.section
          ref={digitalFilmsRef}
          className="-mx-5 md:-mx-9"
          variants={sectionVariants}
          initial="hidden"
          animate={isDigitalFilmsInView ? "visible" : "hidden"}
        >
          <h1 className="text-5xl md:text-6xl text-yellow-400 mb-12 text-left px-0 md:px-0">
            Vertical Films
          </h1>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-5"
            style={{ y: smoothY }}
          >
            
            <div className="md:col-span-5">
              <div className="grid grid-cols-4 gap-3 md:gap-4">
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




      

        <motion.div
          ref={filmsGridRef}
          className="-mx-4 md:-mx-9"
          variants={sectionVariants}
          initial="hidden"
          animate={isFilmsGridInView ? "visible" : "hidden"}
        >
          <FilmsGrid title="More Films" videos={gridFilms} />
        </motion.div>
      </div>

    </main>
  );
}
