"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const COLLAGES = [
  { src: "/colage1.jpg", alt: "Production collage 1" },
  { src: "/colage2.jpg", alt: "Production collage 2" },
  { src: "/colage3.jpg", alt: "Production collage 3" },
] as const;

const CORE_VALUES = [
  {
    title: "Design first",
    body: "Every project begins with bold ideas and a design based approach.",
  },
  {
    title: "Collaboration over competition",
    body: "Magic happens when people work together, make space for new perspectives, and nurture diverse talents.",
  },
  {
    title: "Culture is king",
    body: "Our work draws from the pulse of contemporary narrative. We believe culture sets the context for everything.",
  },
  {
    title: "Keep experimenting",
    body: "We never stop trying new things, testing new mediums, adopting new technologies and challenging what's possible.",
  },
  {
    title: "Have fun",
    body: "We balance serious work ethics with a quirky, playful spirit, because great work should also be an enjoyable experience.",
  },
] as const;

const valueTitleClass =
  "text-[clamp(1.25rem,2.5vw+0.5rem,1.75rem)] font-extrabold leading-tight tracking-[-0.04em] text-[#FF499E]";
const valueBodyClass =
  "mt-2 text-base font-medium leading-[1.35] tracking-[-0.02em] text-[#FFFF00] sm:text-lg md:text-xl";

export default function CoreValues() {
  return (
    <section
      className="relative z-10 bg-black px-8 pt-10 pb-20 md:px-12 md:pt-14 md:pb-28 lg:px-16 lg:pt-16 lg:pb-32"
      aria-labelledby="core-values-heading"
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2
          id="core-values-heading"
          className="text-center text-[clamp(2.75rem,7vw,5rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-[#FFFF00]"
        >
          Core Values
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-1 gap-3 sm:mt-12 sm:gap-4 md:mt-28 md:grid-cols-3 md:gap-5 lg:gap-6"
        >
          {COLLAGES.map(({ src, alt }) => (
            <div
              key={src}
              className="relative h-[50vh] w-full overflow-hidden md:h-[38vh] lg:h-[50vh]"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </motion.div>

        <ul className="mt-8 flex max-w-3xl list-none flex-col gap-10 p-0 text-left md:mt-12 md:gap-12 lg:gap-14">
          {CORE_VALUES.map(({ title, body }) => (
            <li key={title} className="text-left">
              <p className={valueTitleClass}>{title}</p>
              <p className={valueBodyClass}>{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
