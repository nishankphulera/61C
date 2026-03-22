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

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/films", label: "Films" },
  { href: "/photography", label: "Photography" },
  { href: "/design", label: "Design" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL = [
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

  // ✨ Improved motion with overshoot
  const shutterTranslateY = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [120, -10, 0]
  );

  const shutterTransform = useMotionTemplate`
    translateY(${shutterTranslateY}px)
  `;

  // Top-edge fade only (never past ~38%): keeps the full shutter art readable; 100%
  // + calc(0% - 12%) was hiding almost the whole image at rest.
  const maskFadeStop = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);

  const shutterMask = useMotionTemplate`linear-gradient(to bottom, transparent 0%, transparent ${maskFadeStop}, black ${maskFadeStop}, black 100%)`;

  return (
    <footer
      ref={footerRef}
      className="relative isolate min-h-[min(85dvh,720px)] overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/shutterroll.png"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>

      {/* Shutter Animation */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-20 bottom-0 z-20 flex justify-center will-change-transform"
        style={{ transform: shutterTransform }}
        aria-hidden
      >
        <motion.div
          className="relative h-full w-full max-w-7xl"
          style={{
            WebkitMaskImage: shutterMask,
            maskImage: shutterMask,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        >
          <Image
            src="/shutter.png"
            alt=""
            fill
            className="select-none object-contain object-top"
            sizes="100vw"
            priority={false}
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto mt-[50dvh] grid max-w-7xl grid-cols-1 gap-12 px-6 pb-14 pt-[min(14dvh,104px)] md:grid-cols-3 md:items-end md:px-10">
        
        {/* Left */}
        <div className="flex flex-col gap-8">
          <Image
            src="/letsconnect.png"
            alt="Let's connect"
            width={280}
            height={100}
          />

          <div className="flex gap-4">
            {SOCIAL.map(({ label, href, src }) => (
              <Link key={label} href={href} target="_blank">
                <Image src={src} alt="" width={48} height={48} />
              </Link>
            ))}
          </div>

          <a
            href="mailto:admin@61cstudios.com"
            className="text-[#E4DA4D]"
          >
            admin@61cstudios.com
          </a>
        </div>

        {/* Center */}
        <div className="flex justify-center">
          <Image src="/Pot.png" alt="" width={280} height={280} />
        </div>

        {/* Right */}
        <nav
          className={`${navFont.className} border-[3px] border-[#FF1493]`}
        >
          <ul className="divide-y-[3px] divide-[#FF1493]">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block bg-blue-600 px-6 py-4 text-white hover:bg-blue-700"
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