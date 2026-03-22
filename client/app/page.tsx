
// "use client";

// import React, { useRef, useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import TVDisplay from "../components/TVDisplay";
// import Asset from "../components/Asset";
// import Card from "@/components/Card";
// import TitleWithSurroundingAssets from "../components/TitleWithSurroundingAssets";
// import TV from "@/components/TV";

// export default function LandingPage() {
//   const router = useRouter();
//   const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

//   const scrollRef = useRef<HTMLDivElement | null>(null);





//   return (
//     <main 
//     ref={scrollRef}

//     className="relative w-full min-h-[300vh] bg-black overflow-x-hidden">
//       {/* Section 0: Top - TitleWithSurroundingAssets */}

//         <TitleWithSurroundingAssets />

//       {/* Section 1: TV Screen */}

//           {/* TVDisplay */}
//           <div className="relative left-[50%] transform -translate-x-1/2 top-[-340px] z-30 w-[60rem] md:w-[40rem] lg:w-[90rem]">
//           <Asset
//             src="/box.png"
//             className="w-72 md:w-96 lg:w-[30rem]"
//             parallax={-0.5}
//             scaleFactor={0.005}
//             position={{ top: "30%", left: "-2%" }}
//           />
//           <Asset
//             src="/disk.png"
//             className="w-60 md:w-80 lg:w-[20rem]"
//             parallax={-0.3}
//             scaleFactor={0.007}
//             position={{ top: "35%", left: "70%" }}
//           />
//             <TVDisplay />
//           </div>

//           {/* PARALLAX ASSETS for TV section */}




//           <Asset
//             src="/speaker.png"
//             className="w-80 md:w-[40rem]"
//             parallax={0.3}
//             scaleFactor={0.01}
//             position={{ top: "175%", left: "65%" }}
//           />

//           <Asset
//             src="/chair.png"
//             className="w-[25rem] md:w-[26rem]"
//             parallax={0.4}
//             scaleFactor={0.012}
//             position={{ top: "235%", left: "66%" }}
//             zIndex={50}
//           />


//           <Asset
//             src="/pot.png"
//             className="w-[20rem] md:w-[35rem]"
//             parallax={0.5}
//             scaleFactor={0.015}
//             position={{ top: "175%", left: "5%" }}
//           />

//           <Asset
//             src="/clap.png"
//             className="w-[25rem] md:w-[40rem]"
//             parallax={0.6}
//             scaleFactor={0.017}
//             position={{ top: "220%", left: "60%" }}
//           />

//           {/* <Card
//             initialRotation={10}
//             onClick={() => router.push("/films")}
//             text="FILMS"
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[20rem] md:w-[30rem] lg:w-[40rem]"
//           /> */}



//           <Asset
//             src="/record.png"
//             className="w-[70rem] md:w-[60rem]"
//             parallax={0.7}
//             scaleFactor={0.02}
//             position={{ top: "335%", left: "20%" }}
//           />

//           <Asset
//             src="/flyingRibbons.svg"
//             className="w-[35rem] md:w-[45rem]"
//             parallax={0.8}
//             scaleFactor={0.022}
//             position={{ top: "375%", left: "55%" }}
//           />

//           {/* <Card
//             initialRotation={-10}
//             onClick={() => console.log("Card clicked!")}
//             text="PHOTOGRAPHY"
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[20rem] md:w-[30rem] lg:w-[40rem]"
//           /> */}

//       {/* Additional content below (optional - for continuous scrolling after sections) */}
//         <Asset
//           src="/hotWheels.png"
//           className="w-[25rem]"
//           parallax={0.9}
//           scaleFactor={0.025}
//           position={{ top: "390%", left: "4%" }}
//         />

//         <Asset
//           src="/lego.png"
//           className="w-[35rem] md:w-[45rem]"
//           rotate={14}
//           parallax={1.0}
//           scaleFactor={0.027}
//           position={{ top: "465%", left: "60%" }}
//         />

//         <Asset
//           src="/spray.png"
//           className="w-[20rem] md:w-[25rem]"
//           parallax={1.1}
//           scaleFactor={0.03}
//           position={{ top: "485%", left: "0%" }}
//         />

//         <Asset
//           src="/lighter.png"
//           className="w-[25rem] md:w-[45rem]"
//           parallax={1.2}
//           scaleFactor={0.03}
//           position={{ top: "440%", left: "30%" }}
//         />
//         {/* <Card
//           initialRotation={10}
//           onClick={() => console.log("Card clicked!")}
//           text="MUSIC VIDEOS"
//           className="absolute top-[550%] left-[45%] transform -translate-x-1/2 z-50 w-[20rem] md:w-[30rem] lg:w-[40rem]"
//         /> */}

//         <Asset
//           src="/shoes.png"
//           className="w-[40rem] md:w-[60rem]"
//           parallax={1.3}
//           scaleFactor={0.035}
//           position={{ top: "555%", left: "35%" }}
//         />
//     </main>
//   );
// }
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
      <div className="relative mt-0">
        <ImageMarquee title="Our Work" imageSize={140} rows={4} />
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
        <Asset reverse={true} scrollContainer={scrollRef} src="/Lego.png" className="w-[32rem] md:w-[34rem] opacity-50" parallax={0.2} scaleFactor={0.012} rotate={30} position={{ top: "6%", right: "50%" }} zIndex={5} />
        <Asset scrollContainer={scrollRef} src="/Cassette.png" className="w-[38rem] md:w-[36rem] opacity-45" parallax={0.18} scaleFactor={0.012} rotate={8} position={{ top: "40%", left: "72%" }} zIndex={5} />
        {/* <Asset scrollContainer={scrollRef} src="/Clapperboard.png" className="w-[30rem] md:w-[34rem] opacity-45" parallax={0.2} scaleFactor={0.013} rotate={18} position={{ top: "72%", left: "-8%" }} zIndex={5} /> */}

        {/* --- FOREGROUND INTERACTIVE CARDS (z-index: 45) --- */}
        <Card title="FILMS" imageSrc="/Films.png" width="46rem" onClick={() => router.push("/films")} rotate={-3} position={{ top: "12%", left: "-4%" }} zIndex={45} />
        <Card title="PHOTOGRAPHY" imageSrc="/Photography.png" width="54rem" onClick={() => router.push("/photography")} rotate={-6} position={{ top: "50%", left: "44%" }} zIndex={45} />
        <Card title="DESIGN" imageSrc="/Design.png" width="56rem" onClick={() => router.push("/music-videos")} rotate={-7} position={{ top: "84%", left: "-2%" }} zIndex={45} />

        {/* --- UPPER CHUNK (2% - 36%) : FILMS BOARD COMPOSITION --- */}
        {/* <Asset scrollContainer={scrollRef} src="/Chair.png" className="w-[22rem] md:w-[34rem]" parallax={0.35} scaleFactor={0.01} rotate={3} position={{ top: "14%", left: "34%" }} zIndex={32} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/Clapperboard.png" className="w-[22rem] md:w-[30rem]" parallax={0.25} scaleFactor={0.014} rotate={18} position={{ top: "8%", left: "63%" }} zIndex={34} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/Pot.png" className="w-[20rem] md:w-[28rem]" parallax={0.28} scaleFactor={0.014} position={{ top: "18%", left: "72%" }} zIndex={33} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/Pelican Case.png" className="w-[24rem] md:w-[34rem]" parallax={0.2} scaleFactor={0.01} rotate={-10} position={{ top: "31%", left: "14%" }} zIndex={31} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/Megaphone.png" className="w-[18rem] md:w-[28rem]" parallax={0.3} scaleFactor={0.013} rotate={-18} position={{ top: "34%", left: "50%" }} zIndex={33} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/disk.png" className="w-[10rem] md:w-[14rem]" parallax={0.22} scaleFactor={0.012} rotate={-20} position={{ top: "24%", left: "44%" }} zIndex={30} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/disk.png" className="w-[8rem] md:w-[11rem]" parallax={0.22} scaleFactor={0.012} rotate={20} position={{ top: "28%", left: "58%" }} zIndex={30} /> */}

        {/* --- MID CHUNK (40% - 70%) : PHOTOGRAPHY BOARD COMPOSITION --- */}
        {/* <Asset scrollContainer={scrollRef} src="/Clapperboard.png" className="w-[18rem] md:w-[25rem]" parallax={0.33} scaleFactor={0.016} rotate={-3} position={{ top: "43%", left: "-2%" }} zIndex={34} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/Vinyl.png" className="w-[18rem] md:w-[26rem]" parallax={0.36} scaleFactor={0.012} rotate={-20} position={{ top: "55%", left: "63%" }} zIndex={33} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/Cassette.png" className="w-[26rem] md:w-[35rem]" parallax={0.26} scaleFactor={0.014} rotate={8} position={{ top: "62%", left: "-4%" }} zIndex={32} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/Pelican Case.png" className="w-[20rem] md:w-[26rem]" parallax={0.26} scaleFactor={0.013} rotate={12} position={{ top: "58%", left: "72%" }} zIndex={31} /> */}
        {/* <Asset scrollContainer={scrollRef} src="/Pot.png" className="w-[9rem] md:w-[13rem]" parallax={0.34} scaleFactor={0.013} rotate={10} position={{ top: "60%", left: "38%" }} zIndex={34} /> */}
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
