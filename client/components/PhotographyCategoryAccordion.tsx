"use client";

import Image from "next/image";
import { usePhotographyLightbox } from "@/components/PhotographyLightboxContext";

/** Accordion order matches page: F&B → Product → Hospitality → Spaces → Fashion → Automobiles → Artists Profiles → Events */
const CARDS = [
  {
    src: "/Frame5.jpg",
    title: "F&B",
    overlay: "bg-emerald-800/50",
    sectionId: "photography-fnb",
  },
  {
    src: "/Frame5.jpg",
    title: "Product",
    overlay: "bg-teal-900/45",
    sectionId: "photography-product",
  },
  {
    src: "/Frame2.jpg",
    title: "Hospitality",
    overlay: "bg-orange-600/50",
    sectionId: "photography-hospitality",
  },
  {
    src: "/Frame3.jpg",
    title: "Spaces",
    overlay: "bg-slate-700/50",
    sectionId: "photography-spaces",
  },
  {
    src: "/Frame1.jpg",
    title: "Fashion & Lifestyle",
    overlay: "bg-pink-600/55",
    sectionId: "photography-fashion",
  },
  {
    src: "/Frame4.jpg",
    title: "Automobiles",
    overlay: "bg-violet-600/45",
    sectionId: "photography-automobiles",
  },
  {
    src: "/Frame3.jpg",
    title: "Artists Profiles",
    overlay: "bg-indigo-900/55",
    sectionId: "photography-artist-profiles",
  },
  {
    src: "/Frame6.jpg",
    title: "Events",
    overlay: "bg-red-800/50",
    sectionId: "photography-events",
  },
] as const;

export default function PhotographyCategoryAccordion({
  className = "",
}: {
  className?: string;
}) {
  const { open } = usePhotographyLightbox();

  return (
    <div
      className={`w-full px-1 sm:px-2 md:px-0 ${className}`}
      aria-label="Photography categories"
    >
      <div className="flex h-[min(68vh,600px)] min-h-[300px] w-full gap-1.5 md:gap-2 md:min-h-[520px]">
        {CARDS.map((card) => (
          <button
            key={card.sectionId}
            type="button"
            onClick={() =>
              open(card.src, {
                alt: card.title,
                sectionId: card.sectionId,
                sectionTitle: card.title,
              })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open(card.src, {
                  alt: card.title,
                  sectionId: card.sectionId,
                  sectionTitle: card.title,
                });
              }
            }}
            aria-label={`View ${card.title} full size`}
            className="group/card relative min-h-0 min-w-0 flex-1 cursor-pointer overflow-hidden rounded-3xl border-0 bg-transparent p-0 text-left transition-[flex] duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:flex-[1.35] focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-within:flex-[1.35] md:hover:flex-[1.45] md:focus-within:flex-[1.45]"
          >
            <Image
              src={card.src}
              alt=""
              fill
              className="object-cover object-center brightness-[0.92] contrast-[1.06] saturate-[1.05] transition-transform duration-700 group-hover/card:scale-[1.03]"
              sizes="(max-width: 640px) 12vw, 11vw"
              priority
            />
            <div
              className={`pointer-events-none absolute inset-0 ${card.overlay} mix-blend-multiply`}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-amber-950/15 mix-blend-soft-light"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
              aria-hidden
            />
            <span
              className="pointer-events-none absolute bottom-4 left-3 z-10 origin-bottom-left -rotate-90 whitespace-nowrap text-[0.5rem] font-bold uppercase leading-none tracking-[0.2em] text-[#f0e6a8] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] md:bottom-10 md:left-7 md:text-[0.7rem] md:tracking-[0.32em]"
            >
              {card.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
