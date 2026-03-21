// components/ScrollContainer.tsx
"use client";

import { useRef, useEffect, ReactNode } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

type Props = { children: ReactNode };

export default function ScrollContainer({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    });

    return () => scroll.destroy();
  }, []);

  return (
    <div ref={containerRef} data-scroll-container>
      {children}
    </div>
  );
}
