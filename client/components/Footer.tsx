import Image from "next/image";
import Link from "next/link";
import { FaBehance, FaInstagram, FaYoutube } from "react-icons/fa";

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: FaInstagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    Icon: FaYoutube,
  },
  {
    label: "Behance",
    href: "https://www.behance.net/",
    Icon: FaBehance,
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-black ">
      {/* Orange/amber band from design (replaces previous top border) */}
      <div className="w-full flex justify-center items-center">
        <div
          className="h-2 w-[90%] bg-amber-500 md:h-20"
          aria-hidden
        />
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-6 md:flex-row md:items-end md:justify-between md:gap-12 md:px-10 md:py-16 lg:px-12">
        <div className="flex max-w-md flex-col gap-8">
          <h2 className="text-2xl font-bold uppercase tracking-[0.15em] text-[#E4DA4D] md:text-3xl">
            Let&apos;s connect
          </h2>

          <div className="flex flex-wrap gap-3">
            {SOCIAL.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/95 text-zinc-900 shadow-md transition hover:scale-105 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E4DA4D] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <Icon className="h-6 w-6" aria-hidden />
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-1 text-[#E4DA4D]">
            <p className="text-sm md:text-base">Mail us at</p>
            <a
              href="mailto:admin@61cstudios.com"
              className="text-sm font-medium text-[#E4DA4D] transition hover:underline md:text-base"
            >
              admin@61cstudios.com
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[220px] shrink-0 sm:max-w-[260px] md:mx-0 md:max-w-[280px] lg:max-w-[320px]">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
            <Image
              src="/yellowQR.png"
              alt="Scan to connect with 61C Studios"
              fill
              className="object-contain mt-20"
              sizes="(max-width: 768px) 220px, 320px"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
