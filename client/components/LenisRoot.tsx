"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function LenisRoot({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
