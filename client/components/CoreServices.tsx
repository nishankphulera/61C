"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const CORE_SERVICES = [
  "Film & video production",
  "Social-first & digital content",
  "Studio & outdoor photography",
  "Branded campaigns & assets",
  "Branding & design",
  "Creative direction & concept development",
] as const;

/** 4×3 showcase — square thumbs, white type wider than cell (Figma) */
const INDUSTRY_SHOWCASE = [
  { label: "Brand films", image: "/colage1.jpg" },
  { label: "Documentaries", image: "/colage2.jpg" },
  { label: "Music Videos", image: "/colage3.jpg" },
  { label: "Fashion & Lifestyle", image: "/Frame1.jpg" },
  { label: "Products", image: "/Bottle 2.webp" },
  { label: "Hospitality", image: "/Frame2.jpg" },
  { label: "F&B", image: "/Frame3.jpg" },
  { label: "Architecture & Real estate", image: "/Frame4.jpg" },
  { label: "Automobiles", image: "/Frame5.jpg" },
  { label: "Artist Profiles", image: "/Frame6.jpg" },
  { label: "Events", image: "/brands/12.webp" },
  { label: "Corporate films", image: "/brands/18.webp" },
] as const;

const labelTypography =
  "font-extrabold leading-[1.05] tracking-[-0.05em] text-[#FFFF00] text-[clamp(1.35rem,3.75vw+0.45rem,2.5rem)] sm:text-[clamp(1.45rem,2.85vw+0.55rem,2.85rem)] md:text-[clamp(1.6rem,2.35vw+0.65rem,3.1rem)]";

export default function CoreServices() {
  const showcaseLabelTypography =
    "font-extrabold leading-[1.06] tracking-[-0.04em] text-white drop-shadow-[0_3px_20px_rgba(0,0,0,0.95)] hyphens-none text-[clamp(1.38rem,3.35vw+0.65rem,2.35rem)] sm:text-[clamp(1.52rem,2.65vw+0.74rem,2.8rem)] md:text-[clamp(1.72rem,2.05vw+0.85rem,3.2rem)] lg:text-[clamp(1.85rem,1.65vw+0.92rem,3.6rem)] xl:text-[clamp(1.92rem,1.4vw+1rem,3.95rem)]";

  return (
    <section
      className="relative z-10 bg-black px-8 pt-10 pb-20 md:px-12 md:pt-14 md:pb-28 lg:px-16 lg:pt-16 lg:pb-32"
      aria-labelledby="core-services-heading"
    >
      <div className="mx-auto w-full max-w-7xl">
        <p className="mx-auto w-fit max-w-full text-left text-base font-medium leading-[1.28] tracking-[-0.02em] text-[#FFFF00] sm:text-2xl sm:leading-[1.28] md:text-[2.5rem] md:leading-[1.26] lg:text-[2.75rem] lg:leading-[1.26]">
          61C Studios is a creative production house crafting{" "}
          <br className="hidden sm:block" />
          cinematic visual content across film, digital, print{" "}
          <br className="hidden sm:block" />
          and branded media. Built on over a decade of{" "}
          <br className="hidden sm:block" />
          experience, we partner with artists, corporate,{" "}
          <br className="hidden sm:block" />
          brands and small businesses to create work that{" "}
          <br className="hidden sm:block" />
          feels thoughtful, culturally aware and visually{" "}
          <br className="hidden sm:block" />
          distinct.
        </p>

        <h2
          id="core-services-heading"
          className="mt-10 mb-2 text-center text-[clamp(2.75rem,7vw,5rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-[#FFFF00] md:mt-12 lg:mt-14"
        >
          Core Services
        </h2>

        <motion.ul
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid list-none grid-cols-1 gap-3 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:gap-6"
          aria-label="Service offerings"
        >
          {CORE_SERVICES.map((label) => (
            <li
              key={label}
              className="relative flex w-full items-center justify-center overflow-visible py-12 sm:py-14 md:py-16"
            >
              <div className="relative w-[clamp(11.25rem,34vw,15.75rem)] shrink-0 sm:w-[clamp(12rem,31vw,17rem)] md:w-[clamp(12.75rem,28vw,18.75rem)]">
                <div className="aspect-square w-full bg-[#3B44F6]" aria-hidden />
                <p
                  className={`absolute left-1/2 top-1/2 z-10 w-[min(max(158%,24rem),min(calc(100vw-3rem),42rem))] -translate-x-1/2 -translate-y-1/2 px-3 text-center text-balance sm:w-[min(max(158%,27rem),min(calc(100vw-4rem),46rem))] sm:px-4 md:w-[min(max(158%,29rem),min(calc(100vw-5rem),50rem))] md:px-6 ${labelTypography}`}
                >
                  {label}
                </p>
              </div>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          className="mt-14 md:mt-20 lg:mt-24"
          aria-labelledby="industry-showcase-heading"
        >
          <h3
            id="industry-showcase-heading"
            className="sr-only"
          >
            Industries and formats
          </h3>
          <ul
            className="mx-auto grid w-full max-w-[min(100%,41rem)] list-none grid-cols-2 justify-items-center gap-x-6 gap-y-11 p-0 sm:max-w-[min(100%,46rem)] sm:gap-x-7 sm:gap-y-12 md:max-w-[min(100%,52rem)] md:grid-cols-3 md:gap-x-8 md:gap-y-15 lg:max-w-[min(100%,62rem)] lg:grid-cols-4 lg:gap-x-10 lg:gap-y-14"
          >
            {INDUSTRY_SHOWCASE.map(({ label, image }) => (
              <li
                key={label}
                className="w-full pb-19 pt-1 sm:pb-23 md:pb-28 lg:pb-32"
              >
                <div className="relative mx-auto w-full max-w-37 overflow-visible sm:max-w-40 md:max-w-41 lg:max-w-44">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 160px, (max-width: 1024px) 180px, 200px"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden />
                  </div>
                  <p
                    className={`pointer-events-none absolute left-1/2 top-1/2 z-10 w-[min(29rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 px-2 text-center text-pretty sm:w-[min(33rem,calc(100vw-2.5rem))] sm:px-2.5 md:w-[min(38rem,calc(100vw-3rem))] md:px-3 lg:w-[min(42rem,calc(100vw-3.5rem))] xl:w-[min(45rem,calc(100vw-4rem))] ${showcaseLabelTypography}`}
                  >
                    {label}
                  </p>

                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <div
          className="mt-14 max-w-none space-y-8 text-left font-semibold leading-[1.28] tracking-[-0.02em] text-[#FFFF00] md:mt-20 md:space-y-10 lg:mt-24"
          aria-label="How we work across industries"
        >
          <p className="text-[clamp(1.22rem,2.65vw+0.55rem,2.1rem)] sm:text-[clamp(1.3rem,2.25vw+0.62rem,2.42rem)] md:text-[clamp(1.45rem,1.9vw+0.68rem,2.8rem)] lg:text-[clamp(1.52rem,1.6vw+0.72rem,3.15rem)] xl:text-[clamp(1.58rem,1.35vw+0.75rem,3.35rem)]">
            We work across a wide range of industries and formats including brand and corporate
            films, documentaries, music videos, hospitality, food &amp; beverage, products,
            fashion &amp; lifestyle, architecture &amp; real estate, automobiles, artist profiles,
            and events.
          </p>
          <p className="text-[clamp(1.1rem,2.45vw+0.52rem,1.92rem)] sm:text-[clamp(1.15rem,2.05vw+0.58rem,2.2rem)] md:text-[clamp(1.28rem,1.72vw+0.62rem,2.55rem)] lg:text-[clamp(1.35rem,1.42vw+0.68rem,2.85rem)]">
            Every project is approached with a well defined creative vision and a clear understanding
            of audience connection. In a nutshell, our cinematic storytelling establishes your identity,
            purpose and ethos.
          </p>
        </div>
      </div>
    </section>
  );
}
