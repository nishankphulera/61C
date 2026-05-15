"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useId, useState } from "react";
import { NavModal } from "@/components/NavModal";

/** Pixels of vertical scroll before the center wordmark is hidden */
const TITLE_HIDE_SCROLL_PX = 32;

/** Collage assets use up to z-360. Logo + menu share z-[500]; wordmark z-[490]. Nav overlay z-[600+] in NavModal. */

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [titleHidden, setTitleHidden] = useState(false);
  const navPanelId = useId();

  useEffect(() => {
    // Track the last computed value locally so we only call setState when the
    // threshold is actually crossed — calling setState on every scroll event
    // (even with bailout) still triggers React reconciliation work.
    let current = window.scrollY > TITLE_HIDE_SCROLL_PX;
    setTitleHidden(current);
    const onScroll = () => {
      const next = window.scrollY > TITLE_HIDE_SCROLL_PX;
      if (next !== current) {
        current = next;
        setTitleHidden(next);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[500] w-full bg-transparent">
      <div className="relative flex items-center justify-between px-6 md:px-10 py-2">
        {/* Left: Logo — home */}
        <Link
          href="/"
          className="relative z-[500] opacity-90 flex size-12 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[url('/circle_gradient.png')] bg-cover bg-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:size-20"
          aria-label="Home"
        >
          <Image
            src="/mouse.png"
            alt="61C Logo"
            width={50}
            height={50}
            className="size-8 object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)] md:size-14"
            priority
          />
        </Link>

        {/* Center: Title Image — fades out after scrolling */}
        <div
          className={`absolute left-1/2 top-1/2 z-[490] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ease-out ${
            titleHidden ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-hidden={titleHidden}
        >
          <Link
            href="/"
            className="inline-block cursor-pointer rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70"
            aria-label="Home"
            tabIndex={titleHidden ? -1 : 0}
          >
            <Image
              src="/Group1.png"
              alt="61C"
              width={200}
              height={40}
              className="w-24 md:w-62 h-auto object-contain drop-shadow-[0_2px_12px_rgba(255,200,0,0.25)]"
              priority
            />
          </Link>
        </div>

        {/* Right: Hamburger Menu */}
        <button
          type="button"
          className="relative z-[500] flex-shrink-0 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={navPanelId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Image
            src="/bb.png"
            alt=""
            width={40}
            height={40}
            className="size-7 object-contain md:size-10 drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
            aria-hidden
          />
        </button>
      </div>

      <NavModal
        panelId={navPanelId}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
}
