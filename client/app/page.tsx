
"use client";

import React, { useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRouter } from "next/navigation";
import TVDisplay from "../components/TVDisplay";
import Asset from "../components/Asset";
import Card from "@/components/Card";
import Header from "../components/Header";
import ImageMarquee from "../components/ImageMarquee";

function ParallaxLayer({
  progress,
  parallax,
  zIndex,
  children,
}: {
  progress: MotionValue<number>;
  parallax: number;
  zIndex?: number;
  children: React.ReactNode;
}) {
  const travel = useMemo(
    () =>
      typeof window !== "undefined" && window.innerWidth >= 1024 ? 760 : 420,
    []
  );
  const y = useTransform(progress, [0, 1], [0, parallax * travel]);
  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        zIndex,
        y,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const SCENE_HEIGHT_PX = 4953;
  const sceneWidthPx = 1440;
  const pctOf = (pct: number, total: number) => (pct * total) / 100;

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: sceneProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });
  const isSceneInView = useInView(scrollRef, {
    margin: "200% 0px 200% 0px",
    once: true,
  });
  const tvSectionRef = useRef<HTMLDivElement | null>(null);
  const isTVInView = useInView(tvSectionRef, {
    amount: 0.1,
    margin: "0px 0px -10% 0px",
  });

  return (
    <main
      className="relative w-full bg-black overflow-x-hidden pt-[4.5rem]"
    >
      {/* Sticky Header */}
      <Header />

      {/* Section 0 */}
      {/* <TitleWithSurroundingAssets /> */}
      <div className="relative w-full py-6 md:py-10 max-sm:ps-[max(1rem,env(safe-area-inset-left))] max-sm:pe-[max(1rem,env(safe-area-inset-right))]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Homepage composition preview"
          className="block w-full h-auto"
        >
          <source src="/HomePage.webm" type="video/webm" />
          <source src="/HomePage.mp4" type="video/mp4" />
        </video>
      </div>
      <div
        ref={tvSectionRef}
        className="relative min-h-[80svh] md:min-h-[90vh]"
      >
        <motion.div
          initial={{ opacity: 0, y: 72 }}
          animate={isTVInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 72 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative min-h-[80svh] md:min-h-[90vh] w-full will-change-[transform,opacity]"
        >
          <TVDisplay />
        </motion.div>
      </div>
      {/* Image Marquee below the TV */}
      <div className="relative mt-0 z-10 w-full bg-black">
        <ImageMarquee title="Our Work" imageSize={120} rows={3} />
        {/* Giant Background Asset overlapping the Marquee */}
      </div>

      {/* Mobile: stacked nav cards (desktop uses parallax collage below) */}
      <section
        className="sm:hidden space-y-8 max-w-lg mx-auto w-full pt-6 ps-[max(1rem,env(safe-area-inset-left))] pe-[max(1rem,env(safe-area-inset-right))] pb-[max(4rem,calc(env(safe-area-inset-bottom)+2rem))]"
        aria-label="Explore"
      >
        <h2 className="text-center text-sm font-semibold tracking-[0.2em] uppercase text-white/60">
          Explore
        </h2>
        <Card
          layout="stacked"
          title="FILMS"
          imageSrc="/Films.webp"
          onClick={() => router.push("/films")}
          rotate={-3}
          className="mx-auto w-full"
        />
        <Card
          layout="stacked"
          title="PHOTOGRAPHY"
          imageSrc="/Photography.webp"
          onClick={() => router.push("/photography")}
          rotate={-6}
          className="mx-auto w-full"
        />
        <Card
          layout="stacked"
          title="DESIGN"
          imageSrc="/Design.mp4"
          onClick={() => router.push("/music-videos")}
          rotate={-7}
          className="mx-auto w-full"
        />
      </section>

      <div
        ref={scrollRef}
        className="hidden sm:block relative h-[200vh] bg-black"
        style={{ contain: "layout paint", contentVisibility: "auto" }}
      >
        {isSceneInView && (
          <>
            <Asset progress={sceneProgress} src="/Salad Bowl.webp" className="w-[16.5rem] md:w-[25.5rem] opacity-64" parallax={0.3} scaleFactor={0.013} rotate={-103} position={{ top: pctOf(14.6, SCENE_HEIGHT_PX), right: pctOf(33, sceneWidthPx) }} zIndex={35} />
            <Asset progress={sceneProgress} src="/Vinyl.mp4" className="w-[37.5rem] md:w-[45.5rem] opacity-100" parallax={0.36} scaleFactor={0.012} rotate={-3.7} position={{ top: pctOf(13.5, SCENE_HEIGHT_PX), left: pctOf(65.6, sceneWidthPx) }} zIndex={36} />
            <Asset progress={sceneProgress} src="/SD Card.webp" className="w-[16.4rem] md:w-[20.4rem]" parallax={0.32} scaleFactor={0.013} rotate={12} position={{ top: "66.9%", left: "51.6%" }} zIndex={50} />

            <ParallaxLayer progress={sceneProgress} parallax={0.2} zIndex={50}>
              <Asset progress={sceneProgress} parallax={0} src="/Clapper v1.mp4" className="w-[12rem] md:w-[17rem] opacity-68" scaleFactor={0.013} rotate={0} position={{ top: pctOf(2, SCENE_HEIGHT_PX), left: pctOf(12, sceneWidthPx) }} />
              <Asset progress={sceneProgress} parallax={0} src="/Chair.webp" className="w-[17rem] md:w-[21rem] opacity-68" scaleFactor={0.013} rotate={-8} position={{ top: pctOf(0, SCENE_HEIGHT_PX), left: pctOf(30, sceneWidthPx) }} />
              <Asset progress={sceneProgress} parallax={0} src="/Fork.webp" className="w-[17rem] md:w-[21rem] opacity-68" scaleFactor={0.013} rotate={-8} position={{ top: pctOf(-3, SCENE_HEIGHT_PX), right: pctOf(25, sceneWidthPx) }} />
              <Asset progress={sceneProgress} parallax={0} src="/Megaphone.webp" className="w-[15rem] md:w-[19rem] opacity-68" scaleFactor={0.013} rotate={-8} position={{ top: pctOf(6, SCENE_HEIGHT_PX), right: pctOf(-3, sceneWidthPx) }} />
              <Asset progress={sceneProgress} parallax={0} src="/Converse.mp4" className="w-[32rem] md:w-[42rem] opacity-68" scaleFactor={0.013} rotate={0} position={{ top: pctOf(10, SCENE_HEIGHT_PX), left: pctOf(-12, sceneWidthPx) }} />
              <Asset reverse={true} progress={sceneProgress} parallax={0} src="/Pelicancase.webp" className="w-[18rem] md:w-[24rem] opacity-68" scaleFactor={0.013} rotate={0} position={{ top: pctOf(10, SCENE_HEIGHT_PX), left: pctOf(43, sceneWidthPx) }} />
            </ParallaxLayer>

            <Asset reverse={true} progress={sceneProgress} src="/Drone.mp4" className="w-[21rem] md:w-[24rem] opacity-68" parallax={0.18} scaleFactor={0.012} rotate={-0.8} position={{ top: pctOf(0, SCENE_HEIGHT_PX), left: pctOf(-4, sceneWidthPx) }} zIndex={51} />
            <Asset progress={sceneProgress} src="/Lego.webp" className="w-[28rem] md:w-[34rem] opacity-68" parallax={0.2} scaleFactor={0.013} rotate={0} position={{ top: pctOf(18, SCENE_HEIGHT_PX), left: pctOf(1, sceneWidthPx) }} zIndex={51} />
            <Asset progress={sceneProgress} src="/Bottle 2.webp" className="w-[12rem] md:w-[16rem] opacity-74" parallax={0.2} scaleFactor={0.013} rotate={-75} position={{ top: pctOf(19.9, SCENE_HEIGHT_PX), right: pctOf(49.9, sceneWidthPx) }} zIndex={55} />
            <Asset progress={sceneProgress} src="/Camcorder.webp" className="w-[8rem] md:w-[12rem] opacity-68" parallax={0.33} scaleFactor={0.016} rotate={5} position={{ top: pctOf(9, SCENE_HEIGHT_PX), right: pctOf(18, sceneWidthPx) }} zIndex={260} />



            {/* Same stem as mobile: Card/Asset load `.webm` before `.mp4`; alpha WebMs remove white matte from MP4 encodes. */}
            <Card title="FILMS" imageSrc="/Films.mp4" width="44.2rem" onClick={() => router.push("/films")} rotate={-1} position={{ top: pctOf(6, SCENE_HEIGHT_PX), left: pctOf(0, sceneWidthPx) }} zIndex={100} />
            <Card title="PHOTOGRAPHY" imageSrc="/Photography.mp4" width="56rem" onClick={() => router.push("/photography")} rotate={2} position={{ top: pctOf(-3, SCENE_HEIGHT_PX), right: pctOf(-2, sceneWidthPx) }} zIndex={52} />
            <Card title="Design" imageSrc="/Design.mp4" width="56rem" onClick={() => router.push("/comingsoon")} rotate={2} position={{ top: pctOf(17, SCENE_HEIGHT_PX), right: pctOf(-2, sceneWidthPx) }} zIndex={52} />
          </>
        )}
      </div>

    </main>
  );
}