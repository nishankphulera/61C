"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import AboutQueriesContactSection from "@/components/AboutQueriesContactSection";

const YELLOW = "#F7E509";
const RED_INPUT = "#C41E2A";
const GREEN_ACCENT = "#2EE576";
const MAIL = "hello@61cstudios.com";
const OFFSET_BLUE = "#2563eb";
const pink = "#FF009D"

const OFFSET_INSTAGRAM =
  process.env.NEXT_PUBLIC_OFFSET_INSTAGRAM_URL ?? "https://www.instagram.com/offset_61c/";

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/61cstudios/",
    srcWebm: "/Instagram.webm",
    srcMp4: "/Instagram.mp4",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/61c-studios/",
    srcWebm: "/Linkedin.webm",
    srcMp4: "/Linkedin.mp4",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@61cstudios",
    srcWebm: "/Youtube.webm",
    srcMp4: "/Youtube.mp4",
  },
] as const;



function SocialTile({
  label,
  href,
  srcWebm,
  srcMp4,
}: {
  label: string;
  href: string;
  srcWebm: string;
  srcMp4: string;
}) {
  return (
    <div className="relative z-10 h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 shrink-0 overflow-hidden rounded-md ring-2 ring-[#F7E509] ring-offset-2 ring-offset-transparent m-1">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src={srcWebm} type="video/webm" />
        <source src={srcMp4} type="video/mp4" />
      </video>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        aria-label={label}
      >
        <span className="sr-only">{label}</span>
      </Link>
    </div>
  );
}

export default function ContactUsComponent() {
  const footerRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <footer
        ref={footerRef}
        className="relative isolate min-h-[min(85dvh,720px)] overflow-hidden mt-30"
      >
        {/* Shutter under content */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
          <Image
            src="/shutterroll.webp"
            alt=""
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
        </div>
        <div className="pointer-events-none absolute inset-0 z-0 block md:hidden">
          <Image
            src="/verticalshutter1.png"
            alt=""
            fill
            className="object-fill"
            sizes="100vw"
            priority
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/50"
          aria-hidden
        />

        <div className="relative z-10 mx-auto mt-[18dvh] grid max-w-7xl grid-cols-1 gap-10 px-10 pb-16 pt-24 sm:px-[10%] md:grid-cols-3 md:items-end md:gap-12 md:px-10 md:pt-50">
          {/* Left: CTA + socials */}
          <div className="flex flex-col items-center gap-6 text-center md:col-span-1 md:items-start md:text-left md:gap-8">
            <Link
              href="/contact"
              className="inline-block max-w-full rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/80"
              aria-label="Contact us"
            >
              <Image
                src="/letsconnect.png"
                alt="Contact us — Let's connect"
                width={280}
                height={100}
                className="h-auto w-[240px] sm:w-[260px] md:w-auto max-w-full transition-opacity hover:opacity-90"
                style={{ height: "auto" }}
              />
            </Link>

            <div className="flex flex-wrap justify-center items-center gap-3 md:justify-start md:gap-4">
              {SOCIAL.map((s) => (
                <SocialTile key={s.label} label={s.label} href={s.href} srcWebm={s.srcWebm} srcMp4={s.srcMp4} />
              ))}
            </div>

            {/* Offset Logo - Mobile Only */}
            <Link
              href={OFFSET_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex md:hidden w-full max-w-[200px] flex-col gap-2 transition-colors hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7E509]/80 mt-2"
            >
              <img src="/offset.jpeg" alt="Offset" className="w-full h-full object-cover rounded-md" />
            </Link>
          </div>

          {/* Center: decorative pot */}
          <div className="flex justify-center md:col-span-1">
            <Image
              src="/Pot.webp"
              alt=""
              width={260}
              height={280}
              className="h-auto w-[160px] md:w-auto md:max-h-[min(40vh,280px)] max-w-full object-contain opacity-95"
              style={{ height: "auto" }}
            />
          </div>

          {/* Right: Mail + Offset */}
          <div className="flex flex-col items-center gap-6 text-center md:col-span-1 md:items-end md:text-right md:gap-8">
            <a
              href="mailto:hello@61cstudios.com"
              className="group flex flex-col gap-1 transition-colors hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7E509]/80 mb-2 md:mb-0 md:ml-auto md:items-end md:text-right"
            >
              <span className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-normal" style={{ color: pink }}>
                Get in touch for a quote
              </span>
              <span className="text-xl sm:text-xl md:text-3xl lg:text-4xl font-bold tracking-wide text-yellow-400">
                hello@61cstudios.com
              </span>
            </a>

            {/* Offset Logo - Desktop Only */}
            <Link
              href={OFFSET_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden md:flex w-full max-w-[240px] md:max-w-sm flex-col gap-2 p-2 md:p-4 transition-colors hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7E509]/80 md:ml-auto md:items-end md:text-right"
            >
              <img src="/offset.jpeg" alt="Offset" className="w-full h-full object-cover rounded-md" />
            </Link>
          </div>
        </div>
      </footer>

      <AboutQueriesContactSection />
    </>
  );
}
