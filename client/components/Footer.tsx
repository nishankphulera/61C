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
//             className="text-[#E4DA4D]"
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

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function shouldHideFooter(pathname: string | null) {
  return pathname === "/contact" || pathname === "/about";
}

const LINKS = [
  { href: "/", label: "Home", imageSrc: "/Homenav.webp" },
  { href: "/about", label: "About us", imageSrc: "/Aboutusnav.png" },
  { href: "/films", label: "Films", imageSrc: "/Filmsnav.webp" },
  { href: "/photography", label: "Photography", imageSrc: "/Photographynav.webp" },
  { href: "/comingsoon", label: "Design", imageSrc: "/Design.png" },

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

export default function Footer() {
  const pathname = usePathname();
  const footerRef = useRef<HTMLElement | null>(null);
  const shutterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldHideFooter(pathname)) return;
    if (typeof window === "undefined") return;

    let ticking = false;
    let isVisible = true;
    let lastLift = -1;
    let lastTranslate = Number.NaN;

    const updateShutter = () => {
      ticking = false;
      const footer = footerRef.current;
      const shutter = shutterRef.current;
      if (!footer || !shutter) return;

      const rect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Progress: 0 when footer enters viewport, 1 when it exits top.
      const start = viewportHeight;
      const end = -rect.height;
      const span = start - end || 1;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / span));

      // Quantize translate to 0.1% — sub-pixel precision below this is
      // visually identical but still costs a compositor write each frame.
      const translateY = Math.round(-progress * 1000) / 10;

      // The big one: the mask gradient is recomputed every time --lift
      // changes. Quantizing to whole-percent reduces the number of unique
      // masks from "every frame" to at most ~118 across the whole scroll,
      // which avoids rasterizing a viewport-sized gradient on every tick.
      const lift = Math.round(12 + progress * 118);

      if (translateY !== lastTranslate) {
        shutter.style.transform = `translate3d(0, ${translateY}%, 0)`;
        lastTranslate = translateY;
      }
      if (lift !== lastLift) {
        shutter.style.setProperty("--lift", `${lift}%`);
        lastLift = lift;
      }
    };

    const schedule = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateShutter);
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
  }, [pathname]);

  if (shouldHideFooter(pathname)) return null;

  return (
    <footer
      ref={footerRef}
      className="relative isolate min-h-[min(85dvh,720px)] overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/shutterroll.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>

      {/* Shutter layer */}
      <div
        ref={shutterRef}
        className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-20 mt-[112px] h-[100vh] w-full"
        aria-hidden
        style={{
          willChange: "transform",
          transform: "translate3d(0, 0%, 0)",
        }}
      >
        <div
          className="absolute left-1/2 top-0 h-full w-[107vw] max-w-none -translate-x-1/2"
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
            // Isolate the mask's rasterization to its own compositor layer so
            // re-rasterizing on --lift change doesn't invalidate siblings.
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
            sizes="110vw"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto mt-[50dvh] grid max-w-7xl grid-cols-1 gap-12 px-6 pb-14 pt-[min(14dvh,104px)] md:grid-cols-3 md:items-end md:px-10">
        {/* Left */}
        <div className="flex flex-col gap-8">
          <Link
            href="/contact"
            className="inline-block max-w-full rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E4DA4D]/80"
            aria-label="Contact us"
          >
            <Image
              src="/letsconnect.png"
              alt="Contact us — Let's connect"
              width={280}
              height={100}
              className="h-auto w-auto max-w-full transition-opacity hover:opacity-90"
            />
          </Link>
          <div className="flex gap-4">
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
                  className="h-12 w-12 object-cover"
                  aria-label={label}
                >
                  <source src={srcWebm} type="video/webm" />
                  <source src={srcMp4} type="video/mp4" />
                </video>
              </Link>
            ))}
          </div>
          <a href="mailto:admin@61cstudios.com" className="text-[#E4DA4D]">
            admin@61cstudios.com
          </a>
        </div>

        {/* Center */}
        <div className="flex justify-center">
          <Image
            src="/Pot.webp"
            alt=""
            width={280}
            height={280}
            className="h-auto w-auto max-w-full"
          />
        </div>

        {/* Right */}
        <nav className="font-sans">
          {LINKS.map(({ href, label, imageSrc }) => (
            <Link key={href} href={href}>
              <Image
                src={imageSrc}
                alt={label}
                width={100}
                height={100}
                className="h-auto w-full object-cover object-center drop-shadow-sm transition-transform hover:scale-[1.02]"
              />
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
