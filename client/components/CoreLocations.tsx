import Image from "next/image";

const REGIONAL_HUBS_UK = [
  "Manchester",
  "Liverpool",
  "Leeds",
  "Sheffield",
  "Birmingham",
] as const;

const REGIONAL_HUBS_IN = [
  "Delhi – NCR",
  "Mumbai",
  "Bengaluru",
  "Goa",
  "Dehradun",
] as const;

export default function CoreLocations() {
  return (
    <section
      className="relative z-10 bg-black"
      aria-labelledby="core-locations-heading"
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2
          id="core-locations-heading"
          className="px-4 pt-16 text-center text-[clamp(2.75rem,7vw,5rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-yellow-400 md:px-10 md:pt-20"
        >
          Core Locations
        </h2>

        <div className="relative h-[min(100dvh,56rem)] min-h-[240px] w-full md:h-[min(100dvh,56rem)]">
          <Image
            src="/globalreach.jpg"
            alt="Stylized world map with the Gateway of India and Big Ben, representing global creative reach."
            fill
            className="object-contain object-center"
            sizes="100vw"
          />
        </div>

        <div className="px-4 text-yellow-400 md:px-10 pt-10">
          <p className="max-w-none text-left text-[clamp(1.22rem,2.65vw+0.55rem,2.1rem)] sm:text-[clamp(1.3rem,2.25vw+0.62rem,2.42rem)] md:text-[clamp(1.45rem,1.9vw+0.68rem,2.8rem)] lg:text-[clamp(1.52rem,1.6vw+0.72rem,3.15rem)] xl:text-[clamp(1.58rem,1.35vw+0.75rem,3.35rem)] font-bold leading-[1.2] tracking-[-0.03em]">
            Working across the UK, India and rest of the world, we deliver
            content that feels elevated without losing authenticity. Our
            approach combines cinematic production with global sensibilities,
            creating visuals designed to stand out across different channels and
            platforms globally.
          </p>


        </div>
      </div>

    </section>
  );
}
