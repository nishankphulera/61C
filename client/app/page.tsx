
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TVDisplay from "../components/TVDisplay";
import Header from "../components/Header";
import ImageMarquee from "../components/ImageMarquee";
import ExploreSection from "../components/ExploreSection";

export default function LandingPage() {
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
      <div
        className="relative w-full py-6 md:py-10 max-sm:ps-[max(1rem,env(safe-area-inset-left))] max-sm:pe-[max(1rem,env(safe-area-inset-right))]"
        style={{
          contain: "layout paint",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        <img
          src="/HomePage.gif"
          alt="Homepage composition preview"
          className="block h-auto w-full"
          decoding="async"
          fetchPriority="high"
        />
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

      <ExploreSection />
    </main>
  );
}