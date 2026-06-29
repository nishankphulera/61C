"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import Asset from "./Asset";
import Card from "./Card";

const yToVw = (pct: number) => `${(pct * 4953) / 1440}vw`;
const xToVw = (pct: number) => `${pct}vw`;

const ExploreSection: React.FC = () => {
  const router = useRouter();

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isSceneInView = useInView(scrollRef, {
    // Mount one viewport ahead so the collage is ready before the user
    // reaches it, but not so eagerly that videos start decoding while the
    // user is still on the marquee/TV sections (which caused upstream jank).
    margin: "100% 0px 100% 0px",
    once: true,
  });

  return (
    <>

      {/* Mobile & Tablet: stacked nav cards (desktop uses parallax collage below) */}
      <section
        className="lg:hidden flex flex-col items-center max-w-xl mx-auto w-full mt-12 sm:mt-16 ps-[max(1rem,env(safe-area-inset-left))] pe-[max(1rem,env(safe-area-inset-right))] pb-[max(4rem,calc(env(safe-area-inset-bottom)+2rem))]"
        aria-label="Explore"
      >

        <Card
          layout="stacked"
          title="PHOTOGRAPHY"
          imageSrc="/Photography.gif"
          onClick={() => router.push("/photography")}
          rotate={-3}
          className="mx-auto w-full"
        />
        <Card
          layout="stacked"
          title="FILMS"
          imageSrc="/Films.gif"
          onClick={() => router.push("/films")}
          rotate={-6}
          className="mx-auto w-full -mt-[22%]"
        />
        <Card
          layout="stacked"
          title="DESIGN"
          imageSrc="/Design.gif"
          onClick={() => router.push("/design")}
          rotate={-7}
          className="mx-auto w-full -mt-[6%]"
        />
      </section>

      <div
        ref={scrollRef}
        className="hidden lg:block relative bg-black my-[10vh] w-full" style={{ height: "85vw" }}
      >

        {isSceneInView && (
          <>
            <Asset
              src="/Salad Bowl.webp"
              className="w-[28.3vw] opacity-64"
              rotate={-103}
              position={{
                top: yToVw(14.6),
                right: xToVw(33),
              }}
              zIndex={35}
            />
            <Asset
              src="/Vinyl.webp"
              className="w-[50.6vw] opacity-100"
              rotate={-3.7}
              position={{
                top: yToVw(13.5),
                left: xToVw(65.6),
              }}
              zIndex={36}
            />
            <Asset
              src="/SD Card.webp"
              className="w-[22.7vw]"
              rotate={12}
              position={{ top: "66vw", left: "51.6vw" }}
              zIndex={50}
            />

            <div className="absolute inset-0 z-50">
              <Asset
                src="/Clapperboard.png"
                className="w-[18.9vw] opacity-68"
                rotate={0}
                position={{
                  top: yToVw(2),
                  left: xToVw(12),
                }}
              />
              <Asset
                src="/Chair.webp"
                className="w-[23.3vw] opacity-68"
                rotate={-8}
                position={{
                  top: yToVw(0),
                  left: xToVw(30),
                }}
              />
              <Asset
                src="/Fork.webp"
                className="w-[23.3vw] opacity-68"
                rotate={-8}
                position={{
                  top: yToVw(-3),
                  right: xToVw(25),
                }}
              />
              <Asset
                src="/Megaphone.webp"
                className="w-[21.1vw] opacity-68"
                rotate={-8}
                position={{
                  top: yToVw(6),
                  right: xToVw(-3),
                }}
              />
              <Asset
                src="/Converse.webp"
                className="w-[46.7vw] opacity-68"
                rotate={0}
                position={{
                  top: yToVw(10),
                  left: xToVw(-12),
                }}
              />
              <Asset
                reverse={true}
                src="/Pelicancase.webp"
                className="w-[26.7vw] opacity-68"
                rotate={0}
                position={{
                  top: yToVw(10),
                  left: xToVw(43),
                }}
              />
            </div>

            <Asset
              reverse={true}
              src="/Drone.png"
              className="w-[26.7vw] opacity-68"
              rotate={-0.8}
              position={{
                top: yToVw(0),
                left: xToVw(-4),
              }}
              zIndex={51}
            />
            <Asset
              src="/Lego.webp"
              className="w-[37.8vw] opacity-90"
              rotate={0}
              position={{
                top: yToVw(18),
                left: xToVw(1),
              }}
              zIndex={51}
            />
            <Asset
              src="/Bottle 2.webp"
              className="w-[17.8vw] opacity-74"
              rotate={-75}
              position={{
                top: yToVw(19.9),
                right: xToVw(49.9),
              }}
              zIndex={55}
            />
            <Asset
              src="/Camcorder.webp"
              className="w-[13.3vw] opacity-68"
              rotate={5}
              position={{
                top: yToVw(9),
                right: xToVw(18),
              }}
              zIndex={260}
            />

            <Card
              title="FILMS"
              imageSrc="/Films.gif"
              width="49.1vw"
              onClick={() => router.push("/films")}
              rotate={-1}
              position={{
                top: yToVw(6),
                left: xToVw(0),
              }}
              zIndex={100}
            />
            <Card
              title="PHOTOGRAPHY"
              imageSrc="/Photography.gif"
              width="62.2vw"
              onClick={() => router.push("/photography")}
              rotate={2}
              position={{
                top: yToVw(-3),
                right: xToVw(-2),
              }}
              zIndex={52}
            />
            <Card
              title="Design"
              imageSrc="/Design.gif"
              width="62.2vw"
              onClick={() => router.push("/design")}
              rotate={2}
              position={{
                top: yToVw(17),
                right: xToVw(-2),
              }}
              zIndex={52}
            />
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(ExploreSection);
