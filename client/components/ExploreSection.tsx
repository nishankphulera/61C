"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
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
    <div className="">

      {/* Mobile: stacked nav cards (tab/desktop use absolute layout below) */}
      <section
        className="sm:hidden relative w-full"
        aria-label="Explore"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="/phoneAssetBackground.png" alt="" className="w-full h-full" />
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto w-full ps-[max(1rem,env(safe-area-inset-left))] pe-[max(1rem,env(safe-area-inset-right))] pb-[max(4rem,calc(env(safe-area-inset-bottom)+2rem))]">
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
        </div>
      </section>

      <div
        ref={scrollRef}
        className="hidden sm:block relative bg-black my-[10vh] w-full" style={{ height: "85vw" }}
      >

        {isSceneInView && (
          <>
            <div className="absolute inset-0 z-0 pointer-events-none flex items-start justify-center">
              <img src="/ipadAssetBackground.png" alt="" className="w-full h-full lg:hidden" />
              <img src="/desktopAssetBackground.png" alt="" className="hidden lg:block w-full h-auto" />
            </div>


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
    </div>
  );
};

export default React.memo(ExploreSection);
