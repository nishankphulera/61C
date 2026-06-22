"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import FilmsCard from "@/components/FilmsCard";
import DigitalFilmsCard from "@/components/DigitalFilmsCard";
import MusicVideosSection from "@/components/MusicVideosSection";
import Header from "@/components/Header";
import FilmRollStrip from "@/components/FilmRollStrip";
import DraggableHorizontalScroll from "@/components/DraggableHorizontalScroll";
import Asset from "@/components/Asset";
import filmsNavImg from "@/components/FILMS.png";
import musicVideosNavImg from "@/components/MUSIC VIDEOS.png";
import verticalFilmsNavImg from "@/components/VERTICAL FILMS.png";
import { fetchPublicContent } from "@/lib/api";
import { compareContentByOrder, ContentItem } from "@/lib/content";
import { normalizeGalleryImageUrl } from "@/lib/mediaUrls";

type FilmCard = { id: string; title: string; imageSrc: string; href: string; thumbnailUrl?: string };
type MusicCard = { id: string; imageSrc: string; href: string };

const defaultYoutubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const fallbackFilmImage = "https://picsum.photos/800/450?random=88";
const fallbackMusicImage = "https://picsum.photos/800/450?random=89";

/** First valid http(s) URL from candidates; otherwise default watch URL. */
function externalHref(...candidates: (string | undefined | null)[]): string {
  for (const c of candidates) {
    const t = (c ?? "").trim();
    if (!t) continue;
    try {
      const u = new URL(t);
      if (u.protocol === "http:" || u.protocol === "https:") return u.href;
    } catch {
      /* skip invalid */
    }
  }
  try {
    return new URL(defaultYoutubeUrl).href;
  } catch {
    return "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  }
}
const MAIN_LOADER_STATE_ATTR = "data-main-loader-state";
const MAIN_LOADER_DONE_EVENT = "main-loader:done";

function resolveCardImage(item: ContentItem, fallback: string): string {
  const candidate = item.thumbnailUrl?.trim() || item.images?.[0]?.trim() || "";
  const result = normalizeGalleryImageUrl(candidate, {
    youtubeUrl: item.youtubeUrl,
    videoUrl: item.videoUrl,
  });
  return result || fallback;
}

export default function FilmsPage() {
  const musicVideosRef = useRef<HTMLDivElement>(null);
  const brandFilmsRef = useRef<HTMLDivElement>(null);
  const verticalFilmsRef = useRef<HTMLDivElement>(null);
  const documentariesRef = useRef<HTMLDivElement>(null);

  const isMusicVideosInView = useInView(musicVideosRef, { once: true, amount: 0.2 });
  const isBrandFilmsInView = useInView(brandFilmsRef, { once: true, amount: 0.2 });
  const isVerticalFilmsInView = useInView(verticalFilmsRef, { once: true, amount: 0.2 });
  const isDocumentariesInView = useInView(documentariesRef, { once: true, amount: 0.2 });
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: verticalFilmsRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  // const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const [rows, setRows] = useState<ContentItem[]>([]);
  const [isSectionsLoading, setIsSectionsLoading] = useState(true);
  const [isMainLoaderDone, setIsMainLoaderDone] = useState(false);

  useEffect(() => {
    setIsSectionsLoading(true);
    fetchPublicContent({ page: "films" })
      .then((data) => {
        console.log("rows", data)
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
      thumbnailUrl: item.thumbnailUrl ? (normalizeGalleryImageUrl(item.thumbnailUrl) || undefined) : undefined,
      imageSrc: resolveCardImage(item, fallbackFilmImage),
      href: externalHref(item.youtubeUrl, item.videoUrl),
    }));
  };
  const mapMusicRows = (): MusicCard[] => {
    const filtered = rows
      .filter((item) => item.section === "music-videos")
      .sort(compareContentByOrder);
    return filtered.map((item) => ({
      id: item._id,
      imageSrc: resolveCardImage(item, fallbackMusicImage),
      href: externalHref(item.youtubeUrl, item.videoUrl),
    }));
  };

  const musicVideos = useMemo(() => mapMusicRows(), [rows]);
  const brandFilms = useMemo(() => mapFilmRows("brand-films"), [rows]);
  const verticalFilms = useMemo(() => mapFilmRows("vertical-films"), [rows]);
  const documentaries = useMemo(() => mapFilmRows("documentaries"), [rows]);


  console.log("logging vertical films", verticalFilms)

  const filmRollGifs = ["/Films page header1.mp4", "/Films page Header2.mp4", "/Films page Header3.mp4"] as const;

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

  const filmsLandscapeCarousel = (items: FilmCard[], ariaLabel: string, maxPerRow: number = 10) => {
    const chunks = [];
    for (let i = 0; i < items.length; i += maxPerRow) {
      chunks.push(items.slice(i, i + maxPerRow));
    }
    return (
      <div className="flex flex-col gap-6 md:gap-8">
        {chunks.map((chunk, chunkIndex) => (
          <DraggableHorizontalScroll key={chunkIndex} ariaLabel={`${ariaLabel} row ${chunkIndex + 1}`} gapClassName="gap-3 md:gap-4">
            {chunk.map((film) => (
              <div key={film.id} className="w-[min(88vw,22rem)] shrink-0">
                <FilmsCard
                  id={film.id}
                  title={film.title}
                  imageSrc={film.imageSrc}
                  href={film.href}
                />
              </div>
            ))}
          </DraggableHorizontalScroll>
        ))}
      </div>
    );
  };

  return (
    <main ref={scrollRef} className="min-h-screen bg-black w-full">
      <Header />
      <Asset reverse={true} src="/Chair.webp" className="w-[16rem] md:w-[16rem] opacity-50" rotate={-10} position={{ top: "3%", right: "-5%" }} zIndex={0} />
      <Asset reverse={false} src="/Clapperboard.webp" className="w-[28rem] md:w-[28rem] opacity-50" rotate={0} position={{ top: "22%", left: "-8%" }} zIndex={0} />
      <Asset reverse={true} src="/Megaphone.webp" className="w-[28rem] md:w-[30rem] opacity-50" rotate={30} position={{ top: "35%", right: "-10%" }} zIndex={0} />
      <Asset reverse={true} src="/Pelicancase.webp" className="w-[14rem] md:w-[14rem] opacity-50" rotate={4} position={{ top: "56.4%", left: "46%" }} zIndex={0} />
      <Asset reverse={true} src="/Pot.webp" className="w-[20rem] md:w-[20rem] opacity-50" rotate={-20} position={{ top: "55%", right: "-10%" }} zIndex={0} />
      <Asset reverse={true} src="/Drone.gif" className="w-[40rem] md:w-[40rem] opacity-50" rotate={0} position={{ top: "58%", left: "-8%" }} zIndex={0} />

      <div className="relative z-[60] flex flex-col items-center pt-8 pb-2 md:pt-14 md:pb-4 overflow-hidden">
        <FilmRollStrip
          gifs={filmRollGifs}
          className="w-[100vw]"
          gifAlts={["Films highlight 1", "Films highlight 2", "Films highlight 3"]}
        />
        {/* <div className="mt-4 flex flex-wrap items-end justify-center gap-6 md:mt-6 md:gap-10">
          <button
            type="button"
            onClick={() => scrollToSection(musicVideosRef)}
            className="z-50 rotate-[-3deg] cursor-pointer border-0 bg-transparent p-0 transition-all duration-300 hover:scale-110 hover:rotate-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/80"
            aria-label="Scroll to Music Videos section"
          >
            <Image
              src={musicVideosNavImg}
              alt=""
              className="h-auto w-[min(36vw,10rem)] object-contain drop-shadow-[0_0_12px_rgba(250,204,21,0.4)] md:w-[min(22vw,12rem)]"
              sizes="(max-width: 768px) 36vw, 12rem"
              priority
            />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection(brandFilmsRef)}
            className="z-50 rotate-[2deg] cursor-pointer border-0 bg-transparent p-0 transition-all duration-300 hover:scale-110 hover:rotate-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/80"
            aria-label="Scroll to Brand Films section"
          >
            <Image
              src={filmsNavImg}
              alt=""
              className="h-auto w-[min(30vw,8rem)] object-contain drop-shadow-[0_0_12px_rgba(250,204,21,0.4)] md:w-[min(18vw,10rem)]"
              sizes="(max-width: 768px) 30vw, 10rem"
            />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection(verticalFilmsRef)}
            className="z-50 rotate-[-2deg] cursor-pointer border-0 bg-transparent p-0 transition-all duration-300 hover:scale-110 hover:rotate-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/80"
            aria-label="Scroll to Vertical Films section"
          >
            <Image
              src={verticalFilmsNavImg}
              alt=""
              className="h-auto w-[min(34vw,9rem)] object-contain drop-shadow-[0_0_12px_rgba(250,204,21,0.4)] md:w-[min(20vw,11rem)]"
              sizes="(max-width: 768px) 34vw, 11rem"
            />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection(documentariesRef)}
            className="z-50 rotate-[3deg] cursor-pointer rounded-sm border-2 border-yellow-400/70 bg-transparent px-4 py-2 font-mono text-sm font-bold uppercase tracking-widest text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.3)] transition-all duration-300 hover:scale-110 hover:rotate-0 hover:bg-yellow-400/10 hover:border-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/80 md:px-5 md:py-2.5 md:text-base"
            aria-label="Scroll to Documentaries section"
          >
            Documentaries
          </button>
        </div> */}
      </div>

      <div className="relative z-[60] container mx-auto px-2 py-2 md:py-2">
        <motion.div
          id="films-music-videos"
          ref={musicVideosRef}
          className="mb-16 w-full"
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

        <motion.section
          id="films-documentaries"
          ref={documentariesRef}
          className="relative z-10 mb-16 w-full pt-2"
          variants={sectionVariants}
          initial="hidden"
          animate={isDocumentariesInView ? "visible" : "hidden"}
        >
          <h1 className="text-5xl md:text-6xl text-yellow-400 mb-12 text-left font-bold">Documentaries & Artist profiles</h1>
          {shouldShowSectionLoader
            ? sectionLoader
            : filmsLandscapeCarousel(
              documentaries,
              "Documentaries, scroll horizontally or drag to browse"
            )}
        </motion.section>

        <motion.section
          id="films-vertical-films"
          ref={verticalFilmsRef}
          className="relative z-10 mb-16 w-full mt-20"
          variants={sectionVariants}
          initial="hidden"
          animate={isVerticalFilmsInView ? "visible" : "hidden"}
        >
          <h1 className="text-5xl md:text-6xl text-yellow-400 mb-12 text-left font-bold">Vertical Films</h1>
          {shouldShowSectionLoader ? (
            sectionLoader
          ) : (
            <motion.div className="grid grid-cols-1 md:grid-cols-5" >
              <div className="md:col-span-5">
                <DraggableHorizontalScroll
                  ariaLabel="Vertical films, scroll horizontally or drag to browse"
                  gapClassName="gap-3 md:gap-4"
                >
                  {verticalFilms.map((film) => (
                    <div key={film.id} className="w-[min(48vw,13rem)] shrink-0 md:w-[min(40vw,14rem)]">
                      <DigitalFilmsCard
                        id={film.id}
                        title={film.title}
                        imageSrc={film.imageSrc}
                        href={film.href}
                        thumbnailUrl={film.thumbnailUrl}
                      />
                    </div>
                  ))}
                </DraggableHorizontalScroll>
              </div>
            </motion.div>
          )}
        </motion.section>

        <motion.section
          id="films-brand-films"
          ref={brandFilmsRef}
          className="relative z-10 mb-16 w-full mt-20"
          variants={sectionVariants}
          initial="hidden"
          animate={isBrandFilmsInView ? "visible" : "hidden"}
        >
          <h1 className="text-5xl md:text-6xl text-yellow-400 mb-12 text-left font-bold">Brand Films</h1>
          {shouldShowSectionLoader
            ? sectionLoader
            : filmsLandscapeCarousel(
              brandFilms,
              "Brand films, scroll horizontally or drag to browse"
            )}
        </motion.section>
      </div>
    </main>
  );
}
