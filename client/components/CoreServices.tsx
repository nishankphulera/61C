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
  if (merged.right !== undefined) style.right = merged.right;
  if (merged.bottom !== undefined) style.bottom = merged.bottom;
  if (merged.width !== undefined) style.width = merged.width;
  if (merged.maxWidth !== undefined) style.maxWidth = merged.maxWidth;

  if (merged.fontSize) {
    if (merged.fontSize.endsWith("rem") && !merged.fontSize.startsWith("clamp")) {
      const val = parseFloat(merged.fontSize);
      style.fontSize = `clamp(${val * 0.55}rem, ${val * 1.8}vw, ${val}rem)`;
    } else {
      style.fontSize = merged.fontSize;
    }
  }

  if (merged.lineHeight !== undefined) style.lineHeight = merged.lineHeight;

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

const SHOWCASE_LABEL_WIDTH_CLASS =
  "w-[min(29rem,calc(100vw-2rem))] sm:w-[min(33rem,calc(100vw-2.5rem))] md:w-[min(38rem,calc(100vw-3rem))] lg:w-[min(42rem,calc(100vw-3.5rem))] xl:w-[min(45rem,calc(100vw-4rem))]";

const CORE_SERVICES: readonly { label: string; image: string }[] = [
  { label: "Film & video production", image: "/cv1.png" },
  { label: "Social-first & digital content", image: "/cv2.png" },
  { label: "Studio & outdoor photography", image: "/cv3.png" },
  { label: "Branded campaigns & assets", image: "/cv4.png" },
  { label: "Branding & design", image: "/cv5.png" },
  { label: "Creative direction & concept development", image: "/cv6.png" },
];

/** 4×3 showcase — optional labelLayout: position, width, fontSize, lineBreakAt, etc. */
const INDUSTRY_SHOWCASE: readonly {
  label: string;
  image: string;
  labelLayout?: OverlayLabelLayout;
}[] = [
    {
      label: "", image: "/brand films .png", labelLayout: {
        left: "82%",
        top: "28%",
        translateX: "-50%",
        translateY: "-50%",
        width: "min(22rem, 95vw)",
        fontSize: "2.8rem",
        lineHeight: "1.1",
      },
    },
    {
      label: "", image: "/documentaries.png", labelLayout: {
        left: "92%",
        top: "28%",
        translateX: "-50%",
        translateY: "-50%",
        width: "min(22rem, 95vw)",
        fontSize: "2.8rem",
        lineHeight: "1.1",
        lineBreakAt: 4,

      },
    },
    {
      label: "", image: "/music videos.png", labelLayout: {
        left: "92%",
        top: "28%",
        translateX: "-50%",
        translateY: "-50%",
        width: "min(22rem, 95vw)",
        fontSize: "2.8rem",
        lineHeight: "1.1",
        lineBreakAt: 6,
      },
    },
    {
      label: "", image: "/fashion & lifestyle.png", labelLayout: {
        left: "92%",
        top: "28%",
        translateX: "-50%",
        translateY: "-50%",
        width: "min(22rem, 95vw)",
        fontSize: "2.8rem",
        lineHeight: "1.1",
        lineBreakAt: 10,
      },
    },
    {
      label: "", image: "/Products.png", labelLayout: {
        left: "42%",
        top: "18%",
        translateX: "-50%",
        translateY: "-50%",
        width: "min(22rem, 95vw)",
        fontSize: "2.8rem",
        lineHeight: "1.1",
      },
    },
    {
      label: "", image: "/hospitality.png", labelLayout: {
        left: "78%",
        top: "28%",
        translateX: "-50%",
        translateY: "-50%",
        width: "min(22rem, 95vw)",
        fontSize: "3.0rem",
        lineHeight: "1.1",
        lineBreakAt: 6,
      },
    },
    {
      label: "", image: "/f&b.png", labelLayout: {
        left: "100%",
        top: "18%",
        translateX: "-50%",
        translateY: "-50%",
        width: "min(22rem, 95vw)",
        fontSize: "2.8rem",
        lineHeight: "1.1",
      },
    },
    {
      label: "", image: "/Arch & real estate.png", labelLayout: {
        left: "82%",
        top: "24%",
        translateX: "-50%",
        translateY: "-50%",
        width: "min(22rem, 95vw)",
        fontSize: "2.4rem",
        lineHeight: "1.1",
        lineBreakAt: 12,
      },
    },
    {
      label: "", image: "/automotives.png", labelLayout: {
        left: "82%",
        top: "28%",
        translateX: "-50%",
        translateY: "-50%",
        width: "min(22rem, 95vw)",
        fontSize: "2.8rem",
        lineHeight: "1.1",
        lineBreakAt: 4,
      },
    },
    {
      label: "", image: "/artist profile.png", labelLayout: {
        left: "72%",
        top: "28%",
        translateX: "-50%",
        translateY: "-50%",
        width: "min(22rem, 95vw)",
        fontSize: "2.8rem",
        lineHeight: "1.1",
        lineBreakAt: 6,
      },
    },
    {
      label: "", image: "/events.png", labelLayout: {
        left: "82%",
        top: "16%",
        translateX: "-50%",
        translateY: "-50%",
        width: "min(22rem, 95vw)",
        fontSize: "2.8rem",
        lineHeight: "1.1",
      },
    },
    {
      label: "", image: "/Corporate films.png", labelLayout: {
        left: "102%",
        top: "28%",
        translateX: "-50%",
        translateY: "-50%",
        width: "min(22rem, 95vw)",
        fontSize: "2.8rem",
        lineHeight: "1.1",
        lineBreakAt: 9,
      },
    },
  ];

const labelTypographyBase =
  "font-extrabold tracking-[-0.05em] text-yellow-400";

const labelTypographySize =
  "leading-[1.05] text-[clamp(1.35rem,3.75vw+0.45rem,2.5rem)] sm:text-[clamp(1.45rem,2.85vw+0.55rem,2.85rem)] md:text-[clamp(1.6rem,2.35vw+0.65rem,3.1rem)]";

const showcaseLabelTypographyBase =
  "font-extrabold tracking-[-0.04em] text-white drop-shadow-[0_3px_20px_rgba(0,0,0,0.95)] hyphens-none";

const showcaseLabelTypographySize =
  "leading-[1.06] text-[clamp(1.38rem,3.35vw+0.65rem,2.35rem)] sm:text-[clamp(1.52rem,2.65vw+0.74rem,2.8rem)] md:text-[clamp(1.72rem,2.05vw+0.85rem,3.2rem)] lg:text-[clamp(1.85rem,1.65vw+0.92rem,3.6rem)] xl:text-[clamp(1.92rem,1.4vw+1rem,3.95rem)]";

export default function CoreServices() {
  return (
    <section
      className="relative z-10 bg-black px-[40px] pt-10 pb-10 md:px-[200px] md:pt-14 md:pb-18 lg:pt-16 lg:pb-22"
      aria-labelledby="core-services-heading"
    >
      <div className="mx-auto w-full max-w-none">
        <p className="mx-auto w-fit max-w-full text-left text-base font-medium leading-[1.28] tracking-[-0.02em] text-yellow-400 sm:text-2xl sm:leading-[1.28] md:text-[1.55rem] md:leading-[1.26] lg:text-[2.55rem] lg:leading-[1.26]">
          61C Studios is a creative production house crafting{" "}

          cinematic visual content across film, digital, print{" "}

          and branded media. Built on over a decade of{" "}

          experience, we partner with artists, corporate,{" "}

          brands and small businesses to create work that{" "}

          feels thoughtful, culturally aware and visually{" "}

          distinct.
        </p>

        <h2
          id="core-services-heading"
          className="mt-10 mb-2 text-center text-[clamp(2.75rem,7vw,5rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-yellow-400 md:mt-22 lg:mt-20 mb-20"
        >
          Core Services
        </h2>

        <motion.ul
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 grid w-full max-w-[min(100%,41rem)] list-none grid-cols-1 gap-6 p-0 sm:mt-12 sm:max-w-[min(100%,46rem)] sm:grid-cols-2 sm:gap-8 md:max-w-[min(100%,52rem)] md:gap-10 lg:max-w-[min(100%,62rem)] lg:gap-12"
          aria-label="Service offerings"
        >
          {CORE_SERVICES.map(({ label, image }) => {
            // "Creative Direction" (cv6) has smaller drawn content to fit its long text. 
            // "Branding & Design" (cv5) has a wider intrinsic canvas (1645px vs 1475px).
            // We scale them up so their colored squares visually match the top row.
            let scaleClass = "";


            return (
              <li
                key={label}
                className="relative flex w-full items-center justify-center overflow-visible"
              >
                <Image
                  src={image}
                  alt={label}
                  width={800}
                  height={600}
                  className={`h-auto w-full object-contain ${scaleClass}`}
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </li>
            );
          })}
        </motion.ul>
        <div
          className="mt-14 max-w-none space-y-8 text-left font-medium leading-[1.28] tracking-[-0.02em] text-yellow-400 text-base sm:text-2xl sm:leading-[1.28] md:mt-20 md:text-[1.55rem] md:leading-[1.26] md:space-y-10 lg:mt-24 lg:text-[2.55rem] lg:leading-[1.26]"
          aria-label="How we work across industries"
        >
          <p>
            We craft end-to-end creative production solutions. That’s everything from concept development and creative direction to film production, videos, photography, branding & design, and social-first content.


          </p>

        </div>

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
            className="mx-auto grid w-full max-w-[min(100%,41rem)] list-none grid-cols-2 justify-items-center gap-y-11 gap-x-0 p-0 sm:max-w-[min(100%,46rem)] sm:gap-y-12 sm:gap-x-7 md:max-w-[min(100%,52rem)] md:grid-cols-3 md:gap-y-14 md:gap-x-8 lg:max-w-[min(100%,62rem)] lg:grid-cols-4 lg:gap-y-14 lg:gap-x-10"
          >
            {INDUSTRY_SHOWCASE.map(({ label, image, labelLayout }) => (
              <li
                key={label}
                className="w-full pb-0 pt-1 sm:pb-0 md:pb-0 lg:pb-0"
              >
                <div className="relative mx-auto w-full max-w-[209px] overflow-visible sm:max-w-[120px] md:max-w-[164px] lg:max-w-[240px]">
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
                    className={`pointer-events-none absolute z-10 px-2 text-pretty sm:px-2.5 md:px-3 ${showcaseLabelTypographyBase} ${hasCustomLabelFontSize(labelLayout) ? "text-[clamp(1.4rem,4.5vw,2.8rem)] sm:text-inherit" : showcaseLabelTypographySize
                      } ${hasCustomLabelWidth(labelLayout) ? "w-[min(100%,calc(100vw-3rem))] sm:w-auto" : SHOWCASE_LABEL_WIDTH_CLASS}`}
                  >
                    {renderOverlayLabel(label, labelLayout)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <div
          className="mt-14 max-w-none space-y-8 text-left font-medium leading-[1.28] tracking-[-0.02em] text-yellow-400 text-base sm:text-2xl sm:leading-[1.28] md:mt-20 md:text-[1.55rem] md:leading-[1.26] md:space-y-10 lg:mt-24 lg:text-[2.55rem] lg:leading-[1.26]"
          aria-label="How we work across industries"
        >
          <p>
            We work across a wide range of industries and formats including brand and corporate
            films, documentaries, music videos, hospitality, food &amp; beverage, products,
            fashion &amp; lifestyle, architecture &amp; real estate, automobiles, artist profiles,
            and events.
          </p>
          <p>
            Every project is approached with a well defined creative vision and a clear understanding
            of audience connection. In a nutshell, our cinematic storytelling establishes your identity,
            purpose and ethos.
          </p>
        </div>
      </div>
    </section>
  );
}
