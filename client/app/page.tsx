
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TVDisplay from "../components/TVDisplay";
import Asset from "../components/Asset";
import Card from "@/components/Card";
import Header from "../components/Header";
import ImageMarquee from "../components/ImageMarquee";

export default function LandingPage() {
  const router = useRouter();
  const SCENE_HEIGHT_PX = 4000;
  const sceneWidthPx = 1440;
  const pctOf = (pct: number, total: number) => (pct * total) / 100;

  const scrollRef = useRef<HTMLDivElement | null>(null);
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
        <Image
          src="/HomePage.gif"
          alt="Homepage composition preview"
          width={1600}
          height={900}
          className="block w-full h-auto"
          priority
        />
      </div>
      <div
        ref={tvSectionRef}
        className="relative min-h-[80svh] md:min-h-0 md:h-[145vh]"
      >
        <motion.div
          initial={{ opacity: 0, y: 72 }}
          animate={isTVInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 72 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative min-h-[80svh] md:min-h-0 md:h-full w-full will-change-[transform,opacity]"
        >
          <TVDisplay />
        </motion.div>
      </div>
      {/* Image Marquee below the TV */}
      <div className="relative mt-0 z-10 w-full">
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
          imageSrc="/Films.png"
          onClick={() => router.push("/films")}
          rotate={-3}
          className="mx-auto w-full"
        />
        <Card
          layout="stacked"
          title="PHOTOGRAPHY"
          imageSrc="/Photography.png"
          onClick={() => router.push("/photography")}
          rotate={-6}
          className="mx-auto w-full"
        />
        <Card
          layout="stacked"
          title="DESIGN"
          imageSrc="/Design.png"
          onClick={() => router.push("/music-videos")}
          rotate={-7}
          className="mx-auto w-full"
        />
      </section>

      <div
        ref={scrollRef}
        className="hidden sm:block relative h-[310vh] bg-black"
      >

        {/* --- GIANT BACKGROUND ASSETS (z-index: 5, deep parallax) --- */}
        <Asset scrollContainer={scrollRef} src="/chair.png" className="w-[21rem] md:w-[24rem] opacity-98" parallax={0.18} scaleFactor={0.012} rotate={-0.8} position={{ top: pctOf(0.5, SCENE_HEIGHT_PX), left: pctOf(34.8, sceneWidthPx) }} zIndex={50} />
        <Asset reverse={false} scrollContainer={scrollRef} src="/Drone.gif" className="w-[24rem] md:w-[29rem] opacity-98" parallax={0.2} scaleFactor={0.013} rotate={-2} position={{ top: pctOf(8.4, SCENE_HEIGHT_PX), left: pctOf(-8, sceneWidthPx) }} zIndex={200} />

        {/* --- FOREGROUND INTERACTIVE CARDS (z-index: 45) --- */}
        <Card title="FILMS" imageSrc="/Films.gif" width="44.2rem" onClick={() => router.push("/films")} rotate={-1} position={{ top: pctOf(-3, SCENE_HEIGHT_PX), left: pctOf(-7, sceneWidthPx) }} zIndex={100} />
        <Card title="PHOTOGRAPHY" imageSrc="/Photography.gif" width="64rem" onClick={() => router.push("/photography")} rotate={2} position={{ top: pctOf(10, SCENE_HEIGHT_PX), left: pctOf(38.5, sceneWidthPx) }} zIndex={45} />
        <Card title="DESIGN" imageSrc="/Design.gif" width="70.5rem" onClick={() => router.push("/music-videos")} rotate={-3} position={{ top: pctOf(30.6, SCENE_HEIGHT_PX), left: pctOf(-7, sceneWidthPx) }} zIndex={360} />

        {/* --- UPPER CHUNK (2% - 36%) : FILMS BOARD COMPOSITION --- */}
        <Asset scrollContainer={scrollRef} src="/key.png" className="w-[0.5rem] md:w-[11.5rem] opacity-100" parallax={0.35} scaleFactor={0.01} rotate={1.5} position={{ top: pctOf(3, SCENE_HEIGHT_PX), left: pctOf(61.8, sceneWidthPx) }} zIndex={37} />
        <Asset scrollContainer={scrollRef} src="/Clapper v1.gif" className="w-[7.4rem] md:w-[15.4rem] opacity-100" parallax={0.25} scaleFactor={0.014} rotate={1} position={{ top: pctOf(-2.6, SCENE_HEIGHT_PX), left: pctOf(61.6, sceneWidthPx) }} zIndex={34} />
        <Asset scrollContainer={scrollRef} src="/Pot.png" className="w-[28rem] md:w-[36rem] opacity-100" parallax={0.28} scaleFactor={0.014} rotate={1} position={{ top: pctOf(0.5, SCENE_HEIGHT_PX), left: pctOf(63.3, sceneWidthPx) }} zIndex={33} />
        <Asset scrollContainer={scrollRef} src="/Pelicancase.png" className="w-[16rem] md:w-[25rem] opacity-98" parallax={0.2} scaleFactor={0.01} rotate={-3} position={{ top: pctOf(10, SCENE_HEIGHT_PX), left: pctOf(17.9, sceneWidthPx) }} zIndex={31} />
        <Asset scrollContainer={scrollRef} src="/Salad bowl.png" className="w-[19rem] md:w-[29rem] opacity-98" parallax={0.3} scaleFactor={0.013} rotate={-13} position={{ top: pctOf(10.4, SCENE_HEIGHT_PX), right: pctOf(39.5, sceneWidthPx) }} zIndex={20} />
        <Asset scrollContainer={scrollRef} src="/Megaphone.png" className="w-[17rem] md:w-[21rem] opacity-98" parallax={0.22} scaleFactor={0.012} rotate={-13} position={{ top: pctOf(12.5, SCENE_HEIGHT_PX), left: pctOf(52, sceneWidthPx) }} zIndex={60} />
        <Asset scrollContainer={scrollRef} src="/Coffee Machine.png" className="w-[22rem] md:w-[26rem] opacity-98" parallax={0.22} scaleFactor={0.012} rotate={-1} position={{ top: pctOf(17.8, SCENE_HEIGHT_PX), left: pctOf(-6, sceneWidthPx) }} zIndex={250} />

        {/* --- MID CHUNK (40% - 70%) : PHOTOGRAPHY BOARD COMPOSITION --- */}
        <Asset scrollContainer={scrollRef} src="/Camcorder.png" className="w-[11rem] md:w-[17rem] opacity-98" parallax={0.33} scaleFactor={0.016} rotate={5} position={{ top: pctOf(18, SCENE_HEIGHT_PX), left: pctOf(18, sceneWidthPx) }} zIndex={260} />
        <Asset scrollContainer={scrollRef} src="/Vinyl.gif" className="w-[35rem] md:w-[43rem] opacity-100" parallax={0.36} scaleFactor={0.012} rotate={6} position={{ top: pctOf(24.2, SCENE_HEIGHT_PX), left: pctOf(49.5, sceneWidthPx) }} zIndex={340} />
        <Asset scrollContainer={scrollRef} src="/Pizza.png" className="w-[19rem] md:w-[29rem] opacity-100" parallax={0.26} scaleFactor={0.014} rotate={-8} position={{ top: pctOf(22.9, SCENE_HEIGHT_PX), left: pctOf(13.9, sceneWidthPx) }} zIndex={280} />
        <Asset scrollContainer={scrollRef} src="/Bread.png" className="w-[29.2rem] md:w-[35.2rem] opacity-100" parallax={0.26} scaleFactor={0.013} rotate={4} position={{ top: pctOf(28.5, SCENE_HEIGHT_PX), left: pctOf(-9, sceneWidthPx) }} zIndex={290} />
        <Asset scrollContainer={scrollRef} src="/Lighter.png" className="w-[9rem] md:w-[13rem] opacity-200" parallax={0.34} scaleFactor={0.013} rotate={14} position={{ top: pctOf(27.4, SCENE_HEIGHT_PX), left: pctOf(42, sceneWidthPx) }} zIndex={310} />
        <Asset scrollContainer={scrollRef} src="/Converse.gif" className="w-[49rem] md:w-[52rem] opacity-100" parallax={0.3} scaleFactor={0.012} rotate={0} position={{ top: pctOf(37, SCENE_HEIGHT_PX), left: pctOf(-20, sceneWidthPx) }} zIndex={103} />
        <Asset scrollContainer={scrollRef} src="/lego.png" className="w-[32rem] md:w-[37rem] opacity-100" parallax={0.4} scaleFactor={0.013} rotate={2} position={{ top: pctOf(38, SCENE_HEIGHT_PX), left: pctOf(64, sceneWidthPx) }} zIndex={34} />
        {/* <Asset scrollContainer={scrollRef} src="/lego.png" className="w-[35rem] md:w-[45rem]" rotate={14} parallax={0.4} scaleFactor={0.019} position={{ top: "54%", left: "5%" }} />
        <Asset scrollContainer={scrollRef} src="/spray.png" className="w-[20rem] md:w-[25rem]" parallax={0.5} scaleFactor={0.019} position={{ top: "57%", left: "85%" }} /> */}

        {/* --- LOWER CHUNK (74% - 100%) : DESIGN BOARD COMPOSITION --- */}
        {/* <Asset scrollContainer={scrollRef} src="/Pelican Case.png" className="w-[22rem] md:w-[30rem]" parallax={0.25} scaleFactor={0.012} rotate={6} position={{ top: "77%", left: "66%" }} zIndex={33} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/Lego.png" className="w-[18rem] md:w-[24rem]" parallax={0.3} scaleFactor={0.014} rotate={0} position={{ top: "90%", left: "76%" }} zIndex={34} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/Converse.png" className="w-[22rem] md:w-[30rem]" parallax={0.25} scaleFactor={0.013} rotate={15} position={{ top: "88%", left: "-2%" }} zIndex={34} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/SD Card.png" className="w-[12rem] md:w-[16rem]" parallax={0.32} scaleFactor={0.013} rotate={-12} position={{ top: "82%", left: "54%" }} zIndex={33} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/Hot Wheels.png" className="w-[18rem] md:w-[24rem]" parallax={0.28} scaleFactor={0.014} rotate={6} position={{ top: "78%", left: "25%" }} zIndex={32} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/Lighter.png" className="w-[14rem] md:w-[18rem]" parallax={0.34} scaleFactor={0.013} rotate={-42} position={{ top: "95%", left: "48%" }} zIndex={33} /> */}

      </div>

    </main>
  );
}