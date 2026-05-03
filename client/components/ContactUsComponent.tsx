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
            href="mailto:example@email.com"
            className="group flex w-full max-w-sm flex-col gap-2 p-4 transition-colors hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7E509]/80 md:ml-auto md:items-end md:text-right"
          >
            <img src="/mailus.png" alt="Mail us" className="w-full h-full object-cover" />
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
        <div className="mt-14 grid gap-8 border-b border-white/10 pb-10 md:mt-16 md:grid-cols-2 md:gap-0">
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
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="mx-auto mt-10 max-w-4xl space-y-6 px-6 pb-16 md:mt-14 md:px-10"
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

        {formFeedback ? (
          <p
            role="status"
            className="text-sm font-semibold uppercase tracking-wide md:text-base"
            style={{ color: formFeedback.type === "ok" ? GREEN_ACCENT : "#f87171" }}
          >
            {formFeedback.text}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={formSubmitting}
          className="rounded border-2 border-[#F7E509] bg-transparent px-8 py-3 text-sm font-bold uppercase tracking-widest text-[#F7E509] transition-colors hover:bg-[#F7E509]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7E509] disabled:pointer-events-none disabled:opacity-50"
        >
          {formSubmitting ? "Sending…" : "Send"}
        </button>
      </form>
    </section>
    </>
  );
}
