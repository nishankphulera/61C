"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type PhotographyLightboxOptions = {
  alt?: string;
  sectionId?: string;
  sectionTitle?: string;
};

type PhotographyLightboxPayload = { src: string } & PhotographyLightboxOptions;

type PhotographyLightboxContextValue = {
  open: (src: string, options?: PhotographyLightboxOptions) => void;
  close: () => void;
};

const PhotographyLightboxContext =
  createContext<PhotographyLightboxContextValue | null>(null);

export function usePhotographyLightbox() {
  const ctx = useContext(PhotographyLightboxContext);
  if (!ctx) {
    throw new Error(
      "usePhotographyLightbox must be used within PhotographyLightboxProvider",
    );
  }
  return ctx;
}

function scrollToSection(sectionId: string) {
  document
    .getElementById(sectionId)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PhotographyLightboxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [payload, setPayload] = useState<PhotographyLightboxPayload | null>(
    null,
  );

  const open = useCallback((src: string, options?: PhotographyLightboxOptions) => {
    setPayload({ src, ...options });
  }, []);

  const close = useCallback(() => {
    setPayload(null);
  }, []);

  useEffect(() => {
    if (!payload) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [payload]);

  useEffect(() => {
    if (!payload) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [payload, close]);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <PhotographyLightboxContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {payload ? (
          <motion.div
            key="photography-lightbox"
            className="fixed inset-0 z-[900] flex flex-col items-center justify-center bg-black/[0.88] backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={payload.alt ?? "Image preview"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={close}
          >
            <motion.button
              type="button"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 md:right-5 md:top-5"
              aria-label="Close"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.05, duration: 0.25 }}
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </motion.button>

            <motion.div
              className="flex max-h-[min(92dvh,92vh)] w-full max-w-[min(96vw,1800px)] flex-1 items-center justify-center px-3 pb-4 pt-14 md:px-8 md:pb-8 md:pt-16"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={payload.src}
                alt={payload.alt ?? "Photography"}
                className="max-h-[min(82dvh,82vh)] max-w-full rounded-md object-contain shadow-[0_25px_80px_-12px_rgba(0,0,0,0.85)] ring-1 ring-white/15"
              />
            </motion.div>

            {payload.sectionId && payload.sectionTitle ? (
              <motion.div
                className="pb-[max(1.25rem,env(safe-area-inset-bottom))]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.28 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#f0e6a8] backdrop-blur-sm transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 md:text-sm"
                  onClick={() => {
                    scrollToSection(payload.sectionId!);
                    close();
                  }}
                >
                  Go to {payload.sectionTitle}
                </button>
              </motion.div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </PhotographyLightboxContext.Provider>
  );
}
