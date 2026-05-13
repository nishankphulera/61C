"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const LINKS: { href: string; label: string; imageSrc: string }[] = [
  { href: "/", label: "Home", imageSrc: "/Homenav.png" },
  { href: "/about", label: "About us", imageSrc: "/Aboutusnav.png" },
  { href: "/films", label: "Films", imageSrc: "/Filmsnav.png" },
  { href: "/photography", label: "Photography", imageSrc: "/Photographynav.png" },
  { href: "/comingsoon", label: "Design", imageSrc: "/Design.png" },

  { href: "/contact", label: "Contact", imageSrc: "/Contactnav.png" },
];

export type NavModalProps = {
  panelId: string;
  open: boolean;
  onClose: () => void;
};

export function NavModal({ panelId, open, onClose }: NavModalProps) {
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      className="relative z-[600]"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 z-[600] bg-black/60 transition duration-200 ease-out data-closed:opacity-0"
      />

      <div className="pointer-events-none fixed inset-0 z-[610] overflow-y-auto overflow-x-hidden">
        <DialogPanel
          id={panelId}
          transition
          className="pointer-events-auto fixed top-16 right-6 z-[610] flex h-[min(82dvh,620px)] max-h-[calc(100dvh-5.5rem)] w-[min(calc(100vw-3rem),20rem)] min-h-[320px] flex-col overflow-hidden font-sans transition duration-200 ease-out data-closed:opacity-0 data-closed:translate-y-1 sm:right-10 sm:w-[min(calc(100vw-5rem),24rem)] md:top-20"
        >
          <DialogTitle className="sr-only">Navigation menu</DialogTitle>

          <button
            type="button"
            onClick={onClose}
            className="absolute -right-2 -top-2 z-10 rounded-full p-2 text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close menu"
          >
            <XMarkIcon className="h-8 w-8" aria-hidden />
          </button>

          <nav
            data-lenis-prevent
            className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-y-contain pt-0 pb-[max(1rem,env(safe-area-inset-bottom))]"
            aria-label="Primary"
          >
            <div className="flex w-full flex-col">
              {LINKS.map(({ href, label, imageSrc }) => (
                <Link
                  key={href}
                  href={href}
                  className="group relative block w-full min-w-0 shrink-0 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                >
                  <Image
                    src={imageSrc}
                    alt={label}
                    width={100}
                    height={100}
                    className="w-full max-w-full object-cover object-center drop-shadow-sm transition-transform group-hover:scale-[1.02]"
                  />
                </Link>
              ))}
            </div>
          </nav>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
