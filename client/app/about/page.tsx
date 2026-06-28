import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import CoreServices from "@/components/CoreServices";
import CoreValues from "@/components/CoreValues";
import CoreLocations from "@/components/CoreLocations";
import AboutQueriesContactSection from "@/components/AboutQueriesContactSection";

export const metadata: Metadata = {
  title: "About | 61C Studios",
  description:
    "61C Studios — visual craft rooted in purpose, culture, and design.",
};

export default function AboutPage() {
  return (
    <div className="relative bg-black text-white">
      <Header />

      <main className="relative flex w-full flex-col">
        {/* Hero — background scoped to this block */}
        <section className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden md:aspect-auto md:min-h-[100dvh]">
          <div className="pointer-events-none absolute inset-0 z-0">
            <video
              src="/aboutusshowreel.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="relative z-10 flex w-full flex-col items-center justify-center px-[40px] md:min-h-[100dvh] md:px-[200px] md:pb-16 md:pt-[4.5rem]">
            <h1 className="w-full max-w-[min(96vw,80rem)] text-center text-[clamp(1rem,3.5vw,2rem)] md:text-[clamp(2rem,5.5vw+0.75rem,4rem)] font-black uppercase leading-[0.92] tracking-[-0.02em] text-yellow-400 drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)] md:leading-[0.88]">
              Visual craft rooted in<br />
              purpose, culture and design
            </h1>
          </div>
        </section>

        <CoreServices />
        <CoreValues />
        <CoreLocations />
        <AboutQueriesContactSection />
      </main>
    </div>
  );
}
