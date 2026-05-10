"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import FilmsCard from "@/components/FilmsCard";
import DigitalFilmsCard from "@/components/DigitalFilmsCard";
import FilmsGrid from "@/components/FilmsGrid";
import MusicVideosSection from "@/components/MusicVideosSection";
import Header from "@/components/Header";
import FilmRollStrip from "@/components/FilmRollStrip";
import Asset from "@/components/Asset";
import filmsNavImg from "@/components/FILMS.png";
import musicVideosNavImg from "@/components/MUSIC VIDEOS.png";
import verticalFilmsNavImg from "@/components/VERTICAL FILMS.png";
import { fetchPublicContent } from "@/lib/api";
import { compareContentByOrder, ContentItem } from "@/lib/content";

type FilmCard = { id: string; title: string; imageSrc: string; youtubeUrl: string };
type MusicCard = { id: string; imageSrc: string; youtubeUrl: string };

const fallbackFilms: FilmCard[] = [
  { id: "1", title: "The Great Adventure", imageSrc: "https://picsum.photos/800/450?random=1", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: "2", title: "Mystery of the Lost City", imageSrc: "https://picsum.photos/800/450?random=2", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: "3", title: "Space Odyssey 2024", imageSrc: "https://picsum.photos/800/450?random=3", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
];
const defaultYoutubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const fallbackFilmImage = "https://picsum.photos/800/450?random=88";
const fallbackMusicImage = "https://picsum.photos/800/450?random=89";
const MAIN_LOADER_STATE_ATTR = "data-main-loader-state";
const MAIN_LOADER_DONE_EVENT = "main-loader:done";

function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    if (host.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "").trim();
      return id || null;
    }
    if (host.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/watch")) {
        return parsed.searchParams.get("v");
      }
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/embed/")[1]?.split("/")[0] || null;
      }
      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/shorts/")[1]?.split("/")[0] || null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

function isImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const pathname = parsed.pathname.toLowerCase();
    const hasImageExtension = /\.(avif|webp|png|jpe?g|gif|svg)$/i.test(pathname);
    const knownImageHosts = ["picsum.photos", "i.ytimg.com", "img.youtube.com"];
    return hasImageExtension || knownImageHosts.includes(parsed.hostname.toLowerCase());
  } catch {
    return false;
  }
}

function resolveCardImage(item: ContentItem, fallback: string): string {
  const candidate = item.thumbnailUrl?.trim() || item.images?.[0]?.trim() || "";
  if (!candidate) return fallback;
  if (isImageUrl(candidate)) return candidate;

  const videoSource = item.youtubeUrl?.trim() || item.videoUrl?.trim() || candidate;
  const videoId = extractYouTubeVideoId(videoSource);
  if (videoId) return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return fallback;
}

export default function FilmsPage() {
  const filmsRef = useRef<HTMLDivElement>(null);
  const digitalFilmsRef = useRef<HTMLDivElement>(null);
  const filmsGridRef = useRef<HTMLDivElement>(null);
  const musicVideosRef = useRef<HTMLDivElement>(null);

  // In view hooks for scroll animations
  const isFilmsInView = useInView(filmsRef, { once: true, amount: 0.2 });
  const isDigitalFilmsInView = useInView(digitalFilmsRef, { once: true, amount: 0.2 });
  const isFilmsGridInView = useInView(filmsGridRef, { once: true, amount: "some" });
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
  const [rows, setRows] = useState<ContentItem[]>([]);
  const [isSectionsLoading, setIsSectionsLoading] = useState(true);
  const [isMainLoaderDone, setIsMainLoaderDone] = useState(false);

  useEffect(() => {
    setIsSectionsLoading(true);
    fetchPublicContent({ page: "films" })
      .then((data) => {
        console.log("Fetched films data:", data);
        setRows(data);
      })
      .catch(() => setRows([]))
      .finally(() => setIsSectionsLoading(false));
  }, []);

  useEffect(() => {
    const isDone = document.documentElement.getAttribute(MAIN_LOADER_STATE_ATTR) === "done";
    setIsMainLoaderDone(isDone);

    const onMainLoaderDone = () => setIsMainLoaderDone(true);
    window.addEventListener(MAIN_LOADER_DONE_EVENT, onMainLoaderDone);
    return () => window.removeEventListener(MAIN_LOADER_DONE_EVENT, onMainLoaderDone);
  }, []);

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

  const mapFilmRows = (section: string): FilmCard[] => {
    const filtered = rows
      .filter((item) => item.section === section)
      .sort(compareContentByOrder);
    return filtered.map((item) => ({
      id: item._id,
      title: item.title,
      imageSrc: resolveCardImage(item, fallbackFilmImage),
      youtubeUrl: item.youtubeUrl || item.videoUrl || defaultYoutubeUrl,
    }));
  };
  const mapMusicRows = (): MusicCard[] => {
    const filtered = rows
      .filter((item) => item.section === "music-videos")
      .sort(compareContentByOrder);
    return filtered.map((item) => ({
      id: item._id,
      imageSrc: resolveCardImage(item, fallbackMusicImage),
      youtubeUrl: item.youtubeUrl || item.videoUrl || defaultYoutubeUrl,
    }));
  };
  const films = useMemo(() => mapFilmRows("films"), [rows]);
  const digitalFilms = useMemo(() => mapFilmRows("vertical-films"), [rows]);
  const gridFilms = useMemo(() => mapFilmRows("more-films"), [rows]);
  const musicVideos = useMemo(() => mapMusicRows(), [rows]);

  const filmRollGifs = ["/HomePage.gif", "/HomePage.gif", "/HomePage.gif"] as const;

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement | null>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sectionLoader = (
    <div className="flex w-full items-center justify-center py-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Final.gif"
        alt="Loading section content"
        className="h-32 w-32 object-contain md:h-40 md:w-40"
      />
    </div>
  );
  const shouldShowSectionLoader = isMainLoaderDone && isSectionsLoading;

  return (
    <main ref={scrollRef} className="min-h-screen bg-black w-full">
      <Header />
      <Asset reverse={true} scrollContainer={scrollRef} src="/chair.png" className="w-[16rem] md:w-[16rem] opacity-50" parallax={0.2} scaleFactor={0.012} rotate={-10} position={{ top: "3%", right: "-5%" }} zIndex={0} />
      <Asset reverse={false} scrollContainer={scrollRef} src="/Clapperboard.png" className="w-[28rem] md:w-[28rem] opacity-50" parallax={0.2} scaleFactor={0.012} rotate={0} position={{ top: "22%", left: "-8%" }} zIndex={0} />
      <Asset reverse={true} scrollContainer={scrollRef} src="/Megaphone.png" className="w-[28rem] md:w-[30rem] opacity-50" parallax={0.2} scaleFactor={0.012} rotate={30} position={{ top: "35%", right: "-10%" }} zIndex={0} />
      <Asset reverse={true} scrollContainer={scrollRef} src="/Pelicancase.png" className="w-[14rem] md:w-[14rem] opacity-50" parallax={0.2} scaleFactor={0.012} rotate={4} position={{ top: "56.4%", left: "46%" }} zIndex={0} />
      <Asset reverse={true} scrollContainer={scrollRef} src="/Pot.png" className="w-[20rem] md:w-[20rem] opacity-50" parallax={0.2} scaleFactor={0.012} rotate={-20} position={{ top: "55%", right: "-10%" }} zIndex={0} />
      <Asset reverse={true} scrollContainer={scrollRef} src="/Drone.gif" className="w-[40rem] md:w-[40rem] opacity-50" parallax={0.2} scaleFactor={0.012} rotate={0} position={{ top: "58%", left: "-8%" }} zIndex={0} />

      <div className="relative z-[60] flex justify-center px-4 pt-8 pb-2 md:pt-14 md:pb-4">
     
        <FilmRollStrip
          gifs={filmRollGifs}
          className="w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl"
          gifAlts={["Films highlight 1", "Films highlight 2", "Films highlight 3"]}
        />
        <button
          type="button"
          onClick={() => scrollToSection(filmsRef)}
          className="absolute top-160 left-104 z-50 rotate-[-30deg] cursor-pointer border-0 bg-transparent p-0 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/80"
          aria-label="Scroll to Films section"
        >
          <Image
            src={filmsNavImg}
            alt=""
            className="h-auto w-[min(52vw,11rem)] object-contain md:w-[min(32vw,15rem)]"
            sizes="(max-width: 768px) 52vw, 15rem"
            priority
          />
        </button>
        <button
          type="button"
          onClick={() => scrollToSection(musicVideosRef)}
          className="absolute top-100 left-58 z-50 cursor-pointer border-0 bg-transparent p-0 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/80"
          aria-label="Scroll to Music Videos section"
        >
          <Image
            src={musicVideosNavImg}
            alt=""
            className="h-auto w-[min(62vw,13rem)] object-contain md:w-[min(38vw,17rem)]"
            sizes="(max-width: 768px) 62vw, 17rem"
          />
        </button>
        <button
          type="button"
          onClick={() => scrollToSection(digitalFilmsRef)}
          className="absolute top-200 left-238 z-50 cursor-pointer border-0 bg-transparent p-0 pt-20 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/80"
          aria-label="Scroll to Vertical Films section"
        >
          <Image
            src={verticalFilmsNavImg}
            alt=""
            className="h-auto w-[min(58vw,12rem)] object-contain md:w-[min(36vw,16rem)]"
            sizes="(max-width: 768px) 58vw, 16rem"
          />
        </button>
   
      </div>

      <div className="relative z-[60] container mx-auto px-2 py-2 md:py-2">
        {/* Films Section - Width > Height */}
        <motion.section
          ref={filmsRef}
          className="relative z-10 mb-16 -mx-6 md:-mx-10 pt-[0.5rem]"
          variants={sectionVariants}
          initial="hidden"
          animate={isFilmsInView ? "visible" : "hidden"}
        >
          <h1 className="text-5xl md:text-6xl text-yellow-400 mb-12 text-left px-0 md:px-0 font-bold">
            Films
          </h1>
     
          {shouldShowSectionLoader ? (
            sectionLoader
          ) : (
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
          )}
        </motion.section>

    

          {/* Music Videos Section — wider breakout than before (-mx-4 md:-mx-8) */}
          <motion.div
          ref={musicVideosRef}
          className="-mx-4 md:-mx-10"
          variants={sectionVariants}
          initial="hidden"
          animate={isMusicVideosInView ? "visible" : "hidden"}
        >
          {shouldShowSectionLoader ? (
            sectionLoader
          ) : (
            <MusicVideosSection title="Music Videos" videos={musicVideos.length ? musicVideos : []} />
          )}
        </motion.div>

        {/* Digital Films Section — wider breakout past container padding */}
        <motion.section
          ref={digitalFilmsRef}
          className="-mx-3 md:-mx-4"
          variants={sectionVariants}
          initial="hidden"
          animate={isDigitalFilmsInView ? "visible" : "hidden"}
        >
          <h1 className="text-5xl md:text-6xl text-yellow-400 mb-12 text-left px-0 md:px-0 font-bold">
            Vertical Films
          </h1>
          {shouldShowSectionLoader ? (
            sectionLoader
          ) : (
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
          )}
        </motion.section>




      

        <motion.div
          ref={filmsGridRef}
          className="relative z-[60] -mx-4 md:-mx-9 pt-3"
          variants={sectionVariants}
          initial="hidden"
          animate={isFilmsGridInView ? "visible" : "hidden"}
        >
         
          <FilmsGrid className="mt-0" title="More Films" videos={gridFilms} />
        </motion.div>
      </div>

    </main>
  );
}
