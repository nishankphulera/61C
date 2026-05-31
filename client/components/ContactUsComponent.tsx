"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { submitContactForm } from "@/lib/api";

const YELLOW = "#F7E509";
const RED_INPUT = "#C41E2A";
const GREEN_ACCENT = "#2EE576";
const MAIL = "hello@61cstudios.com";
const OFFSET_BLUE = "#2563eb";

const OFFSET_INSTAGRAM =
  process.env.NEXT_PUBLIC_OFFSET_INSTAGRAM_URL ?? "https://www.instagram.com/offset_61c/";

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/61cstudios/",
    srcWebm: "/Instagram.webm",
    srcMp4: "/Instagram.mp4",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/61c-studios/",
    srcWebm: "/Linkedin.webm",
    srcMp4: "/Linkedin.mp4",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@61cstudios",
    srcWebm: "/Youtube.webm",
    srcMp4: "/Youtube.mp4",
  },
] as const;

const LINK_BLUE = "#0000FF";

const SITE_MAP_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Films", href: "/films" },
  { label: "Photography", href: "/photography" },
  { label: "Design", href: "/design" },
  { label: "Contact Us", href: "/contact" },
] as const;

const UK_SITE_MAP_LINKS = [
  ...SITE_MAP_LINKS.slice(0, 5),
  { label: "61C Studios UK", href: "/uk" },
  SITE_MAP_LINKS[5],
] as const;

const UK_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Business", href: "/comingsoon" },
] as const;

const COPYRIGHT_YEAR = 2026;

function SocialTile({
  label,
  href,
  srcWebm,
  srcMp4,
}: {
  label: string;
  href: string;
  srcWebm: string;
  srcMp4: string;
}) {
  return (
    <div className="relative z-10 h-20 w-20 shrink-0 overflow-hidden rounded-md ring-2 ring-[#F7E509] ring-offset-2 ring-offset-transparent sm:h-24 sm:w-24 m-1">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src={srcWebm} type="video/webm" />
        <source src={srcMp4} type="video/mp4" />
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

export default function ContactUsComponent() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFormFeedback(null);
      setFormSubmitting(true);
      try {
        const res = await submitContactForm({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        });
        setForm({ fullName: "", email: "", phone: "", message: "" });
        setFormFeedback({ type: "ok", text: res.message });
      } catch (err) {
        setFormFeedback({
          type: "err",
          text: err instanceof Error ? err.message : "Something went wrong. Try again later.",
        });
      } finally {
        setFormSubmitting(false);
      }
    },
    [form]
  );

  return (
    <>
      <footer
        ref={footerRef}
        className="relative isolate min-h-[min(85dvh,720px)] overflow-hidden mt-30"
      >
        {/* Shutter under content */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/shutterroll.webp"
            alt=""
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/50"
          aria-hidden
        />

        <div className="relative z-10 mx-auto mt-[18dvh] grid max-w-7xl grid-cols-1 gap-10 px-6 pb-16 pt-50 md:grid-cols-3 md:items-end md:gap-12 md:px-10">
          {/* Left: CTA + socials */}
          <div className="flex flex-col gap-8 md:col-span-1">
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

            <div className="flex flex-wrap items-center gap-4">
              {SOCIAL.map((s) => (
                <SocialTile key={s.label} label={s.label} href={s.href} srcWebm={s.srcWebm} srcMp4={s.srcMp4} />
              ))}
            </div>
          </div>

          {/* Center: decorative pot */}
          <div className="flex justify-center md:col-span-1">
            <Image
              src="/Pot.webp"
              alt=""
              width={260}
              height={280}
              className="h-auto max-h-[min(40vh,280px)] w-auto max-w-full object-contain opacity-95"
            />
          </div>

          {/* Right: Mail + Offset */}
          <div className="flex flex-col gap-8 md:col-span-1 md:items-end md:text-right">
            <a
              href="mailto:hello@61cstudios.com"
              className="group flex flex-col gap-1 transition-colors hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7E509]/80 md:ml-auto md:items-end md:text-right mb-4 md:mb-0"
            >
              <span className="text-2xl md:text-3xl lg:text-4xl font-normal" style={{ color: YELLOW }}>
                Get in touch for a quote
              </span>
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide text-[#FF009D]">
                hello@61cstudios.com
              </span>
            </a>


            <Link
              href={OFFSET_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full max-w-sm flex-col gap-2 2 p-4 transition-colors hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7E509]/80 md:ml-auto md:items-end md:text-right"

            >
              <img src="/offset.jpeg" alt="Offset" className="w-full h-full object-cover" />

            </Link>
          </div>
        </div>
      </footer>

      <section
        className="relative z-10 bg-black text-white"
        aria-label="Studios and contact form"
      >
        <div
          className="mx-auto max-w-7xl px-6 md:px-10"
        >
          {/* <div className="mt-14 grid gap-8 border-b border-white/10 pb-10 md:mt-16 md:grid-cols-2 md:gap-0">
          <div className="md:border-r md:pr-10" style={{ borderColor: GREEN_ACCENT }}>
            <h2 className="text-xl font-bold uppercase tracking-wide md:text-2xl" style={{ color: YELLOW }}>
              UK studio
            </h2>
            <p className="mt-3 text-base leading-relaxed md:text-lg" style={{ color: YELLOW }}>
              Address : XYZ 123, XYZ
              <br />
              Contact :
            </p>
          </div>
          <div className="md:pl-10">
            <h2 className="text-xl font-bold uppercase tracking-wide md:text-2xl" style={{ color: YELLOW }}>
              India studio
            </h2>
            <p className="mt-3 text-base leading-relaxed md:text-lg" style={{ color: YELLOW }}>
              Address : XYZ 123, XYZ
              <br />
              Contact :
            </p>
          </div>
        </div> */}
          <div className="mx-auto mt-14 flex max-w-4xl flex-col gap-10 text-[#ffef00] md:mt-20 md:flex-row md:items-stretch md:justify-center md:gap-0">
            <div className="flex-1 md:pr-8 md:text-right">
              <p className="text-xl font-bold uppercase tracking-wide md:text-5xl text-[#FF009D]">
                UK Studio
              </p>
              <p className="mt-2 text-base font-semibold opacity-90 md:text-4xl tracking-wide">
                Registered office address:
              </p>
              <address className="mt-3 text-base not-italic leading-relaxed md:text-3xl">
                71-75 Shelton Street,
                <br />
                Covent Garden,
                <br />
                London,
                <br />
                WC2H 9JQ
              </address>
              <p className="mt-2 text-base font-semibold opacity-90 md:text-3xl tracking-wide">
                Phone No: +44 7345651920
              </p>
            </div>

            <div
              className="hidden shrink-0 self-stretch bg-[#1a4d2e] md:block md:w-px md:min-h-48"
              aria-hidden
            />

            <div
              className="h-px w-full shrink-0 bg-[#1a4d2e] md:hidden"
              aria-hidden
            />

            <div className="flex-1 md:pl-8 md:text-left">
              <p className="text-lg font-bold uppercase tracking-wide md:text-5xl text-[#FF009D]">
                India Studio
              </p>
              <p className="mt-2 text-base font-semibold opacity-90 md:text-4xl">
                Registered office address:
              </p>
              <address className="mt-3 text-base not-italic leading-relaxed md:text-3xl">
                House No.55,
                <br />
                Second Floor, Gali No2,
                <br />
                Saidullajab Village,
                <br />
                New Delhi, 110030
              </address>
              <p className="mt-2 text-base font-semibold opacity-90 md:text-3xl tracking-wide">
                Phone No: +918266029164
              </p>
            </div>

          </div>

          <div className="mx-auto mt-16 max-w-4xl px-6 md:px-0">
            <h3 className="text-center text-3xl font-bold md:text-4xl text-[#FFFF00]">
              Regional Hubs
            </h3>
            <div className="mt-8 flex flex-row items-stretch justify-center gap-0">
              <div className="flex-1 pr-4 md:pr-12 text-right">
                <ul className="flex flex-col gap-3 text-xl md:text-3xl text-[#FF009D]">
                  <li>Manchester</li>
                  <li>Liverpool</li>
                  <li>Leeds</li>
                  <li>Sheffield</li>
                  <li>Birmingham</li>
                </ul>
              </div>

              {/* No visible divider, just spacing to match the address layout structure */}
              <div className="w-4 md:w-px shrink-0" aria-hidden />

              <div className="flex-1 pl-4 md:pl-12 text-left">
                <ul className="flex flex-col gap-3 text-xl md:text-3xl text-[#FF009D]">
                  <li>Delhi - NCR</li>
                  <li>Mumbai</li>
                  <li>Bengaluru</li>
                  <li>Goa</li>
                  <li>Dehradun</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-10 max-w-4xl space-y-6 px-6 pb-16 md:mt-14 md:px-10"
        >
          <div className="h-px w-full max-w-2xl mb-8" style={{ backgroundColor: GREEN_ACCENT }} aria-hidden />

          <div className="flex flex-col gap-8 md:flex-row md:gap-x-12 items-stretch">
            {/* Left Column */}
            <div className="flex flex-1 flex-col gap-8 md:gap-10">
              <label className="flex flex-col gap-3">
                <span className="text-lg font-normal uppercase tracking-wide md:text-xl" style={{ color: YELLOW }}>
                  Full Name
                </span>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                  className="min-h-[56px] w-full rounded-none border-0 px-4 py-3.5 text-base text-white outline-none placeholder:text-white/45 focus:ring-2 focus:ring-[#F7E509]/40 md:min-h-[60px] md:px-5 md:py-4 md:text-lg"
                  style={{ backgroundColor: RED_INPUT }}
                  autoComplete="name"
                  required
                />
              </label>
              <label className="flex flex-col gap-3">
                <span className="text-lg font-normal uppercase tracking-wide md:text-xl" style={{ color: YELLOW }}>
                  Phone
                </span>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="min-h-[56px] w-full rounded-none border-0 px-4 py-3.5 text-base text-white outline-none placeholder:text-white/45 focus:ring-2 focus:ring-[#F7E509]/40 md:min-h-[60px] md:px-5 md:py-4 md:text-lg"
                  style={{ backgroundColor: RED_INPUT }}
                  autoComplete="tel"
                />
              </label>

              <div className="flex justify-end md:pl-0 mt-2 md:mt-0">
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="bg-[#F7E509] px-14 py-2.5 text-black font-semibold text-lg md:text-xl uppercase transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 disabled:opacity-50 w-max"
                >
                  {formSubmitting ? "SENDING…" : "SEND"}
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-1 flex-col gap-8 md:gap-10">
              <label className="flex flex-col gap-3">
                <span className="text-lg font-normal uppercase tracking-wide md:text-xl" style={{ color: YELLOW }}>
                  E-mail
                </span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="min-h-[56px] w-full rounded-none border-0 px-4 py-3.5 text-base text-white outline-none placeholder:text-white/45 focus:ring-2 focus:ring-[#F7E509]/40 md:min-h-[60px] md:px-5 md:py-4 md:text-lg"
                  style={{ backgroundColor: RED_INPUT }}
                  autoComplete="email"
                  required
                />
              </label>
              <label className="flex flex-col gap-3 grow">
                <span className="text-lg font-normal uppercase tracking-wide md:text-xl" style={{ color: YELLOW }}>
                  Message
                </span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="min-h-[56px] w-full rounded-none border-0 px-4 py-3.5 text-base text-white outline-none placeholder:text-white/45 focus:ring-2 focus:ring-[#F7E509]/40 md:min-h-[60px] md:px-5 md:py-4 md:text-lg grow resize-none !min-h-[140px]"
                  style={{ backgroundColor: RED_INPUT }}
                  required
                />
              </label>
            </div>
          </div>

          {formFeedback ? (
          <p
            role="status"
            className="mt-6 text-base font-semibold uppercase tracking-wide md:text-lg text-center"
            style={{ color: formFeedback.type === "ok" ? GREEN_ACCENT : "#f87171" }}
          >
            {formFeedback.text}
          </p>
        ) : null}
      </form>

      <div className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <nav aria-labelledby="queries-sitemap-heading">
          <h3
            id="queries-sitemap-heading"
            className="text-2xl font-bold tracking-wide md:text-3xl"
            style={{ color: YELLOW }}
          >
            Site Map
          </h3>
          <ul
            className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-lg leading-snug md:mt-5 md:text-xl lg:text-2xl"
            style={{ color: LINK_BLUE }}
          >
            {UK_SITE_MAP_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-bold transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0000FF]/80"
                  style={{ color: LINK_BLUE }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="mt-10 space-y-4 text-base leading-relaxed md:mt-14 md:text-lg lg:text-xl"
          style={{ color: YELLOW }}
        >
          <p className="font-bold text-xl md:text-2xl lg:text-3xl">
            61C STUDIOS UK LTD (Company Number: 17200017)
            <span style={{ color: LINK_BLUE }}>
              {" – "}
              {UK_LEGAL_LINKS.map((item, index) => (
                <span key={item.label}>
                  {index > 0 ? " | " : null}
                  <Link
                    href={item.href}
                    className="font-bold transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0000FF]/80"
                    style={{ color: LINK_BLUE }}
                  >
                    {item.label}
                  </Link>
                </span>
              ))}
            </span>
          </p>
          <p className="font-bold text-xl md:text-2xl lg:text-3xl">
            Copyright © {COPYRIGHT_YEAR} – 61C STUDIOS (&) 61C STUDIOS UK LTD. All
            Rights Reserved
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
