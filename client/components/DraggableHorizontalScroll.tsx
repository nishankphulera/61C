"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

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
    <div
      ref={scrollRef}
      role="region"
      aria-label={ariaLabel}
      data-lenis-prevent
      className={`scrollbar-hide cursor-grab overflow-x-auto overflow-y-hidden overscroll-x-contain active:cursor-grabbing ${className}`}
      style={{
        touchAction: "auto",
        WebkitOverflowScrolling: "touch",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
    >
      <div className={`flex w-max min-w-max flex-row ${gapClassName}`}>{children}</div>
    </div>
  );
}
