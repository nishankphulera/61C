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
      <h2 id="core-locations-heading" className="sr-only">
        Core locations
      </h2>

      <div className="mx-auto w-full max-w-7xl">
        <div className="relative h-[min(100dvh,56rem)] min-h-[240px] w-full md:h-[min(100dvh,56rem)]">
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

          <div className="mx-auto mt-14 flex max-w-4xl flex-col gap-10 md:mt-20 md:flex-row md:items-stretch md:justify-center md:gap-0">
            <div className="flex-1 md:pr-8 md:text-right">
              <p className="text-xl font-bold uppercase tracking-wide md:text-5xl">
                UK Studio
              </p>
              <p className="mt-2 text-base font-semibold opacity-90 md:text-4xl tracking-wide">
                Registered office address:
              </p>
              <address className="mt-3 text-base not-italic leading-relaxed md:text-3xl">
                71-75 Shelton Street,
                <br />
                Covent Garden,
                <br />
                London,
                <br />
                WC2H 9JQ
              </address>
              <p className="mt-2 text-base font-semibold opacity-90 md:text-3xl tracking-wide">
                Phone No: +44 7345651920
              </p>
            </div>

            <div
              className="hidden shrink-0 self-stretch bg-[#1a4d2e] md:block md:w-px md:min-h-48"
              aria-hidden
            />

            <div
              className="h-px w-full shrink-0 bg-[#1a4d2e] md:hidden"
              aria-hidden
            />

            <div className="flex-1 md:pl-8 md:text-left">
              <p className="text-lg font-bold uppercase tracking-wide md:text-5xl">
                India Studio
              </p>
              <p className="mt-2 text-base font-semibold opacity-90 md:text-4xl">
                Registered office address:
              </p>
              <address className="mt-3 text-base not-italic leading-relaxed md:text-3xl">
                House No.55,
                <br />
                Second Floor, Gali No2,
                <br />
                Saidullajab Village,
                <br />
                New Delhi, 110030
              </address>
              <p className="mt-2 text-base font-semibold opacity-90 md:text-3xl tracking-wide">
                Phone No: +918266029164
              </p>
            </div>
            
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-20 text-[#D9E021] md:px-10 md:pb-28">
        <h3 className="text-center text-2xl font-bold tracking-[-0.02em] md:text-4xl">
          Regional Hubs
        </h3>
        <div className="mt-10 flex justify-center md:mt-14">
          <div className="flex w-full max-w-md flex-col gap-8 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center sm:gap-x-12 md:gap-x-14">
            <ul
              className="space-y-3 text-left text-xl font-normal leading-snug md:text-4xl pr-4"
              aria-label="Regional hubs in the United Kingdom"
            >
              {REGIONAL_HUBS_UK.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
            <ul
              className="space-y-3 text-left text-2xl font-normal leading-snug md:text-4xl pl-4"
              aria-label="Regional hubs in India"
            >
              {REGIONAL_HUBS_IN.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
