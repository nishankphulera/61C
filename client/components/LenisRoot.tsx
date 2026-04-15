"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type LenisContextValue = {
  lenis: Lenis | null;
  /** When true, smooth scrolling is disabled for accessibility. */
  prefersReducedMotion: boolean;
  /** Call after large layout changes (fonts, images, accordions). */
  resize: () => void;
};

const LenisContext = createContext<LenisContextValue | null>(null);

export function useLenis(): LenisContextValue {
  const ctx = useContext(LenisContext);
  if (!ctx) {
    throw new Error("useLenis must be used within LenisRoot");
  }
  return ctx;
}

export default function LenisRoot({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance: Lenis | null = null;

    const applyPreference = () => {
      if (mq.matches) {
        if (instance) {
          instance.destroy();
          instance = null;
        }
        setLenis(null);
        setPrefersReducedMotion(true);
        return;
      }

      setPrefersReducedMotion(false);
      if (!instance) {
        instance = new Lenis({
          autoRaf: true,
          anchors: true,
          stopInertiaOnNavigate: true,
          // Balanced for smoother feel without input lag.
          lerp: 0.08,
          wheelMultiplier: 1,
          touchMultiplier: 1,
          syncTouch: true,
        });
        void document.fonts?.ready?.then(() => {
          instance?.resize();
        });
        setLenis(instance);
      }
    };

    applyPreference();
    mq.addEventListener("change", applyPreference);

    const onResize = () => instance?.resize();
    window.addEventListener("resize", onResize);

    return () => {
      mq.removeEventListener("change", applyPreference);
      window.removeEventListener("resize", onResize);
      instance?.destroy();
      instance = null;
      setLenis(null);
    };
  }, []);

  const resize = useCallback(() => {
    lenis?.resize();
  }, [lenis]);

  const value = useMemo<LenisContextValue>(
    () => ({
      lenis,
      prefersReducedMotion,
      resize,
    }),
    [lenis, prefersReducedMotion, resize]
  );

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}
