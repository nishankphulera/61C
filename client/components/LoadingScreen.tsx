"use client";

import { useEffect, useState } from "react";

const MIN_DISPLAY_MS = 1800;
const MAX_DISPLAY_MS = 8000;

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const start = performance.now();
    let removed = false;

    const finish = () => {
      if (removed) return;
      removed = true;
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      window.setTimeout(() => setIsLoading(false), remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const fallback = window.setTimeout(finish, MAX_DISPLAY_MS);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    const t = window.setTimeout(() => setIsMounted(false), 700);
    return () => window.clearTimeout(t);
  }, [isLoading]);

  if (!isMounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      aria-hidden={!isLoading}
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-black transition-opacity duration-500 ease-out ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Final.gif"
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover select-none"
      />
    </div>
  );
}
