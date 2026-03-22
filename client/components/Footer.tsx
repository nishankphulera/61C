"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Permanent_Marker } from "next/font/google";

const navFont = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
});

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/films", label: "Films" },
  { href: "/photography", label: "Photography" },
  { href: "/design", label: "Design" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL: { label: string; href: string; src: string }[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    src: "/Instagram.gif",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    src: "/Linkedin.gif",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    src: "/Youtube.gif",
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  // Closed: no extra offset. Open: negative translateY only (moves slab up). Keeping
  // motion inside the center column avoids the full-bleed slab overlapping the nav.
  const shutterTranslateY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const shutterTransform = useMotionTemplate`translateY(${shutterTranslateY}px)`;
  const maskFadeStop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const shutterMask = useMotionTemplate`linear-gradient(to top, transparent 0%, transparent ${maskFadeStop}, black ${maskFadeStop}, black 100%)`;

  return (
    <footer
      ref={footerRef}
      className="relative isolate min-h-[min(85dvh,720px)] overflow-hidden"
    >
      
      <div
        className="pointer-events-none absolute inset-0 z-0 min-h-0 opacity-100"
        aria-hidden
      >
        <div className="relative h-full min-h-0 w-full">
          <Image
            src="/shutterroll.png"
            alt=""
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority={false}
          />
        </div>
        
       
      </div>
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-20 bottom-0 z-20 min-h-[min(90dvh,780px)] w-full will-change-transform md:min-h-[min(88dvh,840px)]"
        style={{ transform: shutterTransform }}
        aria-hidden
      >
        <motion.div
          className="relative h-full min-h-0 w-full"
          style={{
            WebkitMaskImage: shutterMask,
            maskImage: shutterMask,
          }}
        >
          <Image
            src="/shutter.png"
            alt=""
            fill
            className="select-none object-cover "
            sizes="100vw"
            priority={false}
          />
        </motion.div>
      </motion.div>
      <div className="relative z-10 mx-auto mt-[50dvh] grid max-w-7xl grid-cols-1 gap-12 px-6 pb-14 pt-[min(14dvh,104px)] md:grid-cols-3 md:items-end md:gap-8 md:px-10 md:pb-10 md:pt-[min(12dvh,100px)] lg:px-12">
        <div className="flex max-w-md flex-col gap-8 md:pt-2">
          <div className="relative w-full max-w-[280px]">
            <Image
              src="/letsconnect.png"
              alt="Let's connect"
              width={560}
              height={200}
              className="h-auto w-full object-contain object-left"
              sizes="(max-width: 768px) 240px, 280px"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            {SOCIAL.map(({ label, href, src }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-14 w-14 items-center justify-center rounded-md bg-white/95 p-1 shadow-md transition hover:scale-105 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E4DA4D] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <Image
                  src={src}
                  alt=""
                  width={48}
                  height={48}
                  unoptimized
                  className="h-full w-full object-contain"
                />
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-1 text-[#E4DA4D]">
            <p className="text-sm md:text-base">Mail us at</p>
            <a
              href="mailto:admin@61cstudios.com"
              className="text-sm font-medium transition hover:underline md:text-base"
            >
              admin@61cstudios.com
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[280px] w-full max-w-[min(100%,320px)] flex-col items-center justify-end md:max-w-none md:min-h-[min(40dvh,360px)]">
          <div className="relative z-10 flex w-full justify-center pb-2">
            <Image
              src="/Pot.png"
              alt="Illustration"
              width={600}
              height={600}
              className="h-auto w-full max-w-[260px] object-contain md:max-w-[300px]"
              sizes="(max-width: 768px) 260px, 300px"
            />
          </div>
        </div>

        <nav
          className={`${navFont.className} relative z-30 mx-auto w-full max-w-xs border-[3px] border-[#FF1493] md:mx-0 md:max-w-sm`}
          aria-label="Footer"
        >
          <ul className="divide-y-[3px] divide-[#FF1493]">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block bg-[#0000FF] px-6 py-4 text-left text-base uppercase tracking-wide text-white transition-colors hover:bg-[#0000cc] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white md:py-5 md:text-lg"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
