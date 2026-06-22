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
  "text-[clamp(1.22rem,2.65vw+0.55rem,2.1rem)] sm:text-[clamp(1.3rem,2.25vw+0.62rem,2.42rem)] md:text-[clamp(1.45rem,1.9vw+0.68rem,2.8rem)] lg:text-[clamp(1.52rem,1.6vw+0.72rem,3.15rem)] xl:text-[clamp(1.58rem,1.35vw+0.75rem,3.35rem)] font-extrabold leading-tight tracking-[-0.04em] text-[#FF499E]";
const valueBodyClass =
  "text-xl font-medium leading-[1.4] tracking-[-0.02em] text-yellow-400 sm:text-2xl md:text-3xl";

export default function CoreValues() {
  return (
    <section
      className="relative z-10 bg-black px-8 pb-0 md:px-12 md:pb-8 lg:px-16 lg:pb-0"
      aria-labelledby="core-values-heading"
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2
          id="core-values-heading"
          className="text-center text-[clamp(2.75rem,7vw,5rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-yellow-400"
        >
          Core Values
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-0 grid grid-cols-1 gap-3 sm:mt-12 sm:gap-4 md:mt-18 md:grid-cols-3 md:gap-5 lg:gap-6"
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

        <ul className="flex max-w-7xl list-none flex-col gap-0 p-0 text-left md:gap-4 lg:gap-8 mt-[50px]">
          {CORE_VALUES.map(({ title, body }, idx) => {
            console.log("Loggin values", title, idx)
            return (
              <li key={title} className="text-left">
                <p className={valueTitleClass}>{title}</p>
                <p className={valueBodyClass}>{body}</p>
              </li>
            )

          })}
        </ul>
      </div>
    </section>
  );
}
