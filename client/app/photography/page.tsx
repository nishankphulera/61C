"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import PhotographyCategoryAccordion from "@/components/PhotographyCategoryAccordion";
import ProductFAndB from "@/components/ProductFAndB";
import AutomobileLifestyle from "@/components/AutomobileLifestyle";
import ArtistProfiles from "@/components/ArtistProfiles";
import Fashion from "@/components/Fashion";
import EventsAndShows from "@/components/EventsAndShows";
import Hospitality from "@/components/Hospitality";
import PhotographySpaces from "@/components/PhotographySpaces";
import { PhotographyLightboxProvider } from "@/components/PhotographyLightboxContext";
import { fetchPublicContent } from "@/lib/api";
import { compareContentByOrder, ContentItem } from "@/lib/content";
import { normalizeGalleryImageUrl } from "@/lib/mediaUrls";

export default function PhotographyPage() {
  const fnbRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const hospitalityRef = useRef<HTMLDivElement>(null);
  const spacesRef = useRef<HTMLDivElement>(null);
  const fashionRef = useRef<HTMLDivElement>(null);
  const automobilesRef = useRef<HTMLDivElement>(null);
  const artistProfilesRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  const isFnbInView = useInView(fnbRef, { once: true, amount: 0.2 });
  const isProductInView = useInView(productRef, { once: true, amount: 0.2 });
  const isHospitalityInView = useInView(hospitalityRef, { once: true, amount: 0.2 });
  const isSpacesInView = useInView(spacesRef, { once: true, amount: 0.2 });
  const isFashionInView = useInView(fashionRef, {
    once: true,
    amount: 0.22,
    margin: "-12% 0px -30% 0px",
  });
  const isAutomobilesInView = useInView(automobilesRef, { once: true, amount: 0.2 });
  const isArtistInView = useInView(artistProfilesRef, {
    once: true,
    amount: 0.32,
    margin: "-10% 0px -36% 0px",
  });
  const isEventsInView = useInView(eventsRef, {
    once: true,
    amount: 0.15,
    margin: "-14% 0px -32% 0px",
  });

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
  const [rows, setRows] = useState<ContentItem[]>([]);

  useEffect(() => {
    fetchPublicContent({ page: "photography" })
      .then(setRows)
      .catch(() => setRows([]));
  }, []);

  const imagesBySection = (section: string): string[] =>
    rows
      .filter((item) => item.section === section)
      .sort(compareContentByOrder)
      .flatMap((item) => {
        const candidates = item.images?.length
          ? item.images
          : [item.thumbnailUrl || item.youtubeUrl || item.videoUrl || ""];
        return candidates
          .map((candidate) => normalizeGalleryImageUrl(candidate, item))
          .filter((image): image is string => Boolean(image));
      });

  return (
    <PhotographyLightboxProvider>
      <main className="min-h-screen w-full bg-black pt-[4.5rem]">
        <Header />
        <div className="container mx-auto px-4 py-8 md:py-12">
          <PhotographyCategoryAccordion className="mb-12 md:mb-16" />

          <motion.div
            id="photography-fnb"
            ref={fnbRef}
            className="scroll-mt-[4.5rem]"
            variants={sectionVariants}
            initial="hidden"
            animate={isFnbInView ? "visible" : "hidden"}
          >
            <ProductFAndB
              images={imagesBySection("fnb")}
              heading="F&B"
              lightboxAlt="F&B"
            />
          </motion.div>

          <motion.div
            id="photography-product"
            ref={productRef}
            className="scroll-mt-[4.5rem]"
            variants={sectionVariants}
            initial="hidden"
            animate={isProductInView ? "visible" : "hidden"}
          >
            <ProductFAndB
              images={imagesBySection("product")}
              heading="Product"
              lightboxAlt="Product"
            />
          </motion.div>

          <motion.div
            id="photography-hospitality"
            ref={hospitalityRef}
            className="scroll-mt-[4.5rem]"
            variants={sectionVariants}
            initial="hidden"
            animate={isHospitalityInView ? "visible" : "hidden"}
          >
            <Hospitality images={imagesBySection("hospitality")} />
          </motion.div>

          <motion.div
            id="photography-spaces"
            ref={spacesRef}
            className="scroll-mt-[4.5rem]"
            variants={sectionVariants}
            initial="hidden"
            animate={isSpacesInView ? "visible" : "hidden"}
          >
            <PhotographySpaces images={imagesBySection("spaces")} />
          </motion.div>

          <motion.div
            id="photography-fashion"
            ref={fashionRef}
            className="scroll-mt-[4.5rem]"
            variants={sectionVariants}
            initial="hidden"
            animate={isFashionInView ? "visible" : "hidden"}
          >
            <Fashion images={imagesBySection("fashion-lifestyle")} />
          </motion.div>

          <motion.div
            id="photography-automobiles"
            ref={automobilesRef}
            className="scroll-mt-[4.5rem]"
            variants={sectionVariants}
            initial="hidden"
            animate={isAutomobilesInView ? "visible" : "hidden"}
          >
            <AutomobileLifestyle images={imagesBySection("automobiles")} />
          </motion.div>

          <motion.div
            id="photography-artist-profiles"
            ref={artistProfilesRef}
            className="scroll-mt-[4.5rem]"
            variants={sectionVariants}
            initial="hidden"
            animate={isArtistInView ? "visible" : "hidden"}
          >
            <ArtistProfiles images={imagesBySection("artist-profiles")} />
          </motion.div>

          <motion.div
            id="photography-events"
            ref={eventsRef}
            className="scroll-mt-[4.5rem]"
            variants={sectionVariants}
            initial="hidden"
            animate={isEventsInView ? "visible" : "hidden"}
          >
            <EventsAndShows images={imagesBySection("events")} />
          </motion.div>
        </div>
      </main>
    </PhotographyLightboxProvider>
  );
}
