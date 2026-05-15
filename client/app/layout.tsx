import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import LenisRoot from "@/components/LenisRoot";
import LoadingScreen from "@/components/LoadingScreen";
import "./globals.css";

const figtree = localFont({
  src: "../public/fonts/Figtree-VariableFont_wght.ttf",
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "61cstudios",
  description: "61cstudios",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} antialiased`}
      >
        <LoadingScreen />
        <LenisRoot>
          {children}
          <Footer />
        </LenisRoot>
      </body>
    </html>
  );
}
