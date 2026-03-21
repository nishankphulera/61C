import BrandMarquee from "@/components/BrandWork";

export default function BrandsPage() {
  return (
    <main className="min-h-[200vh] bg-[#050505] w-full flex flex-col justify-center overflow-x-hidden">
      {/* Some empty space above to allow scrolling down into the component */}
      <div className="h-[50vh] flex items-center justify-center">
        <p className="text-white/40 text-sm tracking-widest uppercase">Scroll Down</p>
      </div>

      <BrandMarquee />

      {/* Empty space below to allow scrolling past it */}
      <div className="h-[50vh]" />
    </main>
  );
}
