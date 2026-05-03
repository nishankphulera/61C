"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import Header from "@/components/Header";

const YELLOW = "#F7E509";
const RED_INPUT = "#C41E2A";
const GREEN_ACCENT = "#2EE576";
const MAIL = "hello@61cstudios.com";
const SHUTTER_BG = "/shutterroll.webp";

/** Override via NEXT_PUBLIC_OFFSET_INSTAGRAM_URL in .env.local */
const OFFSET_INSTAGRAM =
  process.env.NEXT_PUBLIC_OFFSET_INSTAGRAM_URL ?? "https://www.instagram.com/offset.gurugram/";

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/61cstudios/",
    src: "/Instagram.mp4",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/61c-studios/",
    src: "/Linkedin.mp4",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@61cstudios",
    src: "/Youtube.mp4",
  },
] as const;

/** Video plays in a tile; link is an overlay so autoplay isn’t fighting nested interactive content. */
function SocialVideo({ src, label, href }: { src: string; label: string; href: string }) {
  return (
    <div className="relative z-10 h-18 w-18 shrink-0 overflow-hidden rounded-md ring-2 ring-[#F7E509] ring-offset-2 ring-offset-transparent sm:h-24 sm:w-24 md:h-28 md:w-28">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src={src} type="video/mp4" />
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

export default function ContactView() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const lines = [
        `Name: ${form.fullName}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        "",
        form.message,
      ].join("\n");
      const subject = encodeURIComponent("61C Studios — contact form");
      const body = encodeURIComponent(lines);
      window.location.href = `mailto:${MAIL}?subject=${subject}&body=${body}`;
    },
    [form]
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="relative mx-auto max-w-[1200px] px-4 pb-28 pt-24 md:px-8 md:pt-28">
        {/* Hero: shutter as a positioned div (z-0) under headline, socials, mail & offset (z-10) */}
        <section
          className="relative isolate mt-6 min-h-[min(72vh,720px)] overflow-hidden rounded-sm border border-white/10 md:mt-8"
          aria-labelledby="contact-hero-heading"
        >
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element -- fills overlay layer */}
            <img
              src={SHUTTER_BG}
              alt=""
              className="absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
              decoding="async"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/25 via-black/10 to-black/55"
            aria-hidden
          />

          <div className="relative z-10 px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14">
            {/* Decorative pot — desktop */}
            <div
              className="pointer-events-none absolute bottom-4 right-0 z-[5] hidden w-[min(22vw,200px)] translate-x-[10%] select-none lg:block"
              aria-hidden
            >
              <Image
                src="/Pot.webp"
                alt=""
                width={200}
                height={260}
                className="h-auto w-full object-contain opacity-90"
              />
            </div>

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
              <div className="relative z-10 flex flex-col gap-8">
                <h1
                  id="contact-hero-heading"
                  className="relative z-10 max-w-[95%] text-[clamp(2.25rem,7vw,4.75rem)] font-bold uppercase leading-[1.02] tracking-wide text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
                  style={{
                    color: YELLOW,
                    fontFamily: "var(--font-five-years-old), ui-sans-serif, system-ui, sans-serif",
                  }}
                >
                  Let&apos;s connect
                </h1>

                <div className="relative z-10 flex flex-wrap items-end gap-6 sm:gap-8">
                  <div className="hidden w-[min(28%,140px)] shrink-0 sm:block">
                    <Image
                      src="/Clapperboard.png"
                      alt=""
                      width={160}
                      height={200}
                      className="h-auto w-full object-contain drop-shadow-md"
                    />
                  </div>
                  <div className="relative z-10 flex flex-wrap items-center gap-4 sm:gap-5">
                    {SOCIAL.map((s) => (
                      <SocialVideo key={s.label} src={s.src} label={s.label} href={s.href} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex flex-col gap-10 border-t border-white/15 pt-10 lg:border-l lg:border-t-0 lg:border-white/25 lg:pl-12 lg:pt-0">
                <p
                  className="text-base uppercase tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-lg"
                  style={{ color: YELLOW, fontFamily: "var(--font-the-battle-cont), sans-serif" }}
                >
                  Mail us at{" "}
                  <a
                    href={`mailto:${MAIL}`}
                    className="relative z-10 block font-semibold normal-case tracking-normal underline decoration-2 underline-offset-4 hover:opacity-90 sm:inline"
                  >
                    {MAIL}
                  </a>
                </p>

                <Link
                  href={OFFSET_INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 group flex max-w-md flex-col gap-2 rounded-lg border border-white/15 bg-black/35 p-4 backdrop-blur-[2px] transition-colors hover:border-[#F7E509]/50 hover:bg-black/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7E509]/70 lg:ml-auto lg:items-end lg:text-right"
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.25em] text-[#F7E509]/90 sm:text-xs"
                    style={{ fontFamily: "var(--font-the-battle-cont), sans-serif" }}
                  >
                    A unit of 61C STUDIOS
                  </span>
                  <span className="text-4xl font-bold tracking-tight text-white transition-transform group-hover:scale-[1.02] sm:text-5xl">
                    offset.
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-widest text-white/75 sm:text-xs"
                    style={{ fontFamily: "var(--font-the-battle-cont), sans-serif" }}
                  >
                    F&amp;B · HOSPITALITY · PRODUCT
                  </span>
                  <span className="sr-only">Opens Offset on Instagram</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Studios */}
        <div
          className="mt-14 grid gap-8 border-b border-white/10 pb-10 md:mt-16 md:grid-cols-2 md:gap-0"
          style={{ fontFamily: "var(--font-the-battle-cont), sans-serif" }}
        >
            <div className="md:border-r md:pr-10" style={{ borderColor: GREEN_ACCENT }}>
              <h2 className="text-lg font-bold uppercase tracking-wide" style={{ color: YELLOW }}>
                UK studio
              </h2>
              <p className="mt-3 text-sm leading-relaxed md:text-base" style={{ color: YELLOW }}>
                Address : XYZ 123, XYZ
                <br />
                Contact :
              </p>
            </div>
            <div className="md:pl-10">
              <h2 className="text-lg font-bold uppercase tracking-wide" style={{ color: YELLOW }}>
                India studio
              </h2>
              <p className="mt-3 text-sm leading-relaxed md:text-base" style={{ color: YELLOW }}>
                Address : XYZ 123, XYZ
                <br />
                Contact :
              </p>
            </div>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="mt-10 max-w-4xl space-y-6 md:mt-14"
          style={{ fontFamily: "var(--font-the-battle-cont), sans-serif" }}
        >
          <div className="h-px w-full max-w-2xl" style={{ backgroundColor: GREEN_ACCENT }} aria-hidden />

          <div className="grid gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-8">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: YELLOW }}>
                Full name
              </span>
              <input
                name="fullName"
                value={form.fullName}
                onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                className="min-h-[52px] w-full border-0 px-3 py-3 text-white outline-none ring-0 placeholder:text-white/40 focus:ring-2 focus:ring-[#F7E509]/50"
                style={{ backgroundColor: RED_INPUT }}
                autoComplete="name"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: YELLOW }}>
                E-mail
              </span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="min-h-[52px] w-full border-0 px-3 py-3 text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#F7E509]/50"
                style={{ backgroundColor: RED_INPUT }}
                autoComplete="email"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: YELLOW }}>
                Phone
              </span>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="min-h-[52px] w-full border-0 px-3 py-3 text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#F7E509]/50"
                style={{ backgroundColor: RED_INPUT }}
                autoComplete="tel"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: YELLOW }}>
                Message
              </span>
              <textarea
                name="message"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                rows={4}
                className="min-h-[120px] w-full resize-y border-0 px-3 py-3 text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#F7E509]/50"
                style={{ backgroundColor: RED_INPUT }}
              />
            </label>
          </div>

          <button
            type="submit"
            className="rounded border-2 border-[#F7E509] bg-transparent px-8 py-3 text-sm font-bold uppercase tracking-widest text-[#F7E509] transition-colors hover:bg-[#F7E509]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7E509]"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
