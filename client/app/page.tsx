
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
      <div className="relative w-full py-6 md:py-10">
        <Image
          src="/HomePage.gif"
          alt="Homepage composition preview"
          width={1600}
          height={900}
          className="block w-full h-auto"
          priority
          unoptimized
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
        <ImageMarquee title="Our Work" imageSize={140} rows={4} />
        {/* Giant Background Asset overlapping the Marquee */}
      </div>

      {/* Mobile: stacked nav cards (desktop uses parallax collage below) */}
      <section
        className="md:hidden px-4 pt-6 pb-16 space-y-8 max-w-lg mx-auto w-full"
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
        className="hidden md:block relative h-[500vh] overflow-y-auto overflow-x-hidden scroll-auto"
      >

        {/* --- GIANT BACKGROUND ASSETS (z-index: 5, deep parallax) --- */}
        <Asset scrollContainer={scrollRef} src="/chair.png" className="w-[21rem] md:w-[24rem] opacity-98" parallax={0.18} scaleFactor={0.012} rotate={-0.8} position={{ top: "0.5%", left: "34.8%" }} zIndex={50} />
        <Asset reverse={false} scrollContainer={scrollRef} src="/drone.png" className="w-[24rem] md:w-[29rem] opacity-98" parallax={0.2} scaleFactor={0.013} rotate={-2} position={{ top: "8.4%", left: "-8%" }} zIndex={200} />

        {/* --- FOREGROUND INTERACTIVE CARDS (z-index: 45) --- */}
        <Card title="FILMS" imageSrc="/Films.png" width="40.2rem" onClick={() => router.push("/films")} rotate={-1} position={{ top: "-3%", left: "-7%" }} zIndex={100} />
        <Card title="PHOTOGRAPHY" imageSrc="/Photography.png" width="64rem" onClick={() => router.push("/photography")} rotate={2} position={{ top: "13%", left: "38%" }} zIndex={45} />
        <Card title="DESIGN" imageSrc="/Design.png" width="56rem" onClick={() => router.push("/music-videos")} rotate={-7} position={{ top: "84%", left: "-2%" }} zIndex={45} />

        {/* --- UPPER CHUNK (2% - 36%) : FILMS BOARD COMPOSITION --- */}
        <Asset scrollContainer={scrollRef} src="/key.png" className="w-[0.5rem] md:w-[11.5rem] opacity-100" parallax={0.35} scaleFactor={0.01} rotate={1.5} position={{ top: "3%", left: "61.8%" }} zIndex={37} />
        <Asset scrollContainer={scrollRef} src="/Clapperboard.png" className="w-[7.4rem] md:w-[15.4rem] opacity-100" parallax={0.25} scaleFactor={0.014} rotate={1} position={{ top: "-2.6%", left: "61.6%" }} zIndex={34} />
        <Asset scrollContainer={scrollRef} src="/Pot.png" className="w-[28rem] md:w-[36rem] opacity-100" parallax={0.28} scaleFactor={0.014} rotate={1} position={{ top: "0.5%", left: "63.3%" }} zIndex={33} />
        <Asset scrollContainer={scrollRef} src="/Pelican Case.png" className="w-[16rem] md:w-[25rem] opacity-98" parallax={0.2} scaleFactor={0.01} rotate={-3} position={{ top: "10%", left: "17.9%" }} zIndex={31} />
        <Asset scrollContainer={scrollRef} src="/Salad bowl.png" className="w-[19rem] md:w-[29rem] opacity-98" parallax={0.3} scaleFactor={0.013} rotate={-13} position={{ top: "10.4%", right: "39.5%" }} zIndex={20} />
        <Asset scrollContainer={scrollRef} src="/Megaphone.png" className="w-[17rem] md:w-[21rem] opacity-98" parallax={0.22} scaleFactor={0.012} rotate={-13} position={{ top: "12.5%", left: "52%" }} zIndex={60} />
        <Asset scrollContainer={scrollRef} src="/Coffee Machine.png" className="w-[22rem] md:w-[26rem] opacity-98" parallax={0.22} scaleFactor={0.012} rotate={-1} position={{ top: "17.8%", left: "-6%" }} zIndex={250} />

        {/* --- MID CHUNK (40% - 70%) : PHOTOGRAPHY BOARD COMPOSITION --- */}
        <Asset scrollContainer={scrollRef} src="/Camcorder.png" className="w-[11rem] md:w-[17rem] opacity-98" parallax={0.33} scaleFactor={0.016} rotate={5} position={{ top: "18%", left: "18%" }} zIndex={260} />
        {/* <Asset scrollContainer={scrollRef} src="/Vinyl.png" className="w-[18rem] md:w-[26rem]" parallax={0.36} scaleFactor={0.012} rotate={-20} position={{ top: "55%", left: "63%" }} zIndex={33} /> */}
        <Asset scrollContainer={scrollRef} src="/Pizza.png" className="w-[19rem] md:w-[29rem] opacity-100" parallax={0.26} scaleFactor={0.014} rotate={-8} position={{ top: "22.9%", left: "13.9%" }} zIndex={280} />
        <Asset scrollContainer={scrollRef} src="/Bread.png" className="w-[33rem] md:w-[39rem] opacity-100" parallax={0.26} scaleFactor={0.013} rotate={5} position={{ top: "28.8%", left: "-9.6%" }} zIndex={290} />
        <Asset scrollContainer={scrollRef} src="/Lighter.png" className="w-[9rem] md:w-[13rem] opacity-100" parallax={0.34} scaleFactor={0.013} rotate={10} position={{ top: "45%", left: "38%" }} zIndex={34} />
        {/* <Asset scrollContainer={scrollRef} src="/disk.png" className="w-[9rem] md:w-[12rem]" parallax={0.3} scaleFactor={0.012} rotate={25} position={{ top: "53%", left: "20%" }} zIndex={33} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/Megaphone.png" className="w-[12rem] md:w-[17rem]" parallax={0.4} scaleFactor={0.013} rotate={28} position={{ top: "47%", left: "47%" }} zIndex={34} /> */}
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
