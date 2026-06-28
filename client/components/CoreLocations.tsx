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
      className="relative z-10 bg-black px-[40px] md:px-[200px]"
      aria-labelledby="core-locations-heading"
    >
      <div className="mx-auto w-full max-w-none">
        <h2
          id="core-locations-heading"
          className="text-center text-[clamp(2.75rem,7vw,5rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-yellow-400 mt-20 mb-10"
        >
          Core Locations
        </h2>

        <div className="relative aspect-video min-h-[240px] w-full md:aspect-auto md:h-[min(100dvh,56rem)]">
          <Image
            src="/globalreach.jpg"
            alt="Stylized world map with the Gateway of India and Big Ben, representing global creative reach."
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>

        <div className="text-yellow-400 pt-6 md:pt-10">
          <p className="max-w-none text-left text-base font-medium leading-[1.28] tracking-[-0.02em] sm:text-2xl sm:leading-[1.28] md:text-[1.55rem] md:leading-[1.26] lg:text-[2.55rem] lg:leading-[1.26]">
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
