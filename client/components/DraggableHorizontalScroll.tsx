"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

/** Pixels of horizontal movement before we treat the gesture as a drag (not a click). */
const DRAG_THRESHOLD_PX = 28;
/** Prefer page vertical scroll when movement is mostly vertical beyond this slip. */
const VERTICAL_ABORT_THRESHOLD_PX = 10;

type DraggableHorizontalScrollProps = {
  children: ReactNode;
  /** Announced to assistive tech (e.g. "Music videos, draggable horizontally") */
  ariaLabel: string;
  className?: string;
  /** Applied to the inner flex row (default: gap-4 md:gap-6) */
  gapClassName?: string;
};

export default function DraggableHorizontalScroll({
  children,
  ariaLabel,
  className = "",
  gapClassName = "gap-4 md:gap-6",
}: DraggableHorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const dragState = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startScrollLeft: number;
    dragging: boolean;
    captured: boolean;
  } | null>(null);
  const suppressNextClickRef = useRef(false);

  const stopClickIfSuppressed = useCallback((e: MouseEvent) => {
    if (!suppressNextClickRef.current) return;
    const root = scrollRef.current;
    const target = e.target;
    if (!root || !(target instanceof Node)) {
      suppressNextClickRef.current = false;
      return;
    }
    if (!root.contains(target)) {
      suppressNextClickRef.current = false;
      return;
    }
    suppressNextClickRef.current = false;
    e.preventDefault();
    e.stopPropagation();
  }, []);

  useEffect(() => {
    document.addEventListener("click", stopClickIfSuppressed, true);
    return () => document.removeEventListener("click", stopClickIfSuppressed, true);
  }, [stopClickIfSuppressed]);

  const updateScrollState = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState, children]);

  const scrollByAmount = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const releaseIfCaptured = (el: HTMLDivElement, pointerId: number, captured: boolean) => {
    if (!captured) return;
    try {
      el.releasePointerCapture(pointerId);
    } catch {
      /* ignore */
    }
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Let touch use native vertical page scroll + native overflow-x scrolling; Lenis/syncTouch fights pointer-driven drag on mobile otherwise.
    if (e.pointerType === "touch") return;
    if (e.button !== 0) return;
    const target = e.target;
    if (
      target instanceof Element &&
      target.closest(
        "a[href], button, input, textarea, select, [role='button']"
      )
    ) {
      return;
    }
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startScrollLeft: el.scrollLeft,
      dragging: false,
      captured: false,
    };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const el = scrollRef.current;
    if (!state || !el || e.pointerId !== state.pointerId) return;

    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;

    if (!state.dragging) {
      if (
        Math.abs(dy) >= VERTICAL_ABORT_THRESHOLD_PX &&
        Math.abs(dy) > Math.abs(dx)
      ) {
        dragState.current = null;
        return;
      }
      if (
        Math.abs(dx) >= DRAG_THRESHOLD_PX &&
        Math.abs(dx) > Math.abs(dy)
      ) {
        state.dragging = true;
        try {
          el.setPointerCapture(e.pointerId);
          state.captured = true;
        } catch {
          /* ignore */
        }
      }
      return;
    }

    el.scrollLeft = state.startScrollLeft - dx;
    e.preventDefault();
  };

  const endPointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const el = scrollRef.current;
    if (!state || e.pointerId !== state.pointerId) return;

    if (state.dragging) {
      suppressNextClickRef.current = true;
    }
    const hadCapture = state.captured;
    dragState.current = null;
    if (el) releaseIfCaptured(el, e.pointerId, hadCapture);
  };

  return (
    <div className="relative flex items-center group w-full">
      <div className="shrink-0 flex justify-center mr-2 md:mr-4">
        <button
          onClick={() => scrollByAmount("left")}
          disabled={!canScrollLeft}
          className={`z-10 p-1 md:p-2 rounded-full transition-all focus:outline-none cursor-pointer
            ${canScrollLeft ? "text-white/70 hover:text-white hover:bg-white/10" : "opacity-0 pointer-events-none"}
          `}
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      <div
        ref={scrollRef}
        role="region"
        aria-label={ariaLabel}
        className={`scrollbar-hide cursor-grab overflow-x-auto overflow-y-hidden overscroll-x-contain active:cursor-grabbing flex-1 min-w-0 ${className}`}
        style={{
          touchAction: "auto",
          WebkitOverflowScrolling: "touch",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onScroll={updateScrollState}
      >
        <div className={`flex w-max min-w-max flex-row ${gapClassName}`}>{children}</div>
      </div>

      <div className="shrink-0 flex justify-center ml-2 md:ml-4">
        <button
          onClick={() => scrollByAmount("right")}
          disabled={!canScrollRight}
          className={`z-10 p-1 md:p-2 rounded-full transition-all focus:outline-none cursor-pointer
            ${canScrollRight ? "text-white/70 hover:text-white hover:bg-white/10" : "opacity-0 pointer-events-none"}
          `}
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>
    </div>
  );
}
