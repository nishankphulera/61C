"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Permanent_Marker } from "next/font/google";

const navFont = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
});

const LINKS: { href: string; label: string; imageSrc: string }[] = [
  { href: "/", label: "Home", imageSrc: "/Homenav.png" },
  { href: "/about", label: "About us", imageSrc: "/Aboutusnav.png" },
  { href: "/films", label: "Films", imageSrc: "/Filmsnav.png" },
  { href: "/photography", label: "Photography", imageSrc: "/Photographynav.png" },
  { href: "/contact", label: "Contact", imageSrc: "/Contactnav.png" },
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

  // Move a large portion of the shutter so the rise is obvious.
  const shutterY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  // Keep a small top fade at rest, then increase it as the shutter moves up.
  const liftPercent = useTransform(scrollYProgress, [0, 1], ["12%", "130%"]);
  const shutterMask = useMotionTemplate`linear-gradient(
    to bottom,
    transparent 0%,
    transparent ${liftPercent},
    rgba(0, 0, 0, 0.45) calc(${liftPercent} + 5%),
    black calc(${liftPercent} + 12%),
    black 100%
  )`;

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

      {/* Static shutter layer */}

      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-20 h-[100vh] w-full will-change-transform mt-[112px]"
        aria-hidden
        style={{ y: shutterY }}
      >
        <motion.div
          className="relative h-full w-full"
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
            className="object-cover object-top"
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
          className={`${navFont.className}`}
        >
          {LINKS.map(({ href, label, imageSrc }) => (
              <Link
                key={href}
                href={href}
                
                // className="group relative flex min-h-0 flex-1 items-center justify-center bg-[#0000FF] p-2 transition-colors hover:bg-[#0000cc] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              >
                <Image
                  src={imageSrc}
                  alt={label}
                  width={100}
                  height={100}
                  className="w-full object-cover object-center drop-shadow-sm transition-transform group-hover:scale-[1.02]"
                />
              </Link>
            ))}
        </nav>
      </div>
    </footer>
  );
}

