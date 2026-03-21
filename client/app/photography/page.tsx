"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PhotographySection from "@/components/PhotographySection";
import ProductFAndB from "@/components/ProductFAndB";
import AutomobileLifestyle from "@/components/AutomobileLifestyle";
import ArtistProfiles from "@/components/ArtistProfiles";
import Fashion from "@/components/Fashion";
import EventsAndShows from "@/components/EventsAndShows";

export default function PhotographyPage() {
  const productFAndBRef = useRef<HTMLDivElement>(null);
  const automobileRef = useRef<HTMLDivElement>(null);
  const artistProfilesRef = useRef<HTMLDivElement>(null);
  const fashionRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  // In view hooks for scroll animations
  const isProductInView = useInView(productFAndBRef, { once: true, amount: 0.2 });
  const isAutomobileInView = useInView(automobileRef, { once: true, amount: 0.2 });
  const isArtistInView = useInView(artistProfilesRef, { once: true, amount: 0.2 });
  const isFashionInView = useInView(fashionRef, { once: true, amount: 0.2 });
  const isEventsInView = useInView(eventsRef, { once: true, amount: 0.2 });

  // Animation variants
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

  return (
    <main className="min-h-screen bg-black w-full">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Photography Section */}
        <PhotographySection />

        {/* Product F&B Section */}
        <motion.div
          ref={productFAndBRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isProductInView ? "visible" : "hidden"}
        >
          <ProductFAndB />
        </motion.div>

        {/* Automobile Lifestyle Section */}
        <motion.div
          ref={automobileRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isAutomobileInView ? "visible" : "hidden"}
        >
          <AutomobileLifestyle />
        </motion.div>

        {/* Artist Profiles Section */}
        <motion.div
          ref={artistProfilesRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isArtistInView ? "visible" : "hidden"}
        >
          <ArtistProfiles />
        </motion.div>

        {/* Fashion Section */}
        <motion.div
          ref={fashionRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isFashionInView ? "visible" : "hidden"}
        >
          <Fashion />
        </motion.div>

        {/* Events & Shows Section */}
        <motion.div
          ref={eventsRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isEventsInView ? "visible" : "hidden"}
        >
          <EventsAndShows />
        </motion.div>
      </div>
    </main>
  );
}

