import Image from "next/image";
import Header from "@/components/Header";

export const metadata = {
  title: "Coming Soon",
};

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      <Header />
      <main
        className="relative flex min-h-screen w-full items-center justify-center px-6 py-24"
        aria-label="Coming soon"
      >
        <Image
          src="/ComingSoon.gif"
          alt="Coming soon"
          width={1024}
          height={300}
          unoptimized
          priority
          draggable={false}
          className="w-full max-w-[min(92vw,72rem)] h-auto select-none"
        />
      </main>
    </div>
  );
}
