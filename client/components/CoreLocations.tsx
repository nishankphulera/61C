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
          className="px-4 pt-16 text-center text-[clamp(2.75rem,7vw,5rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-[#D9E021] md:px-10 md:pt-20"
        >
          Core Locations
        </h2>

        <div className="relative mt-8 h-[min(100dvh,56rem)] min-h-[240px] w-full md:mt-10 md:h-[min(100dvh,56rem)]">
          <Image
            src="/globalreach.jpg"
            alt="Stylized world map with the Gateway of India and Big Ben, representing global creative reach."
            fill
            className="object-contain object-center"
            sizes="100vw"
          />
        </div>

        <div className="px-4 py-16 text-[#D9E021] md:px-10 md:py-20">
          <p className="max-w-none text-left text-[clamp(2.25rem,2.5vw+0.75rem,3.25rem)] font-bold leading-[1.2] tracking-[-0.03em]">
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
