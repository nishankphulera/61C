"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { CSSProperties } from "react";

type OverlayLabelLayout = {
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;
  translateX?: string;
  translateY?: string;
  width?: string;
  maxWidth?: string;
  /** e.g. "2.5rem", "clamp(1.2rem, 4vw, 2.8rem)" — omit for default responsive sizes */
  fontSize?: string;
  lineHeight?: string;
  textAlign?: "left" | "center" | "right";
  /** 0-based index in `label` where the second line starts */
  lineBreakAt?: number;
};

const DEFAULT_LABEL_LAYOUT = {
  left: "50%",
  top: "50%",
  translateX: "-50%",
  translateY: "-50%",
  textAlign: "center" as const,
};

function buildOverlayLabelStyle(layout?: OverlayLabelLayout): CSSProperties {
  const merged = { ...DEFAULT_LABEL_LAYOUT, ...layout };
  const style: CSSProperties = {
    left: merged.left,
    top: merged.top,
    transform: `translate(${merged.translateX}, ${merged.translateY})`,
    textAlign: merged.textAlign,
  };
  if (layout?.right !== undefined) style.right = layout.right;
  if (layout?.bottom !== undefined) style.bottom = layout.bottom;
  if (layout?.width !== undefined) style.width = layout.width;
  if (layout?.maxWidth !== undefined) style.maxWidth = layout.maxWidth;
  if (layout?.fontSize !== undefined) style.fontSize = layout.fontSize;
  if (layout?.lineHeight !== undefined) style.lineHeight = layout.lineHeight;
  return style;
}

function hasCustomLabelWidth(layout?: OverlayLabelLayout): boolean {
  return layout?.width !== undefined || layout?.maxWidth !== undefined;
}

function hasCustomLabelFontSize(layout?: OverlayLabelLayout): boolean {
  return layout?.fontSize !== undefined;
}

function renderOverlayLabel(label: string, layout?: OverlayLabelLayout) {
  const at = layout?.lineBreakAt;
  if (at === undefined || at <= 0 || at >= label.length) {
    return label;
  }
  return (
    <>
      {label.slice(0, at)}
      <br />
      {label.slice(at)}
    </>
  );
}

const CORE_SERVICE_LABEL_WIDTH_CLASS =
  "w-[min(max(158%,24rem),min(calc(100vw-3rem),42rem))] sm:w-[min(max(158%,27rem),min(calc(100vw-4rem),46rem))] md:w-[min(max(158%,29rem),min(calc(100vw-5rem),50rem))]";

const SHOWCASE_LABEL_WIDTH_CLASS =
  "w-[min(29rem,calc(100vw-2rem))] sm:w-[min(33rem,calc(100vw-2.5rem))] md:w-[min(38rem,calc(100vw-3rem))] lg:w-[min(42rem,calc(100vw-3.5rem))] xl:w-[min(45rem,calc(100vw-4rem))]";

/** Optional per-item labelLayout: position, width, fontSize, lineHeight, textAlign, lineBreakAt */
const CORE_SERVICES: readonly { label: string; labelLayout?: OverlayLabelLayout }[] = [
  { label: "Film & video production",labelLayout: {
    left: "88%",
    top: "52%",
    width: "min(28rem, 90vw)",
    textAlign: "center",
    lineBreakAt: 6,

  }, },
  { label: "Social-first & digital content",labelLayout: {
    left: "78%",
    top: "42%",
    width: "min(28rem, 90vw)",
    textAlign: "right",
    lineBreakAt: 12,
  }, },
  { label: "Studio & outdoor photography",labelLayout: {
    left: "68%",
    top: "62%",
    width: "min(28rem, 90vw)",
    textAlign: "center",
    lineBreakAt: 6,
  }, },
  { label: "Branded campaigns & assets",labelLayout: {
    left: "48%",
    top: "52%",
    width: "min(28rem, 90vw)",
    textAlign: "center",
    lineBreakAt: 17,
  }, },
  { label: "Branding & design",labelLayout: {
    left: "78%",
    top: "52%",
    width: "min(28rem, 90vw)",
    textAlign: "center",
    lineBreakAt: 10,
  }, },
  { label: "Creative direction & concept development",labelLayout: {
    left: "78%",
    top: "52%",
    width: "min(28rem, 90vw)",
    textAlign: "center",
    lineBreakAt: 18,
  }, },
];

/** 4×3 showcase — optional labelLayout: position, width, fontSize, lineBreakAt, etc. */
const INDUSTRY_SHOWCASE: readonly {
  label: string;
  image: string;
  labelLayout?: OverlayLabelLayout;
}[] = [
  { label: "Brand films", image: "/brnad.jpg",labelLayout: {
    left: "82%",
    top: "28%",
    translateX: "-50%",
    translateY: "-50%",
    width: "min(12rem, 55vw)",
    fontSize: "2.8rem",
    lineHeight: "1.1",
  }, },
  { label: "Documentaries", image: "/colage2.jpg",labelLayout: {
    left: "92%",
    top: "28%",
    translateX: "-50%",
    translateY: "-50%",
    width: "min(12rem, 45vw)",
    fontSize: "2.8rem",
    lineHeight: "1.1",
    lineBreakAt: 4,

  }, },
  { label: "Music Videos", image: "/colage3.jpg",labelLayout: {
    left: "92%",
    top: "28%",
    translateX: "-50%",
    translateY: "-50%",
    width: "min(22rem, 95vw)",
    fontSize: "2.8rem",
    lineHeight: "1.1",
    lineBreakAt: 6,
  }, },
  { label: "Fashion & Lifestyle", image: "/fashion ndlifestyle.jpg",labelLayout: {
    left: "92%",
    top: "28%",
    translateX: "-50%",
    translateY: "-50%",
    width: "min(22rem, 95vw)",
    fontSize: "2.8rem",
    lineHeight: "1.1",
  }, },
  { label: "Products", image: "/Bottle 2.webp",labelLayout: {
    left: "42%",
    top: "18%",
    translateX: "-50%",
    translateY: "-50%",
    width: "min(22rem, 95vw)",
    fontSize: "2.8rem",
    lineHeight: "1.1",
  }, },
  { label: "Hospitality", image: "/Frame2.jpg",labelLayout: {
    left: "78%",
    top: "28%",
    translateX: "-50%",
    translateY: "-50%",
    width: "min(22rem, 95vw)",
    fontSize: "3.0rem",
    lineHeight: "1.1",
    lineBreakAt: 6,
  }, },
  { label: "F&B", image: "/f&b.jpg",labelLayout: {
    left: "100%",
    top: "18%",
    translateX: "-50%",
    translateY: "-50%",
    width: "min(22rem, 95vw)",
    fontSize: "2.8rem",
    lineHeight: "1.1",
  }, },
  { label: "Architecture & Real estate", image: "/spacearchitech.jpg",labelLayout: {
    left: "82%",
    top: "24%",
    translateX: "-50%",
    translateY: "-50%",
    width: "min(22rem, 95vw)",
    fontSize: "2.4rem",
    lineHeight: "1.1",
    lineBreakAt: 12,
  }, },
  { label: "Automobiles", image: "/auto.jpg",labelLayout: {
    left: "82%",
    top: "28%",
    translateX: "-50%",
    translateY: "-50%",
    width: "min(22rem, 95vw)",
    fontSize: "2.8rem",
    lineHeight: "1.1",
    lineBreakAt: 4,
  }, },
  { label: "Artist Profiles", image: "/aetisrprfile.jpg",labelLayout: {
    left: "72%",
    top: "28%",
    translateX: "-50%",
    translateY: "-50%",
    width: "min(22rem, 95vw)",
    fontSize: "2.8rem",
    lineHeight: "1.1",
    lineBreakAt: 6,
  }, },
  { label: "Events", image: "/eventshows.jpg",labelLayout: {
    left: "82%",
    top: "16%",
    translateX: "-50%",
    translateY: "-50%",
    width: "min(22rem, 95vw)",
    fontSize: "2.8rem",
    lineHeight: "1.1",
  }, },
  { label: "Corporate films", image: "cooporatefilms.jpg",labelLayout: {
    left: "102%",
    top: "28%",
    translateX: "-50%",
    translateY: "-50%",
    width: "min(22rem, 95vw)",
    fontSize: "2.8rem",
    lineHeight: "1.1",
    lineBreakAt: 9,
  }, },
];

const labelTypographyBase =
  "font-extrabold tracking-[-0.05em] text-[#FFFF00]";

const labelTypographySize =
  "leading-[1.05] text-[clamp(1.35rem,3.75vw+0.45rem,2.5rem)] sm:text-[clamp(1.45rem,2.85vw+0.55rem,2.85rem)] md:text-[clamp(1.6rem,2.35vw+0.65rem,3.1rem)]";

const showcaseLabelTypographyBase =
  "font-extrabold tracking-[-0.04em] text-white drop-shadow-[0_3px_20px_rgba(0,0,0,0.95)] hyphens-none";

const showcaseLabelTypographySize =
  "leading-[1.06] text-[clamp(1.38rem,3.35vw+0.65rem,2.35rem)] sm:text-[clamp(1.52rem,2.65vw+0.74rem,2.8rem)] md:text-[clamp(1.72rem,2.05vw+0.85rem,3.2rem)] lg:text-[clamp(1.85rem,1.65vw+0.92rem,3.6rem)] xl:text-[clamp(1.92rem,1.4vw+1rem,3.95rem)]";

export default function CoreServices() {
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
          {CORE_SERVICES.map(({ label, labelLayout }) => (
            <li
              key={label}
              className="relative flex w-full items-center justify-center overflow-visible py-12 sm:py-14 md:py-16"
            >
              <div className="relative w-[clamp(11.25rem,34vw,15.75rem)] shrink-0 sm:w-[clamp(12rem,31vw,17rem)] md:w-[clamp(12.75rem,28vw,18.75rem)]">
                <div className="aspect-square w-full bg-[#3B44F6]" aria-hidden />
                <p
                  style={buildOverlayLabelStyle(labelLayout)}
                  className={`pointer-events-none absolute z-10 px-3 text-balance ${labelTypographyBase} ${
                    hasCustomLabelFontSize(labelLayout) ? "" : labelTypographySize
                  } ${hasCustomLabelWidth(labelLayout) ? "" : CORE_SERVICE_LABEL_WIDTH_CLASS}`}
                >
                  {renderOverlayLabel(label, labelLayout)}
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
            {INDUSTRY_SHOWCASE.map(({ label, image, labelLayout }) => (
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
                    style={buildOverlayLabelStyle(labelLayout)}
                    className={`pointer-events-none absolute z-10 px-2 text-pretty sm:px-2.5 md:px-3 ${showcaseLabelTypographyBase} ${
                      hasCustomLabelFontSize(labelLayout) ? "" : showcaseLabelTypographySize
                    } ${hasCustomLabelWidth(labelLayout) ? "" : SHOWCASE_LABEL_WIDTH_CLASS}`}
                  >
                    {renderOverlayLabel(label, labelLayout)}
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
