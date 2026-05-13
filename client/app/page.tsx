
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TVDisplay from "../components/TVDisplay";
import Header from "../components/Header";
import ImageMarquee from "../components/ImageMarquee";
import ExploreSection from "../components/ExploreSection";

export default function LandingPage() {
  const tvSectionRef = useRef<HTMLDivElement | null>(null);
  // once:true keeps the TV mounted at its rest position after the first reveal so it never reverse-fades
  // when the user scrolls past — that was the "uneasy fade on the bottom of the TV".
  const isTVInView = useInView(tvSectionRef, {
    once: true,
    amount: 0.15,
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
          initial={{ opacity: 0, y: 32 }}
          animate={isTVInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          // Out-expo curve (fast in, gentle settle) reads as a single seamless rise rather than an opacity+slide combo.
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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