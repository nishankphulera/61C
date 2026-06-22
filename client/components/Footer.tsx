// "use client";

// import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { useRef } from "react";
// import { Permanent_Marker } from "next/font/google";

// const navFont = Permanent_Marker({
//   weight: "400",
//   subsets: ["latin"],
// });

// const LINKS: { href: string; label: string; imageSrc: string }[] = [
//   { href: "/", label: "Home", imageSrc: "/Homenav.png" },
//   { href: "/about", label: "About us", imageSrc: "/Aboutusnav.png" },
//   { href: "/films", label: "Films", imageSrc: "/Filmsnav.png" },
//   { href: "/photography", label: "Photography", imageSrc: "/Photographynav.png" },
//   { href: "/contact", label: "Contact", imageSrc: "/Contactnav.png" },
// ];

// const SOCIAL = [
//   {
//     label: "Instagram",
//     href: "https://www.instagram.com/",
//     src: "/Instagram.gif",
//   },
//   {
//     label: "LinkedIn",
//     href: "https://www.linkedin.com/",
//     src: "/Linkedin.gif",
//   },
//   {
//     label: "YouTube",
//     href: "https://www.youtube.com/",
//     src: "/Youtube.gif",
//   },
// ];

// export default function Footer() {
//   const footerRef = useRef<HTMLElement | null>(null);
//   const { scrollYProgress } = useScroll({
//     target: footerRef,
//     offset: ["start end", "end start"],
//   });

//   // Move a large portion of the shutter so the rise is obvious.
//   const shutterY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
//   // Keep a small top fade at rest, then increase it as the shutter moves up.
//   const liftPercent = useTransform(scrollYProgress, [0, 1], ["12%", "130%"]);
//   const shutterMask = useMotionTemplate`linear-gradient(
//     to bottom,
//     transparent 0%,
//     transparent ${liftPercent},
//     rgba(0, 0, 0, 0.45) calc(${liftPercent} + 5%),
//     black calc(${liftPercent} + 12%),
//     black 100%
//   )`;

//   return (
//     <footer
//       ref={footerRef}
//       className="relative isolate min-h-[min(85dvh,720px)] overflow-hidden"
//     >
//       {/* Background */}
//       <div className="pointer-events-none absolute inset-0 z-0">
//         <Image
//           src="/shutterroll.png"
//           alt=""
//           fill
//           className="object-cover object-top"
//           sizes="100vw"
//         />
//       </div>

//       {/* Static shutter layer */}

//       <motion.div
//         className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-20 h-[100vh] w-full will-change-transform mt-[112px]"
//         aria-hidden
//         style={{ y: shutterY }}
//       >
//         <motion.div
//           className="relative h-full w-full"
//           style={{
//             WebkitMaskImage: shutterMask,
//             maskImage: shutterMask,
//             WebkitMaskSize: "100% 100%",
//             maskSize: "100% 100%",
//           }}
//         >
//           <Image
//             src="/shutter.png"
//             alt=""
//             fill
//             className="object-cover object-top"
//             sizes="100vw"
//             priority={false}
//           />
//         </motion.div>
//       </motion.div>

//       {/* Content */}
//       <div className="relative z-10 mx-auto mt-[50dvh] grid max-w-7xl grid-cols-1 gap-12 px-6 pb-14 pt-[min(14dvh,104px)] md:grid-cols-3 md:items-end md:px-10">

//         {/* Left */}
//         <div className="flex flex-col gap-8">
//           <Image
//             src="/letsconnect.png"
//             alt="Let's connect"
//             width={280}
//             height={100}
//             className="h-auto w-auto max-w-full"
//             style={{ width: "auto", height: "auto" }}
//           />

//           <div className="flex gap-4">
//             {SOCIAL.map(({ label, href, src }) => (
//               <Link key={label} href={href} target="_blank">
//                 <Image src={src} alt="" width={48} height={48} />
//               </Link>
//             ))}
//           </div>

//           <a
//             href="mailto:admin@61cstudios.com"
//             className="text-yellow-400"
//           >
//             admin@61cstudios.com
//           </a>
//         </div>

//         {/* Center */}
//         <div className="flex justify-center">
//           <Image
//             src="/Pot.png"
//             alt=""
//             width={280}
//             height={280}
//             className="h-auto w-auto max-w-full"
//             style={{ width: "auto", height: "auto" }}
//           />
//         </div>

//         {/* Right */}
//         <nav
//           className={`${navFont.className}`}
//         >
//           {LINKS.map(({ href, label, imageSrc }) => (
//               <Link
//                 key={href}
//                 href={href}

//                 // className="group relative flex min-h-0 flex-1 items-center justify-center bg-[#0000FF] p-2 transition-colors hover:bg-[#0000cc] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
//               >
//                 <Image
//                   src={imageSrc}
//                   alt={label}
//                   width={100}
//                   height={100}
//                   className="h-auto w-full object-cover object-center drop-shadow-sm transition-transform group-hover:scale-[1.02]"
//                 />
//               </Link>
//             ))}
//         </nav>
//       </div>
//     </footer>
//   );
// }

"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function shouldHideFooter(pathname: string | null) {
  return pathname === "/contact" || pathname === "/about" || pathname === "/uk";
}

const LINKS = [
  { href: "/", label: "Home", imageSrc: "/Homenav.webp" },
  { href: "/about", label: "About us", imageSrc: "/Aboutusnav.webp" },
  { href: "/films", label: "Films", imageSrc: "/Filmsnav.webp" },
  { href: "/photography", label: "Photography", imageSrc: "/Photographynav.webp" },
  { href: "/design", label: "Design", imageSrc: "/Design.webp" },
  { href: "/contact", label: "Contact", imageSrc: "/Contactnav.webp" },
];

const SOCIAL = [
  {
    label: "Instagram",
    href: "[instagram.com](https://www.instagram.com/)",
    srcWebm: "/Instagram.webm",
    srcMp4: "/Instagram.mp4",
  },
  {
    label: "LinkedIn",
    href: "[linkedin.com](https://www.linkedin.com/)",
    srcWebm: "/Linkedin.webm",
    srcMp4: "/Linkedin.mp4",
  },
  {
    label: "YouTube",
    href: "[youtube.com](https://www.youtube.com/)",
    srcWebm: "/Youtube.webm",
    srcMp4: "/Youtube.mp4",
  },
];

/**
 * Returns viewport-aware animation parameters so the shutter effect
 * feels consistent across mobile / tablet / desktop.
 *
 * The shutter image is 1600×1164 (landscape). On narrow portrait screens
 * the image is zoomed in heavily by `object-cover`, so we need a shorter
 * translate range and a faster lift to keep the "rolling shutter" illusion.
 */
function getShutterParams(viewportWidth: number) {
  if (viewportWidth < 640) {
    // Mobile: open wider so all nav links are visible
    return { spanMultiplier: 1.3, maxTranslate: 95, liftStart: 8, liftRange: 130 };
  }
  if (viewportWidth < 1024) {
    // Tablet
    return { spanMultiplier: 1.5, maxTranslate: 105, liftStart: 10, liftRange: 128 };
  }
  // Desktop
  return { spanMultiplier: 1.8, maxTranslate: 115, liftStart: 12, liftRange: 125 };
}

export default function Footer() {
  const pathname = usePathname();
  const footerRef = useRef<HTMLElement | null>(null);
  const shutterRef = useRef<HTMLDivElement | null>(null);

  const updateShutter = useCallback(() => {
    const footer = footerRef.current;
    const shutter = shutterRef.current;
    if (!footer || !shutter) return;

    const rect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const { spanMultiplier, maxTranslate, liftStart, liftRange } =
      getShutterParams(viewportWidth);

    // Progress: 0 when footer top enters viewport bottom, 1 near end.
    const start = viewportHeight;
    const span = rect.height * spanMultiplier || 1;
    const progress = Math.max(0, Math.min(1, (start - rect.top) / span));

    // Quantize to 0.1% to avoid unnecessary compositor writes.
    const translateY = Math.round(-progress * maxTranslate * 10) / 10;
    const lift = Math.round(liftStart + progress * liftRange);

    shutter.style.transform = `translate3d(0, ${translateY}%, 0)`;
    shutter.style.setProperty("--lift", `${lift}%`);
  }, []);

  useEffect(() => {
    if (shouldHideFooter(pathname)) return;
    if (typeof window === "undefined") return;

    let ticking = false;
    let isVisible = true;

    const schedule = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        updateShutter();
      });
    };

    const onScroll = () => {
      if (!isVisible) return;
      schedule();
    };

    // Initial state.
    updateShutter();

    // Pause all scroll work entirely when the footer is off-screen.
    let observer: IntersectionObserver | null = null;
    if (footerRef.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            isVisible = entry.isIntersecting;
            if (isVisible) schedule();
          }
        },
        { rootMargin: "200px 0px" }
      );
      observer.observe(footerRef.current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
    };
  }, [pathname, updateShutter]);

  if (shouldHideFooter(pathname)) return null;

  return (
    <footer
      ref={footerRef}
      className="relative isolate min-h-[100dvh] sm:min-h-[95dvh] md:min-h-[90dvh] lg:min-h-[min(85dvh,720px)] overflow-hidden"
    >
      {/* ─── Background (shutterroll — what's revealed behind the shutter) ─── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/shutterroll.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>

      {/* ─── Shutter layer ─── */}
      {/*
        Use 100vh height so the shutter image covers exactly one viewport
        regardless of the footer's own height. This keeps the shutter
        texture at its natural aspect ratio and avoids distortion/line
        artifacts that happen with percentage-based heights on tablets.
      */}
      <div
        ref={shutterRef}
        className="pointer-events-none absolute inset-x-0 top-0 z-20 mt-[56px] sm:mt-[72px] md:mt-[88px] lg:mt-[112px] h-[100vh] w-full"
        aria-hidden
        style={{
          willChange: "transform",
          transform: "translate3d(0, 0%, 0)",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-full w-full max-w-none bg-black"
          style={{
            maskImage: `linear-gradient(
              to bottom,
              transparent 0%,
              transparent var(--lift, 12%),
              rgba(0, 0, 0, 0.45) calc(var(--lift, 12%) + 5%),
              black calc(var(--lift, 12%) + 12%),
              black 100%
            )`,
            WebkitMaskImage: `linear-gradient(
              to bottom,
              transparent 0%,
              transparent var(--lift, 12%),
              rgba(0, 0, 0, 0.45) calc(var(--lift, 12%) + 5%),
              black calc(var(--lift, 12%) + 12%),
              black 100%
            )`,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            // Isolate the mask's rasterization to its own compositor layer.
            transform: "translateZ(0)",
            willChange: "mask-image",
            backfaceVisibility: "hidden",
          }}
        >
          <Image
            src="/shutter.webp"
            alt=""
            fill
            className="object-cover object-top"
            sizes="100vw"
          />
        </div>
      </div>

      {/* ─── Content ─── */}
      <div
        className={[
          "relative z-10 mx-auto grid max-w-7xl",
          // Vertical push — content sits below the shutter reveal zone
          "mt-[55dvh] sm:mt-[50dvh] md:mt-[48dvh] lg:mt-[50dvh]",
          // 3-col only at lg (1024px+) — tablets stay single column
          "grid-cols-1 lg:grid-cols-3",
          "gap-6 sm:gap-8 lg:gap-10",
          "px-5 sm:px-6 md:px-8 lg:px-10",
          "pb-10 lg:pb-14",
          "pt-[min(8dvh,60px)] lg:pt-[min(10dvh,80px)]",
          "lg:items-end",
        ].join(" ")}
      >
        {/* ── Left: Connect + social + email ── */}
        <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8 items-center lg:items-start text-center lg:text-left">
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
              className="h-auto w-[180px] sm:w-[220px] lg:w-auto lg:max-w-[280px] object-contain transition-opacity hover:opacity-90"
              style={{ height: "auto" }}
            />
          </Link>

          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-4 lg:gap-6">
            <div className="flex gap-2.5 sm:gap-3 lg:gap-4">
              {SOCIAL.map(({ label, href, srcWebm, srcMp4 }) => (
                <Link key={label} href={href} target="_blank">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    width={48}
                    height={48}
                    className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-cover"
                    aria-label={label}
                  >
                    <source src={srcWebm} type="video/webm" />
                    <source src={srcMp4} type="video/mp4" />
                  </video>
                </Link>
              ))}
            </div>
            <Link
              href={
                process.env.NEXT_PUBLIC_OFFSET_INSTAGRAM_URL ??
                "https://www.instagram.com/offset_61c/"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/80 rounded-md"
              aria-label="Offset Instagram"
            >
              <Image
                src="/offset.png"
                alt="Offset logo"
                width={112}
                height={48}
                className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
              />
            </Link>
          </div>

          <a
            href="mailto:hello@61cstudios.com"
            className="text-yellow-400 text-xs sm:text-sm md:text-base lg:text-lg"
          >
            hello@61cstudios.com
          </a>
        </div>

        {/* ── Center: Pot ── */}
        <div className="flex justify-center lg:col-span-1 order-last lg:order-none">
          <Image
            src="/Pot.webp"
            alt=""
            width={280}
            height={280}
            className="h-auto w-[140px] sm:w-[180px] lg:w-auto lg:max-w-[280px] object-contain"
            style={{ height: "auto" }}
          />
        </div>

        {/* ── Right: Navigation links ── */}
        <nav className="font-sans grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col items-center lg:items-end lg:col-span-1 gap-1 sm:gap-2 lg:gap-3">
          {LINKS.map(({ href, label, imageSrc }) => (
            <Link key={href} href={href} className="block">
              <Image
                src={imageSrc}
                alt={label}
                width={300}
                height={100}
                className="h-auto w-full sm:w-auto lg:w-auto lg:max-w-[240px] object-contain object-center drop-shadow-sm transition-transform hover:scale-[1.02]"
              />
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
