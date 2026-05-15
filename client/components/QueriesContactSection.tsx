"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { submitContactForm } from "@/lib/api";

const YELLOW = "#F7E509";
const CORAL_INPUT = "#E85D65";
const GREEN_RULE = "#1a4d2e";
const MAIL = "hello@61cstudios.com";
/** Rendered size for social looping videos (square) */
const SOCIAL_ICON_PX = 136;

const OFFSET_INSTAGRAM =
  process.env.NEXT_PUBLIC_OFFSET_INSTAGRAM_URL ?? "https://www.instagram.com/offset_61c/";

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/61cstudios/",
    srcMp4: "/Instagram.mp4",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/61c-studios/",
    srcMp4: "/Linkedin.mp4",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@61cstudios",
    srcMp4: "/Youtube.mp4",
  },
] as const;

/** Sitemap / footer link colour (design: blue on black) */
const LINK_BLUE = "#0000FF";

const SITE_MAP_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Films", href: "/films" },
  { label: "Photography", href: "/photography" },
  { label: "Design", href: "/design" },
  { label: "Contact Us", href: "/contact" },
] as const;

const IMPORTANT_LINKS = [
  { label: "Policies & Compliance", href: "/comingsoon" },
  { label: "Privacy Policy", href: "/comingsoon" },
  { label: "Cookie Policy", href: "/comingsoon" },
  { label: "Health & Safety", href: "/comingsoon" },
  { label: "Insurance & Compliance", href: "/comingsoon" },
] as const;

const COPYRIGHT_YEAR = 2026;

function SocialLoopVideoTile({
  srcMp4,
  sizePx,
}: {
  srcMp4: string;
  sizePx: number;
}) {
  return (
    <div
      className="pointer-events-none overflow-hidden rounded-sm"
      style={{
        width: sizePx,
        height: sizePx,
        flexShrink: 0,
      }}
      aria-hidden
    >
      <video
        className="block h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={srcMp4} type="video/mp4" />
      </video>
    </div>
  );
}

export default function QueriesContactSection() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFeedback(null);
      setSubmitting(true);
      try {
        const res = await submitContactForm({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        });
        setForm({ fullName: "", email: "", phone: "", message: "" });
        setFeedback({ type: "ok", text: res.message });
      } catch (err) {
        setFeedback({
          type: "err",
          text: err instanceof Error ? err.message : "Something went wrong. Try again later.",
        });
      } finally {
        setSubmitting(false);
      }
    },
    [form]
  );

  const inputClass =
    "min-h-[56px] w-full rounded-none border-0 px-4 py-3.5 text-base text-white outline-none placeholder:text-white/45 focus:ring-2 focus:ring-[#F7E509]/40 md:min-h-[60px] md:px-5 md:py-4 md:text-lg";

  return (
    <section
      className="bg-black text-[#F7E509]"
      aria-labelledby="queries-heading"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-end md:justify-between">
          <h2
            id="queries-heading"
            className="text-3xl font-bold uppercase tracking-wide md:text-5xl"
            style={{ color: YELLOW }}
          >
            Send us your queries
          </h2>
          <a
            href={`mailto:${MAIL}`}
            className="text-balance font-semibold underline decoration-2 underline-offset-[0.35em] transition-opacity hover:opacity-90 max-md:w-full md:max-w-[min(52vw,26rem)] md:text-right leading-tight break-all md:break-normal"
            style={{
              color: YELLOW,
              fontSize: "clamp(1.5rem, 2.8vw + 1rem, 2.875rem)",
            }}
          >
            {MAIL}
          </a>
        </div>

        <div
          className="mt-6 h-px w-full md:mt-8"
          style={{ backgroundColor: GREEN_RULE }}
          aria-hidden
        />

        <form onSubmit={onSubmit} className="mt-10 md:mt-12">
          <div className="grid gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
            <label className="flex flex-col gap-3">
              <span className="text-lg font-semibold uppercase tracking-wide md:text-xl" style={{ color: YELLOW }}>
                Full Name
              </span>
              <input
                name="fullName"
                value={form.fullName}
                onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                className={inputClass}
                style={{ backgroundColor: CORAL_INPUT }}
                autoComplete="name"
                required
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="text-lg font-semibold uppercase tracking-wide md:text-xl" style={{ color: YELLOW }}>
                E-mail
              </span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputClass}
                style={{ backgroundColor: CORAL_INPUT }}
                autoComplete="email"
                required
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="text-lg font-semibold uppercase tracking-wide md:text-xl" style={{ color: YELLOW }}>
                Phone
              </span>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className={inputClass}
                style={{ backgroundColor: CORAL_INPUT }}
                autoComplete="tel"
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="text-lg font-semibold uppercase tracking-wide md:text-xl" style={{ color: YELLOW }}>
                Message
              </span>
              <textarea
                name="message"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                rows={1}
                className={`${inputClass} min-h-[56px] resize-none md:min-h-[60px]`}
                style={{ backgroundColor: CORAL_INPUT }}
                required
              />
            </label>
          </div>

          {feedback ? (
            <p
              role="status"
              className="mt-6 text-base font-semibold uppercase tracking-wide md:text-lg"
              style={{ color: feedback.type === "ok" ? "#2EE576" : "#f87171" }}
            >
              {feedback.text}
            </p>
          ) : null}

          <div className="mt-10 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-none border-2 border-[#F7E509] bg-transparent px-12 py-4 text-base font-bold uppercase tracking-widest text-[#F7E509] transition-colors hover:bg-[#F7E509]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7E509] disabled:pointer-events-none disabled:opacity-50 md:text-lg md:py-5"
            >
              {submitting ? "Sending…" : "Send"}
            </button>
          </div>
        </form>

        <div className="mt-16 flex flex-col items-stretch gap-10 border-t border-white/10 pt-12 md:mt-20 md:flex-row md:items-center md:gap-0 md:pt-16">
          <div className="flex flex-wrap items-center gap-8 md:gap-11">
            {SOCIAL.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-opacity hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7E509]/80 rounded-sm"
                style={{
                  width: `${SOCIAL_ICON_PX + 32}px`,
                  height: `${SOCIAL_ICON_PX + 32}px`,
                  flexShrink: 0,
                }}
                aria-label={s.label}
              >
                <SocialLoopVideoTile srcMp4={s.srcMp4} sizePx={SOCIAL_ICON_PX} />
              </Link>
            ))}
          </div>
     

          <div
            className="hidden min-h-32 w-px shrink-0 self-stretch bg-[#F7E509] md:mx-10 md:block"
            aria-hidden
          />
          <div className="h-px w-full bg-[#F7E509] md:hidden" aria-hidden />

          <div className="flex flex-1 flex-col gap-1 md:items-end md:text-right">
           
            <Link
              href={OFFSET_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="offset Instagram"
            >
              <img
                src="/offset.png"
                alt="offset logo"
                style={{ height: "clamp(8.375rem, 18.5vw, 13.5rem)", width: "auto", display: "block" }}
                className="max-w-full"
              />
            </Link>
          </div>
    
        </div>

        <div
          className="mt-16 border-t border-white/10 pt-12 md:mt-20 md:pt-16"
          aria-label="Site map and legal"
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <nav aria-labelledby="queries-sitemap-heading">
              <h3
                id="queries-sitemap-heading"
                className="text-2xl font-bold tracking-wide md:text-3xl"
                style={{ color: YELLOW }}
              >
                Site Map
              </h3>
              <ul
                className="mt-2 list-disc space-y-0 pl-5 text-xl leading-snug md:text-2xl lg:text-3xl"
                style={{ color: LINK_BLUE }}
              >
                {SITE_MAP_LINKS.map((item) => (
                  <li key={item.href} className="marker:text-[#0000FF]">
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

            <nav aria-labelledby="queries-important-heading" className="md:flex md:flex-col md:items-end w-full ">
              <h3
                id="queries-important-heading"
                className="text-2xl font-bold tracking-wide md:text-right md:text-3xl"
                style={{ color: YELLOW }}
              >
                Important links
              </h3>
              <div className="mt-6 md:flex md:w-full md:justify-end flex-row  ">
              
                <ul
                  className="list-none flex flex-col justify-end text-right space-y-0 text-lg leading-snug md:text-2xl lg:text-3xl"
                  style={{ color: LINK_BLUE }}
                  >
                  {IMPORTANT_LINKS.map((item) => (
                    <li key={item.label} className="marker:text-[#0000FF]">
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
              </div>
            </nav>
          </div>

          <div
            className="mt-14 space-y-4 text-base leading-relaxed md:mt-20 md:text-lg"
            style={{ color: YELLOW }}
          >
            <p className="font-bold text-3xl">61C STUDIOS UK LTD (Company Number: 17200017)</p>
            <p className="font-bold text-3xl">
              Copyright © {COPYRIGHT_YEAR} – 61C STUDIOS (&) 61C STUDIOS UK LTD. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
