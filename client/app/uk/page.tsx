import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import QueriesContactSection from "@/components/QueriesContactSection";

const UK_MAIL = "hello@61cstudios.com";
const UK_PHONE = "+44 7345651920";
const UK_REGIONAL_HUBS = [
  "Manchester",
  "Liverpool",
  "Leeds",
  "Sheffield",
  "Birmingham",
] as const;

const UK_INTRO_IMAGE_SRC: string | null = "/Illustration1.jpg";
const UK_REGIONS_IMAGE_SRC: string | null = "/Illustration2.gif";
const UK_CREATIVE_PROCESS_IMAGE_SRC: string | null = "/Illustration3.gif";

export const metadata: Metadata = {
  title: "UK | 61C Studios",
  description: "61C Studios UK — Right, let's crack on!",
};

export default function UkPage() {
  return (
    <div className="relative w-full bg-black text-white">
      <Header />

      <main className="relative flex w-full flex-col">
        {/* <section className="relative min-h-[100dvh] overflow-hidden" aria-label="61C Studios UK">
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
            <Image
              src="/uk-hero.jpg"
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          <div className="relative z-10 flex min-h-[100dvh] w-full items-center justify-center px-6 pb-16 pt-[4.5rem] md:px-10">
            <h1 className="max-w-[min(100%,56rem)] text-center text-[clamp(1.35rem,7.2vw,3.75rem)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#FFFF00] drop-shadow-[0_4px_28px_rgba(0,0,0,0.45)] sm:leading-[0.9] md:text-[clamp(1.5rem,8.5vw,4.75rem)]">
              RIGHT, LET&apos;S CRACK ON!
            </h1>
          </div>
        </section> */}
        <section className="relative min-h-[100dvh] overflow-hidden" aria-label="61C Studios UK">
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover object-center"
            >
              <source src="/UKshowreel.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="relative z-10 flex min-h-[100dvh] w-full items-center justify-center px-6 pb-16 pt-[4.5rem] md:px-10">
            <h1 className="max-w-[min(100%,56rem)] text-center text-[clamp(1.35rem,7.2vw,3.75rem)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#FFFF00] drop-shadow-[0_4px_28px_rgba(0,0,0,0.45)] sm:leading-[0.9] md:text-[clamp(1.5rem,8.5vw,4.75rem)]">
              RIGHT, LET&apos;S CRACK ON!
            </h1>
          </div>
        </section>
        <section
          className="relative z-10 bg-black px-8 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-16 lg:pb-32"
          aria-labelledby="uk-intro-heading"
        >
          <h2 id="uk-intro-heading" className="sr-only">
            About 61C Studios UK
          </h2>

          <p className="max-w-none text-left text-base font-medium leading-[1.28] tracking-[-0.02em] text-[#FFFF00] sm:text-2xl sm:leading-[1.28] md:text-[2.5rem] md:leading-[1.26] lg:text-[2.55rem] lg:leading-[1.26]">
            61C Studios is a creative production house

            creating cinematic content across film, digital,

            print and branded media for clients across the UK.

            We work with artists, brands, corporates and

            growing businesses to make content that feels

            visually sharp, culturally in tune and genuinely

            engaging.
          </p>

          <div className="mt-10 w-full md:mt-14 lg:mt-16">
            {UK_INTRO_IMAGE_SRC ? (
              <div className="relative aspect-[1241/698] w-full overflow-hidden bg-[#D9D9D9]">
                <Image
                  src={UK_INTRO_IMAGE_SRC}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            ) : (
              <div className="aspect-[1241/698] w-full bg-[#D9D9D9]" aria-hidden />
            )}
          </div>
        </section>

        <section
          className="relative z-10 bg-black px-8 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-16 lg:pb-32"
          aria-labelledby="uk-regions-heading"
        >
          <h2 id="uk-regions-heading" className="sr-only">
            61C Studios UK regions
          </h2>

          <p className="max-w-none text-left text-base font-medium leading-[1.28] tracking-[-0.02em] text-[#FFFF00] sm:text-2xl sm:leading-[1.28] md:text-[2.5rem] md:leading-[1.26] lg:text-[2.75rem] lg:leading-[1.26]">
            From London and Manchester to Leeds, Liverpool, Sheffield and

            Birmingham, we help businesses tell their stories in a way that

            feels modern, considered and built for today&apos;s audiences.
          </p>

          <div className="mt-10 w-full md:mt-14 lg:mt-16">
            {UK_REGIONS_IMAGE_SRC ? (
              <div className="relative aspect-[1241/698] w-full overflow-hidden bg-[#D9D9D9]">
                <Image
                  src={UK_REGIONS_IMAGE_SRC}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            ) : (
              <div className="aspect-[1241/698] w-full bg-[#D9D9D9]" aria-hidden />
            )}
          </div>
        </section>

        <section
          className="relative z-10 bg-black px-8 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-16 lg:pb-32"
          aria-labelledby="uk-creative-process-heading"
        >
          <h2 id="uk-creative-process-heading" className="sr-only">
            Creative process
          </h2>

          <p className="max-w-none text-left text-base font-bold leading-[1.28] tracking-[-0.02em] text-[#FFFF00] sm:text-2xl sm:leading-[1.28] md:text-[2.5rem] md:leading-[1.26] lg:text-[2.75rem] lg:leading-[1.26]">
            We handle the full creative process — from ideas and creative
            direction through to video production, photography, branding, design
            and social-first content.
          </p>

          <p className="mt-8 max-w-none text-left text-sm font-normal leading-[1.35] tracking-[-0.01em] text-[#FFFF00] sm:mt-10 sm:text-lg sm:leading-[1.35] md:mt-12 md:text-xl md:leading-[1.34] lg:text-[1.65rem] lg:leading-[1.34]">
            Whether it&apos;s a brand film, campaign shoot, documentary, music
            video or day-to-day social content, we focus on creating visuals
            that not only looks great, but actually connect with people. Every
            project is shaped around your identity, your audience and the story
            you want to tell.
          </p>

          <div className="mt-10 w-full md:mt-14 lg:mt-16">
            {UK_CREATIVE_PROCESS_IMAGE_SRC ? (
              <div className="relative aspect-[1241/698] w-full overflow-hidden bg-[#D9D9D9]">
                <Image
                  src={UK_CREATIVE_PROCESS_IMAGE_SRC}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            ) : (
              <div className="aspect-[1241/698] w-full bg-[#D9D9D9]" aria-hidden />
            )}
          </div>
        </section>
        <section
          className="relative z-10 bg-black px-8 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-16 lg:pb-32"
          aria-labelledby="uk-services-heading"
        >
          <h2 id="uk-services-heading" className="sr-only">
            Services across the UK
          </h2>

          <p className="max-w-none text-left text-base font-bold leading-[1.28] tracking-[-0.02em] text-[#FFFF00] sm:text-2xl sm:leading-[1.28] md:text-[2.5rem] md:leading-[1.26] lg:text-[2.75rem] lg:leading-[1.26]">
            We work across hospitality, food &amp; beverage, fashion, lifestyle,
            architecture, real estate, automotive, events, products and artist
            profiles, bringing a cinematic approach to every brief.
          </p>

          <p className="mt-8 max-w-none text-left text-base font-bold leading-[1.28] tracking-[-0.02em] text-[#FFFF00] sm:mt-10 sm:text-2xl sm:leading-[1.28] md:mt-12 md:text-[2.5rem] md:leading-[1.26] lg:text-[2.75rem] lg:leading-[1.26]">
            If you&apos;re looking for creative support across video, photography,
            branding or design anywhere in the UK, get in touch today for a tailored
            quote.
          </p>
        </section>

        <section
          className="relative z-10 bg-black px-8 pb-16 pt-12 md:px-12 md:pb-24 md:pt-16 lg:px-16"
          aria-labelledby="uk-contact-heading"
        >
          <h2 id="uk-contact-heading" className="sr-only">
            Contact 61C Studios UK
          </h2>

          {/* <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-20">
            <div className="md:text-right">
              <p className="text-lg font-bold text-[#FFFF00] md:text-3xl lg:text-4xl">
                Registered address:
              </p>
              <address className="mt-3 text-base not-italic leading-relaxed text-[#FFFF00] md:mt-4 md:text-2xl lg:text-3xl">
                71-75 Shelton Street,
                <br />
                Covent Garden,
                <br />
                London,
                <br />
                WC2H 9JQ
              </address>
              <p className="mt-4 text-base font-semibold text-[#FFFF00] md:mt-5 md:text-2xl lg:text-3xl">
                Phone No:{" "}
                <a href={`tel:${UK_PHONE.replace(/\s/g, "")}`} className="hover:opacity-80">
                  {UK_PHONE}
                </a>
              </p>
            </div>

            <div>
              <p className="text-lg font-bold text-[#FFFF00] md:text-3xl lg:text-4xl">
                Regional Hubs
              </p>
              <ul
                className="mt-3 space-y-1 text-base font-normal leading-snug text-[#FF009D] md:mt-4 md:text-2xl lg:text-3xl"
                aria-label="Regional hubs in the United Kingdom"
              >
                {UK_REGIONAL_HUBS.map((city) => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            </div>
          </div> */}

          {/* <div className="mt-16 flex flex-col gap-8 md:mt-24 md:flex-row md:items-end md:justify-between md:gap-6">
            <Link
              href="/contact"
              className="text-lg font-bold uppercase tracking-wide text-[#FFFF00] transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFF00]/60 md:text-3xl lg:text-4xl"
            >
              SEND US YOUR QUERIES
            </Link>
            <a
              href={`mailto:${UK_MAIL}`}
              className="text-lg font-bold text-[#FFFF00] transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFF00]/60 md:text-3xl lg:text-4xl"
            >
              {UK_MAIL}
            </a>
          </div> */}

          <div className="mt-12 h-px w-full bg-[#1a4d2e] md:mt-16" aria-hidden />
        </section>

        <QueriesContactSection showHeader={false} variant="uk" />
      </main>
    </div>
  );
}
