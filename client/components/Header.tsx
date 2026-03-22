"use client";

import Image from "next/image";
import React, { useId, useState } from "react";
import { NavModal } from "@/components/NavModal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navPanelId = useId();

  return (
    <header className="top-0 left-0 w-full z-[100]">
      {/* Subtle gradient fade so the header doesn't feel like a hard bar */}
      <div className="absolute inset-0 bg-black" />

      <div className="relative flex items-center justify-between px-6 md:px-10 py-2">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/mouse.png"
            alt="61C Logo"
            width={50}
            height={50}
            className="w-10 h-10 md:w-20 md:h-16 object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
            priority
          />
        </div>

        {/* Center: Title Image */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/Group1.png"
            alt="61C"
            width={200}
            height={40}
            className="w-24 md:w-62 h-auto object-contain drop-shadow-[0_2px_12px_rgba(255,200,0,0.25)]"
            priority
          />
        </div>

        {/* Right: Hamburger Menu */}
        <button
          type="button"
          className="flex-shrink-0 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={navPanelId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Image
            src="/hamburger.png"
            alt="Menu"
            width={36}
            height={36}
            className="w-7 h-7 md:w-10 md:h-10 object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
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
