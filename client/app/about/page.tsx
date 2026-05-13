import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "About | 61C Studios",
  description:
    "61C Studios — visual craft rooted in purpose, culture, and design.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-black text-white">
      <Header />

      <main className="relative flex min-h-[100dvh] w-full flex-col">
        {/* Full-bleed hero background */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/Frame4.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Base darken for legibility */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80"
            aria-hidden
          />
          {/* Neon-retro color washes (disco / spotlight feel) */}
          <div
            className="absolute inset-0 opacity-[0.35] mix-blend-screen"
            aria-hidden
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 20% 30%, rgba(239, 68, 68, 0.45), transparent 55%),
                radial-gradient(ellipse 70% 60% at 80% 25%, rgba(59, 130, 246, 0.4), transparent 50%),
                radial-gradient(ellipse 60% 70% at 50% 85%, rgba(234, 179, 8, 0.25), transparent 55%),
                radial-gradient(ellipse 50% 40% at 70% 60%, rgba(236, 72, 153, 0.2), transparent 50%)
              `,
            }}
          />
          {/* Subtle film grain */}
          <div
            className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
            aria-hidden
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Hero copy — below fixed header */}
        <div className="relative z-0 flex min-h-[100dvh] flex-col pt-[4.5rem] md:pt-[5rem]">
          <div className="flex flex-1 flex-col items-center justify-center px-4 pb-16 md:px-10">
            <h1 className="max-w-[18ch] text-center text-[clamp(1.75rem,5.5vw,3.75rem)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-[#F5E14A] drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)] md:max-w-[22ch] md:leading-[0.92]">
              Visual craft rooted in purpose, culture and design.
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}
