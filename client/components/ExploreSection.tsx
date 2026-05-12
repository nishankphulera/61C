"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import Asset from "./Asset";
import Card from "./Card";

const SCENE_HEIGHT_PX = 4953;
const SCENE_WIDTH_PX = 1440;
const pctOf = (pct: number, total: number) => (pct * total) / 100;

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
      {/* Mobile: stacked nav cards (desktop uses parallax collage below) */}
      <section
        className="sm:hidden space-y-8 max-w-lg mx-auto w-full pt-6 ps-[max(1rem,env(safe-area-inset-left))] pe-[max(1rem,env(safe-area-inset-right))] pb-[max(4rem,calc(env(safe-area-inset-bottom)+2rem))]"
        aria-label="Explore"
        style={{ contain: "layout paint", contentVisibility: "auto" }}
      >
        <h2 className="text-center text-sm font-semibold tracking-[0.2em] uppercase text-white/60">
          Explore
        </h2>
        <Card
          layout="stacked"
          title="FILMS"
          imageSrc="/Films.gif"
          onClick={() => router.push("/films")}
          rotate={-3}
          className="mx-auto w-full"
        />
        <Card
          layout="stacked"
          title="PHOTOGRAPHY"
          imageSrc="/Photography.gif"
          onClick={() => router.push("/photography")}
          rotate={-6}
          className="mx-auto w-full"
        />
        <Card
          layout="stacked"
          title="DESIGN"
          imageSrc="/Design.gif"
          onClick={() => router.push("/design")}
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
            <Asset
              src="/Salad Bowl.webp"
              className="w-[16.5rem] md:w-[25.5rem] opacity-64"
              rotate={-103}
              position={{
                top: pctOf(14.6, SCENE_HEIGHT_PX),
                right: pctOf(33, SCENE_WIDTH_PX),
              }}
              zIndex={35}
            />
            <Asset
              src="/Vinyl.gif"
              className="w-[37.5rem] md:w-[45.5rem] opacity-100"
              rotate={-3.7}
              position={{
                top: pctOf(13.5, SCENE_HEIGHT_PX),
                left: pctOf(65.6, SCENE_WIDTH_PX),
              }}
              zIndex={36}
            />
            <Asset
              src="/SD Card.webp"
              className="w-[16.4rem] md:w-[20.4rem]"
              rotate={12}
              position={{ top: "66.9%", left: "51.6%" }}
              zIndex={50}
            />

            <div className="absolute inset-0 z-50">
              <Asset
                src="/Clapperv1.gif"
                className="w-[12rem] md:w-[17rem] opacity-68"
                rotate={0}
                position={{
                  top: pctOf(2, SCENE_HEIGHT_PX),
                  left: pctOf(12, SCENE_WIDTH_PX),
                }}
              />
              <Asset
                src="/Chair.webp"
                className="w-[17rem] md:w-[21rem] opacity-68"
                rotate={-8}
                position={{
                  top: pctOf(0, SCENE_HEIGHT_PX),
                  left: pctOf(30, SCENE_WIDTH_PX),
                }}
              />
              <Asset
                src="/Fork.webp"
                className="w-[17rem] md:w-[21rem] opacity-68"
                rotate={-8}
                position={{
                  top: pctOf(-3, SCENE_HEIGHT_PX),
                  right: pctOf(25, SCENE_WIDTH_PX),
                }}
              />
              <Asset
                src="/Megaphone.webp"
                className="w-[15rem] md:w-[19rem] opacity-68"
                rotate={-8}
                position={{
                  top: pctOf(6, SCENE_HEIGHT_PX),
                  right: pctOf(-3, SCENE_WIDTH_PX),
                }}
              />
              <Asset
                src="/Converse.gif"
                className="w-[32rem] md:w-[42rem] opacity-68"
                rotate={0}
                position={{
                  top: pctOf(10, SCENE_HEIGHT_PX),
                  left: pctOf(-12, SCENE_WIDTH_PX),
                }}
              />
              <Asset
                reverse={true}
                src="/Pelicancase.webp"
                className="w-[18rem] md:w-[24rem] opacity-68"
                rotate={0}
                position={{
                  top: pctOf(10, SCENE_HEIGHT_PX),
                  left: pctOf(43, SCENE_WIDTH_PX),
                }}
              />
            </div>

            <Asset
              reverse={true}
              src="/Drone.gif"
              className="w-[21rem] md:w-[24rem] opacity-68"
              rotate={-0.8}
              position={{
                top: pctOf(0, SCENE_HEIGHT_PX),
                left: pctOf(-4, SCENE_WIDTH_PX),
              }}
              zIndex={51}
            />
            <Asset
              src="/Lego.webp"
              className="w-[28rem] md:w-[34rem] opacity-90"
              rotate={0}
              position={{
                top: pctOf(18, SCENE_HEIGHT_PX),
                left: pctOf(1, SCENE_WIDTH_PX),
              }}
              zIndex={51}
            />
            <Asset
              src="/Bottle 2.webp"
              className="w-[12rem] md:w-[16rem] opacity-74"
              rotate={-75}
              position={{
                top: pctOf(19.9, SCENE_HEIGHT_PX),
                right: pctOf(49.9, SCENE_WIDTH_PX),
              }}
              zIndex={55}
            />
            <Asset
              src="/Camcorder.webp"
              className="w-[8rem] md:w-[12rem] opacity-68"
              rotate={5}
              position={{
                top: pctOf(9, SCENE_HEIGHT_PX),
                right: pctOf(18, SCENE_WIDTH_PX),
              }}
              zIndex={260}
            />

            <Card
              title="FILMS"
              imageSrc="/Films.gif"
              width="44.2rem"
              onClick={() => router.push("/films")}
              rotate={-1}
              position={{
                top: pctOf(6, SCENE_HEIGHT_PX),
                left: pctOf(0, SCENE_WIDTH_PX),
              }}
              zIndex={100}
            />
            <Card
              title="PHOTOGRAPHY"
              imageSrc="/Photography.gif"
              width="56rem"
              onClick={() => router.push("/photography")}
              rotate={2}
              position={{
                top: pctOf(-3, SCENE_HEIGHT_PX),
                right: pctOf(-2, SCENE_WIDTH_PX),
              }}
              zIndex={52}
            />
            <Card
              title="Design"
              imageSrc="/Design.gif"
              width="56rem"
              onClick={() => router.push("/comingsoon")}
              rotate={2}
              position={{
                top: pctOf(17, SCENE_HEIGHT_PX),
                right: pctOf(-2, SCENE_WIDTH_PX),
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
