"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import PhotographyCategoryAccordion from "@/components/PhotographyCategoryAccordion";
import ProductFAndB from "@/components/ProductFAndB";
import AutomobileLifestyle from "@/components/AutomobileLifestyle";
import ArtistProfiles from "@/components/ArtistProfiles";
import Fashion from "@/components/Fashion";
import EventsAndShows from "@/components/EventsAndShows";
import Hospitality from "@/components/Hospitality";

export default function PhotographyPage() {
  const productFAndBRef = useRef<HTMLDivElement>(null);
  const automobileRef = useRef<HTMLDivElement>(null);
  const artistProfilesRef = useRef<HTMLDivElement>(null);
  const fashionRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const hospitalityRef = useRef<HTMLDivElement>(null);

  // In view hooks for scroll animations
  const isProductInView = useInView(productFAndBRef, { once: true, amount: 0.2 });
  const isAutomobileInView = useInView(automobileRef, { once: true, amount: 0.2 });
  // Stacked pair (Fashion → Artist): band-based detection so neither fires on edge-peeks;
  // Artist uses a stricter band + higher amount so it reveals after Fashion is on-screen.
  const isFashionInView = useInView(fashionRef, {
    once: true,
    amount: 0.22,
    margin: "-12% 0px -30% 0px",
  });
  const isArtistInView = useInView(artistProfilesRef, {
    once: true,
    amount: 0.32,
    margin: "-10% 0px -36% 0px",
  });
  // Tuned for Events sitting mid-page: animate when block crosses the “readable” band (not edge-peeks)
  const isEventsInView = useInView(eventsRef, {
    once: true,
    amount: 0.15,
    margin: "-14% 0px -32% 0px",
  });
  const isHospitalityInView = useInView(hospitalityRef, {
    once: true,
    amount: 0.2,
  });

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
    <main className="min-h-screen w-full bg-black pt-[4.5rem]">
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <PhotographyCategoryAccordion className="mb-12 md:mb-16" />

        {/* Photography Section */}
        {/* <PhotographySection /> */}

        {/* Product F&B Section */}
        <motion.div
          id="photography-product-fnb"
          ref={productFAndBRef}
          className="scroll-mt-[4.5rem]"
          variants={sectionVariants}
          initial="hidden"
          animate={isProductInView ? "visible" : "hidden"}
        >
          <ProductFAndB />
        </motion.div>

        {/* Automobile Lifestyle Section */}
        <motion.div
          id="photography-automobile"
          ref={automobileRef}
          className="scroll-mt-[4.5rem]"
          variants={sectionVariants}
          initial="hidden"
          animate={isAutomobileInView ? "visible" : "hidden"}
        >
          <AutomobileLifestyle />
        </motion.div>
        {/* Events & Shows Section */}
        <motion.div
          id="photography-events"
          ref={eventsRef}
          className="scroll-mt-[4.5rem]"
          variants={sectionVariants}
          initial="hidden"
          animate={isEventsInView ? "visible" : "hidden"}
        >
          <EventsAndShows />
        </motion.div>

        <motion.div
          id="photography-hospitality"
          ref={hospitalityRef}
          className="scroll-mt-[4.5rem]"
          variants={sectionVariants}
          initial="hidden"
          animate={isHospitalityInView ? "visible" : "hidden"}
        >
          <Hospitality />
        </motion.div>

        {/* Fashion Section */}
        <motion.div
          id="photography-fashion"
          ref={fashionRef}
          className="scroll-mt-[4.5rem]"
          variants={sectionVariants}
          initial="hidden"
          animate={isFashionInView ? "visible" : "hidden"}
        >
          <Fashion />
        </motion.div>
        {/* Artist Profiles Section */}
        <motion.div
          id="photography-artist-profiles"
          ref={artistProfilesRef}
          className="scroll-mt-[4.5rem]"
          variants={sectionVariants}
          initial="hidden"
          animate={isArtistInView ? "visible" : "hidden"}
        >
          <ArtistProfiles />
        </motion.div>

      </div>
    </main>
  );
}

