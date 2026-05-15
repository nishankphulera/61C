import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import CoreServices from "@/components/CoreServices";
import CoreValues from "@/components/CoreValues";
import CoreLocations from "@/components/CoreLocations";
import QueriesContactSection from "@/components/QueriesContactSection";

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
        <section className="relative min-h-[100dvh] overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/aboutbg.jpg"
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          <div className="relative z-0 flex min-h-[100dvh] flex-col pt-[4.5rem] md:pt-[5rem]">
            <div className="flex flex-1 flex-col items-center justify-center px-4 pb-16 md:px-10">
              <h1 className="w-full max-w-[min(96vw,80rem)] text-center text-[clamp(2.25rem,5.5vw+0.75rem,6rem)] font-black uppercase leading-[0.92] tracking-[-0.02em] text-[#F5E14A] drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)] md:leading-[0.88]">
                Visual craft rooted in<br />
                purpose, culture and design.
              </h1>
            </div>
          </div>
        </section>

        <CoreServices />
        <CoreValues />
        <CoreLocations />
        <QueriesContactSection />
      </main>
    </div>
  );
}
